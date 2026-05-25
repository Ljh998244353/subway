# Project State

Updated: 2026-05-25

## Current Stage

Completed P0/P1/P2/P3, P4-I1 through P4-I16, P5-I1 through P5-I11, P6-I1, P6-I2, and P6-R1.

The current project priority is now:

```text
build a polished, modern, demo-ready synthetic 3D mall digital twin before real video/data integrations
```

## Current Repository Baseline

```text
frontend/                              React + TypeScript + Vite demo, mock mode default
frontend/src/pages/DigitalTwinPage.tsx Current digital twin page, still SVG/2.5D
frontend/src/components/FloorPlan.tsx  Self-drawn mock geometry floor plan
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
current /digital-twin is SVG/2.5D, not final Three.js/WebGL
frontend has no audited 3D dependency installed yet
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
3D dependencies, assets, models, textures, fonts, icons, copied code, or external services require license/cost/account review before adoption
```

## Next Target

P7-I1 3D 技术栈、许可证审计和前端依赖基线确认. Do not implement the 3D scene, install unaudited dependencies, connect real MySQL, or use real mall/video/personal data in this increment.
