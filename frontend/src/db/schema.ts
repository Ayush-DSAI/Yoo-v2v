import { pgTable, text, timestamp, uuid, integer, boolean, decimal, jsonb } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: text('email').notNull().unique(),
  name: text('name'),
  avatarUrl: text('avatar_url'),
  phone: text('phone'),
  isEmailVerified: boolean('is_email_verified').default(false),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const guardians = pgTable('guardians', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id),
  name: text('name').notNull(),
  email: text('email').notNull(),
  phone: text('phone').notNull(),
  relationship: text('relationship').notNull(),
  isPrimary: boolean('is_primary').default(false),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const reports = pgTable('reports', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id),
  category: text('category').notNull(),
  description: text('description').notNull(),
  latitude: decimal('latitude', { precision: 10, scale: 7 }).notNull(),
  longitude: decimal('longitude', { precision: 10, scale: 7 }).notNull(),
  address: text('address'),
  imageUrl: text('image_url'),
  isAnonymous: boolean('is_anonymous').default(false),
  status: text('status').default('pending'),
  verified: boolean('verified').default(false),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const safeSpaces = pgTable('safe_spaces', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  type: text('type').notNull(),
  latitude: decimal('latitude', { precision: 10, scale: 7 }).notNull(),
  longitude: decimal('longitude', { precision: 10, scale: 7 }).notNull(),
  address: text('address').notNull(),
  phone: text('phone'),
  rating: decimal('rating', { precision: 3, scale: 2 }),
  isOpen24Hours: boolean('is_open_24_hours').default(false),
  verified: boolean('verified').default(false),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const routes = pgTable('routes', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id),
  origin: jsonb('origin').notNull(),
  destination: jsonb('destination').notNull(),
  waypoints: jsonb('waypoints').default([]),
  safetyScore: decimal('safety_score', { precision: 5, scale: 2 }),
  riskLevel: text('risk_level'),
  riskFactors: jsonb('risk_factors').default([]),
  alternativeRoutes: jsonb('alternative_routes').default([]),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const sos = pgTable('sos', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id),
  latitude: decimal('latitude', { precision: 10, scale: 7 }).notNull(),
  longitude: decimal('longitude', { precision: 10, scale: 7 }).notNull(),
  address: text('address'),
  audioUrl: text('audio_url'),
  guardianNotified: boolean('guardian_notified').default(false),
  status: text('status').default('active'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const analytics = pgTable('analytics', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id),
  eventType: text('event_type').notNull(),
  eventData: jsonb('event_data').default({}),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
