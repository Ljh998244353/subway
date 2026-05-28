# TODO Next

Updated: 2026-05-28

one task only

## Task Card

```text
Increment: P7-R8-V9 review restored escalator-enhanced exploded mall prototype
Primary role: Frontend Mode
Auxiliary reviews: Design, Security/License, QA
Human command: 请进行下一步
Status: ready
```

## Goal

Review the restored self-authored three-layer blue exploded mall prototype with escalator enhancement only, then decide whether to keep iterating in Blender or add a safe frontend review mode.

## Deliverables

```text
one task: visually review the restored separated-slab prototype or add a safe review-only GLB mode
preserve SVG fallback and current procedural viewport unless explicitly adding a review-only GLB mode
keep all assets self-authored and synthetic
```

## Non-goals

```text
do not reintroduce BlenderKit or another external 3D model
do not download any model/texture/HDRI/image or call external generation APIs
do not connect real MySQL or production data
do not use real floor plans, BIM/CAD, maps, brands/logos, video, face images, personal data, or individual trajectories
do not create deployment infrastructure
do not add dependencies, images, external services, paid services, textures, HDRIs, or model assets without a new audit
do not copy any identifiable real mall layout even if public examples are consulted for planning logic
do not make the GLB the default active viewport without explicit review
```

## Minimum Working Set

```text
PROGRESS.md
IMPORTANT.md
context/TODO_NEXT.md
context/FRONTEND_STATE.md
context/TEST_STATE.md
docs/BLENDER_MCP_WSL_SETUP.md
assets/blender/mall_exploded_three_layer_prototype.blend
frontend/public/models/mall_exploded_three_layer_prototype.glb
assets/blender/mall_exploded_three_layer_preview0001.png
scripts/blender/create_exploded_mall_prototype.py
scripts/blender/inspect_exploded_mall_prototype.py
scripts/blender/probe_blender_mcp.py
scripts/blender/run_blender_mcp_server.sh
```

## Acceptance Checks

```text
npm run quality:docs
npm run quality:compliance
npm run quality:boundary
npm run quality:audit
python3 -m py_compile any new Python script
BlenderMCP probe or MCP tool smoke test when Blender is running
optional frontend checks only if frontend code changes
```

## BlenderMCP Preconditions

```text
Windows Blender is running with BlenderMCP add-on connected on port 9876
Codex session has the registered blender MCP tools available, or use the documented probe/launcher fallback
telemetry env vars remain true/disabled
Poly Haven, Sketchfab, Hyper3D/Rodin, Hunyuan3D, and all external downloads remain off
```

## Human Confirmation Gates

```text
new dependencies/images/external services
external model, texture, HDRI, BlenderKit asset, real mall material, or real brand/logos
switching from prototype to frontend-loaded GLB
switching from synthetic fixture to real MySQL query
real data/material access, real AI service, or production deployment
```

## Next Handoff

```text
Recommended next command: 请进行下一步
```
