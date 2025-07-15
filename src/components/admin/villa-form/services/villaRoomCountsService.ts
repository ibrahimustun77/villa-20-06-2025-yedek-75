
import { supabase } from '@/integrations/supabase/client';

export const createDefaultVillaRoomCounts = async (villaId: string, villa: any) => {
  try {
    console.log('Creating default villa room counts for villa:', villaId, villa);
    
    // Get room type IDs
    const { data: roomTypes, error: roomTypesError } = await supabase
      .from('room_types')
      .select('id, name')
      .eq('is_active', true);
    
    if (roomTypesError) throw roomTypesError;
    
    const roomTypeMap = roomTypes.reduce((acc, rt) => {
      acc[rt.name] = rt.id;
      return acc;
    }, {} as Record<string, string>);
    
    // Create default room counts based on villa properties
    const defaultRoomCounts = [];
    
    if (villa.bedrooms && villa.bedrooms > 0 && roomTypeMap.bedroom) {
      defaultRoomCounts.push({
        villa_id: villaId,
        room_type_id: roomTypeMap.bedroom,
        count: villa.bedrooms,
        icon_id: null
      });
    }
    
    if (villa.bathrooms && villa.bathrooms > 0 && roomTypeMap.bathroom) {
      defaultRoomCounts.push({
        villa_id: villaId,
        room_type_id: roomTypeMap.bathroom,
        count: villa.bathrooms,
        icon_id: null
      });
    }
    
    if (villa.living_rooms && villa.living_rooms > 0 && roomTypeMap.living_room) {
      defaultRoomCounts.push({
        villa_id: villaId,
        room_type_id: roomTypeMap.living_room,
        count: villa.living_rooms,
        icon_id: null
      });
    }
    
    if (villa.halls && villa.halls > 0 && roomTypeMap.hall) {
      defaultRoomCounts.push({
        villa_id: villaId,
        room_type_id: roomTypeMap.hall,
        count: villa.halls,
        icon_id: null
      });
    }
    
    if (defaultRoomCounts.length > 0) {
      const { error: insertError } = await supabase
        .from('villa_room_counts')
        .insert(defaultRoomCounts);
      
      if (insertError) throw insertError;
      
      console.log('Default villa room counts created successfully');
    }
    
    return defaultRoomCounts;
  } catch (error) {
    console.error('Error creating default villa room counts:', error);
    throw error;
  }
};

export const syncVillaRoomCounts = async (villaId: string, roomCounts: any[]) => {
  try {
    console.log('Syncing villa room counts for villa:', villaId, roomCounts);
    
    // First, delete existing room counts for this villa
    const { error: deleteError } = await supabase
      .from('villa_room_counts')
      .delete()
      .eq('villa_id', villaId);

    if (deleteError) throw deleteError;

    // Filter out any invalid room counts and prepare data for insertion
    const validRoomCounts = roomCounts
      .filter(room => room.count > 0 && room.room_type_id)
      .map(room => ({
        villa_id: villaId,
        room_type_id: room.room_type_id,
        count: room.count,
        icon_id: room.icon_id || null
      }));

    if (validRoomCounts.length > 0) {
      const { error: insertError } = await supabase
        .from('villa_room_counts')
        .insert(validRoomCounts);

      if (insertError) throw insertError;
    }

    // The database triggers will automatically sync the villas table
    console.log('Villa room counts synced successfully - villas table will be auto-updated by triggers');
  } catch (error) {
    console.error('Error syncing villa room counts:', error);
    throw error;
  }
};
