import assert from 'node:assert/strict';
import test from 'node:test';
import { mockStoresWithAlerts } from '../mock/index.ts';
import { ApiClientError, type ApiListEnvelope, type StoreDto, type StoreFlowDto, type StoreRankingItemDto, type StoreScoreDto } from './referenceClient.ts';
import { loadStoreAnalysisData, mapApiStoreToDomain } from './storeAnalysisDataLoader.ts';

type FetchCall = {
  url: string;
  init: RequestInit | undefined;
};

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' }
  });
}

function createStoreDto(overrides: Partial<StoreDto> = {}): StoreDto {
  return {
    storeId: 'store_demo_101',
    mallId: 'mall_demo_001',
    floorId: 'floor_demo_l2',
    categoryId: 'cat_lifestyle',
    name: 'Fictional Store 101',
    unitCode: 'L2-101',
    areaSqm: 156,
    status: 'renovating',
    bbox: { x: 160, y: 120, width: 120, height: 70 },
    ...overrides
  };
}

function createScoreDto(overrides: Partial<StoreScoreDto> = {}): StoreScoreDto {
  return {
    storeId: 'store_demo_101',
    date: '2026-05-19',
    score: 52.8,
    grade: 'D',
    breakdown: {
      flow: 58,
      conversion: 45,
      dwell: 49,
      trend: 51,
      profileFit: 56,
      penalty: 8
    },
    explanations: [
      'Synthetic score: renovation status applies an operational penalty',
      'Conversion and dwell indicators are below the fixture baseline'
    ],
    ...overrides
  };
}

function createFlowDto(overrides: Partial<StoreFlowDto> = {}): StoreFlowDto {
  return {
    storeId: 'store_demo_101',
    granularity: 'hour',
    points: [
      { timestamp: '2026-05-19T10:00:00Z', exposureTraffic: 134, enterCount: 18, conversionRate: 0.134 },
      { timestamp: '2026-05-19T11:00:00Z', exposureTraffic: 142, enterCount: 20, conversionRate: 0.141 },
      { timestamp: '2026-05-19T12:00:00Z', exposureTraffic: 156, enterCount: 22, conversionRate: 0.141 }
    ],
    ...overrides
  };
}

test('loads mock store analysis data by default without touching the API client', async () => {
  let clientCalled = false;
  const result = await loadStoreAnalysisData({
    client: {
      getStoreRanking: async () => {
        clientCalled = true;
        throw new Error('client should not be called in mock mode');
      },
      getStore: async () => {
        clientCalled = true;
        throw new Error('client should not be called in mock mode');
      },
      getStoreScore: async () => {
        clientCalled = true;
        throw new Error('client should not be called in mock mode');
      },
      getStoreFlow: async () => {
        clientCalled = true;
        throw new Error('client should not be called in mock mode');
      }
    }
  });

  assert.equal(result.mode, 'mock');
  assert.equal(result.source, 'mock');
  assert.equal(result.stores, mockStoresWithAlerts);
  assert.equal(clientCalled, false);
});

test('loads API store ranking details through injected client', async () => {
  const calls: string[] = [];
  const ranking: ApiListEnvelope<StoreRankingItemDto> = {
    data: [
      {
        rank: 1,
        storeId: 'store_demo_101',
        mallId: 'mall_demo_001',
        floorId: 'floor_demo_l2',
        categoryId: 'cat_lifestyle',
        name: 'Fictional Store 101',
        score: 52.8,
        grade: 'D'
      }
    ],
    page: { page: 1, pageSize: 1, total: 1, hasNext: false },
    traceId: 'req_ranking',
    timestamp: '2026-05-19T01:55:00Z'
  };
  const result = await loadStoreAnalysisData({
    mode: 'api',
    mallId: 'mall_demo_001',
    maxStores: 1,
    client: {
      getStoreRanking: async (mallId) => {
        calls.push(`ranking:${mallId}`);
        return ranking;
      },
      getStore: async (storeId) => {
        calls.push(`store:${storeId}`);
        return { data: createStoreDto({ storeId }), traceId: 'req_store', timestamp: '2026-05-19T01:56:00Z' };
      },
      getStoreScore: async (storeId) => {
        calls.push(`score:${storeId}`);
        return { data: createScoreDto({ storeId }), traceId: 'req_score', timestamp: '2026-05-19T01:57:00Z' };
      },
      getStoreFlow: async (storeId) => {
        calls.push(`flow:${storeId}`);
        return { data: createFlowDto({ storeId }), traceId: 'req_flow', timestamp: '2026-05-19T01:58:00Z' };
      }
    }
  });

  assert.equal(calls.includes('ranking:mall_demo_001'), true);
  assert.equal(calls.includes('store:store_demo_101'), true);
  assert.equal(calls.includes('score:store_demo_101'), true);
  assert.equal(calls.includes('flow:store_demo_101'), true);
  assert.equal(result.mode, 'api');
  assert.equal(result.source, 'api');
  assert.equal(result.stores.length, 1);
  assert.equal(result.stores[0]?.id, 'store_demo_101');
  assert.equal(result.stores[0]?.score.level, 'D');
  assert.equal(result.stores[0]?.conversionRate, 13.9);
  assert.deepEqual(result.traceIds, ['req_ranking', 'req_store', 'req_score', 'req_flow']);
});

test('keeps explicitly selected store in API load even outside ranking limit', async () => {
  const requestedStores: string[] = [];
  const ranking: ApiListEnvelope<StoreRankingItemDto> = {
    data: [
      {
        rank: 1,
        storeId: 'store_demo_001',
        mallId: 'mall_demo_001',
        floorId: 'floor_demo_l1',
        categoryId: 'cat_fashion',
        name: 'Fictional Store 001',
        score: 86.4,
        grade: 'A'
      }
    ],
    page: { page: 1, pageSize: 1, total: 1, hasNext: false },
    traceId: 'req_ranking',
    timestamp: '2026-05-19T01:55:00Z'
  };

  const result = await loadStoreAnalysisData({
    mode: 'api',
    selectedStoreId: 'store_demo_101',
    maxStores: 1,
    client: {
      getStoreRanking: async () => ranking,
      getStore: async (storeId) => {
        requestedStores.push(storeId);
        return { data: createStoreDto({ storeId }), traceId: `req_store_${storeId}`, timestamp: 'now' };
      },
      getStoreScore: async (storeId) => ({ data: createScoreDto({ storeId }), traceId: `req_score_${storeId}`, timestamp: 'now' }),
      getStoreFlow: async (storeId) => ({ data: createFlowDto({ storeId }), traceId: `req_flow_${storeId}`, timestamp: 'now' })
    }
  });

  assert.deepEqual(requestedStores, ['store_demo_101', 'store_demo_001']);
  assert.equal(result.selectedStoreId, 'store_demo_101');
  assert.deepEqual(result.stores.map((store) => store.id), ['store_demo_101', 'store_demo_001']);
});

test('builds store-analysis API requests with normalized base URL and encoded ids', async () => {
  const calls: FetchCall[] = [];
  const fetchImpl: typeof fetch = async (url, init) => {
    calls.push({ url: String(url), init });
    const path = String(url).replace('http://backend.test', '');

    if (path === '/api/v1/stores/ranking?mallId=mall%20demo%2F001') {
      return jsonResponse({
        data: [
          {
            rank: 1,
            storeId: 'store demo/101',
            mallId: 'mall demo/001',
            floorId: 'floor_demo_l2',
            categoryId: 'cat_lifestyle',
            name: 'Fictional Store 101',
            score: 52.8,
            grade: 'D'
          }
        ],
        page: { page: 1, pageSize: 1, total: 1, hasNext: false },
        traceId: 'req_ranking_fetch',
        timestamp: '2026-05-19T01:55:00Z'
      });
    }

    if (path === '/api/v1/stores/store%20demo%2F101') {
      return jsonResponse({ data: createStoreDto({ storeId: 'store demo/101' }), traceId: 'req_store_fetch', timestamp: 'now' });
    }

    if (path === '/api/v1/stores/store%20demo%2F101/score') {
      return jsonResponse({ data: createScoreDto({ storeId: 'store demo/101' }), traceId: 'req_score_fetch', timestamp: 'now' });
    }

    if (path === '/api/v1/stores/store%20demo%2F101/flow') {
      return jsonResponse({ data: createFlowDto({ storeId: 'store demo/101' }), traceId: 'req_flow_fetch', timestamp: 'now' });
    }

    throw new Error(`Unexpected URL: ${String(url)}`);
  };

  const result = await loadStoreAnalysisData({
    mode: 'api',
    apiBaseUrl: ' http://backend.test/// ',
    mallId: 'mall demo/001',
    maxStores: 1,
    fetchImpl,
    requestIdFactory: () => 'req_store_analysis_loader'
  });

  assert.deepEqual(
    calls.map((call) => call.url),
    [
      'http://backend.test/api/v1/stores/ranking?mallId=mall%20demo%2F001',
      'http://backend.test/api/v1/stores/store%20demo%2F101',
      'http://backend.test/api/v1/stores/store%20demo%2F101/score',
      'http://backend.test/api/v1/stores/store%20demo%2F101/flow'
    ]
  );
  calls.forEach((call) => {
    assert.deepEqual(call.init?.headers, {
      Accept: 'application/json',
      'X-Request-Id': 'req_store_analysis_loader'
    });
  });
  assert.equal(result.stores[0]?.id, 'store demo/101');
  assert.equal(result.stores[0]?.score.level, 'D');
});

test('maps API store, score, and flow DTOs into frontend store domain', () => {
  const store = mapApiStoreToDomain(createStoreDto(), createScoreDto({ grade: 'unexpected' }), createFlowDto());

  assert.equal(store.id, 'store_demo_101');
  assert.equal(store.exposureTraffic, 432);
  assert.equal(store.enterCount, 60);
  assert.equal(store.conversionRate, 13.9);
  assert.equal(store.score.level, 'C');
  assert.deepEqual(store.score.breakdown, {
    traffic: 58,
    conversion: 45,
    dwell: 49,
    trend: 51
  });
  assert.deepEqual(store.geometry, { x: 160, y: 120, width: 120, height: 70 });
});

test('propagates typed API errors in store-analysis api mode', async () => {
  const fetchImpl: typeof fetch = async () =>
    jsonResponse(
      {
        error: {
          code: 'MALL_NOT_FOUND',
          message: 'Mall not found',
          details: { mallId: 'missing' }
        },
        traceId: 'req_store_analysis_missing',
        timestamp: '2026-05-19T01:55:00Z'
      },
      404
    );

  await assert.rejects(
    () => loadStoreAnalysisData({ mode: 'api', mallId: 'missing', fetchImpl }),
    (error: unknown) => {
      assert.ok(error instanceof ApiClientError);
      assert.equal(error.status, 404);
      assert.equal(error.code, 'MALL_NOT_FOUND');
      assert.deepEqual(error.details, { mallId: 'missing' });
      assert.equal(error.traceId, 'req_store_analysis_missing');
      return true;
    }
  );
});
