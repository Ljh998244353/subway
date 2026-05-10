import type { AlertLevel, AlertStatus, AlertType, StoreAlert } from '../types/index.ts';
import { mockFloors } from './mockFloors.ts';
import { mockMall } from './mockMall.ts';
import { mockStores } from './mockStores.ts';

const alertTypes: AlertType[] = ['low_conversion', 'score_decline', 'low_score', 'crowding', 'data_quality'];
const alertLevels: AlertLevel[] = ['high', 'medium', 'low'];
const alertStatuses: AlertStatus[] = ['open', 'in_progress', 'resolved'];

const typeTitle: Record<AlertType, string> = {
  low_conversion: '高客流低转化',
  score_decline: '连续评分下滑',
  low_score: 'D 级店铺预警',
  crowding: '楼层拥挤预警',
  data_quality: '数据质量复核'
};

const suggestedAction: Record<AlertType, string> = {
  low_conversion: '复核门前动线和陈列吸引力，安排店员主动引导。',
  score_decline: '对比近三日进店、转化和停留变化，确认是否需要运营介入。',
  low_score: '列入今日重点巡检清单，并与店铺负责人确认改善动作。',
  crowding: '通知楼层主管疏导主动线，并观察入口分流效果。',
  data_quality: '检查对应摄像头 ROI、线段方向和事件去重状态。'
};

function buildAlert(index: number): StoreAlert {
  const type = alertTypes[index % alertTypes.length];
  const level = alertLevels[index % alertLevels.length];
  const status = alertStatuses[index % alertStatuses.length];
  const floor = mockFloors[index % mockFloors.length];
  const store = type === 'crowding' ? undefined : mockStores[(index * 7) % mockStores.length];
  const floorId = store?.floorId ?? floor.id;
  const startedHour = 10 + (index % 10);
  const startedMinute = (index * 7) % 60;

  return {
    id: `A${String(index + 1).padStart(4, '0')}`,
    mallId: mockMall.id,
    floorId,
    storeId: store?.id,
    type,
    level,
    status,
    title: typeTitle[type],
    description: store
      ? `${store.name} 触发“${typeTitle[type]}”，当前评分 ${store.score.score} 分，转化率 ${store.conversionRate}%。`
      : `${floor.name} 拥挤指数偏高，需要观察主动线和入口分流。`,
    suggestedAction: suggestedAction[type],
    startedAt: `2026-05-10T${String(startedHour).padStart(2, '0')}:${String(startedMinute).padStart(2, '0')}:00+08:00`,
    durationMinutes: 16 + ((index * 13) % 160)
  };
}

export const mockAlerts: StoreAlert[] = Array.from({ length: 20 }, (_, index) => buildAlert(index));

export const mockAlertById = new Map(mockAlerts.map((alert) => [alert.id, alert]));
