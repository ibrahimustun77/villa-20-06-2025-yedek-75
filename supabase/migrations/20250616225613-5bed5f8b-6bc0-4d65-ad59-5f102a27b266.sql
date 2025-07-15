
-- Villa tablosuna yeni kolonlar ekle ve eski kolonları kaldır
ALTER TABLE public.villas 
ADD COLUMN living_rooms integer,
ADD COLUMN halls integer;

-- Eski kolonları kaldır
ALTER TABLE public.villas 
DROP COLUMN square_meters,
DROP COLUMN max_guests;

-- Villa type displays tablosunda da değişiklikler yap
ALTER TABLE public.villa_type_displays 
ADD COLUMN display_living_rooms integer DEFAULT 1,
ADD COLUMN display_halls integer DEFAULT 1;

-- Eski display kolonları kaldır
ALTER TABLE public.villa_type_displays 
DROP COLUMN display_area;
