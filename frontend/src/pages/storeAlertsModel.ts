import type { AlertLevel, AlertStatus, AlertType, Floor, Store, StoreAlert } from '../types/index.ts';

export type StoreAlertsFilters = {
  level?: AlertLevel;
  status?: AlertStatus;
  floorId?: string;
  storeId?: string;
  keyword?: string;
  alertId?: string;
};

export type StoreAlertRow = {
  id: string;
  title: string;
  type: AlertType;
  level: AlertLevel;
  status: AlertStatus;
  floorId: string;
  floorName: string;
  storeId?: string;
  storeName: string;
  storeScore?: number;
  conversionRate?: number;
  durationMinutes: number;
  startedAt: string;
  triggerMetric: string;
  suggestedAction: string;
};

export type AlertDetailMetric = {
  label: string;
  value: string;
  hint: string;
};

export type AlertActionItem = {
  label: string;
  detail: string;
};

export type StoreAlertsSummary = {
  total: number;
  open: number;
  inProgress: number;
  high: number;
  resolved: number;
};

export type StoreAlertsViewModel = {
  filters: StoreAlertsFilters;
  rows: StoreAlertRow[];
  selectedAlert?: StoreAlertRow;
  summary: StoreAlertsSummary;
  detailMetrics: AlertDetailMetric[];
  actionItems: AlertActionItem[];
  selectedFloorName: string;
  selectedStoreName: string;
  hasRows: boolean;
};

function getStoreName(store?: Store) {
  return store?.name ?? '楼层公共区域';
}

function getTriggerMetric(alert: StoreAlert, store?: Store) {
  if (alert.type === 'low_conversion') {
    return `转化率 ${store?.conversionRate ?? '-'}%`;
  }

  if (alert.type === 'score_decline') {
    return `趋势 ${store?.score.trendDelta && store.score.trendDelta > 0 ? '+' : ''}${store?.score.trendDelta ?? '-'} 分`;
  }

  if (alert.type === 'low_score') {
    return `评分 ${store?.score.score ?? '-'} 分`;
  }

  if (alert.type === 'crowding') {
    return '拥挤指数超阈值';
  }

  return '数据质量待复核';
}

function buildRows(alerts: StoreAlert[], floors: Floor[], stores: Store[], filters: StoreAlertsFilters): StoreAlertRow[] {
  const floorNameById = new Map(floors.map((floor) => [floor.id, floor.name]));
  const storeById = new Map(stores.map((store) => [store.id, store]));
  const keyword = filters.keyword?.trim().toLowerCase();

  return alerts
    .map((alert) => {
      const store = alert.storeId ? storeById.get(alert.storeId) : undefined;

      return {
        id: alert.id,
        title: alert.title,
        type: alert.type,
        level: alert.level,
        status: alert.status,
        floorId: alert.floorId,
        floorName: floorNameById.get(alert.floorId) ?? alert.floorId,
        storeId: alert.storeId,
        storeName: getStoreName(store),
        storeScore: store?.score.score,
        conversionRate: store?.conversionRate,
        durationMinutes: alert.durationMinutes,
        startedAt: alert.startedAt,
        triggerMetric: getTriggerMetric(alert, store),
        suggestedAction: alert.suggestedAction
      };
    })
    .filter((row) => {
      if (filters.level && row.level !== filters.level) {
        return false;
      }

      if (filters.status && row.status !== filters.status) {
        return false;
      }

      if (filters.floorId && filters.floorId !== 'all' && row.floorId !== filters.floorId) {
        return false;
      }

      if (filters.storeId && row.storeId !== filters.storeId) {
        return false;
      }

      if (keyword) {
        const haystack = `${row.id} ${row.title} ${row.floorName} ${row.storeName} ${row.triggerMetric}`.toLowerCase();

        if (!haystack.includes(keyword)) {
          return false;
        }
      }

      return true;
    })
    .sort((left, right) => {
      const levelWeight: Record<AlertLevel, number> = { high: 0, medium: 1, low: 2 };
      const statusWeight: Record<AlertStatus, number> = { open: 0, in_progress: 1, resolved: 2 };

      return (
        statusWeight[left.status] - statusWeight[right.status] ||
        levelWeight[left.level] - levelWeight[right.level] ||
        right.durationMinutes - left.durationMinutes
      );
    });
}

function buildDetailMetrics(alert?: StoreAlertRow): AlertDetailMetric[] {
  if (!alert) {
    return [];
  }

  return [
    {
      label: '风险等级',
      value: alert.level === 'high' ? '高风险' : alert.level === 'medium' ? '中风险' : '低风险',
      hint: '用于确定告警处理优先级'
    },
    {
      label: '处理状态',
      value: alert.status === 'open' ? '未处理' : alert.status === 'in_progress' ? '处理中' : '已处理',
      hint: 'Mock 流程状态，不代表真实工单'
    },
    {
      label: '持续时间',
      value: `${alert.durationMinutes} 分钟`,
      hint: '从触发时间到当前统计时间'
    },
    {
      label: '触发指标',
      value: alert.triggerMetric,
      hint: '来自虚构店铺评分和楼层状态'
    }
  ];
}

function buildActionItems(alert?: StoreAlertRow): AlertActionItem[] {
  if (!alert) {
    return [];
  }

  const shared = [
    {
      label: '记录处理结论',
      detail: '在真实系统中应写入工单或操作日志；当前仅展示 Mock 建议。'
    },
    {
      label: '复核数据质量',
      detail: '确认 ROI、进出店线段、事件去重和营业时间配置是否合理。'
    }
  ];

  if (alert.type === 'crowding') {
    return [
      {
        label: '现场分流',
        detail: '通知楼层主管观察主动线，必要时调整入口和扶梯附近客流引导。'
      },
      ...shared
    ];
  }

  if (alert.type === 'data_quality') {
    return [
      {
        label: '检查采集配置',
        detail: '优先复核摄像头视角、ROI 边界、线段方向和采样间隔。'
      },
      ...shared
    ];
  }

  return [
    {
      label: '运营巡检',
      detail: '安排运营人员到店检查陈列、入口可见性、活动牌和现场服务状态。'
    },
    {
      label: '优化转化动作',
      detail: '结合店铺分析页查看曝光、进店、停留和评分拆解，再决定调铺或活动策略。'
    },
    ...shared
  ];
}

function buildSummary(alerts: StoreAlertRow[]): StoreAlertsSummary {
  return {
    total: alerts.length,
    open: alerts.filter((alert) => alert.status === 'open').length,
    inProgress: alerts.filter((alert) => alert.status === 'in_progress').length,
    high: alerts.filter((alert) => alert.level === 'high' && alert.status !== 'resolved').length,
    resolved: alerts.filter((alert) => alert.status === 'resolved').length
  };
}

export function buildStoreAlertsViewModel(
  alerts: StoreAlert[],
  floors: Floor[],
  stores: Store[],
  filters: StoreAlertsFilters
): StoreAlertsViewModel {
  const rows = buildRows(alerts, floors, stores, filters);
  const alertById = new Map(rows.map((alert) => [alert.id, alert]));
  const selectedAlert =
    (filters.alertId ? alertById.get(filters.alertId) : undefined) ??
    rows[0] ??
    undefined;

  return {
    filters,
    rows,
    selectedAlert,
    summary: buildSummary(rows),
    detailMetrics: buildDetailMetrics(selectedAlert),
    actionItems: buildActionItems(selectedAlert),
    selectedFloorName: selectedAlert?.floorName ?? '未选择',
    selectedStoreName: selectedAlert?.storeName ?? '未选择',
    hasRows: rows.length > 0
  };
}
