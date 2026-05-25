# API Contract Current

Updated: 2026-05-25

## Current Status

Implemented backend endpoints:

```text
GET /api/v1/health
GET /api/v1/malls
GET /api/v1/malls/{mallId}/floors
GET /api/v1/floors/{floorId}/stores
GET /api/v1/stores/{storeId}
GET /api/v1/stores/{storeId}/score
GET /api/v1/stores/{storeId}/flow
GET /api/v1/stores/ranking?mallId=mall_demo_001
GET /api/v1/alerts/stores?mallId=mall_demo_001
GET /api/v1/customer-profile?mallId=mall_demo_001
GET /api/v1/heatmap?mallId=mall_demo_001
GET /api/v1/trajectories?mallId=mall_demo_001
GET /api/v1/overview?mallId=mall_demo_001
```

Implemented frontend client methods:

```text
listMalls
listFloors
listStores
getStore
getStoreScore
getStoreFlow
getStoreRanking
listStoreAlerts
getCustomerProfile
getHeatmap
getTrajectories
getOverview
```

P4-I16 reviewed CP4 coverage and confirmed the synthetic API/client contract baseline can move to P5. Unknown mall read requests return `MALL_NOT_FOUND`; unknown store read requests return `STORE_NOT_FOUND`; validation failures use `VALIDATION_ERROR`.

P5-I1 added `frontend/src/api/overviewDataLoader.ts`, which consumes `getOverview(mallId)` only when API mode is explicitly selected. Mock mode remains the default frontend path.

P5-I2 wired DashboardPage state to the overview loader. The page can use API mode only when explicitly requested and falls back to mock state on loader failure.

P5-I3 added `frontend/src/api/storeAnalysisDataLoader.ts`, which consumes `getStoreRanking(mallId)`, `getStore(storeId)`, `getStoreScore(storeId)`, and `getStoreFlow(storeId)` only when API mode is explicitly selected. Mock mode remains the default frontend path.

P5-I4 wired StoreAnalysisPage state to the Store Analysis loader. The page can use API mode only when explicitly requested and falls back to mock state on loader failure.

P5-I5 added `frontend/src/api/storeAlertsDataLoader.ts`, which consumes `listStoreAlerts(mallId)` and `getStore(storeId)` only when API mode is explicitly selected. Mock mode remains the default frontend path.

P5-I6 wired StoreAlertsPage state to the Store Alerts loader. The page can use API mode only when explicitly requested and falls back to mock state on loader failure.

P5-I7 added `frontend/src/api/customerProfileDataLoader.ts`, which consumes `getCustomerProfile(mallId)` only when API mode is explicitly selected. Mock mode remains the default frontend path.

P5-I8 wired CustomerProfilePage state to the Customer Profile loader. The page can use API mode only when explicitly requested and falls back to mock state on loader failure.

P5-I9 added `frontend/src/api/digitalTwinDataLoader.ts`, which consumes `getHeatmap(mallId)` and `getTrajectories(mallId)` only when API mode is explicitly selected. Mock mode remains the default frontend path.

P5-I10 wired DigitalTwinPage state to the Digital Twin loader. The page can use API mode only when explicitly requested and falls back to mock state on loader failure.

P5-I11 reviewed and closed CP5 frontend API-mode integration coverage in `docs/CP5_CLOSURE_REVIEW.md`. No API endpoint was added or changed.

## Not Implemented

```text
auth/RBAC enforcement
store alert detail/update APIs
real MySQL queries
committed OpenAPI artifact
```

## Next Step

P6-I1 may define a future AI event output schema in documentation only. It must not add backend endpoints, create AI services, connect real MySQL, or require live backend dependencies in tests.
