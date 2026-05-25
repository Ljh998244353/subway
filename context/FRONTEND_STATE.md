# Frontend State

Updated: 2026-05-25

## Current Status

The frontend remains a React + TypeScript + Vite demo using mock data by default. P4 added a typed API client boundary. P5-I1 through P5-I11 added explicit API-mode data loaders and state adapters across the demo pages while preserving mock defaults. The P7 premium UI/UX preview checkpoint added `/style-preview` as the confirmed visual/layout target, and P7-I2 productized that premium light cockpit shell into `/digital-twin` without adding WebGL dependencies.

Current digital twin implementation:

```text
route: /digital-twin
page: frontend/src/pages/DigitalTwinPage.tsx
current spatial renderer: frontend/src/components/FloorPlan.tsx
model helpers: frontend/src/pages/digitalTwinModel.ts
API-mode data loader: frontend/src/api/digitalTwinDataLoader.ts
rendering style: premium light fullscreen cockpit shell with SVG/2.5D self-drawn mock geometry, not final 3D/WebGL
preview route: /style-preview
preview page: frontend/src/pages/PremiumStylePreviewPage.tsx
preview status: confirmed premium light three-column cockpit reference preserved after /digital-twin productization
```

Current frontend API files:

```text
frontend/src/api/apiMode.ts
frontend/src/api/referenceClient.ts
frontend/src/api/overviewDataLoader.ts
frontend/src/api/storeAnalysisDataLoader.ts
frontend/src/api/storeAlertsDataLoader.ts
frontend/src/api/customerProfileDataLoader.ts
frontend/src/api/digitalTwinDataLoader.ts
frontend/src/pages/dashboardOverviewState.ts
frontend/src/pages/storeAnalysisState.ts
frontend/src/pages/storeAlertsState.ts
frontend/src/pages/customerProfileState.ts
frontend/src/pages/digitalTwinState.ts
```

## P7 Frontend Goal

The next major frontend workstream is a premium synthetic 3D mall digital twin demo plus a major frontend redesign/refactor. The goal is a grand, refined, elegant, modern operational dashboard experience, not only a 3D canvas upgrade:

```text
productize the approved /style-preview premium light fullscreen three-column cockpit into /digital-twin
Blender-authored free 3D mall model exported to GLB/GLTF where needed
Three.js/WebGL scene inside /digital-twin
self-authored mall model with floors, stores, corridors, atrium, escalators, elevators, entrances, kiosks, and hotspot zones
modern lighting, camera, shadows/materials where performance allows, labels, and presentation polish
major visual-system refactor: elevated layout, typography, spacing, panel depth, restrained motion, premium light dashboard language, and 1920/2K/4K readability
store picking, floor switching, heatmap, flow, alerts, and score overlays
virtual people and crowd-flow animation
scenario/demo controls for crowd density, destinations, incidents, time, replay, seed/reset/append/generate
large-screen and 4K demo readiness
```

## Candidate Module Boundary

P7-I1 should confirm before code changes. Expected direction:

```text
frontend/src/twin/scene/
frontend/src/twin/entities/
frontend/src/twin/adapters/
frontend/src/twin/simulation/
frontend/src/twin/controls/
```

## Dependency Notes

```text
Blender is the confirmed free modeling tool for the current mainline; Unity and UE are not current mainline dependencies
three, @react-three/fiber, and @react-three/drei are not currently installed
three + @react-three/fiber are the preferred future Web 3D candidates; @react-three/drei remains optional
any 3D dependency must be license/cost/account/version/bundle audited before adoption
MotionSurface.tsx imports framer-motion while frontend/package.json lists motion; this remains a dependency-baseline item to verify before adding 3D packages
```

## Test State

```text
npm --prefix frontend run test: 125 passed after P7-I2
npm run quality: passed after P7-I2
npm run quality:audit: found 0 vulnerabilities after P7-I2
```

## Constraints

```text
mock mode remains default unless explicitly changed
no real API call in tests
no real MySQL
no real video
no real mall material, BIM/CAD, floor plan, map, brand logo, tenant logo, or shop sign
no face images
no personal trajectories
no unaudited new dependency or asset
```

## Next Step

P7-I3 should introduce the smallest audited WebGL/Three.js scene shell inside the productized `/digital-twin` cockpit. `docs/design/P7_PREMIUM_UI_UX_REDESIGN_PLAN.md` and `/style-preview` remain the local design baseline and prompt archive. The implementation should keep current mock/API data-mode behavior, preserve the SVG/2.5D floor plan as fallback/reference, and add dependency/route/build/state/scene checks. It should not use BlenderMCP, import GLB/GLTF files, download assets, connect real MySQL, or use real data unless a later task card explicitly scopes and approves that work.
