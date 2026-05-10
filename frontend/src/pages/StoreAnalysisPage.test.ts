import assert from 'node:assert/strict';
import test from 'node:test';
import { getWeightedScore } from '../components/scoreBreakdownUtils.ts';
import { mockAlerts, mockFloors, mockStoresWithAlerts } from '../mock/index.ts';
import { buildRouteWithGlobalQuery } from '../routes/routeConfig.ts';
import { buildStoreAnalysisViewModel } from './storeAnalysisModel.ts';

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
