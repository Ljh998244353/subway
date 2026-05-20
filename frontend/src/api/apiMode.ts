export type FrontendDataMode = 'mock' | 'api';

export const DEFAULT_DATA_MODE: FrontendDataMode = 'mock';
export const DEFAULT_API_BASE_URL = 'http://127.0.0.1:8000';

export function resolveFrontendDataMode(value: string | undefined): FrontendDataMode {
  return value === 'api' ? 'api' : DEFAULT_DATA_MODE;
}

export function resolveApiBaseUrl(value: string | undefined): string {
  const trimmed = value?.trim();
  if (!trimmed) {
    return DEFAULT_API_BASE_URL;
  }
  return trimmed.replace(/\/+$/, '');
}
