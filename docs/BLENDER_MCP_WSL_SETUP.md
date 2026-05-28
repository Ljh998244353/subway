# BlenderMCP WSL Setup

This project can control Windows Blender from WSL through the local BlenderMCP socket bridge. Use it only for self-authored synthetic geometry.

## Boundaries

- Disable telemetry with `DISABLE_TELEMETRY=true`, `BLENDER_MCP_DISABLE_TELEMETRY=true`, and `MCP_DISABLE_TELEMETRY=true`.
- Keep Poly Haven, Sketchfab, Hyper3D/Rodin, Hunyuan3D, external downloads, textures, HDRIs, real mall material, and real brand/logo assets disabled.
- Use BlenderMCP only for controlled Blender Python against local synthetic scenes.

## Windows Blender Side

1. Open `L:\Software\blender\blender.exe`.
2. Install `L:\Software\blender-mcp\addon.py` if it is not already installed.
3. Enable the `Interface: Blender MCP` add-on.
4. In the 3D View sidebar, open `BlenderMCP`.
5. Use port `9876`.
6. Leave all external asset/model-generation checkboxes off.
7. Click `Connect to MCP server`.

## WSL Probe

From the repository root:

```bash
DISABLE_TELEMETRY=true BLENDER_MCP_DISABLE_TELEMETRY=true MCP_DISABLE_TELEMETRY=true \
python3 scripts/blender/probe_blender_mcp.py --socket-only
```

If socket-only succeeds, verify the Blender command protocol:

```bash
DISABLE_TELEMETRY=true BLENDER_MCP_DISABLE_TELEMETRY=true MCP_DISABLE_TELEMETRY=true \
python3 scripts/blender/probe_blender_mcp.py
```

If `127.0.0.1` does not work from WSL, test the Windows host IP:

```bash
python3 scripts/blender/probe_blender_mcp.py --host <windows-host-ip> --socket-only
```

## Codex MCP Registration

Register the stdio server:

```bash
codex mcp add blender \
  --env DISABLE_TELEMETRY=true \
  --env BLENDER_MCP_DISABLE_TELEMETRY=true \
  --env MCP_DISABLE_TELEMETRY=true \
  --env BLENDER_HOST=127.0.0.1 \
  --env BLENDER_PORT=9876 \
  -- /home/ljh/project/subway/scripts/blender/run_blender_mcp_server.sh
```

After registration, restart or open a new Codex session if the `blender` MCP tools are not visible in the current session.

## Dependency Setup

The local WSL Python must have the BlenderMCP server dependencies (`mcp[cli]`, `supabase`, `tomli`) available. If they are missing, create an ignored project-local virtual environment and install from the local BlenderMCP checkout:

```bash
python3 -m venv /home/ljh/project/subway/.venv-blender-mcp
/home/ljh/project/subway/.venv-blender-mcp/bin/python -m pip install -e /mnt/l/Software/blender-mcp
```

This downloads packages from Python package indexes, so it requires explicit network approval in restricted environments.
