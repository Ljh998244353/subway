import assert from 'node:assert/strict';
import test from 'node:test';
import { mockAlerts, mockFloors, mockFlowEdges, mockHeatmapPoints, mockStoresWithAlerts } from '../../mock/index.ts';
import { buildDigitalTwinViewModel, digitalTwinCockpitLayout } from '../../pages/digitalTwinModel.ts';

test('P7-I3 preserves fallback and blocked 3D boundaries in the cockpit model', () => {
  assert.match(digitalTwinCockpitLayout.center, /WebGL\/Three\.js scene shell/);
  assert.match(digitalTwinCockpitLayout.center, /SVG\/2\.5D FloorPlan fallback/);
  assert.match(digitalTwinCockpitLayout.protectedBoundary, /no Drei/);
  assert.match(digitalTwinCockpitLayout.protectedBoundary, /no BlenderMCP/);
  assert.match(digitalTwinCockpitLayout.protectedBoundary, /no GLB\/GLTF/);
  assert.match(digitalTwinCockpitLayout.protectedBoundary, /no external assets/);
  assert.match(digitalTwinCockpitLayout.protectedBoundary, /mock\/API data mode preserved/);
});

test('P7-I3 scene shell has stable synthetic floor and store inputs', () => {
  const viewModel = buildDigitalTwinViewModel(mockFloors, mockStoresWithAlerts, mockAlerts, mockHeatmapPoints, mockFlowEdges, {
    floorId: 'F2',
    mode: 'heatmap'
  });

  assert.equal(viewModel.hasSpatialData, true);
  assert.equal(viewModel.floor.id, 'F2');
  assert.ok(viewModel.stores.length > 0);
  assert.ok(viewModel.selectedStore);

  viewModel.stores.forEach((store) => {
    assert.match(store.id, /^S\d+/);
    assert.ok(store.geometry.width > 0);
    assert.ok(store.geometry.height > 0);
    assert.ok(store.geometry.x + store.geometry.width <= viewModel.floor.width);
    assert.ok(store.geometry.y + store.geometry.height <= viewModel.floor.height);
  });
});
