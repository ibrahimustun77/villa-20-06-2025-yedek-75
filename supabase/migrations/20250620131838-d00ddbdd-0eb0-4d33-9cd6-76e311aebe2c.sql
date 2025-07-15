
-- Create property icons table for icon library
CREATE TABLE public.property_icons (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  icon_name TEXT NOT NULL UNIQUE,
  icon_svg TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'room',
  display_name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create feature categories table
CREATE TABLE public.feature_categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  order_index INTEGER NOT NULL DEFAULT 0,
  color TEXT NOT NULL DEFAULT '#e94560',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add feature_groups column to villas table for grouped features
ALTER TABLE public.villas 
ADD COLUMN feature_groups JSONB DEFAULT '[]'::jsonb;

-- Add icon references to villa_type_displays
ALTER TABLE public.villa_type_displays 
ADD COLUMN bedroom_icon_id UUID REFERENCES public.property_icons(id),
ADD COLUMN bathroom_icon_id UUID REFERENCES public.property_icons(id),
ADD COLUMN living_room_icon_id UUID REFERENCES public.property_icons(id),
ADD COLUMN hall_icon_id UUID REFERENCES public.property_icons(id);

-- Insert default property icons
INSERT INTO public.property_icons (icon_name, icon_svg, category, display_name) VALUES
('bedroom-default', '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 22v-5h20v5" /><path d="M18 11V2H6v9" /><path d="M2 16h20" /><path d="M14 7h-4" /></svg>', 'room', 'Yatak Odası - Varsayılan'),
('bathroom-default', '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1-.5C4.683 3 4 3.683 4 4.5V17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5" /><line x1="10" x2="8" y1="5" y2="7" /><line x1="2" x2="22" y1="12" y2="12" /><line x1="7" x2="7" y1="19" y2="21" /><line x1="17" x2="17" y1="19" y2="21" /></svg>', 'room', 'Banyo - Varsayılan'),
('living-room-default', '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2"/><path d="M3 7v12a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7"/><path d="M7 16h10"/><path d="M7 20v-4"/><path d="M17 20v-4"/></svg>', 'room', 'Oturma Odası - Varsayılan'),
('hall-default', '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" /><path d="M12 3v6" /></svg>', 'room', 'Salon - Varsayılan');

-- Insert default feature categories
INSERT INTO public.feature_categories (name, order_index, color) VALUES
('Ortak Alan', 1, '#e94560'),
('Bağımsız Alan', 2, '#2563eb'),
('Konfor', 3, '#059669'),
('Güvenlik', 4, '#dc2626'),
('Diğer', 5, '#6b7280');

-- Add updated_at trigger for new tables
CREATE TRIGGER update_property_icons_updated_at
  BEFORE UPDATE ON public.property_icons
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER update_feature_categories_updated_at
  BEFORE UPDATE ON public.feature_categories
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();
