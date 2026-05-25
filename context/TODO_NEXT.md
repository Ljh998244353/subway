# TODO Next

Updated: 2026-05-25

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

## Task Card

```text
Increment: P7-I4 3D scene adapter and store/floor interaction baseline
Primary role: Frontend Mode
Auxiliary reviews: Design, Architect, QA, Security/License
Human command: 请进行下一步
Status: ready after P7-I3 minimal WebGL scene shell
```

## Goal

Deepen the `/digital-twin` WebGL path from a hard-coded minimal scene shell into a small typed local scene-adapter layer with stable renderable object IDs and a first interaction baseline for floor/store focus, while preserving the current SVG fallback and synthetic/mock boundaries.

P7-I4 should implement:

```text
create a small frontend/src/twin adapter/type boundary for renderable floors, stores, corridors, and selection state
map the existing DigitalTwinViewModel into a stable Three.js scene model without changing backend/API/data contracts
preserve route query state for floor/mode/store selection
make WebGL store objects expose stable IDs and prepare or implement simple click/focus links back to existing /digital-twin query state
keep the existing SVG/2.5D FloorPlan available as fallback/reference
keep /style-preview as the reference prototype route
preserve mock/synthetic default and existing API-mode fallback behavior
add/update adapter, route/state, scene, and build checks
monitor the P7-I3 large frontend chunk warning but do not solve it unless it can be done narrowly without expanding scope
avoid additional dependencies unless separately audited and necessary
```

## Non-goals

```text
do not use BlenderMCP yet
do not install @react-three/drei unless a separate audit and clear need is recorded
do not import GLB/GLTF model files yet
do not create or download production model/texture assets yet
do not use Sketchfab, Poly Haven, Hyper3D, Hunyuan3D, Rodin, Fal, paid model services, or external asset APIs
do not use real mall floor plans, BIM/CAD, maps, brand logos, tenant logos, shop signs, or scraped media
do not use real monitoring footage, face images, personal data, or individual trajectories
do not connect real MySQL or production data
do not add backend API endpoints or migrations in this frontend increment
do not create deployment infrastructure
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
frontend/package.json
frontend/src/App.tsx
frontend/src/routes/routeConfig.ts
frontend/src/pages/PremiumStylePreviewPage.tsx
frontend/src/pages/DigitalTwinPage.tsx
frontend/src/twin/scene/DigitalTwinScene.tsx
frontend/src/twin/scene/DigitalTwinScene.test.ts
frontend/src/components/FloorPlan.tsx
frontend/src/components/TwinInspector.tsx
frontend/src/pages/digitalTwinModel.ts
frontend/src/pages/digitalTwinState.ts
frontend/src/api/digitalTwinDataLoader.ts
frontend/src/styles/global.css
```

## Likely Deliverables

```text
typed scene adapter/model under frontend/src/twin/
updated DigitalTwinScene consuming the adapter rather than raw view-model details where useful
stable WebGL object IDs for floor/stores/corridors
store/floor focus interaction or link baseline preserving query params
SVG/2.5D fallback/reference still available
mock/API state behavior intact
/style-preview preserved
no new assets, model files, external services, or real data
route/build/state/scene checks updated
PROGRESS.md and affected context files record the P7-I4 result and next handoff
```

## P7-I3 Baseline

```text
P7-I3 audited minimal WebGL/Three.js scene shell is complete.
Primary role was Frontend Mode.
/digital-twin now renders a local synthetic WebGL floor/store block scene using three + @react-three/fiber.
Current FloorPlan remains SVG/2.5D fallback/reference.
P7-I3 final checks passed: npm --prefix frontend run test; npm --prefix frontend run build; npm run quality; npm run quality:audit.
The quality gate remains npm run quality plus npm run quality:audit.
```

## Acceptance Checks

```bash
npm --prefix frontend run test
npm --prefix frontend run build
npm run quality
npm run quality:audit
```

P7-I4 changes frontend code, so the quality gate is required unless an environment blocker is recorded in `PROGRESS.md` and `context/TEST_STATE.md`.

## Human Confirmation Gates

```text
before installing any new 3D dependency not already audited and recorded
before using BlenderMCP
before adding any model, texture, font, icon, copied code, or external asset
before using external asset/model APIs or downloaded models
before using any real mall material or brand material
before connecting real MySQL or real production data
before using real video or monitoring footage
before creating deployment infrastructure
```
