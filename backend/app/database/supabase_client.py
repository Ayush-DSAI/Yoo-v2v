"""
Supabase client singleton.
Uses the Service Role Key for backend operations (bypasses RLS for admin tasks).
Individual user operations should pass the user's JWT via the auth parameter.
"""

from supabase import create_client, Client
from functools import lru_cache
from app.config.settings import get_settings


@lru_cache
def get_supabase() -> Client:
    """
    Returns a cached singleton Supabase admin client.
    This uses the Service Role Key — never expose it to the frontend.
    """
    settings = get_settings()
    return create_client(settings.supabase_url, settings.supabase_service_role_key)
