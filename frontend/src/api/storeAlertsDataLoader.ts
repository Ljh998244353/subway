import { mockAlerts, mockFloors, mockMall, mockStoresWithAlerts } from '../mock/index.ts';
import { storeCategories } from '../mock/mockStores.ts';
import type { AlertLevel, AlertStatus, AlertType, Floor, Store, StoreAlert, StoreCategory } from '../types/index.ts';
import { resolveApiBaseUrl, resolveFrontendDataMode, type FrontendDataMode } from './apiMode.ts';
import {
  createReferenceApiClient,
  type ReferenceApiClient,
  type StoreAlertDto,
  type StoreDto
} from './referenceClient.ts';

export type StoreAlertsDataSource = 'mock' | 'api';

export type StoreAlertsDataLoaderOptions = {
  mode?: string;
  apiBaseUrl?: string;
  mallId?: string;
  client?: Pick<ReferenceApiClient, 'listStoreAlerts' | 'getStore'>;
  fetchImpl?: typeof fetch;
  requestIdFactory?: () => string;
  now?: () => Date;
};

export type StoreAlertsDataResult = {
  mode: FrontendDataMode;
  source: StoreAlertsDataSource;
  alerts: StoreAlert[];
  floors: Floor[];
  stores: Store[];
  traceIds: string[];
  timestamp?: string;
};

const categoryByApiId: Record<string, StoreCategory> = {
  cat_food: storeCategories[0],
  cat_fashion: storeCategories[1],
  cat_entertainment: storeCategories[2],
  cat_parent_child: storeCategories[3],
  cat_lifestyle: storeCategories[4],
  cat_digital: storeCategories[5],
  cat_sports: storeCategories[6],
  cat_popup: storeCategories[7]
};

const actionByType: Record<AlertType, string> = {
  low_conversion: '复核门前动线和陈列吸引力，安排店员主动引导。',
  score_decline: '对比近三日进店、转化和停留变化，确认是否需要运营介入。',
  low_score: '列入今日重点巡检清单，并与店铺负责人确认改善动作。',
  crowding: '通知楼层主管疏导主动线，并观察入口分流效果。',
  data_quality: '检查对应摄像头 ROI、线段方向和事件去重状态。'
};

export async function loadStoreAlertsData(
  options: StoreAlertsDataLoaderOptions = {}
): Promise<StoreAlertsDataResult> {
  const mode = resolveFrontendDataMode(options.mode);

  if (mode === 'mock') {
    return {
      mode,
      source: 'mock',
      alerts: mockAlerts,
      floors: mockFloors,
      stores: mockStoresWithAlerts,
      traceIds: []
    };
  }

  const client =
    options.client ??
    createReferenceApiClient({
      baseUrl: resolveApiBaseUrl(options.apiBaseUrl),
      fetchImpl: options.fetchImpl,
      requestIdFactory: options.requestIdFactory
    });
  const mallId = options.mallId ?? mockMall.id;
  const alertsEnvelope = await client.listStoreAlerts(mallId);
  const storeIds = Array.from(
    new Set(alertsEnvelope.data.map((alert) => alert.storeId).filter((storeId): storeId is string => Boolean(storeId)))
  );
  const storeEnvelopes = await Promise.all(storeIds.map((storeId) => client.getStore(storeId)));
  const storeById = new Map(storeEnvelopes.map((envelope) => [envelope.data.storeId, mapApiStoreToAlertStore(envelope.data)]));
  const now = options.now?.() ?? new Date();

  return {
    mode,
    source: 'api',
    alerts: alertsEnvelope.data.map((alert) => mapApiStoreAlertToDomain(alert, now)),
    floors: mockFloors,
    stores: Array.from(storeById.values()),
    traceIds: [alertsEnvelope.traceId, ...storeEnvelopes.map((envelope) => envelope.traceId)],
    timestamp: alertsEnvelope.timestamp
  };
}

export function mapApiStoreAlertToDomain(alert: StoreAlertDto, now: Date = new Date()): StoreAlert {
  const type = normalizeAlertType(alert.type);
  const detectedAt = new Date(alert.detectedAt);

  return {
    id: alert.alertId,
    mallId: alert.mallId,
    floorId: alert.floorId,
    storeId: alert.storeId ?? undefined,
    type,
    level: normalizeAlertLevel(alert.severity),
    status: normalizeAlertStatus(alert.status),
    title: alert.summary,
    description: buildAlertDescription(alert, type),
    suggestedAction: actionByType[type],
    startedAt: alert.detectedAt,
    durationMinutes: getDurationMinutes(detectedAt, now)
  };
}

function mapApiStoreToAlertStore(store: StoreDto): Store {
  return {
    id: store.storeId,
    mallId: store.mallId,
    floorId: store.floorId,
    name: store.name,
    category: categoryByApiId[store.categoryId] ?? storeCategories[1],
    geometry: { ...store.bbox },
    exposureTraffic: 0,
    enterCount: 0,
    conversionRate: 0,
    avgDwellMinutes: 0,
    currentOccupancy: 0,
    score: {
      score: 0,
      level: 'C',
      breakdown: {
        traffic: 0,
        conversion: 0,
        dwell: 0,
        trend: 0
      },
      trendDelta: 0,
      reasons: ['Synthetic API alert fixture']
    },
    alertIds: []
  };
}

function buildAlertDescription(alert: StoreAlertDto, type: AlertType): string {
  if (type === 'crowding') {
    return `${alert.floorId} 触发拥挤预警，当前客流指数 ${alert.evidence.flowIndex}。`;
  }

  return `${alert.summary}，当前转化率 ${(alert.evidence.conversionRate * 100).toFixed(1)}%，品类中位 ${(alert.evidence.categoryMedianConversionRate * 100).toFixed(1)}%。`;
}

function getDurationMinutes(startedAt: Date, now: Date): number {
  if (Number.isNaN(startedAt.getTime())) {
    return 0;
  }

  return Math.max(0, Math.round((now.getTime() - startedAt.getTime()) / 60000));
}

function normalizeAlertType(value: string): AlertType {
  if (
    value === 'low_conversion' ||
    value === 'score_decline' ||
    value === 'low_score' ||
    value === 'crowding' ||
    value === 'data_quality'
  ) {
    return value;
  }

  return 'data_quality';
}

function normalizeAlertLevel(value: string): AlertLevel {
  if (value === 'critical') {
    return 'high';
  }

  if (value === 'warning') {
    return 'medium';
  }

  if (value === 'info') {
    return 'low';
  }

  if (value === 'high' || value === 'medium' || value === 'low') {
    return value;
  }

  return 'medium';
}

function normalizeAlertStatus(value: string): AlertStatus {
  if (value === 'open' || value === 'in_progress' || value === 'resolved') {
    return value;
  }

  return 'open';
}
