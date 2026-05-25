import assert from 'node:assert/strict';
import test from 'node:test';
import { mockFlowEdges, mockHeatmapPoints } from '../mock/index.ts';
import { ApiClientError, type ApiEnvelope, type HeatmapDto, type TrajectoriesDto } from './referenceClient.ts';
import {
  loadDigitalTwinData,
  mapHeatmapPointDtoToDomain,
  mapTrajectoryFlowDtoToDomain
} from './digitalTwinDataLoader.ts';

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

function createHeatmapEnvelope(overrides: Partial<HeatmapDto> = {}): ApiEnvelope<HeatmapDto> {
  return {
    data: {
      mallId: 'mall_demo_001',
      generatedAt: '2026-05-19T02:00:00Z',
      source: 'synthetic_fixture',
      granularity: '15m',
      points: [
        {
          pointId: 'heat_demo_001',
          floorId: 'F2',
          x: 120,
          y: 180,
          intensity: 0.72
        }
      ],
      ...overrides
    },
    traceId: 'req_heatmap',
    timestamp: '2026-05-19T02:00:00Z'
  };
}

function createTrajectoriesEnvelope(overrides: Partial<TrajectoriesDto> = {}): ApiEnvelope<TrajectoriesDto> {
  return {
    data: {
      mallId: 'mall_demo_001',
      generatedAt: '2026-05-19T02:00:00Z',
      source: 'synthetic_fixture',
      aggregation: 'anonymous_flow',
      flows: [
        {
          flowId: 'flow_demo_001',
          floorId: 'F2',
          fromPoint: { x: 80, y: 120 },
          toPoint: { x: 260, y: 320 },
          traffic: 412,
          direction: 'inbound'
        }
      ],
      ...overrides
    },
    traceId: 'req_trajectories',
    timestamp: '2026-05-19T02:01:00Z'
  };
}

test('loads mock digital twin data by default without touching the API client', async () => {
  let clientCalled = false;
  const result = await loadDigitalTwinData({
    client: {
      getHeatmap: async () => {
        clientCalled = true;
        throw new Error('client should not be called in mock mode');
      },
      getTrajectories: async () => {
        clientCalled = true;
        throw new Error('client should not be called in mock mode');
      }
    }
  });

  assert.equal(result.mode, 'mock');
  assert.equal(result.source, 'mock');
  assert.equal(result.heatmapPoints, mockHeatmapPoints);
  assert.equal(result.flowEdges, mockFlowEdges);
  assert.deepEqual(result.traceIds, []);
  assert.equal(clientCalled, false);
});

test('loads API heatmap and trajectories through injected client', async () => {
  const calls: string[] = [];
  const result = await loadDigitalTwinData({
    mode: 'api',
    mallId: 'mall_demo_001',
    client: {
      getHeatmap: async (mallId) => {
        calls.push(`heatmap:${mallId}`);
        return createHeatmapEnvelope();
      },
      getTrajectories: async (mallId) => {
        calls.push(`trajectories:${mallId}`);
        return createTrajectoriesEnvelope();
      }
    }
  });

  assert.deepEqual(calls.sort(), ['heatmap:mall_demo_001', 'trajectories:mall_demo_001']);
  assert.equal(result.mode, 'api');
  assert.equal(result.source, 'api');
  assert.deepEqual(result.traceIds, ['req_heatmap', 'req_trajectories']);
  assert.equal(result.timestamp, '2026-05-19T02:00:00Z');
  assert.deepEqual(result.heatmapPoints[0], {
    id: 'heat_demo_001',
    floorId: 'F2',
    x: 120,
    y: 180,
    intensity: 0.72
  });
  assert.deepEqual(result.flowEdges[0], {
    id: 'flow_demo_001',
    floorId: 'F2',
    from: { x: 80, y: 120 },
    to: { x: 260, y: 320 },
    traffic: 412,
    direction: 'inbound'
  });
});

test('builds digital-twin API requests with normalized base URL and encoded mallId', async () => {
  const calls: FetchCall[] = [];
  const fetchImpl: typeof fetch = async (url, init) => {
    calls.push({ url: String(url), init });
    const path = String(url).replace('http://backend.test', '');

    if (path === '/api/v1/heatmap?mallId=mall%20demo%2F001') {
      return jsonResponse(createHeatmapEnvelope({ mallId: 'mall demo/001' }));
    }

    if (path === '/api/v1/trajectories?mallId=mall%20demo%2F001') {
      return jsonResponse(createTrajectoriesEnvelope({ mallId: 'mall demo/001' }));
    }

    throw new Error(`Unexpected URL: ${String(url)}`);
  };

  const result = await loadDigitalTwinData({
    mode: 'api',
    apiBaseUrl: ' http://backend.test/// ',
    mallId: 'mall demo/001',
    fetchImpl,
    requestIdFactory: () => 'req_digital_twin_loader'
  });

  assert.deepEqual(
    calls.map((call) => call.url).sort(),
    [
      'http://backend.test/api/v1/heatmap?mallId=mall%20demo%2F001',
      'http://backend.test/api/v1/trajectories?mallId=mall%20demo%2F001'
    ]
  );
  calls.forEach((call) => {
    assert.deepEqual(call.init?.headers, {
      Accept: 'application/json',
      'X-Request-Id': 'req_digital_twin_loader'
    });
  });
  assert.equal(result.heatmapPoints[0]?.id, 'heat_demo_001');
  assert.equal(result.flowEdges[0]?.id, 'flow_demo_001');
});

test('maps API heatmap and trajectory DTOs into safe frontend spatial shapes', () => {
  assert.deepEqual(
    mapHeatmapPointDtoToDomain({
      pointId: 'heat_invalid',
      floorId: 'F3',
      x: 30,
      y: 40,
      intensity: 1.6
    }),
    {
      id: 'heat_invalid',
      floorId: 'F3',
      x: 30,
      y: 40,
      intensity: 1
    }
  );
  assert.deepEqual(
    mapTrajectoryFlowDtoToDomain({
      flowId: 'flow_unknown',
      floorId: 'F3',
      fromPoint: { x: 10, y: 20 },
      toPoint: { x: 30, y: 40 },
      traffic: -12.2,
      direction: 'diagonal'
    }),
    {
      id: 'flow_unknown',
      floorId: 'F3',
      from: { x: 10, y: 20 },
      to: { x: 30, y: 40 },
      traffic: 0,
      direction: 'cross'
    }
  );
});

test('propagates typed API errors in digital-twin api mode without live backend fallback', async () => {
  const fetchImpl: typeof fetch = async () =>
    jsonResponse(
      {
        error: {
          code: 'MALL_NOT_FOUND',
          message: 'Mall not found',
          details: { mallId: 'missing' }
        },
        traceId: 'req_digital_twin_missing',
        timestamp: '2026-05-19T02:00:00Z'
      },
      404
    );

  await assert.rejects(
    () => loadDigitalTwinData({ mode: 'api', mallId: 'missing', fetchImpl }),
    (error: unknown) => {
      assert.ok(error instanceof ApiClientError);
      assert.equal(error.status, 404);
      assert.equal(error.code, 'MALL_NOT_FOUND');
      assert.deepEqual(error.details, { mallId: 'missing' });
      assert.equal(error.traceId, 'req_digital_twin_missing');
      return true;
    }
  );
});
