"""
Centralized application settings loaded from environment variables.
Uses pydantic-settings for type-safe, validated configuration.

Quick start:
    copy .env.example .env
    # Fill in SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, SUPABASE_JWT_SECRET, MISTRAL_API_KEY
"""

from pathlib import Path
from typing import Optional
from functools import lru_cache
from pydantic import model_validator
from pydantic_settings import BaseSettings, SettingsConfigDict

# Absolute path to the .env file — always resolves correctly regardless of
# where uvicorn is launched from (fixes Windows subprocess CWD mismatch).
_ENV_FILE = Path(__file__).resolve().parent.parent.parent / ".env"


class Settings(BaseSettings):
    # Supabase
    supabase_url: Optional[str] = None
    supabase_service_role_key: Optional[str] = None
    supabase_jwt_secret: Optional[str] = None

    # AI — Mistral
    mistral_api_key: Optional[str] = None
    google_maps_api_key: str = ""

    # App
    app_env: str = "development"
    allowed_origins: str = "http://localhost:3000,http://localhost:5173"

    model_config = SettingsConfigDict(
        env_file=str(_ENV_FILE),        # absolute path — no CWD dependency
        env_file_encoding="utf-8",
        case_sensitive=False,
        extra="ignore",                 # silently ignore unknown vars (e.g. old GEMINI_API_KEY)
    )

    @model_validator(mode="after")
    def _check_required_keys(self) -> "Settings":
        """Raise a clear startup error if any required key is missing."""
        missing = [
            name
            for name, val in {
                "SUPABASE_URL": self.supabase_url,
                "SUPABASE_SERVICE_ROLE_KEY": self.supabase_service_role_key,
                "SUPABASE_JWT_SECRET": self.supabase_jwt_secret,
                "MISTRAL_API_KEY": self.mistral_api_key,
            }.items()
            if not val or val.startswith("your-")   # catch unfilled placeholders too
        ]
        if missing:
            raise ValueError(
                f"\n\n❌ Missing or unfilled environment variables: {missing}\n"
                f"   → Edit: {_ENV_FILE}\n"
                "   → Supabase keys: Dashboard → Project Settings → API\n"
                "   → Mistral key: https://console.mistral.ai/api-keys\n"
            )
        return self

    @property
    def origins_list(self) -> list[str]:
        """Parse comma-separated ALLOWED_ORIGINS into a list."""
        return [o.strip() for o in self.allowed_origins.split(",")]


@lru_cache
def get_settings() -> Settings:
    """Cached singleton — .env is read only once per process."""
    return Settings()
