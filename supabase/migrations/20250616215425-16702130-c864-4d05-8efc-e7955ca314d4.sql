
-- Add missing columns to gallery_images table
ALTER TABLE gallery_images 
ADD COLUMN IF NOT EXISTS category text DEFAULT 'villa',
ADD COLUMN IF NOT EXISTS order_index integer DEFAULT 0,
ADD COLUMN IF NOT EXISTS alt_text text,
ADD COLUMN IF NOT EXISTS is_active boolean DEFAULT true;

-- Create storage bucket for gallery images if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('gallery', 'gallery', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage policy for gallery bucket
CREATE POLICY "Allow public read access" ON storage.objects
FOR SELECT USING (bucket_id = 'gallery');

CREATE POLICY "Allow authenticated insert" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'gallery');

CREATE POLICY "Allow authenticated update" ON storage.objects
FOR UPDATE USING (bucket_id = 'gallery');

CREATE POLICY "Allow authenticated delete" ON storage.objects
FOR DELETE USING (bucket_id = 'gallery');
