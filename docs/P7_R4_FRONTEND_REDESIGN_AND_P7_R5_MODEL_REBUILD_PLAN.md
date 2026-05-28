# P7-R4 Frontend Redesign And P7-R5 Model Rebuild Plan

Updated: 2026-05-27

## 1. Decision

The current priority is no longer P8-I3. A large repair stage is inserted before more backend score work:

```text
P7-R4 frontend redesign and digital-twin-first product surface
P7-R5 complete multi-floor ring-mall model rebuild and advanced 3D mechanism work
```

P7-R4 is the current implementation stage. It must make the frontend reviewable first. P7-R5 starts only after the frontend direction is reviewed.

## 2. P7-R4 Scope

P7-R4 upgrades the frontend product surface without generating a new Blender model yet.

Required outcomes:

```text
/ redirects to /digital-twin
/digital-twin becomes the primary first screen
/style-preview is removed from product routes and navigation
the old preview page file is deleted
all major pages share the same light architectural white-model design language
analysis pages remain available as drill-down routes
documentation records the optimized agent prompt and next 3D model rebuild stage
```

Non-goals:

```text
do not create mall_digital_twin.glb in P7-R4
do not implement final A* pathfinding in P7-R4
do not implement final custom flow/heatmap shaders in P7-R4
do not download external 3D models, textures, HDRI, images, maps, BIM/CAD, real brands, or real mall material
do not connect real MySQL, real video, real customer data, or personal trajectories
```

## 3. Visual Direction

The confirmed visual direction is light architectural white model:

```text
warm white / porcelain / pale stone surfaces
frosted glass floating panels
fine grey borders and architectural grid lines
restrained cyan, blue, amber, orange, and red data layers
no dark neon command-center look
no game-like arrows, thick glowing tubes, or decorative bokeh/orbs
```

The UI should feel like a premium commercial real-estate operations system, not a marketing landing page or a decorative big-screen mock.

## 4. Dependency Decision

Existing allowed frontend 3D stack remains:

```text
three
@react-three/fiber
@react-three/drei
motion
```

Additional libraries:

```text
gsap: allowed for future 3D camera, floor isolation, and sequenced transitions; install only when the code starts using it
zustand: allowed if later global scene state becomes necessary; do not add in P7-R4 because URL state + React state is enough
```

License notes:

```text
zustand is MIT
GSAP npm package uses the GreenSock standard no-charge license; commercial use is allowed for ordinary no-fee projects, but it is not MIT and must remain separately recorded before installation
```

## 5. Optimized Agent Prompt For P7-R5

Use this prompt when the frontend review is accepted and P7-R5 starts.

```text
You are the project senior graphics engineer and digital twin architect. Completely discard the existing mall_floor_f2.glb model and the old simple F2 geometry. Build a new multi-floor ring-mall digital twin for /digital-twin.

Core rules:
- Main visual style is light architectural white model.
- Do not use real mall BIM/CAD, floor plans, maps, brands, logos, tenant signs, real video, real customer imagery, or personal trajectories.
- Main mall model must be self-authored procedural Blender geometry.
- External assets are blocked unless separately audited as commercial-use allowed, with source, author, version, license, obligations, and cost recorded.
- Do not use straight-line store-to-store flow. Flow paths must route through corridor waypoints and never cross store volumes, elevator core, walls, or atrium void.
- Do not use game-like arrows, neon tubes, cartoon visuals, or large glowing effects.
- Keep GLB under 8 MB with Draco compression. Keep draw calls under 150 where practical by merging repeated geometry or using instancing.
- Provide WebGL failure and GLB failure fallback to 2D floor plan.

Blender model:
- Create scripts/blender/export_mall_digital_twin.py.
- Generate assets/blender/mall_digital_twin.blend and frontend/public/models/mall_digital_twin.glb.
- Five floors: B1, F1, F2, F3, F4, 5.0m height spacing.
- Each floor slab is a rounded rectangle about 100m x 60m with a central 40m x 20m oval/racetrack atrium void.
- Store volumes sit around the outside ring and face the atrium/corridor.
- About 100 stores total, stable names such as Store_F1_S001 and Store_F2_S054.
- Floor names must be Floor_B1, Floor_F1, Floor_F2, Floor_F3, Floor_F4.
- Add two escalator groups, one elevator core, corridor railings, entrance nodes, service desk, wayfinding totems, benches, structural columns, and lightweight exterior glass outline.
- Store volumes need only facade, recessed entrance, shopfront glass, and sign material slot Material_StoreSign.
- Materials must be simple base color only; Three.js overrides final materials.
- Export GLB with export_draco_mesh_compression_enable=True, compression level 6, export_apply=True, export_colors=False.

Frontend mechanisms:
- URL is the state source: view, floorId, storeId, mode, flowScope, model.
- view=overview shows whole multi-floor cutaway.
- view=floor isolates selected floor and fades other floors to near-transparent.
- view=store focuses selected store and opens store detail.
- Build waypoint graph from store entrances, corridor loop nodes, escalator nodes, elevator nodes, and entrance nodes.
- A* must compute inbound/outbound one-hop paths. Tests must prove paths avoid a synthetic atrium obstacle.
- Render flow using smooth curves and shader-driven moving light pulses, not arrow geometry.
- Render 3D heatmap using a shader layer with hotspot uniforms and Gaussian falloff.
- Bottom 2D floor dock must mirror selected floor/store and support click-to-focus.
```

## 6. P7-R4 Acceptance

P7-R4 passes when:

```text
/ opens /digital-twin
/style-preview route and navigation entry are gone
PremiumStylePreviewPage.tsx is removed
/digital-twin is the product first screen with the light architectural system
dashboard, store analysis, alerts, and customer profile pages use the same visual system
the frontend still uses mock mode by default
tests and build pass
quality and audit gates pass
P7-R5 handoff is written in context/TODO_NEXT.md
```
