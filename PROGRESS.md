# Progress

Updated: 2026-06-09

## Current Snapshot

The selected frontend direction is the React + Next.js App Router Digital Twin OS on `main`. The temporary BlenderKit Mall Interior reference preview and the rejected five-floor GLB modeling attempt have been removed from the active frontend. `/digital-twin` still defaults to the stricter project-owned procedural Three/R3F mall shell with SVG fallback. A self-authored Blender review prototype exists at `assets/blender/mall_exploded_three_layer_prototype.blend`, exported GLB `frontend/public/models/mall_exploded_three_layer_prototype.glb`, and preview render `assets/blender/mall_exploded_three_layer_preview0001.png`. It has been restored to the earlier three-layer blue exploded slab direction after the rejected elliptical-ring refinement, with 3 floor roots, 70 generic store meshes, 7 transparent core groups, 6 floor escalator groups, 4 cross-floor escalator bridges, synthetic signs, and procedural materials. The GLB is now available only through an explicit frontend review mode (`model=prototype`); the default remains `model=procedural`. The project remains synthetic/mock-only; real mall material, real video, personal data, real MySQL, deployment infrastructure, external 3D assets, and unapproved external asset APIs remain blocked.

The command bar now includes a 2D/3D viewport toggle. Clicking "2D" switches to the SVG floorplan view; clicking "3D" returns to the Three/R3F procedural shell. The viewport state is persisted in the URL (`viewport=2d|3d`) and the legacy `?svg=1` param is still supported as a fallback.

Current next decision: P10-I2 adds backend/.env loading and a local LLM smoke path. Real LLM calls remain opt-in through backend/.env; current local placeholder has no key and returns disabled/config-missing until the user fills it.

## Recent Increments

| Increment | Result | Verification |
| --- | --- | --- |
| P10-I2 local LLM proxy smoke preparation | Added backend `.env` loading, an ignored local `backend/.env` placeholder for the user-filled key, and `scripts/smoke_store_advice_llm.py` for synthetic advice endpoint smoke checks. | `backend\.venv\Scripts\python.exe -m pytest backend\tests\test_advice_api.py` passed 6 tests; `python -B scripts\smoke_store_advice_llm.py` returned disabled/rule advice with local `.env` loaded and no key configured. |
| P10-I1 store management advice and LLM key placeholder | Added synthetic rule-based store management advice, overview/store advice panels, backend `POST /api/v1/advice/store-management` LLM proxy placeholder, `.env` key safeguards, and `docs/STORE_MANAGEMENT_ADVICE_MVP.md`. | `npm --prefix frontend run lint`; `npm --prefix frontend run test` passed 94 tests; `npm --prefix frontend run build` passed with known SWC wasm fallback warning; backend advice/reference/migration tests passed 35 tests; docs/compliance/boundary/audit passed. |
| P9-I7 analytics readiness review | Closed P9 with `docs/P9_ANALYTICS_READINESS_REVIEW.md`, documenting completed synthetic analytics scope, mode/replay linkage, verification, no-go boundaries, deferred real-data/API/persistence work, and the post-P9 handoff. | `npm run quality:docs`; `npm run quality:compliance`; `npm run quality:boundary`; `npm run quality:audit` passed with the known 2 moderate PostCSS advisories. |

## Milestone Summary

| Phase | Summary |
| --- | --- |
| P0-P3 | Requirements, design, quality-gate, CI/deployment planning, compliance baselines, and recovery context established. |
| P4-P5 | Synthetic FastAPI `/api/v1` read endpoints and explicit frontend API-mode loaders added while mock mode remains default. |
| P6 | Anonymous aggregate AI event schema and local synthetic OpenCV fixture service added; real video remains blocked. |
| P7 pre-rebuild | Earlier premium 3D demo path added audited Three/R3F/Drei and self-authored F2 GLB baseline. |
| P7-R7 | Rebuilt the active frontend as a clean Next.js Digital Twin OS with URL state, overview/floor/store workspaces, compact inspector panels, calm color system, and synthetic 2D/3D hybrid viewport. |
| P7-R8 | First self-authored five-floor ring mall GLB generated, then temporary BlenderKit Mall Interior reference preview integrated for visual review. Both were later removed after visual rejection; the active viewport is now a stricter project-owned procedural mall shell. V5 implemented the first detailed synthetic F1 SVG floorplan base with 21 store units, escalators, elevators, restrooms, fire stairs, and entrance markers, ready for overlay systems. |
| P8 | Store score MVP contract refined with deterministic synthetic aggregate inputs; backend score-readiness work is deferred. |
| P9 | Synthetic analytics cockpit completed with aggregate snapshot, mode-aware insights, replay context linkage, runtime smoke coverage, and readiness review. |
| P10 | Store management advice started with deterministic synthetic operating recommendations and a backend-only OpenAI-compatible LLM key placeholder. |

## Verification Snapshot

Latest known passing checks:

```text
node frontend/node_modules/typescript/bin/tsc --noEmit --pretty false --incremental false
npm --prefix frontend run lint
npm --prefix frontend run test: 87 tests
npm --prefix frontend run build
npm run quality:docs
npm run quality:compliance
npm run quality:boundary
npm run quality:audit: high-severity threshold passed; 2 known moderate PostCSS advisories through Next remain
Active `/digital-twin` viewport default: constrained procedural Three/R3F mall shell; explicit `model=prototype` GLB review mode exists
SVG fallback viewport: detailed synthetic F1 floorplan with 21 store units, escalators, elevators, restrooms, fire stairs, service rooms, entrances
Archived F1 2D prompt/spec: `docs/design/P7_F1_SYNTHETIC_2D_FLOORPLAN_PROMPT.md`
Windows BlenderMCP bridge: WSL protocol probe passed against `127.0.0.1:9876`; Codex MCP server `blender` registered, but newly registered MCP tools require a new/restarted Codex session to appear.
Three-layer Blender prototype: restored separated-slab version with escalator enhancement only; `.blend` 434KB, GLB 3.7MB, preview PNG 1.7MB.
Safe GLB review mode: `/digital-twin?model=prototype&viewport=3d` loads the self-authored prototype; default `/digital-twin` remains procedural.
Synthetic scenario controls: frontend-only density/speed/incident state now affects 3D heat, flow, alert emphasis, and viewport readouts.
SVG scenario parity: 2D fallback now mirrors the same synthetic density, speed, and incident emphasis in heat/flow/alert modes.
Runtime smoke: scenario-sensitive 2D/3D/prototype routes and the self-authored GLB asset returned 200 over local HTTP.
URL-restorable scenarios: synthetic density, speed, and incident controls now round-trip through URL state and hydrate the client store.
URL scenario smoke: representative scenario URLs returned 200 for 2D, procedural 3D, prototype, invalid fallback, and store-level paths.
Scenario share affordance: command bar can copy or open the current URL-restorable synthetic scenario link.
Scenario share smoke: local runtime response contains copy/open labels and scenario params for a shared 2D surge alert link.
P8 ranking filters: backend and frontend client support fixture-backed score/ranking filters without persistence.
P8 score board filters: frontend mock-mode ranking now has compact filter controls aligned with the P8-I3 query dimensions.
P8 score filter smoke: score mode SSR response includes the score-board filter labels.
P8 persistence boundary: future fake/demo score persistence should target `store_score_stat.breakdown_json` first; no new table yet.
P8 mapping tests: score aggregate fixtures can serialize to the future `breakdown_json` payload without blocked real-data fields.
P8 readiness: store score MVP is ready enough for P9 synthetic analytics work; real persistence remains deferred.
P9 analytics snapshot: overview cockpit now surfaces customer, heat, flow, and score aggregate signals.
P9 snapshot smoke: overview SSR response includes the P9 snapshot and privacy markers.
P9 mode-aware insight: analytics snapshot now changes interpretation for heatmap, flow, score, and alerts.
P9 mode smoke: heatmap/flow/score/alerts routes return the expected active insight markers.
P9 replay context: analytics snapshot reads scrubber time, scenario speed, and density from the existing client store.
P9 replay smoke: overview SSR response includes replay context markers and analytics snapshot title.
P9 readiness: synthetic analytics scope is closed in docs/P9_ANALYTICS_READINESS_REVIEW.md; real data, APIs, MySQL persistence, deployment, and external assets remain deferred.
P9 final documentation gates: docs/compliance/boundary/audit passed.
P10 advice: overview and store workspaces now expose synthetic store management recommendations; backend LLM proxy placeholder stays disabled until backend/.env is configured.
P10 verification: frontend lint/test/build, backend advice/reference/migration tests, and docs/compliance/boundary/audit passed.
```

Known blocker:

```text
Next build/dev currently emits `@next/swc-win32-x64-msvc ... is not a valid Win32 application`; Next falls back to cached wasm bindings and build/dev still pass. In-app Browser automation is unavailable because the installed Browser plugin cache lacks `scripts/browser-client.mjs`; visual screenshot review remains pending.
```

## Next Handoff

Next recommended increment is to fill `backend/.env` with the local GPT proxy key/model if real LLM testing is desired, then run `python -B scripts/smoke_store_advice_llm.py`.
