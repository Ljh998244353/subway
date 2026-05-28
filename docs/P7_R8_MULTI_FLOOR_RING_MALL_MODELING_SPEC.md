# P7-R8 Multi-Floor Ring Mall Modeling Specification

Updated: 2026-05-27

## Mission

After the P7-R7 frontend is reviewed, completely replace the temporary F2 model with a self-authored multi-floor ring mall digital twin model. This modeling phase must not start before frontend review approval.

## Scope

```text
5 floors: B1, F1, F2, F3, F4
ring or rounded-rectangle floor plates
central atrium void
outer-ring store volumes facing the atrium
glass railings around atrium
two escalator groups
one elevator/core shaft
light architectural white-model material system
Draco-compressed GLB under 8MB
```

## Blender Script

Create or replace:

```text
scripts/blender/export_mall_digital_twin.py
frontend/public/models/mall_digital_twin.glb
assets/blender/mall_digital_twin.blend
```

The script must be parameterized and reproducible. It must generate only necessary geometry and skip invisible detail.

## Naming Contract

```text
Floor_B1, Floor_F1, Floor_F2, Floor_F3, Floor_F4
Store_F1_S001 style stable store names
Escalator_A, Escalator_B
Core_Elevator
Railing_F1_Atrium
```

Store sign/front faces must have a separate material slot named `Material_StoreSign`.

## Geometry Contract

```text
mall footprint: rounded rectangle around 100m x 60m
atrium void: oval/racetrack around 40m x 20m
floor height: 5m
stores distributed on outer ring
store entrance recesses visible but lightweight
no racks, products, detailed interiors, pipes, hidden engineering, real logos, or real shop signs
```

## Materials

Use only simple named materials in Blender:

```text
Material_Exterior
Material_Floor
Material_Store
Material_StoreSign
Material_Glass
Material_Core
Material_Escalator
```

Frontend may override with Three.js materials. Do not use texture maps, AO maps, normal maps, HDRI, or downloaded materials.

## Export

Use:

```python
bpy.ops.export_scene.gltf(
    filepath="frontend/public/models/mall_digital_twin.glb",
    export_format="GLB",
    use_selection=False,
    export_apply=True,
    export_draco_mesh_compression_enable=True,
    export_draco_mesh_compression_level=6,
    export_materials="EXPORT",
    export_colors=False
)
```

## Frontend Integration Contract

The GLB must support:

```text
floor isolation
store picking
store bounding box focus
NavGraph store_gate node generation
heatmap floor overlays
flow overlays from A* paths
WebGL fallback to 2D SVG if loading fails
```

## Guardrails

```text
no external models
no Sketchfab / Poly Haven / generated external assets
no real mall plans or brand references
no telemetry-enabled BlenderMCP usage
no GLB over 8MB
no high draw-call geometry explosion
```

## Acceptance

```text
GLB exists and is under 8MB
Blender source and export script exist
object names match the contract
all 5 floors and stores are pickable
frontend can load model or fallback cleanly
license docs state self-authored geometry only
```
