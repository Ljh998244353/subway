from datetime import datetime

from pydantic import BaseModel


class DependencyHealth(BaseModel):
    status: str
    dialect: str | None = None
    migrationVersion: str | None = None


class HealthData(BaseModel):
    status: str
    service: str
    version: str
    environment: str
    database: DependencyHealth
    redis: DependencyHealth
    time: datetime
