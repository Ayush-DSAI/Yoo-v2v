"""
GET /api/safe-spaces — Returns a list of verified safe spaces.
Initially seeded from static data; later stored in Supabase.
"""

import logging
from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from app.middleware.auth import get_current_user
from app.database.supabase_client import get_supabase

logger = logging.getLogger(__name__)
router = APIRouter()


# ── Response Model ────────────────────────────────────────────────────────────

class SafeSpaceOut(BaseModel):
    id: str
    name: str
    latitude: float
    longitude: float
    type: str  # e.g. "hospital", "police_station", "shelter"


# ── Static seed data (used as fallback if Supabase table is empty) ────────────

_STATIC_SAFE_SPACES: list[dict] = [
    {"id": "static-1", "name": "City General Hospital", "latitude": 20.2961, "longitude": 85.8245, "type": "hospital"},
    {"id": "static-2", "name": "Central Police Station", "latitude": 20.2985, "longitude": 85.8312, "type": "police_station"},
    {"id": "static-3", "name": "Women's Shelter - NGO Hub", "latitude": 20.2880, "longitude": 85.8198, "type": "shelter"},
]


# ── Endpoint ──────────────────────────────────────────────────────────────────

@router.get(
    "/api/safe-spaces",
    response_model=list[SafeSpaceOut],
    summary="Get all safe spaces",
    tags=["Safe Spaces"],
)
async def get_safe_spaces(current_user: dict = Depends(get_current_user)):
    """
    Returns safe spaces from Supabase. Falls back to static seed data
    if the database table is empty or unavailable.
    """
    supabase = get_supabase()

    try:
        response = supabase.table("safe_spaces").select("*").execute()
        data = response.data

        if not data:
            logger.warning("safe_spaces table is empty — returning static seed data")
            return _STATIC_SAFE_SPACES

        return data
    except Exception as e:
        logger.error(f"Failed to fetch safe spaces: {e}. Returning static fallback.")
        return _STATIC_SAFE_SPACES
