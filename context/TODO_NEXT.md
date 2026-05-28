# TODO Next

Updated: 2026-05-28

## Task Card

```text
Increment: P7-R8 approval gate for self-authored multi-floor ring mall model
Primary role: Product Mode
Auxiliary reviews: Frontend, Design, Architect, QA, Security/License
Human command: 请进行下一步
Status: P7-R7c-6 workspace cleanup in progress/completed for selected Next.js frontend; P7-R8 Blender modeling is blocked until explicit human approval
```

## Goal

Ask for and record the human decision on whether to start P7-R8. If approved, the next implementation increment will generate a self-authored five-floor ring mall GLB from the saved modeling specification and integrate it through the existing hybrid viewport/fallback contract. If not approved, continue frontend review/polish only.

## Deliverables

```text
P7-R8 approval gate remains explicit and auditable.
The next task card includes the required Goal, Non-goals, Required Reading, Deliverables, Acceptance Checks, and Human Confirmation Gates fields.
Generic continuation commands such as "继续" or "请进行下一步" remain insufficient to start Blender model generation.
The human review prompt clearly asks for either explicit P7-R8 approval or the next frontend correction before modeling.
No code, dependency, model, asset, data source, external service, real MySQL connection, or deployment infrastructure change is included in this gate.
P7-R7c-6 freezes the selected Next.js frontend direction and removes obsolete Vite/React Router files, dependency records, and misleading current-state documentation.
```

## Completed Frontend Review Result

```text
P7-R7c-5 stabilized the active Next.js Digital Twin OS.
/ now returns an HTTP 307 Temporary Redirect to /digital-twin through next.config.mjs.
The root loading screen now matches the command-bar + viewport + inspector workspace.
The digital-twin parallel-route loading slot is neutral and no longer nests a full workspace skeleton inside viewport/inspector slots.
The old three-column rounded loading skeleton contract is covered by regression tests.
Local production service check used http://127.0.0.1:3002.
Checked routes: /, /digital-twin, /digital-twin/F2?mode=flow&flowScope=inbound, /digital-twin/store/S045?mode=score&flowScope=outbound.
No new dependency, asset, data source, model, texture, font, icon pack, real MySQL connection, or deployment infrastructure was added.
```

## Acceptance Checks Already Run

```text
npm --prefix frontend run lint: passed
npm --prefix frontend run test: passed, 81 tests
npm --prefix frontend run build: passed using next build --webpack
npm run quality:frontend: passed
npm run quality:audit: passed with high-severity threshold after network approval; npm reports 2 known moderate PostCSS advisories through Next
npm run quality: attempted; docs/compliance/boundary/frontend stages passed, then backend pytest again stopped producing output at backend/tests/test_health.py; exact stuck quality-gate and pytest processes were terminated
npm run quality:docs: passed after this approval-gate task-card stabilization
npm --prefix frontend run lint: passed after removing obsolete tsconfig excludes and restoring current component type-check coverage
```

## Human Confirmation Gates

```text
P7-R8 cannot start unless the user explicitly approves starting Blender model generation.
Do not treat a generic "继续" as approval to start P7-R8 unless the user clearly confirms model generation.
Approval wording examples: "批准启动 P7-R8", "开始 Blender 五层模型", "开始生成五层 ring mall GLB".
```

## If Approved: Next Implementation Scope

```text
Increment: P7-R8-1 self-authored five-floor ring mall GLB generation and viewport integration
Primary role: Frontend Mode with Architect/QA/Security-License review
Files likely to change:
- scripts/blender/export_mall_digital_twin.py
- frontend/public/models/mall_digital_twin.glb
- assets/blender/mall_digital_twin.blend
- frontend/src/components/twin-engine/
- frontend/tests/
- docs/THIRD_PARTY_NOTICES.md
- docs/LICENSE_AUDIT.md
- context/*.md
- PROGRESS.md
Checks:
- GLB exists and is under 8MB
- object names match docs/P7_R8_MULTI_FLOOR_RING_MALL_MODELING_SPEC.md
- npm --prefix frontend run lint
- npm --prefix frontend run test
- npm --prefix frontend run build
- npm run quality:frontend
- npm run quality:audit
```

## Non-goals And Boundaries

```text
do not use Sketchfab, Poly Haven, Hyper3D, Hunyuan3D, Rodin, Fal, paid model services, external asset APIs, downloaded models, external textures, or HDRIs
do not use real mall floor plans, BIM/CAD, maps, brand logos, tenant logos, real shop signs, or scraped media
do not use real monitoring footage, face images, personal data, or individual trajectories
do not connect real MySQL or production data
do not create deployment infrastructure
keep mock/synthetic fixture mode; do not switch to real persistence
```

## Required Reading

```text
AGENTS.md
AGENT.md
CLAUDE.md
PROGRESS.md
IMPORTANT.md
docs/P7_R7_ENTERPRISE_NEXT_DIGITAL_TWIN_FRONTEND_SPEC.md
docs/P7_R8_MULTI_FLOOR_RING_MALL_MODELING_SPEC.md
docs/THIRD_PARTY_NOTICES.md
docs/LICENSE_AUDIT.md
context/PROJECT_STATE.md
context/ARCHITECTURE_CURRENT.md
context/FRONTEND_STATE.md
context/TEST_STATE.md
context/RISKS_AND_ASSUMPTIONS.md
context/TODO_NEXT.md
frontend/README.md
frontend/package.json
frontend/src/app/
frontend/src/components/dashboard/
frontend/src/components/twin-engine/
frontend/src/lib/
frontend/tests/
scripts/quality-gate.mjs
```

## Human Review Prompt

```text
Please review the stabilized frontend at /digital-twin and the recorded P7-R7c-5 results.
If the frontend direction is approved, explicitly approve starting P7-R8 Blender model generation.
Otherwise, provide the next frontend correction to make before modeling.
```
