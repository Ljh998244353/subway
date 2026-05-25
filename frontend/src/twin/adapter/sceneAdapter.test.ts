import assert from 'node:assert/strict';
import test from 'node:test';
import { mockAlerts, mockFloors, mockFlowEdges, mockHeatmapPoints, mockStoresWithAlerts } from '../../mock/index.ts';
import { buildDigitalTwinViewModel } from '../../pages/digitalTwinModel.ts';
import { buildSceneAdapterState, findObjectById, findStoreByStoreId } from './sceneAdapter.ts';

test('scene adapter produces stable object IDs for stores', () => {
  const viewModel = buildDigitalTwinViewModel(mockFloors, mockStoresWithAlerts, mockAlerts, mockHeatmapPoints, mockFlowEdges, {
    floorId: 'F2',
    mode: 'heatmap'
  });
  const state = buildSceneAdapterState(viewModel);

  assert.ok(state.stores.length > 0);
  state.stores.forEach((store) => {
    assert.match(store.id, /^store-S\d+/);
    assert.match(store.storeId, /^S\d+/);
    assert.equal(store.type, 'store');
    assert.equal(store.floorId, 'F2');
  });
});

test('scene adapter produces stable floor and corridor IDs', () => {
  const viewModel = buildDigitalTwinViewModel(mockFloors, mockStoresWithAlerts, mockAlerts, mockHeatmapPoints, mockFlowEdges, {
    floorId: 'F2',
    mode: 'heatmap'
  });
  const state = buildSceneAdapterState(viewModel);

  assert.ok(state.floor);
  assert.equal(state.floor.id, 'floor-F2');
  assert.equal(state.floor.type, 'floor');
  assert.equal(state.floor.floorId, 'F2');
  assert.equal(state.corridors.length, 2);
  assert.match(state.corridors[0].id, /^corridor-h-F2$/);
  assert.match(state.corridors[1].id, /^corridor-v-F2$/);
});

test('scene adapter marks selected store correctly', () => {
  const viewModel = buildDigitalTwinViewModel(mockFloors, mockStoresWithAlerts, mockAlerts, mockHeatmapPoints, mockFlowEdges, {
    floorId: 'F2',
    storeId: 'S021',
    mode: 'heatmap'
  });
  const state = buildSceneAdapterState(viewModel);

  assert.equal(state.selectedStoreId, 'S021');
  const selectedStore = state.stores.find((s) => s.selected);
  assert.ok(selectedStore);
  assert.equal(selectedStore.storeId, 'S021');
  assert.equal(selectedStore.color, '#2f54eb');
});

test('scene adapter assigns colors based on store level', () => {
  const viewModel = buildDigitalTwinViewModel(mockFloors, mockStoresWithAlerts, mockAlerts, mockHeatmapPoints, mockFlowEdges, {
    floorId: 'F2',
    mode: 'heatmap'
  });
  const state = buildSceneAdapterState(viewModel);

  state.stores.forEach((store) => {
    if (store.selected) {
      assert.equal(store.color, '#2f54eb');
    } else if (store.level === 'A' || store.level === 'B') {
      assert.equal(store.color, '#14b8a6');
    } else if (store.level === 'C') {
      assert.equal(store.color, '#f59e0b');
    } else {
      assert.equal(store.color, '#f43f5e');
    }
  });
});

test('scene adapter converts store positions correctly', () => {
  const viewModel = buildDigitalTwinViewModel(mockFloors, mockStoresWithAlerts, mockAlerts, mockHeatmapPoints, mockFlowEdges, {
    floorId: 'F2',
    mode: 'heatmap'
  });
  const state = buildSceneAdapterState(viewModel);

  state.stores.forEach((store) => {
    assert.ok(store.position.length === 3);
    assert.ok(store.size.length === 3);
    assert.ok(store.size[0] >= 0.46);
    assert.ok(store.size[2] >= 0.46);
  });
});

test('scene adapter findObjectById returns correct objects', () => {
  const viewModel = buildDigitalTwinViewModel(mockFloors, mockStoresWithAlerts, mockAlerts, mockHeatmapPoints, mockFlowEdges, {
    floorId: 'F2',
    mode: 'heatmap'
  });
  const state = buildSceneAdapterState(viewModel);

  const floor = findObjectById(state.objects, 'floor-F2');
  assert.ok(floor);
  assert.equal(floor.type, 'floor');

  const corridor = findObjectById(state.objects, 'corridor-h-F2');
  assert.ok(corridor);
  assert.equal(corridor.type, 'corridor');

  if (state.stores.length > 0) {
    const store = findObjectById(state.objects, state.stores[0].id);
    assert.ok(store);
    assert.equal(store.type, 'store');
  }
});

test('scene adapter findStoreByStoreId returns correct store', () => {
  const viewModel = buildDigitalTwinViewModel(mockFloors, mockStoresWithAlerts, mockAlerts, mockHeatmapPoints, mockFlowEdges, {
    floorId: 'F2',
    mode: 'heatmap'
  });
  const state = buildSceneAdapterState(viewModel);

  const store = findStoreByStoreId(state.stores, 'S021');
  assert.ok(store);
  assert.equal(store.storeId, 'S021');

  const missing = findStoreByStoreId(state.stores, 'NONEXISTENT');
  assert.equal(missing, undefined);
});

test('scene adapter preserves spatial data flag', () => {
  const viewModel = buildDigitalTwinViewModel(mockFloors, mockStoresWithAlerts, mockAlerts, mockHeatmapPoints, mockFlowEdges, {
    floorId: 'F2',
    mode: 'heatmap'
  });
  const state = buildSceneAdapterState(viewModel);

  assert.equal(state.hasSpatialData, viewModel.hasSpatialData);
  assert.equal(state.mode, viewModel.mode);
});
