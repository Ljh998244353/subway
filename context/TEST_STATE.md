# Test State

Updated: 2026-05-20

## Current Status

P5-I4 added executable frontend tests for StoreAnalysisPage data state wiring:

```text
frontend/src/pages/storeAnalysisState.ts
frontend/src/pages/StoreAnalysisPage.test.ts
frontend/src/api/storeAnalysisDataLoader.test.ts
frontend/src/api/storeAnalysisDataLoader.ts
frontend/src/api/overviewDataLoader.test.ts
frontend/src/pages/DashboardPage.test.ts
backend/tests/test_health.py
backend/tests/test_migrations.py
backend/tests/test_reference_api.py
backend/tests/test_overview_api.py
```

Latest local P5-I4 frontend result:

```text
npm --prefix frontend run test: 96 passed
```

P5-I4 test coverage includes:

```text
StoreAnalysisPage state starts in mock mode
explicit API mode forwards mallId, selectedStoreId, and apiBaseUrl to the injected loader
API loader failure falls back to mock store-analysis state
Store Analysis loader tests still cover mock default, API success, URL boundaries, DTO mapping, and typed errors
```

## Required Final Checks

```bash
npm --prefix frontend run test
npm run quality
npm run quality:audit
```

Final P5-I4 result:

```text
npm --prefix frontend run test: 96 passed
npm run quality: passed
npm run quality:audit: found 0 vulnerabilities
```

Vite still prints React Router/Motion `"use client"` warnings during build; these are existing non-blocking dependency warnings.

## Known Gaps

```text
StoreAlertsPage is not yet covered by an API-mode loader contract
no real MySQL migration execution test
no live frontend/backend browser integration test
no browser E2E
no backend coverage report
no AI validation tests
no Docker Compose startup test
```
