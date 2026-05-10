import type { Floor, FloorSummary, OverviewSnapshot, Store, StoreAlert, TrafficTrendPoint } from '../types/index.ts';

export type DashboardStoreRow = {
  id: string;
  name: string;
  floorId: string;
  floorName: string;
  category: string;
  score: number;
  level: Store['score']['level'];
  conversionRate: number;
  reason: string;
};

export type DashboardAlertRow = {
  id: string;
  title: string;
  level: StoreAlert['level'];
  status: StoreAlert['status'];
  floorId: string;
  floorName: string;
  storeId?: string;
  storeName: string;
  durationMinutes: number;
  suggestedAction: string;
};

export type DashboardViewModel = {
  metrics: OverviewSnapshot['metrics'];
  trafficTrend: TrafficTrendPoint[];
  floorSummaries: FloorSummary[];
  inefficientStores: DashboardStoreRow[];
  alerts: DashboardAlertRow[];
  busiestFloor?: FloorSummary;
  hasData: boolean;
};

export function buildDashboardViewModel(
  overview: OverviewSnapshot,
  stores: Store[],
  alerts: StoreAlert[],
  floors: Floor[]
): DashboardViewModel {
  const floorNameById = new Map(floors.map((floor) => [floor.id, floor.name]));
  const storeById = new Map(stores.map((store) => [store.id, store]));
  const alertById = new Map(alerts.map((alert) => [alert.id, alert]));
  const floorSummaries = [...overview.floorSummaries].sort((left, right) => right.crowdingIndex - left.crowdingIndex);

  const inefficientStores = overview.inefficientStoreIds
    .map((storeId) => storeById.get(storeId))
    .filter((store): store is Store => Boolean(store))
    .filter((store) => store.score.level === 'C' || store.score.level === 'D')
    .slice(0, 6)
    .map((store) => ({
      id: store.id,
      name: store.name,
      floorId: store.floorId,
      floorName: floorNameById.get(store.floorId) ?? store.floorId,
      category: store.category,
      score: store.score.score,
      level: store.score.level,
      conversionRate: store.conversionRate,
      reason: store.score.reasons[0] ?? '需要运营复核'
    }));

  const alertRows = overview.alertIds
    .map((alertId) => alertById.get(alertId))
    .filter((alert): alert is StoreAlert => Boolean(alert))
    .slice(0, 6)
    .map((alert) => {
      const store = alert.storeId ? storeById.get(alert.storeId) : undefined;

      return {
        id: alert.id,
        title: alert.title,
        level: alert.level,
        status: alert.status,
        floorId: alert.floorId,
        floorName: floorNameById.get(alert.floorId) ?? alert.floorId,
        storeId: alert.storeId,
        storeName: store?.name ?? '楼层公共区域',
        durationMinutes: alert.durationMinutes,
        suggestedAction: alert.suggestedAction
      };
    });

  return {
    metrics: overview.metrics,
    trafficTrend: overview.trafficTrend,
    floorSummaries,
    inefficientStores,
    alerts: alertRows,
    busiestFloor: floorSummaries[0],
    hasData: overview.metrics.length > 0 && overview.trafficTrend.length > 0
  };
}

export function getDashboardState(viewModel: DashboardViewModel) {
  if (!viewModel.hasData) {
    return 'empty';
  }

  if (viewModel.alerts.some((alert) => alert.level === 'high' && alert.status !== 'resolved')) {
    return 'danger';
  }

  if (viewModel.floorSummaries.some((floor) => floor.crowdingIndex >= 1)) {
    return 'warning';
  }

  return 'normal';
}
