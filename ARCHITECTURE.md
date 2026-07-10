# AEGIS Architecture

## Project Overview

AEGIS (Predict. Protect. Prevent.) is an AI-powered web application that predicts safety risks, provides safe route recommendations, enables emergency SOS, and offers city safety analytics.

Frontend and backend are completely decoupled.

---

# Tech Stack

Frontend
- Next.js 16
- React 19
- TypeScript
- Tailwind CSS v4
- Supabase Auth
- Google Maps JavaScript API
- Zustand
- React Query
- Axios

Backend
- FastAPI
- Supabase Database
- Gemini AI
- Whisper
- Twilio
- Render

Database
- Supabase PostgreSQL

Deployment
- Frontend → Vercel
- Backend → Render
- Database → Supabase

---

# High-Level Architecture

User

↓

Next.js Frontend

↓

FastAPI API

↓

Gemini AI
Supabase
Whisper
Twilio

↓

Database

---

# Frontend Architecture

src/

app/

components/

hooks/

services/

constants/

lib/

types/

utils/

assets/

styles/

---

# Backend Architecture

routers/

services/

middleware/

models/

schemas/

utils/

---

# State Management

Local UI State
- Zustand

Server State
- React Query

Authentication
- Supabase

---

# Design Principles

- Clean Architecture
- DRY
- SOLID
- Feature-based organization
- Modular components
- Reusable UI
- Strong typing
- Mobile-first
- Accessibility first

---

# Coding Philosophy

Never duplicate business logic.

Business logic belongs in services.

Components should only render UI.

Pages compose components.

API calls belong inside services.

Constants belong inside constants.

Types belong inside types.
