#!/usr/bin/env bash
set -euo pipefail

# Run the local BlenderMCP stdio server with project-safe defaults.
# The Blender add-on must already be enabled and listening in Windows Blender.

export BLENDER_MCP_DIR="${BLENDER_MCP_DIR:-/mnt/l/Software/blender-mcp}"
export BLENDER_MCP_VENV="${BLENDER_MCP_VENV:-/home/ljh/project/subway/.venv-blender-mcp}"
export BLENDER_HOST="${BLENDER_HOST:-127.0.0.1}"
export BLENDER_PORT="${BLENDER_PORT:-9876}"

export DISABLE_TELEMETRY="${DISABLE_TELEMETRY:-true}"
export BLENDER_MCP_DISABLE_TELEMETRY="${BLENDER_MCP_DISABLE_TELEMETRY:-true}"
export MCP_DISABLE_TELEMETRY="${MCP_DISABLE_TELEMETRY:-true}"

if [[ ! -d "${BLENDER_MCP_DIR}" ]]; then
  echo "BlenderMCP directory not found: ${BLENDER_MCP_DIR}" >&2
  exit 2
fi

cd "${BLENDER_MCP_DIR}"

if [[ -x "${BLENDER_MCP_VENV}/bin/python" ]]; then
  exec "${BLENDER_MCP_VENV}/bin/python" -m blender_mcp.server
fi

if [[ -x ".venv/bin/python" ]]; then
  exec ".venv/bin/python" -m blender_mcp.server
fi

echo "BlenderMCP Python dependencies are not installed." >&2
echo "Create them with: python3 -m venv ${BLENDER_MCP_VENV} && ${BLENDER_MCP_VENV}/bin/python -m pip install -e ${BLENDER_MCP_DIR}" >&2
exit 2
