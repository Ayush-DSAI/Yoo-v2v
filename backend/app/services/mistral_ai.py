"""
Mistral AI service for urban route safety analysis.
Model: mistral-large-latest with JSON mode enforced.
"""

import json
import logging
from mistralai import Mistral
from app.config.settings import get_settings

logger = logging.getLogger(__name__)

# ── Safe fallback (returned if Mistral fails — keeps frontend alive during demo) ──
_SAFE_FALLBACK = {
    "score": 72,
    "risk": "Low",
    "explanation": [
        "Route analysis temporarily unavailable.",
        "Displaying estimated safety score based on area history.",
        "Proceed cautiously and stay in well-lit areas.",
    ],
    "alternateRoute": [],
    "estimatedTime": "N/A",
}

# ── System Prompt ─────────────────────────────────────────────────────────────
_SYSTEM_PROMPT = """
You are AEGIS, an expert urban safety analyst AI.

Given source and destination coordinates, evaluate route safety using general 
urban safety knowledge, time-of-day risk patterns, and geographic factors.

Respond with ONLY a valid JSON object — no markdown, no explanation outside JSON.

Exact required schema:
{
  "score": <integer 0-100, 100 = perfectly safe>,
  "risk": <exactly "Low" | "Medium" | "High">,
  "explanation": [<2 to 3 short strings explaining the safety assessment>],
  "alternateRoute": [],
  "estimatedTime": "<e.g. '12 min'>"
}

Risk rules:
  score >= 70  → "Low"
  score 40-69  → "Medium"
  score < 40   → "High"
"""

_USER_TEMPLATE = """
Analyze route safety:
  Source:      lat={source_lat}, lng={source_lng}
  Destination: lat={dest_lat},   lng={dest_lng}
  Current time: {current_time}

Return the JSON safety assessment.
"""


async def analyze_route(
    source_lat: float,
    source_lng: float,
    dest_lat: float,
    dest_lng: float,
    current_time: str,
) -> dict:
    """
    Calls Mistral AI to evaluate route safety.

    Returns structured dict on success, or _SAFE_FALLBACK on any failure
    so the frontend map never crashes during the live demo.
    """
    settings = get_settings()
    client = Mistral(api_key=settings.mistral_api_key)

    user_message = _USER_TEMPLATE.format(
        source_lat=source_lat,
        source_lng=source_lng,
        dest_lat=dest_lat,
        dest_lng=dest_lng,
        current_time=current_time,
    )

    try:
        logger.info(
            f"[Mistral] Analyzing: ({source_lat},{source_lng}) → ({dest_lat},{dest_lng})"
        )

        response = client.chat.complete(
            model="mistral-large-latest",
            messages=[
                {"role": "system", "content": _SYSTEM_PROMPT},
                {"role": "user",   "content": user_message},
            ],
            temperature=0.2,
            response_format={"type": "json_object"},
        )

        raw = response.choices[0].message.content.strip()
        result = json.loads(raw)

        # Validate required keys exist
        required = {"score", "risk", "explanation", "alternateRoute", "estimatedTime"}
        missing_keys = required - result.keys()
        if missing_keys:
            logger.warning(f"[Mistral] Missing keys {missing_keys} — using fallback.")
            return _SAFE_FALLBACK

        logger.info(f"[Mistral] Done → risk={result['risk']}, score={result['score']}")
        return result

    except json.JSONDecodeError as e:
        logger.error(f"[Mistral] JSON parse failed: {e} — using fallback.")
        return _SAFE_FALLBACK
    except Exception as e:
        logger.error(f"[Mistral] API call failed: {e} — using fallback.")
        return _SAFE_FALLBACK
