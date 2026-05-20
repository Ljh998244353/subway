from datetime import UTC, datetime

from fastapi import APIRouter, Request

from app.core.config import settings
from app.schemas.common import Envelope
from app.schemas.health import DependencyHealth, HealthData

router = APIRouter(prefix="/api/v1", tags=["health"])


@router.get("/health", response_model=Envelope[HealthData])
def get_health(request: Request) -> Envelope[HealthData]:
    now = datetime.now(UTC)
    data = HealthData(
        status="ok",
        service=settings.service_name,
        version=settings.version,
        environment=settings.environment,
        database=DependencyHealth(status="not_configured", dialect="mysql"),
        redis=DependencyHealth(status="not_configured"),
        time=now,
    )
    return Envelope(data=data, traceId=request.state.trace_id, timestamp=now)
