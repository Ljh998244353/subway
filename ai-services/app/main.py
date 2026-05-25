"""AI Services main application.

License: MIT (project-authored code)
FastAPI application for AI video processing services.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime, timezone

from app.api.routes import router


app = FastAPI(
    title="Mall Vision AI Services",
    description="AI video processing services for mall operations",
    version="0.1.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API routes
app.include_router(router)


@app.get("/")
async def root():
    """Root endpoint."""
    return {
        "service": "mall-vision-ai-services",
        "version": "0.1.0",
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "docs": "/docs"
    }


@app.get("/health")
async def health():
    """Health check endpoint."""
    return {
        "status": "ok",
        "service": "mall-vision-ai-services",
        "timestamp": datetime.now(timezone.utc).isoformat()
    }