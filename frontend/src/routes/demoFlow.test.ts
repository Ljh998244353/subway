import assert from 'node:assert/strict';
import test from 'node:test';
import { mockAlerts, mockStoresWithAlerts } from '../mock/index.ts';
import {
  buildAlertTwinUrl,
  buildDemoCoreFlow,
  buildDemoCustomerProfileFlow,
  buildStoreAlertsUrl,
  buildStoreScoreTwinUrl
} from './demoFlow.ts';

function getParams(path: string) {
  const [, search = ''] = path.split('?');
  return new URLSearchParams(search);
}

test('builds the core demo path with route-specific and global query params', () => {
  const seedAlert = mockAlerts.find((alert) => alert.storeId);
  assert.ok(seedAlert);
  const seedStore = mockStoresWithAlerts.find((store) => store.id === seedAlert.storeId);
  assert.ok(seedStore);

  const flow = buildDemoCoreFlow(
    {
      floorId: seedStore.floorId,
      storeId: seedStore.id,
      alertId: seedAlert.id
    },
    '?mallId=M_DEMO&timeRange=7d&floorId=OLD_FLOOR&storeId=OLD_STORE'
  );

  assert.deepEqual(flow.map((step) => step.id), ['dashboard', 'digital-twin', 'store-analysis', 'store-alerts']);
  assert.equal(flow[0].path, '/dashboard?mallId=M_DEMO&timeRange=7d');

  const twinParams = getParams(flow[1].path);
  assert.equal(twinParams.get('floorId'), seedStore.floorId);
  assert.equal(twinParams.get('mode'), 'heatmap');
  assert.equal(twinParams.get('mallId'), 'M_DEMO');
  assert.equal(twinParams.get('timeRange'), '7d');
  assert.equal(twinParams.get('storeId'), null);

  const storeParams = getParams(flow[2].path);
  assert.equal(storeParams.get('storeId'), seedStore.id);
  assert.equal(storeParams.get('mallId'), 'M_DEMO');
  assert.equal(storeParams.get('timeRange'), '7d');

  const alertParams = getParams(flow[3].path);
  assert.equal(alertParams.get('alertId'), seedAlert.id);
  assert.equal(alertParams.get('storeId'), seedStore.id);
  assert.equal(alertParams.get('floorId'), seedStore.floorId);
  assert.equal(alertParams.get('mallId'), 'M_DEMO');
  assert.equal(alertParams.get('timeRange'), '7d');
});

test('builds digital twin entry points for score and alert demo states', () => {
  assert.equal(
    buildStoreScoreTwinUrl({ floorId: 'F2', storeId: 'S001' }, '?mallId=M_DEMO&timeRange=today'),
    '/digital-twin?floorId=F2&mode=score&storeId=S001&mallId=M_DEMO&timeRange=today'
  );
  assert.equal(
    buildAlertTwinUrl({ floorId: 'F2', storeId: 'S001', alertId: 'A0001' }, '?mallId=M_DEMO&timeRange=7d'),
    '/digital-twin?floorId=F2&mode=alerts&storeId=S001&alertId=A0001&mallId=M_DEMO&timeRange=7d'
  );
});

test('omits optional empty route params while preserving global context', () => {
  assert.equal(
    buildStoreAlertsUrl({ floorId: 'F3' }, '?mallId=M_DEMO&timeRange=today&storeId=OLD_STORE'),
    '/store-alerts?floorId=F3&mallId=M_DEMO&timeRange=today'
  );
});

test('builds the customer profile demo branch without leaking unrelated filters', () => {
  const flow = buildDemoCustomerProfileFlow(
    { floorId: 'F2', category: '餐饮' },
    '?mallId=M_DEMO&timeRange=30d&floorId=OLD_FLOOR&category=OLD_CATEGORY&storeId=OLD_STORE'
  );

  assert.deepEqual(flow.map((step) => step.id), ['customer-profile', 'digital-twin', 'store-analysis']);
  assert.equal(flow[0].path, '/customer-profile?mallId=M_DEMO&timeRange=30d');

  const twinParams = getParams(flow[1].path);
  assert.equal(twinParams.get('floorId'), 'F2');
  assert.equal(twinParams.get('mode'), 'flow');
  assert.equal(twinParams.get('mallId'), 'M_DEMO');
  assert.equal(twinParams.get('timeRange'), '30d');
  assert.equal(twinParams.get('category'), null);
  assert.equal(twinParams.get('storeId'), null);

  const analysisParams = getParams(flow[2].path);
  assert.equal(analysisParams.get('category'), '餐饮');
  assert.equal(analysisParams.get('mallId'), 'M_DEMO');
  assert.equal(analysisParams.get('timeRange'), '30d');
  assert.equal(analysisParams.get('floorId'), null);
  assert.equal(analysisParams.get('storeId'), null);
});
