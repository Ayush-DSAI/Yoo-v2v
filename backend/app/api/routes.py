"""
POST /api/routes/analyze — AI-powered route safety analysis using Gemini.
"""

import logging
from datetime import datetime, timezone
from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel, Field
from app.middleware.auth import get_current_user
from app.services.gemini import analyze_route_safety
from app.database.supabase_client import get_supabase

logger = logging.getLogger(__name__)
router = APIRouter()


# ── Request / Response Models ─────────────────────────────────────────────────

class RouteAnalysisRequest(BaseModel):
    source_lat: float = Field(..., ge=-90, le=90, example=12.9716)
    source_lng: float = Field(..., ge=-180, le=180, example=77.5946)
    dest_lat: float = Field(..., ge=-90, le=90, example=12.9352)
    dest_lng: float = Field(..., ge=-180, le=180, example=77.6245)


class RouteAnalysisResponse(BaseModel):
    score: int = Field(..., ge=0, le=100, description="Safety score (100 = safest)")
    risk: str = Field(..., description="Risk level: Low | Medium | High")
    reason: list[str] = Field(..., description="List of contributing factors")
    alternativeRoute: list[dict] = Field(default_factory=list)
    safeSpacesNearby: list[str] = Field(default_factory=list)


# ── Endpoint ──────────────────────────────────────────────────────────────────

@router.post(
    "/api/routes/analyze",
    response_model=RouteAnalysisResponse,
    summary="Analyze route safety with AI",
    tags=["Routes"],
)
async def analyze_route(
    body: RouteAnalysisRequest,
    current_user: dict = Depends(get_current_user),
):
    """
    Accepts source and destination coordinates, fetches nearby reports and
    safe spaces from Supabase, then queries Gemini for a safety assessment.
    """
    supabase = get_supabase()
    current_time = datetime.now(timezone.utc).isoformat()

    # TODO: Fetch nearby reports from Supabase (implement spatial query)
    reports = []
    safe_spaces = []

    try:
        result = await analyze_route_safety(
            source_lat=body.source_lat,
            source_lng=body.source_lng,
            dest_lat=body.dest_lat,
            dest_lng=body.dest_lng,
            reports=reports,
            safe_spaces=safe_spaces,
            current_time=current_time,
        )
        return result
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_502_BAD_GATEWAY, detail=str(e))
    except Exception as e:
        logger.error(f"Gemini route analysis failed: {e}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="AI analysis failed")
