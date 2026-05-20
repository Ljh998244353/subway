from uuid import uuid4

from fastapi import FastAPI, Request


def register_trace_middleware(app: FastAPI) -> None:
    @app.middleware("http")
    async def trace_middleware(request: Request, call_next):
        request.state.trace_id = request.headers.get("X-Request-Id") or f"req_{uuid4().hex[:16]}"
        response = await call_next(request)
        response.headers["X-Request-Id"] = request.state.trace_id
        return response
