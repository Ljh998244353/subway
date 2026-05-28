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
    assert.equal(href, '/digital-twin/store/S042?view=store&floorId=F2&mode=flow&flowScope=inbound&storeId=S042');
  });

  it('builds App Router paths for overview, floor, and store levels', () => {
    assert.equal(
      buildTwinHref({ view: 'overview', floorId: 'F2', mode: 'heatmap', flowScope: 'inbound' }),
      '/digital-twin?view=overview&floorId=F2&mode=heatmap&flowScope=inbound'
    );
    assert.equal(
      buildTwinHref({ view: 'floor', floorId: 'F3', mode: 'alerts', flowScope: 'inbound' }),
      '/digital-twin/F3?view=floor&floorId=F3&mode=alerts&flowScope=inbound'
    );
    assert.equal(
      buildTwinHref({ view: 'store', floorId: 'F1', storeId: 'S030', mode: 'score', flowScope: 'outbound' }),
      '/digital-twin/store/S030?view=store&floorId=F1&mode=score&flowScope=outbound&storeId=S030'
    );
  });
});
