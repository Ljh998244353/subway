export type {
  AlertLevel,
  AlertStatus,
  AlertType,
  CategoryPreference,
  CustomerProfile,
  CustomerTimeBucket,
  DataSource,
  Floor,
  FloorPreference,
  FloorSummary,
  FlowEdge,
  HeatmapPoint,
  Mall,
  MetricStatus,
  OverviewMetric,
  OverviewSnapshot,
  ScoreLevel,
  Store,
  StoreAlert,
  StoreCategory,
  StoreGeometry,
  StoreScore,
  StoreScoreBreakdown,
  TrafficTrendPoint,
  TwinMode
} from './domain.ts';

export type ViewMode = 'overview' | 'floor' | 'store';
export type DataLayer = 'heatmap' | 'flow' | 'alerts' | 'score';
export type FlowScope = 'inbound' | 'outbound';
export type FloorId = 'B1' | 'F1' | 'F2' | 'F3' | 'F4';
export type ViewportMode = '2d' | '3d';
export type EnterpriseStoreCategory = 'Retail' | 'Food' | 'Entertainment' | 'Public';
export type StoreGrade = 'A+' | 'A' | 'B' | 'C-';

export interface TwinUrlState {
  view: ViewMode;
  floorId: FloorId;
  storeId?: string;
  mode: DataLayer;
  flowScope: FlowScope;
  viewport: ViewportMode;
}

export interface StoreMetric {
  id: string;
  name: string;
  floorId: FloorId;
  category: EnterpriseStoreCategory;
  grade: StoreGrade;
  liveOccupancy: number;
  entryRate: number;
  avgDwellTime: number;
  hasWarning: boolean;
  warningText?: string;
  score: number;
  x: number;
  y: number;
}

export interface FloorMetric {
  id: FloorId;
  name: string;
  level: number;
  liveOccupancy: number;
  todayTraffic: number;
  crowdingIndex: number;
  alertCount: number;
}

export interface AlertEvent {
  id: string;
  timestamp: string;
  level: 'warning' | 'critical';
  area: string;
  message: string;
  isResolved: boolean;
  storeId?: string;
  floorId: FloorId;
  action: 'dispatch' | 'simulate';
}

export interface HeatPoint {
  id: string;
  floorId: FloorId;
  x: number;
  y: number;
  intensity: number;
}

export interface NavNode {
  id: string;
  floor: FloorId;
  x: number;
  y: number;
  type: 'corridor' | 'escalator' | 'elevator' | 'store_gate';
}

export interface NavEdge {
  source: string;
  target: string;
  distance: number;
}

export interface NavGraph {
  nodes: NavNode[];
  edges: NavEdge[];
}

export interface FlowPath {
  id: string;
  floorId: FloorId;
  storeId: string;
  scope: FlowScope;
  density: number;
  nodes: NavNode[];
}
