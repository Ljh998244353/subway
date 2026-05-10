import assert from 'node:assert/strict';
import test from 'node:test';
import { buildRouteWithGlobalQuery, getGlobalQuery } from './routeConfig.ts';

test('keeps mallId and timeRange when switching routes', () => {
  assert.equal(
    buildRouteWithGlobalQuery('/store-analysis', '?mallId=M_DEMO&timeRange=7d&floorId=F2'),
    '/store-analysis?mallId=M_DEMO&timeRange=7d'
  );
});

test('falls back to demo defaults when query params are missing', () => {
  assert.deepEqual(getGlobalQuery(''), { mallId: 'M_DEMO', timeRange: 'today' });
});

test('merges route-specific query params with global query params', () => {
  assert.equal(
    buildRouteWithGlobalQuery('/digital-twin?floorId=F2&mode=heatmap', '?mallId=M_DEMO&timeRange=today'),
    '/digital-twin?floorId=F2&mode=heatmap&mallId=M_DEMO&timeRange=today'
  );
});
