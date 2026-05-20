import assert from 'node:assert/strict';
import test from 'node:test';
import { mockOverview } from '../mock/mockOverview.ts';
import { ApiClientError, type ApiEnvelope, type OverviewDto } from './referenceClient.ts';
import { loadOverviewData, mapOverviewDtoToSnapshot } from './overviewDataLoader.ts';

type FetchCall = {
  url: string;
  init: RequestInit | undefined;
};

function createOverviewDto(overrides: Partial<OverviewDto> = {}): OverviewDto {
  return {
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
    alertIds: ['alert_demo_001'],
    ...overrides
  };
}

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' }
  });
}

test('loads mock overview by default without touching the API client', async () => {
  let clientCalled = false;
  const result = await loadOverviewData({
    client: {
      getOverview: async () => {
        clientCalled = true;
        throw new Error('client should not be called in mock mode');
      }
    }
  });

  assert.equal(result.mode, 'mock');
  assert.equal(result.source, 'mock');
  assert.equal(result.overview, mockOverview);
  assert.equal(clientCalled, false);
});

test('keeps non-api modes on mock overview', async () => {
  const result = await loadOverviewData({ mode: 'replay' });

  assert.equal(result.mode, 'mock');
  assert.equal(result.source, 'mock');
  assert.equal(result.overview, mockOverview);
});

test('loads API overview through injected client and returns envelope metadata', async () => {
  const dto = createOverviewDto({ source: 'api' });
  const response: ApiEnvelope<OverviewDto> = {
    data: dto,
    traceId: 'req_overview_loader',
    timestamp: '2026-05-19T01:36:00Z'
  };
  const requestedMallIds: string[] = [];

  const result = await loadOverviewData({
    mode: 'api',
    mallId: 'mall_demo_001',
    client: {
      getOverview: async (mallId) => {
        requestedMallIds.push(mallId);
        return response;
      }
    }
  });

  assert.deepEqual(requestedMallIds, ['mall_demo_001']);
  assert.equal(result.mode, 'api');
  assert.equal(result.source, 'api');
  assert.equal(result.traceId, 'req_overview_loader');
  assert.equal(result.timestamp, '2026-05-19T01:36:00Z');
  assert.deepEqual(result.overview, mapOverviewDtoToSnapshot(dto));
});

test('builds overview API request with normalized base URL and encoded mallId', async () => {
  const calls: FetchCall[] = [];
  const envelope: ApiEnvelope<OverviewDto> = {
    data: createOverviewDto({ mallId: 'mall demo/001' }),
    traceId: 'req_fetch_loader',
    timestamp: '2026-05-19T01:37:00Z'
  };
  const fetchImpl: typeof fetch = async (url, init) => {
    calls.push({ url: String(url), init });
    return jsonResponse(envelope);
  };

  const result = await loadOverviewData({
    mode: 'api',
    apiBaseUrl: ' http://backend.test/// ',
    mallId: 'mall demo/001',
    fetchImpl,
    requestIdFactory: () => 'req_fetch_loader'
  });

  assert.equal(calls[0]?.url, 'http://backend.test/api/v1/overview?mallId=mall%20demo%2F001');
  assert.deepEqual(calls[0]?.init?.headers, {
    Accept: 'application/json',
    'X-Request-Id': 'req_fetch_loader'
  });
  assert.equal(result.overview.mallId, 'mall demo/001');
  assert.equal(result.overview.source, 'api');
});

test('maps unknown API source and metric status to safe frontend domain values', () => {
  const snapshot = mapOverviewDtoToSnapshot(
    createOverviewDto({
      source: 'synthetic_fixture',
      metrics: [
        {
          id: 'unknown-status',
          label: 'Unknown Status',
          value: 1,
          unit: 'item',
          status: 'critical',
          trendDelta: 0,
          timeWindow: '15m',
          description: 'Unknown status should not leak into frontend domain'
        }
      ]
    })
  );

  assert.equal(snapshot.source, 'api');
  assert.equal(snapshot.metrics[0]?.status, 'info');
});

test('propagates typed API errors in api mode', async () => {
  const fetchImpl: typeof fetch = async () =>
    jsonResponse(
      {
        error: {
          code: 'MALL_NOT_FOUND',
          message: 'Mall not found',
          details: { mallId: 'missing' }
        },
        traceId: 'req_missing_overview_loader',
        timestamp: '2026-05-19T01:38:00Z'
      },
      404
    );

  await assert.rejects(
    () => loadOverviewData({ mode: 'api', mallId: 'missing', fetchImpl }),
    (error: unknown) => {
      assert.ok(error instanceof ApiClientError);
      assert.equal(error.status, 404);
      assert.equal(error.code, 'MALL_NOT_FOUND');
      assert.deepEqual(error.details, { mallId: 'missing' });
      assert.equal(error.traceId, 'req_missing_overview_loader');
      return true;
    }
  );
});
