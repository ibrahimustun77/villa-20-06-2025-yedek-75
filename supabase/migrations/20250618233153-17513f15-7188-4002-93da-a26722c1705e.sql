
-- Add page_type field to slider_images table for different pages
ALTER TABLE public.slider_images 
ADD COLUMN IF NOT EXISTS page_type text DEFAULT 'home';

-- Update existing records to have 'home' as page_type
UPDATE public.slider_images SET page_type = 'home' WHERE page_type IS NULL;

-- Create storage bucket for media library if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('media-library', 'media-library', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage policies for media library bucket
CREATE POLICY "Allow public read access on media library" ON storage.objects
FOR SELECT USING (bucket_id = 'media-library');

CREATE POLICY "Allow authenticated insert on media library" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'media-library');

CREATE POLICY "Allow authenticated update on media library" ON storage.objects
FOR UPDATE USING (bucket_id = 'media-library');

CREATE POLICY "Allow authenticated delete on media library" ON storage.objects
FOR DELETE USING (bucket_id = 'media-library');

-- Update media_library table to include more metadata
ALTER TABLE public.media_library 
ADD COLUMN IF NOT EXISTS alt_text text,
ADD COLUMN IF NOT EXISTS description text;

-- Create gallery_categories table if it doesn't exist with some default categories
INSERT INTO public.gallery_categories (name, value) VALUES 
('Villa İç Mekan', 'villa-interior'),
('Villa Dış Mekan', 'villa-exterior'),
('Manzara', 'landscape'),
('Amenities', 'amenities'),
('Genel', 'general')
ON CONFLICT (value) DO NOTHING;
