import type { TwinMode } from '../types/index.ts';
import { buildRouteWithGlobalQuery } from './routeConfig.ts';

type OptionalRouteParams = Record<string, string | undefined>;

export type DigitalTwinRouteParams = {
  floorId?: string;
  mode?: TwinMode;
  storeId?: string;
  alertId?: string;
};

export type StoreAnalysisRouteParams = {
  storeId?: string;
  alertId?: string;
  category?: string;
};

export type StoreAlertsRouteParams = {
  alertId?: string;
  storeId?: string;
  floorId?: string;
};

export type DemoFlowStepId = 'dashboard' | 'digital-twin' | 'store-analysis' | 'store-alerts' | 'customer-profile';

export type DemoCoreFlowSeed = {
  floorId: string;
  storeId: string;
  alertId?: string;
};

export type DemoCustomerProfileFlowSeed = {
  floorId: string;
  category: string;
};

export type DemoCoreFlowStep = {
  id: DemoFlowStepId;
  label: string;
  path: string;
};

function buildPath(pathname: string, params?: OptionalRouteParams) {
  const searchParams = new URLSearchParams();

  Object.entries(params ?? {}).forEach(([key, value]) => {
    if (value) {
      searchParams.set(key, value);
    }
  });

  const query = searchParams.toString();
  return query ? `${pathname}?${query}` : pathname;
}

export function buildDashboardUrl(search: string) {
  return buildRouteWithGlobalQuery('/dashboard', search);
}

export function buildCustomerProfileUrl(search: string) {
  return buildRouteWithGlobalQuery('/customer-profile', search);
}

export function buildDigitalTwinUrl(params: DigitalTwinRouteParams, search: string) {
  return buildRouteWithGlobalQuery(
    buildPath('/digital-twin', {
      floorId: params.floorId,
      mode: params.mode,
      storeId: params.storeId,
      alertId: params.alertId
    }),
    search
  );
}

export function buildDashboardFloorTwinUrl(floorId: string, search: string) {
  return buildDigitalTwinUrl({ floorId, mode: 'heatmap' }, search);
}

export function buildCustomerProfileFloorTwinUrl(floorId: string, search: string) {
  return buildDigitalTwinUrl({ floorId, mode: 'flow' }, search);
}

export function buildStoreScoreTwinUrl(params: Pick<DigitalTwinRouteParams, 'floorId' | 'storeId'>, search: string) {
  return buildDigitalTwinUrl(
    {
      floorId: params.floorId,
      mode: 'score',
      storeId: params.storeId
    },
    search
  );
}

export function buildAlertTwinUrl(params: Omit<DigitalTwinRouteParams, 'mode'>, search: string) {
  return buildDigitalTwinUrl(
    {
      floorId: params.floorId,
      mode: 'alerts',
      storeId: params.storeId,
      alertId: params.alertId
    },
    search
  );
}

export function buildStoreAnalysisUrl(params: StoreAnalysisRouteParams, search: string) {
  return buildRouteWithGlobalQuery(
    buildPath('/store-analysis', {
      storeId: params.storeId,
      alertId: params.alertId,
      category: params.category
    }),
    search
  );
}

export function buildCustomerProfileCategoryUrl(category: string, search: string) {
  return buildStoreAnalysisUrl({ category }, search);
}

export function buildStoreAlertsUrl(params: StoreAlertsRouteParams, search: string) {
  return buildRouteWithGlobalQuery(
    buildPath('/store-alerts', {
      alertId: params.alertId,
      storeId: params.storeId,
      floorId: params.floorId
    }),
    search
  );
}

export function buildDemoCoreFlow(seed: DemoCoreFlowSeed, search: string): DemoCoreFlowStep[] {
  return [
    {
      id: 'dashboard',
      label: '运营总览',
      path: buildDashboardUrl(search)
    },
    {
      id: 'digital-twin',
      label: '数字孪生',
      path: buildDashboardFloorTwinUrl(seed.floorId, search)
    },
    {
      id: 'store-analysis',
      label: '店铺分析',
      path: buildStoreAnalysisUrl({ storeId: seed.storeId }, search)
    },
    {
      id: 'store-alerts',
      label: '低效预警',
      path: buildStoreAlertsUrl({ alertId: seed.alertId, storeId: seed.storeId, floorId: seed.floorId }, search)
    }
  ];
}

export function buildDemoCustomerProfileFlow(seed: DemoCustomerProfileFlowSeed, search: string): DemoCoreFlowStep[] {
  return [
    {
      id: 'customer-profile',
      label: '客群画像',
      path: buildCustomerProfileUrl(search)
    },
    {
      id: 'digital-twin',
      label: '数字孪生动线',
      path: buildCustomerProfileFloorTwinUrl(seed.floorId, search)
    },
    {
      id: 'store-analysis',
      label: '业态店铺分析',
      path: buildCustomerProfileCategoryUrl(seed.category, search)
    }
  ];
}
