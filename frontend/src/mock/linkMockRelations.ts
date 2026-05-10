import type { Store, StoreAlert } from '../types/index.ts';

export function attachAlertIdsToStores(stores: Store[], alerts: StoreAlert[]) {
  const alertIdsByStoreId = new Map<string, string[]>();

  alerts.forEach((alert) => {
    if (!alert.storeId) {
      return;
    }

    const current = alertIdsByStoreId.get(alert.storeId) ?? [];
    current.push(alert.id);
    alertIdsByStoreId.set(alert.storeId, current);
  });

  return stores.map((store) => ({
    ...store,
    alertIds: alertIdsByStoreId.get(store.id) ?? []
  }));
}
