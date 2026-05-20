import { mockStoresWithAlerts } from '../mock/index.ts';
import { mockMall } from '../mock/mockMall.ts';
import { storeCategories } from '../mock/mockStores.ts';
import type { ScoreLevel, Store, StoreCategory, StoreScoreBreakdown } from '../types/index.ts';
import { resolveApiBaseUrl, resolveFrontendDataMode, type FrontendDataMode } from './apiMode.ts';
import {
  createReferenceApiClient,
  type ReferenceApiClient,
  type StoreDto,
  type StoreFlowDto,
  type StoreRankingItemDto,
  type StoreScoreDto
} from './referenceClient.ts';

export type StoreAnalysisDataSource = 'mock' | 'api';

export type StoreAnalysisDataLoaderOptions = {
  mode?: string;
  apiBaseUrl?: string;
  mallId?: string;
  selectedStoreId?: string;
  maxStores?: number;
  client?: Pick<ReferenceApiClient, 'getStoreRanking' | 'getStore' | 'getStoreScore' | 'getStoreFlow'>;
  fetchImpl?: typeof fetch;
  requestIdFactory?: () => string;
};

export type StoreAnalysisDataResult = {
  mode: FrontendDataMode;
  source: StoreAnalysisDataSource;
  stores: Store[];
  selectedStoreId?: string;
  traceIds: string[];
  timestamp?: string;
};

const DEFAULT_MAX_API_STORES = 12;

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

export async function loadStoreAnalysisData(
  options: StoreAnalysisDataLoaderOptions = {}
): Promise<StoreAnalysisDataResult> {
  const mode = resolveFrontendDataMode(options.mode);

  if (mode === 'mock') {
    return {
      mode,
      source: 'mock',
      stores: mockStoresWithAlerts,
      selectedStoreId: options.selectedStoreId,
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
  const rankingEnvelope = await client.getStoreRanking(mallId);
  const rankedIds = getApiStoreIds(rankingEnvelope.data, options.selectedStoreId, options.maxStores ?? DEFAULT_MAX_API_STORES);
  const storeEnvelopes = await Promise.all(
    rankedIds.map(async (storeId) => {
      const [store, score, flow] = await Promise.all([
        client.getStore(storeId),
        client.getStoreScore(storeId),
        client.getStoreFlow(storeId)
      ]);

      return { store, score, flow };
    })
  );

  return {
    mode,
    source: 'api',
    stores: storeEnvelopes.map(({ store, score, flow }) => mapApiStoreToDomain(store.data, score.data, flow.data)),
    selectedStoreId: options.selectedStoreId ?? rankedIds[0],
    traceIds: [
      rankingEnvelope.traceId,
      ...storeEnvelopes.flatMap(({ store, score, flow }) => [store.traceId, score.traceId, flow.traceId])
    ],
    timestamp: rankingEnvelope.timestamp
  };
}

export function mapApiStoreToDomain(store: StoreDto, score: StoreScoreDto, flow: StoreFlowDto): Store {
  const totals = getFlowTotals(flow);

  return {
    id: store.storeId,
    mallId: store.mallId,
    floorId: store.floorId,
    name: store.name,
    category: normalizeCategory(store.categoryId),
    geometry: { ...store.bbox },
    exposureTraffic: totals.exposureTraffic,
    enterCount: totals.enterCount,
    conversionRate: totals.conversionRate,
    avgDwellMinutes: Number((5 + score.breakdown.dwell / 5).toFixed(1)),
    currentOccupancy: Math.max(0, Math.round((flow.points.at(-1)?.enterCount ?? 0) * 0.3)),
    score: {
      score: score.score,
      level: normalizeScoreLevel(score.grade),
      breakdown: mapScoreBreakdown(score),
      trendDelta: Number((score.breakdown.trend - 70).toFixed(1)),
      reasons: score.explanations.length > 0 ? [...score.explanations] : ['Synthetic API score fixture']
    },
    alertIds: []
  };
}

function getApiStoreIds(ranking: StoreRankingItemDto[], selectedStoreId: string | undefined, maxStores: number): string[] {
  const limitedIds = ranking.slice(0, Math.max(1, maxStores)).map((item) => item.storeId);

  if (selectedStoreId && !limitedIds.includes(selectedStoreId)) {
    return [selectedStoreId, ...limitedIds];
  }

  return limitedIds;
}

function getFlowTotals(flow: StoreFlowDto) {
  const exposureTraffic = flow.points.reduce((total, point) => total + point.exposureTraffic, 0);
  const enterCount = flow.points.reduce((total, point) => total + point.enterCount, 0);
  const conversionRate = exposureTraffic > 0 ? Number(((enterCount / exposureTraffic) * 100).toFixed(1)) : 0;

  return {
    exposureTraffic,
    enterCount,
    conversionRate
  };
}

function mapScoreBreakdown(score: StoreScoreDto): StoreScoreBreakdown {
  return {
    traffic: score.breakdown.flow,
    conversion: score.breakdown.conversion,
    dwell: score.breakdown.dwell,
    trend: score.breakdown.trend
  };
}

function normalizeScoreLevel(grade: string): ScoreLevel {
  if (grade === 'A' || grade === 'B' || grade === 'C' || grade === 'D') {
    return grade;
  }

  return 'C';
}

function normalizeCategory(categoryId: string): StoreCategory {
  return categoryByApiId[categoryId] ?? storeCategories[1];
}
