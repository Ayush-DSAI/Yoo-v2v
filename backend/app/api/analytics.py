"""
GET /api/analytics — Returns aggregated safety statistics for the dashboard.
"""

import logging
from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from app.middleware.auth import get_current_user
from app.database.supabase_client import get_supabase

logger = logging.getLogger(__name__)
router = APIRouter()


# ── Response Model ────────────────────────────────────────────────────────────

class AnalyticsResponse(BaseModel):
    reports: int
    safeSpaces: int
    avgScore: int
    highRiskAreas: int


# ── Endpoint ──────────────────────────────────────────────────────────────────

@router.get(
    "/api/analytics",
    response_model=AnalyticsResponse,
    summary="Get dashboard analytics summary",
    tags=["Analytics"],
)
async def get_analytics(current_user: dict = Depends(get_current_user)):
    """
    Returns aggregated statistics for the AEGIS safety dashboard.
    Computes counts from Supabase tables.
    TODO: Cache this response (e.g. 5-min TTL) to avoid repeated DB hits.
    """
    supabase = get_supabase()

    try:
        # Count total reports
        reports_resp = supabase.table("reports").select("id", count="exact").execute()
        total_reports = reports_resp.count or 0

        # Count safe spaces
        spaces_resp = supabase.table("safe_spaces").select("id", count="exact").execute()
        total_spaces = spaces_resp.count or 0

        # TODO: Replace with real aggregation from an analytics table or RPC
        # Placeholder values until the analytics table/RPC is implemented
        avg_score = 81
        high_risk_areas = 5

        return AnalyticsResponse(
            reports=total_reports,
            safeSpaces=total_spaces,
            avgScore=avg_score,
            highRiskAreas=high_risk_areas,
        )
    except Exception as e:
        logger.error(f"Failed to compute analytics: {e}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to fetch analytics")
