# Progress

Updated: 2026-05-28

## Current Snapshot

The selected frontend direction is the React + Next.js App Router Digital Twin OS on `main`. The obsolete Vite/React Router frontend surface and active dependency records have been removed. The project remains synthetic/mock-only; real mall material, real video, personal data, real MySQL, deployment infrastructure, downloaded assets, and external asset APIs are blocked unless explicitly approved.

Current next decision: P7-R8 Blender model generation is blocked until the user explicitly approves starting the self-authored five-floor ring mall GLB.

## Recent Increments

| Increment | Result | Verification |
| --- | --- | --- |
| WF-I1 context recovery and cleanup workflow simplification | Replaced duplicated long recovery instructions with a compact authority-set workflow, compressed active context files, added cleanup/retention rules, and generalized docs quality checks so future task cards are not tied to stale P7-R7 keywords. | `quality:docs`, `quality:compliance`, `quality:boundary`, frontend lint, and high-severity audit passed. |
| P7-R7c-6 workspace cleanup | Froze the Next.js frontend as the selected direction, removed obsolete Vite/React Router files and lockfile residue, cleaned current license records, restored current component type-check coverage, and merged to `main`. | Frontend lint/test/build, `quality:frontend`, docs/compliance/boundary, and high-severity audit passed; full root quality still timed out in backend pytest. |
| P7-R8-G1 approval gate task card stabilization | Added explicit P7-R8 approval gate fields and made generic continuation insufficient to start model generation. | `npm run quality:docs` passed. |

## Milestone Summary

| Phase | Summary |
| --- | --- |
| P0-P3 | Requirements, design, quality-gate, CI/deployment planning, compliance baselines, and recovery context established. |
| P4-P5 | Synthetic FastAPI `/api/v1` read endpoints and explicit frontend API-mode loaders added while mock mode remains default. |
| P6 | Anonymous aggregate AI event schema and local synthetic OpenCV fixture service added; real video remains blocked. |
| P7 pre-rebuild | Earlier premium 3D demo path added audited Three/R3F/Drei and self-authored F2 GLB baseline. |
| P7-R7 | Rebuilt the active frontend as a clean Next.js Digital Twin OS with URL state, overview/floor/store workspaces, compact inspector panels, calm color system, and synthetic 2D/3D hybrid viewport. |
| P8 | Store score MVP contract refined with deterministic synthetic aggregate inputs; backend score-readiness work is deferred. |

## Verification Snapshot

Latest known passing checks:

```text
npm --prefix frontend run lint
npm --prefix frontend run test: 81 tests
npm --prefix frontend run build
npm run quality:frontend
npm run quality:docs
npm run quality:compliance
npm run quality:boundary
npm run quality:audit: high-severity threshold passed; 2 known moderate PostCSS advisories through Next remain
npm --prefix frontend run lint
```

Known blocker:

```text
npm run quality was attempted with a 180s timeout after P7-R7c-6; docs/compliance/boundary/frontend passed, then backend pytest stopped producing output at backend/tests/test_health.py until timeout exited with code 124.
```

## Next Handoff

Human may enter `请进行下一步`. AI must read `AGENTS.md`, `context/TODO_NEXT.md`, `PROGRESS.md`, and `IMPORTANT.md`, then execute exactly one increment from the task card. Do not start P7-R8 model generation unless the user explicitly approves Blender/GLB generation.
