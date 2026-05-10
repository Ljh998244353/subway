import type { CustomerProfile } from '../types/index.ts';
import { mockFloors } from './mockFloors.ts';
import { mockMall } from './mockMall.ts';
import { storeCategories } from './mockStores.ts';

export const mockCustomerProfile: CustomerProfile = {
  mallId: mockMall.id,
  generatedAt: '2026-05-10T16:35:00+08:00',
  source: 'mock',
  activeTimeRange: '14:00-17:00',
  primaryFloorId: 'F2',
  topCategories: ['餐饮', '零售', '娱乐'],
  revisitTendency: 62,
  timeDistribution: Array.from({ length: 12 }, (_, index) => {
    const hour = 10 + index;
    const traffic = 520 + index * 95 + (index % 4) * 70;

    return {
      hour,
      traffic,
      share: Number((traffic / 17640).toFixed(4))
    };
  }),
  floorPreferences: mockFloors.map((floor, index) => ({
    floorId: floor.id,
    trafficShare: Number((floor.todayTraffic / 64340).toFixed(4)),
    dwellShare: Number((0.16 + index * 0.018).toFixed(4))
  })),
  categoryPreferences: storeCategories.map((category, index) => ({
    category,
    trafficShare: Number((0.08 + (index % 5) * 0.018).toFixed(4)),
    dwellShare: Number((0.07 + (index % 4) * 0.021).toFixed(4)),
    conversionRate: Number((24 + index * 4.6).toFixed(1))
  })),
  privacyNote: '仅展示匿名聚合数据，不包含人脸、身份标签、会员信息或个人轨迹。'
};
