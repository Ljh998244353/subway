import assert from 'node:assert/strict';
import test from 'node:test';
import { resolveApiBaseUrl, resolveFrontendDataMode } from './apiMode.ts';
import {
  ApiClientError,
  createReferenceApiClient,
  type ApiEnvelope,
  type ApiListEnvelope,
  type CustomerProfileDto,
  type HeatmapDto,
  type MallDto,
  type OverviewDto,
  type StoreAlertDto,
  type StoreFlowDto,
  type StoreDto,
  type StoreRankingItemDto,
  type StoreScoreDto,
  type TrajectoriesDto
} from './referenceClient.ts';

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

test('keeps frontend in mock mode unless API mode is explicitly selected', () => {
  assert.equal(resolveFrontendDataMode(undefined), 'mock');
  assert.equal(resolveFrontendDataMode('mock'), 'mock');
  assert.equal(resolveFrontendDataMode('replay'), 'mock');
  assert.equal(resolveFrontendDataMode('api'), 'api');
});

test('normalizes API base URL without forcing a backend connection', () => {
  assert.equal(resolveApiBaseUrl(undefined), 'http://127.0.0.1:8000');
  assert.equal(resolveApiBaseUrl(' http://localhost:9000/// '), 'http://localhost:9000');
});

test('builds /api/v1/malls request and parses list envelope', async () => {
  const calls: FetchCall[] = [];
  const envelope: ApiListEnvelope<MallDto> = {
    data: [
      {
        mallId: 'mall_demo_001',
        name: 'Demo Mall',
        timezone: 'Asia/Shanghai',
        businessHours: { open: '10:00', close: '22:00' }
      }
    ],
    page: { page: 1, pageSize: 1, total: 1, hasNext: false },
    traceId: 'req_frontend_test',
    timestamp: '2026-05-19T01:30:00Z'
  };
  const fetchImpl: typeof fetch = async (url, init) => {
    calls.push({ url: String(url), init });
    return jsonResponse(envelope);
  };

  const client = createReferenceApiClient({
    baseUrl: 'http://backend.test/',
    fetchImpl,
    requestIdFactory: () => 'req_frontend_test'
  });
  const response = await client.listMalls();

  assert.equal(calls[0]?.url, 'http://backend.test/api/v1/malls');
  assert.deepEqual(calls[0]?.init?.headers, {
    Accept: 'application/json',
    'X-Request-Id': 'req_frontend_test'
  });
  assert.equal(response.data[0]?.mallId, 'mall_demo_001');
  assert.equal(response.page.total, 1);
});

test('encodes path params for floors and stores', async () => {
  const urls: string[] = [];
  const fetchImpl: typeof fetch = async (url) => {
    urls.push(String(url));
    return jsonResponse({ data: [], page: { page: 1, pageSize: 0, total: 0, hasNext: false }, traceId: 'req', timestamp: 'now' });
  };

  const client = createReferenceApiClient({ baseUrl: 'http://backend.test', fetchImpl });
  await client.listFloors('mall demo/001');
  await client.listStores('floor demo/001');

  assert.deepEqual(urls, [
    'http://backend.test/api/v1/malls/mall%20demo%2F001/floors',
    'http://backend.test/api/v1/floors/floor%20demo%2F001/stores'
  ]);
});

test('builds /api/v1/stores/{storeId} request and parses object envelope', async () => {
  const calls: FetchCall[] = [];
  const envelope: ApiEnvelope<StoreDto> = {
    data: {
      storeId: 'store_demo_101',
      mallId: 'mall_demo_001',
      floorId: 'floor_demo_l2',
      categoryId: 'cat_lifestyle',
      name: 'Fictional Store 101',
      unitCode: 'L2-101',
      areaSqm: 156,
      status: 'renovating',
      bbox: { x: 160, y: 120, width: 120, height: 70 }
    },
    traceId: 'req_frontend_store',
    timestamp: '2026-05-19T01:40:00Z'
  };
  const fetchImpl: typeof fetch = async (url, init) => {
    calls.push({ url: String(url), init });
    return jsonResponse(envelope);
  };

  const client = createReferenceApiClient({
    baseUrl: 'http://backend.test/',
    fetchImpl,
    requestIdFactory: () => 'req_frontend_store'
  });
  const response = await client.getStore('store_demo_101');

  assert.equal(calls[0]?.url, 'http://backend.test/api/v1/stores/store_demo_101');
  assert.deepEqual(calls[0]?.init?.headers, {
    Accept: 'application/json',
    'X-Request-Id': 'req_frontend_store'
  });
  assert.equal(response.data.storeId, 'store_demo_101');
  assert.equal(response.data.status, 'renovating');
  assert.deepEqual(response.data.bbox, { x: 160, y: 120, width: 120, height: 70 });
});

test('encodes store detail path param', async () => {
  const urls: string[] = [];
  const envelope: ApiEnvelope<StoreDto> = {
    data: {
      storeId: 'store demo/101',
      mallId: 'mall_demo_001',
      floorId: 'floor_demo_l2',
      categoryId: 'cat_lifestyle',
      name: 'Fictional Store 101',
      unitCode: 'L2-101',
      areaSqm: 156,
      status: 'open',
      bbox: { x: 160, y: 120, width: 120, height: 70 }
    },
    traceId: 'req',
    timestamp: 'now'
  };
  const fetchImpl: typeof fetch = async (url) => {
    urls.push(String(url));
    return jsonResponse(envelope);
  };

  const client = createReferenceApiClient({ baseUrl: 'http://backend.test', fetchImpl });
  await client.getStore('store demo/101');

  assert.deepEqual(urls, ['http://backend.test/api/v1/stores/store%20demo%2F101']);
});

test('builds /api/v1/stores/{storeId}/score request and parses object envelope', async () => {
  const calls: FetchCall[] = [];
  const envelope: ApiEnvelope<StoreScoreDto> = {
    data: {
      storeId: 'store_demo_101',
      date: '2026-05-19',
      source: 'synthetic_event_aggregate',
      formulaVersion: 'synthetic-score-v1',
      score: 52.8,
      grade: 'D',
      weights: {
        flow: 0.25,
        conversion: 0.25,
        dwell: 0.15,
        trend: 0.2,
        profileFit: 0.15
      },
      inputs: {
        exposureTraffic: 432,
        enterCount: 60,
        conversionRate: 0.139,
        avgDwellMinutes: 8.7,
        trendIndex: 51,
        profileFitIndex: 56,
        operationalPenalty: 8
      },
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
      ]
    },
    traceId: 'req_frontend_store_score',
    timestamp: '2026-05-19T01:45:00Z'
  };
  const fetchImpl: typeof fetch = async (url, init) => {
    calls.push({ url: String(url), init });
    return jsonResponse(envelope);
  };

  const client = createReferenceApiClient({
    baseUrl: 'http://backend.test/',
    fetchImpl,
    requestIdFactory: () => 'req_frontend_store_score'
  });
  const response = await client.getStoreScore('store_demo_101');

  assert.equal(calls[0]?.url, 'http://backend.test/api/v1/stores/store_demo_101/score');
  assert.deepEqual(calls[0]?.init?.headers, {
    Accept: 'application/json',
    'X-Request-Id': 'req_frontend_store_score'
  });
  assert.equal(response.data.storeId, 'store_demo_101');
  assert.equal(response.data.grade, 'D');
  assert.equal(response.data.formulaVersion, 'synthetic-score-v1');
  assert.equal(response.data.inputs.conversionRate, 0.139);
  assert.equal(response.data.breakdown.profileFit, 56);
  assert.equal(response.data.explanations.length, 2);
});

test('encodes store score path param', async () => {
  const urls: string[] = [];
  const envelope: ApiEnvelope<StoreScoreDto> = {
    data: {
      storeId: 'store demo/101',
      date: '2026-05-19',
      source: 'synthetic_event_aggregate',
      formulaVersion: 'synthetic-score-v1',
      score: 52.8,
      grade: 'D',
      weights: {
        flow: 0.25,
        conversion: 0.25,
        dwell: 0.15,
        trend: 0.2,
        profileFit: 0.15
      },
      inputs: {
        exposureTraffic: 432,
        enterCount: 60,
        conversionRate: 0.139,
        avgDwellMinutes: 8.7,
        trendIndex: 51,
        profileFitIndex: 56,
        operationalPenalty: 8
      },
      breakdown: {
        flow: 58,
        conversion: 45,
        dwell: 49,
        trend: 51,
        profileFit: 56,
        penalty: 8
      },
      explanations: []
    },
    traceId: 'req',
    timestamp: 'now'
  };
  const fetchImpl: typeof fetch = async (url) => {
    urls.push(String(url));
    return jsonResponse(envelope);
  };

  const client = createReferenceApiClient({ baseUrl: 'http://backend.test', fetchImpl });
  await client.getStoreScore('store demo/101');

  assert.deepEqual(urls, ['http://backend.test/api/v1/stores/store%20demo%2F101/score']);
});

test('builds /api/v1/stores/{storeId}/flow request and parses object envelope', async () => {
  const calls: FetchCall[] = [];
  const envelope: ApiEnvelope<StoreFlowDto> = {
    data: {
      storeId: 'store_demo_101',
      granularity: 'hour',
      points: [
        {
          timestamp: '2026-05-19T10:00:00Z',
          exposureTraffic: 134,
          enterCount: 18,
          conversionRate: 0.134
        },
        {
          timestamp: '2026-05-19T11:00:00Z',
          exposureTraffic: 142,
          enterCount: 20,
          conversionRate: 0.141
        }
      ]
    },
    traceId: 'req_frontend_store_flow',
    timestamp: '2026-05-19T01:50:00Z'
  };
  const fetchImpl: typeof fetch = async (url, init) => {
    calls.push({ url: String(url), init });
    return jsonResponse(envelope);
  };

  const client = createReferenceApiClient({
    baseUrl: 'http://backend.test/',
    fetchImpl,
    requestIdFactory: () => 'req_frontend_store_flow'
  });
  const response = await client.getStoreFlow('store_demo_101');

  assert.equal(calls[0]?.url, 'http://backend.test/api/v1/stores/store_demo_101/flow');
  assert.deepEqual(calls[0]?.init?.headers, {
    Accept: 'application/json',
    'X-Request-Id': 'req_frontend_store_flow'
  });
  assert.equal(response.data.storeId, 'store_demo_101');
  assert.equal(response.data.granularity, 'hour');
  assert.equal(response.data.points[0]?.enterCount, 18);
  assert.equal(response.data.points[1]?.conversionRate, 0.141);
});

test('encodes store flow path param', async () => {
  const urls: string[] = [];
  const envelope: ApiEnvelope<StoreFlowDto> = {
    data: {
      storeId: 'store demo/101',
      granularity: 'hour',
      points: []
    },
    traceId: 'req',
    timestamp: 'now'
  };
  const fetchImpl: typeof fetch = async (url) => {
    urls.push(String(url));
    return jsonResponse(envelope);
  };

  const client = createReferenceApiClient({ baseUrl: 'http://backend.test', fetchImpl });
  await client.getStoreFlow('store demo/101');

  assert.deepEqual(urls, ['http://backend.test/api/v1/stores/store%20demo%2F101/flow']);
});

test('builds /api/v1/stores/ranking request and parses list envelope', async () => {
  const calls: FetchCall[] = [];
  const envelope: ApiListEnvelope<StoreRankingItemDto> = {
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
      },
      {
        rank: 2,
        storeId: 'store_demo_002',
        mallId: 'mall_demo_001',
        floorId: 'floor_demo_l1',
        categoryId: 'cat_food',
        name: 'Fictional Store 002',
        score: 74.2,
        grade: 'B'
      }
    ],
    page: { page: 1, pageSize: 2, total: 2, hasNext: false },
    traceId: 'req_frontend_store_ranking',
    timestamp: '2026-05-19T01:55:00Z'
  };
  const fetchImpl: typeof fetch = async (url, init) => {
    calls.push({ url: String(url), init });
    return jsonResponse(envelope);
  };

  const client = createReferenceApiClient({
    baseUrl: 'http://backend.test/',
    fetchImpl,
    requestIdFactory: () => 'req_frontend_store_ranking'
  });
  const response = await client.getStoreRanking('mall_demo_001');

  assert.equal(calls[0]?.url, 'http://backend.test/api/v1/stores/ranking?mallId=mall_demo_001');
  assert.deepEqual(calls[0]?.init?.headers, {
    Accept: 'application/json',
    'X-Request-Id': 'req_frontend_store_ranking'
  });
  assert.equal(response.data[0]?.rank, 1);
  assert.equal(response.data[0]?.score, 86.4);
  assert.equal(response.page.total, 2);
});

test('encodes store ranking mallId query param', async () => {
  const urls: string[] = [];
  const fetchImpl: typeof fetch = async (url) => {
    urls.push(String(url));
    return jsonResponse({ data: [], page: { page: 1, pageSize: 0, total: 0, hasNext: false }, traceId: 'req', timestamp: 'now' });
  };

  const client = createReferenceApiClient({ baseUrl: 'http://backend.test', fetchImpl });
  await client.getStoreRanking('mall demo/001');

  assert.deepEqual(urls, ['http://backend.test/api/v1/stores/ranking?mallId=mall%20demo%2F001']);
});

test('builds filtered store ranking query params', async () => {
  const urls: string[] = [];
  const fetchImpl: typeof fetch = async (url) => {
    urls.push(String(url));
    return jsonResponse({ data: [], page: { page: 1, pageSize: 0, total: 0, hasNext: false }, traceId: 'req', timestamp: 'now' });
  };

  const client = createReferenceApiClient({ baseUrl: 'http://backend.test', fetchImpl });
  await client.getStoreRanking({
    mallId: 'mall demo/001',
    floorId: 'floor demo/l1',
    categoryId: 'cat food',
    grade: 'B',
    minScore: 70,
    maxScore: 80,
    limit: 5
  });

  assert.deepEqual(urls, [
    'http://backend.test/api/v1/stores/ranking?mallId=mall%20demo%2F001&floorId=floor%20demo%2Fl1&categoryId=cat%20food&grade=B&minScore=70&maxScore=80&limit=5'
  ]);
});

test('builds /api/v1/alerts/stores request and parses list envelope', async () => {
  const calls: FetchCall[] = [];
  const envelope: ApiListEnvelope<StoreAlertDto> = {
    data: [
      {
        alertId: 'alert_demo_001',
        mallId: 'mall_demo_001',
        floorId: 'floor_demo_l1',
        storeId: 'store_demo_002',
        type: 'LOW_CONVERSION_HIGH_FLOW',
        severity: 'warning',
        status: 'open',
        detectedAt: '2026-05-19T01:30:00Z',
        summary: 'Synthetic alert: high passing flow with below-median conversion',
        evidence: {
          flowIndex: 91,
          conversionRate: 0.12,
          categoryMedianConversionRate: 0.21
        }
      },
      {
        alertId: 'alert_demo_003',
        mallId: 'mall_demo_001',
        floorId: 'floor_demo_l1',
        storeId: null,
        type: 'CROWDING',
        severity: 'info',
        status: 'resolved',
        detectedAt: '2026-05-19T02:15:00Z',
        summary: 'Synthetic alert: floor-level crowding signal returned to normal range',
        evidence: {
          flowIndex: 76,
          conversionRate: 0,
          categoryMedianConversionRate: 0
        }
      }
    ],
    page: { page: 1, pageSize: 2, total: 2, hasNext: false },
    traceId: 'req_frontend_store_alerts',
    timestamp: '2026-05-19T02:05:00Z'
  };
  const fetchImpl: typeof fetch = async (url, init) => {
    calls.push({ url: String(url), init });
    return jsonResponse(envelope);
  };

  const client = createReferenceApiClient({
    baseUrl: 'http://backend.test/',
    fetchImpl,
    requestIdFactory: () => 'req_frontend_store_alerts'
  });
  const response = await client.listStoreAlerts('mall_demo_001');

  assert.equal(calls[0]?.url, 'http://backend.test/api/v1/alerts/stores?mallId=mall_demo_001');
  assert.deepEqual(calls[0]?.init?.headers, {
    Accept: 'application/json',
    'X-Request-Id': 'req_frontend_store_alerts'
  });
  assert.equal(response.data[0]?.alertId, 'alert_demo_001');
  assert.equal(response.data[0]?.evidence.conversionRate, 0.12);
  assert.equal(response.data[1]?.storeId, null);
  assert.equal(response.page.total, 2);
});

test('encodes store alerts mallId query param', async () => {
  const urls: string[] = [];
  const fetchImpl: typeof fetch = async (url) => {
    urls.push(String(url));
    return jsonResponse({ data: [], page: { page: 1, pageSize: 0, total: 0, hasNext: false }, traceId: 'req', timestamp: 'now' });
  };

  const client = createReferenceApiClient({ baseUrl: 'http://backend.test', fetchImpl });
  await client.listStoreAlerts('mall demo/001');

  assert.deepEqual(urls, ['http://backend.test/api/v1/alerts/stores?mallId=mall%20demo%2F001']);
});

test('builds /api/v1/customer-profile request and parses object envelope', async () => {
  const calls: FetchCall[] = [];
  const envelope: ApiEnvelope<CustomerProfileDto> = {
    data: {
      mallId: 'mall_demo_001',
      generatedAt: '2026-05-19T02:30:00Z',
      source: 'synthetic_fixture',
      activeTimeRange: '14:00-17:00',
      primaryFloorId: 'floor_demo_l2',
      topCategories: ['cat_food', 'cat_fashion', 'cat_lifestyle'],
      revisitTendency: 0.62,
      timeDistribution: [
        { hour: 10, traffic: 520, share: 0.18 },
        { hour: 11, traffic: 680, share: 0.24 }
      ],
      floorPreferences: [
        { floorId: 'floor_demo_l1', trafficShare: 0.56, dwellShare: 0.48 },
        { floorId: 'floor_demo_l2', trafficShare: 0.44, dwellShare: 0.52 }
      ],
      categoryPreferences: [
        { category: 'cat_food', trafficShare: 0.34, dwellShare: 0.31, conversionRate: 0.27 }
      ],
      privacyNote: 'Synthetic aggregate only. No face images, member IDs, phone numbers, or individual trajectories are included.'
    },
    traceId: 'req_frontend_customer_profile',
    timestamp: '2026-05-19T02:30:00Z'
  };
  const fetchImpl: typeof fetch = async (url, init) => {
    calls.push({ url: String(url), init });
    return jsonResponse(envelope);
  };

  const client = createReferenceApiClient({
    baseUrl: 'http://backend.test/',
    fetchImpl,
    requestIdFactory: () => 'req_frontend_customer_profile'
  });
  const response = await client.getCustomerProfile('mall_demo_001');

  assert.equal(calls[0]?.url, 'http://backend.test/api/v1/customer-profile?mallId=mall_demo_001');
  assert.deepEqual(calls[0]?.init?.headers, {
    Accept: 'application/json',
    'X-Request-Id': 'req_frontend_customer_profile'
  });
  assert.equal(response.data.source, 'synthetic_fixture');
  assert.equal(response.data.primaryFloorId, 'floor_demo_l2');
  assert.equal(response.data.timeDistribution[0]?.traffic, 520);
  assert.equal(response.data.categoryPreferences[0]?.conversionRate, 0.27);
  assert.match(response.data.privacyNote, /No face images/);
});

test('encodes customer profile mallId query param', async () => {
  const urls: string[] = [];
  const envelope: ApiEnvelope<CustomerProfileDto> = {
    data: {
      mallId: 'mall demo/001',
      generatedAt: '2026-05-19T02:30:00Z',
      source: 'synthetic_fixture',
      activeTimeRange: '14:00-17:00',
      primaryFloorId: 'floor_demo_l2',
      topCategories: [],
      revisitTendency: 0,
      timeDistribution: [],
      floorPreferences: [],
      categoryPreferences: [],
      privacyNote: 'Synthetic aggregate only.'
    },
    traceId: 'req',
    timestamp: 'now'
  };
  const fetchImpl: typeof fetch = async (url) => {
    urls.push(String(url));
    return jsonResponse(envelope);
  };

  const client = createReferenceApiClient({ baseUrl: 'http://backend.test', fetchImpl });
  await client.getCustomerProfile('mall demo/001');

  assert.deepEqual(urls, ['http://backend.test/api/v1/customer-profile?mallId=mall%20demo%2F001']);
});

test('builds /api/v1/heatmap request and parses object envelope', async () => {
  const calls: FetchCall[] = [];
  const envelope: ApiEnvelope<HeatmapDto> = {
    data: {
      mallId: 'mall_demo_001',
      generatedAt: '2026-05-19T02:45:00Z',
      source: 'synthetic_fixture',
      granularity: '15m',
      points: [
        { pointId: 'heat_demo_l1_001', floorId: 'floor_demo_l1', x: 120, y: 160, intensity: 0.42 },
        { pointId: 'heat_demo_l2_002', floorId: 'floor_demo_l2', x: 540, y: 360, intensity: 0.81 }
      ]
    },
    traceId: 'req_frontend_heatmap',
    timestamp: '2026-05-19T02:45:00Z'
  };
  const fetchImpl: typeof fetch = async (url, init) => {
    calls.push({ url: String(url), init });
    return jsonResponse(envelope);
  };

  const client = createReferenceApiClient({
    baseUrl: 'http://backend.test/',
    fetchImpl,
    requestIdFactory: () => 'req_frontend_heatmap'
  });
  const response = await client.getHeatmap('mall_demo_001');

  assert.equal(calls[0]?.url, 'http://backend.test/api/v1/heatmap?mallId=mall_demo_001');
  assert.deepEqual(calls[0]?.init?.headers, {
    Accept: 'application/json',
    'X-Request-Id': 'req_frontend_heatmap'
  });
  assert.equal(response.data.source, 'synthetic_fixture');
  assert.equal(response.data.granularity, '15m');
  assert.equal(response.data.points[0]?.floorId, 'floor_demo_l1');
  assert.equal(response.data.points[1]?.intensity, 0.81);
});

test('encodes heatmap mallId query param', async () => {
  const urls: string[] = [];
  const envelope: ApiEnvelope<HeatmapDto> = {
    data: {
      mallId: 'mall demo/001',
      generatedAt: '2026-05-19T02:45:00Z',
      source: 'synthetic_fixture',
      granularity: '15m',
      points: []
    },
    traceId: 'req',
    timestamp: 'now'
  };
  const fetchImpl: typeof fetch = async (url) => {
    urls.push(String(url));
    return jsonResponse(envelope);
  };

  const client = createReferenceApiClient({ baseUrl: 'http://backend.test', fetchImpl });
  await client.getHeatmap('mall demo/001');

  assert.deepEqual(urls, ['http://backend.test/api/v1/heatmap?mallId=mall%20demo%2F001']);
});

test('builds /api/v1/trajectories request and parses object envelope', async () => {
  const calls: FetchCall[] = [];
  const envelope: ApiEnvelope<TrajectoriesDto> = {
    data: {
      mallId: 'mall_demo_001',
      generatedAt: '2026-05-19T03:00:00Z',
      source: 'synthetic_fixture',
      aggregation: 'floor_flow_edges_15m',
      flows: [
        {
          flowId: 'traj_demo_l1_001',
          floorId: 'floor_demo_l1',
          fromPoint: { x: 80, y: 120 },
          toPoint: { x: 420, y: 260 },
          traffic: 360,
          direction: 'inbound'
        },
        {
          flowId: 'traj_demo_l2_002',
          floorId: 'floor_demo_l2',
          fromPoint: { x: 560, y: 360 },
          toPoint: { x: 980, y: 620 },
          traffic: 245,
          direction: 'outbound'
        }
      ]
    },
    traceId: 'req_frontend_trajectories',
    timestamp: '2026-05-19T03:00:00Z'
  };
  const fetchImpl: typeof fetch = async (url, init) => {
    calls.push({ url: String(url), init });
    return jsonResponse(envelope);
  };

  const client = createReferenceApiClient({
    baseUrl: 'http://backend.test/',
    fetchImpl,
    requestIdFactory: () => 'req_frontend_trajectories'
  });
  const response = await client.getTrajectories('mall_demo_001');

  assert.equal(calls[0]?.url, 'http://backend.test/api/v1/trajectories?mallId=mall_demo_001');
  assert.deepEqual(calls[0]?.init?.headers, {
    Accept: 'application/json',
    'X-Request-Id': 'req_frontend_trajectories'
  });
  assert.equal(response.data.source, 'synthetic_fixture');
  assert.equal(response.data.aggregation, 'floor_flow_edges_15m');
  assert.equal(response.data.flows[0]?.direction, 'inbound');
  assert.equal(response.data.flows[1]?.traffic, 245);
});

test('encodes trajectories mallId query param', async () => {
  const urls: string[] = [];
  const envelope: ApiEnvelope<TrajectoriesDto> = {
    data: {
      mallId: 'mall demo/001',
      generatedAt: '2026-05-19T03:00:00Z',
      source: 'synthetic_fixture',
      aggregation: 'floor_flow_edges_15m',
      flows: []
    },
    traceId: 'req',
    timestamp: 'now'
  };
  const fetchImpl: typeof fetch = async (url) => {
    urls.push(String(url));
    return jsonResponse(envelope);
  };

  const client = createReferenceApiClient({ baseUrl: 'http://backend.test', fetchImpl });
  await client.getTrajectories('mall demo/001');

  assert.deepEqual(urls, ['http://backend.test/api/v1/trajectories?mallId=mall%20demo%2F001']);
});

test('builds /api/v1/overview request and parses object envelope', async () => {
  const calls: FetchCall[] = [];
  const envelope: ApiEnvelope<OverviewDto> = {
    data: {
      mallId: 'mall_demo_001',
      generatedAt: '2026-05-19T01:35:00Z',
      source: 'synthetic_fixture',
      metrics: [
        {
          id: 'current-occupancy',
          label: 'Current Occupancy',
          value: 128,
          unit: 'people',
          status: 'normal',
          trendDelta: 0.08,
          timeWindow: '15m',
          description: 'Synthetic occupancy metric'
        }
      ],
      trafficTrend: [
        {
          timestamp: '2026-05-19T01:20:00Z',
          currentOccupancy: 118,
          todayTrafficDelta: 12,
          crowdingIndex: 0.58
        }
      ],
      floorSummaries: [
        {
          floorId: 'floor_demo_l1',
          floorName: 'L1',
          traffic: 720,
          crowdingIndex: 0.62,
          alertCount: 1
        }
      ],
      inefficientStoreIds: ['store_demo_101'],
      alertIds: ['alert_demo_001']
    },
    traceId: 'req_frontend_overview',
    timestamp: '2026-05-19T01:35:00Z'
  };
  const fetchImpl: typeof fetch = async (url, init) => {
    calls.push({ url: String(url), init });
    return jsonResponse(envelope);
  };

  const client = createReferenceApiClient({
    baseUrl: 'http://backend.test/',
    fetchImpl,
    requestIdFactory: () => 'req_frontend_overview'
  });
  const response = await client.getOverview('mall_demo_001');

  assert.equal(calls[0]?.url, 'http://backend.test/api/v1/overview?mallId=mall_demo_001');
  assert.deepEqual(calls[0]?.init?.headers, {
    Accept: 'application/json',
    'X-Request-Id': 'req_frontend_overview'
  });
  assert.equal(response.data.source, 'synthetic_fixture');
  assert.equal(response.data.metrics[0]?.id, 'current-occupancy');
  assert.equal(response.data.floorSummaries[0]?.floorId, 'floor_demo_l1');
  assert.deepEqual(response.data.inefficientStoreIds, ['store_demo_101']);
});

test('encodes overview mallId query param', async () => {
  const urls: string[] = [];
  const envelope: ApiEnvelope<OverviewDto> = {
    data: {
      mallId: 'mall demo/001',
      generatedAt: '2026-05-19T01:35:00Z',
      source: 'synthetic_fixture',
      metrics: [],
      trafficTrend: [],
      floorSummaries: [],
      inefficientStoreIds: [],
      alertIds: []
    },
    traceId: 'req',
    timestamp: 'now'
  };
  const fetchImpl: typeof fetch = async (url) => {
    urls.push(String(url));
    return jsonResponse(envelope);
  };

  const client = createReferenceApiClient({ baseUrl: 'http://backend.test', fetchImpl });
  await client.getOverview('mall demo/001');

  assert.deepEqual(urls, ['http://backend.test/api/v1/overview?mallId=mall%20demo%2F001']);
});

test('raises typed API error from backend error envelope', async () => {
  const fetchImpl: typeof fetch = async () =>
    jsonResponse(
      {
        error: {
          code: 'MALL_NOT_FOUND',
          message: 'Mall not found',
          details: { mallId: 'missing' }
        },
        traceId: 'req_missing',
        timestamp: '2026-05-19T01:30:00Z'
      },
      404
    );

  const client = createReferenceApiClient({ fetchImpl });
  await assert.rejects(
    () => client.listFloors('missing'),
    (error: unknown) => {
      assert.ok(error instanceof ApiClientError);
      assert.equal(error.status, 404);
      assert.equal(error.code, 'MALL_NOT_FOUND');
      assert.deepEqual(error.details, { mallId: 'missing' });
      assert.equal(error.traceId, 'req_missing');
      return true;
    }
  );
});

test('raises typed MALL_NOT_FOUND error for overview API', async () => {
  const fetchImpl: typeof fetch = async () =>
    jsonResponse(
      {
        error: {
          code: 'MALL_NOT_FOUND',
          message: 'Mall not found',
          details: { mallId: 'missing' }
        },
        traceId: 'req_overview_missing',
        timestamp: '2026-05-19T01:35:00Z'
      },
      404
    );

  const client = createReferenceApiClient({ fetchImpl });
  await assert.rejects(
    () => client.getOverview('missing'),
    (error: unknown) => {
      assert.ok(error instanceof ApiClientError);
      assert.equal(error.status, 404);
      assert.equal(error.code, 'MALL_NOT_FOUND');
      assert.deepEqual(error.details, { mallId: 'missing' });
      assert.equal(error.traceId, 'req_overview_missing');
      return true;
    }
  );
});

test('raises typed MALL_NOT_FOUND error for store ranking API', async () => {
  const fetchImpl: typeof fetch = async () =>
    jsonResponse(
      {
        error: {
          code: 'MALL_NOT_FOUND',
          message: 'Mall not found',
          details: { mallId: 'missing' }
        },
        traceId: 'req_ranking_missing',
        timestamp: '2026-05-19T01:55:00Z'
      },
      404
    );

  const client = createReferenceApiClient({ fetchImpl });
  await assert.rejects(
    () => client.getStoreRanking('missing'),
    (error: unknown) => {
      assert.ok(error instanceof ApiClientError);
      assert.equal(error.status, 404);
      assert.equal(error.code, 'MALL_NOT_FOUND');
      assert.deepEqual(error.details, { mallId: 'missing' });
      assert.equal(error.traceId, 'req_ranking_missing');
      return true;
    }
  );
});

test('raises typed MALL_NOT_FOUND error for store alerts API', async () => {
  const fetchImpl: typeof fetch = async () =>
    jsonResponse(
      {
        error: {
          code: 'MALL_NOT_FOUND',
          message: 'Mall not found',
          details: { mallId: 'missing' }
        },
        traceId: 'req_alerts_missing',
        timestamp: '2026-05-19T02:05:00Z'
      },
      404
    );

  const client = createReferenceApiClient({ fetchImpl });
  await assert.rejects(
    () => client.listStoreAlerts('missing'),
    (error: unknown) => {
      assert.ok(error instanceof ApiClientError);
      assert.equal(error.status, 404);
      assert.equal(error.code, 'MALL_NOT_FOUND');
      assert.deepEqual(error.details, { mallId: 'missing' });
      assert.equal(error.traceId, 'req_alerts_missing');
      return true;
    }
  );
});

test('raises typed MALL_NOT_FOUND error for customer profile API', async () => {
  const fetchImpl: typeof fetch = async () =>
    jsonResponse(
      {
        error: {
          code: 'MALL_NOT_FOUND',
          message: 'Mall not found',
          details: { mallId: 'missing' }
        },
        traceId: 'req_customer_profile_missing',
        timestamp: '2026-05-19T02:30:00Z'
      },
      404
    );

  const client = createReferenceApiClient({ fetchImpl });
  await assert.rejects(
    () => client.getCustomerProfile('missing'),
    (error: unknown) => {
      assert.ok(error instanceof ApiClientError);
      assert.equal(error.status, 404);
      assert.equal(error.code, 'MALL_NOT_FOUND');
      assert.deepEqual(error.details, { mallId: 'missing' });
      assert.equal(error.traceId, 'req_customer_profile_missing');
      return true;
    }
  );
});

test('raises typed MALL_NOT_FOUND error for heatmap API', async () => {
  const fetchImpl: typeof fetch = async () =>
    jsonResponse(
      {
        error: {
          code: 'MALL_NOT_FOUND',
          message: 'Mall not found',
          details: { mallId: 'missing' }
        },
        traceId: 'req_heatmap_missing',
        timestamp: '2026-05-19T02:45:00Z'
      },
      404
    );

  const client = createReferenceApiClient({ fetchImpl });
  await assert.rejects(
    () => client.getHeatmap('missing'),
    (error: unknown) => {
      assert.ok(error instanceof ApiClientError);
      assert.equal(error.status, 404);
      assert.equal(error.code, 'MALL_NOT_FOUND');
      assert.deepEqual(error.details, { mallId: 'missing' });
      assert.equal(error.traceId, 'req_heatmap_missing');
      return true;
    }
  );
});

test('raises typed MALL_NOT_FOUND error for trajectories API', async () => {
  const fetchImpl: typeof fetch = async () =>
    jsonResponse(
      {
        error: {
          code: 'MALL_NOT_FOUND',
          message: 'Mall not found',
          details: { mallId: 'missing' }
        },
        traceId: 'req_trajectories_missing',
        timestamp: '2026-05-19T03:00:00Z'
      },
      404
    );

  const client = createReferenceApiClient({ fetchImpl });
  await assert.rejects(
    () => client.getTrajectories('missing'),
    (error: unknown) => {
      assert.ok(error instanceof ApiClientError);
      assert.equal(error.status, 404);
      assert.equal(error.code, 'MALL_NOT_FOUND');
      assert.deepEqual(error.details, { mallId: 'missing' });
      assert.equal(error.traceId, 'req_trajectories_missing');
      return true;
    }
  );
});

test('raises typed STORE_NOT_FOUND error for store detail API', async () => {
  const fetchImpl: typeof fetch = async () =>
    jsonResponse(
      {
        error: {
          code: 'STORE_NOT_FOUND',
          message: 'Store not found',
          details: { storeId: 'missing' }
        },
        traceId: 'req_store_missing',
        timestamp: '2026-05-19T01:40:00Z'
      },
      404
    );

  const client = createReferenceApiClient({ fetchImpl });
  await assert.rejects(
    () => client.getStore('missing'),
    (error: unknown) => {
      assert.ok(error instanceof ApiClientError);
      assert.equal(error.status, 404);
      assert.equal(error.code, 'STORE_NOT_FOUND');
      assert.deepEqual(error.details, { storeId: 'missing' });
      assert.equal(error.traceId, 'req_store_missing');
      return true;
    }
  );
});

test('raises typed STORE_NOT_FOUND error for store score API', async () => {
  const fetchImpl: typeof fetch = async () =>
    jsonResponse(
      {
        error: {
          code: 'STORE_NOT_FOUND',
          message: 'Store not found',
          details: { storeId: 'missing' }
        },
        traceId: 'req_store_score_missing',
        timestamp: '2026-05-19T01:45:00Z'
      },
      404
    );

  const client = createReferenceApiClient({ fetchImpl });
  await assert.rejects(
    () => client.getStoreScore('missing'),
    (error: unknown) => {
      assert.ok(error instanceof ApiClientError);
      assert.equal(error.status, 404);
      assert.equal(error.code, 'STORE_NOT_FOUND');
      assert.deepEqual(error.details, { storeId: 'missing' });
      assert.equal(error.traceId, 'req_store_score_missing');
      return true;
    }
  );
});

test('raises typed STORE_NOT_FOUND error for store flow API', async () => {
  const fetchImpl: typeof fetch = async () =>
    jsonResponse(
      {
        error: {
          code: 'STORE_NOT_FOUND',
          message: 'Store not found',
          details: { storeId: 'missing' }
        },
        traceId: 'req_store_flow_missing',
        timestamp: '2026-05-19T01:50:00Z'
      },
      404
    );

  const client = createReferenceApiClient({ fetchImpl });
  await assert.rejects(
    () => client.getStoreFlow('missing'),
    (error: unknown) => {
      assert.ok(error instanceof ApiClientError);
      assert.equal(error.status, 404);
      assert.equal(error.code, 'STORE_NOT_FOUND');
      assert.deepEqual(error.details, { storeId: 'missing' });
      assert.equal(error.traceId, 'req_store_flow_missing');
      return true;
    }
  );
});
