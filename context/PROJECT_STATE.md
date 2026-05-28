# Project State

Updated: 2026-05-28

## Current Snapshot

The project is a course/demo commercial mall visual AI digital twin operations system. Current priority is a polished synthetic digital twin demo before real video/data integration.

The selected active frontend is the Next.js Digital Twin OS. Backend and AI services remain synthetic fixture baselines. P7-R8 self-authored five-floor ring mall generation and the temporary BlenderKit Mall Interior preview were both rejected visually and removed from the active workspace. The current digital twin viewport is back to the procedural Three/R3F scene with SVG fallback. WSL-to-Windows BlenderMCP connectivity is now configured and verified for controlled local synthetic modeling.

## Repository Baseline

```text
frontend/      Next.js App Router UI, mock/synthetic default, hybrid procedural Three/R3F + SVG twin viewport
backend/       FastAPI synthetic /api/v1 read endpoints, MySQL schema planning via SQLAlchemy/Alembic
ai-services/   Local OpenCV synthetic fixture service baseline
context/       Compact recovery package
docs/          Contracts, license/risk records, frontend/modeling specs
```

## Milestone Summary

```text
P0-P3: requirements, design, compliance, quality gate, CI/deployment planning
P4-P5: synthetic backend API and explicit frontend API-mode loaders
P6: anonymous aggregate AI event schema and synthetic AI fixture service
P7: audited web 3D stack and self-authored F2 GLB baseline
P7-R7: active frontend rebuilt as Next.js Digital Twin OS and old Vite surface removed
P7-R8: self-authored five-floor ring mall GLB generated, temporary BlenderKit reference preview integrated, then both removed after visual rejection
P8: store score MVP contract refined with synthetic aggregate inputs
```

## Current Gaps

```text
BlenderMCP tools may require a restarted/new Codex session after registration before they appear in the tool list
browser-level 3D render/performance tests are missing
real MySQL execution and production data adapters are not implemented
Docker Compose/production deployment is not implemented
```

## Boundaries

```text
MySQL remains the database direction
mock/synthetic mode remains default
real mall floor plans, BIM/CAD, maps, brands/logos, monitoring footage, face images, personal data, and individual trajectories are blocked
future dependencies/assets/models/textures/fonts/icons/copied code/external services require license/cost/account review
BlenderKit Mall Interior preview GLB has been removed from the active workspace; future visual work must avoid external models/textures/HDRIs unless separately approved and audited
BlenderMCP is allowed only for localhost synthetic geometry; telemetry and external asset/model-generation integrations remain disabled
```
