import type { AlertEvent, EnterpriseStoreCategory, FloorId, FloorMetric, HeatPoint, StoreGrade, StoreMetric } from '../types/index.ts';

export const floorOrder: FloorId[] = ['B1', 'F1', 'F2', 'F3', 'F4'];

const floorNames: Record<FloorId, string> = {
  B1: 'B1 活力市集',
  F1: 'F1 城市客厅',
  F2: 'F2 潮流零售',
  F3: 'F3 亲子娱乐',
  F4: 'F4 生活方式'
};

const categoryCycle: EnterpriseStoreCategory[] = ['Food', 'Retail', 'Entertainment', 'Public', 'Retail', 'Food'];
const prefix = ['星桥', '云禾', '晴屿', '松间', '拾光', '森序', '澄巷', '微岸', '青橙', '漫步', '澜庭', '序集'];
const suffix: Record<EnterpriseStoreCategory, string[]> = {
  Retail: ['集合店', '生活馆', '精选', '买手社'],
  Food: ['轻食', '茶社', '烘焙', '面屋'],
  Entertainment: ['剧场', '影厅', '游艺', '音娱'],
  Public: ['服务站', '中庭亭', '护理站', '便民社']
};

function gradeFromScore(score: number): StoreGrade {
  if (score >= 88) return 'A+';
  if (score >= 76) return 'A';
  if (score >= 62) return 'B';
  return 'C-';
}

export const floors: FloorMetric[] = floorOrder.map((floorId, index) => ({
  id: floorId,
  name: floorNames[floorId],
  level: index - 1,
  liveOccupancy: 580 + index * 148 + (index % 2) * 120,
  todayTraffic: 9200 + index * 2380 + (index % 2) * 1300,
  crowdingIndex: Number((0.68 + index * 0.09 + (index === 2 ? 0.18 : 0)).toFixed(2)),
  alertCount: 2 + ((index * 3) % 5)
}));

export const stores: StoreMetric[] = floorOrder.flatMap((floorId, floorIndex) =>
  Array.from({ length: 21 }, (_, localIndex) => {
    const globalIndex = floorIndex * 21 + localIndex;
    const category = categoryCycle[globalIndex % categoryCycle.length];
    const score = Math.max(44, Math.min(96, 92 - ((globalIndex * 7) % 46) + (localIndex % 5) * 2));
    const grade = gradeFromScore(score);
    const hasWarning = grade === 'C-' || globalIndex % 17 === 0;
    const col = localIndex % 7;
    const row = Math.floor(localIndex / 7);

    return {
      id: `S${String(globalIndex + 1).padStart(3, '0')}`,
      name: `${prefix[globalIndex % prefix.length]}${suffix[category][Math.floor(globalIndex / prefix.length) % suffix[category].length]}`,
      floorId,
      category,
      grade,
      liveOccupancy: 8 + ((globalIndex * 5) % 62),
      entryRate: Number((11 + ((globalIndex * 11) % 58) + (hasWarning ? -4 : 0)).toFixed(1)),
      avgDwellTime: Number((7 + ((globalIndex * 13) % 38) + (hasWarning ? -2 : 0)).toFixed(1)),
      hasWarning,
      warningText: hasWarning ? '进店率与停留时长连续低于阈值' : undefined,
      score,
      x: 12 + col * 12.4,
      y: 17 + row * 24
    };
  })
);

export const heatPoints: HeatPoint[] = floorOrder.flatMap((floorId, floorIndex) =>
  Array.from({ length: 16 }, (_, index) => ({
    id: `H-${floorId}-${index + 1}`,
    floorId,
    x: 14 + (index % 8) * 10.5,
    y: 22 + Math.floor(index / 8) * 38 + ((index * 7) % 10),
    intensity: Number((0.24 + ((index + floorIndex) % 8) * 0.085).toFixed(2))
  }))
);

export const alertEvents: AlertEvent[] = Array.from({ length: 14 }, (_, index) => {
  const critical = index % 4 === 0;
  const store = stores[(index * 9) % stores.length];
  return {
    id: `EVT-${String(index + 1).padStart(3, '0')}`,
    timestamp: `2026-05-27 ${String(10 + (index % 9)).padStart(2, '0')}:${String((index * 7) % 60).padStart(2, '0')}`,
    level: critical ? 'critical' : 'warning',
    area: critical ? `${store.floorId} 中庭环廊` : `${store.floorId}-${store.id}`,
    message: critical
      ? `${store.floorId} 中庭视觉 AI 检测到人群密度超过 4.5 人/㎡，触发严重拥堵预警。`
      : `${store.name} 连续 3 天进店率、停留时间双重低于阈值，建议启动调铺决策。`,
    isResolved: false,
    storeId: critical ? undefined : store.id,
    floorId: store.floorId,
    action: critical ? 'dispatch' : 'simulate'
  };
});

export function getFloor(floorId: FloorId) {
  return floors.find((floor) => floor.id === floorId) ?? floors[2];
}

export function getStore(storeId?: string) {
  if (!storeId) return stores[42] ?? stores[0];
  return stores.find((store) => store.id === storeId) ?? stores[42] ?? stores[0];
}

export function getStoresForFloor(floorId: FloorId) {
  return stores.filter((store) => store.floorId === floorId);
}
