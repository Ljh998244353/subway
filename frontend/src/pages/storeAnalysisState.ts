import {
  loadStoreAnalysisData,
  type StoreAnalysisDataLoaderOptions,
  type StoreAnalysisDataResult
} from '../api/storeAnalysisDataLoader.ts';
import { mockStoresWithAlerts } from '../mock/index.ts';

export type StoreAnalysisDataStatus = 'ready' | 'loading' | 'error';

export type StoreAnalysisDataState = {
  status: StoreAnalysisDataStatus;
  result: StoreAnalysisDataResult;
  errorMessage?: string;
};

export type StoreAnalysisDataStateOptions = StoreAnalysisDataLoaderOptions & {
  loader?: (options: StoreAnalysisDataLoaderOptions) => Promise<StoreAnalysisDataResult>;
};

export function createInitialStoreAnalysisDataState(selectedStoreId?: string): StoreAnalysisDataState {
  return {
    status: 'ready',
    result: {
      mode: 'mock',
      source: 'mock',
      stores: mockStoresWithAlerts,
      selectedStoreId,
      traceIds: []
    }
  };
}

export async function resolveStoreAnalysisDataState(
  options: StoreAnalysisDataStateOptions = {}
): Promise<StoreAnalysisDataState> {
  const { loader = loadStoreAnalysisData, ...loaderOptions } = options;

  try {
    return {
      status: 'ready',
      result: await loader(loaderOptions)
    };
  } catch (error) {
    return {
      ...createInitialStoreAnalysisDataState(options.selectedStoreId),
      status: 'error',
      errorMessage: error instanceof Error ? error.message : 'Store analysis API request failed'
    };
  }
}
