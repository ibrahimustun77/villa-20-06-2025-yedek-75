
-- Add missing icon columns to villas table
ALTER TABLE public.villas 
ADD COLUMN bedroom_icon_id UUID REFERENCES public.property_icons(id),
ADD COLUMN bathroom_icon_id UUID REFERENCES public.property_icons(id),
ADD COLUMN living_room_icon_id UUID REFERENCES public.property_icons(id),
ADD COLUMN hall_icon_id UUID REFERENCES public.property_icons(id);
