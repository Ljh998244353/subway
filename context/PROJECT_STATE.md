# Project State

Updated: 2026-05-26

## Current Stage

Completed P0/P1/P2/P3, P4-I1 through P4-I16, P5-I1 through P5-I11, P6-I1, P6-I2, P6-R1, the P7 premium UI/UX preview checkpoint, P7-I1 through P7-I8, P8-I1, and P8-I2.

The current project priority is now:

```text
build a polished, modern, demo-ready synthetic 3D mall digital twin before real video/data integrations
```

## Current Repository Baseline

```text
frontend/                              React + TypeScript + Vite demo, mock mode default
frontend/src/pages/DigitalTwinPage.tsx Current digital twin page with premium cockpit, GLB scene, overlays, and fallback/reference view
frontend/src/twin/scene/               Three.js/R3F/Drei scene with optimized animation loop behavior
frontend/src/performance/              P8-I1 production chunking rules and tests
frontend/src/components/FloorPlan.tsx  Self-drawn mock geometry floor plan retained as SVG fallback/reference
frontend/src/api/                      Typed API client and mock/API-mode data loaders
backend/                               FastAPI synthetic API baseline
backend/app/fixtures/reference.py      P8-I2 deterministic synthetic store score formula and aggregate inputs
backend/app/db/metadata.py             SQLAlchemy Core MySQL metadata baseline
backend/migrations/                    Alembic offline migration baseline
ai-services/                           P6-I2 local AI service with synthetic fixtures
context/                               AI recovery package
```

## Implemented Baseline

```text
P4 backend synthetic /api/v1 read endpoints
P5 frontend API-mode loaders and state adapters, mock mode remains default
P6-I1 anonymous aggregate AI event schema and synthetic fixture boundary docs
P6-I2 ai-services/ with FastAPI, OpenCV HOG detector, synthetic video fixtures, event output, and 20 tests
P6-R1 roadmap/context reprioritization to premium synthetic 3D digital twin demo-first track
P7 premium UI/UX preview checkpoint: confirmed `/style-preview` premium light three-column cockpit and archived prompt/design rules
P7-I1 3D stack audit: documented BlenderMCP as a controlled local automation candidate and `three`/R3F/Drei as Web 3D candidates without installing them
P7-I2 premium `/digital-twin` cockpit productization: migrated the real route into the approved premium light shell while preserving SVG/2.5D FloorPlan and mock/API boundaries
P7-I3 minimal audited WebGL scene shell: installed `three@0.184.0`, `@react-three/fiber@9.6.1`, and `@types/three@0.184.1`; added a local synthetic floor/store block scene and kept SVG fallback/reference
P7-I4 through P7-I8: added typed scene adapter, GLB loading through approved Drei, labels, lighting, camera animation, hover/alert effects, OrbitControls, heatmap animation, score coloring, floor transition controls, and demo polish
P8-I1 production preparation: added route-level lazy loading, React route error/loading fallback, Vite manual chunks for React/Router/Motion/Three/R3F/Drei, and reduced per-frame React state churn in the 3D scene
P8-I2 store score MVP contract: refined the score response with synthetic aggregate inputs, formulaVersion, weights, deterministic score calculation, and frontend DTO coverage
```

## New Product Priority

The next major deliverable is a high-quality 3D digital twin demo:

```text
self-authored synthetic mall model
modern 3D/WebGL presentation
virtual people and crowd-flow simulation
controls for people count, time, destination stores, dwell, entry/exit, congestion, and incidents
synthetic event seed/reset/append/generate workflow
MySQL-backed fake/demo data persistence
replay and presentation-ready demo controls
future real-data adapter boundary preserved but not implemented now
```

## Current Gaps

```text
browser-level 3D rendering/performance tests are not implemented yet
SVG/2.5D fallback remains available and should not be removed yet
backend uses synthetic fixtures, not persisted synthetic scenario/event generation
no real MySQL connection or migration execution
no browser E2E
no production deployment or Docker Compose startup
real video/data/material integration is deferred
```

## Boundaries

```text
MySQL remains the database direction
mock/synthetic mode remains default until explicitly changed
real mall floor plans, BIM/CAD, maps, brand logos, store logos, shop signs, monitoring footage, face images, personal data, and individual trajectories remain blocked
future 3D dependencies, assets, models, textures, fonts, icons, copied code, or external services require license/cost/account review before adoption
P7-I3 already audited the installed minimal `three`/R3F baseline and @types dependency; P7-I5 audited/recorded approved Drei and self-authored GLB usage
```

## Next Target

P8-I3 should extend the store ranking contract with narrow synthetic filters and document score persistence readiness. Do not connect real MySQL, create deployment infrastructure, or use real mall/video/personal data in the next increment.
