import assert from 'node:assert/strict';
import test from 'node:test';
import { assertNoBlockedAdviceFields, generateStoreManagementAdvice } from '../src/lib/store-management-advice.ts';
import type { AlertEvent, StoreMetric } from '../src/types/index.ts';

const baseStore: StoreMetric = {
  id: 'S900',
  name: 'Synthetic Test Store',
  floorId: 'F1',
  category: 'Retail',
  grade: 'A',
  liveOccupancy: 18,
  entryRate: 38,
  avgDwellTime: 18,
  hasWarning: false,
  score: 82,
  x: 20,
  y: 20
};

function store(overrides: Partial<StoreMetric>): StoreMetric {
  return { ...baseStore, ...overrides };
}

test('low-score stores receive high-priority conversion advice', () => {
  const advice = generateStoreManagementAdvice({ stores: [store({ id: 'S901', grade: 'C-', score: 55 })], alerts: [] });
  assert.equal(advice[0]?.priority, 'high');
  assert.equal(advice[0]?.category, 'conversion');
  assert.match(advice[0]?.title ?? '', /低分店铺/);
});

test('warning stores receive alert handling advice', () => {
  const alerts: AlertEvent[] = [
    {
      id: 'EVT-TEST',
      timestamp: '2026-06-09 10:00',
      level: 'critical',
      area: 'F1-S902',
      message: 'Synthetic alert',
      isResolved: false,
      storeId: 'S902',
      floorId: 'F1',
      action: 'dispatch'
    }
  ];
  const advice = generateStoreManagementAdvice({ stores: [store({ id: 'S902', hasWarning: true })], alerts, state: { mode: 'alerts', scenarioDensity: 'peak', incidentLevel: 3 } });
  assert.equal(advice[0]?.priority, 'high');
  assert.equal(advice[0]?.category, 'alert');
});

test('low entry rate stores receive traffic advice', () => {
  const advice = generateStoreManagementAdvice({ stores: [store({ id: 'S903', entryRate: 12 })], alerts: [], state: { mode: 'flow', scenarioDensity: 'surge', incidentLevel: 0 } });
  assert.equal(advice[0]?.category, 'traffic');
  assert.equal(advice[0]?.priority, 'high');
});

test('high-performing stores receive reusable category operations advice', () => {
  const advice = generateStoreManagementAdvice({ stores: [store({ id: 'S904', score: 92, grade: 'A+' })], alerts: [] });
  assert.equal(advice[0]?.category, 'category_ops');
  assert.equal(advice[0]?.priority, 'low');
});

test('rule advice does not contain blocked real-data fields', () => {
  const advice = generateStoreManagementAdvice({ stores: [store({ id: 'S905', grade: 'C-', score: 50, entryRate: 10, avgDwellTime: 8, hasWarning: true })], alerts: [] });
  assert.deepEqual(assertNoBlockedAdviceFields(advice), []);
});
