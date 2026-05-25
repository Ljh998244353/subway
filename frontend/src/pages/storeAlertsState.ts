import {
  loadStoreAlertsData,
  type StoreAlertsDataLoaderOptions,
  type StoreAlertsDataResult
} from '../api/storeAlertsDataLoader.ts';
import { mockAlerts, mockFloors, mockStoresWithAlerts } from '../mock/index.ts';

export type StoreAlertsDataStatus = 'ready' | 'loading' | 'error';

export type StoreAlertsDataState = {
  status: StoreAlertsDataStatus;
  result: StoreAlertsDataResult;
  errorMessage?: string;
};

export type StoreAlertsDataStateOptions = StoreAlertsDataLoaderOptions & {
  loader?: (options: StoreAlertsDataLoaderOptions) => Promise<StoreAlertsDataResult>;
};

export function createInitialStoreAlertsDataState(): StoreAlertsDataState {
  return {
    status: 'ready',
    result: {
      mode: 'mock',
      source: 'mock',
      alerts: mockAlerts,
      floors: mockFloors,
      stores: mockStoresWithAlerts,
      traceIds: []
    }
  };
}

export async function resolveStoreAlertsDataState(
  options: StoreAlertsDataStateOptions = {}
): Promise<StoreAlertsDataState> {
  const { loader = loadStoreAlertsData, ...loaderOptions } = options;

  try {
    return {
      status: 'ready',
      result: await loader(loaderOptions)
    };
  } catch (error) {
    return {
      ...createInitialStoreAlertsDataState(),
      status: 'error',
      errorMessage: error instanceof Error ? error.message : 'Store alerts API request failed'
    };
  }
}
