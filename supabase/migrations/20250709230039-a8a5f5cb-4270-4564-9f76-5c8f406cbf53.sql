-- Add location_iframe field to contact_settings table
ALTER TABLE public.contact_settings 
ADD COLUMN location_iframe TEXT;

-- Update existing WhatsApp number to +905318423477
UPDATE public.contact_settings 
SET whatsapp_number = '+905318423477'
WHERE whatsapp_number IS NOT NULL OR whatsapp_number != '+905318423477';

-- If no contact_settings record exists, create one with the WhatsApp number
INSERT INTO public.contact_settings (whatsapp_number, phone_number)
SELECT '+905318423477', '+905318423477'
WHERE NOT EXISTS (SELECT 1 FROM public.contact_settings);