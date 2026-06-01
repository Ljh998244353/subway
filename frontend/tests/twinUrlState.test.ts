import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { buildTwinHref, parseTwinUrlState } from '../src/lib/url-state.ts';

describe('enterprise twin URL state', () => {
  it('uses stable defaults', () => {
    const state = parseTwinUrlState({});
    assert.equal(state.view, 'overview');
    assert.equal(state.floorId, 'F2');
    assert.equal(state.mode, 'heatmap');
    assert.equal(state.flowScope, 'inbound');
    assert.equal(state.viewport, '3d');
    assert.equal(state.model, 'procedural');
    assert.equal(state.scenarioDensity, 'peak');
    assert.equal(state.scenarioSpeed, 1);
    assert.equal(state.incidentLevel, 1);
  });

  it('parses store focus state', () => {
    const state = parseTwinUrlState({ floorId: 'F3', storeId: 'S071', mode: 'flow', flowScope: 'outbound' });
    assert.equal(state.view, 'store');
    assert.equal(state.floorId, 'F3');
    assert.equal(state.storeId, 'S071');
    assert.equal(state.mode, 'flow');
    assert.equal(state.flowScope, 'outbound');
  });

  it('builds restorable digital twin hrefs', () => {
    const href = buildTwinHref({ view: 'store', floorId: 'F2', storeId: 'S042', mode: 'flow', flowScope: 'inbound' });
    assert.equal(href, '/digital-twin/store/S042?view=store&floorId=F2&mode=flow&flowScope=inbound&viewport=3d&model=procedural&density=peak&speed=1&incident=1&storeId=S042');
  });

  it('builds App Router paths for overview, floor, and store levels', () => {
    assert.equal(
      buildTwinHref({ view: 'overview', floorId: 'F2', mode: 'heatmap', flowScope: 'inbound' }),
      '/digital-twin?view=overview&floorId=F2&mode=heatmap&flowScope=inbound&viewport=3d&model=procedural&density=peak&speed=1&incident=1'
    );
    assert.equal(
      buildTwinHref({ view: 'floor', floorId: 'F3', mode: 'alerts', flowScope: 'inbound' }),
      '/digital-twin/F3?view=floor&floorId=F3&mode=alerts&flowScope=inbound&viewport=3d&model=procedural&density=peak&speed=1&incident=1'
    );
    assert.equal(
      buildTwinHref({ view: 'store', floorId: 'F1', storeId: 'S030', mode: 'score', flowScope: 'outbound' }),
      '/digital-twin/store/S030?view=store&floorId=F1&mode=score&flowScope=outbound&viewport=3d&model=procedural&density=peak&speed=1&incident=1&storeId=S030'
    );
  });

  it('parses 2D viewport mode from URL', () => {
    const state = parseTwinUrlState({ viewport: '2d' });
    assert.equal(state.viewport, '2d');
  });

  it('supports legacy svg=1 param as 2D fallback', () => {
    const state = parseTwinUrlState({ svg: '1' });
    assert.equal(state.viewport, '2d');
  });

  it('keeps the GLB review prototype behind an explicit URL state', () => {
    const state = parseTwinUrlState({ model: 'prototype', viewport: '3d' });
    const href = buildTwinHref({ model: 'prototype', viewport: '3d' });

    assert.equal(state.model, 'prototype');
    assert.equal(href, '/digital-twin?view=overview&floorId=F2&mode=heatmap&flowScope=inbound&viewport=3d&model=prototype&density=peak&speed=1&incident=1');
  });

  it('round-trips frontend-only synthetic scenario params', () => {
    const state = parseTwinUrlState({ density: 'surge', speed: '2', incident: '3' });
    const fallback = parseTwinUrlState({ density: 'bad', speed: '4', incident: '9' });
    const href = buildTwinHref({ scenarioDensity: 'baseline', scenarioSpeed: 0.5, incidentLevel: 0 });

    assert.equal(state.scenarioDensity, 'surge');
    assert.equal(state.scenarioSpeed, 2);
    assert.equal(state.incidentLevel, 3);
    assert.equal(fallback.scenarioDensity, 'peak');
    assert.equal(fallback.scenarioSpeed, 1);
    assert.equal(fallback.incidentLevel, 1);
    assert.equal(href, '/digital-twin?view=overview&floorId=F2&mode=heatmap&flowScope=inbound&viewport=3d&model=procedural&density=baseline&speed=0.5&incident=0');
  });
});
