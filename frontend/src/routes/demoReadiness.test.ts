import assert from 'node:assert/strict';
import test from 'node:test';
import { mockAlerts, mockCustomerProfile, mockFloors, mockStoresWithAlerts } from '../mock/index.ts';
import { appRoutes } from './routeConfig.ts';
import { buildDemoCoreFlow, buildDemoCustomerProfileFlow } from './demoFlow.ts';

const requiredRoutePaths = new Set([
  '/dashboard',
  '/digital-twin',
  '/store-analysis',
  '/customer-profile',
  '/store-alerts'
]);

function getParams(path: string) {
  const [, search = ''] = path.split('?');
  return new URLSearchParams(search);
}

test('CP2 demo exposes the five core business routes plus optional preview routes', () => {
  const routePaths = new Set(appRoutes.map((route) => route.path));

  assert.equal(routePaths.has('/style-preview'), true, 'P7 style preview should be available for visual review');
  requiredRoutePaths.forEach((path) => {
    assert.equal(routePaths.has(path), true, `${path} should be available in the app shell`);
  });
});

test('CP2 demo has linked data for the main and customer-profile presentation paths', () => {
  const seedAlert = mockAlerts.find((alert) => alert.storeId);
  assert.ok(seedAlert);
  const seedStore = mockStoresWithAlerts.find((store) => store.id === seedAlert.storeId);
  assert.ok(seedStore);
  const seedFloor = mockFloors.find((floor) => floor.id === seedStore.floorId);
  assert.ok(seedFloor);
  const seedCategory = mockCustomerProfile.topCategories[0];
  assert.ok(seedCategory);

  const globalSearch = '?mallId=M_DEMO&timeRange=today';
  const coreFlow = buildDemoCoreFlow(
    { floorId: seedFloor.id, storeId: seedStore.id, alertId: seedAlert.id },
    globalSearch
  );
  const profileFlow = buildDemoCustomerProfileFlow(
    { floorId: mockCustomerProfile.primaryFloorId, category: seedCategory },
    globalSearch
  );
  const combinedFlow = [...coreFlow, ...profileFlow];

  assert.equal(coreFlow.length, 4);
  assert.equal(profileFlow.length, 3);
  combinedFlow.forEach((step) => {
    const path = step.path.split('?')[0];
    const params = getParams(step.path);

    assert.equal(requiredRoutePaths.has(path), true, `${step.id} should point to a core route`);
    assert.equal(params.get('mallId'), 'M_DEMO');
    assert.equal(params.get('timeRange'), 'today');
  });
});

test('CP2 demo keeps the customer profile branch anonymous and aggregate only', () => {
  const forbiddenProfileFields = ['faceId', 'memberId', 'phone', 'trajectoryId', 'personId'];
  const serializedProfile = JSON.stringify(mockCustomerProfile);

  assert.match(mockCustomerProfile.privacyNote, /匿名聚合/);
  assert.match(mockCustomerProfile.privacyNote, /人脸/);
  assert.match(mockCustomerProfile.privacyNote, /个人轨迹/);
  forbiddenProfileFields.forEach((field) => {
    assert.equal(serializedProfile.includes(field), false, `${field} must not appear in customer profile mock data`);
  });
});
