import { mockCustomerProfile } from '../mock/mockCustomerProfile.ts';
import { mockMall } from '../mock/mockMall.ts';
import { storeCategories } from '../mock/mockStores.ts';
import type { CustomerProfile, DataSource, StoreCategory } from '../types/index.ts';
import { resolveApiBaseUrl, resolveFrontendDataMode, type FrontendDataMode } from './apiMode.ts';
import {
  createReferenceApiClient,
  type CategoryPreferenceDto,
  type CustomerProfileDto,
  type ReferenceApiClient
} from './referenceClient.ts';

export type CustomerProfileDataSource = 'mock' | 'api';

export type CustomerProfileDataLoaderOptions = {
  mode?: string;
  apiBaseUrl?: string;
  mallId?: string;
  client?: Pick<ReferenceApiClient, 'getCustomerProfile'>;
  fetchImpl?: typeof fetch;
  requestIdFactory?: () => string;
};

export type CustomerProfileDataResult = {
  mode: FrontendDataMode;
  source: CustomerProfileDataSource;
  profile: CustomerProfile;
  traceId?: string;
  timestamp?: string;
};

const categoryByApiId: Record<string, StoreCategory> = {
  cat_food: storeCategories[0],
  cat_fashion: storeCategories[1],
  cat_entertainment: storeCategories[2],
  cat_parent_child: storeCategories[3],
  cat_lifestyle: storeCategories[4],
  cat_digital: storeCategories[5],
  cat_sports: storeCategories[6],
  cat_popup: storeCategories[7]
};

export async function loadCustomerProfileData(
  options: CustomerProfileDataLoaderOptions = {}
): Promise<CustomerProfileDataResult> {
  const mode = resolveFrontendDataMode(options.mode);

  if (mode === 'mock') {
    return {
      mode,
      source: 'mock',
      profile: mockCustomerProfile
    };
  }

  const client =
    options.client ??
    createReferenceApiClient({
      baseUrl: resolveApiBaseUrl(options.apiBaseUrl),
      fetchImpl: options.fetchImpl,
      requestIdFactory: options.requestIdFactory
    });
  const response = await client.getCustomerProfile(options.mallId ?? mockMall.id);

  return {
    mode,
    source: 'api',
    profile: mapCustomerProfileDtoToDomain(response.data),
    traceId: response.traceId,
    timestamp: response.timestamp
  };
}

export function mapCustomerProfileDtoToDomain(dto: CustomerProfileDto): CustomerProfile {
  return {
    mallId: dto.mallId,
    generatedAt: dto.generatedAt,
    source: normalizeDataSource(dto.source),
    activeTimeRange: dto.activeTimeRange,
    primaryFloorId: dto.primaryFloorId,
    topCategories: dto.topCategories.map(normalizeCategory),
    revisitTendency: normalizePercent(dto.revisitTendency),
    timeDistribution: dto.timeDistribution.map((bucket) => ({ ...bucket })),
    floorPreferences: dto.floorPreferences.map((preference) => ({ ...preference })),
    categoryPreferences: dto.categoryPreferences.map(mapCategoryPreference),
    privacyNote: dto.privacyNote
  };
}

function mapCategoryPreference(preference: CategoryPreferenceDto) {
  return {
    category: normalizeCategory(preference.category),
    trafficShare: preference.trafficShare,
    dwellShare: preference.dwellShare,
    conversionRate: normalizePercent(preference.conversionRate)
  };
}

function normalizeCategory(category: string): StoreCategory {
  return categoryByApiId[category] ?? storeCategories[4];
}

function normalizeDataSource(source: string): DataSource {
  if (source === 'mock' || source === 'api' || source === 'replay') {
    return source;
  }

  return 'api';
}

function normalizePercent(value: number): number {
  if (value >= 0 && value <= 1) {
    return Number((value * 100).toFixed(1));
  }

  return value;
}
