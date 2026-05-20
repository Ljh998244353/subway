import assert from 'node:assert/strict';
import test from 'node:test';
import { mockAlerts, mockFloors, mockOverview, mockStoresWithAlerts } from '../mock/index.ts';
import { buildRouteWithGlobalQuery } from '../routes/routeConfig.ts';
import type { OverviewDataResult } from '../api/overviewDataLoader.ts';
import { buildDashboardViewModel, getDashboardState } from './dashboardModel.ts';
import { createInitialDashboardOverviewState, resolveDashboardOverviewState } from './dashboardOverviewState.ts';

const dashboard = buildDashboardViewModel(mockOverview, mockStoresWithAlerts, mockAlerts, mockFloors);

test('builds dashboard sections from shared mock data', () => {
  assert.equal(dashboard.metrics.length, 5);
  assert.ok(dashboard.trafficTrend.length >= 8);
  assert.equal(dashboard.floorSummaries.length, mockFloors.length);
  assert.ok(dashboard.inefficientStores.length > 0);
  assert.ok(dashboard.alerts.length > 0);
  assert.equal(dashboard.hasData, true);
});

test('keeps inefficient store rows limited to C/D level stores', () => {
  dashboard.inefficientStores.forEach((store) => {
    assert.ok(store.level === 'C' || store.level === 'D', `${store.id} should be a C/D store`);
    assert.ok(store.score >= 0 && store.score <= 100, `${store.id} score should stay in 0-100`);
    assert.ok(store.conversionRate >= 0 && store.conversionRate <= 100, `${store.id} conversion should stay in 0-100`);
  });
});

test('keeps alert summary rows backed by existing alerts', () => {
  const alertIds = new Set(mockAlerts.map((alert) => alert.id));

  dashboard.alerts.forEach((alert) => {
    assert.ok(alertIds.has(alert.id), `${alert.id} should come from mock alerts`);
    assert.ok(alert.durationMinutes >= 0, `${alert.id} duration should be non-negative`);
    assert.ok(alert.suggestedAction.length > 0, `${alert.id} should include suggested action`);
  });
});

test('detects dashboard empty and danger states', () => {
  assert.equal(getDashboardState(dashboard), 'danger');
  assert.equal(
    getDashboardState({
      ...dashboard,
      metrics: [],
      trafficTrend: [],
      hasData: false
    }),
    'empty'
  );
});

test('dashboard drill-down links preserve global query params', () => {
  assert.equal(
    buildRouteWithGlobalQuery('/store-analysis?storeId=S001', '?mallId=M_DEMO&timeRange=today'),
    '/store-analysis?storeId=S001&mallId=M_DEMO&timeRange=today'
  );
});

test('dashboard overview state starts with mock mode without API data', () => {
  const state = createInitialDashboardOverviewState();

  assert.equal(state.status, 'ready');
  assert.equal(state.result.mode, 'mock');
  assert.equal(state.result.source, 'mock');
  assert.equal(state.result.overview, mockOverview);
});

test('dashboard overview state forwards explicit API mode to loader', async () => {
  const apiResult: OverviewDataResult = {
    mode: 'api',
    source: 'api',
    overview: {
      ...mockOverview,
      source: 'api',
      generatedAt: '2026-05-20T08:00:00Z'
    },
    traceId: 'req_dashboard_state',
    timestamp: '2026-05-20T08:00:01Z'
  };
  const calls: unknown[] = [];

  const state = await resolveDashboardOverviewState({
    mode: 'api',
    mallId: 'mall demo/001',
    apiBaseUrl: 'http://backend.test',
    loader: async (options) => {
      calls.push(options);
      return apiResult;
    }
  });

  assert.deepEqual(calls, [
    {
      mode: 'api',
      mallId: 'mall demo/001',
      apiBaseUrl: 'http://backend.test'
    }
  ]);
  assert.equal(state.status, 'ready');
  assert.equal(state.result.source, 'api');
  assert.equal(state.result.traceId, 'req_dashboard_state');
});

test('dashboard overview state falls back to mock on API loader failure', async () => {
  const state = await resolveDashboardOverviewState({
    mode: 'api',
    loader: async () => {
      throw new Error('backend unavailable');
    }
  });

  assert.equal(state.status, 'error');
  assert.equal(state.result.mode, 'mock');
  assert.equal(state.result.source, 'mock');
  assert.equal(state.result.overview, mockOverview);
  assert.equal(state.errorMessage, 'backend unavailable');
});
