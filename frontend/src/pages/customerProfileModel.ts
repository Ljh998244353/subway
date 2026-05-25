import type {
  CategoryPreference,
  CustomerProfile,
  CustomerTimeBucket,
  Floor,
  FloorPreference,
  MetricStatus,
  OverviewMetric,
  StoreCategory
} from '../types/index.ts';

export type CustomerProfileFilters = {
  floorId?: string;
  category?: StoreCategory | 'all';
  dataSourceLabel?: 'Mock' | 'API';
};

export type CustomerProfileSummaryMetric = OverviewMetric & {
  displayValue: string;
};

export type TimeDistributionRow = CustomerTimeBucket & {
  label: string;
  sharePercent: number;
  isPeak: boolean;
};

export type FloorPreferenceRow = FloorPreference & {
  floorCode: string;
  floorName: string;
  trafficPercent: number;
  dwellPercent: number;
  isPrimary: boolean;
};

export type CategoryPreferenceRow = CategoryPreference & {
  trafficPercent: number;
  dwellPercent: number;
  isTopCategory: boolean;
};

export type PrivacyBoundary = {
  label: string;
  description: string;
};

export type CustomerProfileViewModel = {
  filters: Required<CustomerProfileFilters>;
  summaryMetrics: CustomerProfileSummaryMetric[];
  timeDistribution: TimeDistributionRow[];
  floorPreferences: FloorPreferenceRow[];
  categoryPreferences: CategoryPreferenceRow[];
  peakTime?: TimeDistributionRow;
  primaryFloor?: FloorPreferenceRow;
  topCategory?: CategoryPreferenceRow;
  filterSummary: string[];
  privacyBoundaries: PrivacyBoundary[];
  smallSampleHidden: boolean;
  hasData: boolean;
};

export const customerProfilePrivacyBoundaries: PrivacyBoundary[] = [
  {
    label: '匿名聚合',
    description: '只展示匿名聚合的时段、楼层和业态占比，不展示个人访问明细。'
  },
  {
    label: '无身份信息',
    description: '不包含会员 ID、手机号、支付账号、设备标识或任何可识别身份字段。'
  },
  {
    label: '无人脸与轨迹',
    description: '不做人脸属性识别，不展示单人路径、个人轨迹或个人级画像。'
  },
  {
    label: '小样本隐藏',
    description: '样本不足时只显示聚合不足提示，不暴露可反推个人的小样本明细。'
  }
];

const minimumTimeBuckets = 3;
const minimumPreferenceRows = 2;

function toPercent(value: number) {
  return Number((value * 100).toFixed(1));
}

function formatHour(hour: number) {
  return `${String(hour).padStart(2, '0')}:00`;
}

function getFloorNameById(floors: Floor[]) {
  return new Map(floors.map((floor) => [floor.id, floor]));
}

function getSummaryStatus(hasData: boolean, smallSampleHidden: boolean): MetricStatus {
  if (!hasData) {
    return 'warning';
  }

  if (smallSampleHidden) {
    return 'info';
  }

  return 'normal';
}

function buildTimeDistribution(profile: CustomerProfile): TimeDistributionRow[] {
  const peakTraffic = Math.max(0, ...profile.timeDistribution.map((bucket) => bucket.traffic));

  return [...profile.timeDistribution]
    .sort((left, right) => left.hour - right.hour)
    .map((bucket) => ({
      ...bucket,
      label: formatHour(bucket.hour),
      sharePercent: toPercent(bucket.share),
      isPeak: bucket.traffic === peakTraffic && peakTraffic > 0
    }));
}

function buildFloorPreferenceRows(
  profile: CustomerProfile,
  floors: Floor[],
  filters: Required<CustomerProfileFilters>
): FloorPreferenceRow[] {
  const floorById = getFloorNameById(floors);

  return profile.floorPreferences
    .filter((preference) => filters.floorId === 'all' || preference.floorId === filters.floorId)
    .map((preference) => {
      const floor = floorById.get(preference.floorId);

      return {
        ...preference,
        floorCode: floor?.code ?? preference.floorId,
        floorName: floor?.name ?? preference.floorId,
        trafficPercent: toPercent(preference.trafficShare),
        dwellPercent: toPercent(preference.dwellShare),
        isPrimary: preference.floorId === profile.primaryFloorId
      };
    })
    .sort((left, right) => right.trafficShare - left.trafficShare);
}

function buildCategoryPreferenceRows(
  profile: CustomerProfile,
  filters: Required<CustomerProfileFilters>
): CategoryPreferenceRow[] {
  const topCategories = new Set(profile.topCategories);

  return profile.categoryPreferences
    .filter((preference) => filters.category === 'all' || preference.category === filters.category)
    .map((preference) => ({
      ...preference,
      trafficPercent: toPercent(preference.trafficShare),
      dwellPercent: toPercent(preference.dwellShare),
      isTopCategory: topCategories.has(preference.category)
    }))
    .sort((left, right) => right.trafficShare - left.trafficShare);
}

function buildSummaryMetrics(
  profile: CustomerProfile,
  floors: Floor[],
  timeDistribution: TimeDistributionRow[],
  floorPreferences: FloorPreferenceRow[],
  categoryPreferences: CategoryPreferenceRow[],
  hasData: boolean,
  smallSampleHidden: boolean
): CustomerProfileSummaryMetric[] {
  const peakTime = timeDistribution.find((bucket) => bucket.isPeak);
  const primaryFloor =
    floorPreferences.find((floor) => floor.isPrimary) ??
    floorPreferences[0] ??
    buildFloorPreferenceRows(profile, floors, { floorId: 'all', category: 'all', dataSourceLabel: 'Mock' })[0];
  const topCategory =
    categoryPreferences.find((category) => category.isTopCategory) ??
    categoryPreferences[0] ??
    buildCategoryPreferenceRows(profile, { floorId: 'all', category: 'all', dataSourceLabel: 'Mock' })[0];
  const sampleStatus = smallSampleHidden ? '聚合不足' : '样本充足';
  const status = getSummaryStatus(hasData, smallSampleHidden);

  return [
    {
      id: 'active-time',
      label: '活跃时段',
      value: peakTime?.hour ?? 0,
      displayValue: peakTime ? `${peakTime.label}` : profile.activeTimeRange,
      unit: '',
      status: hasData ? 'info' : 'warning',
      trendDelta: 0,
      timeWindow: '小时聚合',
      description: peakTime ? `峰值 ${peakTime.traffic.toLocaleString('zh-CN')} 人次` : '当前筛选暂无时段分布'
    },
    {
      id: 'top-category',
      label: '热门业态',
      value: topCategory?.trafficPercent ?? 0,
      displayValue: topCategory?.category ?? '暂无',
      unit: '%',
      status,
      trendDelta: 0,
      timeWindow: '业态聚合',
      description: topCategory ? `客流占比 ${topCategory.trafficPercent}%` : '当前筛选暂无业态偏好'
    },
    {
      id: 'primary-floor',
      label: '主要楼层',
      value: primaryFloor?.trafficPercent ?? 0,
      displayValue: primaryFloor?.floorCode ?? '暂无',
      unit: '%',
      status: primaryFloor?.isPrimary ? 'warning' : status,
      trendDelta: 0,
      timeWindow: '楼层聚合',
      description: primaryFloor ? `${primaryFloor.floorName} 客流占比 ${primaryFloor.trafficPercent}%` : '当前筛选暂无楼层偏好'
    },
    {
      id: 'revisit-tendency',
      label: '复访倾向',
      value: profile.revisitTendency,
      displayValue: `${profile.revisitTendency}%`,
      unit: '%',
      status,
      trendDelta: 0,
      timeWindow: '匿名样本',
      description: `${sampleStatus}，小样本将隐藏明细`
    }
  ];
}

export function buildCustomerProfileViewModel(
  profile: CustomerProfile,
  floors: Floor[],
  filters: CustomerProfileFilters = {}
): CustomerProfileViewModel {
  const normalizedFilters: Required<CustomerProfileFilters> = {
    floorId: filters.floorId || 'all',
    category: filters.category || 'all',
    dataSourceLabel: filters.dataSourceLabel || 'Mock'
  };
  const timeDistribution = buildTimeDistribution(profile);
  const floorPreferences = buildFloorPreferenceRows(profile, floors, normalizedFilters);
  const categoryPreferences = buildCategoryPreferenceRows(profile, normalizedFilters);
  const hasData =
    profile.timeDistribution.length > 0 &&
    profile.floorPreferences.length > 0 &&
    profile.categoryPreferences.length > 0 &&
    floorPreferences.length > 0 &&
    categoryPreferences.length > 0;
  const smallSampleHidden =
    profile.timeDistribution.length < minimumTimeBuckets ||
    profile.floorPreferences.length < minimumPreferenceRows ||
    profile.categoryPreferences.length < minimumPreferenceRows ||
    profile.revisitTendency <= 0;
  const summaryMetrics = buildSummaryMetrics(
    profile,
    floors,
    timeDistribution,
    floorPreferences,
    categoryPreferences,
    hasData,
    smallSampleHidden
  );
  const floorById = getFloorNameById(floors);

  return {
    filters: normalizedFilters,
    summaryMetrics,
    timeDistribution,
    floorPreferences,
    categoryPreferences,
    peakTime: timeDistribution.find((bucket) => bucket.isPeak),
    primaryFloor: floorPreferences.find((floor) => floor.isPrimary) ?? floorPreferences[0],
    topCategory: categoryPreferences.find((category) => category.isTopCategory) ?? categoryPreferences[0],
    filterSummary: [
      `楼层：${normalizedFilters.floorId === 'all' ? '全部楼层' : floorById.get(normalizedFilters.floorId)?.name ?? normalizedFilters.floorId}`,
      `业态：${normalizedFilters.category === 'all' ? '全部业态' : normalizedFilters.category}`,
      `数据源：${normalizedFilters.dataSourceLabel}`,
      `边界：匿名聚合`
    ],
    privacyBoundaries: customerProfilePrivacyBoundaries,
    smallSampleHidden,
    hasData
  };
}

export function getCustomerProfileState(viewModel: CustomerProfileViewModel) {
  if (!viewModel.hasData) {
    return 'empty';
  }

  if (viewModel.smallSampleHidden) {
    return 'partial';
  }

  return 'normal';
}
