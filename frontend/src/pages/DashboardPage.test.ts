import assert from 'node:assert/strict';
import test from 'node:test';
import { mockAlerts, mockFloors, mockOverview, mockStoresWithAlerts } from '../mock/index.ts';
import { buildRouteWithGlobalQuery } from '../routes/routeConfig.ts';
import { buildDashboardViewModel, getDashboardState } from './dashboardModel.ts';

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
