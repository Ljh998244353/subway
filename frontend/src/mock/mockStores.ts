import type { Floor, ScoreLevel, Store, StoreCategory, StoreScoreBreakdown } from '../types/index.ts';
import { mockFloors } from './mockFloors.ts';
import { mockMall } from './mockMall.ts';

export const storeCategories: StoreCategory[] = [
  '餐饮',
  '零售',
  '娱乐',
  '亲子',
  '生活服务',
  '数码',
  '运动',
  '快闪'
];

const namePrefixes = [
  '星桥',
  '云禾',
  '晴屿',
  '松间',
  '拾光',
  '森序',
  '澄巷',
  '微岸',
  '青橙',
  '漫步'
];

const categorySuffix: Record<StoreCategory, string[]> = {
  餐饮: ['轻食', '面屋', '茶社', '烘焙'],
  零售: ['集合店', '生活馆', '买手店', '精选'],
  娱乐: ['剧场', '游艺', '影厅', '音娱'],
  亲子: ['乐园', '成长馆', '手作坊', '绘本屋'],
  生活服务: ['护理', '洗护', '修理站', '便民社'],
  数码: ['智造局', '体验馆', '配件社', '影像铺'],
  运动: ['训练营', '户外社', '轻运动', '球馆'],
  快闪: ['企划铺', '短展', '创意站', '主题屋']
};

const lowScoreReasons = [
  '高曝光低进店',
  '转化率低于同业态',
  '停留时长偏短',
  '连续三个时段下滑',
  '数据质量需要复核'
];

export function getScoreLevel(score: number): ScoreLevel {
  if (score >= 85) {
    return 'A';
  }

  if (score >= 70) {
    return 'B';
  }

  if (score >= 55) {
    return 'C';
  }

  return 'D';
}

function bounded(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function buildStoreName(index: number, category: StoreCategory) {
  const prefix = namePrefixes[index % namePrefixes.length];
  const suffixes = categorySuffix[category];
  const suffix = suffixes[Math.floor(index / namePrefixes.length) % suffixes.length];
  return `${prefix}${suffix}`;
}

function buildBreakdown(index: number): StoreScoreBreakdown {
  return {
    traffic: bounded(48 + ((index * 17) % 49), 0, 100),
    conversion: bounded(42 + ((index * 19) % 53), 0, 100),
    dwell: bounded(46 + ((index * 23) % 48), 0, 100),
    trend: bounded(40 + ((index * 29) % 55), 0, 100)
  };
}

function buildScore(breakdown: StoreScoreBreakdown, index: number) {
  const weightedScore = Math.round(
    breakdown.traffic * 0.3 +
      breakdown.conversion * 0.3 +
      breakdown.dwell * 0.2 +
      breakdown.trend * 0.2
  );
  const score = bounded(weightedScore - (index % 13 === 0 ? 14 : 0), 0, 100);
  const level = getScoreLevel(score);

  return {
    score,
    level,
    breakdown,
    trendDelta: Number((((index % 9) - 4) * 1.7).toFixed(1)),
    reasons: level === 'A' || level === 'B' ? ['表现稳定'] : lowScoreReasons.slice(0, (index % 3) + 1)
  };
}

function buildGeometry(floor: Floor, indexInFloor: number) {
  const column = indexInFloor % 5;
  const row = Math.floor(indexInFloor / 5);
  const cellWidth = floor.width / 5;
  const cellHeight = floor.height / 4;
  const width = Math.round(cellWidth * 0.7);
  const height = Math.round(cellHeight * 0.58);
  const x = Math.round(column * cellWidth + cellWidth * 0.15);
  const y = Math.round(row * cellHeight + cellHeight * 0.18);

  return {
    x,
    y,
    width,
    height
  };
}

function createStores() {
  const stores: Store[] = [];

  mockFloors.forEach((floor, floorIndex) => {
    for (let indexInFloor = 0; indexInFloor < 20; indexInFloor += 1) {
      const globalIndex = floorIndex * 20 + indexInFloor;
      const category = storeCategories[globalIndex % storeCategories.length];
      const exposureTraffic = 420 + ((globalIndex * 137) % 1880);
      const conversionRate = Number((18 + ((globalIndex * 11) % 61) + (floorIndex % 2) * 1.5).toFixed(1));
      const enterCount = Math.round((exposureTraffic * conversionRate) / 100);
      const breakdown = buildBreakdown(globalIndex);
      const score = buildScore(breakdown, globalIndex);

      stores.push({
        id: `S${String(globalIndex + 1).padStart(3, '0')}`,
        mallId: mockMall.id,
        floorId: floor.id,
        name: buildStoreName(globalIndex, category),
        category,
        geometry: buildGeometry(floor, indexInFloor),
        exposureTraffic,
        enterCount,
        conversionRate: bounded(conversionRate, 0, 100),
        avgDwellMinutes: Number((8 + ((globalIndex * 7) % 42) + (score.score < 55 ? -2 : 0)).toFixed(1)),
        currentOccupancy: 4 + ((globalIndex * 5) % 64),
        score,
        alertIds: []
      });
    }
  });

  return stores;
}

export const mockStores: Store[] = createStores();

export const mockStoreById = new Map(mockStores.map((store) => [store.id, store]));
