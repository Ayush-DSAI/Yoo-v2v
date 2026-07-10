"""
Analytics Engine — Real Database Metrics
GET /  — Authenticated: returns live dashboard stats from Supabase

Mounted in main.py as:
    app.include_router(analytics.router, prefix="/api/analytics")
"""

import logging

from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel

from app.middleware.auth import get_current_user
from app.database.supabase_client import get_supabase

logger = logging.getLogger(__name__)
router = APIRouter()


# ── Response Model ────────────────────────────────────────────────────────────

class DashboardStatsOut(BaseModel):
    total_reports: int
    active_sos_alerts: int
    total_safe_spaces: int


# ── GET / — Authenticated: real-time dashboard stats ──────────────────────────

@router.get(
    "/",
    response_model=DashboardStatsOut,
    summary="Get dashboard analytics summary",
    tags=["Analytics"],
)
async def get_analytics(current_user: dict = Depends(get_current_user)):
    """
    Returns live counts from Supabase:
    - total_reports:      all rows in `reports`
    - active_sos_alerts:  rows in `sos` where status = 'critical'
    - total_safe_spaces:  all rows in `safe_spaces`
    """
    supabase = get_supabase()

    try:
        # Count all reports
        reports_resp = (
            supabase.table("reports")
            .select("*", count="exact")
            .execute()
        )
        total_reports = reports_resp.count or 0

        # Count active (critical) SOS alerts
        sos_resp = (
            supabase.table("sos")
            .select("*", count="exact")
            .eq("status", "critical")
            .execute()
        )
        active_sos_alerts = sos_resp.count or 0

        # Count all safe spaces
        spaces_resp = (
            supabase.table("safe_spaces")
            .select("*", count="exact")
            .execute()
        )
        total_safe_spaces = spaces_resp.count or 0

        return DashboardStatsOut(
            total_reports=total_reports,
            active_sos_alerts=active_sos_alerts,
            total_safe_spaces=total_safe_spaces,
        )

    except Exception as e:
        logger.error(f"Failed to compute analytics: {e}")
        raise HTTPException(
            status_code=500,
            detail=f"SUPABASE ANALYTICS QUERY FAILED: {str(e)}",
        )
