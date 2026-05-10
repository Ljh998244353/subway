import assert from 'node:assert/strict';
import test from 'node:test';
import { mockAlerts, mockFloors, mockFlowEdges, mockHeatmapPoints, mockStoresWithAlerts } from '../mock/index.ts';
import { buildRouteWithGlobalQuery } from '../routes/routeConfig.ts';
import { buildDigitalTwinViewModel } from './digitalTwinModel.ts';

test('builds a digital twin view model from shared mock geometry', () => {
  const viewModel = buildDigitalTwinViewModel(mockFloors, mockStoresWithAlerts, mockAlerts, mockHeatmapPoints, mockFlowEdges, {});

  assert.equal(viewModel.floor.id, 'F2');
  assert.equal(viewModel.mode, 'heatmap');
  assert.equal(viewModel.hasSpatialData, true);
  assert.ok(viewModel.stores.length > 0);
  assert.ok(viewModel.heatmapPoints.length > 0);
  assert.ok(viewModel.flowEdges.length > 0);
  assert.ok(viewModel.metrics.length >= 5);
});

test('restores floor, mode, store, and alert selection from query filters', () => {
  const seedAlert = mockAlerts.find((alert) => alert.storeId);
  assert.ok(seedAlert);
  const seedStore = mockStoresWithAlerts.find((store) => store.id === seedAlert.storeId);
  assert.ok(seedStore);

  const viewModel = buildDigitalTwinViewModel(mockFloors, mockStoresWithAlerts, mockAlerts, mockHeatmapPoints, mockFlowEdges, {
    floorId: seedAlert.floorId,
    mode: 'alerts',
    storeId: seedStore.id,
    alertId: seedAlert.id
  });

  assert.equal(viewModel.floor.id, seedAlert.floorId);
  assert.equal(viewModel.mode, 'alerts');
  assert.equal(viewModel.selectedStore?.id, seedStore.id);
  assert.equal(viewModel.selectedAlert?.id, seedAlert.id);
});

test('keeps stores, heatmap points, flow lines, and alert markers inside selected floor', () => {
  const viewModel = buildDigitalTwinViewModel(mockFloors, mockStoresWithAlerts, mockAlerts, mockHeatmapPoints, mockFlowEdges, {
    floorId: 'F3',
    mode: 'flow'
  });
  const floor = viewModel.floor;

  viewModel.stores.forEach((store) => {
    assert.ok(store.geometry.x >= 0);
    assert.ok(store.geometry.y >= 0);
    assert.ok(store.geometry.x + store.geometry.width <= floor.width);
    assert.ok(store.geometry.y + store.geometry.height <= floor.height);
  });

  viewModel.heatmapPoints.forEach((point) => {
    assert.equal(point.floorId, floor.id);
    assert.ok(point.x >= 0 && point.x <= floor.width);
    assert.ok(point.y >= 0 && point.y <= floor.height);
  });

  viewModel.flowEdges.forEach((edge) => {
    assert.equal(edge.floorId, floor.id);
    assert.ok(edge.traffic > 0);
  });

  viewModel.alertMarkers.forEach((alert) => {
    assert.equal(alert.floorId, floor.id);
    assert.ok(alert.x >= 0 && alert.x <= floor.width);
    assert.ok(alert.y >= 0 && alert.y <= floor.height);
  });
});

test('falls back to a supported twin mode when query mode is invalid', () => {
  const viewModel = buildDigitalTwinViewModel(mockFloors, mockStoresWithAlerts, mockAlerts, mockHeatmapPoints, mockFlowEdges, {
    mode: 'unknown-mode' as never
  });

  assert.equal(viewModel.mode, 'heatmap');
});

test('digital twin drill-down links preserve global query params', () => {
  assert.equal(
    buildRouteWithGlobalQuery('/store-analysis?storeId=S001', '?mallId=M_DEMO&timeRange=7d'),
    '/store-analysis?storeId=S001&mallId=M_DEMO&timeRange=7d'
  );
  assert.equal(
    buildRouteWithGlobalQuery('/store-alerts?alertId=A0001&storeId=S001&floorId=F2', '?mallId=M_DEMO&timeRange=7d'),
    '/store-alerts?alertId=A0001&storeId=S001&floorId=F2&mallId=M_DEMO&timeRange=7d'
  );
});
