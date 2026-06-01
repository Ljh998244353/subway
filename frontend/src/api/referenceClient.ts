import { resolveApiBaseUrl } from './apiMode.ts';

export type PageMetaDto = {
  page: number;
  pageSize: number;
  total: number;
  hasNext: boolean;
};

export type ApiListEnvelope<T> = {
  data: T[];
  page: PageMetaDto;
  traceId: string;
  timestamp: string;
};

export type ApiEnvelope<T> = {
  data: T;
  traceId: string;
  timestamp: string;
};

export type ApiErrorEnvelope = {
  error: {
    code: string;
    message: string;
    details: Record<string, unknown>;
  };
  traceId: string;
  timestamp: string;
};

export type BusinessHoursDto = {
  open: string;
  close: string;
};

export type MallDto = {
  mallId: string;
  name: string;
  timezone: string;
  businessHours: BusinessHoursDto;
};

export type FloorDto = {
  floorId: string;
  mallId: string;
  name: string;
  levelNo: number;
  width: number;
  height: number;
  crowdWarningThreshold: number | null;
};

export type BBoxDto = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type StoreDto = {
  storeId: string;
  mallId: string;
  floorId: string;
  categoryId: string;
  name: string;
  unitCode: string;
  areaSqm: number;
  status: string;
  bbox: BBoxDto;
};

export type StoreScoreBreakdownDto = {
  flow: number;
  conversion: number;
  dwell: number;
  trend: number;
  profileFit: number;
  penalty: number;
};

export type StoreScoreWeightsDto = {
  flow: number;
  conversion: number;
  dwell: number;
  trend: number;
  profileFit: number;
};

export type StoreScoreInputDto = {
  exposureTraffic: number;
  enterCount: number;
  conversionRate: number;
  avgDwellMinutes: number;
  trendIndex: number;
  profileFitIndex: number;
  operationalPenalty: number;
};

export type StoreScoreDto = {
  storeId: string;
  date: string;
  source: string;
  formulaVersion: string;
  score: number;
  grade: string;
  weights: StoreScoreWeightsDto;
  inputs: StoreScoreInputDto;
  breakdown: StoreScoreBreakdownDto;
  explanations: string[];
};

export type StoreFlowPointDto = {
  timestamp: string;
  exposureTraffic: number;
  enterCount: number;
  conversionRate: number;
};

export type StoreFlowDto = {
  storeId: string;
  granularity: string;
  points: StoreFlowPointDto[];
};

export type StoreRankingItemDto = {
  rank: number;
  storeId: string;
  mallId: string;
  floorId: string;
  categoryId: string;
  name: string;
  score: number;
  grade: string;
};

export type StoreRankingQuery = {
  mallId: string;
  floorId?: string;
  categoryId?: string;
  grade?: string;
  minScore?: number;
  maxScore?: number;
  limit?: number;
};

export type StoreAlertEvidenceDto = {
  flowIndex: number;
  conversionRate: number;
  categoryMedianConversionRate: number;
};

export type StoreAlertDto = {
  alertId: string;
  mallId: string;
  floorId: string;
  storeId: string | null;
  type: string;
  severity: string;
  status: string;
  detectedAt: string;
  summary: string;
  evidence: StoreAlertEvidenceDto;
};

export type CustomerTimeBucketDto = {
  hour: number;
  traffic: number;
  share: number;
};

export type FloorPreferenceDto = {
  floorId: string;
  trafficShare: number;
  dwellShare: number;
};

export type CategoryPreferenceDto = {
  category: string;
  trafficShare: number;
  dwellShare: number;
  conversionRate: number;
};

export type CustomerProfileDto = {
  mallId: string;
  generatedAt: string;
  source: string;
  activeTimeRange: string;
  primaryFloorId: string;
  topCategories: string[];
  revisitTendency: number;
  timeDistribution: CustomerTimeBucketDto[];
  floorPreferences: FloorPreferenceDto[];
  categoryPreferences: CategoryPreferenceDto[];
  privacyNote: string;
};

export type HeatmapPointDto = {
  pointId: string;
  floorId: string;
  x: number;
  y: number;
  intensity: number;
};

export type HeatmapDto = {
  mallId: string;
  generatedAt: string;
  source: string;
  granularity: string;
  points: HeatmapPointDto[];
};

export type PointDto = {
  x: number;
  y: number;
};

export type TrajectoryFlowDto = {
  flowId: string;
  floorId: string;
  fromPoint: PointDto;
  toPoint: PointDto;
  traffic: number;
  direction: string;
};

export type TrajectoriesDto = {
  mallId: string;
  generatedAt: string;
  source: string;
  aggregation: string;
  flows: TrajectoryFlowDto[];
};

export type OverviewMetricDto = {
  id: string;
  label: string;
  value: number;
  unit: string;
  status: string;
  trendDelta: number;
  timeWindow: string;
  description: string;
};

export type TrafficTrendPointDto = {
  timestamp: string;
  currentOccupancy: number;
  todayTrafficDelta: number;
  crowdingIndex: number;
};

export type FloorSummaryDto = {
  floorId: string;
  floorName: string;
  traffic: number;
  crowdingIndex: number;
  alertCount: number;
};

export type OverviewDto = {
  mallId: string;
  generatedAt: string;
  source: string;
  metrics: OverviewMetricDto[];
  trafficTrend: TrafficTrendPointDto[];
  floorSummaries: FloorSummaryDto[];
  inefficientStoreIds: string[];
  alertIds: string[];
};

export type ReferenceApiClient = {
  listMalls: () => Promise<ApiListEnvelope<MallDto>>;
  listFloors: (mallId: string) => Promise<ApiListEnvelope<FloorDto>>;
  listStores: (floorId: string) => Promise<ApiListEnvelope<StoreDto>>;
  getStore: (storeId: string) => Promise<ApiEnvelope<StoreDto>>;
  getStoreScore: (storeId: string) => Promise<ApiEnvelope<StoreScoreDto>>;
  getStoreFlow: (storeId: string) => Promise<ApiEnvelope<StoreFlowDto>>;
  getStoreRanking: (query: string | StoreRankingQuery) => Promise<ApiListEnvelope<StoreRankingItemDto>>;
  listStoreAlerts: (mallId: string) => Promise<ApiListEnvelope<StoreAlertDto>>;
  getCustomerProfile: (mallId: string) => Promise<ApiEnvelope<CustomerProfileDto>>;
  getHeatmap: (mallId: string) => Promise<ApiEnvelope<HeatmapDto>>;
  getTrajectories: (mallId: string) => Promise<ApiEnvelope<TrajectoriesDto>>;
  getOverview: (mallId: string) => Promise<ApiEnvelope<OverviewDto>>;
};

export type ReferenceApiClientOptions = {
  baseUrl?: string;
  fetchImpl?: typeof fetch;
  requestIdFactory?: () => string;
};

export class ApiClientError extends Error {
  readonly status: number;
  readonly code: string;
  readonly details: Record<string, unknown>;
  readonly traceId: string | undefined;

  constructor(status: number, envelope: ApiErrorEnvelope) {
    super(envelope.error.message);
    this.name = 'ApiClientError';
    this.status = status;
    this.code = envelope.error.code;
    this.details = envelope.error.details;
    this.traceId = envelope.traceId;
  }
}

export function createReferenceApiClient(options: ReferenceApiClientOptions = {}): ReferenceApiClient {
  const baseUrl = resolveApiBaseUrl(options.baseUrl);
  const fetchImpl = options.fetchImpl ?? fetch;
  const requestIdFactory = options.requestIdFactory;

  return {
    listMalls: () => requestList<MallDto>(fetchImpl, baseUrl, '/api/v1/malls', requestIdFactory),
    listFloors: (mallId: string) =>
      requestList<FloorDto>(fetchImpl, baseUrl, `/api/v1/malls/${encodeURIComponent(mallId)}/floors`, requestIdFactory),
    listStores: (floorId: string) =>
      requestList<StoreDto>(fetchImpl, baseUrl, `/api/v1/floors/${encodeURIComponent(floorId)}/stores`, requestIdFactory),
    getStore: (storeId: string) =>
      requestObject<StoreDto>(fetchImpl, baseUrl, `/api/v1/stores/${encodeURIComponent(storeId)}`, requestIdFactory),
    getStoreScore: (storeId: string) =>
      requestObject<StoreScoreDto>(fetchImpl, baseUrl, `/api/v1/stores/${encodeURIComponent(storeId)}/score`, requestIdFactory),
    getStoreFlow: (storeId: string) =>
      requestObject<StoreFlowDto>(fetchImpl, baseUrl, `/api/v1/stores/${encodeURIComponent(storeId)}/flow`, requestIdFactory),
    getStoreRanking: (query: string | StoreRankingQuery) =>
      requestList<StoreRankingItemDto>(fetchImpl, baseUrl, `/api/v1/stores/ranking?${buildStoreRankingQuery(query)}`, requestIdFactory),
    listStoreAlerts: (mallId: string) =>
      requestList<StoreAlertDto>(fetchImpl, baseUrl, `/api/v1/alerts/stores?mallId=${encodeURIComponent(mallId)}`, requestIdFactory),
    getCustomerProfile: (mallId: string) =>
      requestObject<CustomerProfileDto>(fetchImpl, baseUrl, `/api/v1/customer-profile?mallId=${encodeURIComponent(mallId)}`, requestIdFactory),
    getHeatmap: (mallId: string) =>
      requestObject<HeatmapDto>(fetchImpl, baseUrl, `/api/v1/heatmap?mallId=${encodeURIComponent(mallId)}`, requestIdFactory),
    getTrajectories: (mallId: string) =>
      requestObject<TrajectoriesDto>(fetchImpl, baseUrl, `/api/v1/trajectories?mallId=${encodeURIComponent(mallId)}`, requestIdFactory),
    getOverview: (mallId: string) =>
      requestObject<OverviewDto>(fetchImpl, baseUrl, `/api/v1/overview?mallId=${encodeURIComponent(mallId)}`, requestIdFactory)
  };
}

function buildStoreRankingQuery(query: string | StoreRankingQuery) {
  const normalized = typeof query === 'string' ? { mallId: query } : query;
  const entries: Array<[string, string]> = [['mallId', normalized.mallId]];
  if (normalized.floorId) entries.push(['floorId', normalized.floorId]);
  if (normalized.categoryId) entries.push(['categoryId', normalized.categoryId]);
  if (normalized.grade) entries.push(['grade', normalized.grade]);
  if (normalized.minScore !== undefined) entries.push(['minScore', String(normalized.minScore)]);
  if (normalized.maxScore !== undefined) entries.push(['maxScore', String(normalized.maxScore)]);
  if (normalized.limit !== undefined) entries.push(['limit', String(normalized.limit)]);
  return entries.map(([key, value]) => `${key}=${encodeURIComponent(value)}`).join('&');
}

async function requestList<T>(
  fetchImpl: typeof fetch,
  baseUrl: string,
  path: string,
  requestIdFactory: (() => string) | undefined
): Promise<ApiListEnvelope<T>> {
  return requestJson<ApiListEnvelope<T>>(fetchImpl, baseUrl, path, requestIdFactory);
}

async function requestObject<T>(
  fetchImpl: typeof fetch,
  baseUrl: string,
  path: string,
  requestIdFactory: (() => string) | undefined
): Promise<ApiEnvelope<T>> {
  return requestJson<ApiEnvelope<T>>(fetchImpl, baseUrl, path, requestIdFactory);
}

async function requestJson<T>(
  fetchImpl: typeof fetch,
  baseUrl: string,
  path: string,
  requestIdFactory: (() => string) | undefined
): Promise<T> {
  const headers: Record<string, string> = {
    Accept: 'application/json'
  };
  const requestId = requestIdFactory?.();
  if (requestId) {
    headers['X-Request-Id'] = requestId;
  }

  const response = await fetchImpl(`${baseUrl}${path}`, { headers });
  const payload = (await response.json()) as T | ApiErrorEnvelope;

  if (!response.ok) {
    throw new ApiClientError(response.status, payload as ApiErrorEnvelope);
  }

  return payload as T;
}
