
-- Create admin_users table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Check if the test admin user exists, if not insert it
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.admin_users WHERE username = 'thermaprime') THEN
    INSERT INTO public.admin_users (username, password_hash, email)
    VALUES ('thermaprime', 'admin2024', 'admin@thermaprime.com');
  END IF;
END
$$;
