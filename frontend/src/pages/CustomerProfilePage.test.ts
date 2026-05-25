import assert from 'node:assert/strict';
import test from 'node:test';
import type { CustomerProfileDataResult } from '../api/customerProfileDataLoader.ts';
import { mockCustomerProfile, mockFloors } from '../mock/index.ts';
import {
  buildCustomerProfileCategoryUrl,
  buildCustomerProfileFloorTwinUrl
} from '../routes/demoFlow.ts';
import type { CustomerProfile } from '../types/index.ts';
import { buildCustomerProfileViewModel, getCustomerProfileState } from './customerProfileModel.ts';
import { createInitialCustomerProfileDataState, resolveCustomerProfileDataState } from './customerProfileState.ts';

const viewModel = buildCustomerProfileViewModel(mockCustomerProfile, mockFloors);

function getParams(path: string) {
  const [, search = ''] = path.split('?');
  return new URLSearchParams(search);
}

test('builds customer profile summary from anonymous aggregate mock data', () => {
  assert.equal(viewModel.summaryMetrics.length, 4);
  assert.equal(viewModel.hasData, true);
  assert.equal(getCustomerProfileState(viewModel), 'normal');
  assert.ok(viewModel.peakTime);
  assert.ok(viewModel.primaryFloor);
  assert.ok(viewModel.topCategory);
  assert.ok(viewModel.filterSummary.includes('数据源：Mock'));
  assert.ok(viewModel.filterSummary.includes('边界：匿名聚合'));
});

test('can label customer profile view model as API data without changing defaults', () => {
  const apiViewModel = buildCustomerProfileViewModel(mockCustomerProfile, mockFloors, {
    dataSourceLabel: 'API'
  });

  assert.ok(viewModel.filterSummary.includes('数据源：Mock'));
  assert.ok(apiViewModel.filterSummary.includes('数据源：API'));
});

test('sorts and filters floor and category preference rows', () => {
  const sortedTraffic = viewModel.floorPreferences.map((row) => row.trafficShare);
  assert.deepEqual(sortedTraffic, [...sortedTraffic].sort((left, right) => right - left));

  const selectedFloor = buildCustomerProfileViewModel(mockCustomerProfile, mockFloors, { floorId: 'F2' });
  assert.equal(selectedFloor.floorPreferences.length, 1);
  assert.equal(selectedFloor.floorPreferences[0].floorId, 'F2');

  const selectedCategory = buildCustomerProfileViewModel(mockCustomerProfile, mockFloors, { category: '餐饮' });
  assert.equal(selectedCategory.categoryPreferences.length, 1);
  assert.equal(selectedCategory.categoryPreferences[0].category, '餐饮');
});

test('keeps privacy wording explicit and blocks personal profile concepts', () => {
  const privacyText = viewModel.privacyBoundaries.map((boundary) => boundary.description).join(' ');

  assert.match(privacyText, /匿名聚合/);
  assert.match(privacyText, /会员 ID/);
  assert.match(privacyText, /人脸/);
  assert.match(privacyText, /个人轨迹/);
  assert.match(mockCustomerProfile.privacyNote, /匿名聚合/);
  assert.doesNotMatch(privacyText, /手机号采集|单人路径回放|个人级画像明细/);
});

test('builds customer profile drill-down links with global query context', () => {
  const floorPath = buildCustomerProfileFloorTwinUrl('F2', '?mallId=M_DEMO&timeRange=30d&category=餐饮');
  const floorParams = getParams(floorPath);

  assert.equal(floorPath.split('?')[0], '/digital-twin');
  assert.equal(floorParams.get('floorId'), 'F2');
  assert.equal(floorParams.get('mode'), 'flow');
  assert.equal(floorParams.get('mallId'), 'M_DEMO');
  assert.equal(floorParams.get('timeRange'), '30d');
  assert.equal(floorParams.get('category'), null);

  const categoryPath = buildCustomerProfileCategoryUrl('餐饮', '?mallId=M_DEMO&timeRange=7d&floorId=F2');
  const categoryParams = getParams(categoryPath);

  assert.equal(categoryPath.split('?')[0], '/store-analysis');
  assert.equal(categoryParams.get('category'), '餐饮');
  assert.equal(categoryParams.get('mallId'), 'M_DEMO');
  assert.equal(categoryParams.get('timeRange'), '7d');
  assert.equal(categoryParams.get('floorId'), null);
});

test('returns empty or partial states without exposing small-sample details', () => {
  const emptyProfile: CustomerProfile = {
    ...mockCustomerProfile,
    timeDistribution: [],
    floorPreferences: [],
    categoryPreferences: []
  };
  const emptyViewModel = buildCustomerProfileViewModel(emptyProfile, mockFloors);
  assert.equal(getCustomerProfileState(emptyViewModel), 'empty');
  assert.equal(emptyViewModel.hasData, false);

  const smallSampleProfile: CustomerProfile = {
    ...mockCustomerProfile,
    timeDistribution: mockCustomerProfile.timeDistribution.slice(0, 2)
  };
  const smallSampleViewModel = buildCustomerProfileViewModel(smallSampleProfile, mockFloors);
  assert.equal(getCustomerProfileState(smallSampleViewModel), 'partial');
  assert.equal(smallSampleViewModel.smallSampleHidden, true);
  assert.ok(
    smallSampleViewModel.summaryMetrics.some((metric) => metric.description.includes('小样本将隐藏明细'))
  );
});

test('customer profile data state starts with mock mode without API data', () => {
  const state = createInitialCustomerProfileDataState();

  assert.equal(state.status, 'ready');
  assert.equal(state.result.mode, 'mock');
  assert.equal(state.result.source, 'mock');
  assert.equal(state.result.profile, mockCustomerProfile);
});

test('customer profile data state forwards explicit API mode to loader', async () => {
  const apiResult: CustomerProfileDataResult = {
    mode: 'api',
    source: 'api',
    profile: {
      ...mockCustomerProfile,
      source: 'api',
      mallId: 'mall demo/001'
    },
    traceId: 'req_customer_profile_state',
    timestamp: '2026-05-25T08:30:00Z'
  };
  const calls: unknown[] = [];

  const state = await resolveCustomerProfileDataState({
    mode: 'api',
    mallId: 'mall demo/001',
    apiBaseUrl: 'http://backend.test',
    loader: async (options) => {
      calls.push(options);
      return apiResult;
    }
  });

  assert.deepEqual(calls, [
    {
      mode: 'api',
      mallId: 'mall demo/001',
      apiBaseUrl: 'http://backend.test'
    }
  ]);
  assert.equal(state.status, 'ready');
  assert.equal(state.result.source, 'api');
  assert.equal(state.result.profile.mallId, 'mall demo/001');
  assert.equal(state.result.traceId, 'req_customer_profile_state');
});

test('customer profile API result can drive the existing profile view model', async () => {
  const apiProfile: CustomerProfile = {
    ...mockCustomerProfile,
    source: 'api',
    topCategories: ['餐饮'],
    categoryPreferences: [mockCustomerProfile.categoryPreferences[0]],
    floorPreferences: mockCustomerProfile.floorPreferences.slice(0, 2)
  };
  const state = await resolveCustomerProfileDataState({
    mode: 'api',
    loader: async () => ({
      mode: 'api',
      source: 'api',
      profile: apiProfile,
      traceId: 'req_customer_profile_state'
    })
  });
  const apiViewModel = buildCustomerProfileViewModel(state.result.profile, mockFloors, {
    category: '餐饮',
    dataSourceLabel: 'API'
  });

  assert.equal(state.result.source, 'api');
  assert.equal(apiViewModel.categoryPreferences.length, 1);
  assert.equal(apiViewModel.topCategory?.category, '餐饮');
  assert.ok(apiViewModel.filterSummary.includes('数据源：API'));
});

test('customer profile data state falls back to mock on API loader failure', async () => {
  const state = await resolveCustomerProfileDataState({
    mode: 'api',
    loader: async () => {
      throw new Error('customer profile backend unavailable');
    }
  });

  assert.equal(state.status, 'error');
  assert.equal(state.result.mode, 'mock');
  assert.equal(state.result.source, 'mock');
  assert.equal(state.result.profile, mockCustomerProfile);
  assert.equal(state.errorMessage, 'customer profile backend unavailable');
});
