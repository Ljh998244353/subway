# TODO Next

Updated: 2026-05-26

## Completed

P6-I1 AI event schema and synthetic fixture boundary documentation is complete.

```text
docs/AI_EVENT_SCHEMA.md
docs/SYNTHETIC_FIXTURE_VALIDATION.md
README.md
PROGRESS.md
context/*.md
```

P6-I2 AI service implementation with synthetic fixtures is complete.

```text
ai-services/ directory structure
Python virtual environment with dependencies
OpenCV HOG person detector (Apache 2.0 license)
Synthetic video fixture generator
Person detection event output implementation
Event schema validation
20 tests passing
```

P6-R1 roadmap reprioritization is complete.

```text
AI_Schedule.md
AGENTS.md / AGENT.md
README.md
PROGRESS.md
IMPORTANT.md
context/*.md
```

The next major workstream is now a premium synthetic 3D mall digital twin demo before real video/data integrations. The `/style-preview` checkpoint confirmed the premium light fullscreen three-column cockpit as the UI/UX target and archived its prompt/design rules in `docs/design/P7_PREMIUM_UI_UX_REDESIGN_PLAN.md`.

P7-I1 3D stack, license, and BlenderMCP candidate audit is complete. Primary role was Architect Mode and the P7-I1 quality gate passed.

```text
docs/P7_3D_STACK_AUDIT.md
docs/LICENSE_AUDIT.md
docs/THIRD_PARTY_NOTICES.md
IMPORTANT.md
context/*.md
```

P7-I2 premium `/digital-twin` cockpit shell productization is complete.

```text
frontend/src/pages/DigitalTwinPage.tsx
frontend/src/pages/digitalTwinModel.ts
frontend/src/pages/DigitalTwinPage.test.ts
frontend/src/styles/global.css
PROGRESS.md
context/*.md
```

P7-I3 audited minimal WebGL/Three.js scene shell is complete.

```text
frontend/package.json
frontend/package-lock.json
frontend/src/pages/DigitalTwinPage.tsx
frontend/src/pages/digitalTwinModel.ts
frontend/src/pages/DigitalTwinPage.test.ts
frontend/src/twin/scene/DigitalTwinScene.tsx
frontend/src/twin/scene/DigitalTwinScene.test.ts
frontend/src/styles/global.css
docs/THIRD_PARTY_NOTICES.md
docs/LICENSE_AUDIT.md
IMPORTANT.md
PROGRESS.md
context/*.md
```

P7-I3 installed only the audited minimal frontend 3D baseline:

```text
three@0.184.0
@react-three/fiber@9.6.1
@types/three@0.184.1
```

P7-I3 added a local synthetic WebGL floor/store block scene inside `/digital-twin`, preserved the SVG/2.5D `FloorPlan` as fallback/reference, kept `/style-preview`, preserved mock/API state behavior, and passed the required checks. It did not add Drei, BlenderMCP, GLB/GLTF files, models, textures, fonts, icons, external assets, external services, real MySQL, real video, real mall material, or personal data.

P7-I4 typed 3D scene adapter and store/floor interaction baseline is complete.

```text
frontend/src/twin/adapter/sceneAdapter.ts
frontend/src/twin/adapter/sceneAdapter.test.ts
frontend/src/twin/scene/DigitalTwinScene.tsx
frontend/src/twin/scene/DigitalTwinScene.test.ts
frontend/src/pages/DigitalTwinPage.tsx
frontend/src/pages/DigitalTwinPage.test.ts
frontend/src/pages/digitalTwinModel.ts
PROGRESS.md
context/*.md
```

P7-I4 created a typed scene adapter layer with stable WebGL object IDs, store click/focus interaction, updated DigitalTwinScene to use the adapter, added 131 frontend tests, and passed the quality gate. It did not add Drei, BlenderMCP, GLB/GLTF files, models, textures, fonts, icons, external assets, external services, real MySQL, real video, real mall material, or personal data.

P7-I5 BlenderMCP integration with GLB model loading is complete.

```text
opencode.json (BlenderMCP configuration)
frontend/public/models/mall_floor_f2.glb
frontend/package.json
frontend/package-lock.json
frontend/src/twin/scene/DigitalTwinScene.tsx
frontend/src/pages/DigitalTwinPage.tsx
frontend/src/styles/global.css
PROGRESS.md
context/*.md
```

P7-I5 approved BlenderMCP, created self-authored synthetic mall geometry in Blender, exported as GLB, added GLB loading to DigitalTwinScene with hover/click interactions, installed @react-three/drei, and passed the quality gate. It did not use external asset APIs, downloaded models, real MySQL, real video, real mall material, or personal data.

P7-I6 3D scene visual polish with labels and enhanced lighting is complete.

```text
frontend/src/twin/scene/DigitalTwinScene.tsx
frontend/src/styles/global.css
PROGRESS.md
context/*.md
```

P7-I6 added floor label overlays, store name labels, enhanced lighting with shadows, improved scene rendering, and passed the quality gate. It did not use external asset APIs, downloaded models, real MySQL, real video, real mall material, or personal data.

P7-I7 3D scene interaction deepening with camera animation and visual effects is complete.

```text
frontend/src/twin/scene/DigitalTwinScene.tsx
frontend/src/styles/global.css
PROGRESS.md
context/*.md
```

P7-I7 added camera animation for store focus, hover highlight effects, alert indicators with animation, OrbitControls, and passed the quality gate. It did not use external asset APIs, downloaded models, real MySQL, real video, real mall material, or personal data.

P7-I8 3D scene final polish with heatmap animation and score visualization is complete.

```text
frontend/src/twin/scene/DigitalTwinScene.tsx
frontend/src/styles/global.css
PROGRESS.md
context/*.md
```

P7-I8 added heatmap animation, score-based color visualization, floor switching animation, demo preparation controls, and passed the quality gate. It did not use external asset APIs, downloaded models, real MySQL, real video, real mall material, or personal data.

P8-I1 production deployment preparation and performance optimization is complete.

```text
frontend/src/App.tsx
frontend/src/twin/scene/DigitalTwinScene.tsx
frontend/src/performance/buildChunks.ts
frontend/src/performance/buildChunks.test.ts
frontend/vite.config.ts
frontend/tsconfig.node.json
frontend/package.json
PROGRESS.md
context/*.md
```

P8-I1 added route-level lazy loading, route loading/error fallback, Vite production chunks for React/Router/Motion/Three/R3F/Drei, and 3D scene render-loop optimization. It preserved `/digital-twin`, `/style-preview`, GLB loading, SVG/2.5D fallback/reference, mock/API state behavior, and synthetic-only boundaries. It did not add dependencies, external assets, real MySQL, real video, production data, or deployment infrastructure.

P8-I2 store score MVP contract and synthetic event consumption plan is complete.

```text
backend/app/schemas/reference.py
backend/app/fixtures/reference.py
backend/tests/test_reference_api.py
frontend/src/api/referenceClient.ts
frontend/src/api/referenceClient.test.ts
frontend/src/api/storeAnalysisDataLoader.test.ts
docs/STORE_SCORE_MVP.md
docs/API_CONTRACT.md
PROGRESS.md
context/*.md
```

P8-I2 refined the existing store score API response so it exposes `source`, `formulaVersion`, `weights`, and `inputs` for deterministic synthetic aggregate scoring. It added formula/boundary tests and updated frontend DTO types while preserving mock defaults. It did not add dependencies, real MySQL, real video, real mall data, personal data, migrations, or deployment infrastructure.

## Task Card

```text
Increment: P8-I3 Store score ranking filters and synthetic score readiness
Primary role: Backend Mode
Auxiliary reviews: Design, Architect, QA, Security/License
Human command: 请进行下一步
Status: ready after P8-I2 store score formula contract
```

## Goal

Extend the P8 store score MVP contract with narrow ranking filters and readiness notes for synthetic score persistence.

P8-I3 should implement:

```text
extend GET /api/v1/stores/ranking with synthetic fixture filters if still narrow: floorId, categoryId, grade, or metric
keep ranking derived from P8-I2 synthetic score contract
add backend tests for filtering, sorting, empty result shape, and invalid mall/floor/category boundaries
update frontend client only if the filter contract needs typed coverage
document persistence readiness questions for synthetic score aggregates without creating migrations
preserve existing frontend behavior and mock defaults
```

## Non-goals

```text
do not use Sketchfab, Poly Haven, Hyper3D, Hunyuan3D, Rodin, Fal, paid model services, or external asset APIs
do not use real mall floor plans, BIM/CAD, maps, brand logos, tenant logos, shop signs, or scraped media
do not use real monitoring footage, face images, personal data, or individual trajectories
do not connect real MySQL or production data
do not create deployment infrastructure
do not add dependencies unless separately audited and approved
do not change frontend defaults or require a live backend for the demo
```

## Required Reading

```text
AGENTS.md
AGENT.md
README.md
AI_Schedule.md
PROGRESS.md
IMPORTANT.md
docs/P7_3D_STACK_AUDIT.md
docs/design/P7_PREMIUM_UI_UX_REDESIGN_PLAN.md
docs/THIRD_PARTY_NOTICES.md
docs/LICENSE_AUDIT.md
docs/ENGINEERING_QUALITY_GATES.md
context/PROJECT_STATE.md
context/REQUIREMENTS_CURRENT.md
context/ARCHITECTURE_CURRENT.md
context/DATA_MODEL_CURRENT.md
context/API_CONTRACT_CURRENT.md
context/FRONTEND_STATE.md
context/BACKEND_STATE.md
context/AI_ALGORITHM_STATE.md
context/TEST_STATE.md
context/DEPLOYMENT_STATE.md
context/DECISIONS_LOG.md
context/RISKS_AND_ASSUMPTIONS.md
context/TODO_NEXT.md
opencode.json
frontend/package.json
frontend/src/App.tsx
backend/app/api/routes/
backend/app/fixtures/
backend/app/schemas/
backend/tests/
frontend/src/api/referenceClient.ts
frontend/src/api/referenceClient.test.ts
```

## Likely Deliverables

```text
ranking filter contract or documented no-go if scope is reduced
fixture-backed filtered ranking response
backend tests for filter shape and synthetic-only boundaries
context/docs record synthetic score persistence readiness questions
existing frontend/backend tests/build still pass
no real MySQL, real mall data, real video, personal data, or deployment infrastructure
PROGRESS.md and affected context files record the P8-I3 result and next handoff
```

## P8-I2 Baseline

```text
P8-I2 store score MVP contract and synthetic event consumption plan is complete.
Primary role was Backend Mode.
GET /api/v1/stores/{storeId}/score now returns deterministic synthetic aggregate scoring metadata with formulaVersion synthetic-score-v1.
Store ranking remains derived from the same fixture-backed scores.
The quality gate remains npm run quality plus npm run quality:audit.
```

## Acceptance Checks

```bash
npm --prefix frontend run test
npm --prefix frontend run build
npm run quality
npm run quality:audit
```

P8-I3 changes backend/API contract behavior, so the quality gate is required unless an environment blocker is recorded in `PROGRESS.md` and `context/TEST_STATE.md`.

## Human Confirmation Gates

```text
before installing any new dependency not already audited and recorded
before using external asset APIs or downloaded models
before using any real mall material or brand material
before connecting real MySQL or real production data
before using real video or monitoring footage
before creating deployment infrastructure
```
