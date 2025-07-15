
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const useVillaRoomCounts = (villaId?: string) => {
  const { data: existingRoomCounts = [], refetch: refetchRoomCounts } = useQuery({
    queryKey: ['villa-room-counts', villaId],
    queryFn: async () => {
      if (!villaId) return [];
      
      const { data, error } = await supabase
        .from('villa_room_counts')
        .select('*')
        .eq('villa_id', villaId);
      
      if (error) throw error;
      return data;
    },
    enabled: !!villaId
  });

  return {
    existingRoomCounts,
    refetchRoomCounts
  };
};
