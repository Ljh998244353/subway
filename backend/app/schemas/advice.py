from typing import Any, Literal

from pydantic import BaseModel, Field


AdvicePriority = Literal["high", "medium", "low"]
AdviceCategory = Literal["traffic", "conversion", "dwell", "alert", "category_ops"]
AdviceSource = Literal["rule", "llm"]
AdviceStatus = Literal["disabled", "llm", "fallback"]


class StoreAdviceInputDto(BaseModel):
    storeId: str
    name: str
    floorId: str
    category: str
    grade: str
    score: float
    liveOccupancy: int = Field(ge=0)
    entryRate: float = Field(ge=0)
    avgDwellTime: float = Field(ge=0)
    hasWarning: bool = False
    warningText: str | None = None


class StoreAlertInputDto(BaseModel):
    alertId: str
    storeId: str | None = None
    floorId: str
    level: Literal["warning", "critical"] = "warning"
    summary: str
    isResolved: bool = False


class StoreManagementAdviceRequestDto(BaseModel):
    mallId: str = "mall_demo_001"
    mode: str = "score"
    scenarioDensity: str = "peak"
    incidentLevel: int = Field(default=0, ge=0, le=3)
    stores: list[StoreAdviceInputDto]
    alerts: list[StoreAlertInputDto] = Field(default_factory=list)
    aggregates: dict[str, Any] = Field(default_factory=dict)


class StoreManagementAdviceDto(BaseModel):
    id: str
    storeId: str
    priority: AdvicePriority
    category: AdviceCategory
    title: str
    reason: str
    actions: list[str]
    expectedImpact: str
    evidence: list[str]
    source: AdviceSource


class LlmAdviceStateDto(BaseModel):
    enabled: bool
    configured: bool
    provider: str
    model: str | None = None
    reason: str | None = None


class StoreManagementAdviceResponseDto(BaseModel):
    status: AdviceStatus
    source: AdviceSource
    items: list[StoreManagementAdviceDto]
    llm: LlmAdviceStateDto
    privacyNote: str
