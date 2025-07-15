
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { RoomType } from './types';

export const useRoomTypes = () => {
  const queryClient = useQueryClient();

  const { data: roomTypes = [], isLoading: loadingRoomTypes, refetch } = useQuery({
    queryKey: ['room-types'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('room_types')
        .select('*')
        .eq('is_active', true)
        .order('sort_order');
      
      if (error) throw error;
      return data as RoomType[];
    }
  });

  const refetchRoomTypes = () => {
    queryClient.invalidateQueries({ queryKey: ['room-types'] });
    return refetch();
  };

  return {
    roomTypes,
    loadingRoomTypes,
    refetchRoomTypes
  };
};
