# Test State

Updated: 2026-05-20

## Current Status

P5-I3 added executable frontend tests for the Store Analysis data loader contract:

```text
frontend/src/api/storeAnalysisDataLoader.test.ts
frontend/src/api/storeAnalysisDataLoader.ts
frontend/src/api/overviewDataLoader.test.ts
frontend/src/pages/DashboardPage.test.ts
frontend/src/pages/dashboardOverviewState.ts
backend/tests/test_health.py
backend/tests/test_migrations.py
backend/tests/test_reference_api.py
backend/tests/test_overview_api.py
```

Latest local P5-I3 frontend result:

```text
npm --prefix frontend run test: 93 passed
```

P5-I3 test coverage includes:

```text
store-analysis loader defaults to mock data and does not touch API client
explicit API mode loads ranking plus store detail, score, and flow through injected client
selected store is preserved even when outside ranking limit
API base URL and store/mall IDs are encoded through mocked fetch
API Store/Score/Flow DTOs map into frontend Store domain objects
typed ApiClientError propagates without live backend dependency
```

## Required Final Checks

```bash
npm --prefix frontend run test
npm run quality
npm run quality:audit
```

Final P5-I3 result:

```text
npm --prefix frontend run test: 93 passed
npm run quality: passed
npm run quality:audit: found 0 vulnerabilities
```

Vite still prints React Router/Motion `"use client"` warnings during build; these are existing non-blocking dependency warnings.

## Known Gaps

```text
StoreAnalysisPage is not yet wired to the loader state boundary
no real MySQL migration execution test
no live frontend/backend browser integration test
no browser E2E
no backend coverage report
no AI validation tests
no Docker Compose startup test
```
