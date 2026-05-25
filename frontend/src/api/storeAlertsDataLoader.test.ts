import assert from 'node:assert/strict';
import test from 'node:test';
import { mockAlerts, mockFloors, mockStoresWithAlerts } from '../mock/index.ts';
import { ApiClientError, type ApiListEnvelope, type StoreAlertDto, type StoreDto } from './referenceClient.ts';
import { loadStoreAlertsData, mapApiStoreAlertToDomain } from './storeAlertsDataLoader.ts';

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

function createAlertDto(overrides: Partial<StoreAlertDto> = {}): StoreAlertDto {
  return {
    alertId: 'alert_demo_001',
    mallId: 'mall_demo_001',
    floorId: 'floor_demo_l2',
    storeId: 'store_demo_101',
    type: 'low_conversion',
    severity: 'critical',
    status: 'open',
    detectedAt: '2026-05-19T01:00:00Z',
    summary: 'Synthetic low conversion alert',
    evidence: {
      flowIndex: 82,
      conversionRate: 0.12,
      categoryMedianConversionRate: 0.22
    },
    ...overrides
  };
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
    status: 'open',
    bbox: { x: 160, y: 120, width: 120, height: 70 },
    ...overrides
  };
}

test('loads mock store alerts data by default without touching the API client', async () => {
  let clientCalled = false;
  const result = await loadStoreAlertsData({
    client: {
      listStoreAlerts: async () => {
        clientCalled = true;
        throw new Error('client should not be called in mock mode');
      },
      getStore: async () => {
        clientCalled = true;
        throw new Error('client should not be called in mock mode');
      }
    }
  });

  assert.equal(result.mode, 'mock');
  assert.equal(result.source, 'mock');
  assert.equal(result.alerts, mockAlerts);
  assert.equal(result.floors, mockFloors);
  assert.equal(result.stores, mockStoresWithAlerts);
  assert.equal(clientCalled, false);
});

test('loads API store alerts and fetches unique related stores through injected client', async () => {
  const calls: string[] = [];
  const alerts: ApiListEnvelope<StoreAlertDto> = {
    data: [
      createAlertDto({ alertId: 'alert_demo_001', storeId: 'store_demo_101' }),
      createAlertDto({ alertId: 'alert_demo_002', storeId: 'store_demo_101', severity: 'medium' }),
      createAlertDto({ alertId: 'alert_demo_003', storeId: null, type: 'crowding' })
    ],
    page: { page: 1, pageSize: 3, total: 3, hasNext: false },
    traceId: 'req_alerts',
    timestamp: '2026-05-19T02:00:00Z'
  };

  const result = await loadStoreAlertsData({
    mode: 'api',
    mallId: 'mall_demo_001',
    now: () => new Date('2026-05-19T02:30:00Z'),
    client: {
      listStoreAlerts: async (mallId) => {
        calls.push(`alerts:${mallId}`);
        return alerts;
      },
      getStore: async (storeId) => {
        calls.push(`store:${storeId}`);
        return { data: createStoreDto({ storeId }), traceId: 'req_store', timestamp: '2026-05-19T02:01:00Z' };
      }
    }
  });

  assert.deepEqual(calls, ['alerts:mall_demo_001', 'store:store_demo_101']);
  assert.equal(result.mode, 'api');
  assert.equal(result.source, 'api');
  assert.equal(result.alerts.length, 3);
  assert.equal(result.alerts[0]?.id, 'alert_demo_001');
  assert.equal(result.alerts[0]?.level, 'high');
  assert.equal(result.alerts[0]?.durationMinutes, 90);
  assert.equal(result.alerts[2]?.storeId, undefined);
  assert.equal(result.stores.length, 1);
  assert.equal(result.stores[0]?.id, 'store_demo_101');
  assert.deepEqual(result.traceIds, ['req_alerts', 'req_store']);
});

test('builds store-alerts API requests with normalized base URL and encoded ids', async () => {
  const calls: FetchCall[] = [];
  const fetchImpl: typeof fetch = async (url, init) => {
    calls.push({ url: String(url), init });
    const path = String(url).replace('http://backend.test', '');

    if (path === '/api/v1/alerts/stores?mallId=mall%20demo%2F001') {
      return jsonResponse({
        data: [createAlertDto({ mallId: 'mall demo/001', storeId: 'store demo/101' })],
        page: { page: 1, pageSize: 1, total: 1, hasNext: false },
        traceId: 'req_alerts_fetch',
        timestamp: '2026-05-19T02:00:00Z'
      });
    }

    if (path === '/api/v1/stores/store%20demo%2F101') {
      return jsonResponse({
        data: createStoreDto({ mallId: 'mall demo/001', storeId: 'store demo/101' }),
        traceId: 'req_store_fetch',
        timestamp: '2026-05-19T02:01:00Z'
      });
    }

    throw new Error(`Unexpected URL: ${String(url)}`);
  };

  const result = await loadStoreAlertsData({
    mode: 'api',
    apiBaseUrl: ' http://backend.test/// ',
    mallId: 'mall demo/001',
    fetchImpl,
    requestIdFactory: () => 'req_store_alerts_loader',
    now: () => new Date('2026-05-19T02:00:00Z')
  });

  assert.deepEqual(
    calls.map((call) => call.url),
    [
      'http://backend.test/api/v1/alerts/stores?mallId=mall%20demo%2F001',
      'http://backend.test/api/v1/stores/store%20demo%2F101'
    ]
  );
  calls.forEach((call) => {
    assert.deepEqual(call.init?.headers, {
      Accept: 'application/json',
      'X-Request-Id': 'req_store_alerts_loader'
    });
  });
  assert.equal(result.alerts[0]?.mallId, 'mall demo/001');
  assert.equal(result.stores[0]?.id, 'store demo/101');
});

test('maps API store alert DTOs into frontend alert domain with safe defaults', () => {
  const warningAlert = mapApiStoreAlertToDomain(createAlertDto({ severity: 'warning' }));
  const infoAlert = mapApiStoreAlertToDomain(createAlertDto({ severity: 'info' }));
  const unknownSeverityAlert = mapApiStoreAlertToDomain(createAlertDto({ severity: 'unexpected' }));
  const alert = mapApiStoreAlertToDomain(
    createAlertDto({
      type: 'unexpected',
      severity: 'critical',
      status: 'new',
      storeId: null,
      detectedAt: '2026-05-19T01:15:00Z'
    }),
    new Date('2026-05-19T01:45:00Z')
  );

  assert.equal(warningAlert.level, 'medium');
  assert.equal(infoAlert.level, 'low');
  assert.equal(unknownSeverityAlert.level, 'medium');
  assert.equal(alert.id, 'alert_demo_001');
  assert.equal(alert.type, 'data_quality');
  assert.equal(alert.level, 'high');
  assert.equal(alert.status, 'open');
  assert.equal(alert.storeId, undefined);
  assert.equal(alert.durationMinutes, 30);
  assert.ok(alert.description.includes('12.0%'));
});

test('propagates typed API errors in store-alerts api mode', async () => {
  const fetchImpl: typeof fetch = async () =>
    jsonResponse(
      {
        error: {
          code: 'MALL_NOT_FOUND',
          message: 'Mall not found',
          details: { mallId: 'missing' }
        },
        traceId: 'req_store_alerts_missing',
        timestamp: '2026-05-19T02:00:00Z'
      },
      404
    );

  await assert.rejects(
    () => loadStoreAlertsData({ mode: 'api', mallId: 'missing', fetchImpl }),
    (error: unknown) => {
      assert.ok(error instanceof ApiClientError);
      assert.equal(error.status, 404);
      assert.equal(error.code, 'MALL_NOT_FOUND');
      assert.deepEqual(error.details, { mallId: 'missing' });
      assert.equal(error.traceId, 'req_store_alerts_missing');
      return true;
    }
  );
});
