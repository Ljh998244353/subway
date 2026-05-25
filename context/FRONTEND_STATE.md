# Frontend State

Updated: 2026-05-25

## Current Status

The frontend remains a React + TypeScript + Vite demo using mock data by default. P4 added a typed API client boundary. P5-I1 through P5-I11 added explicit API-mode data loaders and state adapters across the demo pages while preserving mock defaults. The P7 premium UI/UX preview checkpoint added `/style-preview` as the confirmed visual/layout target, P7-I2 productized that premium light cockpit shell into `/digital-twin`, and P7-I3 added the first audited minimal WebGL/Three.js scene shell.

Current digital twin implementation:

```text
route: /digital-twin
page: frontend/src/pages/DigitalTwinPage.tsx
WebGL scene shell: frontend/src/twin/scene/DigitalTwinScene.tsx
SVG fallback/reference: frontend/src/components/FloorPlan.tsx
model helpers: frontend/src/pages/digitalTwinModel.ts
API-mode data loader: frontend/src/api/digitalTwinDataLoader.ts
rendering style: premium light fullscreen cockpit shell with a local synthetic WebGL floor/store block scene plus SVG/2.5D fallback/reference
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

## P7-I3 WebGL Baseline

P7-I3 installed:

```text
three@0.184.0
@react-three/fiber@9.6.1
@types/three@0.184.1 as build-required dev dependency
```

P7-I3 deliberately skipped:

```text
@react-three/drei
BlenderMCP
GLB/GLTF model files
textures, fonts, icons, downloaded assets, copied code, or external asset APIs
real MySQL
real video
real mall material, BIM/CAD, floor plan, map, brand logo, tenant logo, or shop sign
face images or personal trajectories
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

P7-I3 created the first module under:

```text
frontend/src/twin/scene/
```

Expected later modules remain:

```text
frontend/src/twin/entities/
frontend/src/twin/adapters/
frontend/src/twin/simulation/
frontend/src/twin/controls/
```

## Dependency Notes

```text
Blender is the confirmed free modeling tool for the current mainline; Unity and UE are not current mainline dependencies
three and @react-three/fiber are now installed as the minimum WebGL baseline
@react-three/drei remains optional and not installed
any future 3D dependency, model, texture, font, icon, asset, or external service still requires license/cost/account/version/bundle audit before adoption
P7-I3 build emits a large-chunk warning after adding Three.js/R3F; later performance work should consider route-level lazy loading or manual chunking
MotionSurface.tsx imports framer-motion while frontend/package.json lists motion; this remains a dependency-baseline item to verify separately
```

## Test State

```text
npm --prefix frontend run test: 127 passed after P7-I3
npm --prefix frontend run build: passed after P7-I3; existing React Router/Motion use-client warnings plus a new large-chunk warning
npm run quality: passed after P7-I3; frontend tests 127 passed; backend pytest 34 passed
npm run quality:audit: found 0 vulnerabilities after P7-I3
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

P7-I4 should deepen the local synthetic 3D scene data adapter and store picking/floor state, without introducing external assets. Keep `/style-preview` as the design reference and keep SVG/2.5D fallback available until the WebGL path is visually and test-wise mature. Do not use BlenderMCP, import GLB/GLTF files, download assets, connect real MySQL, or use real data unless a later task card explicitly scopes and approves that work.
