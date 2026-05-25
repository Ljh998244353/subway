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

P7-I1 3D stack, license, and BlenderMCP candidate audit is complete.

```text
docs/P7_3D_STACK_AUDIT.md
docs/LICENSE_AUDIT.md
docs/THIRD_PARTY_NOTICES.md
IMPORTANT.md
context/*.md
```

P7-I1 audit baseline remains part of the quality gate:

```text
P7-I1 3D 技术栈、许可证审计和前端依赖基线确认 is complete.
Primary role was Architect Mode.
The P7-I1 audit recorded 3D, license, cost, account, and synthetic data boundaries in docs/P7_3D_STACK_AUDIT.md.
P7-I1 final checks passed: npm run quality; npm run quality:audit.
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

P7-I2 migrated `/digital-twin` into the approved premium light fullscreen three-column cockpit, preserved `/style-preview`, kept the existing SVG/2.5D `FloorPlan` as the center placeholder, preserved mock/API data mode and fallback behavior, added a P7-I2 boundary test, and passed quality/audit gates.

## Task Card

```text
Increment: P7-I3 audited minimal WebGL/Three.js scene shell for /digital-twin
Primary role: Frontend Mode
Auxiliary reviews: Design, Architect, QA, Security/License
Human command: 请进行下一步
Status: ready after P7-I2 cockpit shell productization
```

## Goal

Add the smallest audited WebGL/Three.js scene shell into the productized `/digital-twin` cockpit so the project can begin moving from SVG/2.5D placeholder toward a real interactive 3D digital twin, while preserving all synthetic/mock and fallback boundaries.

P7-I3 should implement:

```text
confirm exact frontend 3D dependency versions before install or code adoption
record license/cost/account/bundle/audit notes for any approved package actually added
prefer three + @react-three/fiber as the minimal baseline; @react-three/drei remains optional and should be skipped unless truly needed
create a minimal local synthetic scene shell inside the existing center workspace
keep the existing SVG/2.5D FloorPlan available as fallback or reference until the 3D path is proven
preserve /style-preview as the reference prototype route
preserve mock/synthetic default and existing API-mode fallback behavior
add/update dependency, route, scene-adapter, state, and build checks for the 3D shell
avoid model files, external assets, downloaded textures, fonts, icons, paid services, and real data
```

## Non-goals

```text
do not use BlenderMCP yet
do not import GLB/GLTF model files yet
do not create or download production model/texture assets yet
do not use Sketchfab, Poly Haven, Hyper3D, Hunyuan3D, Rodin, Fal, paid model services, or external asset APIs
do not use real mall floor plans, BIM/CAD, maps, brand logos, tenant logos, shop signs, or scraped media
do not use real monitoring footage, face images, personal data, or individual trajectories
do not connect real MySQL or production data
do not resume real video integration unless a later task card explicitly changes priority
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
frontend/src/components/FloorPlan.tsx
frontend/src/components/TwinInspector.tsx
frontend/src/pages/digitalTwinModel.ts
frontend/src/pages/digitalTwinState.ts
frontend/src/api/digitalTwinDataLoader.ts
frontend/src/styles/global.css
```

## Likely Deliverables

```text
minimal audited WebGL/Three.js scene shell in /digital-twin center workspace
current SVG/2.5D FloorPlan remains available as fallback/reference
mock/API state behavior remains intact
/style-preview remains a reference route and is not deleted
no GLB/GLTF model, texture, font, icon, or external asset is added
THIRD_PARTY_NOTICES.md and LICENSE_AUDIT.md updated if dependencies are added
route/build/state/scene checks are updated for the new shell
PROGRESS.md and affected context files record the P7-I3 result and next handoff
```

## P7-I2 Baseline

```text
P7-I2 premium /digital-twin cockpit productization is complete.
Primary role was Frontend Mode.
/digital-twin now uses the approved premium light fullscreen three-column cockpit shell.
Current FloorPlan remains SVG/2.5D and acts as the central placeholder.
P7-I2 final checks passed: npm --prefix frontend run test; npm run quality; npm run quality:audit.
The quality gate remains npm run quality plus npm run quality:audit.
```

## Acceptance Checks

```bash
npm --prefix frontend run test
npm run quality
npm run quality:audit
```

P7-I3 changes frontend code and likely dependency metadata, so the quality gate is required unless an environment blocker is recorded in `PROGRESS.md` and `context/TEST_STATE.md`.

## Human Confirmation Gates

```text
before installing any 3D dependency if the package/version/license/cost/account/audit review is not already recorded in the increment notes
before using BlenderMCP
before adding any model, texture, font, icon, copied code, or external asset
before using external asset/model APIs or downloaded models
before using any real mall material or brand material
before connecting real MySQL or real production data
before using real video or monitoring footage
before creating deployment infrastructure
```
