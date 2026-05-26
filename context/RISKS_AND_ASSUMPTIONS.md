# Risks And Assumptions

Updated: 2026-05-26

## Current Assumptions

| Assumption | Impact |
| --- | --- |
| The project is a course design project | Keep implementation auditable and low-risk |
| The user continues with short commands | `PROGRESS.md` and `context/TODO_NEXT.md` must stay handoff-ready |
| Current demo data uses mock or synthetic fixtures | Avoid real video, real mall material, real brands, and personal information |
| The premium synthetic 3D mall digital twin demo is now production-build prepared | P8 should shift toward store score MVP contracts while preserving synthetic/demo boundaries |
| Blender is the confirmed free mainline 3D modeling tool | Use Blender-authored synthetic assets; do not introduce Unity/UE without a new explicit decision |
| Database planning uses MySQL | Do not design migrations, connection strings, or deployment docs around PostgreSQL |
| GitHub Actions runs only on GitHub | A Gitee mirror does not automatically run `.github/workflows/ci.yml` |

## Current Risks

| Risk | Level | Handling |
| --- | --- | --- |
| 3D mall model could accidentally use unauthorized real floor plans, BIM/CAD, maps, brand assets, or store signs | High | Use only self-authored synthetic geometry, fictional store names, generic categories, and documented assets |
| 3D dependencies/assets may introduce license, redistribution, account, or cost risk | High | P7 audited and adopted Three/R3F/Drei plus self-authored GLB; future dependencies/assets still require audit |
| Blender add-ons, imported models, materials, or texture packs may have separate licenses from Blender itself | Medium | Blender is allowed as a tool, but every external asset/add-on remains blocked until reviewed |
| BlenderMCP can execute Blender Python and optionally use telemetry or external asset/generation APIs | High | User approved controlled local use in P7-R2 for `L:\\Software\\blender-mcp`; use localhost only, set telemetry-disable environment variables, and keep Sketchfab/Poly Haven/Hyper3D/Hunyuan3D/Rodin/Fal/downloaded assets blocked until separate audit |
| Synthetic demo data may be confused with real customer data | Medium | Label scenario/events as synthetic/demo-only and keep real-data adapters deferred |
| API contract and MySQL schema may need later adjustment for synthetic scenarios | Medium | Define scenario/event contracts before backend implementation |
| Real MySQL migration execution is not tested | Medium | Follow `docs/MYSQL_READINESS_PLAN.md` before real query work |
| Premature Docker Compose would create fake deployment | Medium | Keep deployment documentation-only until deployment increment |
| Privacy and real-material misuse | High | Block real video, real mall material, face images, member IDs, phone numbers, and personal trajectories |
| Coverage, E2E, and browser-level 3D performance tests are still missing | Medium | P8-I1 added chunk/build checks; browser render/FPS instrumentation remains a later task |
| AI service real video integration requires human confirmation | Medium | P6-I2 complete with synthetic fixtures; real video is no longer the default next step |

## Next Step Risk Control

P7-R2 uses only self-authored Blender geometry and a local Windows Blender toolchain. Full BlenderMCP server startup still requires local dependency setup, so do not mark MCP automation complete until `uv`/`uvx` or an equivalent local venv can run the server with telemetry disabled. After P7-R2 validation, return to the P8-I3 store score MVP backend contract using synthetic/demo aggregates only, while still avoiding real MySQL, real mall material, external services, production data, and real video integration by default.
