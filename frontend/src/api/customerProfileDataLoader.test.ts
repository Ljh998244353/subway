import assert from 'node:assert/strict';
import test from 'node:test';
import { mockCustomerProfile } from '../mock/mockCustomerProfile.ts';
import { ApiClientError, type CustomerProfileDto } from './referenceClient.ts';
import { loadCustomerProfileData, mapCustomerProfileDtoToDomain } from './customerProfileDataLoader.ts';

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

function createCustomerProfileDto(overrides: Partial<CustomerProfileDto> = {}): CustomerProfileDto {
  return {
    mallId: 'mall_demo_001',
    generatedAt: '2026-05-19T02:30:00Z',
    source: 'synthetic_fixture',
    activeTimeRange: '14:00-17:00',
    primaryFloorId: 'floor_demo_l2',
    topCategories: ['cat_food', 'cat_fashion', 'cat_lifestyle'],
    revisitTendency: 0.62,
    timeDistribution: [
      { hour: 10, traffic: 520, share: 0.18 },
      { hour: 11, traffic: 680, share: 0.24 },
      { hour: 12, traffic: 740, share: 0.26 }
    ],
    floorPreferences: [
      { floorId: 'floor_demo_l1', trafficShare: 0.56, dwellShare: 0.48 },
      { floorId: 'floor_demo_l2', trafficShare: 0.44, dwellShare: 0.52 }
    ],
    categoryPreferences: [
      { category: 'cat_food', trafficShare: 0.34, dwellShare: 0.31, conversionRate: 0.27 },
      { category: 'cat_fashion', trafficShare: 0.28, dwellShare: 0.26, conversionRate: 0.22 },
      { category: 'cat_lifestyle', trafficShare: 0.19, dwellShare: 0.24, conversionRate: 0.18 }
    ],
    privacyNote: 'Synthetic aggregate only. No face images, member IDs, phone numbers, or individual trajectories are included.',
    ...overrides
  };
}

test('loads mock customer profile by default without touching the API client', async () => {
  let clientCalled = false;
  const result = await loadCustomerProfileData({
    client: {
      getCustomerProfile: async () => {
        clientCalled = true;
        throw new Error('client should not be called in mock mode');
      }
    }
  });

  assert.equal(result.mode, 'mock');
  assert.equal(result.source, 'mock');
  assert.equal(result.profile, mockCustomerProfile);
  assert.equal(clientCalled, false);
});

test('loads API customer profile through injected client', async () => {
  const calls: string[] = [];
  const result = await loadCustomerProfileData({
    mode: 'api',
    mallId: 'mall_demo_001',
    client: {
      getCustomerProfile: async (mallId) => {
        calls.push(mallId);
        return {
          data: createCustomerProfileDto(),
          traceId: 'req_customer_profile',
          timestamp: '2026-05-19T02:31:00Z'
        };
      }
    }
  });

  assert.deepEqual(calls, ['mall_demo_001']);
  assert.equal(result.mode, 'api');
  assert.equal(result.source, 'api');
  assert.equal(result.profile.source, 'api');
  assert.equal(result.profile.revisitTendency, 62);
  assert.deepEqual(result.profile.topCategories, ['餐饮', '零售', '生活服务']);
  assert.equal(result.profile.categoryPreferences[0]?.conversionRate, 27);
  assert.equal(result.traceId, 'req_customer_profile');
  assert.equal(result.timestamp, '2026-05-19T02:31:00Z');
});

test('builds customer-profile API request with normalized base URL and encoded mallId', async () => {
  const calls: FetchCall[] = [];
  const fetchImpl: typeof fetch = async (url, init) => {
    calls.push({ url: String(url), init });
    const path = String(url).replace('http://backend.test', '');

    if (path === '/api/v1/customer-profile?mallId=mall%20demo%2F001') {
      return jsonResponse({
        data: createCustomerProfileDto({ mallId: 'mall demo/001' }),
        traceId: 'req_customer_profile_fetch',
        timestamp: '2026-05-19T02:31:00Z'
      });
    }

    throw new Error(`Unexpected URL: ${String(url)}`);
  };

  const result = await loadCustomerProfileData({
    mode: 'api',
    apiBaseUrl: ' http://backend.test/// ',
    mallId: 'mall demo/001',
    fetchImpl,
    requestIdFactory: () => 'req_customer_profile_loader'
  });

  assert.deepEqual(calls.map((call) => call.url), ['http://backend.test/api/v1/customer-profile?mallId=mall%20demo%2F001']);
  assert.deepEqual(calls[0]?.init?.headers, {
    Accept: 'application/json',
    'X-Request-Id': 'req_customer_profile_loader'
  });
  assert.equal(result.profile.mallId, 'mall demo/001');
  assert.equal(result.traceId, 'req_customer_profile_fetch');
});

test('maps API customer profile DTOs into frontend domain with safe defaults', () => {
  const profile = mapCustomerProfileDtoToDomain(
    createCustomerProfileDto({
      source: 'unexpected_source',
      topCategories: ['cat_food', 'unknown_category'],
      revisitTendency: 72,
      categoryPreferences: [
        { category: 'unknown_category', trafficShare: 0.2, dwellShare: 0.1, conversionRate: 31.5 }
      ]
    })
  );

  assert.equal(profile.source, 'api');
  assert.equal(profile.revisitTendency, 72);
  assert.deepEqual(profile.topCategories, ['餐饮', '生活服务']);
  assert.equal(profile.categoryPreferences[0]?.category, '生活服务');
  assert.equal(profile.categoryPreferences[0]?.conversionRate, 31.5);
  assert.equal(profile.privacyNote.includes('individual trajectories'), true);
});

test('propagates typed API errors in customer-profile api mode', async () => {
  const fetchImpl: typeof fetch = async () =>
    jsonResponse(
      {
        error: {
          code: 'MALL_NOT_FOUND',
          message: 'Mall not found',
          details: { mallId: 'missing' }
        },
        traceId: 'req_customer_profile_missing',
        timestamp: '2026-05-19T02:31:00Z'
      },
      404
    );

  await assert.rejects(
    () => loadCustomerProfileData({ mode: 'api', mallId: 'missing', fetchImpl }),
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
