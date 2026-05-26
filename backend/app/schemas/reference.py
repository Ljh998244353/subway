from pydantic import BaseModel


class BusinessHours(BaseModel):
    open: str
    close: str


class MallDto(BaseModel):
    mallId: str
    name: str
    timezone: str
    businessHours: BusinessHours


class FloorDto(BaseModel):
    floorId: str
    mallId: str
    name: str
    levelNo: int
    width: float
    height: float
    crowdWarningThreshold: int | None = None


class BBox(BaseModel):
    x: float
    y: float
    width: float
    height: float


class StoreDto(BaseModel):
    storeId: str
    mallId: str
    floorId: str
    categoryId: str
    name: str
    unitCode: str
    areaSqm: float
    status: str
    bbox: BBox


class StoreScoreBreakdownDto(BaseModel):
    flow: float
    conversion: float
    dwell: float
    trend: float
    profileFit: float
    penalty: float


class StoreScoreWeightsDto(BaseModel):
    flow: float
    conversion: float
    dwell: float
    trend: float
    profileFit: float


class StoreScoreInputDto(BaseModel):
    exposureTraffic: int
    enterCount: int
    conversionRate: float
    avgDwellMinutes: float
    trendIndex: float
    profileFitIndex: float
    operationalPenalty: float


class StoreScoreDto(BaseModel):
    storeId: str
    date: str
    source: str
    formulaVersion: str
    score: float
    grade: str
    weights: StoreScoreWeightsDto
    inputs: StoreScoreInputDto
    breakdown: StoreScoreBreakdownDto
    explanations: list[str]


class StoreFlowPointDto(BaseModel):
    timestamp: str
    exposureTraffic: int
    enterCount: int
    conversionRate: float


class StoreFlowDto(BaseModel):
    storeId: str
    granularity: str
    points: list[StoreFlowPointDto]


class StoreRankingItemDto(BaseModel):
    rank: int
    storeId: str
    mallId: str
    floorId: str
    categoryId: str
    name: str
    score: float
    grade: str


class StoreAlertEvidenceDto(BaseModel):
    flowIndex: float
    conversionRate: float
    categoryMedianConversionRate: float


class StoreAlertDto(BaseModel):
    alertId: str
    mallId: str
    floorId: str
    storeId: str | None = None
    type: str
    severity: str
    status: str
    detectedAt: str
    summary: str
    evidence: StoreAlertEvidenceDto


class CustomerTimeBucketDto(BaseModel):
    hour: int
    traffic: int
    share: float


class FloorPreferenceDto(BaseModel):
    floorId: str
    trafficShare: float
    dwellShare: float


class CategoryPreferenceDto(BaseModel):
    category: str
    trafficShare: float
    dwellShare: float
    conversionRate: float


class CustomerProfileDto(BaseModel):
    mallId: str
    generatedAt: str
    source: str
    activeTimeRange: str
    primaryFloorId: str
    topCategories: list[str]
    revisitTendency: float
    timeDistribution: list[CustomerTimeBucketDto]
    floorPreferences: list[FloorPreferenceDto]
    categoryPreferences: list[CategoryPreferenceDto]
    privacyNote: str


class HeatmapPointDto(BaseModel):
    pointId: str
    floorId: str
    x: float
    y: float
    intensity: float


class HeatmapDto(BaseModel):
    mallId: str
    generatedAt: str
    source: str
    granularity: str
    points: list[HeatmapPointDto]


class PointDto(BaseModel):
    x: float
    y: float


class TrajectoryFlowDto(BaseModel):
    flowId: str
    floorId: str
    fromPoint: PointDto
    toPoint: PointDto
    traffic: int
    direction: str


class TrajectoriesDto(BaseModel):
    mallId: str
    generatedAt: str
    source: str
    aggregation: str
    flows: list[TrajectoryFlowDto]
