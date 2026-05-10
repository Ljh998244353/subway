export type DataSource = 'mock' | 'api' | 'replay';

export type ScoreLevel = 'A' | 'B' | 'C' | 'D';

export type MetricStatus = 'normal' | 'info' | 'warning' | 'danger';

export type StoreCategory =
  | '餐饮'
  | '零售'
  | '娱乐'
  | '亲子'
  | '生活服务'
  | '数码'
  | '运动'
  | '快闪';

export type AlertLevel = 'high' | 'medium' | 'low';

export type AlertStatus = 'open' | 'in_progress' | 'resolved';

export type TwinMode = 'heatmap' | 'flow' | 'alerts' | 'score';

export type Mall = {
  id: string;
  name: string;
  city: string;
  timezone: string;
  businessHours: {
    open: string;
    close: string;
  };
  dataSource: DataSource;
  description: string;
};

export type Floor = {
  id: string;
  mallId: string;
  code: string;
  name: string;
  level: number;
  width: number;
  height: number;
  crowdingThreshold: number;
  currentOccupancy: number;
  todayTraffic: number;
  crowdingIndex: number;
  alertCount: number;
};

export type StoreGeometry = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type StoreScoreBreakdown = {
  traffic: number;
  conversion: number;
  dwell: number;
  trend: number;
};

export type StoreScore = {
  score: number;
  level: ScoreLevel;
  breakdown: StoreScoreBreakdown;
  trendDelta: number;
  reasons: string[];
};

export type Store = {
  id: string;
  mallId: string;
  floorId: string;
  name: string;
  category: StoreCategory;
  geometry: StoreGeometry;
  exposureTraffic: number;
  enterCount: number;
  conversionRate: number;
  avgDwellMinutes: number;
  currentOccupancy: number;
  score: StoreScore;
  alertIds: string[];
};

export type HeatmapPoint = {
  id: string;
  floorId: string;
  x: number;
  y: number;
  intensity: number;
};

export type FlowEdge = {
  id: string;
  floorId: string;
  from: {
    x: number;
    y: number;
  };
  to: {
    x: number;
    y: number;
  };
  traffic: number;
  direction: 'inbound' | 'outbound' | 'cross';
};

export type OverviewMetric = {
  id: string;
  label: string;
  value: number;
  unit: string;
  status: MetricStatus;
  trendDelta: number;
  timeWindow: string;
  description: string;
};

export type TrafficTrendPoint = {
  timestamp: string;
  currentOccupancy: number;
  todayTrafficDelta: number;
  crowdingIndex: number;
};

export type FloorSummary = {
  floorId: string;
  floorName: string;
  traffic: number;
  crowdingIndex: number;
  alertCount: number;
};

export type OverviewSnapshot = {
  mallId: string;
  generatedAt: string;
  source: DataSource;
  metrics: OverviewMetric[];
  trafficTrend: TrafficTrendPoint[];
  floorSummaries: FloorSummary[];
  inefficientStoreIds: string[];
  alertIds: string[];
};

export type AlertType =
  | 'low_conversion'
  | 'score_decline'
  | 'low_score'
  | 'crowding'
  | 'data_quality';

export type StoreAlert = {
  id: string;
  mallId: string;
  floorId: string;
  storeId?: string;
  type: AlertType;
  level: AlertLevel;
  status: AlertStatus;
  title: string;
  description: string;
  suggestedAction: string;
  startedAt: string;
  durationMinutes: number;
};

export type CustomerTimeBucket = {
  hour: number;
  traffic: number;
  share: number;
};

export type FloorPreference = {
  floorId: string;
  trafficShare: number;
  dwellShare: number;
};

export type CategoryPreference = {
  category: StoreCategory;
  trafficShare: number;
  dwellShare: number;
  conversionRate: number;
};

export type CustomerProfile = {
  mallId: string;
  generatedAt: string;
  source: DataSource;
  activeTimeRange: string;
  primaryFloorId: string;
  topCategories: StoreCategory[];
  revisitTendency: number;
  timeDistribution: CustomerTimeBucket[];
  floorPreferences: FloorPreference[];
  categoryPreferences: CategoryPreference[];
  privacyNote: string;
};
