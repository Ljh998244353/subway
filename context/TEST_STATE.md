# Test State

Updated: 2026-05-28

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
```

## Current Test Assets

```text
frontend URL state and App Router navigation tests
frontend typography/color/layout regression tests
frontend mock/API-mode loader tests
NavGraph + A* pathing tests
frontend navigation/rendering source tests for the procedural Three/SVG hybrid viewport
frontend procedural mall spec tests for 3-floor mapping, atrium clearance, and storefront projection
backend health, migration, reference API, overview API tests
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
