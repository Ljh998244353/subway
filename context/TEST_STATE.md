# Test State

Updated: 2026-05-20

## Current Status

P5-I1 added executable frontend tests for the overview data loader contract:

```text
frontend/src/api/overviewDataLoader.test.ts
frontend/src/api/referenceClient.test.ts
backend/tests/test_health.py
backend/tests/test_migrations.py
backend/tests/test_reference_api.py
backend/tests/test_overview_api.py
```

Latest local P5-I1 frontend result:

```text
npm --prefix frontend run test: 84 passed
```

P5-I1 test coverage includes:

```text
mock mode is default and does not touch the API client
non-api mode resolves back to mock mode
API mode can load overview through an injected client
API mode normalizes base URL and encodes mallId when using injected fetch
unknown API source/status values map to safe frontend domain values
typed ApiClientError propagates without live backend dependency
```

## Required Final Checks

```bash
npm --prefix frontend run test
npm run quality
npm run quality:audit
```

Final P5-I1 result:

```text
npm --prefix frontend run test: 84 passed
npm run quality: passed
npm run quality:audit: found 0 vulnerabilities
```

Vite still prints React Router/Motion `"use client"` warnings during build; these are existing non-blocking dependency warnings.

## Known Gaps

```text
DashboardPage is not yet wired to the loader state boundary
no real MySQL migration execution test
no live frontend/backend browser integration test
no browser E2E
no backend coverage report
no AI validation tests
no Docker Compose startup test
```
