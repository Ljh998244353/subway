# Test State

Updated: 2026-05-25

## Current Status

P5-I11 added a CP5 closure review without changing runtime behavior. The executable test baseline remains the P5-I10 DigitalTwinPage data state wiring and earlier P5 loader/state tests:

```text
frontend/src/pages/storeAnalysisState.ts
frontend/src/pages/StoreAnalysisPage.test.ts
frontend/src/api/storeAnalysisDataLoader.test.ts
frontend/src/api/storeAnalysisDataLoader.ts
frontend/src/api/storeAlertsDataLoader.test.ts
frontend/src/api/storeAlertsDataLoader.ts
frontend/src/pages/storeAlertsState.ts
frontend/src/pages/StoreAlertsPage.test.ts
frontend/src/api/customerProfileDataLoader.test.ts
frontend/src/api/customerProfileDataLoader.ts
frontend/src/api/digitalTwinDataLoader.test.ts
frontend/src/api/digitalTwinDataLoader.ts
frontend/src/pages/digitalTwinState.ts
frontend/src/pages/DigitalTwinPage.test.ts
frontend/src/pages/customerProfileState.ts
frontend/src/pages/CustomerProfilePage.test.ts
frontend/src/api/overviewDataLoader.test.ts
frontend/src/pages/DashboardPage.test.ts
backend/tests/test_health.py
backend/tests/test_migrations.py
backend/tests/test_reference_api.py
backend/tests/test_overview_api.py
```

Latest local P5-I11 frontend result:

```text
npm --prefix frontend run test: 124 passed
```

P5-I10 test coverage includes:

```text
DigitalTwinPage state starts in mock mode without API data
explicit API mode forwards mallId and apiBaseUrl to the injected loader
API result data can drive the existing Digital Twin view model
API loader failure falls back to mock Digital Twin state
Digital Twin loader tests still cover mock default, API success, URL boundaries, DTO mapping, and typed errors
```

## Required Final Checks

```bash
npm --prefix frontend run test
npm run quality
npm run quality:audit
```

Final P5-I11 result:

```text
npm --prefix frontend run test: 124 passed
npm run quality: passed
npm run quality:audit: found 0 vulnerabilities
```

Vite still prints React Router/Motion `"use client"` warnings during build; these are existing non-blocking dependency warnings.

## Known Gaps

```text
P6 AI event schema and synthetic fixture tests are not yet documented or implemented
no real MySQL migration execution test
no live frontend/backend browser integration test
no browser E2E
no backend coverage report
no AI validation tests
no Docker Compose startup test
```
