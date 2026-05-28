# Progress

Updated: 2026-05-28

## Current Snapshot

The selected frontend direction is the React + Next.js App Router Digital Twin OS on `main`. The temporary BlenderKit Mall Interior reference preview and the rejected five-floor GLB modeling attempt have been removed from the active frontend. `/digital-twin` still uses the stricter project-owned procedural Three/R3F mall shell with SVG fallback. A self-authored Blender review prototype exists at `assets/blender/mall_exploded_three_layer_prototype.blend`, exported GLB `frontend/public/models/mall_exploded_three_layer_prototype.glb`, and preview render `assets/blender/mall_exploded_three_layer_preview0001.png`. It has been restored to the earlier three-layer blue exploded slab direction after the rejected elliptical-ring refinement, with 3 floor roots, 70 generic store meshes, 7 transparent core groups, 6 floor escalator groups, 4 cross-floor escalator bridges, synthetic signs, and procedural materials. The GLB is not yet wired into the active frontend. The project remains synthetic/mock-only; real mall material, real video, personal data, real MySQL, deployment infrastructure, external 3D assets, and unapproved external asset APIs remain blocked.

The command bar now includes a 2D/3D viewport toggle. Clicking "2D" switches to the SVG floorplan view; clicking "3D" returns to the Three/R3F procedural shell. The viewport state is persisted in the URL (`viewport=2d|3d`) and the legacy `?svg=1` param is still supported as a fallback.

Current next decision: visually review the exported three-layer prototype and either polish it in Blender or integrate it behind a safe frontend review flag.

## Recent Increments

| Increment | Result | Verification |
| --- | --- | --- |
| P7-R8-V8 restore slab prototype with escalators only | Reverted the rejected F2/F3 elliptical-ring refinement in the Blender generator and regenerated the model as the earlier three-layer separated-slab prototype. Kept the requested escalator enhancement only: 6 named floor escalator groups plus 4 named cross-floor escalator bridges. The restored review artifact remains synthetic and is still not integrated into the active frontend. | `python3 -m py_compile scripts/blender/create_exploded_mall_prototype.py scripts/blender/inspect_exploded_mall_prototype.py scripts/blender/execute_blender_mcp_code.py scripts/blender/probe_blender_mcp.py`; BlenderMCP execution returned `prototype_audit floor_count=3 store_meshes=70 core_groups=7 floor_escalators=6 escalator_bridges=4 object_count=706`; Windows Blender background inspection returned `objects=706 materials=18 floors=3 stores=70 cores=7 floor_escalators=6 escalator_bridges=4 slabs_or_edges=60`; GLB export and preview render succeeded; `npm run quality:docs`; `npm run quality:compliance`; `npm run quality:boundary` |
| P7-R8-V7 controlled BlenderMCP three-layer mall prototype | Created a self-authored Blender Python modeling pipeline for the reference-style three-layer blue exploded mall. Generated `.blend`, exported a 3.4MB GLB, and rendered a PNG preview. The model uses synthetic procedural geometry only: 3 separated slabs, 70 generic store meshes, 7 transparent vertical core groups, atrium rings, edge lights, abstract escalators, camera, and lighting. It is not yet integrated into the active frontend. | `python3 -m py_compile scripts/blender/execute_blender_mcp_code.py scripts/blender/create_exploded_mall_prototype.py scripts/blender/inspect_exploded_mall_prototype.py`; BlenderMCP execution returned `prototype_audit floor_count=3 store_meshes=70 core_groups=7`; Windows Blender background inspection returned `objects=390 materials=15 floors=3 stores=70 cores=7`; GLB export succeeded; preview render succeeded |
| P7-R8-V6 BlenderMCP WSL bridge setup | Added `scripts/blender/probe_blender_mcp.py`, `scripts/blender/run_blender_mcp_server.sh`, and `docs/BLENDER_MCP_WSL_SETUP.md`. Created ignored `.venv-blender-mcp`, installed local `L:\Software\blender-mcp` server dependencies, registered Codex global MCP server `blender`, and verified WSL can send `get_scene_info` to Windows BlenderMCP on `127.0.0.1:9876`. Telemetry and external asset/model-generation integrations remain disabled by environment and project policy. | `python3 -m py_compile scripts/blender/probe_blender_mcp.py`, `bash -n scripts/blender/run_blender_mcp_server.sh`, `python3 scripts/blender/probe_blender_mcp.py` with telemetry disabled and local TCP approval, `timeout 3 scripts/blender/run_blender_mcp_server.sh` with local TCP approval, `codex mcp list`, `codex mcp get blender` |

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

## Verification Snapshot

Latest known passing checks:

```text
npm --prefix frontend run lint
npm --prefix frontend run test: 84 tests
npm --prefix frontend run build
npm run quality:frontend
npm run quality:docs
npm run quality:compliance
npm run quality:boundary
npm run quality:audit: high-severity threshold passed; 2 known moderate PostCSS advisories through Next remain
Active `/digital-twin` viewport: constrained procedural Three/R3F mall shell, no GLB/Draco/external model loading
SVG fallback viewport: detailed synthetic F1 floorplan with 21 store units, escalators, elevators, restrooms, fire stairs, service rooms, entrances
Archived F1 2D prompt/spec: `docs/design/P7_F1_SYNTHETIC_2D_FLOORPLAN_PROMPT.md`
Windows BlenderMCP bridge: WSL protocol probe passed against `127.0.0.1:9876`; Codex MCP server `blender` registered, but newly registered MCP tools require a new/restarted Codex session to appear.
Three-layer Blender prototype: restored separated-slab version with escalator enhancement only; `.blend` 434KB, GLB 3.7MB, preview PNG 1.7MB; not wired into active frontend.
```

Known blocker:

```text
npm run quality was attempted with a 180s timeout after P7-R7c-6; docs/compliance/boundary/frontend passed, then backend pytest stopped producing output at backend/tests/test_health.py until timeout exited with code 124.
```

## Next Handoff

Next recommended increment is to review/polish the three-layer Blender prototype, then optionally integrate the reviewed GLB behind a safe frontend review mode.
