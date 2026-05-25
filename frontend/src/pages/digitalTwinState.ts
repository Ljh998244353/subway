import {
  loadDigitalTwinData,
  type DigitalTwinDataLoaderOptions,
  type DigitalTwinDataResult
} from '../api/digitalTwinDataLoader.ts';
import { mockFlowEdges, mockHeatmapPoints } from '../mock/index.ts';

export type DigitalTwinDataStatus = 'ready' | 'loading' | 'error';

export type DigitalTwinDataState = {
  status: DigitalTwinDataStatus;
  result: DigitalTwinDataResult;
  errorMessage?: string;
};

export type DigitalTwinDataStateOptions = DigitalTwinDataLoaderOptions & {
  loader?: (options: DigitalTwinDataLoaderOptions) => Promise<DigitalTwinDataResult>;
};

export function createInitialDigitalTwinDataState(): DigitalTwinDataState {
  return {
    status: 'ready',
    result: {
      mode: 'mock',
      source: 'mock',
      heatmapPoints: mockHeatmapPoints,
      flowEdges: mockFlowEdges,
      traceIds: []
    }
  };
}

export async function resolveDigitalTwinDataState(
  options: DigitalTwinDataStateOptions = {}
): Promise<DigitalTwinDataState> {
  const { loader = loadDigitalTwinData, ...loaderOptions } = options;

  try {
    return {
      status: 'ready',
      result: await loader(loaderOptions)
    };
  } catch (error) {
    return {
      ...createInitialDigitalTwinDataState(),
      status: 'error',
      errorMessage: error instanceof Error ? error.message : 'Digital twin API request failed'
    };
  }
}
