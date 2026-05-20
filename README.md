# Mall Vision AI Digital Twin

Course project for a mall visual AI digital-twin operations system.

## Current Status

Completed: P0, P1, P2, P3, P4-I1 through P4-I16.

Current deliverables include:

```text
frontend/ React + TypeScript + Vite demo
frontend/src/api/apiMode.ts
frontend/src/api/referenceClient.ts
frontend/src/api/referenceClient.test.ts
backend/ FastAPI app
backend/app/api/routes/health.py
backend/app/api/routes/reference.py
backend/app/api/routes/overview.py
backend/app/db/metadata.py
backend/migrations/ Alembic migration baseline
backend/tests/ health, migration, reference API, and overview API tests
docs/API_CONTRACT.md
docs/DATA_MODEL.md
docs/DEPLOYMENT_PLAN.md
docs/CP4_CLOSURE_REVIEW.md
docs/MYSQL_READINESS_PLAN.md
scripts/quality-gate.mjs
.github/workflows/ci.yml
```

P4-I6 added overview API coverage. P4-I7 through P4-I15 extended the typed frontend/backend contract for overview, store detail, store score, store flow, store ranking, store alerts, customer profile, heatmap, and anonymous aggregate trajectories. P4-I16 reviewed CP4 closure and documented MySQL readiness gates.

Current boundaries: no real MySQL connection, no `.env`, no `docker-compose.yml`, no `ai-services/`, no `infra/`, no real video, no real mall material, no face images, no personal trajectories.

## Checks

```bash
backend\.venv\Scripts\python.exe -m pytest backend\tests
npm run quality
npm run quality:audit
```

## Implemented APIs

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

## Next Step

Next increment: `P5-I1 API mode overview data loader contract`.

Recommended scope:

```text
add a frontend overview data loader or adapter that can choose mock or API mode
use existing getOverview(mallId), resolveFrontendDataMode, and resolveApiBaseUrl
keep mock mode as the default demo path
add tests for mock default, API success, API error handling, and no live network dependency
```

P5-I1 must not switch the default frontend mode to API, must not depend on a live backend in tests, and must not connect real MySQL.

Normal continuation command: `请进行下一步`.
