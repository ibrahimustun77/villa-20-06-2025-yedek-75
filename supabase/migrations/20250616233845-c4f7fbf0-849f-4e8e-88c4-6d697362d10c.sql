
-- Email ayarları için tablo oluştur
CREATE TABLE public.email_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  smtp_host TEXT NOT NULL,
  smtp_port INTEGER NOT NULL DEFAULT 587,
  email_address TEXT NOT NULL,
  email_password TEXT NOT NULL,
  sender_name TEXT NOT NULL DEFAULT 'Therma Prime',
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- İletişim mesajları için tablo oluştur
CREATE TABLE public.contact_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- RLS politikalarını etkinleştir
ALTER TABLE public.email_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Admin kullanıcıları için politikalar (şimdilik herkese açık - authentication sonrası güncellenecek)
CREATE POLICY "Allow all operations on email_settings" 
  ON public.email_settings 
  FOR ALL 
  USING (true) 
  WITH CHECK (true);

CREATE POLICY "Allow all operations on contact_messages" 
  ON public.contact_messages 
  FOR ALL 
  USING (true) 
  WITH CHECK (true);

-- Trigger for updated_at
CREATE TRIGGER set_updated_at_email_settings
  BEFORE UPDATE ON public.email_settings
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER set_updated_at_contact_messages
  BEFORE UPDATE ON public.contact_messages
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();

-- Sadece bir email ayarı kaydı olmasını sağla
CREATE OR REPLACE FUNCTION public.prevent_multiple_email_settings()
RETURNS trigger
LANGUAGE plpgsql
AS $function$
BEGIN
  IF (SELECT COUNT(*) FROM email_settings WHERE is_active = true) >= 1 THEN
    RAISE EXCEPTION 'Sadece bir aktif email ayarı olabilir';
  END IF;
  RETURN NEW;
END;
$function$;

CREATE TRIGGER prevent_multiple_email_settings_trigger
  BEFORE INSERT ON public.email_settings
  FOR EACH ROW
  EXECUTE FUNCTION public.prevent_multiple_email_settings();
