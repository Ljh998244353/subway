import {
  loadCustomerProfileData,
  type CustomerProfileDataLoaderOptions,
  type CustomerProfileDataResult
} from '../api/customerProfileDataLoader.ts';
import { mockCustomerProfile } from '../mock/mockCustomerProfile.ts';

export type CustomerProfileDataStatus = 'ready' | 'loading' | 'error';

export type CustomerProfileDataState = {
  status: CustomerProfileDataStatus;
  result: CustomerProfileDataResult;
  errorMessage?: string;
};

export type CustomerProfileDataStateOptions = CustomerProfileDataLoaderOptions & {
  loader?: (options: CustomerProfileDataLoaderOptions) => Promise<CustomerProfileDataResult>;
};

export function createInitialCustomerProfileDataState(): CustomerProfileDataState {
  return {
    status: 'ready',
    result: {
      mode: 'mock',
      source: 'mock',
      profile: mockCustomerProfile
    }
  };
}

export async function resolveCustomerProfileDataState(
  options: CustomerProfileDataStateOptions = {}
): Promise<CustomerProfileDataState> {
  const { loader = loadCustomerProfileData, ...loaderOptions } = options;

  try {
    return {
      status: 'ready',
      result: await loader(loaderOptions)
    };
  } catch (error) {
    return {
      ...createInitialCustomerProfileDataState(),
      status: 'error',
      errorMessage: error instanceof Error ? error.message : 'Customer profile API request failed'
    };
  }
}
