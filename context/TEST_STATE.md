# Test State

Updated: 2026-06-01

## Latest Verification

```text
npm --prefix frontend run lint: passed
npm --prefix frontend run test: passed, 84 tests before P7-R8-V3; passed, 84+ procedural mall spec coverage after P7-R8-V3
npm --prefix frontend run build: passed
npm --prefix frontend run lint: first rerun during concurrent build failed because `.next/types` files were temporarily missing while Next rewrote build output; rerun after build is required for a clean final lint gate
npm run quality:frontend: passed
npm run quality:docs: passed
npm run quality:compliance: passed
npm run quality:boundary: passed
npm run quality:docs initially failed during P7-R8-V3 because `context/TODO_NEXT.md` missed the required literal phrase `one task`; documentation was then updated to satisfy the task-card cleanup gate
npm run quality:audit: passed after network approval; high-severity threshold passed
P7-R8 BlenderKit reference preview was removed after visual rejection; active viewport is back to the procedural scene and no longer requests `/models/blenderkit_mall_reference.glb`
npm run quality: attempted with 180s timeout; docs/compliance/boundary/frontend passed, backend pytest hung at backend/tests/test_health.py and timed out with code 124
WF-I1 workflow simplification checks: npm run quality:docs passed; npm run quality:compliance passed; npm run quality:boundary passed; npm --prefix frontend run lint passed; npm run quality:audit passed after network approval with the known 2 moderate PostCSS advisories
P7-R8-V4 prompt archival increment is documentation-only; required checks are docs/compliance/boundary, with frontend/runtime checks optional because no runtime code path changed
P7-R8-V6 BlenderMCP WSL bridge setup: `python3 -m py_compile scripts/blender/probe_blender_mcp.py` passed; `bash -n scripts/blender/run_blender_mcp_server.sh` passed; local TCP probe with telemetry disabled returned `get_scene_info` from Windows BlenderMCP on `127.0.0.1:9876`; `timeout 3 scripts/blender/run_blender_mcp_server.sh` connected to Blender on startup outside the restricted command sandbox; `codex mcp list/get blender` showed the global server registration
P7-R8-V7 prototype: Python compile passed for BlenderMCP executor, prototype generator, and inspector; BlenderMCP execution returned `prototype_audit floor_count=3 store_meshes=70 core_groups=7 object_count=391`; Windows Blender background inspection returned `objects=390 materials=15 floors=3 stores=70 cores=7 slabs_or_edges=66`; GLB export and PNG preview render succeeded
P7-R8-V8 restore with escalators only: Python compile passed for BlenderMCP executor, prototype generator, and inspector; BlenderMCP probe passed with telemetry disabled; BlenderMCP generation returned `prototype_audit floor_count=3 store_meshes=70 core_groups=7 floor_escalators=6 escalator_bridges=4 object_count=706`; Windows Blender background inspection returned `objects=706 materials=18 floors=3 stores=70 cores=7 floor_escalators=6 escalator_bridges=4 slabs_or_edges=60`; GLB export and PNG preview render succeeded; `npm run quality:docs`, `npm run quality:compliance`, and `npm run quality:boundary` passed
P7-R8-V9 safe GLB prototype review mode: `node frontend/node_modules/typescript/bin/tsc --noEmit --pretty false --incremental false` passed; `npm --prefix frontend run test` passed 87 tests; `npm run quality:docs`, `npm run quality:compliance`, `npm run quality:boundary`, and `npm run quality:audit` passed the required gates. `npm run lint` could not run because interrupted `npm ci` left no `.bin/tsc`; direct TypeScript check is the equivalent validation for this run. `node frontend/node_modules/next/dist/bin/next build --webpack` timed out after partial `.next` generation and should be retried after clean dependency installation.
P7-R8-V10 browser/runtime review: `npm --prefix frontend run lint` passed; `npm --prefix frontend run test` passed 87 tests; `npm --prefix frontend run build` passed; runtime HTTP checks returned 200 for default `/digital-twin`, `/digital-twin?viewport=2d`, `/digital-twin?model=prototype&viewport=3d`, and `/models/mall_exploded_three_layer_prototype.glb`; GLB served as 3,813,512-byte `model/gltf-binary`. Next dev/build still logs a native SWC package warning but succeeds with wasm fallback. In-app browser screenshot automation was blocked because the Browser plugin cache is missing `scripts/browser-client.mjs`.
P7-R8-V11 prototype review UI polish: `npm --prefix frontend run lint` passed; `npm --prefix frontend run test` passed 87 tests; `npm --prefix frontend run build` passed; `npm run quality:docs`, `npm run quality:compliance`, `npm run quality:boundary`, and `npm run quality:audit` passed. The first audit attempt failed with npm registry `ECONNRESET`; retry passed with known 2 moderate PostCSS advisories.
P7-R8-V12 synthetic scenario controls: `npm --prefix frontend run lint` passed; `npm --prefix frontend run test` passed 87 tests; `npm --prefix frontend run build` passed; `npm run quality:docs`, `npm run quality:compliance`, `npm run quality:boundary`, and `npm run quality:audit` passed with known 2 moderate PostCSS advisories.
P7-R8-V13 scenario-driven overlay emphasis: `npm --prefix frontend run lint` passed; `npm --prefix frontend run test` passed 87 tests; `npm --prefix frontend run build` passed with the known local `@next/swc-win32-x64-msvc` warning and wasm fallback; `npm run quality:docs`, `npm run quality:compliance`, `npm run quality:boundary`, and `npm run quality:audit` passed with known 2 moderate PostCSS advisories.
P7-R8-V14 SVG scenario parity: `npm --prefix frontend run lint` passed; `npm --prefix frontend run test` passed 87 tests; `npm --prefix frontend run build` passed with the known local `@next/swc-win32-x64-msvc` warning and wasm fallback; `npm run quality:docs`, `npm run quality:compliance`, `npm run quality:boundary`, and `npm run quality:audit` passed with known 2 moderate PostCSS advisories.
P7-R8-V15 scenario runtime smoke pass: local Next dev server on `127.0.0.1:3020` reached ready in 35.2s with the known SWC wasm fallback warning. HTTP checks returned 200 for `/digital-twin` after warm retry, `/digital-twin?viewport=2d&mode=heatmap`, `/digital-twin?viewport=2d&mode=flow`, `/digital-twin?viewport=2d&mode=alerts`, `/digital-twin?viewport=3d&mode=heatmap`, `/digital-twin?viewport=3d&mode=flow`, `/digital-twin?viewport=3d&mode=alerts`, `/digital-twin?model=prototype&viewport=3d`, and `/models/mall_exploded_three_layer_prototype.glb` with 3,813,512 bytes. Dev server was stopped and temporary smoke logs were removed.
P7-R8-V16 URL-restorable scenario presets: `npm --prefix frontend run lint` passed; `npm --prefix frontend run test` passed 88 tests; `npm --prefix frontend run build` passed with the known local `@next/swc-win32-x64-msvc` warning and wasm fallback; `npm run quality:docs`, `npm run quality:compliance`, `npm run quality:boundary`, and `npm run quality:audit` passed with known 2 moderate PostCSS advisories.
P7-R8-V17 scenario URL runtime smoke pass: local Next dev server on `127.0.0.1:3021` returned 200 for `/digital-twin?viewport=2d&mode=alerts&density=surge&speed=2&incident=3`, `/digital-twin?viewport=3d&mode=flow&density=baseline&speed=0.5&incident=0`, `/digital-twin?model=prototype&viewport=3d&density=surge&speed=2&incident=3`, `/digital-twin?density=bad&speed=4&incident=9`, and `/digital-twin/store/S042?view=store&floorId=F2&storeId=S042&mode=flow&flowScope=inbound&viewport=2d&model=procedural&density=baseline&speed=0.5&incident=0`. Each response contained `density`, `speed`, `incident`, and `digital-twin` markers. Dev server was stopped and temporary logs were removed.
P7-R8-V18 scenario share affordance: `npm --prefix frontend run lint` passed; `npm --prefix frontend run test` passed 88 tests; `npm --prefix frontend run build` passed with the known local `@next/swc-win32-x64-msvc` warning and wasm fallback; `npm run quality:docs`, `npm run quality:compliance`, `npm run quality:boundary`, and `npm run quality:audit` passed with known 2 moderate PostCSS advisories.
P7-R8-V19 scenario share runtime smoke pass: local Next dev server on `127.0.0.1:3022` returned 200 for `/digital-twin?viewport=2d&mode=alerts&density=surge&speed=2&incident=3`; response length was 91,668 bytes and contained `澶嶅埗鍦烘櫙閾炬帴`, `鎵撳紑鍦烘櫙`, `density`, `speed`, `incident`, and `digital-twin` markers. Dev server was stopped and temporary logs were removed.
P8-I3 store score filter readiness: `backend\.venv\Scripts\python.exe -m pytest backend\tests\test_reference_api.py` passed 25 tests; `backend\.venv\Scripts\python.exe -m pytest backend\tests\test_migrations.py backend\tests\test_reference_api.py` passed 29 tests; `npm --prefix frontend run test` passed 89 tests; `npm --prefix frontend run lint` passed after rerunning separately from `next build`; `npm --prefix frontend run build` passed with the known local `@next/swc-win32-x64-msvc` warning and wasm fallback. Global `python -m pytest` is not usable in this environment because the global Python lacks pytest; use `backend\.venv\Scripts\python.exe`.
P8-I4 frontend score filter controls: `npm --prefix frontend run lint` passed; `npm --prefix frontend run test` passed 89 tests; `npm --prefix frontend run build` passed with the known local `@next/swc-win32-x64-msvc` warning and wasm fallback; `npm run quality:docs`, `npm run quality:compliance`, `npm run quality:boundary`, and `npm run quality:audit` passed with known 2 moderate PostCSS advisories.
P8-I5 score filter runtime smoke pass: local Next dev server on `127.0.0.1:3023` returned 200 for `/digital-twin?mode=score`; response length was 66,856 bytes and contained `璇勫垎姒滄ゼ灞傜瓫閫塦, `璇勫垎姒滀笟鎬佺瓫閫塦, `璇勫垎姒滆瘎绾х瓫閫塦, `璇勫垎姒滄渶浣庡垎绛涢€塦, and `璧勪骇搴楅摵璇勫垎澶╂姒渀. Empty-state copy is static-test covered but not present in the default unfiltered SSR response. Dev server was stopped and temporary logs were removed. `npm --prefix frontend run build` passed after the compact-filter fix.
P8-I6 synthetic score persistence boundary: documentation-only; required checks are `npm run quality:docs`, `npm run quality:compliance`, and `npm run quality:boundary`.
P8-I7 score breakdown mapping tests: `backend\.venv\Scripts\python.exe -m pytest backend\tests\test_reference_api.py` passed 26 tests; `backend\.venv\Scripts\python.exe -m pytest backend\tests\test_migrations.py backend\tests\test_reference_api.py` passed 30 tests.
P9-I1 synthetic analytics snapshot: `npm --prefix frontend run lint` passed; `npm --prefix frontend run test` passed 89 tests; `npm --prefix frontend run build` passed with the known local `@next/swc-win32-x64-msvc` warning and wasm fallback.
P9-I2 analytics snapshot runtime smoke pass: local Next dev server on `127.0.0.1:3024` returned 200 for `/digital-twin`; response length was 69,477 bytes and contained `缁煎悎浣撳垎鏋愬揩鐓, `P9 Synthetic Analytics`, `Mock`, `鍖垮悕鑱氬悎蹇収`, and `涓嶅惈浜鸿劯`. Dev server was stopped and temporary logs were removed.
P9-I3 mode-aware analytics snapshot: `npm --prefix frontend run lint` passed; `npm --prefix frontend run test` passed 89 tests; `npm --prefix frontend run build` passed with the known local `@next/swc-win32-x64-msvc` warning and wasm fallback.
P9-I4 mode-aware analytics runtime smoke pass: local Next dev server on `127.0.0.1:3025` returned 200 for `/digital-twin?mode=heatmap`, `/digital-twin?mode=flow`, `/digital-twin?mode=score`, and `/digital-twin?mode=alerts`; each response contained `缁煎悎浣撳垎鏋愬揩鐓 and the expected mode label (`鐑尯瑙ｉ噴`, `鍔ㄧ嚎瑙ｉ噴`, `璇勫垎瑙ｉ噴`, `鍛婅瑙ｉ噴`). Dev server was stopped and temporary logs were removed.
P9-I5 replay-aware analytics snapshot: `npm --prefix frontend run lint` passed; `npm --prefix frontend run test` passed 89 tests; `npm --prefix frontend run build` passed with the known local `@next/swc-win32-x64-msvc` warning and wasm fallback.
P9-I6 replay-aware analytics runtime smoke pass: local Next dev server on `127.0.0.1:3026` returned 200 for `/digital-twin`; response length was 69,965 bytes and contained `鍥炴斁涓婁笅鏂嘸, `14:30`, `1x`, `peak`, and `缁煎悎浣撳垎鏋愬揩鐓. Dev server was stopped and temporary logs were removed.
P8-I8 store score readiness review: documentation-only; required checks are docs/compliance/boundary/audit.
P9-I7 analytics readiness review: documentation-only; `npm run quality:docs`, `npm run quality:compliance`, `npm run quality:boundary`, and `npm run quality:audit` passed with the known 2 moderate PostCSS advisories.`nP10-I1 store management advice: frontend lint passed; frontend tests passed 94 tests; frontend build passed with known SWC wasm fallback warning; backend advice/reference/migration tests passed 35 tests; docs/compliance/boundary/audit passed with known 2 moderate PostCSS advisories.
P10-I2 local LLM smoke: advice API tests passed 6 tests; `scripts/smoke_store_advice_llm.py` returned HTTP 200, status disabled, source rule, llmEnabled true, llmConfigured false, itemCount 4 with ignored local backend/.env loaded and no key configured.
```

## Current Test Assets

```text
frontend URL state and App Router navigation tests
URL-restorable frontend-only scenario state tests
frontend typography/color/layout regression tests
frontend mock/API-mode loader tests
NavGraph + A* pathing tests
frontend navigation/rendering source tests for the procedural Three/SVG hybrid viewport
frontend score-board filter source tests
frontend procedural mall spec tests for 3-floor mapping, atrium clearance, and storefront projection
backend health, migration, reference API, overview API tests
backend ranking filter tests for fixture-backed score board readiness
ai-services synthetic fixture and event schema tests
root quality-gate and audit scripts
design/prompt archive documentation for future synthetic F1 SVG floorplan generation
self-authored three-layer exploded mall `.blend`, GLB, preview PNG, and Blender inspection scripts
```

## Known Gaps

```text
backend pytest currently hangs in the full root quality gate at backend/tests/test_health.py in this environment
no live frontend/backend browser integration test
no browser E2E or screenshot regression gate
no browser-level 3D FPS/render instrumentation or screenshot regression for the procedural viewport yet
no browser-level screenshot review yet for `model=prototype` GLB review mode because the Browser plugin cache is missing its client script; V15 covered local HTTP route availability only
newly registered Blender MCP tools may require a new/restarted Codex session to become available
no real MySQL migration execution test
no Docker Compose startup test
```

## Required Checks By Increment Type

```text
workflow/docs: npm run quality:docs, npm run quality:compliance, npm run quality:boundary
frontend: npm --prefix frontend run lint, npm --prefix frontend run test, npm --prefix frontend run build, npm run quality:frontend
dependencies/assets: npm run quality:audit plus license docs
backend: backend/.venv/bin/python -m pytest backend/tests, unless the known health-test hang blocks it
```
