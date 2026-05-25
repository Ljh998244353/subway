import type { AlertLevel, Floor, FlowEdge, HeatmapPoint, Store, StoreAlert, TwinMode } from '../types/index.ts';

export type DigitalTwinFilters = {
  floorId?: string;
  mode?: TwinMode;
  storeId?: string;
  alertId?: string;
};

export type TwinStoreNode = {
  id: string;
  name: string;
  category: Store['category'];
  geometry: Store['geometry'];
  score: number;
  level: Store['score']['level'];
  conversionRate: number;
  currentOccupancy: number;
  alertCount: number;
};

export type TwinAlertMarker = {
  id: string;
  title: string;
  level: AlertLevel;
  status: StoreAlert['status'];
  floorId: string;
  storeId?: string;
  storeName: string;
  x: number;
  y: number;
  durationMinutes: number;
};

export type TwinMetric = {
  label: string;
  value: string;
  hint: string;
};

export type DigitalTwinViewModel = {
  filters: DigitalTwinFilters;
  mode: TwinMode;
  floor: Floor;
  stores: TwinStoreNode[];
  heatmapPoints: HeatmapPoint[];
  flowEdges: FlowEdge[];
  alertMarkers: TwinAlertMarker[];
  selectedStore?: TwinStoreNode;
  selectedAlert?: TwinAlertMarker;
  selectedStoreAlerts: TwinAlertMarker[];
  metrics: TwinMetric[];
  hasSpatialData: boolean;
};

export const digitalTwinCockpitLayout = {
  shell: 'premium light fullscreen three-column cockpit',
  left: 'macro flow, selected object, conversion funnel, merchant grading',
  center: 'typed scene adapter layer with WebGL/Three.js and SVG/2.5D FloorPlan fallback/reference',
  right: 'heat metrics, operational health, alert stream and inspector',
  protectedBoundary: 'mock/API data mode preserved; no Drei, no BlenderMCP, no GLB/GLTF, no external assets, no real MySQL, no real mall material, or personal data in P7-I4'
} as const;

const validModes: TwinMode[] = ['heatmap', 'flow', 'alerts', 'score'];

export const twinModeLabel: Record<TwinMode, string> = {
  heatmap: '热力',
  flow: '动线',
  alerts: '告警',
  score: '评分'
};

function getMode(mode?: TwinMode): TwinMode {
  return mode && validModes.includes(mode) ? mode : 'heatmap';
}

function getDefaultFloor(floors: Floor[]) {
  return floors.find((floor) => floor.id === 'F2') ?? floors[0];
}

function selectFloor(floors: Floor[], stores: Store[], alerts: StoreAlert[], filters: DigitalTwinFilters) {
  const storeFloorId = filters.storeId ? stores.find((store) => store.id === filters.storeId)?.floorId : undefined;
  const alertFloorId = filters.alertId ? alerts.find((alert) => alert.id === filters.alertId)?.floorId : undefined;
  const preferredFloorId = filters.floorId || alertFloorId || storeFloorId;

  return floors.find((floor) => floor.id === preferredFloorId) ?? getDefaultFloor(floors);
}

function getStoreCenter(store: Store) {
  return {
    x: Math.round(store.geometry.x + store.geometry.width / 2),
    y: Math.round(store.geometry.y + store.geometry.height / 2)
  };
}

function getPublicAreaPoint(floor: Floor, index: number) {
  const offset = index % 5;

  return {
    x: Math.round(floor.width * (0.18 + offset * 0.16)),
    y: Math.round(floor.height * (0.34 + (index % 2) * 0.22))
  };
}

function buildAlertMarkers(alerts: StoreAlert[], stores: Store[], floor: Floor): TwinAlertMarker[] {
  const storeById = new Map(stores.map((store) => [store.id, store]));

  return alerts
    .filter((alert) => alert.floorId === floor.id)
    .map((alert, index) => {
      const store = alert.storeId ? storeById.get(alert.storeId) : undefined;
      const point = store ? getStoreCenter(store) : getPublicAreaPoint(floor, index);

      return {
        id: alert.id,
        title: alert.title,
        level: alert.level,
        status: alert.status,
        floorId: alert.floorId,
        storeId: alert.storeId,
        storeName: store?.name ?? '楼层公共区域',
        x: point.x,
        y: point.y,
        durationMinutes: alert.durationMinutes
      };
    });
}

function buildStoreNodes(stores: Store[], floor: Floor): TwinStoreNode[] {
  return stores
    .filter((store) => store.floorId === floor.id)
    .map((store) => ({
      id: store.id,
      name: store.name,
      category: store.category,
      geometry: store.geometry,
      score: store.score.score,
      level: store.score.level,
      conversionRate: store.conversionRate,
      currentOccupancy: store.currentOccupancy,
      alertCount: store.alertIds.length
    }));
}

function buildMetrics(floor: Floor, stores: TwinStoreNode[], heatmapPoints: HeatmapPoint[], flowEdges: FlowEdge[], alertMarkers: TwinAlertMarker[]) {
  const averageScore = stores.length
    ? Math.round(stores.reduce((total, store) => total + store.score, 0) / stores.length)
    : 0;
  const heatPeak = heatmapPoints.length
    ? Math.max(...heatmapPoints.map((point) => point.intensity))
    : 0;
  const totalFlow = flowEdges.reduce((total, edge) => total + edge.traffic, 0);

  return [
    {
      label: '当前楼层',
      value: floor.code,
      hint: `${floor.name} / ${stores.length} 家店铺`
    },
    {
      label: '热力峰值',
      value: heatPeak.toFixed(2),
      hint: '匿名聚合强度，无个人轨迹'
    },
    {
      label: '流向客流',
      value: totalFlow.toLocaleString('zh-CN'),
      hint: '当前楼层流向线虚构汇总'
    },
    {
      label: '平均评分',
      value: `${averageScore} 分`,
      hint: '当前楼层店铺经营评分均值'
    },
    {
      label: '告警标记',
      value: `${alertMarkers.length}`,
      hint: '当前楼层关联预警数量'
    }
  ];
}

export function buildDigitalTwinViewModel(
  floors: Floor[],
  stores: Store[],
  alerts: StoreAlert[],
  heatmapPoints: HeatmapPoint[],
  flowEdges: FlowEdge[],
  filters: DigitalTwinFilters
): DigitalTwinViewModel {
  const floor = selectFloor(floors, stores, alerts, filters);
  const mode = getMode(filters.mode);
  const floorStores = buildStoreNodes(stores, floor);
  const floorHeatmapPoints = heatmapPoints.filter((point) => point.floorId === floor.id);
  const floorFlowEdges = flowEdges.filter((edge) => edge.floorId === floor.id);
  const alertMarkers = buildAlertMarkers(alerts, stores, floor);
  const selectedAlert = filters.alertId
    ? alertMarkers.find((alert) => alert.id === filters.alertId)
    : undefined;
  const selectedStoreId = filters.storeId ?? selectedAlert?.storeId;
  const selectedStore =
    (selectedStoreId ? floorStores.find((store) => store.id === selectedStoreId) : undefined) ??
    floorStores.find((store) => store.alertCount > 0) ??
    floorStores[0];

  return {
    filters,
    mode,
    floor,
    stores: floorStores,
    heatmapPoints: floorHeatmapPoints,
    flowEdges: floorFlowEdges,
    alertMarkers,
    selectedStore,
    selectedAlert,
    selectedStoreAlerts: selectedStore ? alertMarkers.filter((alert) => alert.storeId === selectedStore.id) : [],
    metrics: buildMetrics(floor, floorStores, floorHeatmapPoints, floorFlowEdges, alertMarkers),
    hasSpatialData: Boolean(floor && floorStores.length > 0)
  };
}
