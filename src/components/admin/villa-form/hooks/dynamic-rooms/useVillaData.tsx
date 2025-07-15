
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const useVillaData = (villaId?: string) => {
  const { data: villaData } = useQuery({
    queryKey: ['villa-data', villaId],
    queryFn: async () => {
      if (!villaId) return null;
      
      const { data, error } = await supabase
        .from('villas')
        .select('bedrooms, bathrooms, living_rooms, halls')
        .eq('id', villaId)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!villaId
  });

  return { villaData };
};
