import { loadOverviewData, type OverviewDataLoaderOptions, type OverviewDataResult } from '../api/overviewDataLoader.ts';
import { mockOverview } from '../mock/mockOverview.ts';

export type DashboardOverviewStatus = 'ready' | 'loading' | 'error';

export type DashboardOverviewState = {
  status: DashboardOverviewStatus;
  result: OverviewDataResult;
  errorMessage?: string;
};

export type DashboardOverviewStateOptions = OverviewDataLoaderOptions & {
  loader?: (options: OverviewDataLoaderOptions) => Promise<OverviewDataResult>;
};

export function createInitialDashboardOverviewState(): DashboardOverviewState {
  return {
    status: 'ready',
    result: {
      mode: 'mock',
      source: 'mock',
      overview: mockOverview
    }
  };
}

export async function resolveDashboardOverviewState(options: DashboardOverviewStateOptions = {}): Promise<DashboardOverviewState> {
  const { loader = loadOverviewData, ...loaderOptions } = options;

  try {
    return {
      status: 'ready',
      result: await loader(loaderOptions)
    };
  } catch (error) {
    return {
      ...createInitialDashboardOverviewState(),
      status: 'error',
      errorMessage: error instanceof Error ? error.message : 'Overview API request failed'
    };
  }
}
