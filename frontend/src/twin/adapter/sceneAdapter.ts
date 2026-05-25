import type { TwinStoreNode, TwinAlertMarker, DigitalTwinViewModel } from '../../pages/digitalTwinModel.ts';
import type { Floor, TwinMode } from '../../types/index.ts';

export type SceneObjectType = 'floor' | 'store' | 'corridor' | 'alert';

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

export type SceneObject = SceneFloor | SceneCorridor | SceneStore | SceneAlert;

export type SceneAdapterState = {
  objects: SceneObject[];
  floor: SceneFloor | null;
  corridors: SceneCorridor[];
  stores: SceneStore[];
  alerts: SceneAlert[];
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
        0.4,
        normalizePosition(alert.y, floor.height, FLOOR_DEPTH)
      ] as [number, number, number]
    }));
}

export function buildSceneAdapterState(viewModel: DigitalTwinViewModel): SceneAdapterState {
  const { floor, stores, alertMarkers, selectedStore, selectedAlert, hasSpatialData, mode } = viewModel;
  const sceneFloor = buildSceneFloor(floor);
  const corridors = buildSceneCorridors(floor);
  const sceneStores = buildSceneStores(stores, floor, selectedStore?.id);
  const sceneAlerts = buildSceneAlerts(alertMarkers, floor);
  const objects: SceneObject[] = [sceneFloor, ...corridors, ...sceneStores, ...sceneAlerts];

  return {
    objects,
    floor: sceneFloor,
    corridors,
    stores: sceneStores,
    alerts: sceneAlerts,
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
