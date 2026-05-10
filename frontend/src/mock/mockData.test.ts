import assert from 'node:assert/strict';
import test from 'node:test';
import { mockAlerts, mockCustomerProfile, mockFloors, mockHeatmapPoints, mockMall, mockOverview, mockStoresWithAlerts, storeCategories } from './index.ts';

const validScoreLevels = new Set(['A', 'B', 'C', 'D']);
const validAlertLevels = new Set(['high', 'medium', 'low']);
const validAlertStatuses = new Set(['open', 'in_progress', 'resolved']);

test('provides the P2-I2 minimum mock data volume', () => {
  assert.equal(mockMall.id, 'M_DEMO');
  assert.equal(mockFloors.length, 5);
  assert.equal(mockStoresWithAlerts.length, 100);
  assert.equal(storeCategories.length, 8);
  assert.equal(mockAlerts.length, 20);
});

test('keeps store metrics inside documented data-quality boundaries', () => {
  mockStoresWithAlerts.forEach((store) => {
    assert.ok(store.exposureTraffic >= 0, `${store.id} exposure traffic should be non-negative`);
    assert.ok(store.enterCount >= 0, `${store.id} enter count should be non-negative`);
    assert.ok(store.conversionRate >= 0 && store.conversionRate <= 100, `${store.id} conversion rate should be 0-100`);
    assert.ok(store.avgDwellMinutes >= 0, `${store.id} dwell should be non-negative`);
    assert.ok(store.score.score >= 0 && store.score.score <= 100, `${store.id} score should be 0-100`);
    assert.ok(validScoreLevels.has(store.score.level), `${store.id} score level should be valid`);

    Object.entries(store.score.breakdown).forEach(([name, value]) => {
      assert.ok(value >= 0 && value <= 100, `${store.id} ${name} score should be 0-100`);
    });
  });
});

test('keeps generated store geometry and heatmap points inside floor bounds', () => {
  const floorById = new Map(mockFloors.map((floor) => [floor.id, floor]));

  mockStoresWithAlerts.forEach((store) => {
    const floor = floorById.get(store.floorId);
    assert.ok(floor, `${store.id} should reference an existing floor`);
    assert.ok(store.geometry.x >= 0 && store.geometry.y >= 0, `${store.id} geometry origin should be positive`);
    assert.ok(store.geometry.x + store.geometry.width <= floor.width, `${store.id} geometry should fit floor width`);
    assert.ok(store.geometry.y + store.geometry.height <= floor.height, `${store.id} geometry should fit floor height`);
  });

  mockHeatmapPoints.forEach((point) => {
    const floor = floorById.get(point.floorId);
    assert.ok(floor, `${point.id} should reference an existing floor`);
    assert.ok(point.x >= 0 && point.x <= floor.width, `${point.id} x should be inside floor`);
    assert.ok(point.y >= 0 && point.y <= floor.height, `${point.id} y should be inside floor`);
    assert.ok(point.intensity >= 0 && point.intensity <= 1, `${point.id} intensity should be 0-1`);
  });
});

test('keeps alert references and status values consistent', () => {
  const floorIds = new Set(mockFloors.map((floor) => floor.id));
  const storeIds = new Set(mockStoresWithAlerts.map((store) => store.id));

  mockAlerts.forEach((alert) => {
    assert.ok(floorIds.has(alert.floorId), `${alert.id} should reference an existing floor`);
    assert.ok(validAlertLevels.has(alert.level), `${alert.id} level should be valid`);
    assert.ok(validAlertStatuses.has(alert.status), `${alert.id} status should be valid`);
    assert.ok(alert.durationMinutes >= 0, `${alert.id} duration should be non-negative`);

    if (alert.storeId) {
      assert.ok(storeIds.has(alert.storeId), `${alert.id} should reference an existing store`);
    }
  });
});

test('keeps overview and customer profile aggregates usable by later pages', () => {
  assert.equal(mockOverview.mallId, mockMall.id);
  assert.equal(mockOverview.floorSummaries.length, mockFloors.length);
  assert.ok(mockOverview.metrics.length >= 5);
  assert.ok(mockOverview.trafficTrend.length >= 8);
  assert.ok(mockCustomerProfile.privacyNote.includes('匿名聚合'));
  assert.ok(mockCustomerProfile.categoryPreferences.every((item) => item.conversionRate >= 0 && item.conversionRate <= 100));
});
