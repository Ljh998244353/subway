import { mockOverview } from '../mock/mockOverview.ts';
import type { DataSource, MetricStatus, OverviewMetric, OverviewSnapshot } from '../types/index.ts';
import { resolveApiBaseUrl, resolveFrontendDataMode, type FrontendDataMode } from './apiMode.ts';
import {
  createReferenceApiClient,
  type OverviewDto,
  type OverviewMetricDto,
  type ReferenceApiClient
} from './referenceClient.ts';

export type OverviewDataSource = 'mock' | 'api';

export type OverviewDataLoaderOptions = {
  mode?: string;
  apiBaseUrl?: string;
  mallId?: string;
  client?: Pick<ReferenceApiClient, 'getOverview'>;
  fetchImpl?: typeof fetch;
  requestIdFactory?: () => string;
};

export type OverviewDataResult = {
  mode: FrontendDataMode;
  source: OverviewDataSource;
  overview: OverviewSnapshot;
  traceId?: string;
  timestamp?: string;
};

const DEFAULT_API_SOURCE: DataSource = 'api';
const DEFAULT_METRIC_STATUS: MetricStatus = 'info';

export async function loadOverviewData(options: OverviewDataLoaderOptions = {}): Promise<OverviewDataResult> {
  const mode = resolveFrontendDataMode(options.mode);

  if (mode === 'mock') {
    return {
      mode,
      source: 'mock',
      overview: mockOverview
    };
  }

  const client =
    options.client ??
    createReferenceApiClient({
      baseUrl: resolveApiBaseUrl(options.apiBaseUrl),
      fetchImpl: options.fetchImpl,
      requestIdFactory: options.requestIdFactory
    });
  const response = await client.getOverview(options.mallId ?? mockOverview.mallId);

  return {
    mode,
    source: 'api',
    overview: mapOverviewDtoToSnapshot(response.data),
    traceId: response.traceId,
    timestamp: response.timestamp
  };
}

export function mapOverviewDtoToSnapshot(dto: OverviewDto): OverviewSnapshot {
  return {
    mallId: dto.mallId,
    generatedAt: dto.generatedAt,
    source: normalizeDataSource(dto.source),
    metrics: dto.metrics.map(mapOverviewMetric),
    trafficTrend: dto.trafficTrend.map((point) => ({ ...point })),
    floorSummaries: dto.floorSummaries.map((floor) => ({ ...floor })),
    inefficientStoreIds: [...dto.inefficientStoreIds],
    alertIds: [...dto.alertIds]
  };
}

function mapOverviewMetric(metric: OverviewMetricDto): OverviewMetric {
  return {
    ...metric,
    status: normalizeMetricStatus(metric.status)
  };
}

function normalizeDataSource(source: string): DataSource {
  if (source === 'mock' || source === 'api' || source === 'replay') {
    return source;
  }

  return DEFAULT_API_SOURCE;
}

function normalizeMetricStatus(status: string): MetricStatus {
  if (status === 'normal' || status === 'info' || status === 'warning' || status === 'danger') {
    return status;
  }

  return DEFAULT_METRIC_STATUS;
}
