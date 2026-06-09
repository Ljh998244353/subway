from datetime import UTC, datetime

from fastapi import APIRouter, HTTPException, Request

from app.schemas.advice import StoreManagementAdviceRequestDto, StoreManagementAdviceResponseDto
from app.schemas.common import Envelope
from app.services.store_advice import build_store_management_advice, contains_blocked_keys

router = APIRouter(prefix="/api/v1", tags=["advice"])


@router.post("/advice/store-management", response_model=Envelope[StoreManagementAdviceResponseDto])
def post_store_management_advice(payload: StoreManagementAdviceRequestDto, request: Request) -> Envelope[StoreManagementAdviceResponseDto]:
    blocked_keys = contains_blocked_keys(payload.model_dump())
    if blocked_keys:
        raise HTTPException(
            status_code=422,
            detail={
                "code": "BLOCKED_ADVICE_INPUT",
                "message": "Store management advice accepts synthetic aggregate fields only",
                "details": {"blockedKeys": blocked_keys},
            },
        )

    return Envelope(data=build_store_management_advice(payload), traceId=request.state.trace_id, timestamp=datetime.now(UTC))
