
-- Add secondary phone number field to contact_settings table
ALTER TABLE public.contact_settings 
ADD COLUMN phone_number_secondary text;

-- Update the existing record to include the secondary phone number
UPDATE public.contact_settings 
SET phone_number_secondary = '+905466708554'
WHERE id IS NOT NULL;
