-- COMPREHENSIVE SECURITY FIX MIGRATION
-- This migration addresses critical security vulnerabilities identified by the linter

-- 1. ENABLE ROW LEVEL SECURITY ON ALL UNPROTECTED TABLES
ALTER TABLE public.roads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.map_villas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feature_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_library ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.room_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.property_icons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.map_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.villa_room_counts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.villa_type_displays ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.slider_images ENABLE ROW LEVEL SECURITY;

-- 2. CREATE SECURE FUNCTION TO CHECK ADMIN STATUS (Prevents recursive RLS)
CREATE OR REPLACE FUNCTION public.is_admin_user()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT EXISTS (
    SELECT 1 
    FROM public.admin_users 
    WHERE email = (
      SELECT email 
      FROM auth.users 
      WHERE id = auth.uid()
    )
  );
$$;

-- 3. CREATE SECURE FUNCTION TO CHECK AUTHENTICATION
CREATE OR REPLACE FUNCTION public.is_authenticated()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT auth.uid() IS NOT NULL;
$$;

-- 4. FIX OVERLY PERMISSIVE RLS POLICIES

-- Fix admin_users policies (remove blanket true policies)
DROP POLICY IF EXISTS "Allow all operations on admin_users" ON public.admin_users;

CREATE POLICY "Admin users can view admin_users"
  ON public.admin_users
  FOR SELECT
  USING (public.is_admin_user());

CREATE POLICY "Admin users can insert admin_users"
  ON public.admin_users
  FOR INSERT
  WITH CHECK (public.is_admin_user());

CREATE POLICY "Admin users can update admin_users"
  ON public.admin_users
  FOR UPDATE
  USING (public.is_admin_user());

CREATE POLICY "Admin users can delete admin_users"
  ON public.admin_users
  FOR DELETE
  USING (public.is_admin_user());

-- Fix email_settings policies
DROP POLICY IF EXISTS "Allow all operations on email_settings" ON public.email_settings;

CREATE POLICY "Admin users can view email_settings"
  ON public.email_settings
  FOR SELECT
  USING (public.is_admin_user());

CREATE POLICY "Admin users can insert email_settings"
  ON public.email_settings
  FOR INSERT
  WITH CHECK (public.is_admin_user());

CREATE POLICY "Admin users can update email_settings"
  ON public.email_settings
  FOR UPDATE
  USING (public.is_admin_user());

CREATE POLICY "Admin users can delete email_settings"
  ON public.email_settings
  FOR DELETE
  USING (public.is_admin_user());

-- Fix contact_messages policies
DROP POLICY IF EXISTS "Allow all operations on contact_messages" ON public.contact_messages;

CREATE POLICY "Anyone can insert contact messages"
  ON public.contact_messages
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admin users can view contact messages"
  ON public.contact_messages
  FOR SELECT
  USING (public.is_admin_user());

CREATE POLICY "Admin users can update contact messages"
  ON public.contact_messages
  FOR UPDATE
  USING (public.is_admin_user());

CREATE POLICY "Admin users can delete contact messages"
  ON public.contact_messages
  FOR DELETE
  USING (public.is_admin_user());

-- 5. ADD PROPER RLS POLICIES FOR NEWLY PROTECTED TABLES

-- Roads (admin only)
CREATE POLICY "Admin users can manage roads"
  ON public.roads
  FOR ALL
  USING (public.is_admin_user())
  WITH CHECK (public.is_admin_user());

CREATE POLICY "Public can view roads"
  ON public.roads
  FOR SELECT
  USING (true);

-- Map villas (admin only)
CREATE POLICY "Admin users can manage map_villas"
  ON public.map_villas
  FOR ALL
  USING (public.is_admin_user())
  WITH CHECK (public.is_admin_user());

CREATE POLICY "Public can view map_villas"
  ON public.map_villas
  FOR SELECT
  USING (true);

-- Gallery categories (admin only manage, public read)
CREATE POLICY "Admin users can manage gallery_categories"
  ON public.gallery_categories
  FOR ALL
  USING (public.is_admin_user())
  WITH CHECK (public.is_admin_user());

CREATE POLICY "Public can view gallery_categories"
  ON public.gallery_categories
  FOR SELECT
  USING (true);

-- Feature categories (admin only manage, public read)
CREATE POLICY "Admin users can manage feature_categories"
  ON public.feature_categories
  FOR ALL
  USING (public.is_admin_user())
  WITH CHECK (public.is_admin_user());

CREATE POLICY "Public can view feature_categories"
  ON public.feature_categories
  FOR SELECT
  USING (true);

-- Media library (admin only)
CREATE POLICY "Admin users can manage media_library"
  ON public.media_library
  FOR ALL
  USING (public.is_admin_user())
  WITH CHECK (public.is_admin_user());

-- Room types (admin only manage, public read)
CREATE POLICY "Admin users can manage room_types"
  ON public.room_types
  FOR ALL
  USING (public.is_admin_user())
  WITH CHECK (public.is_admin_user());

CREATE POLICY "Public can view room_types"
  ON public.room_types
  FOR SELECT
  USING (true);

-- Property icons (admin only manage, public read)
CREATE POLICY "Admin users can manage property_icons"
  ON public.property_icons
  FOR ALL
  USING (public.is_admin_user())
  WITH CHECK (public.is_admin_user());

CREATE POLICY "Public can view property_icons"
  ON public.property_icons
  FOR SELECT
  USING (true);

-- Map settings (admin only)
CREATE POLICY "Admin users can manage map_settings"
  ON public.map_settings
  FOR ALL
  USING (public.is_admin_user())
  WITH CHECK (public.is_admin_user());

CREATE POLICY "Public can view map_settings"
  ON public.map_settings
  FOR SELECT
  USING (true);

-- Contact settings (admin only manage, public read)
CREATE POLICY "Admin users can manage contact_settings"
  ON public.contact_settings
  FOR ALL
  USING (public.is_admin_user())
  WITH CHECK (public.is_admin_user());

CREATE POLICY "Public can view contact_settings"
  ON public.contact_settings
  FOR SELECT
  USING (true);

-- Villa room counts (admin only manage, public read)
CREATE POLICY "Admin users can manage villa_room_counts"
  ON public.villa_room_counts
  FOR ALL
  USING (public.is_admin_user())
  WITH CHECK (public.is_admin_user());

CREATE POLICY "Public can view villa_room_counts"
  ON public.villa_room_counts
  FOR SELECT
  USING (true);

-- Villa type displays (admin only manage, public read)
CREATE POLICY "Admin users can manage villa_type_displays"
  ON public.villa_type_displays
  FOR ALL
  USING (public.is_admin_user())
  WITH CHECK (public.is_admin_user());

CREATE POLICY "Public can view villa_type_displays"
  ON public.villa_type_displays
  FOR SELECT
  USING (true);

-- Slider images (admin only manage, public read)
CREATE POLICY "Admin users can manage slider_images"
  ON public.slider_images
  FOR ALL
  USING (public.is_admin_user())
  WITH CHECK (public.is_admin_user());

CREATE POLICY "Public can view slider_images"
  ON public.slider_images
  FOR SELECT
  USING (true);

-- 6. SECURE EXISTING DATABASE FUNCTIONS (Fix search_path security)
CREATE OR REPLACE FUNCTION public.prevent_multiple_email_settings()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  IF (SELECT COUNT(*) FROM public.email_settings WHERE is_active = true) >= 1 THEN
    RAISE EXCEPTION 'Sadece bir aktif email ayarı olabilir';
  END IF;
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.prevent_multiple_map_settings()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  IF (SELECT COUNT(*) FROM public.map_settings) >= 1 THEN
    RAISE EXCEPTION 'Only one map_settings record is allowed';
  END IF;
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.sync_villa_basic_room_counts()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
    -- Update the villas table with aggregated counts from villa_room_counts
    UPDATE public.villas SET
        bedrooms = COALESCE((
            SELECT vrc.count 
            FROM public.villa_room_counts vrc 
            JOIN public.room_types rt ON vrc.room_type_id = rt.id 
            WHERE vrc.villa_id = COALESCE(NEW.villa_id, OLD.villa_id) 
            AND rt.name = 'bedroom'
        ), 0),
        bathrooms = COALESCE((
            SELECT vrc.count 
            FROM public.villa_room_counts vrc 
            JOIN public.room_types rt ON vrc.room_type_id = rt.id 
            WHERE vrc.villa_id = COALESCE(NEW.villa_id, OLD.villa_id) 
            AND rt.name = 'bathroom'
        ), 0),
        living_rooms = COALESCE((
            SELECT vrc.count 
            FROM public.villa_room_counts vrc 
            JOIN public.room_types rt ON vrc.room_type_id = rt.id 
            WHERE vrc.villa_id = COALESCE(NEW.villa_id, OLD.villa_id) 
            AND rt.name = 'living_room'
        ), 0),
        halls = COALESCE((
            SELECT vrc.count 
            FROM public.villa_room_counts vrc 
            JOIN public.room_types rt ON vrc.room_type_id = rt.id 
            WHERE vrc.villa_id = COALESCE(NEW.villa_id, OLD.villa_id) 
            AND rt.name = 'hall'
        ), 0)
    WHERE id = COALESCE(NEW.villa_id, OLD.villa_id);
    
    RETURN COALESCE(NEW, OLD);
END;
$$;

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;