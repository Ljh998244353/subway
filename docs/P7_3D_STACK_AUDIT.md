# P7 3D Stack And Blender Agent Audit

Updated: 2026-05-25

## 1. Increment

```text
Increment: P7-I1 3D 技术栈、许可证审计和前端依赖基线确认
Primary role: Architect Mode
Auxiliary reviews: Frontend, Security/License, QA, Design
Scope: audit and document only; do not install dependencies or implement the 3D scene
```

## 2. Current decision summary

| Area | Decision | Status |
| --- | --- | --- |
| UI/UX target | Productize the confirmed `/style-preview` premium light three-column cockpit into `/digital-twin` | Approved direction |
| Modeling tool | Blender remains the free mainline modeling tool | Allowed |
| Blender agent | `ahujasid/blender-mcp` is the primary candidate for local AI-assisted Blender automation | Candidate, not installed |
| Web 3D renderer | Prefer `three` + `@react-three/fiber`; evaluate `@react-three/drei` as optional helper | Candidate, not installed |
| Asset policy | Use self-authored synthetic geometry, fictional tenant names, and no real mall/brand material | Required |
| Data mode | Mock/synthetic remains default; no real MySQL or real video | Required |

## 3. Blender MCP candidate audit

### 3.1 Candidate

| Field | Value |
| --- | --- |
| Name | BlenderMCP / blender-mcp |
| Repository | `https://github.com/ahujasid/blender-mcp` |
| GitHub metadata checked | 2026-05-25 via `gh repo view ahujasid/blender-mcp` |
| License metadata | MIT License |
| Stars / forks at check time | 21994 stars / 2163 forks |
| Current README version label | 1.5.5 |
| Project type | Blender add-on plus MCP server |
| Install/runtime requirements from README | Blender 3.0+, Python 3.10+, `uv` / `uvx` package manager |
| Claude Code command from README | `claude mcp add blender uvx blender-mcp` |
| Current project decision | Candidate only; do not install until user explicitly confirms after this audit |

### 3.2 README facts used for audit

The repository README states:

```text
BlenderMCP connects Blender to Claude AI through the Model Context Protocol (MCP), allowing Claude to directly interact with and control Blender.
```

It describes two components:

```text
Blender Addon (`addon.py`): creates a socket server inside Blender
MCP Server (`src/blender_mcp/server.py`): implements MCP and connects to the Blender addon
```

It lists capabilities:

```text
create, modify, and delete objects
apply and modify materials/colors
inspect the current Blender scene
run arbitrary Python code in Blender from Claude
```

Important repository authenticity note from README:

```text
The repository states it has no official website and that websites seen online are unofficial and unaffiliated.
```

Therefore, project decisions should rely on the GitHub repository and package metadata, not third-party websites.

## 4. Security and privacy review

| Risk | Why it matters | Decision | Required control |
| --- | --- | --- | --- |
| Arbitrary Blender Python execution | README explicitly says the tool can run arbitrary Python code in Blender. This is powerful but can modify local files or execute unsafe operations if misused. | Needs approval before install/use | Run only in a local trusted project environment; do not use on sensitive files; review generated code; save work before running |
| Local socket server | Blender add-on creates a socket server inside Blender. Misconfiguration could expose control beyond local workflow. | Monitor | Bind to localhost by default; do not expose remote host/ports unless separately approved |
| Telemetry | README says telemetry can include anonymized prompts, code snippets, and screenshots when consent is enabled; minimal telemetry may remain unless disabled. | Disable for this project | Configure `DISABLE_TELEMETRY=true` and uncheck telemetry consent in Blender before use |
| External asset APIs | README supports Poly Haven downloads, Sketchfab search/download, Hyper3D Rodin generation, and Hunyuan3D support. These may add asset licenses, accounts, paid limits, or data transfer. | Block by default | Turn off Poly Haven; do not use Sketchfab, Hyper3D, Hunyuan3D, Rodin, Fal, or downloaded assets without separate audit |
| Reference image workflows | README examples include creating scenes from reference images. Images may contain copyrighted or real mall material. | Block by default | Use only self-authored synthetic references or text specs |
| Remote host mode | README says Blender MCP can run on a remote host. | Block by default | Localhost only unless a later DevOps/security increment approves remote use |

## 5. Fit for this project

Blender MCP is useful for this project only as a controlled local automation layer for self-authored synthetic mall modeling.

Allowed target tasks after approval:

```text
create synthetic mall floors, corridors, atrium, elevators, escalators, kiosks, entrances, hotspot zones
create fictional tenant blocks with stable object names such as store_s104, floor_l1, zone_atrium_b
assign simple self-authored materials and colors
set camera and lights
export GLB/GLTF for frontend loading
```

Blocked tasks:

```text
download real mall floor plans, BIM/CAD, maps, brand signs, logos, or tenant assets
use Sketchfab/Poly Haven/Hyper3D/Hunyuan3D/Rodin/Fal assets without separate license and cost audit
use real monitoring footage, real customer imagery, faces, or personal trajectories
run generated Python that touches unrelated local files or network services
```

## 6. Web 3D rendering candidates

These are not installed in this increment. They remain candidates for the next frontend implementation increment.

| Candidate | Likely license | Use | Initial decision |
| --- | --- | --- | --- |
| `three` | MIT | Core WebGL renderer and GLTF loading foundation | Preferred candidate |
| `@react-three/fiber` | MIT | React renderer for Three.js scenes | Preferred candidate |
| `@react-three/drei` | MIT | Helper components for camera, controls, loaders, text, environment | Optional; use only if it reduces complexity without bloating scope |

Before installation, verify exact npm versions, license fields, transitive dependency risk, bundle size impact, and test/build behavior.

## 7. Proposed frontend module boundary

```text
frontend/src/twin/types.ts                 scene data contracts and stable object IDs
frontend/src/twin/scene/                   Canvas, renderer shell, camera, lighting, controls
frontend/src/twin/entities/                floors, stores, heatmap, flow, alerts, people
frontend/src/twin/adapters/                convert existing API/mock models to renderable scene data
frontend/src/twin/interactions/            picking, focus, floor isolation, layer visibility
frontend/src/twin/simulation/              deterministic synthetic people/event playback
frontend/src/twin/export/                  GLB/GLTF asset manifest and loading helpers
```

Migration rule:

```text
Keep `/style-preview` as reference.
Migrate `/digital-twin` in small steps.
Do not remove mock/synthetic fallback.
Do not require Blender MCP or external assets for frontend tests.
```

## 8. First approved implementation sequence after this audit

Recommended next increment after P7-I1:

```text
P7-I2 productize premium cockpit shell for /digital-twin without WebGL dependency
```

Deliverables:

```text
extract reusable cockpit layout components from /style-preview
wire /digital-twin into the premium layout while preserving existing mock/API data mode
keep current SVG/2.5D floor plan as the center placeholder until 3D dependency approval
add route/build/state tests for layout migration
```

Then:

```text
P7-I3 install audited three/R3F baseline and add minimal local 3D scene shell
P7-I4 generate/import first self-authored synthetic mall model using Blender/Blender MCP if approved
```

## 9. Final audit conclusion

Blender MCP is promising and likely suitable for local synthetic model automation, but it is not safe to treat as a normal passive asset tool. It is a code-execution bridge into Blender.

Current decision:

```text
Candidate accepted for controlled local use after explicit user approval.
Not installed in this increment.
Telemetry must be disabled before any future use.
External asset APIs remain blocked until separate audit.
```
