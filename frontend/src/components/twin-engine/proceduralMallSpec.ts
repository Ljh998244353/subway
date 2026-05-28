import type { FloorId, StoreMetric } from '../../types/index.ts';

export interface MallStageConstraints {
  coordinateSystem: 'right-handed';
  upAxis: 'Y';
  forwardAxis: 'Z';
  unitScaleMeters: 1;
  origin: [number, number, number];
  footprint: { width: number; depth: number };
  atrium: { length: number; width: number; innerRadius: number; halfSpan: number };
  floors: Array<{ id: 'F1' | 'F2' | 'F3'; baseY: number; clearHeight: number; slabThickness: number }>;
  columnGrid: { spacingX: number; spacingZ: number; radius: number };
  escalators: Array<{ key: string; x: number; z: number; run: number; rise: number; width: number; angleDeg: number }>;
  corridorInset: number;
  storefrontModuleWidth: number;
  storefrontDepth: number;
  balustradeHeight: number;
  targetTriangleBudget: number;
}

export interface FloorSceneSpec {
  floorKey: 'F1' | 'F2' | 'F3';
  sourceFloorId: FloorId;
  levelIndex: number;
  baseY: number;
  slabY: number;
  ceilingY: number;
  isActive: boolean;
}

export const PROCEDURAL_MALL_SPEC: MallStageConstraints = {
  coordinateSystem: 'right-handed',
  upAxis: 'Y',
  forwardAxis: 'Z',
  unitScaleMeters: 1,
  origin: [0, 0, 0],
  footprint: { width: 120, depth: 80 },
  atrium: { length: 50, width: 24, innerRadius: 12, halfSpan: 13 },
  floors: [
    { id: 'F1', baseY: 0, clearHeight: 5.5, slabThickness: 0.5 },
    { id: 'F2', baseY: 5.5, clearHeight: 4.5, slabThickness: 0.5 },
    { id: 'F3', baseY: 10, clearHeight: 4.5, slabThickness: 0.5 }
  ],
  columnGrid: { spacingX: 8, spacingZ: 8, radius: 0.4 },
  escalators: [
    { key: 'WEST', x: -20, z: 0, run: 9.53, rise: 5.5, width: 1.2, angleDeg: 30 },
    { key: 'EAST', x: 20, z: 0, run: 7.79, rise: 4.5, width: 1.2, angleDeg: 30 }
  ],
  corridorInset: 18,
  storefrontModuleWidth: 8,
  storefrontDepth: 0.2,
  balustradeHeight: 1.2,
  targetTriangleBudget: 300000
};

const floorStateMap: Record<FloorId, FloorSceneSpec['floorKey']> = {
  B1: 'F1',
  F1: 'F1',
  F2: 'F2',
  F3: 'F3',
  F4: 'F3'
};

export function getSceneFloorSpecs(activeFloorId: FloorId): FloorSceneSpec[] {
  const activeFloorKey = floorStateMap[activeFloorId];
  return PROCEDURAL_MALL_SPEC.floors.map((floor, levelIndex) => ({
    floorKey: floor.id,
    sourceFloorId:
      floor.id === 'F1' ? (activeFloorId === 'B1' ? 'B1' : 'F1') : floor.id === 'F2' ? 'F2' : activeFloorId === 'F4' ? 'F4' : 'F3',
    levelIndex,
    baseY: floor.baseY,
    slabY: floor.baseY,
    ceilingY: floor.baseY + floor.clearHeight,
    isActive: floor.id === activeFloorKey
  }));
}

export function isPointInsideAtrium(x: number, z: number) {
  const { innerRadius, halfSpan } = PROCEDURAL_MALL_SPEC.atrium;
  const clampedX = Math.max(-halfSpan, Math.min(halfSpan, x));
  const dx = x - clampedX;
  return dx * dx + z * z <= innerRadius * innerRadius;
}

export function mapStoreToMallScene(store: StoreMetric) {
  const { footprint, corridorInset } = PROCEDURAL_MALL_SPEC;
  const normalizedX = store.x / 100;
  const normalizedZ = store.y / 100;
  const ringX = corridorInset + normalizedX * (footprint.width / 2 - corridorInset - 7);
  const ringZ = 9 + normalizedZ * (footprint.depth / 2 - 12);
  const onNorthEdge = store.y < 50;
  const x = (store.x < 50 ? -1 : 1) * ringX;
  const z = onNorthEdge ? -ringZ : ringZ;
  const facing = onNorthEdge ? Math.PI : 0;

  return { x, z, facing };
}
