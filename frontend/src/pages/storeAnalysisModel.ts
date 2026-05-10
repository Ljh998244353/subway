import type { AlertStatus, Floor, ScoreLevel, Store, StoreAlert, StoreCategory } from '../types/index.ts';

export type StoreAnalysisFilters = {
  floorId?: string;
  category?: StoreCategory;
  scoreLevel?: ScoreLevel;
  keyword?: string;
  storeId?: string;
};

export type StoreAnalysisRow = {
  id: string;
  name: string;
  floorId: string;
  floorName: string;
  category: StoreCategory;
  score: number;
  level: ScoreLevel;
  conversionRate: number;
  avgDwellMinutes: number;
  alertCount: number;
  reasons: string[];
};

export type StoreDetailMetric = {
  label: string;
  value: string;
  hint: string;
};

export type StoreRelatedAlert = {
  id: string;
  title: string;
  status: AlertStatus;
  durationMinutes: number;
};

export type StoreAnalysisViewModel = {
  filters: StoreAnalysisFilters;
  rows: StoreAnalysisRow[];
  selectedStore?: Store;
  selectedFloorName: string;
  relatedAlerts: StoreRelatedAlert[];
  detailMetrics: StoreDetailMetric[];
  inefficientReasonText: string[];
  availableCategories: StoreCategory[];
  availableLevels: ScoreLevel[];
  hasRows: boolean;
};

const scoreLevels: ScoreLevel[] = ['A', 'B', 'C', 'D'];

function matchesFilter(store: Store, filters: StoreAnalysisFilters) {
  const keyword = filters.keyword?.trim().toLowerCase();

  if (filters.floorId && filters.floorId !== 'all' && store.floorId !== filters.floorId) {
    return false;
  }

  if (filters.category && filters.category !== store.category) {
    return false;
  }

  if (filters.scoreLevel && filters.scoreLevel !== store.score.level) {
    return false;
  }

  if (keyword && !store.name.toLowerCase().includes(keyword) && !store.category.toLowerCase().includes(keyword)) {
    return false;
  }

  return true;
}

function buildRows(stores: Store[], floors: Floor[], filters: StoreAnalysisFilters): StoreAnalysisRow[] {
  const floorNameById = new Map(floors.map((floor) => [floor.id, floor.name]));

  return stores
    .filter((store) => matchesFilter(store, filters))
    .map((store) => ({
      id: store.id,
      name: store.name,
      floorId: store.floorId,
      floorName: floorNameById.get(store.floorId) ?? store.floorId,
      category: store.category,
      score: store.score.score,
      level: store.score.level,
      conversionRate: store.conversionRate,
      avgDwellMinutes: store.avgDwellMinutes,
      alertCount: store.alertIds.length,
      reasons: store.score.reasons
    }))
    .sort((left, right) => left.score - right.score || right.alertCount - left.alertCount);
}

function buildDetailMetrics(store?: Store): StoreDetailMetric[] {
  if (!store) {
    return [];
  }

  return [
    {
      label: '曝光客流',
      value: `${store.exposureTraffic.toLocaleString('zh-CN')} 人次`,
      hint: '门前或相关 ROI 经过人数'
    },
    {
      label: '进店人数',
      value: `${store.enterCount.toLocaleString('zh-CN')} 人`,
      hint: '入店线段正向事件计数'
    },
    {
      label: '进店转化率',
      value: `${store.conversionRate}%`,
      hint: '进店人数 / 曝光客流'
    },
    {
      label: '平均停留',
      value: `${store.avgDwellMinutes} 分钟`,
      hint: '访问会话平均持续时间'
    },
    {
      label: '店内人数',
      value: `${store.currentOccupancy} 人`,
      hint: '当前店内估算人数'
    }
  ];
}

function buildReasonText(store?: Store) {
  if (!store) {
    return ['当前筛选没有可分析店铺'];
  }

  if (store.score.level === 'A' || store.score.level === 'B') {
    return ['表现稳定，持续观察客流和转化变化'];
  }

  return store.score.reasons.map((reason) => {
    if (reason === '高曝光低进店') {
      return '高曝光低进店：门前经过人数较高，但进店转化偏低。';
    }

    if (reason === '转化率低于同业态') {
      return '转化率低于同业态：建议复核陈列、动线和活动引导。';
    }

    if (reason === '停留时长偏短') {
      return '停留时长偏短：顾客进入后停留不足，可能需要优化体验或服务。';
    }

    if (reason === '连续三个时段下滑') {
      return '连续三个时段下滑：评分趋势需要运营介入跟踪。';
    }

    return '数据质量需要复核：检查 ROI、线段方向和事件去重状态。';
  });
}

export function buildStoreAnalysisViewModel(
  stores: Store[],
  alerts: StoreAlert[],
  floors: Floor[],
  filters: StoreAnalysisFilters
): StoreAnalysisViewModel {
  const rows = buildRows(stores, floors, filters);
  const storeById = new Map(stores.map((store) => [store.id, store]));
  const selectedStore =
    (filters.storeId ? storeById.get(filters.storeId) : undefined) ??
    storeById.get(rows[0]?.id ?? '') ??
    undefined;
  const floorNameById = new Map(floors.map((floor) => [floor.id, floor.name]));
  const relatedAlerts = selectedStore
    ? alerts
        .filter((alert) => alert.storeId === selectedStore.id)
        .map((alert) => ({
          id: alert.id,
          title: alert.title,
          status: alert.status,
          durationMinutes: alert.durationMinutes
        }))
    : [];

  return {
    filters,
    rows,
    selectedStore,
    selectedFloorName: selectedStore ? floorNameById.get(selectedStore.floorId) ?? selectedStore.floorId : '未选择',
    relatedAlerts,
    detailMetrics: buildDetailMetrics(selectedStore),
    inefficientReasonText: buildReasonText(selectedStore),
    availableCategories: Array.from(new Set(stores.map((store) => store.category))).sort(),
    availableLevels: scoreLevels,
    hasRows: rows.length > 0
  };
}
