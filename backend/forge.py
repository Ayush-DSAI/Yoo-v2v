from jose import jwt
import time
import os
from dotenv import load_dotenv

load_dotenv()
secret = os.getenv("SUPABASE_JWT_SECRET")

# This fakes a logged-in user for the next 24 hours
payload = {
    "sub": "hackathon-test-user-123",
    "aud": "authenticated",
    "exp": int(time.time()) + 86400 
}

token = jwt.encode(payload, secret, algorithm="HS256")
print(f"\nSEND THIS TO PANDA:\n{token}\n")