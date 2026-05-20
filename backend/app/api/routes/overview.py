from datetime import UTC, datetime

from fastapi import APIRouter, HTTPException, Query, Request

from app.fixtures.overview import get_overview as get_overview_fixture
from app.fixtures.reference import get_mall
from app.schemas.common import Envelope
from app.schemas.overview import OverviewDto

router = APIRouter(prefix="/api/v1", tags=["overview"])


@router.get("/overview", response_model=Envelope[OverviewDto])
def get_overview(request: Request, mallId: str = Query(..., min_length=1)) -> Envelope[OverviewDto]:
    if get_mall(mallId) is None:
        raise HTTPException(
            status_code=404,
            detail={"code": "MALL_NOT_FOUND", "message": "Mall not found", "details": {"mallId": mallId}},
        )

    overview = get_overview_fixture(mallId)
    if overview is None:
        raise HTTPException(
            status_code=404,
            detail={"code": "OVERVIEW_NOT_FOUND", "message": "Overview not found", "details": {"mallId": mallId}},
        )

    return Envelope(data=overview, traceId=request.state.trace_id, timestamp=datetime.now(UTC))
