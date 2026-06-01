from datetime import UTC, datetime

from fastapi import APIRouter, HTTPException, Query, Request

from app.fixtures.reference import (
    get_customer_profile,
    get_floor,
    get_heatmap,
    get_mall,
    get_store,
    get_store_flow,
    get_store_score,
    get_trajectories,
    list_floors_for_mall,
    list_malls,
    list_store_alerts_for_mall,
    list_store_rankings_for_mall,
    list_stores_for_floor,
)
from app.schemas.common import Envelope, ListEnvelope, PageMeta
from app.schemas.reference import CustomerProfileDto, FloorDto, HeatmapDto, MallDto, StoreAlertDto, StoreDto, StoreFlowDto, StoreRankingItemDto, StoreScoreDto, TrajectoriesDto

router = APIRouter(prefix="/api/v1", tags=["reference"])


@router.get("/malls", response_model=ListEnvelope[MallDto])
def get_malls(request: Request) -> ListEnvelope[MallDto]:
    return build_list_response(request, list_malls())


@router.get("/malls/{mall_id}/floors", response_model=ListEnvelope[FloorDto])
def get_mall_floors(mall_id: str, request: Request) -> ListEnvelope[FloorDto]:
    if get_mall(mall_id) is None:
        raise_not_found("MALL_NOT_FOUND", "Mall not found", {"mallId": mall_id})
    return build_list_response(request, list_floors_for_mall(mall_id))


@router.get("/floors/{floor_id}/stores", response_model=ListEnvelope[StoreDto])
def get_floor_stores(floor_id: str, request: Request) -> ListEnvelope[StoreDto]:
    if get_floor(floor_id) is None:
        raise_not_found("FLOOR_NOT_FOUND", "Floor not found", {"floorId": floor_id})
    return build_list_response(request, list_stores_for_floor(floor_id))


@router.get("/stores/ranking", response_model=ListEnvelope[StoreRankingItemDto])
def get_store_ranking(
    request: Request,
    mallId: str = Query(..., min_length=1),
    floorId: str | None = Query(default=None, min_length=1),
    categoryId: str | None = Query(default=None, min_length=1),
    grade: str | None = Query(default=None, pattern="^(A|B|C|D)$"),
    minScore: float | None = Query(default=None, ge=0, le=100),
    maxScore: float | None = Query(default=None, ge=0, le=100),
    limit: int | None = Query(default=None, ge=1, le=100),
) -> ListEnvelope[StoreRankingItemDto]:
    if get_mall(mallId) is None:
        raise_not_found("MALL_NOT_FOUND", "Mall not found", {"mallId": mallId})
    if minScore is not None and maxScore is not None and minScore > maxScore:
        raise HTTPException(
            status_code=422,
            detail={"code": "INVALID_SCORE_RANGE", "message": "minScore must be less than or equal to maxScore", "details": {"minScore": minScore, "maxScore": maxScore}},
        )
    return build_list_response(
        request,
        list_store_rankings_for_mall(
            mallId,
            floor_id=floorId,
            category_id=categoryId,
            grade=grade,
            min_score=minScore,
            max_score=maxScore,
            limit=limit,
        ),
    )


@router.get("/alerts/stores", response_model=ListEnvelope[StoreAlertDto])
def get_store_alerts(request: Request, mallId: str = Query(..., min_length=1)) -> ListEnvelope[StoreAlertDto]:
    if get_mall(mallId) is None:
        raise_not_found("MALL_NOT_FOUND", "Mall not found", {"mallId": mallId})
    return build_list_response(request, list_store_alerts_for_mall(mallId))


@router.get("/customer-profile", response_model=Envelope[CustomerProfileDto])
def get_customer_profile_detail(request: Request, mallId: str = Query(..., min_length=1)) -> Envelope[CustomerProfileDto]:
    if get_mall(mallId) is None:
        raise_not_found("MALL_NOT_FOUND", "Mall not found", {"mallId": mallId})

    profile = get_customer_profile(mallId)
    if profile is None:
        raise RuntimeError(f"Missing synthetic customer profile fixture for existing mall: {mallId}")
    return build_object_response(request, profile)


@router.get("/heatmap", response_model=Envelope[HeatmapDto])
def get_heatmap_detail(request: Request, mallId: str = Query(..., min_length=1)) -> Envelope[HeatmapDto]:
    if get_mall(mallId) is None:
        raise_not_found("MALL_NOT_FOUND", "Mall not found", {"mallId": mallId})

    heatmap = get_heatmap(mallId)
    if heatmap is None:
        raise RuntimeError(f"Missing synthetic heatmap fixture for existing mall: {mallId}")
    return build_object_response(request, heatmap)


@router.get("/trajectories", response_model=Envelope[TrajectoriesDto])
def get_trajectories_detail(request: Request, mallId: str = Query(..., min_length=1)) -> Envelope[TrajectoriesDto]:
    if get_mall(mallId) is None:
        raise_not_found("MALL_NOT_FOUND", "Mall not found", {"mallId": mallId})

    trajectories = get_trajectories(mallId)
    if trajectories is None:
        raise RuntimeError(f"Missing synthetic trajectories fixture for existing mall: {mallId}")
    return build_object_response(request, trajectories)


@router.get("/stores/{store_id}", response_model=Envelope[StoreDto])
def get_store_detail(store_id: str, request: Request) -> Envelope[StoreDto]:
    store = get_store(store_id)
    if store is None:
        raise_not_found("STORE_NOT_FOUND", "Store not found", {"storeId": store_id})
    return build_object_response(request, store)


@router.get("/stores/{store_id}/score", response_model=Envelope[StoreScoreDto])
def get_store_score_detail(store_id: str, request: Request) -> Envelope[StoreScoreDto]:
    if get_store(store_id) is None:
        raise_not_found("STORE_NOT_FOUND", "Store not found", {"storeId": store_id})

    score = get_store_score(store_id)
    if score is None:
        raise RuntimeError(f"Missing synthetic score fixture for existing store: {store_id}")
    return build_object_response(request, score)


@router.get("/stores/{store_id}/flow", response_model=Envelope[StoreFlowDto])
def get_store_flow_detail(store_id: str, request: Request) -> Envelope[StoreFlowDto]:
    if get_store(store_id) is None:
        raise_not_found("STORE_NOT_FOUND", "Store not found", {"storeId": store_id})

    flow = get_store_flow(store_id)
    if flow is None:
        raise RuntimeError(f"Missing synthetic flow fixture for existing store: {store_id}")
    return build_object_response(request, flow)


def build_list_response(request: Request, items: list) -> ListEnvelope:
    now = datetime.now(UTC)
    return ListEnvelope(
        data=items,
        page=PageMeta(page=1, pageSize=len(items), total=len(items), hasNext=False),
        traceId=request.state.trace_id,
        timestamp=now,
    )


def build_object_response(request: Request, item: object) -> Envelope:
    return Envelope(data=item, traceId=request.state.trace_id, timestamp=datetime.now(UTC))


def raise_not_found(code: str, message: str, details: dict[str, str]) -> None:
    raise HTTPException(status_code=404, detail={"code": code, "message": message, "details": details})
