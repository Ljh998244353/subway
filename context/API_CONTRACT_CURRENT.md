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

P5-I11 reviewed and closed CP5 frontend API-mode integration coverage in `docs/CP5_CLOSURE_REVIEW.md`. P6-I1 documented AI event schema. P6-I2 implemented a local synthetic AI service. P6-R1 reprioritized the next API direction toward synthetic 3D demo controls and fake-data persistence.

## Not Implemented

```text
auth/RBAC enforcement
store alert detail/update APIs
real MySQL queries
committed OpenAPI artifact
synthetic scenario control APIs
persisted fake-event generation APIs
3D scene layout read API
replay frame API
real-data adapter APIs
```

## P7 Synthetic 3D Demo API Direction

Future P7 API work should stay under `/api/v1` and preserve the current mock/API-mode boundary. Candidate contracts for later increments:

```text
GET /api/v1/twin/scene?mallId=...
GET /api/v1/twin/scenarios?mallId=...
POST /api/v1/twin/scenarios/{scenarioId}/seed
POST /api/v1/twin/scenarios/{scenarioId}/reset
POST /api/v1/twin/scenarios/{scenarioId}/generate
POST /api/v1/twin/scenarios/{scenarioId}/events
PATCH /api/v1/twin/scenarios/{scenarioId}/controls
GET /api/v1/twin/scenarios/{scenarioId}/replay
GET /api/v1/twin/scenarios/{scenarioId}/heatmap
GET /api/v1/twin/scenarios/{scenarioId}/agent-counts
```

These endpoints are not implemented yet. They should be designed in a later architecture/API increment before backend code is changed.

## Contract Boundaries

```text
synthetic demo APIs must be clearly labeled synthetic/demo-only
real-data adapter endpoints are deferred
real video/camera/BIM/floor-plan/brand material must not be required for the 3D demo
API responses must keep stable IDs and ISO 8601 timestamps
fake event generation must be idempotent where applicable
```

## Next Step

P7-I3 should focus on a minimal audited frontend WebGL/Three.js scene shell. Do not add API endpoints in P7-I3 unless the task card is changed.
