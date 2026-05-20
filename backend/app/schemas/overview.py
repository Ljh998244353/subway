from pydantic import BaseModel


class OverviewMetricDto(BaseModel):
    id: str
    label: str
    value: float
    unit: str
    status: str
    trendDelta: float
    timeWindow: str
    description: str


class TrafficTrendPointDto(BaseModel):
    timestamp: str
    currentOccupancy: int
    todayTrafficDelta: int
    crowdingIndex: float


class FloorSummaryDto(BaseModel):
    floorId: str
    floorName: str
    traffic: int
    crowdingIndex: float
    alertCount: int


class OverviewDto(BaseModel):
    mallId: str
    generatedAt: str
    source: str
    metrics: list[OverviewMetricDto]
    trafficTrend: list[TrafficTrendPointDto]
    floorSummaries: list[FloorSummaryDto]
    inefficientStoreIds: list[str]
    alertIds: list[str]
