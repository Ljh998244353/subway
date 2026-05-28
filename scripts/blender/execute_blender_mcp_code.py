#!/usr/bin/env python3
"""Execute a local Blender Python script through the BlenderMCP socket."""

from __future__ import annotations

import argparse
import json
import socket
from pathlib import Path


def receive_json(sock: socket.socket, timeout: float) -> dict:
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
        raise RuntimeError("BlenderMCP returned no response bytes")
    return json.loads(b"".join(chunks).decode("utf-8"))


def main() -> int:
    parser = argparse.ArgumentParser(description="Send execute_code to BlenderMCP.")
    parser.add_argument("script", help="Path to a Blender Python script.")
    parser.add_argument("--host", default="127.0.0.1")
    parser.add_argument("--port", type=int, default=9876)
    parser.add_argument("--timeout", type=float, default=240.0)
    args = parser.parse_args()

    script_path = Path(args.script)
    code = script_path.read_text(encoding="utf-8")
    payload = {"type": "execute_code", "params": {"code": code}}

    with socket.create_connection((args.host, args.port), timeout=args.timeout) as sock:
        sock.sendall(json.dumps(payload).encode("utf-8"))
        response = receive_json(sock, args.timeout)

    status = response.get("status")
    print(f"status={status}")
    if status != "success":
        print(response.get("message", response))
        return 1

    result = response.get("result", {})
    output = result.get("result", "")
    if output:
        print(output.rstrip())
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
