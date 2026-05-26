import type { TwinStoreNode, TwinAlertMarker, DigitalTwinViewModel } from '../../pages/digitalTwinModel.ts';
import type { Floor, FlowEdge, HeatmapPoint, TwinMode } from '../../types/index.ts';

export type SceneObjectType = 'floor' | 'store' | 'corridor' | 'alert' | 'heatmap' | 'flow';

export type SceneObjectBase = {
  id: string;
  type: SceneObjectType;
  floorId: string;
};

export type SceneFloor = SceneObjectBase & {
  type: 'floor';
  width: number;
  depth: number;
  elevation: number;
  code: string;
  name: string;
};

export type SceneCorridor = SceneObjectBase & {
  type: 'corridor';
  direction: 'horizontal' | 'vertical';
  position: [number, number, number];
  size: [number, number, number];
};

export type SceneStore = SceneObjectBase & {
  type: 'store';
  storeId: string;
  name: string;
  category: string;
  score: number;
  level: string;
  occupancy: number;
  alertCount: number;
  position: [number, number, number];
  size: [number, number, number];
  selected: boolean;
  color: string;
  emissive: string;
  emissiveIntensity: number;
};

export type SceneAlert = SceneObjectBase & {
  type: 'alert';
  alertId: string;
  title: string;
  level: string;
  status: string;
  storeId?: string;
  storeName: string;
  position: [number, number, number];
};

export type SceneHeatmapPoint = SceneObjectBase & {
  type: 'heatmap';
  heatmapId: string;
  position: [number, number, number];
  radius: number;
  intensity: number;
};

export type SceneFlowLine = SceneObjectBase & {
  type: 'flow';
  flowId: string;
  from: [number, number, number];
  to: [number, number, number];
  traffic: number;
  intensity: number;
  direction: FlowEdge['direction'];
};

export type SceneObject = SceneFloor | SceneCorridor | SceneStore | SceneAlert | SceneHeatmapPoint | SceneFlowLine;

export const SCENE_LAYER_HEIGHTS = {
  floor: 0.02,
  heatmap: 0.07,
  flow: 0.16,
  alert: 0.48,
  label: 0.3
} as const;

export type SceneAdapterState = {
  objects: SceneObject[];
  floor: SceneFloor | null;
  corridors: SceneCorridor[];
  stores: SceneStore[];
  alerts: SceneAlert[];
  heatmapPoints: SceneHeatmapPoint[];
  flowLines: SceneFlowLine[];
  selectedStoreId: string | null;
  selectedAlertId: string | null;
  hasSpatialData: boolean;
  mode: TwinMode;
};

export type SceneInteractionEvent = {
  type: 'store-click' | 'store-hover' | 'alert-click';
  objectId: string;
  storeId?: string;
  alertId?: string;
  floorId: string;
};

export type SceneInteractionHandler = (event: SceneInteractionEvent) => void;

const FLOOR_SPAN = 12;
const FLOOR_DEPTH = 7;

function normalizePosition(value: number, size: number, span: number): number {
  return (value / size - 0.5) * span;
}

function getStoreColor(level: string, selected: boolean): string {
  if (selected) return '#2f54eb';
  if (level === 'A' || level === 'B') return '#14b8a6';
  if (level === 'C') return '#f59e0b';
  return '#f43f5e';
}

function getStoreEmissive(selected: boolean): [string, number] {
  return selected ? ['#183b8f', 0.18] : ['#000000', 0];
}

function buildSceneFloor(floor: Floor): SceneFloor {
  return {
    id: `floor-${floor.id}`,
    type: 'floor',
    floorId: floor.id,
    width: FLOOR_SPAN,
    depth: FLOOR_DEPTH,
    elevation: -0.08,
    code: floor.code,
    name: floor.name
  };
}

function buildSceneCorridors(floor: Floor): SceneCorridor[] {
  return [
    {
      id: `corridor-h-${floor.id}`,
      type: 'corridor',
      floorId: floor.id,
      direction: 'horizontal',
      position: [0, 0.02, 0],
      size: [FLOOR_SPAN * 0.86, 0.05, 0.8]
    },
    {
      id: `corridor-v-${floor.id}`,
      type: 'corridor',
      floorId: floor.id,
      direction: 'vertical',
      position: [0, 0.03, 0],
      size: [FLOOR_DEPTH * 0.68, 0.05, 0.72]
    }
  ];
}

function buildSceneStores(stores: TwinStoreNode[], floor: Floor, selectedStoreId?: string): SceneStore[] {
  return stores.map((store) => {
    const width = Math.max(0.46, (store.geometry.width / floor.width) * FLOOR_SPAN);
    const depth = Math.max(0.46, (store.geometry.height / floor.height) * FLOOR_DEPTH);
    const x = normalizePosition(store.geometry.x + store.geometry.width / 2, floor.width, FLOOR_SPAN);
    const z = normalizePosition(store.geometry.y + store.geometry.height / 2, floor.height, FLOOR_DEPTH);
    const selected = store.id === selectedStoreId;
    const height = 0.26 + store.currentOccupancy / 220;
    const [emissive, emissiveIntensity] = getStoreEmissive(selected);

    return {
      id: `store-${store.id}`,
      type: 'store',
      floorId: floor.id,
      storeId: store.id,
      name: store.name,
      category: store.category,
      score: store.score,
      level: store.level,
      occupancy: store.currentOccupancy,
      alertCount: store.alertCount,
      position: [x, height / 2, z],
      size: [width, height, depth],
      selected,
      color: getStoreColor(store.level, selected),
      emissive,
      emissiveIntensity
    };
  });
}

function buildSceneAlerts(alerts: TwinAlertMarker[], floor: Floor): SceneAlert[] {
  return alerts
    .filter((alert) => alert.floorId === floor.id)
    .map((alert) => ({
      id: `alert-${alert.id}`,
      type: 'alert' as const,
      floorId: floor.id,
      alertId: alert.id,
      title: alert.title,
      level: alert.level,
      status: alert.status,
      storeId: alert.storeId,
      storeName: alert.storeName,
      position: [
        normalizePosition(alert.x, floor.width, FLOOR_SPAN),
        SCENE_LAYER_HEIGHTS.alert,
        normalizePosition(alert.y, floor.height, FLOOR_DEPTH)
      ] as [number, number, number]
    }));
}

function buildSceneHeatmapPoints(points: HeatmapPoint[], floor: Floor): SceneHeatmapPoint[] {
  return points
    .filter((point) => point.floorId === floor.id)
    .map((point) => ({
      id: `heatmap-${point.id}`,
      type: 'heatmap' as const,
      floorId: floor.id,
      heatmapId: point.id,
      position: [
        normalizePosition(point.x, floor.width, FLOOR_SPAN),
        SCENE_LAYER_HEIGHTS.heatmap,
        normalizePosition(point.y, floor.height, FLOOR_DEPTH)
      ],
      radius: 0.28 + point.intensity * 0.48,
      intensity: point.intensity
    }));
}

function buildSceneFlowLines(edges: FlowEdge[], floor: Floor): SceneFlowLine[] {
  const maxTraffic = Math.max(1, ...edges.filter((edge) => edge.floorId === floor.id).map((edge) => edge.traffic));

  return edges
    .filter((edge) => edge.floorId === floor.id)
    .map((edge) => ({
      id: `flow-${edge.id}`,
      type: 'flow' as const,
      floorId: floor.id,
      flowId: edge.id,
      from: [
        normalizePosition(edge.from.x, floor.width, FLOOR_SPAN),
        SCENE_LAYER_HEIGHTS.flow,
        normalizePosition(edge.from.y, floor.height, FLOOR_DEPTH)
      ],
      to: [
        normalizePosition(edge.to.x, floor.width, FLOOR_SPAN),
        SCENE_LAYER_HEIGHTS.flow,
        normalizePosition(edge.to.y, floor.height, FLOOR_DEPTH)
      ],
      traffic: edge.traffic,
      intensity: Math.max(0.18, edge.traffic / maxTraffic),
      direction: edge.direction
    }));
}

export function buildSceneAdapterState(viewModel: DigitalTwinViewModel): SceneAdapterState {
  const { floor, stores, heatmapPoints, flowEdges, alertMarkers, selectedStore, selectedAlert, hasSpatialData, mode } = viewModel;
  const sceneFloor = buildSceneFloor(floor);
  const corridors = buildSceneCorridors(floor);
  const sceneStores = buildSceneStores(stores, floor, selectedStore?.id);
  const sceneAlerts = buildSceneAlerts(alertMarkers, floor);
  const sceneHeatmapPoints = buildSceneHeatmapPoints(heatmapPoints, floor);
  const sceneFlowLines = buildSceneFlowLines(flowEdges, floor);
  const objects: SceneObject[] = [sceneFloor, ...corridors, ...sceneStores, ...sceneAlerts, ...sceneHeatmapPoints, ...sceneFlowLines];

  return {
    objects,
    floor: sceneFloor,
    corridors,
    stores: sceneStores,
    alerts: sceneAlerts,
    heatmapPoints: sceneHeatmapPoints,
    flowLines: sceneFlowLines,
    selectedStoreId: selectedStore?.id ?? null,
    selectedAlertId: selectedAlert?.id ?? null,
    hasSpatialData,
    mode
  };
}

export function findObjectById(objects: SceneObject[], id: string): SceneObject | undefined {
  return objects.find((obj) => obj.id === id);
}

export function findStoreByStoreId(stores: SceneStore[], storeId: string): SceneStore | undefined {
  return stores.find((store) => store.storeId === storeId);
}

export function findAlertByAlertId(alerts: SceneAlert[], alertId: string): SceneAlert | undefined {
  return alerts.find((alert) => alert.alertId === alertId);
}
