import type { Floor } from '../types/index.ts';
import { mockMall } from './mockMall.ts';

export const mockFloors: Floor[] = [
  {
    id: 'F1',
    mallId: mockMall.id,
    code: 'B1',
    name: 'B1 活力市集',
    level: -1,
    width: 1200,
    height: 760,
    crowdingThreshold: 920,
    currentOccupancy: 645,
    todayTraffic: 12680,
    crowdingIndex: 0.7,
    alertCount: 3
  },
  {
    id: 'F2',
    mallId: mockMall.id,
    code: 'L1',
    name: 'L1 城市客厅',
    level: 1,
    width: 1280,
    height: 820,
    crowdingThreshold: 1080,
    currentOccupancy: 1184,
    todayTraffic: 18420,
    crowdingIndex: 1.1,
    alertCount: 6
  },
  {
    id: 'F3',
    mallId: mockMall.id,
    code: 'L2',
    name: 'L2 潮流零售',
    level: 2,
    width: 1240,
    height: 800,
    crowdingThreshold: 980,
    currentOccupancy: 875,
    todayTraffic: 14360,
    crowdingIndex: 0.89,
    alertCount: 4
  },
  {
    id: 'F4',
    mallId: mockMall.id,
    code: 'L3',
    name: 'L3 亲子娱乐',
    level: 3,
    width: 1160,
    height: 780,
    crowdingThreshold: 840,
    currentOccupancy: 604,
    todayTraffic: 10120,
    crowdingIndex: 0.72,
    alertCount: 5
  },
  {
    id: 'F5',
    mallId: mockMall.id,
    code: 'L4',
    name: 'L4 生活方式',
    level: 4,
    width: 1120,
    height: 740,
    crowdingThreshold: 760,
    currentOccupancy: 512,
    todayTraffic: 8760,
    crowdingIndex: 0.67,
    alertCount: 2
  }
];
