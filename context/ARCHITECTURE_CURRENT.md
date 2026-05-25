# Architecture Current

Updated: 2026-05-25

## Current Architecture

```text
frontend: React + TypeScript + Vite demo
frontend data mode: mock by default, explicit API mode only
current digital twin: SVG/2.5D floor-plan view in /digital-twin
backend: FastAPI app
api: /api/v1 health and synthetic read endpoints
data model: MySQL baseline in docs/DATA_MODEL.md
migration: SQLAlchemy Core metadata + Alembic offline migration
ai-services: FastAPI local service with OpenCV HOG detector and synthetic fixtures
quality gate: root npm scripts + frontend tests + backend Pytest + ai-services Pytest
CI: GitHub Actions only
```

P4 built the synthetic backend API and typed frontend client contract. P5 wired explicit API mode across frontend pages while keeping mock mode as the default. P6-I1 documented anonymous aggregate AI events and synthetic fixture boundaries. P6-I2 created the local AI service baseline with synthetic fixtures. P6-R1 reprioritized the next architecture work toward a premium synthetic 3D digital twin demo. The P7 UI/UX preview checkpoint confirmed `/style-preview` as the premium light cockpit productization target, and P7-I2 migrated `/digital-twin` to that shell while preserving the SVG/2.5D center placeholder. P7-I1 documented the 3D stack audit in `docs/P7_3D_STACK_AUDIT.md`: BlenderMCP is a controlled local automation candidate only. P7-I3 installed the audited minimum Web 3D baseline (`three@0.184.0`, `@react-three/fiber@9.6.1`, `@types/three@0.184.1`) and added a local synthetic WebGL scene shell under `frontend/src/twin/scene/`; optional `@react-three/drei` remains not installed.

## Implemented API Layer

```text
GET /api/v1/health
GET /api/v1/malls
GET /api/v1/malls/{mallId}/floors
GET /api/v1/floors/{floorId}/stores
GET /api/v1/stores/{storeId}
GET /api/v1/stores/{storeId}/score
GET /api/v1/stores/{storeId}/flow
GET /api/v1/stores/ranking?mallId=mall_demo_001
GET /api/v1/alerts/stores?mallId=mall_demo_001
GET /api/v1/customer-profile?mallId=mall_demo_001
GET /api/v1/heatmap?mallId=mall_demo_001
GET /api/v1/trajectories?mallId=mall_demo_001
GET /api/v1/overview?mallId=mall_demo_001
```

## Target Architecture For P7 Synthetic 3D Twin

```text
3D modeling pipeline uses free Blender as the confirmed mainline modeling tool, exporting project-authored GLB/GLTF assets when needed
frontend /digital-twin now uses the approved premium light three-column cockpit and includes the first minimal Three.js/WebGL rendering module
3D boundary now starts under frontend/src/twin/scene/
current domain/view-model files remain useful adapters while scene rendering is introduced incrementally
backend adds synthetic scenario/event generator APIs before real data adapters
MySQL stores synthetic demo scenarios, generated fake events, agent configs, heatmap snapshots, and replay frames
/api/v1 remains the API namespace for scenario controls and read models
real-data adapters stay behind a later boundary and must not replace synthetic demo mode by default
```

## Candidate 3D Module Boundary

P7-I1 should confirm the exact boundary before code is written. The expected direction is:

```text
frontend/src/twin/types.ts      scene data contracts and stable object IDs
frontend/src/twin/scene/        renderer, camera, lighting, controls
frontend/src/twin/entities/     mall floors, stores, people, flows, heatmap, alerts
frontend/src/twin/adapters/     domain model to 3D scene data
frontend/src/twin/interactions/ picking, focus, floor isolation, layer visibility
frontend/src/twin/simulation/   deterministic synthetic people/event playback
frontend/src/twin/export/       GLB/GLTF asset manifest and loading helpers
```

## Deferred Architecture Work

```text
real RTSP/video ingestion
real monitoring footage processing
real MySQL production query path
real mall/BIM/CAD/floor-plan ingestion
real brand or tenant asset ingestion
production data adapters
Docker Compose and deployment infrastructure
```

## Next Architecture Work

P7-I3 introduced the smallest audited WebGL/Three.js scene shell while preserving SVG fallback/reference and synthetic/mock defaults. Next architecture work is P7-I4: deepen the local synthetic scene adapter and store/floor interaction baseline without external assets. BlenderMCP remains candidate-only, Unity/UE are not current mainline choices, and no real mall/video/personal data should be used.
