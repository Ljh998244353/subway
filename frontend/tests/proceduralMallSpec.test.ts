import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { getSceneFloorSpecs, isPointInsideAtrium, mapStoreToMallScene, PROCEDURAL_MALL_SPEC } from '../src/components/twin-engine/proceduralMallSpec.ts';
import { getStore } from '../src/lib/twin-data.ts';

describe('procedural mall spec', () => {
  it('maps five-level frontend state onto the constrained three-floor scene', () => {
    const basementScene = getSceneFloorSpecs('B1');
    const topScene = getSceneFloorSpecs('F4');

    assert.equal(PROCEDURAL_MALL_SPEC.coordinateSystem, 'right-handed');
    assert.equal(PROCEDURAL_MALL_SPEC.unitScaleMeters, 1);
    assert.deepEqual(
      basementScene.map((floor) => floor.isActive),
      [true, false, false]
    );
    assert.deepEqual(
      topScene.map((floor) => floor.isActive),
      [false, false, true]
    );
  });

  it('keeps the central atrium clear of columns and circulation clutter', () => {
    assert.equal(isPointInsideAtrium(0, 0), true);
    assert.equal(isPointInsideAtrium(10, 0), true);
    assert.equal(isPointInsideAtrium(40, 0), false);
    assert.equal(isPointInsideAtrium(0, 30), false);
  });

  it('projects store metrics onto inward-facing perimeter storefronts', () => {
    const northStore = getStore('S001');
    const southStore = getStore('S015');
    const northPlacement = mapStoreToMallScene(northStore);
    const southPlacement = mapStoreToMallScene(southStore);

    assert.ok(Math.abs(northPlacement.x) >= PROCEDURAL_MALL_SPEC.corridorInset);
    assert.ok(Math.abs(southPlacement.x) >= PROCEDURAL_MALL_SPEC.corridorInset);
    assert.ok(northPlacement.z < 0);
    assert.ok(southPlacement.z > 0);
    assert.ok([0, Math.PI].includes(northPlacement.facing));
    assert.ok([0, Math.PI].includes(southPlacement.facing));
  });
});
