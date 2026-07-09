"""
Mistral AI service for route safety analysis.

Model: mistral-large-latest (best reasoning for safety analysis)
Input: source/dest coordinates + contextual data (reports, safe spaces, time)
Output: structured safety assessment JSON
"""

import json
import logging
from mistralai import Mistral
from app.config.settings import get_settings

logger = logging.getLogger(__name__)

# ── Prompt Template ───────────────────────────────────────────────────────────

_ROUTE_ANALYSIS_SYSTEM = (
    "You are AEGIS, an advanced public safety AI assistant. "
    "Analyze route safety and always respond with ONLY a valid JSON object — no markdown, no explanation, no extra text."
)

_ROUTE_ANALYSIS_USER = """
Analyze the safety of this route and return a JSON object.

Route:
- Source: {source_lat}, {source_lng}
- Destination: {dest_lat}, {dest_lng}
- Current time: {current_time}

Context:
- Nearby incident reports: {reports}
- Nearby safe spaces: {safe_spaces}

Required JSON structure (strictly follow this schema):
{{
  "score": <integer 0-100, higher = safer>,
  "risk": <"Low" | "Medium" | "High">,
  "reason": [<2 to 4 concise reason strings>],
  "alternativeRoute": [<coordinate objects {{lat, lng}} if safer route exists, else []>],
  "safeSpacesNearby": [<names of nearby safe spaces, else []>]
}}
"""


def _get_client() -> Mistral:
    """Return a configured Mistral client."""
    settings = get_settings()
    return Mistral(api_key=settings.mistral_api_key)


async def analyze_route_safety(
    source_lat: float,
    source_lng: float,
    dest_lat: float,
    dest_lng: float,
    reports: list[dict] | None = None,
    safe_spaces: list[dict] | None = None,
    current_time: str = "unknown",
) -> dict:
    """
    Calls the Mistral API to generate a safety score for a given route.

    Args:
        source_lat/lng: Origin coordinates
        dest_lat/lng: Destination coordinates
        reports: List of nearby incident reports from Supabase
        safe_spaces: List of nearby safe spaces from Supabase
        current_time: ISO format string of current time

    Returns:
        dict with keys: score, risk, reason, alternativeRoute, safeSpacesNearby

    Raises:
        ValueError: If Mistral returns unparseable JSON
        Exception: On API call failure
    """
    client = _get_client()

    user_message = _ROUTE_ANALYSIS_USER.format(
        source_lat=source_lat,
        source_lng=source_lng,
        dest_lat=dest_lat,
        dest_lng=dest_lng,
        current_time=current_time,
        reports=json.dumps(reports or [], indent=2),
        safe_spaces=json.dumps(safe_spaces or [], indent=2),
    )

    logger.info(
        f"Sending route analysis to Mistral: "
        f"({source_lat},{source_lng}) → ({dest_lat},{dest_lng})"
    )

    response = client.chat.complete(
        model="mistral-large-latest",
        messages=[
            {"role": "system", "content": _ROUTE_ANALYSIS_SYSTEM},
            {"role": "user", "content": user_message},
        ],
        temperature=0.2,       # Low temp = consistent, factual safety analysis
        response_format={"type": "json_object"},   # Enforces JSON-only output
    )

    raw_text = response.choices[0].message.content.strip()

    try:
        result = json.loads(raw_text)
    except json.JSONDecodeError as e:
        logger.error(f"Mistral returned non-JSON: {raw_text}")
        raise ValueError(f"Mistral returned invalid JSON: {e}") from e

    logger.info(f"Route analysis complete — risk: {result.get('risk')}, score: {result.get('score')}")
    return result
