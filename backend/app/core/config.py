from pydantic import BaseModel


class Settings(BaseModel):
    service_name: str = "mall-vision-backend"
    version: str = "0.1.0"
    environment: str = "local"


settings = Settings()
