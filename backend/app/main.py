from fastapi import FastAPI

from app.api.routes.advice import router as advice_router
from app.api.routes.health import router as health_router
from app.api.routes.overview import router as overview_router
from app.api.routes.reference import router as reference_router
from app.core.errors import register_error_handlers
from app.core.trace import register_trace_middleware


def create_app() -> FastAPI:
    app = FastAPI(
        title="Mall Vision AI Backend",
        version="0.1.0",
        openapi_url="/openapi.json",
        docs_url="/docs",
        redoc_url="/redoc",
    )
    register_trace_middleware(app)
    register_error_handlers(app)
    app.include_router(advice_router)
    app.include_router(health_router)
    app.include_router(reference_router)
    app.include_router(overview_router)
    return app


app = create_app()
