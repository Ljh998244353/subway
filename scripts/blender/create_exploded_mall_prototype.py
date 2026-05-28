from __future__ import annotations

import math
import sys
from pathlib import Path

import bpy
from mathutils import Vector

PROJECT_ROOT = Path(r"\\wsl.localhost\Ubuntu-24.04\home\ljh\project\subway") if sys.platform == "win32" else Path("/home/ljh/project/subway")
BLEND_PATH = PROJECT_ROOT / "assets/blender/mall_exploded_three_layer_prototype.blend"

BLOCKED_KEYWORDS = ("Sketchfab", "Poly Haven", "Hyper3D", "Hunyuan3D", "Rodin", "Fal", "http://", "https://")
FLOORS = (("F1", 0.0), ("F2", 2.65), ("F3", 5.30))
FLOOR_Z = dict(FLOORS)
STORE_PALETTE = ("store_blue", "store_cyan", "store_mint", "store_ice", "store_teal")
VIRTUAL_LABELS = ("CAFE", "RETAIL", "KIDS", "MARKET", "FOOD", "CINEMA", "SPORT", "SERVICE")


def clear_scene() -> None:
    bpy.ops.object.select_all(action="SELECT")
    bpy.ops.object.delete()
    for collection in list(bpy.data.collections):
        if collection.name != "Scene Collection":
            bpy.data.collections.remove(collection)
    for material in list(bpy.data.materials):
        bpy.data.materials.remove(material)
    for mesh in list(bpy.data.meshes):
        bpy.data.meshes.remove(mesh)


def material(
    name: str,
    color: tuple[float, float, float, float],
    roughness: float = 0.55,
    alpha: float = 1.0,
    emission: tuple[float, float, float, float] | None = None,
    strength: float = 0.0,
):
    mat = bpy.data.materials.new(name)
    mat.use_nodes = True
    bsdf = mat.node_tree.nodes.get("Principled BSDF")
    if bsdf:
        if "Base Color" in bsdf.inputs:
            bsdf.inputs["Base Color"].default_value = color
        if "Roughness" in bsdf.inputs:
            bsdf.inputs["Roughness"].default_value = roughness
        if "Alpha" in bsdf.inputs:
            bsdf.inputs["Alpha"].default_value = alpha
        if emission and "Emission Color" in bsdf.inputs:
            bsdf.inputs["Emission Color"].default_value = emission
        if "Emission Strength" in bsdf.inputs:
            bsdf.inputs["Emission Strength"].default_value = strength
    if alpha < 1:
        mat.blend_method = "BLEND"
        mat.use_screen_refraction = True
        mat.show_transparent_back = True
    return mat


def make_materials() -> dict[str, object]:
    return {
        "slab_top": material("mall.material.slab.top.layeredAcrylicBlue", (0.10, 0.55, 0.82, 0.72), 0.42, 0.72, (0.03, 0.38, 0.78, 1), 0.12),
        "slab_edge": material("mall.material.slab.edge.deepBlueGlass", (0.018, 0.17, 0.31, 1), 0.48, 1.0, (0.02, 0.20, 0.40, 1), 0.10),
        "edge_light": material("mall.material.edge.cyanLightStrips", (0.12, 0.78, 1.0, 1), 0.28, 1.0, (0.08, 0.78, 1.0, 1), 0.85),
        "atrium": material("mall.material.atrium.deepVoid", (0.006, 0.04, 0.08, 0.92), 0.7, 0.92),
        "line": material("mall.material.line.electricCyan", (0.38, 0.96, 1.0, 1), 0.24, 1.0, (0.25, 0.9, 1.0, 1), 0.95),
        "core": material("mall.material.core.transparentAquaGlass", (0.42, 0.92, 1.0, 0.24), 0.16, 0.24, (0.28, 0.88, 1.0, 1), 0.55),
        "glass": material("mall.material.escalator.clearBlueGlass", (0.55, 0.9, 1.0, 0.20), 0.12, 0.20, (0.22, 0.75, 1.0, 1), 0.22),
        "metal": material("mall.material.escalator.satinGraphite", (0.14, 0.19, 0.24, 1), 0.32, 1.0),
        "warm": material("mall.material.escalator.warmHandrail", (1.0, 0.62, 0.18, 1), 0.34, 1.0, (1.0, 0.45, 0.10, 1), 0.58),
        "store_blue": material("mall.material.store.deepSky", (0.18, 0.58, 0.86, 1), 0.46),
        "store_cyan": material("mall.material.store.iceCyan", (0.42, 0.78, 0.94, 1), 0.44),
        "store_mint": material("mall.material.store.mintAnchor", (0.45, 0.82, 0.70, 1), 0.5),
        "store_ice": material("mall.material.store.whiteBlue", (0.70, 0.91, 1.0, 1), 0.42),
        "store_teal": material("mall.material.store.teal", (0.25, 0.66, 0.73, 1), 0.52),
        "sign_white": material("mall.material.sign.white", (0.95, 0.98, 1.0, 1), 0.35),
        "sign_orange": material("mall.material.sign.orange", (1.0, 0.48, 0.08, 1), 0.38, 1.0, (1.0, 0.34, 0.05, 1), 0.28),
        "sign_red": material("mall.material.sign.red", (1.0, 0.08, 0.08, 1), 0.4, 1.0, (1.0, 0.05, 0.05, 1), 0.22),
        "sign_green": material("mall.material.sign.green", (0.28, 0.95, 0.38, 1), 0.42, 1.0, (0.2, 0.8, 0.25, 1), 0.20),
    }


def empty(name: str, parent=None):
    obj = bpy.data.objects.new(name, None)
    bpy.context.scene.collection.objects.link(obj)
    obj.parent = parent
    return obj


def apply_bevel(obj, bevel: float = 0.0, segments: int = 4):
    if bevel:
        mod = obj.modifiers.new(name="soft_digital_twin_bevel", type="BEVEL")
        mod.width = bevel
        mod.segments = segments
        mod.affect = "EDGES"
        obj.modifiers.new(name="weighted_normals", type="WEIGHTED_NORMAL")
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
    return apply_bevel(obj, bevel)


def cylinder(name: str, loc: tuple[float, float, float], radius: float, depth: float, mat=None, vertices: int = 32, parent=None):
    bpy.ops.mesh.primitive_cylinder_add(vertices=vertices, radius=radius, depth=depth, location=loc)
    obj = bpy.context.object
    obj.name = name
    if mat:
        obj.data.materials.append(mat)
    obj.parent = parent
    return obj


def torus(name: str, loc: tuple[float, float, float], major: float, minor: float, mat=None, scale=(1.0, 1.0, 1.0), parent=None):
    bpy.ops.mesh.primitive_torus_add(major_radius=major, minor_radius=minor, major_segments=96, minor_segments=8, location=loc)
    obj = bpy.context.object
    obj.name = name
    obj.scale = scale
    if mat:
        obj.data.materials.append(mat)
    obj.parent = parent
    return obj


def add_label(name: str, text: str, loc: tuple[float, float, float], mat, size: float = 0.16, rotation_z: float = 0.0, parent=None):
    bpy.ops.object.text_add(location=loc, rotation=(0, 0, math.radians(rotation_z)))
    obj = bpy.context.object
    obj.name = name
    obj.data.body = text
    obj.data.align_x = "CENTER"
    obj.data.align_y = "CENTER"
    obj.data.size = size
    obj.data.extrude = 0.004
    obj.data.materials.append(mat)
    obj.parent = parent
    return obj


def add_top_label(parent, mats, name: str, text: str, x: float, y: float, z: float, width: float, depth: float, rz: float, palette_index: int):
    sign_mat = [mats["sign_orange"], mats["sign_red"], mats["sign_green"], mats["sign_white"]][palette_index % 4]
    sign = cube(name, (x, y, z), (width, depth, 0.026), sign_mat, 0.014, parent)
    sign.rotation_euler[2] = math.radians(rz)
    add_label(f"{name}.text", text, (x, y, z + 0.024), sign_mat, 0.13, rz, parent)


def add_store(parent, mats, floor_id: str, idx: int, x: float, y: float, w: float, d: float, h: float, rz: float = 0.0) -> None:
    mat = mats[STORE_PALETTE[idx % len(STORE_PALETTE)]]
    z_base = FLOOR_Z[floor_id] + 0.25
    obj = cube(f"floor.{floor_id}.store.S{floor_id[-1]}{idx:02d}", (x, y, z_base + h / 2), (w, d, h), mat, 0.065, parent)
    obj.rotation_euler[2] = math.radians(rz)
    add_top_label(
        parent,
        mats,
        f"floor.{floor_id}.store.S{floor_id[-1]}{idx:02d}.topSign",
        VIRTUAL_LABELS[idx % len(VIRTUAL_LABELS)],
        x,
        y,
        z_base + h + 0.02,
        min(w * 0.70, 1.0),
        min(d * 0.42, 0.34),
        rz,
        idx,
    )


def add_slab(parent, mats, floor_id: str, z: float, y_offset: float, width: float, depth: float, complexity: int) -> None:
    floor = empty(f"floor.{floor_id}", parent)
    cube(f"floor.{floor_id}.edge.mainDeepBlueSkirt", (0, y_offset, z), (width, depth, 0.38), mats["slab_edge"], 0.48, floor)
    cube(f"floor.{floor_id}.slab.mainAcrylicPlate", (0, y_offset, z + 0.20), (width - 0.62, depth - 0.58, 0.16), mats["slab_top"], 0.42, floor)
    protrusions = [
        (-width / 2 + 0.75, -0.15, 1.05, 2.1),
        (width / 2 - 0.85, 0.25, 1.18, 2.25),
        (-3.9, depth / 2 - 0.45, 2.4, 0.88),
        (2.9, -depth / 2 + 0.35, 2.8, 0.75),
    ][:complexity]
    for i, (x, y, w, d) in enumerate(protrusions):
        cube(f"floor.{floor_id}.edge.localProtrusion.{i}", (x, y_offset + y, z), (w + 0.24, d + 0.24, 0.34), mats["slab_edge"], 0.24, floor)
        cube(f"floor.{floor_id}.slab.localProtrusion.{i}", (x, y_offset + y, z + 0.20), (w, d, 0.14), mats["slab_top"], 0.20, floor)
    for i in range(12):
        x = -width / 2 + 1.0 + i * (width - 2.0) / 11
        cube(f"floor.{floor_id}.edge.frontCyanWindow.{i:02d}", (x, y_offset - depth / 2 - 0.015, z + 0.05), (0.42, 0.04, 0.085), mats["edge_light"], 0.008, floor)


def add_atrium(parent, mats, floor_id: str, x: float, y: float, z: float, rx: float, ry: float, label: str) -> None:
    torus(f"floor.{floor_id}.atrium.{label}.glowRail", (x, y, z + 0.38), 1.0, 0.032, mats["line"], (rx, ry, 0.06), parent)
    cylinder(f"floor.{floor_id}.atrium.{label}.darkOpenSpace", (x, y, z + 0.31), 1.0, 0.032, mats["atrium"], 96, parent).scale = (rx * 0.78, ry * 0.72, 1)
    for i in range(12):
        t = math.tau * i / 12
        px = x + math.cos(t) * rx * 1.04
        py = y + math.sin(t) * ry * 1.04
        cylinder(f"floor.{floor_id}.atrium.{label}.post.{i:02d}", (px, py, z + 0.55), 0.015, 0.38, mats["edge_light"], 10, parent)


def add_stores_for_floor(parent, mats, floor_id: str, y_offset: float, layout: list[tuple[float, float, float, float, float, float]]) -> None:
    for idx, (x, y, w, d, h, rz) in enumerate(layout, start=1):
        add_store(parent, mats, floor_id, idx, x, y_offset + y, w, d, h, rz)


def floor_layouts() -> dict[str, list[tuple[float, float, float, float, float, float]]]:
    f1 = [
        (-6.35, -2.75, 1.35, 0.86, 0.42, 0), (-4.82, -2.82, 1.18, 0.92, 0.38, 0), (-3.42, -2.95, 1.08, 0.68, 0.40, 6),
        (-1.82, -2.92, 1.22, 0.72, 0.42, -8), (0.10, -3.02, 1.46, 0.68, 0.44, 5), (2.05, -2.85, 1.34, 0.78, 0.40, 0),
        (3.78, -2.72, 1.22, 0.92, 0.42, 0), (5.62, -2.58, 1.96, 1.08, 0.54, 0), (-6.08, 2.55, 1.75, 1.00, 0.50, 0),
        (-4.02, 2.66, 1.24, 0.80, 0.38, -7), (-2.35, 2.72, 1.44, 0.82, 0.42, 0), (-0.50, 2.80, 1.18, 0.72, 0.38, 8),
        (1.25, 2.82, 1.66, 0.86, 0.44, 0), (3.25, 2.68, 1.30, 0.80, 0.38, 7), (5.28, 2.52, 2.05, 1.08, 0.54, 0),
        (-3.00, -0.74, 1.0, 0.62, 0.36, -25), (-2.55, 0.74, 1.0, 0.60, 0.34, 25), (0.58, -1.05, 1.18, 0.66, 0.42, 18),
        (0.98, 0.82, 1.10, 0.62, 0.38, -18), (2.50, -0.22, 1.42, 0.72, 0.46, 0), (4.35, 0.32, 1.54, 0.84, 0.42, 0),
        (-7.05, 0.28, 0.94, 1.32, 0.34, 0), (6.95, -0.38, 1.04, 1.44, 0.36, 0), (-0.62, -1.85, 0.88, 0.50, 0.34, -10),
        (-0.10, 1.55, 0.96, 0.52, 0.34, 12), (2.92, 1.55, 1.06, 0.54, 0.38, -8),
    ]
    f2 = [
        (-6.05, -2.25, 1.36, 0.82, 0.42, 0), (-4.45, -2.35, 1.22, 0.72, 0.38, 4), (-2.92, -2.42, 1.18, 0.68, 0.38, -5),
        (-1.25, -2.40, 1.36, 0.74, 0.42, 0), (0.62, -2.35, 1.48, 0.72, 0.42, 0), (2.55, -2.22, 1.22, 0.76, 0.38, 6),
        (4.25, -2.10, 1.38, 0.86, 0.44, 0), (6.05, -1.95, 1.58, 1.0, 0.50, 0), (-5.82, 2.18, 1.70, 0.92, 0.50, 0),
        (-3.82, 2.30, 1.20, 0.76, 0.38, -8), (-2.18, 2.35, 1.30, 0.72, 0.40, 0), (-0.45, 2.42, 1.24, 0.70, 0.38, 8),
        (1.28, 2.38, 1.40, 0.76, 0.42, 0), (3.05, 2.28, 1.20, 0.72, 0.36, 7), (5.18, 2.12, 2.0, 1.00, 0.52, 0),
        (-3.25, -0.55, 1.16, 0.64, 0.38, -18), (-2.18, 0.72, 1.02, 0.58, 0.34, 20), (0.28, -0.92, 1.10, 0.60, 0.38, 18),
        (1.10, 0.75, 1.08, 0.60, 0.36, -18), (2.90, -0.15, 1.36, 0.68, 0.42, 0), (4.50, 0.68, 1.24, 0.66, 0.38, -12),
        (-6.95, 0.15, 0.92, 1.18, 0.34, 0),
    ]
    f3 = [
        (-6.20, -2.12, 1.28, 0.76, 0.40, 0), (-4.72, -2.22, 1.10, 0.70, 0.36, 3), (-3.25, -2.28, 1.14, 0.66, 0.38, -5),
        (-1.65, -2.26, 1.30, 0.72, 0.40, 0), (0.10, -2.18, 1.36, 0.70, 0.40, 0), (1.92, -2.10, 1.20, 0.72, 0.36, 6),
        (3.58, -1.98, 1.26, 0.80, 0.40, 0), (5.48, -1.78, 1.90, 0.98, 0.52, 0), (-5.92, 2.05, 1.64, 0.90, 0.48, 0),
        (-3.95, 2.18, 1.18, 0.72, 0.36, -8), (-2.35, 2.25, 1.26, 0.70, 0.38, 0), (-0.62, 2.32, 1.20, 0.68, 0.36, 8),
        (1.08, 2.28, 1.34, 0.74, 0.40, 0), (2.82, 2.16, 1.14, 0.70, 0.34, 7), (4.88, 1.98, 1.90, 0.96, 0.50, 0),
        (-3.38, -0.42, 1.08, 0.60, 0.36, -18), (-2.12, 0.72, 1.0, 0.56, 0.34, 20), (0.42, -0.80, 1.04, 0.58, 0.36, 18),
        (1.18, 0.72, 1.04, 0.58, 0.34, -18), (2.78, -0.02, 1.30, 0.64, 0.40, 0), (4.35, 0.62, 1.18, 0.62, 0.36, -12),
        (-6.82, 0.10, 0.86, 1.12, 0.32, 0),
    ]
    return {"F1": f1, "F2": f2, "F3": f3}


def add_escalator_pair_on_floor(parent, mats, floor_id: str, x: float, y: float, z: float, rz: float) -> None:
    root = empty(f"floor.{floor_id}.transport.escalatorGroup.{x:.1f}.{y:.1f}", parent)
    angle = math.radians(rz)
    direction = Vector((math.cos(angle), math.sin(angle), 0))
    normal = Vector((-math.sin(angle), math.cos(angle), 0))
    for lane, offset in enumerate((-0.22, 0.22)):
        center = Vector((x, y, z + 0.13)) + normal * offset
        body = cube(f"{root.name}.lane{lane}.inclineBody", tuple(center), (1.55, 0.22, 0.18), mats["metal"], 0.035, root)
        body.rotation_euler[2] = angle
        for step in range(9):
            pos = Vector((x, y, z + 0.23 + step * 0.010)) + normal * offset + direction * (-0.60 + step * 0.15)
            tread = cube(f"{root.name}.lane{lane}.tread.{step:02d}", tuple(pos), (0.12, 0.19, 0.026), mats["edge_light"], 0.004, root)
            tread.rotation_euler[2] = angle
        for side in (-0.14, 0.14):
            rail_center = Vector((x, y, z + 0.36)) + normal * (offset + side)
            rail = cube(f"{root.name}.lane{lane}.glassRail.{side}", tuple(rail_center), (1.58, 0.034, 0.28), mats["glass"], 0.01, root)
            rail.rotation_euler[2] = angle
            hand_center = Vector((x, y, z + 0.52)) + normal * (offset + side)
            hand = cube(f"{root.name}.lane{lane}.warmHandrail.{side}", tuple(hand_center), (1.60, 0.034, 0.034), mats["warm"], 0.012, root)
            hand.rotation_euler[2] = angle


def beam_between(name: str, start: tuple[float, float, float], end: tuple[float, float, float], width: float, thickness: float, mat, parent=None):
    start_v = Vector(start)
    end_v = Vector(end)
    direction = end_v - start_v
    center = (start_v + end_v) / 2
    obj = cube(name, tuple(center), (direction.length, width, thickness), mat, 0.02, parent)
    obj.rotation_euler = direction.to_track_quat("X", "Z").to_euler()
    return obj


def add_cross_floor_escalator(parent, mats, name: str, start: tuple[float, float, float], end: tuple[float, float, float]) -> None:
    root = empty(f"mall.transport.escalatorBridge.{name}", parent)
    beam_between(f"{root.name}.inclineBody", start, end, 0.34, 0.13, mats["metal"], root)
    sx, sy, sz = start
    ex, ey, ez = end
    direction = Vector(end) - Vector(start)
    for i in range(11):
        t = i / 10
        x = sx + (ex - sx) * t
        y = sy + (ey - sy) * t
        z = sz + (ez - sz) * t
        tread = cube(f"{root.name}.tread.{i:02d}", (x, y, z + 0.02), (0.16, 0.36, 0.026), mats["edge_light"], 0.004, root)
        tread.rotation_euler = direction.to_track_quat("X", "Z").to_euler()
    for side in (-0.24, 0.24):
        beam_between(f"{root.name}.glassBalustrade.{side}", (sx, sy + side, sz + 0.14), (ex, ey + side, ez + 0.14), 0.045, 0.28, mats["glass"], root)
        beam_between(f"{root.name}.warmHandrail.{side}", (sx, sy + side, sz + 0.32), (ex, ey + side, ez + 0.32), 0.04, 0.04, mats["warm"], root)
    cube(f"{root.name}.lowerLanding", (sx, sy, sz - 0.04), (0.78, 0.62, 0.06), mats["slab_edge"], 0.04, root)
    cube(f"{root.name}.upperLanding", (ex, ey, ez - 0.04), (0.78, 0.62, 0.06), mats["slab_edge"], 0.04, root)


def add_vertical_core(parent, mats, name: str, x: float, y: float, z_min: float, z_max: float) -> None:
    core = empty(f"mall.core.{name}", parent)
    height = z_max - z_min
    center_z = z_min + height / 2
    for i, (dx, dy) in enumerate([(-0.24, -0.24), (0.24, -0.24), (0.24, 0.24), (-0.24, 0.24)]):
        cylinder(f"mall.core.{name}.transparentColumn.{i}", (x + dx, y + dy, center_z), 0.034, height, mats["core"], 18, core)
    for side, loc, scale in [
        ("north", (x, y + 0.25, center_z), (0.54, 0.028, height)),
        ("south", (x, y - 0.25, center_z), (0.54, 0.028, height)),
        ("east", (x + 0.25, y, center_z), (0.028, 0.54, height)),
        ("west", (x - 0.25, y, center_z), (0.028, 0.54, height)),
    ]:
        cube(f"mall.core.{name}.glassWall.{side}", loc, scale, mats["core"], 0.006, core)
    for floor_id, z in FLOORS:
        if z_min - 0.1 <= z <= z_max + 0.1:
            cube(f"mall.core.{name}.frame.{floor_id}", (x, y, z + 0.56), (0.70, 0.055, 0.055), mats["edge_light"], 0.012, core)
            cube(f"mall.core.{name}.frame.{floor_id}.cross", (x, y, z + 0.56), (0.055, 0.70, 0.055), mats["edge_light"], 0.012, core)
            cube(f"mall.core.{name}.base.{floor_id}", (x, y, z + 0.30), (0.82, 0.82, 0.055), mats["core"], 0.06, core)


def setup_camera_and_lighting() -> None:
    world = bpy.context.scene.world or bpy.data.worlds.new("World")
    bpy.context.scene.world = world
    world.color = (0.004, 0.028, 0.052)
    bpy.ops.object.light_add(type="AREA", location=(0, -4.5, 9.8))
    key = bpy.context.object
    key.name = "mall.lighting.largeSoftbox"
    key.data.energy = 740
    key.data.size = 8.5
    bpy.ops.object.light_add(type="POINT", location=(-5.6, -5.4, 5.4))
    rim = bpy.context.object
    rim.name = "mall.lighting.cyanRim"
    rim.data.energy = 210
    rim.data.color = (0.25, 0.86, 1.0)
    bpy.ops.object.light_add(type="POINT", location=(4.2, 3.8, 6.4))
    warm = bpy.context.object
    warm.name = "mall.lighting.escalatorWarmAccent"
    warm.data.energy = 85
    warm.data.color = (1.0, 0.62, 0.22)
    bpy.ops.object.camera_add(location=(10.7, -9.6, 7.0), rotation=(math.radians(62), 0, math.radians(43)))
    cam = bpy.context.object
    cam.name = "mall.camera.isometricOverview"
    direction = Vector((0.1, -0.05, 2.8)) - cam.location
    cam.rotation_euler = direction.to_track_quat("-Z", "Y").to_euler()
    cam.data.type = "ORTHO"
    cam.data.ortho_scale = 12.8
    bpy.context.scene.camera = cam
    try:
        bpy.context.scene.render.engine = "BLENDER_EEVEE_NEXT"
    except TypeError:
        bpy.context.scene.render.engine = "BLENDER_EEVEE"
    bpy.context.scene.render.resolution_x = 1600
    bpy.context.scene.render.resolution_y = 900


def audit_scene() -> None:
    names = [obj.name for obj in bpy.data.objects] + [mat.name for mat in bpy.data.materials]
    bad = [word for word in BLOCKED_KEYWORDS if any(word.lower() in name.lower() for name in names)]
    if bad:
        raise RuntimeError(f"blocked external asset keyword found: {bad}")
    floor_count = sum(1 for obj in bpy.data.objects if obj.name in {"floor.F1", "floor.F2", "floor.F3"})
    store_count = sum(1 for obj in bpy.data.objects if ".store.S" in obj.name and obj.type == "MESH" and ".topSign" not in obj.name)
    core_count = sum(1 for obj in bpy.data.objects if obj.name.startswith("mall.core.") and obj.type == "EMPTY")
    floor_escalator_count = sum(1 for obj in bpy.data.objects if ".transport.escalatorGroup." in obj.name and obj.type == "EMPTY")
    bridge_escalator_count = sum(1 for obj in bpy.data.objects if obj.name.startswith("mall.transport.escalatorBridge.") and obj.type == "EMPTY")
    print(
        "prototype_audit "
        f"floor_count={floor_count} store_meshes={store_count} core_groups={core_count} "
        f"floor_escalators={floor_escalator_count} escalator_bridges={bridge_escalator_count} object_count={len(bpy.data.objects)}"
    )
    if floor_count != 3 or store_count != 70 or core_count < 7 or floor_escalator_count < 6 or bridge_escalator_count < 4:
        raise RuntimeError("prototype structure is incomplete")


def main() -> None:
    clear_scene()
    mats = make_materials()
    root = empty("mall.root.explodedThreeLayerBluePrototype")
    layouts = floor_layouts()

    floor_specs = {
        "F1": (0.0, 0.0, 16.4, 8.6, 4),
        "F2": (2.65, 0.18, 15.7, 7.8, 3),
        "F3": (5.30, 0.32, 15.9, 7.4, 2),
    }
    for floor_id, (z, y_offset, width, depth, complexity) in floor_specs.items():
        add_slab(root, mats, floor_id, z, y_offset, width, depth, complexity)
        floor = bpy.data.objects[f"floor.{floor_id}"]
        add_atrium(floor, mats, floor_id, -0.85, y_offset - 0.05, z, 1.85, 1.05, "central")
        if floor_id != "F3":
            add_atrium(floor, mats, floor_id, 2.75, y_offset + 0.25, z, 1.05, 0.62, "side")
        add_stores_for_floor(floor, mats, floor_id, y_offset, layouts[floor_id])
        add_escalator_pair_on_floor(floor, mats, floor_id, -1.90, y_offset + 1.46, z + 0.34, -18)
        add_escalator_pair_on_floor(floor, mats, floor_id, 1.65, y_offset - 1.34, z + 0.34, 18)
        add_label(f"floor.{floor_id}.largeFloorIdLabel", floor_id, (0, y_offset - depth / 2 + 0.60, z + 0.54), mats["sign_white"], 0.34, 0, floor)

    for name, x, y in [
        ("westAtrium", -5.95, -2.25),
        ("leftCenter", -3.45, 1.95),
        ("mainAtriumA", -0.95, -0.12),
        ("mainAtriumB", 1.35, 1.18),
        ("eastAnchor", 5.85, -1.65),
        ("eastRear", 6.35, 2.25),
        ("northWest", -6.25, 2.85),
    ]:
        add_vertical_core(root, mats, name, x, y, 0.20, 5.76)

    add_cross_floor_escalator(root, mats, "F1ToF2.northbound", (-2.15, 1.35, 0.62), (-1.10, 1.05, 2.88))
    add_cross_floor_escalator(root, mats, "F1ToF2.southbound", (1.85, -1.42, 0.62), (0.75, -1.08, 2.88))
    add_cross_floor_escalator(root, mats, "F2ToF3.northbound", (-2.55, 1.28, 3.06), (-1.35, 1.02, 5.54))
    add_cross_floor_escalator(root, mats, "F2ToF3.southbound", (2.35, -1.28, 3.06), (1.05, -0.98, 5.54))

    setup_camera_and_lighting()
    audit_scene()
    BLEND_PATH.parent.mkdir(parents=True, exist_ok=True)
    bpy.ops.wm.save_as_mainfile(filepath=str(BLEND_PATH))
    print(f"saved_blend={BLEND_PATH}")


main()
