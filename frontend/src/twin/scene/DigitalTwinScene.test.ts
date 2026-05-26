import assert from 'node:assert/strict';
import test from 'node:test';
import { mockAlerts, mockFloors, mockFlowEdges, mockHeatmapPoints, mockStoresWithAlerts } from '../../mock/index.ts';
import { buildDigitalTwinViewModel, digitalTwinCockpitLayout } from '../../pages/digitalTwinModel.ts';
import { buildSceneAdapterState } from '../adapter/sceneAdapter.ts';

test('P7-R2 preserves fallback and audited 3D boundaries in the cockpit model', () => {
  assert.match(digitalTwinCockpitLayout.center, /typed scene adapter layer/);
  assert.match(digitalTwinCockpitLayout.center, /WebGL\/Three\.js/);
  assert.match(digitalTwinCockpitLayout.center, /SVG\/2\.5D FloorPlan fallback/);
  assert.match(digitalTwinCockpitLayout.protectedBoundary, /audited Drei/);
  assert.match(digitalTwinCockpitLayout.protectedBoundary, /self-authored synthetic GLB/);
  assert.match(digitalTwinCockpitLayout.protectedBoundary, /no external 3D assets/);
  assert.match(digitalTwinCockpitLayout.protectedBoundary, /no real mall material/);
  assert.match(digitalTwinCockpitLayout.protectedBoundary, /mock\/API data mode preserved/);
});

test('P7-I4 scene adapter produces stable synthetic floor and store inputs', () => {
  const viewModel = buildDigitalTwinViewModel(mockFloors, mockStoresWithAlerts, mockAlerts, mockHeatmapPoints, mockFlowEdges, {
    floorId: 'F2',
    mode: 'heatmap'
  });
  const adapterState = buildSceneAdapterState(viewModel);

  assert.equal(adapterState.hasSpatialData, true);
  assert.ok(adapterState.floor);
  assert.equal(adapterState.floor.floorId, 'F2');
  assert.ok(adapterState.stores.length > 0);

  adapterState.stores.forEach((store) => {
    assert.match(store.storeId, /^S\d+/);
    assert.match(store.id, /^store-S\d+/);
    assert.ok(store.size[0] >= 0.46);
    assert.ok(store.size[2] >= 0.46);
    assert.equal(store.floorId, 'F2');
  });
});

test('P7-I4 scene adapter marks selected store with correct interaction state', () => {
  const viewModel = buildDigitalTwinViewModel(mockFloors, mockStoresWithAlerts, mockAlerts, mockHeatmapPoints, mockFlowEdges, {
    floorId: 'F2',
    storeId: 'S021',
    mode: 'heatmap'
  });
  const adapterState = buildSceneAdapterState(viewModel);

  assert.equal(adapterState.selectedStoreId, 'S021');
  const selectedStore = adapterState.stores.find((s) => s.selected);
  assert.ok(selectedStore);
  assert.equal(selectedStore.storeId, 'S021');
  assert.equal(selectedStore.color, '#2f54eb');
  assert.equal(selectedStore.emissive, '#183b8f');
  assert.equal(selectedStore.emissiveIntensity, 0.18);
});

test('P7-I4 scene adapter produces stable corridor IDs', () => {
  const viewModel = buildDigitalTwinViewModel(mockFloors, mockStoresWithAlerts, mockAlerts, mockHeatmapPoints, mockFlowEdges, {
    floorId: 'F2',
    mode: 'heatmap'
  });
  const adapterState = buildSceneAdapterState(viewModel);

  assert.equal(adapterState.corridors.length, 2);
  assert.match(adapterState.corridors[0].id, /^corridor-h-F2$/);
  assert.match(adapterState.corridors[1].id, /^corridor-v-F2$/);
  assert.equal(adapterState.corridors[0].direction, 'horizontal');
  assert.equal(adapterState.corridors[1].direction, 'vertical');
});

test('P7-I4 scene adapter preserves spatial data flag and mode', () => {
  const viewModel = buildDigitalTwinViewModel(mockFloors, mockStoresWithAlerts, mockAlerts, mockHeatmapPoints, mockFlowEdges, {
    floorId: 'F2',
    mode: 'flow'
  });
  const adapterState = buildSceneAdapterState(viewModel);

  assert.equal(adapterState.hasSpatialData, viewModel.hasSpatialData);
  assert.equal(adapterState.mode, 'flow');
});

test('P7-I4 scene adapter produces correct total object count', () => {
  const viewModel = buildDigitalTwinViewModel(mockFloors, mockStoresWithAlerts, mockAlerts, mockHeatmapPoints, mockFlowEdges, {
    floorId: 'F2',
    mode: 'heatmap'
  });
  const adapterState = buildSceneAdapterState(viewModel);

  const expectedCount = 1 + adapterState.corridors.length + adapterState.stores.length + adapterState.alerts.length;
  assert.equal(adapterState.objects.length, expectedCount);
});
