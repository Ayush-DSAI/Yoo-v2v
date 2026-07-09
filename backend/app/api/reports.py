"""
GET  /api/reports — Fetch incident reports (for map markers)
POST /api/reports — Submit a new incident report with optional image upload
"""

import logging
import uuid
from fastapi import APIRouter, Depends, File, Form, HTTPException, UploadFile, status
from pydantic import BaseModel, Field
from typing import Optional
from app.middleware.auth import get_current_user
from app.database.supabase_client import get_supabase

logger = logging.getLogger(__name__)
router = APIRouter()

ALLOWED_IMAGE_TYPES = {"image/jpeg", "image/png", "image/webp"}
MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024  # 5 MB


# ── Response Models ───────────────────────────────────────────────────────────

class ReportOut(BaseModel):
    id: str
    user_id: str
    title: str
    description: Optional[str] = None
    category: str
    latitude: float
    longitude: float
    image_url: Optional[str] = None
    status: str
    created_at: str


# ── Endpoints ─────────────────────────────────────────────────────────────────

@router.get(
    "/api/reports",
    response_model=list[ReportOut],
    summary="Get all incident reports",
    tags=["Reports"],
)
async def get_reports(current_user: dict = Depends(get_current_user)):
    """
    Returns all incident reports from Supabase ordered by created_at desc.
    Used by the frontend to render map markers.
    """
    supabase = get_supabase()

    try:
        # TODO: Add spatial filtering (e.g. bounding box) for large datasets
        response = supabase.table("reports").select("*").order("created_at", desc=True).execute()
        return response.data
    except Exception as e:
        logger.error(f"Failed to fetch reports: {e}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to fetch reports")


@router.post(
    "/api/reports",
    response_model=ReportOut,
    status_code=status.HTTP_201_CREATED,
    summary="Submit a new incident report",
    tags=["Reports"],
)
async def create_report(
    title: str = Form(..., min_length=3, max_length=200),
    description: Optional[str] = Form(None, max_length=1000),
    category: str = Form(..., description="e.g. harassment, theft, poor_lighting"),
    latitude: float = Form(..., ge=-90, le=90),
    longitude: float = Form(..., ge=-180, le=180),
    image: Optional[UploadFile] = File(None, description="Optional incident photo (JPEG/PNG/WebP, max 5MB)"),
    current_user: dict = Depends(get_current_user),
):
    """
    Accepts multipart/form-data. Optionally uploads image to Supabase Storage
    (reports-images bucket) before inserting the report row.
    """
    supabase = get_supabase()
    user_id = current_user["sub"]
    image_url: Optional[str] = None

    # ── Image upload ──────────────────────────────────────────────────────────
    if image is not None:
        if image.content_type not in ALLOWED_IMAGE_TYPES:
            raise HTTPException(
                status_code=status.HTTP_415_UNSUPPORTED_MEDIA_TYPE,
                detail=f"Unsupported image type: {image.content_type}. Allowed: JPEG, PNG, WebP",
            )

        contents = await image.read()
        if len(contents) > MAX_IMAGE_SIZE_BYTES:
            raise HTTPException(
                status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
                detail="Image file exceeds 5 MB limit",
            )

        extension = image.content_type.split("/")[-1]
        filename = f"{user_id}/{uuid.uuid4()}.{extension}"

        try:
            supabase.storage.from_("reports-images").upload(
                path=filename,
                file=contents,
                file_options={"content-type": image.content_type},
            )
            image_url = supabase.storage.from_("reports-images").get_public_url(filename)
        except Exception as e:
            logger.error(f"Failed to upload report image: {e}")
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Image upload failed")

    # ── Insert report ─────────────────────────────────────────────────────────
    report_data = {
        "user_id": user_id,
        "title": title,
        "description": description,
        "category": category,
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
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to save report")
