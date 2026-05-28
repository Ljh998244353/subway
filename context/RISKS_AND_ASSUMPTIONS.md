# Risks And Assumptions

Updated: 2026-05-28

## Active Assumptions

| Assumption | Impact |
| --- | --- |
| This is a course/demo project | Keep implementation auditable, synthetic, and low-risk |
| The user continues with short commands | `TODO_NEXT.md` and `PROGRESS.md` must stay handoff-ready |
| The selected frontend is Next.js App Router | Do not restore the discarded Vite/React Router surface |
| Demo data is mock/synthetic by default | Avoid real video, real mall material, brands, and personal data |
| Database planning uses MySQL | Do not design PostgreSQL migrations or connection strings |
| Blender is the free mainline modeling tool | Use self-authored synthetic geometry only |

## Active Risks

| Risk | Level | Handling |
| --- | --- | --- |
| P7-R8 model could accidentally use unauthorized floor plans, BIM/CAD, maps, brands, or store signs | High | Use only self-authored synthetic geometry, fictional names, and audited assets |
| BlenderMCP can execute Blender Python and includes telemetry/external asset paths | High | Use localhost only, disable telemetry, and keep Sketchfab/Poly Haven/Hyper3D/Hunyuan3D/Rodin/Fal/downloaded assets blocked |
| Synthetic demo data may be confused with real customer data | Medium | Label as synthetic/demo-only and keep real-data adapters deferred |
| npm audit reports 2 moderate PostCSS advisories through Next.js | Medium | High-severity gate passes; do not run `npm audit fix --force` because it proposes a breaking Next downgrade |
| Root `npm run quality` hangs in backend pytest in this environment | Medium | Record timeout and use targeted gates until backend health-test hang is fixed |

## Standing Red Lines

```text
no real monitoring footage, face images, personal trajectories, member IDs, or phone numbers
no real mall floor plans, maps, BIM/CAD, tenant logos, or brand signs
no external asset APIs, paid services, downloaded models/textures/HDRIs, or unclear-license assets
no real MySQL or production data without a separate approval gate
no deployment infrastructure unless explicitly scoped
```
