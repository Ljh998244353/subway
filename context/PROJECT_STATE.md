# Project State

Updated: 2026-05-25

## Current Stage

Completed P0/P1/P2/P3, P4-I1 through P4-I16, P5-I1 through P5-I11, P6-I1, P6-I2, P6-R1, the P7 premium UI/UX preview checkpoint, P7-I1, P7-I2, and P7-I3.

The current project priority is now:

```text
build a polished, modern, demo-ready synthetic 3D mall digital twin before real video/data integrations
```

## Current Repository Baseline

```text
frontend/                              React + TypeScript + Vite demo, mock mode default
frontend/src/pages/DigitalTwinPage.tsx Current digital twin page with premium cockpit and WebGL scene shell
frontend/src/twin/scene/               P7-I3 minimal local Three.js/R3F scene shell and tests
frontend/src/components/FloorPlan.tsx  Self-drawn mock geometry floor plan retained as SVG fallback/reference
frontend/src/api/                      Typed API client and mock/API-mode data loaders
backend/                               FastAPI synthetic API baseline
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
current /digital-twin has a minimal WebGL shell, but not a complete mall model or polished 3D interaction layer
/store picking in WebGL is not implemented yet; selection still comes from route/query state and surrounding panels
SVG/2.5D fallback remains available and should not be removed yet
@react-three/drei is not installed
BlenderMCP is not installed or approved for use
no GLB/GLTF assets, textures, external models, or downloaded assets exist
backend uses synthetic fixtures, not persisted synthetic scenario/event generation
no real MySQL connection or migration execution
no browser E2E or 3D performance test
no production deployment or Docker Compose startup
real video/data/material integration is deferred
```

## Boundaries

```text
MySQL remains the database direction
mock/synthetic mode remains default until explicitly changed
real mall floor plans, BIM/CAD, maps, brand logos, store logos, shop signs, monitoring footage, face images, personal data, and individual trajectories remain blocked
future 3D dependencies, assets, models, textures, fonts, icons, copied code, or external services require license/cost/account review before adoption
P7-I3 already audited the installed minimal `three`/R3F baseline and @types dependency
```

## Next Target

P7-I4 should deepen the local synthetic 3D scene adapter and interaction baseline for `/digital-twin`: convert current view-model stores into a stable renderable scene model, add deterministic floor/store object IDs, and prepare store picking/floor focus tests without using external assets. Keep `/style-preview` as the reference prototype, preserve the SVG/2.5D fallback/reference, and preserve mock/synthetic defaults. Do not use BlenderMCP, import GLB/GLTF assets, connect real MySQL, or use real mall/video/personal data in the next increment.
