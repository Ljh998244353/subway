import assert from 'node:assert/strict';
import test from 'node:test';
import { getWeightedScore } from '../components/scoreBreakdownUtils.ts';
import type { StoreAnalysisDataResult } from '../api/storeAnalysisDataLoader.ts';
import { mockAlerts, mockFloors, mockStoresWithAlerts } from '../mock/index.ts';
import { buildRouteWithGlobalQuery } from '../routes/routeConfig.ts';
import { buildStoreAnalysisViewModel } from './storeAnalysisModel.ts';
import { createInitialStoreAnalysisDataState, resolveStoreAnalysisDataState } from './storeAnalysisState.ts';

test('builds store analysis rows from shared mock data', () => {
  const viewModel = buildStoreAnalysisViewModel(mockStoresWithAlerts, mockAlerts, mockFloors, {});

  assert.equal(viewModel.rows.length, mockStoresWithAlerts.length);
  assert.ok(viewModel.selectedStore);
  assert.equal(viewModel.hasRows, true);
  assert.ok(viewModel.availableCategories.length >= 8);
  assert.deepEqual(viewModel.availableLevels, ['A', 'B', 'C', 'D']);
});

test('filters store rows by floor, category, score level, and keyword', () => {
  const seedStore = mockStoresWithAlerts.find((store) => store.score.level === 'C' || store.score.level === 'D');
  assert.ok(seedStore);

  const viewModel = buildStoreAnalysisViewModel(mockStoresWithAlerts, mockAlerts, mockFloors, {
    floorId: seedStore.floorId,
    category: seedStore.category,
    scoreLevel: seedStore.score.level,
    keyword: seedStore.name.slice(0, 2)
  });

  assert.ok(viewModel.rows.length > 0);
  viewModel.rows.forEach((row) => {
    assert.equal(row.floorId, seedStore.floorId);
    assert.equal(row.category, seedStore.category);
    assert.equal(row.level, seedStore.score.level);
    assert.ok(row.name.includes(seedStore.name.slice(0, 2)));
  });
});

test('selects store from query when available and exposes metrics', () => {
  const selected = mockStoresWithAlerts[10];
  const viewModel = buildStoreAnalysisViewModel(mockStoresWithAlerts, mockAlerts, mockFloors, {
    storeId: selected.id
  });

  assert.equal(viewModel.selectedStore?.id, selected.id);
  assert.equal(viewModel.detailMetrics.length, 5);
  assert.ok(viewModel.inefficientReasonText.length >= 1);
  assert.ok(viewModel.selectedFloorName.length > 0);
});

test('keeps score breakdown weighted result inside score boundaries', () => {
  mockStoresWithAlerts.slice(0, 20).forEach((store) => {
    const weightedScore = getWeightedScore(store.score.breakdown);
    assert.ok(weightedScore >= 0 && weightedScore <= 100, `${store.id} weighted score should be 0-100`);
  });
});

test('keeps related alerts backed by selected store', () => {
  const storeWithAlerts = mockStoresWithAlerts.find((store) => store.alertIds.length > 0);
  assert.ok(storeWithAlerts);

  const viewModel = buildStoreAnalysisViewModel(mockStoresWithAlerts, mockAlerts, mockFloors, {
    storeId: storeWithAlerts.id
  });

  assert.ok(viewModel.relatedAlerts.length > 0);
  viewModel.relatedAlerts.forEach((alert) => {
    const sourceAlert = mockAlerts.find((item) => item.id === alert.id);
    assert.equal(sourceAlert?.storeId, storeWithAlerts.id);
  });
});

test('store analysis drill-down links preserve global query params', () => {
  assert.equal(
    buildRouteWithGlobalQuery('/digital-twin?floorId=F2&storeId=S001&mode=score', '?mallId=M_DEMO&timeRange=7d'),
    '/digital-twin?floorId=F2&storeId=S001&mode=score&mallId=M_DEMO&timeRange=7d'
  );
});

test('store analysis data state starts with mock mode without API data', () => {
  const state = createInitialStoreAnalysisDataState('S008');

  assert.equal(state.status, 'ready');
  assert.equal(state.result.mode, 'mock');
  assert.equal(state.result.source, 'mock');
  assert.equal(state.result.stores, mockStoresWithAlerts);
  assert.equal(state.result.selectedStoreId, 'S008');
});

test('store analysis data state forwards explicit API mode to loader', async () => {
  const apiResult: StoreAnalysisDataResult = {
    mode: 'api',
    source: 'api',
    stores: [mockStoresWithAlerts[0]],
    selectedStoreId: mockStoresWithAlerts[0]?.id,
    traceIds: ['req_store_analysis_state'],
    timestamp: '2026-05-20T08:30:00Z'
  };
  const calls: unknown[] = [];

  const state = await resolveStoreAnalysisDataState({
    mode: 'api',
    mallId: 'mall demo/001',
    selectedStoreId: 'store demo/101',
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
      selectedStoreId: 'store demo/101',
      apiBaseUrl: 'http://backend.test'
    }
  ]);
  assert.equal(state.status, 'ready');
  assert.equal(state.result.source, 'api');
  assert.deepEqual(state.result.traceIds, ['req_store_analysis_state']);
});

test('store analysis data state falls back to mock on API loader failure', async () => {
  const state = await resolveStoreAnalysisDataState({
    mode: 'api',
    selectedStoreId: 'S010',
    loader: async () => {
      throw new Error('store backend unavailable');
    }
  });

  assert.equal(state.status, 'error');
  assert.equal(state.result.mode, 'mock');
  assert.equal(state.result.source, 'mock');
  assert.equal(state.result.stores, mockStoresWithAlerts);
  assert.equal(state.result.selectedStoreId, 'S010');
  assert.equal(state.errorMessage, 'store backend unavailable');
});
