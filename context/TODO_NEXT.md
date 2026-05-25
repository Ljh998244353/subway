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

The next major workstream is now a premium synthetic 3D mall digital twin demo before real video/data integrations.

## Task Card

```text
Increment: P7-I1 3D 技术栈、许可证审计和前端依赖基线确认
Primary role: Architect Mode
Auxiliary reviews: Frontend, Security/License, QA, Design
Human command: 请进行下一步
Status: ready after P6-R1 roadmap reprioritization
```

## Goal

Confirm the technical, frontend-design, and compliance foundation for a polished, modern, demo-ready 3D synthetic mall digital twin before writing 3D implementation code. P7 must include a major frontend redesign/refactor so the application becomes more grand, refined, elegant, and modern.

P7-I1 should decide and document:

```text
Blender is the confirmed free 3D modeling tool for the current mainline
Unity and Unreal Engine are not part of the current mainline; UE may be mentioned only as a later optional cinematic/local showcase branch
whether to use three / @react-three/fiber / @react-three/drei for Web rendering
license, commercial-use, cost, account, and redistribution status for each candidate dependency
whether the current frontend motion dependency baseline is consistent with imports
where the future 3D twin module boundary should live, likely frontend/src/twin/
how the 3D module will coexist with the current SVG /digital-twin page during incremental migration
how the P7 frontend redesign/refactor will upgrade the overall visual system, layout, typography, spacing, motion, and premium dashboard feel
which tests/checks must protect the first 3D scene and frontend redesign increments
```

## Non-goals

```text
do not implement the 3D scene yet
do not install unaudited dependencies
do not add paid tools, paid services, paid APIs, or paid assets
do not use real mall floor plans, BIM/CAD, maps, brand logos, tenant logos, shop signs, or scraped media
do not use real monitoring footage, face images, personal data, or individual trajectories
do not connect real MySQL or production data
do not resume real video integration unless a later task card explicitly changes priority
```

## Required Reading

```text
AGENTS.md
AGENT.md
README.md
AI_Schedule.md
PROGRESS.md
IMPORTANT.md
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
frontend/package.json
frontend/src/components/MotionSurface.tsx
frontend/src/pages/DigitalTwinPage.tsx
frontend/src/components/FloorPlan.tsx
frontend/src/pages/digitalTwinModel.ts
frontend/src/api/digitalTwinDataLoader.ts
```

## Likely Deliverables

```text
document Blender as the confirmed free 3D modeling tool and record Unity/UE as non-mainline
use `docs/design/P7_PREMIUM_UI_UX_REDESIGN_PLAN.md` as the local complete UI/UX redesign strategy baseline
document the P7 frontend redesign/refactor goal: grand, refined, elegant, modern, and still operationally readable
update docs/THIRD_PARTY_NOTICES.md and docs/LICENSE_AUDIT.md only if a dependency is actually adopted or formally recorded
update IMPORTANT.md and context/RISKS_AND_ASSUMPTIONS.md with 3D asset/dependency risk if needed
update context/ARCHITECTURE_CURRENT.md with frontend/src/twin/ module boundary
update context/FRONTEND_STATE.md with current SVG state and first 3D migration target
update context/TEST_STATE.md with checks for future 3D scene work
update PROGRESS.md and context/TODO_NEXT.md with the next small increment
```

## Acceptance Checks

```bash
npm run quality
npm run quality:audit
```

If P7-I1 stays documentation-only, the quality gate is still required unless an environment blocker is recorded in `PROGRESS.md` and `context/TEST_STATE.md`.

## Human Confirmation Gates

```text
before installing any 3D dependency
before adding any model, texture, font, icon, copied code, or external asset
before using any real mall material or brand material
before connecting real MySQL or real production data
before using real video or monitoring footage
before creating deployment infrastructure
```
