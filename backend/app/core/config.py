import os
from pathlib import Path

from pydantic import BaseModel


class Settings(BaseModel):
    service_name: str = "mall-vision-backend"
    version: str = "0.1.0"
    environment: str = "local"


class LlmSettings(BaseModel):
    provider: str = "openai_compatible"
    base_url: str = ""
    api_key: str = ""
    model: str = ""
    enabled: bool = False

    @property
    def is_configured(self) -> bool:
        return self.enabled and bool(self.base_url.strip()) and bool(self.api_key.strip()) and bool(self.model.strip())


def get_llm_settings(env_file: Path | None = None) -> LlmSettings:
    env_values = _read_env_file(env_file or _default_env_file())
    return LlmSettings(
        provider=_setting("LLM_PROVIDER", env_values, "openai_compatible").strip() or "openai_compatible",
        base_url=_setting("LLM_BASE_URL", env_values, "").strip(),
        api_key=_setting("LLM_API_KEY", env_values, "").strip(),
        model=_setting("LLM_MODEL", env_values, "").strip(),
        enabled=_setting("LLM_ENABLED", env_values, "false").strip().lower() in {"1", "true", "yes", "on"},
    )


def _setting(key: str, env_values: dict[str, str], default: str) -> str:
    return os.getenv(key) or env_values.get(key, default)


def _default_env_file() -> Path:
    return Path(__file__).resolve().parents[2] / ".env"


def _read_env_file(path: Path) -> dict[str, str]:
    if not path.exists():
        return {}
    values: dict[str, str] = {}
    for raw_line in path.read_text(encoding="utf-8-sig").splitlines():
        line = raw_line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, value = line.split("=", 1)
        values[key.strip()] = value.strip().strip('"').strip("'")
    return values


settings = Settings()
