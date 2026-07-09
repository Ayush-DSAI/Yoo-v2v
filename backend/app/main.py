"""
AEGIS FastAPI Application Entry Point

Architecture:
  - No ORM: Supabase Python client for all DB/storage operations
  - Auth: Supabase JWT verification via dependency injection (no login routes)
  - Rate Limiting: slowapi
  - File Uploads: python-multipart

Run locally:
  uvicorn app.main:app --reload

Swagger UI:
  http://localhost:8000/docs
"""

import logging
from contextlib import asynccontextmanager

from fastapi import FastAPI, Request, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded
from slowapi.util import get_remote_address

from app.config.settings import get_settings
from app.api import analytics, reports, routes, safe_spaces, sos

# ── Logging ───────────────────────────────────────────────────────────────────

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s | %(levelname)-8s | %(name)s - %(message)s",
)
logger = logging.getLogger(__name__)

# ── Rate Limiter ──────────────────────────────────────────────────────────────

limiter = Limiter(key_func=get_remote_address, default_limits=["60/minute"])


# ── App Lifespan ──────────────────────────────────────────────────────────────

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Startup and shutdown events."""
    settings = get_settings()
    logger.info(f"AEGIS API starting up | env={settings.app_env}")
    yield
    logger.info("AEGIS API shutting down")


# ── FastAPI App ───────────────────────────────────────────────────────────────

settings = get_settings()

app = FastAPI(
    title="AEGIS API",
    description=(
        "**AEGIS — Predict. Protect. Prevent.**\n\n"
        "Backend API for the AEGIS safety platform. "
        "Authenticate via Supabase — include your JWT as a Bearer token in all requests."
    ),
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
    lifespan=lifespan,
)

# ── Middleware: Rate Limiter ───────────────────────────────────────────────────

app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# ── Middleware: CORS ──────────────────────────────────────────────────────────

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Global Exception Handler ──────────────────────────────────────────────────

@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logger.error(f"Unhandled exception on {request.url}: {exc}", exc_info=True)
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={"detail": "An internal server error occurred. Please try again later."},
    )

# ── Routers ───────────────────────────────────────────────────────────────────

app.include_router(routes.router)
app.include_router(reports.router)
app.include_router(safe_spaces.router)
app.include_router(sos.router)
app.include_router(analytics.router)

# ── Health Check ──────────────────────────────────────────────────────────────

@app.get("/health", tags=["Health"], summary="Health check")
async def health():
    """Simple health check for Render deployment monitoring."""
    return {"status": "ok", "service": "AEGIS API", "version": "1.0.0"}
