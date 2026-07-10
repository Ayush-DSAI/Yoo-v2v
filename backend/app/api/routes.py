"""
POST /api/routes/analyze — AI-powered route safety analysis via Mistral.

Mounted in main.py as:
    app.include_router(routes.router, prefix="/api/routes")

So the full path is: POST /api/routes/analyze
"""

import logging
from datetime import datetime, timezone
from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel, Field
from app.middleware.auth import get_current_user
from app.services.mistral_ai import analyze_route

logger = logging.getLogger(__name__)
router = APIRouter()


# ── Request Model ─────────────────────────────────────────────────────────────

class Coordinates(BaseModel):
    lat: float = Field(..., ge=-90, le=90)
    lng: float = Field(..., ge=-180, le=180)


class RouteRequest(BaseModel):
    source: Coordinates
    destination: Coordinates

    model_config = {
        "json_schema_extra": {
            "example": {
                "source":      {"lat": 12.9716, "lng": 77.5946},
                "destination": {"lat": 12.9352, "lng": 77.6245},
            }
        }
    }


# ── Response Model ────────────────────────────────────────────────────────────

class RouteAnalysisResponse(BaseModel):
    score: int            = Field(..., ge=0, le=100)
    risk: str             = Field(..., description="Low | Medium | High")
    explanation: list[str]
    alternateRoute: list  = Field(default_factory=list)
    estimatedTime: str


# ── Endpoint ── POST /analyze (full path: POST /api/routes/analyze) ───────────

@router.post(
    "/analyze",
    response_model=RouteAnalysisResponse,
    summary="Analyze route safety with Mistral AI",
    tags=["Routes"],
)
async def analyze_route_endpoint(
    body: RouteRequest,
    current_user: dict = Depends(get_current_user),
):
    """
    Accepts source + destination coordinates.
    Queries Mistral AI and returns a structured safety assessment.
    Falls back to a safe default if the AI call fails (demo-safe).
    """
    current_time = datetime.now(timezone.utc).isoformat()

    result = await analyze_route(
        source_lat=body.source.lat,
        source_lng=body.source.lng,
        dest_lat=body.destination.lat,
        dest_lng=body.destination.lng,
        current_time=current_time,
    )

    return result
