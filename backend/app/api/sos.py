"""
SOS Emergency Engine
POST /  — Authenticated: trigger an emergency SOS with GPS + optional audio

Mounted in main.py as:
    app.include_router(sos.router, prefix="/api/sos")
"""

import logging
import uuid
from datetime import datetime, timezone
from typing import Optional

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

from app.middleware.auth import get_current_user
from app.database.supabase_client import get_supabase

logger = logging.getLogger(__name__)
router = APIRouter()

ALLOWED_AUDIO_TYPES = {
    "audio/webm",
    "audio/mp3",
    "audio/wav",
    "audio/ogg",
    "audio/mpeg",
    "application/octet-stream",
}


# ── Response Model ────────────────────────────────────────────────────────────

class SOSOut(BaseModel):
    id: str
    user_id: str
    latitude: float
    longitude: float
    audio_url: Optional[str] = None
    status: str
    created_at: str


# ── POST / — Authenticated: create an emergency SOS record ───────────────────

@router.post(
    "/",
    response_model=SOSOut,
    status_code=status.HTTP_201_CREATED,
    summary="Trigger SOS alert with optional audio evidence",
    tags=["SOS"],
)
async def create_sos(
    latitude: float = Form(..., ge=-90, le=90, description="User's current latitude"),
    longitude: float = Form(..., ge=-180, le=180, description="User's current longitude"),
    audio: UploadFile = File(None, description="Optional audio blob (WebM/MP3/WAV/OGG)"),
    current_user: dict = Depends(get_current_user),
):
    """
    Emergency SOS handler.
    1. Validates the incoming audio file (if provided).
    2. Uploads audio to the 'sos-audio' Supabase Storage bucket.
    3. Inserts a record into the 'sos' table with GPS, audio URL, and status='critical'.
    4. Returns the created SOS record.
    """
    supabase = get_supabase()
    user_id = current_user["sub"]
    audio_url: Optional[str] = None

    # ── Audio upload (optional) ───────────────────────────────────────────────
    if audio is not None:
        # Validate MIME type
        if audio.content_type not in ALLOWED_AUDIO_TYPES:
            raise HTTPException(
                status_code=status.HTTP_415_UNSUPPORTED_MEDIA_TYPE,
                detail=(
                    f"Unsupported audio type: {audio.content_type}. "
                    f"Allowed: {', '.join(ALLOWED_AUDIO_TYPES)}"
                ),
            )

        # Generate unique filename:  <user_id>/sos_<timestamp>_<uuid>.webm
        timestamp = datetime.now(timezone.utc).strftime("%Y%m%d%H%M%S")
        extension = audio.content_type.split("/")[-1]
        if extension == "octet-stream":
            extension = "webm"
        filename = f"{user_id}/sos_{timestamp}_{uuid.uuid4().hex[:8]}.{extension}"

        try:
            contents = await audio.read()

            supabase.storage.from_("sos-audio").upload(
                path=filename,
                file=contents,
                file_options={"content-type": audio.content_type},
            )

            audio_url = supabase.storage.from_("sos-audio").get_public_url(filename)
            logger.info(f"SOS audio uploaded: {filename}")

        except Exception as e:
            logger.error(f"Failed to upload SOS audio: {e}")
            raise HTTPException(
                status_code=500,
                detail=f"SUPABASE STORAGE REJECTED IT: {str(e)}",
            )
        finally:
            await audio.close()

    # ── Insert SOS record ─────────────────────────────────────────────────────
    sos_data = {
        "user_id": user_id,
        "latitude": latitude,
        "longitude": longitude,
        "audio_url": audio_url,
        "status": "critical",
    }

    try:
        db_response = supabase.table("sos").insert(sos_data).execute()
        return db_response.data[0]
    except Exception as e:
        logger.error(f"Failed to insert SOS record: {e}")
        raise HTTPException(
            status_code=500,
            detail=f"SUPABASE DB REJECTED IT: {str(e)}",
        )
