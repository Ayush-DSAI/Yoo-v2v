-- ============================================================
-- AEGIS — Supabase SQL Migration
-- Run this in: Supabase Dashboard → SQL Editor → New Query
-- ============================================================


-- ── 1. profiles ──────────────────────────────────────────────
-- Extends Supabase Auth users with extra profile data.
-- 'id' references auth.users so it auto-deletes on user removal.

create table if not exists public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  name        text,
  phone       text,
  avatar      text,                           -- URL to profile image
  created_at  timestamptz default now() not null
);

-- Enable RLS
alter table public.profiles enable row level security;

-- Users can only read/write their own profile
create policy "profiles: owner access"
  on public.profiles
  for all
  using  (auth.uid() = id)
  with check (auth.uid() = id);


-- ── 2. reports ───────────────────────────────────────────────
-- Incident reports submitted by users with optional image.

create table if not exists public.reports (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  title       text not null,
  description text,
  category    text not null,                  -- e.g. "harassment", "theft", "poor_lighting"
  latitude    double precision not null,
  longitude   double precision not null,
  image_url   text,                           -- URL in Supabase Storage reports-images bucket
  status      text not null default 'active', -- active | resolved | flagged
  created_at  timestamptz default now() not null
);

create index if not exists reports_user_id_idx    on public.reports(user_id);
create index if not exists reports_created_at_idx on public.reports(created_at desc);
create index if not exists reports_location_idx   on public.reports(latitude, longitude);

alter table public.reports enable row level security;

-- Authenticated users can read all reports (for map display)
create policy "reports: authenticated read"
  on public.reports
  for select
  using (auth.role() = 'authenticated');

-- Users can only insert their own reports
create policy "reports: owner insert"
  on public.reports
  for insert
  with check (auth.uid() = user_id);

-- Users can only update/delete their own reports
create policy "reports: owner modify"
  on public.reports
  for update
  using (auth.uid() = user_id);


-- ── 3. safe_spaces ───────────────────────────────────────────
-- Verified safe locations (hospitals, police stations, shelters).

create table if not exists public.safe_spaces (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  latitude    double precision not null,
  longitude   double precision not null,
  type        text not null,                  -- "hospital" | "police_station" | "shelter"
  created_at  timestamptz default now() not null
);

create index if not exists safe_spaces_location_idx on public.safe_spaces(latitude, longitude);

alter table public.safe_spaces enable row level security;

-- All authenticated users can read safe spaces
create policy "safe_spaces: authenticated read"
  on public.safe_spaces
  for select
  using (auth.role() = 'authenticated');


-- ── 4. sos ───────────────────────────────────────────────────
-- Emergency SOS records — GPS location + audio evidence.

create table if not exists public.sos (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  latitude    double precision not null,
  longitude   double precision not null,
  audio_url   text not null,                  -- URL in Supabase Storage sos-audio bucket
  created_at  timestamptz default now() not null
);

create index if not exists sos_user_id_idx    on public.sos(user_id);
create index if not exists sos_created_at_idx on public.sos(created_at desc);

alter table public.sos enable row level security;

-- Users can only see their own SOS records
create policy "sos: owner read"
  on public.sos
  for select
  using (auth.uid() = user_id);

-- Users can only insert their own SOS records
create policy "sos: owner insert"
  on public.sos
  for insert
  with check (auth.uid() = user_id);


-- ── 5. Seed safe_spaces with initial data ────────────────────
-- Bhubaneswar example data — update lat/lng for your city.

insert into public.safe_spaces (name, latitude, longitude, type) values
  ('City General Hospital',       20.2961, 85.8245, 'hospital'),
  ('Central Police Station',      20.2985, 85.8312, 'police_station'),
  ('Women''s Shelter - NGO Hub',  20.2880, 85.8198, 'shelter'),
  ('Fire Station - Unit 3',       20.3010, 85.8170, 'fire_station'),
  ('Railway Police Booth',        20.2720, 85.8330, 'police_station')
on conflict do nothing;


-- ============================================================
-- ✅ Done! Tables created: profiles, reports, safe_spaces, sos
-- Next: Create Storage buckets in the Supabase Dashboard:
--   - reports-images  (public)
--   - sos-audio       (public)
-- ============================================================
