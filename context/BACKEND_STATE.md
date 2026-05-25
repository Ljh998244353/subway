# Backend State

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

P4-I16 CP4 review confirms the backend is acceptable as a synthetic contract baseline for P5 API-mode frontend integration. P5-I1 through P5-I9 did not require backend changes; the frontend overview, Store Analysis, Store Alerts, Customer Profile, and Digital Twin integrations use existing `/api/v1` contracts.

## Constraints

```text
MySQL is source of truth later
current read APIs use synthetic fixture only
no real MySQL connection
no real video
no real mall material
no face images
no personal trajectories
no sudo
```

## Next Step

P5-I10 should not require backend changes unless DigitalTwinPage state wiring exposes a missing contract issue. Do not replace fixtures or add real MySQL queries.
