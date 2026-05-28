# TODO Next

Updated: 2026-05-28

## Task Card

```text
Increment: P7-R8 approval gate for self-authored multi-floor ring mall model
Primary role: Product Mode
Auxiliary reviews: Frontend, Architect, QA, Security/License
Human command: 请进行下一步
Status: waiting for explicit P7-R8 model-generation approval or a narrow frontend correction
```

## Goal

Record the human decision before starting P7-R8. If the user explicitly approves model generation, the next increment generates a self-authored five-floor ring mall GLB from `docs/P7_R8_MULTI_FLOOR_RING_MALL_MODELING_SPEC.md` and integrates it through the existing hybrid viewport/fallback contract. If not approved, continue only with narrow Next.js frontend review/polish.

## Deliverables

```text
one explicit approval or correction decision recorded
P7-R8 remains blocked unless approval wording clearly asks to start Blender/GLB generation
next increment stays synthetic/mock-only and license-audited
workflow context remains compact: TODO_NEXT one task, PROGRESS last 3 increments, context current facts only
```

## Non-goals

```text
do not start Blender model generation without explicit approval
do not use external asset APIs, downloaded models/textures/HDRIs, paid model services, or real mall material
do not use real floor plans, BIM/CAD, maps, brands/logos, surveillance footage, face images, personal data, or individual trajectories
do not connect real MySQL or production data
do not create deployment infrastructure
```

## Minimum Working Set

```text
AGENTS.md
PROGRESS.md
IMPORTANT.md
context/TODO_NEXT.md
context/PROJECT_STATE.md
context/FRONTEND_STATE.md
context/TEST_STATE.md
context/RISKS_AND_ASSUMPTIONS.md
docs/P7_R8_MULTI_FLOOR_RING_MALL_MODELING_SPEC.md
frontend/src/components/twin-engine/
frontend/tests/
```

Open license docs only if dependencies/assets/tools change. Open broader roadmap or API/data docs only if the requested increment changes those contracts.

## Acceptance Checks

```text
npm run quality:docs
npm run quality:compliance
npm run quality:boundary
npm --prefix frontend run lint
npm run quality:audit
```

If a full `npm run quality` is attempted and backend pytest hangs at `backend/tests/test_health.py`, record the timeout and the already-passed stages.

## Human Confirmation Gates

```text
P7-R8 cannot start unless the user explicitly approves Blender model generation.
Generic continuation commands such as "继续" or "请进行下一步" are not approval.
Approval wording examples: "批准启动 P7-R8", "开始 Blender 五层模型", "开始生成五层 ring mall GLB".
```

## Next Handoff

```text
Please review the current Next.js /digital-twin frontend direction.
If approved, explicitly approve P7-R8 Blender model generation.
Otherwise, provide the next frontend correction to make before modeling.
```
