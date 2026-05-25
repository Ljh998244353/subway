# Requirements Current

Updated: 2026-05-25

## Current Priority

The project priority is now a polished, modern, demo-ready synthetic 3D mall digital twin before real video/data integrations. P7 must also include a major frontend redesign/refactor so the whole demo feels more grand, refined, elegant, and modern, not only the 3D canvas.

The system should first prove a premium digital twin demo using synthetic/self-authored data:

```text
3D mall model with refined visual quality
approved premium light fullscreen three-column cockpit based on /style-preview: 64px command header, 400px left macro/merchant panel, central 3D twin workspace, 400px right heat/alert panel, bottom timeline scrubber
major frontend visual refactor for a grand, refined, elegant, modern dashboard experience
virtual people and crowd simulation
human-adjustable fake-data controls
synthetic events that can be seeded, reset, appended, generated, persisted, and replayed
MySQL as the target persistence layer for synthetic demo data
clear extension boundary for later real-data adapters
```

## Required 3D Demo Capabilities

```text
self-authored synthetic mall with multiple floors, stores, corridors, atrium, escalators, elevators, entrances, kiosks, and hotspot zones
modern 3D/WebGL visual quality suitable for live demonstration and large-screen review
large-scale frontend redesign/refactor with elevated layout, visual hierarchy, typography, spacing, motion restraint, glass/depth effects where appropriate, and operational-dashboard readability
store/floor interaction including floor switching, store picking, labels, highlights, heatmap, flow, alerts, and score overlays
virtual people with configurable count, time, destination store, entry/exit, dwell, group movement, congestion, and anomaly behavior
scenario controls for crowd density, store popularity, event frequency, incident level, time range, replay speed, seed/reset, and append fake events
synthetic data persistence in MySQL-backed tables or clearly planned MySQL schema before real data is introduced
demo mode can be disabled and must not block later real-data integration
```

## Existing Baseline Scope

```text
operations overview
digital twin view, currently premium cockpit shell with SVG/2.5D spatial placeholder
store analysis
customer profile aggregates
store alerts
backend synthetic API contract
typed frontend API client
MySQL data-model baseline
AI event schema and local synthetic AI service fixture baseline
quality and handoff gates
```

## Current Non-Goals

```text
real mall production launch
real monitoring stream access
real video integration by default
real MySQL production query path
face recognition or identity recognition
individual trajectory display
use of real mall floor plans, real maps, BIM/CAD, real brand logos, merchant logos, or shop signs
paid cloud services, paid APIs, paid model services, paid assets, or account-bound external tools without approval
complex leasing recommendation
multi-tenant SaaS
```

## Compliance Red Lines

```text
no real monitoring footage
no face image storage
no personal trajectory display
no unauthorized mall floor plan
no real brands or merchant logos
no unknown-source model, dataset, image, video, font, model file, texture, copied code, or 3D asset
no paid development tool or paid cloud service without review
all assets, models, and dependencies must have traceable license records
```

## Current Handoff

P6-R1 updated the roadmap and context so the next workstream is P7 premium synthetic 3D digital twin demo. The `/style-preview` checkpoint confirmed the premium light three-column cockpit as the UI/UX target and archived the reusable prompt in `docs/design/P7_PREMIUM_UI_UX_REDESIGN_PLAN.md`. P7-I1 confirmed the 3D stack audit, P7-I2 productized the premium cockpit shell into `/digital-twin`, and P7-I3 introduced the smallest audited WebGL/Three.js scene shell while preserving SVG/2.5D fallback and mock/API behavior. P7-I4 should deepen the local synthetic scene adapter and store/floor interaction baseline without external assets. Real data processing remains deferred.
