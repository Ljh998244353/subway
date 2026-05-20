from app.schemas.reference import (
    BBox,
    BusinessHours,
    CategoryPreferenceDto,
    CustomerProfileDto,
    CustomerTimeBucketDto,
    FloorDto,
    FloorPreferenceDto,
    HeatmapDto,
    HeatmapPointDto,
    MallDto,
    PointDto,
    StoreAlertDto,
    StoreAlertEvidenceDto,
    StoreDto,
    StoreFlowDto,
    StoreFlowPointDto,
    StoreRankingItemDto,
    StoreScoreBreakdownDto,
    StoreScoreDto,
    TrajectoriesDto,
    TrajectoryFlowDto,
)


MALLS = [
    MallDto(
        mallId="mall_demo_001",
        name="Demo Mall",
        timezone="Asia/Shanghai",
        businessHours=BusinessHours(open="10:00", close="22:00"),
    )
]

FLOORS = [
    FloorDto(
        floorId="floor_demo_l1",
        mallId="mall_demo_001",
        name="L1",
        levelNo=1,
        width=1200,
        height=800,
        crowdWarningThreshold=850,
    ),
    FloorDto(
        floorId="floor_demo_l2",
        mallId="mall_demo_001",
        name="L2",
        levelNo=2,
        width=1200,
        height=800,
        crowdWarningThreshold=760,
    ),
]

STORES = [
    StoreDto(
        storeId="store_demo_001",
        mallId="mall_demo_001",
        floorId="floor_demo_l1",
        categoryId="cat_fashion",
        name="Fictional Store 001",
        unitCode="L1-001",
        areaSqm=128.5,
        status="open",
        bbox=BBox(x=120, y=80, width=90, height=60),
    ),
    StoreDto(
        storeId="store_demo_002",
        mallId="mall_demo_001",
        floorId="floor_demo_l1",
        categoryId="cat_food",
        name="Fictional Store 002",
        unitCode="L1-002",
        areaSqm=96.0,
        status="open",
        bbox=BBox(x=240, y=80, width=80, height=65),
    ),
    StoreDto(
        storeId="store_demo_101",
        mallId="mall_demo_001",
        floorId="floor_demo_l2",
        categoryId="cat_lifestyle",
        name="Fictional Store 101",
        unitCode="L2-101",
        areaSqm=156.0,
        status="renovating",
        bbox=BBox(x=160, y=120, width=120, height=70),
    ),
]

STORE_SCORES = [
    StoreScoreDto(
        storeId="store_demo_001",
        date="2026-05-19",
        score=86.4,
        grade="A",
        breakdown=StoreScoreBreakdownDto(flow=88, conversion=84, dwell=82, trend=90, profileFit=81, penalty=0),
        explanations=[
            "Synthetic score: traffic and trend are above fixture baseline",
            "Conversion remains stable for the fashion category",
        ],
    ),
    StoreScoreDto(
        storeId="store_demo_002",
        date="2026-05-19",
        score=74.2,
        grade="B",
        breakdown=StoreScoreBreakdownDto(flow=77, conversion=71, dwell=73, trend=75, profileFit=70, penalty=0),
        explanations=[
            "Synthetic score: food-category traffic is healthy",
            "Dwell time is close to the fixture median",
        ],
    ),
    StoreScoreDto(
        storeId="store_demo_101",
        date="2026-05-19",
        score=52.8,
        grade="D",
        breakdown=StoreScoreBreakdownDto(flow=58, conversion=45, dwell=49, trend=51, profileFit=56, penalty=8),
        explanations=[
            "Synthetic score: renovation status applies an operational penalty",
            "Conversion and dwell indicators are below the fixture baseline",
        ],
    ),
]

STORE_FLOWS = [
    StoreFlowDto(
        storeId="store_demo_001",
        granularity="hour",
        points=[
            StoreFlowPointDto(timestamp="2026-05-19T10:00:00Z", exposureTraffic=220, enterCount=58, conversionRate=0.264),
            StoreFlowPointDto(timestamp="2026-05-19T11:00:00Z", exposureTraffic=246, enterCount=66, conversionRate=0.268),
            StoreFlowPointDto(timestamp="2026-05-19T12:00:00Z", exposureTraffic=281, enterCount=78, conversionRate=0.278),
        ],
    ),
    StoreFlowDto(
        storeId="store_demo_002",
        granularity="hour",
        points=[
            StoreFlowPointDto(timestamp="2026-05-19T10:00:00Z", exposureTraffic=180, enterCount=42, conversionRate=0.233),
            StoreFlowPointDto(timestamp="2026-05-19T11:00:00Z", exposureTraffic=214, enterCount=53, conversionRate=0.248),
            StoreFlowPointDto(timestamp="2026-05-19T12:00:00Z", exposureTraffic=236, enterCount=59, conversionRate=0.25),
        ],
    ),
    StoreFlowDto(
        storeId="store_demo_101",
        granularity="hour",
        points=[
            StoreFlowPointDto(timestamp="2026-05-19T10:00:00Z", exposureTraffic=134, enterCount=18, conversionRate=0.134),
            StoreFlowPointDto(timestamp="2026-05-19T11:00:00Z", exposureTraffic=142, enterCount=20, conversionRate=0.141),
            StoreFlowPointDto(timestamp="2026-05-19T12:00:00Z", exposureTraffic=156, enterCount=22, conversionRate=0.141),
        ],
    ),
]

STORE_ALERTS = [
    StoreAlertDto(
        alertId="alert_demo_001",
        mallId="mall_demo_001",
        floorId="floor_demo_l1",
        storeId="store_demo_002",
        type="LOW_CONVERSION_HIGH_FLOW",
        severity="warning",
        status="open",
        detectedAt="2026-05-19T01:30:00Z",
        summary="Synthetic alert: high passing flow with below-median conversion",
        evidence=StoreAlertEvidenceDto(flowIndex=91, conversionRate=0.12, categoryMedianConversionRate=0.21),
    ),
    StoreAlertDto(
        alertId="alert_demo_002",
        mallId="mall_demo_001",
        floorId="floor_demo_l2",
        storeId="store_demo_101",
        type="LOW_SCORE",
        severity="critical",
        status="in_progress",
        detectedAt="2026-05-19T02:00:00Z",
        summary="Synthetic alert: store score remains below operational threshold",
        evidence=StoreAlertEvidenceDto(flowIndex=58, conversionRate=0.09, categoryMedianConversionRate=0.2),
    ),
    StoreAlertDto(
        alertId="alert_demo_003",
        mallId="mall_demo_001",
        floorId="floor_demo_l1",
        storeId=None,
        type="CROWDING",
        severity="info",
        status="resolved",
        detectedAt="2026-05-19T02:15:00Z",
        summary="Synthetic alert: floor-level crowding signal returned to normal range",
        evidence=StoreAlertEvidenceDto(flowIndex=76, conversionRate=0.0, categoryMedianConversionRate=0.0),
    ),
]

CUSTOMER_PROFILES = [
    CustomerProfileDto(
        mallId="mall_demo_001",
        generatedAt="2026-05-19T02:30:00Z",
        source="synthetic_fixture",
        activeTimeRange="14:00-17:00",
        primaryFloorId="floor_demo_l2",
        topCategories=["cat_food", "cat_fashion", "cat_lifestyle"],
        revisitTendency=0.62,
        timeDistribution=[
            CustomerTimeBucketDto(hour=10, traffic=520, share=0.18),
            CustomerTimeBucketDto(hour=11, traffic=680, share=0.24),
            CustomerTimeBucketDto(hour=12, traffic=740, share=0.26),
            CustomerTimeBucketDto(hour=13, traffic=620, share=0.22),
            CustomerTimeBucketDto(hour=14, traffic=300, share=0.10),
        ],
        floorPreferences=[
            FloorPreferenceDto(floorId="floor_demo_l1", trafficShare=0.56, dwellShare=0.48),
            FloorPreferenceDto(floorId="floor_demo_l2", trafficShare=0.44, dwellShare=0.52),
        ],
        categoryPreferences=[
            CategoryPreferenceDto(category="cat_food", trafficShare=0.34, dwellShare=0.31, conversionRate=0.27),
            CategoryPreferenceDto(category="cat_fashion", trafficShare=0.28, dwellShare=0.26, conversionRate=0.22),
            CategoryPreferenceDto(category="cat_lifestyle", trafficShare=0.19, dwellShare=0.24, conversionRate=0.18),
        ],
        privacyNote="Synthetic aggregate only. No face images, member IDs, phone numbers, or individual trajectories are included.",
    )
]

HEATMAPS = [
    HeatmapDto(
        mallId="mall_demo_001",
        generatedAt="2026-05-19T02:45:00Z",
        source="synthetic_fixture",
        granularity="15m",
        points=[
            HeatmapPointDto(pointId="heat_demo_l1_001", floorId="floor_demo_l1", x=120, y=160, intensity=0.42),
            HeatmapPointDto(pointId="heat_demo_l1_002", floorId="floor_demo_l1", x=360, y=220, intensity=0.68),
            HeatmapPointDto(pointId="heat_demo_l1_003", floorId="floor_demo_l1", x=780, y=520, intensity=0.57),
            HeatmapPointDto(pointId="heat_demo_l2_001", floorId="floor_demo_l2", x=180, y=180, intensity=0.34),
            HeatmapPointDto(pointId="heat_demo_l2_002", floorId="floor_demo_l2", x=540, y=360, intensity=0.81),
            HeatmapPointDto(pointId="heat_demo_l2_003", floorId="floor_demo_l2", x=930, y=600, intensity=0.49),
        ],
    )
]

TRAJECTORIES = [
    TrajectoriesDto(
        mallId="mall_demo_001",
        generatedAt="2026-05-19T03:00:00Z",
        source="synthetic_fixture",
        aggregation="floor_flow_edges_15m",
        flows=[
            TrajectoryFlowDto(
                flowId="traj_demo_l1_001",
                floorId="floor_demo_l1",
                fromPoint=PointDto(x=80, y=120),
                toPoint=PointDto(x=420, y=260),
                traffic=360,
                direction="inbound",
            ),
            TrajectoryFlowDto(
                flowId="traj_demo_l1_002",
                floorId="floor_demo_l1",
                fromPoint=PointDto(x=420, y=260),
                toPoint=PointDto(x=880, y=560),
                traffic=285,
                direction="cross",
            ),
            TrajectoryFlowDto(
                flowId="traj_demo_l2_001",
                floorId="floor_demo_l2",
                fromPoint=PointDto(x=120, y=160),
                toPoint=PointDto(x=560, y=360),
                traffic=310,
                direction="inbound",
            ),
            TrajectoryFlowDto(
                flowId="traj_demo_l2_002",
                floorId="floor_demo_l2",
                fromPoint=PointDto(x=560, y=360),
                toPoint=PointDto(x=980, y=620),
                traffic=245,
                direction="outbound",
            ),
        ],
    )
]


def list_malls() -> list[MallDto]:
    return MALLS


def get_mall(mall_id: str) -> MallDto | None:
    return next((mall for mall in MALLS if mall.mallId == mall_id), None)


def list_floors_for_mall(mall_id: str) -> list[FloorDto]:
    return [floor for floor in FLOORS if floor.mallId == mall_id]


def get_floor(floor_id: str) -> FloorDto | None:
    return next((floor for floor in FLOORS if floor.floorId == floor_id), None)


def list_stores_for_floor(floor_id: str) -> list[StoreDto]:
    return [store for store in STORES if store.floorId == floor_id]


def list_store_rankings_for_mall(mall_id: str) -> list[StoreRankingItemDto]:
    ranked_inputs = []
    for store in STORES:
        if store.mallId != mall_id:
            continue
        score = get_store_score(store.storeId)
        if score is None:
            continue
        ranked_inputs.append((store, score))

    ranked_inputs.sort(key=lambda item: item[1].score, reverse=True)
    return [
        StoreRankingItemDto(
            rank=index + 1,
            storeId=store.storeId,
            mallId=store.mallId,
            floorId=store.floorId,
            categoryId=store.categoryId,
            name=store.name,
            score=score.score,
            grade=score.grade,
        )
        for index, (store, score) in enumerate(ranked_inputs)
    ]


def list_store_alerts_for_mall(mall_id: str) -> list[StoreAlertDto]:
    return [alert for alert in STORE_ALERTS if alert.mallId == mall_id]


def get_customer_profile(mall_id: str) -> CustomerProfileDto | None:
    return next((profile for profile in CUSTOMER_PROFILES if profile.mallId == mall_id), None)


def get_heatmap(mall_id: str) -> HeatmapDto | None:
    return next((heatmap for heatmap in HEATMAPS if heatmap.mallId == mall_id), None)


def get_trajectories(mall_id: str) -> TrajectoriesDto | None:
    return next((trajectories for trajectories in TRAJECTORIES if trajectories.mallId == mall_id), None)


def get_store(store_id: str) -> StoreDto | None:
    return next((store for store in STORES if store.storeId == store_id), None)


def get_store_score(store_id: str) -> StoreScoreDto | None:
    return next((score for score in STORE_SCORES if score.storeId == store_id), None)


def get_store_flow(store_id: str) -> StoreFlowDto | None:
    return next((flow for flow in STORE_FLOWS if flow.storeId == store_id), None)
