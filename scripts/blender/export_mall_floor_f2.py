from __future__ import annotations

import math
import sys
from pathlib import Path

import bpy
from mathutils import Vector

PROJECT_ROOT = Path(r'\\wsl.localhost\Ubuntu-24.04\home\ljh\project\subway') if sys.platform == 'win32' else Path('/home/ljh/project/subway')
GLB_PATH = PROJECT_ROOT / 'frontend/public/models/mall_floor_f2.glb'
BLEND_PATH = PROJECT_ROOT / 'assets/blender/mall_floor_f2.blend'

STORE_IDS = [f'S{n:03d}' for n in range(21, 41)]
BLOCKED_KEYWORDS = ['Sketchfab', 'Poly Haven', 'Hyper3D', 'Hunyuan3D', 'Rodin', 'Fal', 'http://', 'https://']


def clear_scene() -> None:
    bpy.ops.object.select_all(action='SELECT')
    bpy.ops.object.delete()
    for material in list(bpy.data.materials):
        bpy.data.materials.remove(material)


def make_mat(name: str, color: tuple[float, float, float, float], roughness: float = 0.58, metallic: float = 0.0, alpha: float = 1.0, emission: tuple[float, float, float, float] | None = None, emission_strength: float = 0.0):
    mat = bpy.data.materials.new(name)
    mat.use_nodes = True
    bsdf = mat.node_tree.nodes.get('Principled BSDF')
    if bsdf:
        bsdf.inputs['Base Color'].default_value = color
        bsdf.inputs['Roughness'].default_value = roughness
        bsdf.inputs['Metallic'].default_value = metallic
        bsdf.inputs['Alpha'].default_value = alpha
        if emission:
            bsdf.inputs['Emission Color'].default_value = emission
            bsdf.inputs['Emission Strength'].default_value = emission_strength
    if alpha < 1:
        mat.blend_method = 'BLEND'
        mat.use_screen_refraction = True
        mat.show_transparent_back = True
    return mat


def init_materials() -> dict[str, object]:
    return {
        'stone': make_mat('synthetic architectural white stone', (0.92, 0.91, 0.87, 1), 0.64),
        'floor': make_mat('synthetic pale terrazzo floor', (0.86, 0.86, 0.82, 1), 0.52),
        'wall': make_mat('synthetic cutaway white wall', (0.96, 0.95, 0.91, 1), 0.66),
        'shadow': make_mat('synthetic recess shadow', (0.55, 0.56, 0.56, 1), 0.72),
        'glass': make_mat('synthetic frosted glass', (0.72, 0.82, 0.88, 0.32), 0.2, 0.0, 0.32),
        'metal': make_mat('synthetic satin metal', (0.72, 0.72, 0.68, 1), 0.32, 0.38),
        'line': make_mat('synthetic brass floor inlay', (0.82, 0.72, 0.48, 1), 0.36, 0.45),
        'light': make_mat('synthetic warm architectural light', (1.0, 0.92, 0.72, 1), 0.24, 0.0, 1.0, (1.0, 0.84, 0.48, 1), 0.8),
        'label': make_mat('synthetic graphite signage', (0.18, 0.2, 0.22, 1), 0.48),
        'heat': make_mat('synthetic translucent heat layer anchor', (1.0, 0.46, 0.22, 0.28), 0.42, 0.0, 0.28),
    }


def apply_quality(obj, bevel: float = 0.0, segments: int = 1, smooth: bool = True):
    if bevel > 0:
        mod = obj.modifiers.new(name='Architectural_Bevel', type='BEVEL')
        mod.width = bevel
        mod.segments = segments
        mod.affect = 'EDGES'
        obj.modifiers.new(name='Weighted_Normals', type='WEIGHTED_NORMAL')
    if smooth and hasattr(obj.data, 'polygons'):
        for poly in obj.data.polygons:
            poly.use_smooth = True
    return obj


def cube(name: str, loc: tuple[float, float, float], scale: tuple[float, float, float], mat=None, bevel: float = 0.0, parent=None):
    bpy.ops.mesh.primitive_cube_add(size=1, location=loc)
    obj = bpy.context.object
    obj.name = name
    obj.dimensions = scale
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
    if mat:
        obj.data.materials.append(mat)
    obj.parent = parent
    return apply_quality(obj, bevel)


def cylinder(name: str, loc: tuple[float, float, float], radius: float, depth: float, mat=None, vertices: int = 64, bevel: float = 0.0, parent=None):
    bpy.ops.mesh.primitive_cylinder_add(vertices=vertices, radius=radius, depth=depth, location=loc)
    obj = bpy.context.object
    obj.name = name
    if mat:
        obj.data.materials.append(mat)
    obj.parent = parent
    return apply_quality(obj, bevel)


def torus(name: str, loc: tuple[float, float, float], major: float, minor: float, mat=None, parent=None):
    bpy.ops.mesh.primitive_torus_add(major_radius=major, minor_radius=minor, major_segments=96, minor_segments=10, location=loc)
    obj = bpy.context.object
    obj.name = name
    if mat:
        obj.data.materials.append(mat)
    obj.parent = parent
    return apply_quality(obj, 0, smooth=True)


def add_label(name: str, text: str, loc: tuple[float, float, float], mat, size: float = 0.18, rot_x: float = 75, parent=None):
    bpy.ops.object.text_add(location=loc, rotation=(math.radians(rot_x), 0, 0))
    obj = bpy.context.object
    obj.name = name
    obj.data.body = text
    obj.data.align_x = 'CENTER'
    obj.data.align_y = 'CENTER'
    obj.data.size = size
    obj.data.extrude = 0.004
    obj.data.materials.append(mat)
    obj.parent = parent
    return obj


def add_floor_tile_grid(mats: dict[str, object]) -> None:
    cube('FloorPlate_F2', (0, -0.08, 0), (12.8, 0.16, 8.6), mats['floor'], 0.015)
    cube('MainMallCutawaySlab_F2', (0, -0.22, 0), (13.25, 0.18, 9.05), mats['stone'], 0.025)
    for x in [i * 0.8 for i in range(-7, 8)]:
        cube(f'FloorTileJoint_F2_X_{x:.1f}', (x, 0.012, 0), (0.014, 0.012, 8.0), mats['line'])
    for z in [i * 0.72 for i in range(-5, 6)]:
        cube(f'FloorTileJoint_F2_Z_{z:.1f}', (0, 0.014, z), (12.1, 0.012, 0.014), mats['line'])
    for x in [-5.8, 5.8]:
        cube(f'CutawayWall_F2_End_{x}', (x, 0.78, 0), (0.18, 1.72, 8.35), mats['wall'], 0.018)
    for z in [-4.02, 4.02]:
        cube(f'CutawayWall_F2_Back_{z}', (0, 0.78, z), (12.05, 1.72, 0.16), mats['wall'], 0.018)
    for x in [-5.0, -2.5, 0, 2.5, 5.0]:
        for z in [-1.55, 1.55]:
            cylinder(f'StructuralColumn_F2_{x}_{z}', (x, 0.82, z), 0.09, 1.65, mats['stone'], 32, 0.005)


def add_atrium(mats: dict[str, object]) -> None:
    torus('AtriumVoid_F2_Ring', (0, 0.06, 0), 1.34, 0.035, mats['line'])
    torus('AtriumGuardrail_F2_GlassRing', (0, 0.62, 0), 1.48, 0.018, mats['glass'])
    torus('AtriumGuardrail_F2_Handrail', (0, 0.84, 0), 1.48, 0.022, mats['metal'])
    cylinder('AtriumVoid_F2_Shadow', (0, -0.035, 0), 1.18, 0.025, mats['shadow'], 96)
    for i in range(24):
        angle = math.tau * i / 24
        x = math.cos(angle) * 1.48
        z = math.sin(angle) * 1.48
        post = cube(f'AtriumRail_F2_Post_{i:02d}', (x, 0.64, z), (0.035, 0.46, 0.035), mats['metal'], 0.004)
        post.rotation_euler[1] = -angle
    for i in range(12):
        angle = math.tau * i / 12
        x = math.cos(angle) * 0.72
        z = math.sin(angle) * 0.72
        pendant = cylinder(f'AtriumPendantLight_F2_{i:02d}', (x, 1.94, z), 0.035, 0.34, mats['light'], 24, 0.004)
        pendant.rotation_euler[0] = math.radians(90)


def add_escalators_and_elevators(mats: dict[str, object]) -> None:
    for name, x, z, angle in [('A', -1.72, 1.32, -15), ('B', 1.72, -1.32, 15)]:
        root = cube(f'Escalator_F2_{name}_Landing', (x, 0.12, z), (1.56, 0.12, 0.54), mats['metal'], 0.012)
        belt = cube(f'Escalator_F2_{name}_InclineBody', (x, 0.42, z), (1.3, 0.24, 0.34), mats['shadow'], 0.01, root)
        belt.rotation_euler[2] = math.radians(angle)
        for step in range(9):
            step_x = x - 0.48 + step * 0.12
            step_y = 0.22 + step * 0.045
            tread = cube(f'Escalator_F2_{name}_Tread_{step:02d}', (step_x, step_y, z), (0.1, 0.035, 0.44), mats['stone'], 0.003, root)
            tread.rotation_euler[2] = math.radians(angle)
        for side in [-0.27, 0.27]:
            rail = cube(f'Escalator_F2_{name}_GlassBalustrade_{side}', (x, 0.58, z + side), (1.46, 0.34, 0.035), mats['glass'], 0.004, root)
            rail.rotation_euler[2] = math.radians(angle)
            hand = cube(f'Escalator_F2_{name}_Handrail_{side}', (x, 0.78, z + side), (1.48, 0.045, 0.05), mats['metal'], 0.01, root)
            hand.rotation_euler[2] = math.radians(angle)

    bank = cube('ElevatorBank_F2_Core', (5.38, 0.82, -1.42), (0.86, 1.65, 1.18), mats['wall'], 0.018)
    for i, dz in enumerate([-0.32, 0.32]):
        cube(f'ElevatorDoor_F2_{i}', (5.01, 0.78, -1.42 + dz), (0.035, 1.1, 0.38), mats['metal'], 0.006, bank)
        cube(f'ElevatorIndicator_F2_{i}', (4.98, 1.42, -1.42 + dz), (0.028, 0.12, 0.2), mats['light'], 0.003, bank)


def add_public_furniture(mats: dict[str, object]) -> None:
    for i, (x, z) in enumerate([(-3.25, 0.72), (3.25, -0.72), (-4.65, -0.55), (4.6, 0.55)]):
        cube(f'PublicBench_F2_{i}_Seat', (x, 0.18, z), (0.72, 0.12, 0.22), mats['stone'], 0.025)
        cube(f'PublicBench_F2_{i}_Back', (x, 0.35, z + 0.13), (0.72, 0.28, 0.05), mats['stone'], 0.012)
    for i, (x, z) in enumerate([(-3.78, -0.88), (-2.32, 1.05), (2.34, -1.08), (3.95, 0.92), (0.85, 2.2), (-0.85, -2.2)]):
        cylinder(f'Planter_F2_{i}_Base', (x, 0.16, z), 0.17, 0.26, mats['stone'], 32, 0.006)
        cylinder(f'Planter_F2_{i}_Canopy', (x, 0.46, z), 0.12, 0.42, mats['wall'], 24, 0.004)
    for i, (x, z) in enumerate([(-5.0, -1.15), (5.0, 1.15), (0.52, -2.08)]):
        cube(f'WayfindingTotem_F2_{i}', (x, 0.72, z), (0.14, 1.22, 0.42), mats['label'], 0.01)
        cube(f'WayfindingScreen_F2_{i}', (x, 0.82, z + 0.215), (0.1, 0.72, 0.025), mats['light'], 0.004)
    cube('ServiceDesk_F2_InfoCounter', (-0.58, 0.26, 2.05), (0.82, 0.52, 0.34), mats['stone'], 0.025)
    cube('ServiceDesk_F2_BackPanel', (-0.58, 0.72, 2.25), (0.82, 0.72, 0.05), mats['wall'], 0.012)


def add_ceiling_system(mats: dict[str, object]) -> None:
    for x in [i * 0.72 for i in range(-7, 8)]:
        cube(f'CeilingBaffle_F2_Main_{x:.1f}', (x, 2.02, 0), (0.06, 0.14, 2.4), mats['wall'], 0.006)
    for z in [i * 0.64 for i in range(-5, 6)]:
        cube(f'CeilingBaffle_F2_Cross_{z:.1f}', (0, 2.0, z), (2.5, 0.12, 0.05), mats['wall'], 0.006)
    for i, x in enumerate([-5.0, -3.4, -1.8, 1.8, 3.4, 5.0]):
        cube(f'LinearLight_F2_North_{i}', (x, 1.92, -2.04), (0.9, 0.035, 0.045), mats['light'], 0.006)
        cube(f'LinearLight_F2_South_{i}', (x, 1.92, 2.04), (0.9, 0.035, 0.045), mats['light'], 0.006)


def add_store(mats: dict[str, object], store_id: str, index: int, x: float, z: float, width: float, depth: float, side: str):
    root = cube(f'Store_{store_id}', (x, 0.62, z), (width, 1.24, depth), mats['wall'], 0.02)
    front_sign = -1 if side == 'north' else 1
    front_z = z + front_sign * depth / 2
    inside_z = z - front_sign * 0.16
    door_x = x - width * 0.18 if index % 2 else x + width * 0.18

    cube(f'Door_{store_id}', (door_x, 0.48, front_z + front_sign * 0.02), (width * 0.2, 0.78, 0.04), mats['shadow'], 0.006, root)
    cube(f'EntranceFrame_{store_id}_Top', (door_x, 0.91, front_z + front_sign * 0.034), (width * 0.3, 0.08, 0.055), mats['metal'], 0.004, root)
    for sx in [-0.18, 0.18]:
        cube(f'EntranceFrame_{store_id}_Side_{sx}', (door_x + sx * width, 0.5, front_z + front_sign * 0.034), (0.035, 0.78, 0.055), mats['metal'], 0.004, root)

    glass_width = width * 0.24
    for pane, offset in enumerate([-0.34, 0.0, 0.34]):
        if abs((x + offset * width) - door_x) < 0.12:
            continue
        cube(f'ShopfrontGlass_{store_id}_{pane}', (x + offset * width, 0.58, front_z + front_sign * 0.026), (glass_width, 0.7, 0.035), mats['glass'], 0.004, root)
        cube(f'Mullion_{store_id}_{pane}', (x + offset * width, 0.58, front_z + front_sign * 0.052), (0.018, 0.74, 0.04), mats['metal'], 0.002, root)

    cube(f'SignageBand_{store_id}', (x, 1.24, front_z + front_sign * 0.045), (width * 0.9, 0.18, 0.055), mats['stone'], 0.01, root)
    add_label(f'Label_{store_id}', f'SHOP {store_id[-3:]}', (x, 1.36, front_z + front_sign * 0.09), mats['label'], 0.14, 75, root)
    cube(f'StoreThreshold_{store_id}', (door_x, 0.04, front_z + front_sign * 0.18), (width * 0.34, 0.04, 0.22), mats['line'], 0.004, root)

    for i in range(3):
        shelf_x = x - width * 0.28 + i * width * 0.28
        cube(f'InteriorFixture_{store_id}_{i}_Plinth', (shelf_x, 0.22, inside_z), (width * 0.18, 0.32, 0.18), mats['stone'], 0.01, root)
        cube(f'InteriorFixture_{store_id}_{i}_BackRail', (shelf_x, 0.58, inside_z - front_sign * 0.2), (width * 0.16, 0.58, 0.035), mats['wall'], 0.006, root)
    cube(f'InteriorLight_{store_id}', (x, 1.52, inside_z), (width * 0.62, 0.035, 0.05), mats['light'], 0.004, root)
    cube(f'BackRoomWall_{store_id}', (x, 0.58, z - front_sign * depth * 0.36), (width * 0.86, 0.92, 0.05), mats['shadow'], 0.006, root)
    return root


def add_storefronts(mats: dict[str, object]) -> None:
    top_ids = STORE_IDS[:10]
    bottom_ids = STORE_IDS[10:]
    xs = [-5.4, -4.2, -3.0, -1.8, -0.6, 0.6, 1.8, 3.0, 4.2, 5.4]
    for i, (sid, x) in enumerate(zip(top_ids, xs)):
        add_store(mats, sid, i, x, -3.15, 0.96, 1.26, 'north')
    for i, (sid, x) in enumerate(zip(bottom_ids, xs), 10):
        add_store(mats, sid, i, x, 3.15, 0.96, 1.26, 'south')


def add_light_and_camera() -> None:
    bpy.ops.object.light_add(type='AREA', location=(0, 5.6, 0))
    light = bpy.context.object
    light.name = 'Lighting_F2_LargeSoftbox'
    light.data.energy = 820
    light.data.size = 7.5
    bpy.ops.object.light_add(type='POINT', location=(-3.4, 2.4, -2.0))
    bpy.context.object.name = 'Lighting_F2_StorefrontGlow_A'
    bpy.context.object.data.energy = 90
    bpy.ops.object.light_add(type='POINT', location=(3.4, 2.4, 2.0))
    bpy.context.object.name = 'Lighting_F2_StorefrontGlow_B'
    bpy.context.object.data.energy = 90

    bpy.ops.object.camera_add(location=(6.1, 5.8, 7.2), rotation=(math.radians(60), 0, math.radians(42)))
    camera = bpy.context.object
    bpy.context.scene.camera = camera
    direction = Vector((0, 0, 0)) - camera.location
    camera.rotation_euler = direction.to_track_quat('-Z', 'Y').to_euler()


def validate_scene() -> None:
    names = {obj.name for obj in bpy.context.scene.objects}
    missing = [f'Store_{sid}' for sid in STORE_IDS if f'Store_{sid}' not in names]
    if missing:
        raise RuntimeError(f'Missing store nodes: {missing}')
    text_blocks = [text.body for text in bpy.data.curves if getattr(text, 'body', None)]
    scene_text = '\n'.join([*names, *text_blocks])
    blocked = [keyword for keyword in BLOCKED_KEYWORDS if keyword in scene_text]
    if blocked:
        raise RuntimeError(f'Blocked external asset keywords found: {blocked}')
    print(f'P7-R3 model validation: {len(bpy.context.scene.objects)} objects, {len(bpy.data.materials)} materials, {len(STORE_IDS)} store nodes')


def build_scene() -> None:
    clear_scene()
    mats = init_materials()
    add_floor_tile_grid(mats)
    cube('CorridorVolume_F2_Main', (0, 0.035, 0), (11.4, 0.05, 2.15), mats['stone'], 0.012)
    cube('CorridorVolume_F2_Cross', (0, 0.04, 0), (2.28, 0.055, 7.55), mats['stone'], 0.012)
    add_atrium(mats)
    add_storefronts(mats)
    add_escalators_and_elevators(mats)
    add_public_furniture(mats)
    add_ceiling_system(mats)
    add_label('Floor_F2_Directory_Label', 'F2 SYNTHETIC CUTAWAY', (0, 1.62, -0.98), mats['label'], 0.24)
    add_light_and_camera()
    validate_scene()
    for obj in bpy.context.scene.objects:
        obj.select_set(False)


def export() -> None:
    GLB_PATH.parent.mkdir(parents=True, exist_ok=True)
    BLEND_PATH.parent.mkdir(parents=True, exist_ok=True)
    bpy.ops.wm.save_as_mainfile(filepath=str(BLEND_PATH))
    bpy.ops.export_scene.gltf(
        filepath=str(GLB_PATH),
        export_format='GLB',
        use_selection=False,
        export_apply=True,
        export_materials='EXPORT',
        export_yup=True,
    )


build_scene()
export()
