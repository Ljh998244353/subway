import assert from 'node:assert/strict';
import test from 'node:test';
import type { StoreAlertsDataResult } from '../api/storeAlertsDataLoader.ts';
import { mockAlerts, mockFloors, mockStoresWithAlerts } from '../mock/index.ts';
import { buildRouteWithGlobalQuery } from '../routes/routeConfig.ts';
import { buildStoreAlertsViewModel } from './storeAlertsModel.ts';
import { createInitialStoreAlertsDataState, resolveStoreAlertsDataState } from './storeAlertsState.ts';

test('builds store alert rows from shared mock data', () => {
  const viewModel = buildStoreAlertsViewModel(mockAlerts, mockFloors, mockStoresWithAlerts, {});

  assert.equal(viewModel.rows.length, mockAlerts.length);
  assert.ok(viewModel.selectedAlert);
  assert.equal(viewModel.hasRows, true);
  assert.equal(viewModel.summary.total, mockAlerts.length);
  assert.ok(viewModel.summary.open > 0);
});

test('filters alerts by level, status, floor, store, and keyword', () => {
  const seedAlert = mockAlerts.find((alert) => alert.storeId);
  assert.ok(seedAlert);

  const viewModel = buildStoreAlertsViewModel(mockAlerts, mockFloors, mockStoresWithAlerts, {
    level: seedAlert.level,
    status: seedAlert.status,
    floorId: seedAlert.floorId,
    storeId: seedAlert.storeId,
    keyword: seedAlert.title.slice(0, 2)
  });

  assert.ok(viewModel.rows.length > 0);
  viewModel.rows.forEach((row) => {
    assert.equal(row.level, seedAlert.level);
    assert.equal(row.status, seedAlert.status);
    assert.equal(row.floorId, seedAlert.floorId);
    assert.equal(row.storeId, seedAlert.storeId);
    assert.ok(row.title.includes(seedAlert.title.slice(0, 2)));
  });
});

test('selects alert from query and exposes detail metrics and actions', () => {
  const selected = mockAlerts[3];
  const viewModel = buildStoreAlertsViewModel(mockAlerts, mockFloors, mockStoresWithAlerts, {
    alertId: selected.id
  });

  assert.equal(viewModel.selectedAlert?.id, selected.id);
  assert.equal(viewModel.detailMetrics.length, 4);
  assert.ok(viewModel.actionItems.length >= 3);
  assert.ok(viewModel.selectedFloorName.length > 0);
  assert.ok(viewModel.selectedStoreName.length > 0);
});

test('keeps detail backed by valid store and floor references', () => {
  const viewModel = buildStoreAlertsViewModel(mockAlerts, mockFloors, mockStoresWithAlerts, {});
  const floorIds = new Set(mockFloors.map((floor) => floor.id));
  const storeIds = new Set(mockStoresWithAlerts.map((store) => store.id));

  viewModel.rows.forEach((row) => {
    assert.ok(floorIds.has(row.floorId));

    if (row.storeId) {
      assert.ok(storeIds.has(row.storeId));
      assert.notEqual(row.storeName, '楼层公共区域');
    }

    assert.ok(row.triggerMetric.length > 0);
    assert.ok(row.suggestedAction.length > 0);
  });
});

test('returns an empty state for unmatched alert filters', () => {
  const viewModel = buildStoreAlertsViewModel(mockAlerts, mockFloors, mockStoresWithAlerts, {
    keyword: 'not-a-real-alert-keyword'
  });

  assert.equal(viewModel.rows.length, 0);
  assert.equal(viewModel.hasRows, false);
  assert.equal(viewModel.selectedAlert, undefined);
  assert.equal(viewModel.detailMetrics.length, 0);
});

test('store alert drill-down links preserve global query params', () => {
  assert.equal(
    buildRouteWithGlobalQuery('/store-analysis?storeId=S001&alertId=A0001', '?mallId=M_DEMO&timeRange=7d'),
    '/store-analysis?storeId=S001&alertId=A0001&mallId=M_DEMO&timeRange=7d'
  );
  assert.equal(
    buildRouteWithGlobalQuery('/digital-twin?floorId=F2&mode=alerts&storeId=S001&alertId=A0001', '?mallId=M_DEMO&timeRange=7d'),
    '/digital-twin?floorId=F2&mode=alerts&storeId=S001&alertId=A0001&mallId=M_DEMO&timeRange=7d'
  );
});

test('store alerts data state starts with mock mode without API data', () => {
  const state = createInitialStoreAlertsDataState();

  assert.equal(state.status, 'ready');
  assert.equal(state.result.mode, 'mock');
  assert.equal(state.result.source, 'mock');
  assert.equal(state.result.alerts, mockAlerts);
  assert.equal(state.result.floors, mockFloors);
  assert.equal(state.result.stores, mockStoresWithAlerts);
});

test('store alerts data state forwards explicit API mode to loader', async () => {
  const apiResult: StoreAlertsDataResult = {
    mode: 'api',
    source: 'api',
    alerts: [mockAlerts[0]],
    floors: mockFloors,
    stores: [mockStoresWithAlerts[0]],
    traceIds: ['req_store_alerts_state'],
    timestamp: '2026-05-25T08:30:00Z'
  };
  const calls: unknown[] = [];

  const state = await resolveStoreAlertsDataState({
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
  assert.deepEqual(state.result.traceIds, ['req_store_alerts_state']);
});

test('store alerts API result can drive the existing alert view model', async () => {
  const selectedAlert = mockAlerts.find((alert) => alert.storeId === mockStoresWithAlerts[0]?.id);
  assert.ok(selectedAlert);
  const apiResult: StoreAlertsDataResult = {
    mode: 'api',
    source: 'api',
    alerts: [selectedAlert],
    floors: mockFloors,
    stores: [mockStoresWithAlerts[0]],
    traceIds: ['req_store_alerts_state'],
    timestamp: '2026-05-25T08:30:00Z'
  };
  const state = await resolveStoreAlertsDataState({
    mode: 'api',
    loader: async () => apiResult
  });
  const viewModel = buildStoreAlertsViewModel(state.result.alerts, state.result.floors, state.result.stores, {
    alertId: selectedAlert.id
  });

  assert.equal(state.result.source, 'api');
  assert.equal(viewModel.selectedAlert?.id, selectedAlert.id);
  assert.equal(viewModel.selectedAlert?.storeName, mockStoresWithAlerts[0]?.name);
  assert.equal(viewModel.summary.total, 1);
});

test('store alerts data state falls back to mock on API loader failure', async () => {
  const state = await resolveStoreAlertsDataState({
    mode: 'api',
    loader: async () => {
      throw new Error('store alerts backend unavailable');
    }
  });

  assert.equal(state.status, 'error');
  assert.equal(state.result.mode, 'mock');
  assert.equal(state.result.source, 'mock');
  assert.equal(state.result.alerts, mockAlerts);
  assert.equal(state.result.floors, mockFloors);
  assert.equal(state.result.stores, mockStoresWithAlerts);
  assert.equal(state.errorMessage, 'store alerts backend unavailable');
});
