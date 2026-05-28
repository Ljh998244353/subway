from __future__ import annotations

import sys
from pathlib import Path

import bpy

PROJECT_ROOT = Path(r"\\wsl.localhost\Ubuntu-24.04\home\ljh\project\subway") if sys.platform == "win32" else Path("/home/ljh/project/subway")
BLEND_PATH = PROJECT_ROOT / "assets/blender/mall_exploded_three_layer_prototype.blend"
GLB_PATH = PROJECT_ROOT / "frontend/public/models/mall_exploded_three_layer_prototype.glb"
BLOCKED_KEYWORDS = ("Sketchfab", "Poly Haven", "Hyper3D", "Hunyuan3D", "Rodin", "Fal", "http://", "https://")


def main() -> None:
    bpy.ops.wm.open_mainfile(filepath=str(BLEND_PATH))
    object_names = [obj.name for obj in bpy.data.objects]
    material_names = [mat.name for mat in bpy.data.materials]
    blocked = [word for word in BLOCKED_KEYWORDS if any(word.lower() in name.lower() for name in object_names + material_names)]
    floor_roots = sorted(name for name in object_names if name in {"floor.F1", "floor.F2", "floor.F3"})
    stores = sorted(
        name
        for name in object_names
        if ".store.S" in name and ".topSign" not in name and ".label" not in name and bpy.data.objects[name].type == "MESH"
    )
    cores = sorted(name for name in object_names if name.startswith("mall.core.") and bpy.data.objects[name].type == "EMPTY")
    slabs = sorted(name for name in object_names if ".slab." in name or ".edge." in name)
    floor_escalators = sorted(
        name for name in object_names if ".transport.escalatorGroup." in name and bpy.data.objects[name].type == "EMPTY"
    )
    escalator_bridges = sorted(
        name for name in object_names if name.startswith("mall.transport.escalatorBridge.") and bpy.data.objects[name].type == "EMPTY"
    )
    if blocked:
        raise RuntimeError(f"blocked keyword found: {blocked}")
    if (
        len(floor_roots) != 3
        or len(stores) != 70
        or len(cores) < 7
        or len(floor_escalators) < 6
        or len(escalator_bridges) < 4
    ):
        raise RuntimeError("prototype failed structural inspection")
    print(f"blend={BLEND_PATH}")
    print(
        f"objects={len(object_names)} materials={len(material_names)} floors={len(floor_roots)} "
        f"stores={len(stores)} cores={len(cores)} floor_escalators={len(floor_escalators)} "
        f"escalator_bridges={len(escalator_bridges)} slabs_or_edges={len(slabs)}"
    )
    print(f"first_floors={floor_roots}")
    print(f"sample_stores={stores[:8]}")
    print(f"sample_cores={cores[:4]}")
    print(f"sample_floor_escalators={floor_escalators[:4]}")
    print(f"sample_escalator_bridges={escalator_bridges[:4]}")
    GLB_PATH.parent.mkdir(parents=True, exist_ok=True)
    bpy.ops.object.select_all(action="DESELECT")
    root = bpy.data.objects.get("mall.root.explodedThreeLayerBluePrototype")
    if root:
        root.select_set(True)
        bpy.context.view_layer.objects.active = root
    try:
        bpy.ops.export_scene.gltf(filepath=str(GLB_PATH), export_format="GLB", use_selection=False)
        print(f"exported_glb={GLB_PATH}")
    except Exception as exc:
        print(f"glb_export_skipped={type(exc).__name__}: {exc}")


main()
