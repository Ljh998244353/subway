#!/usr/bin/env python3
"""Probe the local Windows BlenderMCP bridge from WSL.

This script intentionally uses only the Python standard library. It validates
paths, checks Python dependencies, opens the BlenderMCP socket, and optionally
sends the same JSON command shape used by blender-mcp.
"""

from __future__ import annotations

import argparse
import importlib.util
import json
import os
import socket
import sys
from pathlib import Path


DEFAULT_BLENDER = Path("/mnt/l/Software/blender/blender.exe")
DEFAULT_MCP = Path("/mnt/l/Software/blender-mcp")
DEFAULT_HOST_CANDIDATES = ("127.0.0.1", "localhost")
DEFAULT_PORT = 9876


def has_module(name: str) -> bool:
    return importlib.util.find_spec(name) is not None


def recv_json(sock: socket.socket, timeout: float) -> dict:
    sock.settimeout(timeout)
    chunks: list[bytes] = []
    while True:
        chunk = sock.recv(8192)
        if not chunk:
            break
        chunks.append(chunk)
        try:
            return json.loads(b"".join(chunks).decode("utf-8"))
        except json.JSONDecodeError:
            continue
    if not chunks:
        raise RuntimeError("no response bytes received")
    return json.loads(b"".join(chunks).decode("utf-8"))


def try_socket(host: str, port: int, timeout: float, command: str | None) -> tuple[bool, str]:
    try:
        with socket.create_connection((host, port), timeout=timeout) as sock:
            if not command:
                return True, "socket connected"
            sock.sendall(json.dumps({"type": command, "params": {}}).encode("utf-8"))
            response = recv_json(sock, timeout)
            status = response.get("status", "unknown")
            keys = sorted(response.get("result", {}).keys())
            return True, f"command {command!r} returned status={status}, result_keys={keys}"
    except Exception as exc:  # noqa: BLE001 - diagnostic CLI should report exact failure.
        return False, f"{type(exc).__name__}: {exc}"


def main() -> int:
    parser = argparse.ArgumentParser(description="Probe Windows BlenderMCP from WSL.")
    parser.add_argument("--blender", default=os.getenv("BLENDER_EXE", str(DEFAULT_BLENDER)))
    parser.add_argument("--mcp-dir", default=os.getenv("BLENDER_MCP_DIR", str(DEFAULT_MCP)))
    parser.add_argument("--host", action="append", help="Host to test. Can be repeated.")
    parser.add_argument("--port", type=int, default=int(os.getenv("BLENDER_PORT", DEFAULT_PORT)))
    parser.add_argument("--timeout", type=float, default=3.0)
    parser.add_argument("--command", default="get_scene_info")
    parser.add_argument("--socket-only", action="store_true")
    args = parser.parse_args()

    blender = Path(args.blender)
    mcp_dir = Path(args.mcp_dir)
    hosts = args.host or list(DEFAULT_HOST_CANDIDATES)
    command = None if args.socket_only else args.command

    print(f"blender_exe={blender} exists={blender.exists()}")
    print(f"blender_mcp_dir={mcp_dir} exists={mcp_dir.exists()}")
    print(f"addon_py={(mcp_dir / 'addon.py')} exists={(mcp_dir / 'addon.py').exists()}")
    print(f"server_py={(mcp_dir / 'src/blender_mcp/server.py')} exists={(mcp_dir / 'src/blender_mcp/server.py').exists()}")
    print(f"python={sys.executable} version={sys.version.split()[0]}")
    print(f"module_mcp={has_module('mcp')}")
    print(f"module_supabase={has_module('supabase')}")
    print(f"telemetry_disabled={os.getenv('DISABLE_TELEMETRY') or os.getenv('BLENDER_MCP_DISABLE_TELEMETRY') or os.getenv('MCP_DISABLE_TELEMETRY')}")

    any_success = False
    for host in hosts:
        ok, detail = try_socket(host, args.port, args.timeout, command)
        any_success = any_success or ok
        print(f"probe {host}:{args.port} ok={ok} detail={detail}")

    return 0 if any_success else 2


if __name__ == "__main__":
    raise SystemExit(main())
