
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { determineRoomCountsToUse, filterOtherRoomCounts } from '../utils/roomDataUtils';

export const useVillaRoomData = (villaId?: string, dynamicRooms?: any[]) => {
  console.log('useVillaRoomData - villaId:', villaId);
  console.log('useVillaRoomData - dynamicRooms prop:', dynamicRooms);

  const { data: villaRoomCounts = [] } = useQuery({
    queryKey: ['villa-room-counts', villaId],
    queryFn: async () => {
      if (!villaId) return [];
      
      console.log('Fetching villa room counts for villa:', villaId);
      
      const { data, error } = await supabase
        .from('villa_room_counts')
        .select(`
          *,
          room_types(name, display_name, is_manual),
          property_icons(icon_svg)
        `)
        .eq('villa_id', villaId);
      
      if (error) {
        console.error('Error fetching villa room counts:', error);
        throw error;
      }
      
      console.log('Fetched villa room counts:', data);
      
      // Transform data to include display_name properly
      return (data || []).map(vrc => ({
        ...vrc,
        display_name: vrc.room_types?.display_name || 'Oda',
        icon_svg: vrc.property_icons?.icon_svg || null
      }));
    },
    enabled: !!villaId
  });

  console.log('useVillaRoomData - villaRoomCounts query result:', villaRoomCounts);

  const roomCountsToUse = determineRoomCountsToUse(villaId, villaRoomCounts, dynamicRooms);
  const otherRoomCounts = filterOtherRoomCounts(roomCountsToUse);

  console.log('useVillaRoomData - roomCountsToUse:', roomCountsToUse);
  console.log('useVillaRoomData - otherRoomCounts:', otherRoomCounts);

  return {
    roomCountsToUse,
    otherRoomCounts
  };
};
