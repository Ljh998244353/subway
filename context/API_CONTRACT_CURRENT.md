# API Contract Current

Updated: 2026-06-01

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
GET /api/v1/stores/ranking?mallId=mall_demo_001&floorId=floor_demo_l1&categoryId=cat_food&grade=B&minScore=70&maxScore=80&limit=10
GET /api/v1/alerts/stores?mallId=mall_demo_001
GET /api/v1/customer-profile?mallId=mall_demo_001
GET /api/v1/heatmap?mallId=mall_demo_001
GET /api/v1/trajectories?mallId=mall_demo_001
GET /api/v1/overview?mallId=mall_demo_001`nPOST /api/v1/advice/store-management
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

P5-I11 reviewed and closed CP5 frontend API-mode integration coverage in `docs/CP5_CLOSURE_REVIEW.md`. P6-I1 documented AI event schema. P6-I2 implemented a local synthetic AI service. P6-R1 reprioritized the next API direction toward synthetic 3D demo controls and fake-data persistence. P8-I2 refined the store score contract so `GET /api/v1/stores/{storeId}/score` returns deterministic synthetic aggregate scoring metadata: `source`, `formulaVersion`, `weights`, `inputs`, bounded score, grade, breakdown, and explanations. P8-I3 added fixture-backed ranking filters for `floorId`, `categoryId`, `grade`, `minScore`, `maxScore`, and `limit`, with filtered rankings re-ranked from `1`.

P9 completed the frontend synthetic analytics cockpit without adding API contracts. The analytics snapshot consumes existing synthetic/mock aggregates and frontend URL/store state only.

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
real-data adapter APIs`nreal LLM calls by default; LLM proxy remains disabled until backend/.env is configured
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
store score MVP source is currently synthetic_event_aggregate and formulaVersion synthetic-score-v1
store ranking filters are synthetic fixture filters only; invalid score ranges return INVALID_SCORE_RANGE
real-data adapter endpoints are deferred
real video/camera/BIM/floor-plan/brand material must not be required for the 3D demo
API responses must keep stable IDs and ISO 8601 timestamps
fake event generation must be idempotent where applicable
```

## Next Step

P10-I1 added `POST /api/v1/advice/store-management` as a backend-only OpenAI-compatible LLM proxy placeholder. It validates synthetic aggregate advice inputs, blocks real-data keys, and returns disabled/fallback rule advice unless local backend LLM environment variables are configured.
