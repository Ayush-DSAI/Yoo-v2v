"""
Centralized application settings loaded from environment variables.
Uses pydantic-settings for type-safe, validated configuration.

Quick start:
    cp .env.example .env
    # Fill in SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, SUPABASE_JWT_SECRET, GEMINI_API_KEY
"""

from typing import Optional
from functools import lru_cache
from pydantic import model_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    # Supabase — required in production, Optional here so the module
    # can be imported without a .env file (e.g. during testing or CI lint)
    supabase_url: Optional[str] = None
    supabase_service_role_key: Optional[str] = None
    supabase_jwt_secret: Optional[str] = None

    # AI
    mistral_api_key: Optional[str] = None
    google_maps_api_key: str = ""

    # App
    app_env: str = "development"
    allowed_origins: str = "http://localhost:3000,http://localhost:5173"

    model_config = SettingsConfigDict(
        # Looks for .env in the directory uvicorn is run from (project root)
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
        extra="ignore",          # silently ignore unknown env vars
    )

    @model_validator(mode="after")
    def _check_required_keys(self) -> "Settings":
        """
        Raise a clear error at startup if any required key is missing.
        This runs after the model is built, so imports never crash.
        """
        missing = [
            name
            for name, val in {
                "SUPABASE_URL": self.supabase_url,
                "SUPABASE_SERVICE_ROLE_KEY": self.supabase_service_role_key,
                "SUPABASE_JWT_SECRET": self.supabase_jwt_secret,
                "MISTRAL_API_KEY": self.mistral_api_key,
            }.items()
            if not val
        ]
        if missing:
            raise ValueError(
                f"\n\n❌ Missing required environment variables: {missing}\n"
                "   → Copy .env.example to .env and fill in the values.\n"
                "   → Supabase JWT Secret: Dashboard → Project Settings → API → JWT Secret\n"
                "   → Mistral API Key: https://console.mistral.ai/api-keys\n"
            )
        return self

    @property
    def origins_list(self) -> list[str]:
        """Parse comma-separated ALLOWED_ORIGINS into a list."""
        return [o.strip() for o in self.allowed_origins.split(",")]


@lru_cache
def get_settings() -> Settings:
    """
    Returns a cached singleton Settings instance.
    Use as FastAPI Depends(get_settings) or call directly.
    lru_cache ensures .env is only read once per process.
    """
    return Settings()
