# AEGIS API Contract

Base URL

/api

Authentication

Authorization: Bearer <Supabase JWT>

---

POST /routes/analyze

Request

{
  "source": "...",
  "destination": "..."
}

Response

{
  "riskScore": 22,
  "route": [],
  "explanation": ""
}

---

GET /reports

Response

[
  {
    "id":"",
    "title":"",
    "type":"",
    "location":"",
    "createdAt":""
  }
]

---

POST /reports

Request

{
  "title":"",
  "description":"",
  "category":"",
  "location":""
}

---

GET /safe-spaces

Response

[
  {
    "id":"",
    "name":"",
    "latitude":0,
    "longitude":0,
    "verified":true
  }
]

---

POST /sos

Request

multipart/form-data

audio

location

Response

{
    "status":"success"
}

---

GET /analytics

Response

{
  "incidents":[],
  "safeZones":[],
  "riskTrend":[]
}

---

HTTP Status

200 Success

201 Created

400 Bad Request

401 Unauthorized

404 Not Found

500 Server Error
