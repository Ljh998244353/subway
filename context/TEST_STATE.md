# Test State

Updated: 2026-05-28

## Latest Verification

```text
npm --prefix frontend run lint: passed
npm --prefix frontend run test: passed, 81 tests
npm --prefix frontend run build: passed
npm run quality:frontend: passed
npm run quality:docs: passed
npm run quality:compliance: passed
npm run quality:boundary: passed
npm run quality:audit: passed after network approval; high-severity threshold passed
npm run quality: attempted with 180s timeout; docs/compliance/boundary/frontend passed, backend pytest hung at backend/tests/test_health.py and timed out with code 124
WF-I1 workflow simplification checks: npm run quality:docs passed; npm run quality:compliance passed; npm run quality:boundary passed; npm --prefix frontend run lint passed; npm run quality:audit passed after network approval with the known 2 moderate PostCSS advisories
```

## Current Test Assets

```text
frontend URL state and App Router navigation tests
frontend typography/color/layout regression tests
frontend mock/API-mode loader tests
NavGraph + A* pathing tests
backend health, migration, reference API, overview API tests
ai-services synthetic fixture and event schema tests
root quality-gate and audit scripts
```

## Known Gaps

```text
backend pytest currently hangs in the full root quality gate at backend/tests/test_health.py in this environment
no live frontend/backend browser integration test
no browser E2E or screenshot regression gate
no browser-level 3D FPS/render instrumentation
no real MySQL migration execution test
no Docker Compose startup test
```

## Required Checks By Increment Type

```text
workflow/docs: npm run quality:docs, npm run quality:compliance, npm run quality:boundary
frontend: npm --prefix frontend run lint, npm --prefix frontend run test, npm --prefix frontend run build, npm run quality:frontend
dependencies/assets: npm run quality:audit plus license docs
backend: backend/.venv/bin/python -m pytest backend/tests, unless the known health-test hang blocks it
```
