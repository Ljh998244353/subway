# Test State

Updated: 2026-05-20

## Current Status

P5-I2 added executable frontend tests for the dashboard overview state wiring:

```text
frontend/src/api/overviewDataLoader.test.ts
frontend/src/pages/DashboardPage.test.ts
frontend/src/pages/dashboardOverviewState.ts
frontend/src/api/referenceClient.test.ts
backend/tests/test_health.py
backend/tests/test_migrations.py
backend/tests/test_reference_api.py
backend/tests/test_overview_api.py
```

Latest local P5-I2 frontend result:

```text
npm --prefix frontend run test: 87 passed
```

P5-I2 test coverage includes:

```text
dashboard overview state starts in mock mode
explicit API mode forwards mallId/apiBaseUrl to the injected loader
API loader failure falls back to mock overview state
overview loader tests still cover mock default, API success, URL boundaries, and typed errors
```

## Required Final Checks

```bash
npm --prefix frontend run test
npm run quality
npm run quality:audit
```

Final P5-I2 result:

```text
npm --prefix frontend run test: 87 passed
npm run quality: passed
npm run quality:audit: found 0 vulnerabilities
```

Vite still prints React Router/Motion `"use client"` warnings during build; these are existing non-blocking dependency warnings.

## Known Gaps

```text
StoreAnalysisPage is not yet covered by an API-mode loader contract
no real MySQL migration execution test
no live frontend/backend browser integration test
no browser E2E
no backend coverage report
no AI validation tests
no Docker Compose startup test
```
