# Test State

Updated: 2026-05-25

## Current Status

P5-I11 closed frontend API-mode integration. P6-I2 added AI service synthetic fixture tests. P6-R1 updated documentation and roadmap priority without changing runtime code. The Blender mainline modeling-tool decision was recorded and re-verified. P7-I1 added a documentation-only 3D stack and BlenderMCP audit without installing dependencies or changing runtime code. P7-I2 productized the premium `/digital-twin` cockpit shell and added a frontend boundary test while preserving SVG/2.5D and mock/API behavior.

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
```

P6-R1 note: `backend/.venv` was recreated locally because the Linux quality gate requires `backend/.venv/bin/python`.

Known existing build note:

```text
Vite still prints React Router/Motion "use client" warnings during build; these are existing non-blocking dependency warnings.
```

## Current Test Assets

```text
frontend loader/state/model tests for mock/API mode
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
no 3D rendering or performance test yet
no synthetic scenario persistence test yet
no Docker Compose startup test
```

## Required Final Checks

```bash
npm run quality
npm run quality:audit
```

If an increment cannot run these checks, it must record the attempted command, exact blocker, and remaining risk in `PROGRESS.md` and this file.
