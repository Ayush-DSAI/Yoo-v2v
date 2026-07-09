"""
Crowdsourced Reports Engine
GET  /  — Public list of all incident reports (for map markers)
POST /  — Authenticated: submit a new report with optional image upload

Mounted in main.py as:
    app.include_router(reports.router, prefix="/api/reports")
"""

import logging
import uuid
from datetime import datetime, timezone

from fastapi import (
    APIRouter,
    Depends,
    File,
    Form,
    HTTPException,
    UploadFile,
    status,
)
from pydantic import BaseModel
from typing import Optional, List

from app.middleware.auth import get_current_user
from app.database.supabase_client import get_supabase

logger = logging.getLogger(__name__)
router = APIRouter()

ALLOWED_IMAGE_TYPES = {"image/jpeg", "image/png", "image/webp", "image/gif"}


# ── Response Model ────────────────────────────────────────────────────────────

class ReportOut(BaseModel):
    id: str
    user_id: str
    title: str
    description: Optional[str] = None
    hazard_type: str
    latitude: float
    longitude: float
    image_url: Optional[str] = None  # Fixed: Pydantic models require serializable types, not UploadFile
    status: str
    created_at: str


# ── GET / — Public: list all reports ──────────────────────────────────────────

@router.get(
    "/",
    response_model=List[ReportOut],
    summary="Get all incident reports",
    tags=["Reports"],
)
async def get_reports():
    """
    Publicly accessible — no auth required.
    Fetches every report from Supabase ordered by created_at DESC.
    Used by the frontend map to render incident markers.
    """
    supabase = get_supabase()

    try:
        response = (
            supabase.table("reports")
            .select("*")
            .order("created_at", desc=True)
            .execute()
        )
        return response.data
    except Exception as e:
        logger.error(f"Failed to fetch reports: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to fetch reports",
        )


# ── POST / — Authenticated: create a new report ──────────────────────────────

@router.post(
    "/",
    response_model=ReportOut,
    status_code=status.HTTP_201_CREATED,
    summary="Submit a new incident report",
    tags=["Reports"],
)
async def create_report(
    title: str = Form(..., min_length=3, max_length=200),
    description: str = Form("", max_length=2000),
    latitude: float = Form(..., ge=-90, le=90),
    longitude: float = Form(..., ge=-180, le=180),
    hazard_type: str = Form(..., description="e.g. harassment, theft, poor_lighting"),
    image: UploadFile = File(default=None, description="Optional incident photo"),
    current_user: dict = Depends(get_current_user),
):
    """
    Accepts multipart/form-data.
    Optionally uploads an image to the `reports-images` Supabase Storage bucket,
    then inserts the report row into the `reports` table.
    """
    supabase = get_supabase()
    user_id = current_user["sub"]
    image_url: Optional[str] = None

    # ── Image upload (optional) ───────────────────────────────────────────────
    if image is not None:
        # Validate MIME type
        if image.content_type not in ALLOWED_IMAGE_TYPES:
            raise HTTPException(
                status_code=status.HTTP_415_UNSUPPORTED_MEDIA_TYPE,
                detail=(
                    f"Unsupported image type: {image.content_type}. "
                    f"Allowed: {', '.join(ALLOWED_IMAGE_TYPES)}"
                ),
            )

        # Generate a unique filename:  <user_id>/<timestamp>_<uuid>.<ext>
        extension = image.content_type.split("/")[-1]
        timestamp = datetime.now(timezone.utc).strftime("%Y%m%d%H%M%S")
        filename = f"{user_id}/{timestamp}_{uuid.uuid4().hex[:8]}.{extension}"

        try:
            contents = await image.read()

            supabase.storage.from_("reports-images").upload(
                path=filename,
                file=contents,
                file_options={"content-type": image.content_type},
            )

            image_url = supabase.storage.from_("reports-images").get_public_url(filename)
            logger.info(f"Image uploaded: {filename}")

        except Exception as e:
            logger.error(f"Failed to upload report image: {e}")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Image upload failed",
            )
        finally:
            await image.close()

    # ── Insert report row ─────────────────────────────────────────────────────
    report_data = {
        "user_id": user_id,
        "title": title,
        "description": description,
        "hazard_type": hazard_type,
        "latitude": latitude,
        "longitude": longitude,
        "image_url": image_url,
        "status": "active",
    }

    try:
        response = supabase.table("reports").insert(report_data).execute()
        return response.data[0]
    except Exception as e:
        logger.error(f"Failed to insert report: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to save report",
        )