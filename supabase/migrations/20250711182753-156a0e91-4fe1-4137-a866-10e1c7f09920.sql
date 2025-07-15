
-- Add UPDATE permission for gallery_images table
CREATE POLICY "Anyone can update gallery images" 
  ON gallery_images 
  FOR UPDATE 
  USING (true);
