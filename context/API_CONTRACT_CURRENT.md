# API Contract Current

Updated: 2026-05-20

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

## Not Implemented

```text
auth/RBAC enforcement
store alert detail/update APIs
real MySQL queries
committed OpenAPI artifact
```

## Next Step

P5-I3 should add a Store Analysis API-mode loader contract using existing typed client methods while keeping mock mode as the default and avoiding live backend dependencies in tests.
