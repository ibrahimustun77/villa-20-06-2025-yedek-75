
-- Room types tablosu oluştur (dinamik oda sistemi için)
CREATE TABLE public.room_types (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  display_name TEXT NOT NULL,
  icon_category TEXT NOT NULL DEFAULT 'room',
  default_icon_id UUID REFERENCES public.property_icons(id),
  is_active BOOLEAN NOT NULL DEFAULT true,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Villa room counts tablosu oluştur (villa ve oda tipi ilişkisi için)
CREATE TABLE public.villa_room_counts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  villa_id UUID NOT NULL REFERENCES public.villas(id) ON DELETE CASCADE,
  room_type_id UUID NOT NULL REFERENCES public.room_types(id) ON DELETE CASCADE,
  count INTEGER NOT NULL DEFAULT 0,
  icon_id UUID REFERENCES public.property_icons(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(villa_id, room_type_id)
);

-- Varsayılan oda tiplerini ekle
INSERT INTO public.room_types (name, display_name, icon_category, sort_order) VALUES
('bedroom', 'Yatak Odası', 'room', 1),
('bathroom', 'Banyo', 'room', 2),
('living_room', 'Oturma Odası', 'room', 3),
('hall', 'Salon', 'room', 4),
('kitchen', 'Mutfak', 'room', 5),
('dining_room', 'Yemek Odası', 'room', 6),
('office', 'Çalışma Odası', 'room', 7),
('balcony', 'Balkon', 'room', 8),
('terrace', 'Teras', 'room', 9),
('garage', 'Garaj', 'room', 10);

-- Property icons tablosuna daha fazla ikon ekle (galeri için)
INSERT INTO public.property_icons (icon_name, icon_svg, category, display_name) VALUES
-- Oda ikonları
('bedroom-modern', '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2z"/><path d="M8 21v-2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/></svg>', 'room', 'Yatak Odası - Modern'),
('bedroom-classic', '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="m22 17-10-5-10 5"/></svg>', 'room', 'Yatak Odası - Klasik'),
('bathroom-modern', '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 21v-6h2a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2v6"/><circle cx="12" cy="9" r="2"/></svg>', 'room', 'Banyo - Modern'),
('bathroom-luxury', '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 21h20"/><path d="M6 3v18"/><path d="M10 3v18"/><path d="M14 3v18"/><path d="M18 3v18"/><path d="M2 7h20"/><path d="M2 15h20"/></svg>', 'room', 'Banyo - Lüks'),
('living-room-modern', '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="8" width="20" height="10" rx="2"/><path d="M6 8V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2"/><circle cx="8" cy="13" r="1"/><circle cx="16" cy="13" r="1"/></svg>', 'room', 'Oturma Odası - Modern'),
('living-room-cozy', '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v3"/><path d="M2 16a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v1.5a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5V11a2 2 0 0 0-4 0z"/></svg>', 'room', 'Oturma Odası - Rahat'),
('kitchen-modern', '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Z"/><path d="M5 2v6h4"/></svg>', 'room', 'Mutfak - Modern'),
('dining-room', '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8V3"/><path d="M19 8V3"/><path d="M5 8V3"/><path d="M3 12v8a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-8"/></svg>', 'room', 'Yemek Odası'),
('office', '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="6" width="20" height="8" rx="1"/><path d="M6 21V9a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v12"/><path d="M18 21V9a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12"/></svg>', 'room', 'Çalışma Odası'),
('balcony', '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 22V10"/><path d="M19 22V10"/><path d="M3 10h18"/><path d="M6 6l6-4 6 4"/><path d="M12 2v4"/></svg>', 'room', 'Balkon'),
('terrace', '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18"/><path d="M5 21V7l8-4v18"/><path d="M19 21V11l-6-4"/></svg>', 'room', 'Teras'),
('garage', '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V6a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v7l-5-5z"/></svg>', 'room', 'Garaj'),

-- Tesis ikonları  
('pool', '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 20a2.4 2.4 0 0 0 2 1 2.4 2.4 0 0 0 2-1 2.4 2.4 0 0 1 4 0 2.4 2.4 0 0 1 4 0 2.4 2.4 0 0 0 2 1 2.4 2.4 0 0 0 2-1"/><path d="M2 16a2.4 2.4 0 0 0 2 1 2.4 2.4 0 0 0 2-1 2.4 2.4 0 0 1 4 0 2.4 2.4 0 0 1 4 0 2.4 2.4 0 0 0 2 1 2.4 2.4 0 0 0 2-1"/><path d="M22 12c-6 0-10 4-16 4"/></svg>', 'facility', 'Havuz'),
('garden', '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="M9 12l2 2 4-4"/></svg>', 'facility', 'Bahçe'),
('parking', '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M8 19v-4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4"/><circle cx="9" cy="9" r="1"/><circle cx="15" cy="9" r="1"/></svg>', 'facility', 'Otopark'),

-- Konfor ikonları
('wifi', '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 13a10 10 0 0 1 14 0"/><path d="M8.5 16.5a5 5 0 0 1 7 0"/><path d="M12 20h.01"/></svg>', 'amenity', 'WiFi'),
('air-conditioning', '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 2h8l4 10H4z"/><path d="M12 12v8"/><path d="m8 22 4-10 4 10"/><path d="M8 22h8"/></svg>', 'amenity', 'Klima'),
('heating', '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"/></svg>', 'amenity', 'Isıtma');

-- Room types için default icon ilişkilerini güncelle
UPDATE public.room_types SET default_icon_id = (
  SELECT id FROM public.property_icons WHERE icon_name = 'bedroom-default' LIMIT 1
) WHERE name = 'bedroom';

UPDATE public.room_types SET default_icon_id = (
  SELECT id FROM public.property_icons WHERE icon_name = 'bathroom-default' LIMIT 1
) WHERE name = 'bathroom';

UPDATE public.room_types SET default_icon_id = (
  SELECT id FROM public.property_icons WHERE icon_name = 'living-room-default' LIMIT 1
) WHERE name = 'living_room';

UPDATE public.room_types SET default_icon_id = (
  SELECT id FROM public.property_icons WHERE icon_name = 'hall-default' LIMIT 1
) WHERE name = 'hall';

-- Updated_at trigger'ları ekle
CREATE TRIGGER update_room_types_updated_at
  BEFORE UPDATE ON public.room_types
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER update_villa_room_counts_updated_at
  BEFORE UPDATE ON public.villa_room_counts
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();
