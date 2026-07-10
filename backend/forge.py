from jose import jwt
import time
import os
from dotenv import load_dotenv

load_dotenv()
secret = os.getenv("SUPABASE_JWT_SECRET")

# This fakes a logged-in user for the next 24 hours
# Using a valid UUID format to satisfy Postgres strict-typing
payload = {
    "sub": "f79a8cd2-4575-46c8-814d-ae5d9615f4ce", 
    "aud": "authenticated",
    "exp": int(time.time()) + 86400 
}

token = jwt.encode(payload, secret, algorithm="HS256")
print(f"\nSEND THIS TO PANDA:\n{token}\n")