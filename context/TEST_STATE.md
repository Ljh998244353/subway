# Test State

Updated: 2026-05-28

## Latest Verification

```text
npm --prefix frontend run lint: passed
npm --prefix frontend run test: passed, 84 tests before P7-R8-V3; passed, 84+ procedural mall spec coverage after P7-R8-V3
npm --prefix frontend run build: passed
npm --prefix frontend run lint: first rerun during concurrent build failed because `.next/types` files were temporarily missing while Next rewrote build output; rerun after build is required for a clean final lint gate
npm run quality:frontend: passed
npm run quality:docs: passed
npm run quality:compliance: passed
npm run quality:boundary: passed
npm run quality:docs initially failed during P7-R8-V3 because `context/TODO_NEXT.md` missed the required literal phrase `one task`; documentation was then updated to satisfy the task-card cleanup gate
npm run quality:audit: passed after network approval; high-severity threshold passed
P7-R8 BlenderKit reference preview was removed after visual rejection; active viewport is back to the procedural scene and no longer requests `/models/blenderkit_mall_reference.glb`
npm run quality: attempted with 180s timeout; docs/compliance/boundary/frontend passed, backend pytest hung at backend/tests/test_health.py and timed out with code 124
WF-I1 workflow simplification checks: npm run quality:docs passed; npm run quality:compliance passed; npm run quality:boundary passed; npm --prefix frontend run lint passed; npm run quality:audit passed after network approval with the known 2 moderate PostCSS advisories
P7-R8-V4 prompt archival increment is documentation-only; required checks are docs/compliance/boundary, with frontend/runtime checks optional because no runtime code path changed
```

## Current Test Assets

```text
frontend URL state and App Router navigation tests
frontend typography/color/layout regression tests
frontend mock/API-mode loader tests
NavGraph + A* pathing tests
frontend navigation/rendering source tests for the procedural Three/SVG hybrid viewport
frontend procedural mall spec tests for 3-floor mapping, atrium clearance, and storefront projection
backend health, migration, reference API, overview API tests
ai-services synthetic fixture and event schema tests
root quality-gate and audit scripts
design/prompt archive documentation for future synthetic F1 SVG floorplan generation
```

## Known Gaps

```text
backend pytest currently hangs in the full root quality gate at backend/tests/test_health.py in this environment
no live frontend/backend browser integration test
no browser E2E or screenshot regression gate
no browser-level 3D FPS/render instrumentation or screenshot regression for the procedural viewport yet
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
