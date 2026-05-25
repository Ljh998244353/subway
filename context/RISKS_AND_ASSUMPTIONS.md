# Risks And Assumptions

Updated: 2026-05-25

## Current Assumptions

| Assumption | Impact |
| --- | --- |
| The project is a course design project | Keep implementation auditable and low-risk |
| The user continues with short commands | `PROGRESS.md` and `context/TODO_NEXT.md` must stay handoff-ready |
| Current demo data uses mock or synthetic fixtures | Avoid real video, real mall material, real brands, and personal information |
| The new priority is a premium synthetic 3D mall digital twin demo | P7 should focus on 3D demo quality and fake-data controls before real integrations |
| Blender is the confirmed free mainline 3D modeling tool | Use Blender-authored synthetic assets; do not introduce Unity/UE without a new explicit decision |
| Database planning uses MySQL | Do not design migrations, connection strings, or deployment docs around PostgreSQL |
| GitHub Actions runs only on GitHub | A Gitee mirror does not automatically run `.github/workflows/ci.yml` |

## Current Risks

| Risk | Level | Handling |
| --- | --- | --- |
| 3D mall model could accidentally use unauthorized real floor plans, BIM/CAD, maps, brand assets, or store signs | High | Use only self-authored synthetic geometry, fictional store names, generic categories, and documented assets |
| 3D dependencies/assets may introduce license, redistribution, account, or cost risk | High | P7-I3 audited and adopted only `three@0.184.0`, `@react-three/fiber@9.6.1`, and `@types/three@0.184.1`; future dependencies/assets still require audit |
| Blender add-ons, imported models, materials, or texture packs may have separate licenses from Blender itself | Medium | Blender is allowed as a tool, but every external asset/add-on remains blocked until reviewed |
| BlenderMCP can execute Blender Python and optionally use telemetry or external asset/generation APIs | High | Candidate only, not installed; use only after explicit approval, disable telemetry, keep localhost-only, and block Sketchfab/Poly Haven/Hyper3D/Hunyuan3D/Rodin/Fal/downloaded assets until separate audit |
| Synthetic demo data may be confused with real customer data | Medium | Label scenario/events as synthetic/demo-only and keep real-data adapters deferred |
| API contract and MySQL schema may need later adjustment for synthetic scenarios | Medium | Define scenario/event contracts before backend implementation |
| Real MySQL migration execution is not tested | Medium | Follow `docs/MYSQL_READINESS_PLAN.md` before real query work |
| Premature Docker Compose would create fake deployment | Medium | Keep deployment documentation-only until deployment increment |
| Privacy and real-material misuse | High | Block real video, real mall material, face images, member IDs, phone numbers, and personal trajectories |
| Coverage, E2E, and 3D performance tests are still missing | Medium | Add by P7 risky path; record any unrun checks |
| AI service real video integration requires human confirmation | Medium | P6-I2 complete with synthetic fixtures; real video is no longer the default next step |

## Next Step Risk Control

P7-I3 productized the first minimal audited WebGL dependency baseline and scene shell without external assets. The next implementation increment should deepen local scene adapters and interactions while still avoiding BlenderMCP, Drei unless separately justified, imported/downloaded assets, real mall material, external model/texture APIs, real MySQL, and real video integration by default. The new large frontend chunk warning should be monitored and addressed in a later performance/code-splitting increment.
