# Test State

Updated: 2026-05-28

## Current Status

P5-I11 closed frontend API-mode integration. P6-I2 added AI service synthetic fixture tests. P7 completed the earlier premium synthetic 3D digital twin demo track. P7-R2 closed GLB visibility/model quality and BlenderMCP documentation recovery. P8-I1 added frontend production preparation and performance optimization checks. P7-R7 rebuilt the active frontend as a clean Next.js App Router Digital Twin OS after rollback, and P7-R7c-6 froze that frontend direction while cleaning obsolete Vite/React Router residue.

Latest recorded executable results:

```text
Premium UI/UX preview checkpoint npm --prefix frontend run build: passed
Vite printed existing React Router / Motion "use client" warnings; non-blocking
Blender decision follow-up npm run quality: passed
Blender decision follow-up frontend tests in quality gate: 124 passed
Blender decision follow-up backend pytest: 34 passed
Blender decision follow-up npm run quality:audit: found 0 vulnerabilities
P6-I2 ai-services pytest: 20 passed
P7-I1 audit docs quality gate: npm run quality passed; frontend tests 124 passed; backend pytest 34 passed; build passed with existing React Router/Motion use-client warnings
P7-I1 audit npm run quality:audit: found 0 vulnerabilities
P7-I2 cockpit productization npm --prefix frontend run test: 125 passed
P7-I2 cockpit productization npm run quality: passed; frontend tests 125 passed; backend pytest 34 passed; frontend build passed with existing React Router/Motion use-client warnings
P7-I2 cockpit productization npm run quality:audit: found 0 vulnerabilities
P7-I3 minimal WebGL scene shell npm --prefix frontend run test: 127 passed
P7-I3 minimal WebGL scene shell npm --prefix frontend run build: passed; existing React Router/Motion use-client warnings plus large-chunk warning after Three.js/R3F adoption
P7-I3 minimal WebGL scene shell npm run quality: passed; frontend tests 127 passed; backend pytest 34 passed
P7-I3 minimal WebGL scene shell npm run quality:audit: found 0 vulnerabilities
P8-I1 npm --prefix frontend run test: passed; 134 frontend tests
P8-I1 npm --prefix frontend run build: passed; route chunks and vendor chunks emitted without the prior oversized app entry bundle warning
P8-I1 npm run quality: passed; frontend tests 134 passed; backend pytest 34 passed
P8-I1 npm run quality:audit: found 0 vulnerabilities
P8-I2 backend tests: 35 passed
P8-I2 frontend tests: 134 passed
P8-I2 npm run quality: passed; frontend tests 134 passed; backend pytest 35 passed
P8-I2 npm run quality:audit: found 0 vulnerabilities
P7-R2 `npm --prefix frontend run lint`: passed after GLB URL/diagnostic changes
P7-R2 `npm --prefix frontend run test`: passed; 134 frontend tests
P7-R2 `npm --prefix frontend run build`: passed; existing React Router/Motion use-client warnings remain non-blocking; DigitalTwinPage chunk about 31.25 kB and vendor-three-core chunk about 732.16 kB
P7-R2 `npm run quality:docs`: passed
P7-R2 `npm run quality:compliance`: passed
P7-R2 `npm run quality:boundary`: passed
P7-R2 `npm run quality:audit`: passed; found 0 vulnerabilities
P7-R2 `npm run quality`: passed; frontend lint passed, frontend tests 134 passed, frontend build passed, backend pytest 35 passed
P7-R7 `npm --prefix frontend run lint`: passed
P7-R7 `npm --prefix frontend run test`: passed; 69 tests
P7-R7 `npm --prefix frontend run build`: passed using `next build --webpack`
P7-R7 `npm run quality:frontend`: passed; frontend lint, 69 tests, and Next webpack build
P7-R7 `npm run quality:docs`: passed
P7-R7 `npm run quality:compliance`: passed
P7-R7 `npm run quality:boundary`: passed
P7-R7 `npm run quality:audit`: passed with high-severity threshold; npm reports 2 moderate PostCSS advisories inside Next dependency chain, and `npm audit fix --force` would install a breaking old Next version
P7-R7 Chinese typography fix `npm --prefix frontend run lint`: passed
P7-R7 Chinese typography fix `npm --prefix frontend run test`: passed; 71 tests, including font stack and ranking-board layout regression coverage
P7-R7 Chinese typography fix `npm --prefix frontend run build`: passed using `next build --webpack`
P7-R7 Chinese typography fix `npm run quality:frontend`: passed after rerun; an earlier parallel run raced with `next build` over `.next/types` and failed with missing generated type files
P7-R7 Chinese typography fix `npm run quality:audit`: passed after network approval; initial sandbox run failed with npm registry DNS `EAI_AGAIN`
P7-R7 Chinese typography fix `npm run quality`: attempted; docs/compliance/boundary/frontend stages passed, then backend pytest stage stopped producing output in this sandbox/tool session before a final root-gate result was available
P7-R7b multi-level navigation repair `npm --prefix frontend run test`: passed; 76 frontend tests
P7-R7b multi-level navigation repair `npm --prefix frontend run build`: passed using `next build --webpack`
P7-R7b multi-level navigation repair `npm --prefix frontend run lint`: passed after sequential rerun; an earlier parallel run raced with `.next/types` regeneration during build and reported missing generated type files
P7-R7b multi-level navigation repair `npm run quality:frontend`: passed; frontend lint, 76 tests, and Next webpack build
P7-R7b multi-level navigation repair `npm run quality:audit`: passed after network approval; initial sandbox run failed with npm registry DNS `EAI_AGAIN`; high-severity gate passed with the known 2 moderate PostCSS advisories through Next
P7-R7b multi-level navigation repair `npm run quality`: attempted; docs/compliance/boundary/frontend stages passed, then backend pytest again stopped producing output at `backend/tests/test_health.py`; the stuck gate session was terminated after waiting several minutes
P7-R7b browser feedback fix `npm --prefix frontend run test`: passed; 77 frontend tests
P7-R7b browser feedback fix `npm --prefix frontend run build`: passed using `next build --webpack`
P7-R7b browser feedback fix `npm --prefix frontend run lint`: passed after sequential rerun; an earlier parallel lint/build run hit the known `.next/types` race
P7-R7c-5 Digital Twin browser review stabilization `npm --prefix frontend run lint`: passed
P7-R7c-5 Digital Twin browser review stabilization `npm --prefix frontend run test`: passed; 81 frontend tests
P7-R7c-5 Digital Twin browser review stabilization `npm --prefix frontend run build`: passed using `next build --webpack`
P7-R7c-5 Digital Twin browser review stabilization `npm run quality:frontend`: passed; frontend lint, 81 tests, and Next webpack build
P7-R7c-5 Digital Twin browser review stabilization `npm run quality:audit`: passed after network approval; high-severity threshold passed and npm still reports 2 moderate PostCSS advisories through Next
P7-R7c-5 local service check: `next start --hostname 127.0.0.1 --port 3002` served current production build; `/` returned `307 Temporary Redirect` to `/digital-twin`; `/digital-twin`, `/digital-twin/F2?mode=flow&flowScope=inbound`, and `/digital-twin/store/S045?mode=score&flowScope=outbound` returned expected workspace structures
P7-R7c-5 `npm run quality`: attempted; docs/compliance/boundary/frontend stages passed, then backend pytest again stopped producing output at `backend/tests/test_health.py`; exact stuck quality-gate and pytest processes were terminated
P7-R8-G1 approval-gate task card stabilization `npm run quality:docs`: passed
P7-R7c-6 workspace cleanup `npm --prefix frontend run lint`: passed after removing obsolete tsconfig excludes and restoring current component type-check coverage
P7-R7c-6 workspace cleanup `npm --prefix frontend run test`: passed; 81 frontend tests
P7-R7c-6 workspace cleanup `npm --prefix frontend run build`: passed using `next build --webpack`
P7-R7c-6 workspace cleanup `npm run quality:frontend`: passed
P7-R7c-6 workspace cleanup `npm run quality:docs`: passed
P7-R7c-6 workspace cleanup `npm run quality:compliance`: passed
P7-R7c-6 workspace cleanup `npm run quality:boundary`: passed
P7-R7c-6 workspace cleanup `npm run quality:audit`: passed after network approval; high-severity threshold passed and npm still reports 2 moderate PostCSS advisories through Next
P7-R7c-6 workspace cleanup `npm run quality`: attempted with a 180s timeout; docs/compliance/boundary/frontend stages passed, then backend pytest again stopped producing output at `backend/tests/test_health.py` until timeout exited with code 124
```

P6-R1 note: `backend/.venv` was recreated locally because the Linux quality gate requires `backend/.venv/bin/python`.

Known existing build note:

```text
Next default Turbopack build attempted a sandbox-blocked internal port bind through the Tailwind/PostCSS path, so the active production build script uses `next build --webpack`.
```

## Current Test Assets

```text
frontend loader/state/model tests for mock/API mode
frontend URL state and NavGraph/A* tests for P7-R7
frontend digital-twin navigation tests for App Router paths, non-null level pages, breadcrumbs, viewport navigation, and level-specific sidebars
frontend loading-state and HTTP redirect regression checks for P7-R7c-5
frontend type-check coverage now includes the current Next component tree after P7-R7c-6 removed obsolete excludes
backend health, migration, reference API, overview API tests
ai-services synthetic video, person detector, event processor, schema validation tests
root quality gate and audit scripts
```

## P7 Synthetic 3D Demo Test Direction

Future P7 increments should add or update tests/checks for the risky path they touch:

```text
3D stack/dependency audit checks before adoption
frontend dependency baseline check for motion/framer-motion before adding 3D packages
synthetic mall model geometry bounds and stable IDs
3D scene adapter tests from domain model to renderable scene data
/digital-twin route and query-state preservation during 3D migration
store picking and floor-switch state tests
virtual people simulation deterministic seed tests
synthetic event seed/reset/append/generate determinism tests
MySQL persistence tests for fake events after schema/API design
replay frame ordering and time-boundary tests
4K/large-screen layout checks
3D performance budget notes: first screen < 5s, target >= 30 FPS
license/audit checks for every new dependency, model, texture, font, icon, or asset
```

## Known Gaps

```text
no real MySQL migration execution test
no live frontend/backend browser integration test
no browser E2E
no backend coverage report
no browser-level 3D rendering or performance test yet; P8-I1 added chunk/build checks but not Playwright or FPS instrumentation
manual screenshot-level P7-R7 browser review at 1440px and 1920px is still pending because this environment has no installed Chromium/Playwright runtime
full root `npm run quality` final result after P7-R7c-6 is still pending because the backend pytest stage repeatedly hung in the tool session; docs/compliance/boundary/frontend stages passed
no synthetic scenario persistence test yet
no Docker Compose startup test
```

## Required Final Checks

```bash
npm run quality
npm run quality:audit
```

If an increment cannot run these checks, it must record the attempted command, exact blocker, and remaining risk in `PROGRESS.md` and this file.
