export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          name: string | null;
          avatar_url: string | null;
          phone: string | null;
          is_email_verified: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          name?: string | null;
          avatar_url?: string | null;
          phone?: string | null;
          is_email_verified?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string | null;
          avatar_url?: string | null;
          phone?: string | null;
          is_email_verified?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      guardians: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          email: string;
          phone: string;
          relationship: string;
          is_primary: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          email: string;
          phone: string;
          relationship: string;
          is_primary?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          name?: string;
          email?: string;
          phone?: string;
          relationship?: string;
          is_primary?: boolean;
          created_at?: string;
        };
      };
      reports: {
        Row: {
          id: string;
          user_id: string;
          category: string;
          description: string;
          latitude: string;
          longitude: string;
          address: string | null;
          image_url: string | null;
          is_anonymous: boolean;
          status: string;
          verified: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          category: string;
          description: string;
          latitude: string;
          longitude: string;
          address?: string | null;
          image_url?: string | null;
          is_anonymous?: boolean;
          status?: string;
          verified?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          category?: string;
          description?: string;
          latitude?: string;
          longitude?: string;
          address?: string | null;
          image_url?: string | null;
          is_anonymous?: boolean;
          status?: string;
          verified?: boolean;
          created_at?: string;
        };
      };
      safe_spaces: {
        Row: {
          id: string;
          name: string;
          type: string;
          latitude: string;
          longitude: string;
          address: string;
          phone: string | null;
          rating: string | null;
          is_open_24_hours: boolean;
          verified: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          type: string;
          latitude: string;
          longitude: string;
          address: string;
          phone?: string | null;
          rating?: string | null;
          is_open_24_hours?: boolean;
          verified?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          type?: string;
          latitude?: string;
          longitude?: string;
          address?: string;
          phone?: string | null;
          rating?: string | null;
          is_open_24_hours?: boolean;
          verified?: boolean;
          created_at?: string;
        };
      };
      routes: {
        Row: {
          id: string;
          user_id: string;
          origin: Json;
          destination: Json;
          waypoints: Json;
          safety_score: string | null;
          risk_level: string | null;
          risk_factors: Json;
          alternative_routes: Json;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          origin: Json;
          destination: Json;
          waypoints?: Json;
          safety_score?: string | null;
          risk_level?: string | null;
          risk_factors?: Json;
          alternative_routes?: Json;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          origin?: Json;
          destination?: Json;
          waypoints?: Json;
          safety_score?: string | null;
          risk_level?: string | null;
          risk_factors?: Json;
          alternative_routes?: Json;
          created_at?: string;
        };
      };
      sos: {
        Row: {
          id: string;
          user_id: string;
          latitude: string;
          longitude: string;
          address: string | null;
          audio_url: string | null;
          guardian_notified: boolean;
          status: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          latitude: string;
          longitude: string;
          address?: string | null;
          audio_url?: string | null;
          guardian_notified?: boolean;
          status?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          latitude?: string;
          longitude?: string;
          address?: string | null;
          audio_url?: string | null;
          guardian_notified?: boolean;
          status?: string;
          created_at?: string;
        };
      };
      analytics: {
        Row: {
          id: string;
          user_id: string;
          event_type: string;
          event_data: Json;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          event_type: string;
          event_data?: Json;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          event_type?: string;
          event_data?: Json;
          created_at?: string;
        };
      };
    };
  };
}
