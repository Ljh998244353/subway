from datetime import datetime
from typing import Generic, TypeVar

from pydantic import BaseModel, ConfigDict

T = TypeVar("T")


class Envelope(BaseModel, Generic[T]):
    model_config = ConfigDict(populate_by_name=True)

    data: T
    traceId: str
    timestamp: datetime


class PageMeta(BaseModel):
    page: int
    pageSize: int
    total: int
    hasNext: bool


class ListEnvelope(BaseModel, Generic[T]):
    model_config = ConfigDict(populate_by_name=True)

    data: list[T]
    page: PageMeta
    traceId: str
    timestamp: datetime
