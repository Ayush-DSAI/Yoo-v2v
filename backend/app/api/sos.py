"""
POST /api/sos — Emergency SOS endpoint.

Accepts GPS coordinates and an audio blob recorded via MediaRecorder.
Uploads the audio to Supabase Storage (sos-audio bucket), stores the record,
and returns a confirmation.
"""

import logging
import uuid
from fastapi import APIRouter, Depends, File, Form, HTTPException, UploadFile, status
from pydantic import BaseModel
from app.middleware.auth import get_current_user
from app.database.supabase_client import get_supabase

logger = logging.getLogger(__name__)
router = APIRouter()

ALLOWED_AUDIO_TYPES = {"audio/webm", "audio/ogg", "audio/mp4", "audio/mpeg", "audio/wav"}
MAX_AUDIO_SIZE_BYTES = 25 * 1024 * 1024  # 25 MB


# ── Response Model ────────────────────────────────────────────────────────────

class SOSResponse(BaseModel):
    id: str
    user_id: str
    latitude: float
    longitude: float
    audio_url: str
    created_at: str
    message: str


# ── Endpoint ──────────────────────────────────────────────────────────────────

@router.post(
    "/api/sos",
    response_model=SOSResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Trigger SOS alert with audio evidence",
    tags=["SOS"],
)
async def create_sos(
    latitude: float = Form(..., ge=-90, le=90, description="User's current latitude"),
    longitude: float = Form(..., ge=-180, le=180, description="User's current longitude"),
    audio: UploadFile = File(..., description="Audio blob from MediaRecorder (WebM/OGG/MP4)"),
    current_user: dict = Depends(get_current_user),
):
    """
    Emergency SOS handler.
    1. Validates the incoming audio file.
    2. Uploads audio to the 'sos-audio' Supabase Storage bucket.
    3. Inserts a record into the 'sos' table with GPS and audio URL.
    4. Returns confirmation with the stored record.

    Stretch: Hook Twilio/Whisper transcription here in Phase 11.
    """
    supabase = get_supabase()
    user_id = current_user["sub"]

    # ── Audio validation ──────────────────────────────────────────────────────
    if audio.content_type not in ALLOWED_AUDIO_TYPES:
        raise HTTPException(
            status_code=status.HTTP_415_UNSUPPORTED_MEDIA_TYPE,
            detail=f"Unsupported audio type: {audio.content_type}. Expected WebM/OGG/MP4/WAV.",
        )

    contents = await audio.read()
    if len(contents) > MAX_AUDIO_SIZE_BYTES:
        raise HTTPException(
            status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
            detail="Audio file exceeds 25 MB limit",
        )

    # ── Upload audio to Supabase Storage ──────────────────────────────────────
    extension = audio.content_type.split("/")[-1]
    filename = f"{user_id}/{uuid.uuid4()}.{extension}"

    try:
        supabase.storage.from_("sos-audio").upload(
            path=filename,
            file=contents,
            file_options={"content-type": audio.content_type},
        )
        audio_url = supabase.storage.from_("sos-audio").get_public_url(filename)
        logger.info(f"SOS audio uploaded for user {user_id}: {filename}")
    except Exception as e:
        logger.error(f"Failed to upload SOS audio: {e}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Audio upload failed")

    # ── Insert SOS record ─────────────────────────────────────────────────────
    sos_data = {
        "user_id": user_id,
        "latitude": latitude,
        "longitude": longitude,
        "audio_url": audio_url,
    }

    try:
        response = supabase.table("sos").insert(sos_data).execute()
        record = response.data[0]
        return {**record, "message": "SOS received. Help is on the way."}
    except Exception as e:
        logger.error(f"Failed to insert SOS record: {e}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to store SOS record")
