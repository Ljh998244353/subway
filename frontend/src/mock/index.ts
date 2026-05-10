import { mockAlerts } from './mockAlerts.ts';
import { mockStores } from './mockStores.ts';
import { attachAlertIdsToStores } from './linkMockRelations.ts';

export { mockAlertById, mockAlerts } from './mockAlerts.ts';
export { mockCustomerProfile } from './mockCustomerProfile.ts';
export { mockFloors } from './mockFloors.ts';
export { mockMall } from './mockMall.ts';
export {
  mockFloorSummaries,
  mockFlowEdges,
  mockHeatmapPoints,
  mockOverview
} from './mockOverview.ts';
export { getScoreLevel, mockStoreById, mockStores, storeCategories } from './mockStores.ts';

export const mockStoresWithAlerts = attachAlertIdsToStores(mockStores, mockAlerts);
