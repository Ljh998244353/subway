import type { FloorSummary, HeatmapPoint, FlowEdge, OverviewSnapshot } from '../types/index.ts';
import { mockAlerts } from './mockAlerts.ts';
import { mockFloors } from './mockFloors.ts';
import { mockMall } from './mockMall.ts';
import { mockStores } from './mockStores.ts';

const openAlertCount = mockAlerts.filter((alert) => alert.status !== 'resolved').length;
const highAlertCount = mockAlerts.filter((alert) => alert.level === 'high' && alert.status !== 'resolved').length;
const currentOccupancy = mockFloors.reduce((total, floor) => total + floor.currentOccupancy, 0);
const todayTraffic = mockFloors.reduce((total, floor) => total + floor.todayTraffic, 0);
const peakTraffic = Math.max(...mockFloors.map((floor) => floor.currentOccupancy + 260));
const crowdingIndex = Number(
  (mockFloors.reduce((total, floor) => total + floor.crowdingIndex, 0) / mockFloors.length).toFixed(2)
);

export const mockFloorSummaries: FloorSummary[] = mockFloors.map((floor) => ({
  floorId: floor.id,
  floorName: floor.name,
  traffic: floor.todayTraffic,
  crowdingIndex: floor.crowdingIndex,
  alertCount: floor.alertCount
}));

export const mockOverview: OverviewSnapshot = {
  mallId: mockMall.id,
  generatedAt: '2026-05-10T16:35:00+08:00',
  source: 'mock',
  metrics: [
    {
      id: 'current-occupancy',
      label: '当前场内人数',
      value: currentOccupancy,
      unit: '人',
      status: crowdingIndex >= 1 ? 'warning' : 'normal',
      trendDelta: 6.8,
      timeWindow: '当前时刻',
      description: '各楼层当前估算人数合计，来源为虚构 Mock 数据。'
    },
    {
      id: 'today-traffic',
      label: '今日累计客流',
      value: todayTraffic,
      unit: '人次',
      status: 'normal',
      trendDelta: 12.4,
      timeWindow: '今日 10:00-16:35',
      description: '商场入口进入事件的虚构聚合值。'
    },
    {
      id: 'peak-traffic',
      label: '峰值客流',
      value: peakTraffic,
      unit: '人',
      status: 'info',
      trendDelta: 4.2,
      timeWindow: '今日',
      description: '当前时间范围内虚构场内人数峰值。'
    },
    {
      id: 'crowding-index',
      label: '拥挤指数',
      value: crowdingIndex,
      unit: '',
      status: crowdingIndex >= 1 ? 'warning' : 'normal',
      trendDelta: 0.12,
      timeWindow: '当前时刻',
      description: '当前人数与楼层阈值的平均比例。'
    },
    {
      id: 'open-alerts',
      label: '未处理告警',
      value: openAlertCount,
      unit: '条',
      status: highAlertCount > 0 ? 'danger' : 'warning',
      trendDelta: -2,
      timeWindow: '今日',
      description: `包含 ${highAlertCount} 条高等级未处理告警。`
    }
  ],
  trafficTrend: Array.from({ length: 12 }, (_, index) => {
    const hour = 10 + index;
    const current = 980 + index * 145 + ((index % 3) - 1) * 90;

    return {
      timestamp: `2026-05-10T${String(hour).padStart(2, '0')}:00:00+08:00`,
      currentOccupancy: current,
      todayTrafficDelta: 760 + index * 120 + (index % 4) * 65,
      crowdingIndex: Number((current / 4200).toFixed(2))
    };
  }),
  floorSummaries: mockFloorSummaries,
  inefficientStoreIds: mockStores
    .filter((store) => store.score.level === 'C' || store.score.level === 'D')
    .slice(0, 12)
    .map((store) => store.id),
  alertIds: mockAlerts.slice(0, 10).map((alert) => alert.id)
};

export const mockHeatmapPoints: HeatmapPoint[] = mockFloors.flatMap((floor, floorIndex) =>
  Array.from({ length: 10 }, (_, index) => ({
    id: `H-${floor.id}-${index + 1}`,
    floorId: floor.id,
    x: Math.round(((index % 5) + 0.5) * (floor.width / 5)),
    y: Math.round((Math.floor(index / 5) + 0.55) * (floor.height / 2)),
    intensity: Number((0.28 + ((floorIndex + index) % 7) * 0.09).toFixed(2))
  }))
);

export const mockFlowEdges: FlowEdge[] = mockFloors.flatMap((floor, floorIndex) =>
  Array.from({ length: 4 }, (_, index) => ({
    id: `FE-${floor.id}-${index + 1}`,
    floorId: floor.id,
    from: {
      x: Math.round((index + 0.4) * (floor.width / 4)),
      y: Math.round(floor.height * 0.18)
    },
    to: {
      x: Math.round(((index + 1) % 4 + 0.4) * (floor.width / 4)),
      y: Math.round(floor.height * 0.76)
    },
    traffic: 360 + floorIndex * 80 + index * 55,
    direction: index % 3 === 0 ? 'inbound' : index % 3 === 1 ? 'outbound' : 'cross'
  }))
);
