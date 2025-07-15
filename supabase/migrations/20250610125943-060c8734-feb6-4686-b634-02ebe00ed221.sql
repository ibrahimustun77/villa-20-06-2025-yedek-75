
-- Remove the problematic check constraint from map_villas table
ALTER TABLE public.map_villas DROP CONSTRAINT IF EXISTS map_villas_type_check;
