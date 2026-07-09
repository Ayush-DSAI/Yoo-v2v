"""
JWT Authentication dependency for FastAPI.

Usage:
    from app.middleware.auth import get_current_user

    @router.get("/protected")
    async def protected_route(user: dict = Depends(get_current_user)):
        return {"user_id": user["sub"]}

The dependency extracts the Supabase JWT from the Authorization header,
verifies its signature using the SUPABASE_JWT_SECRET, and returns the
decoded payload. Raises HTTP 401 on any failure.
"""

from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import jwt, JWTError
from app.config.settings import get_settings

# Tells FastAPI/Swagger to expect a Bearer token in the Authorization header
_bearer_scheme = HTTPBearer(auto_error=True)


async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(_bearer_scheme),
    settings=Depends(get_settings),
) -> dict:
    """
    FastAPI dependency that verifies a Supabase JWT.

    Returns the decoded JWT payload (dict) on success.
    The payload includes:
        - sub: str — the Supabase user UUID
        - email: str
        - role: str  (e.g. "authenticated")
        - exp, iat, aud, iss — standard JWT claims

    Raises:
        HTTPException 401 — if the token is missing, expired, or invalid.
    """
    token = credentials.credentials

    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials. Token is missing, expired, or invalid.",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        payload = jwt.decode(
            token,
            settings.supabase_jwt_secret,
            algorithms=["HS256"],
            audience="authenticated",        # Supabase sets aud="authenticated" for user JWTs
            options={"verify_exp": True},
        )
        # Ensure sub (user ID) is present
        if payload.get("sub") is None:
            raise credentials_exception
        return payload

    except JWTError:
        raise credentials_exception
