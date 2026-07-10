# AEGIS

## The Idea
AEGIS is a comprehensive safety and emergency response platform designed to provide real-time situational awareness and rapid crisis resolution. It solves the critical problem of disconnected safety systems by unifying crowdsourced hazard reporting, AI-driven route analysis, and a one-touch SOS engine with ambient audio streaming into a single, responsive application.

## Important Links
* **Live Deployment Link:** [(https://yoo-v2v.vercel.app/)]
* **Demo Video Link:** https://drive.google.com/drive/folders/1be0uZ8HF6gAhcsObTA2ank0zxvICBHbS?usp=sharing

## Features
* **Feature 1:** Interactive, glassmorphic safety tracking widgets.
* **Feature 2:** Real-time passive location telemetry.
* **Feature 3:** Responsive, motion-driven transit routing map.
* **Feature 4: AI Route Analyzer:** Evaluates path safety between source and destination using Mistral AI, returning a safety score, risk level, and detailed explanation.
* **Feature 5: Crowdsourced Hazard Reporting:** Allows users to submit geolocation-tagged hazard reports with image evidence streamed directly to cloud storage.
* **Feature 6: SOS Emergency Engine:** A one-touch critical alert system that captures real-time GPS coordinates and records ambient audio clips via the browser's MediaRecorder API for emergency verification.
* **Feature 7: Real-time Analytics Dashboard:** Live tracking of active SOS alerts, total safe spaces, and hazard reports for administrative oversight.

## Tech Stack & Tools
* **Frontend:** Next.js (App Router), TypeScript, Tailwind CSS
* **Backend:** FastAPI (Python), Uvicorn
* **Database & Storage:** Supabase (PostgreSQL), Supabase Storage Buckets
* **AI Integration:** Mistral AI API
* **Geocoding:** OpenStreetMap Nominatim API
* **Deployment:** Vercel (Frontend), Render (Backend)

## Documentation

### How it works under the hood
AEGIS v2 operates on a decoupled architecture. The backend is a robust FastAPI application hosted on Render, handling RESTful API requests, custom JWT authentication, and direct interactions with a Supabase PostgreSQL database. 

When a user interacts with the Next.js frontend (hosted on Vercel), the application seamlessly communicates with the backend via a centralized API utility. 
* **Media Handling:** For SOS audio and hazard images, the frontend utilizes `FormData` and native browser APIs (like `navigator.geolocation` and `MediaRecorder`) to stream binary data to the backend, which is then securely uploaded to public Supabase Storage buckets.
* **Data Retrieval:** The analytics dashboard utilizes aggressive Next.js caching control (`{ cache: 'no-store' }`) to ensure live metrics are pulled from the backend's exact count queries.
* **Location Services:** The frontend translates user-friendly text addresses into precise latitude and longitude coordinates using the free OpenStreetMap Nominatim API before routing data to the backend.

### How we coordinated our AI tools
The AI integration is centralized in the Route Analyzer engine. Instead of exposing AI keys on the frontend, the Next.js client sends translated GPS coordinates to the secure FastAPI backend endpoint (`POST /api/routes/analyze`). 

The backend constructs a specialized prompt utilizing the Mistral AI API, processing the geospatial data to assess potential risks. The AI returns a strictly formatted JSON contract (containing a safety score, risk assessment, and reasoning) which the backend sanitizes and serves back to the frontend to populate the UI safety widgets.
