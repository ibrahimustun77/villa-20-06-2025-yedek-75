
import { useState, useEffect, useCallback } from 'react';
import { RoomCount } from './dynamic-rooms/types';
import { useRoomTypes } from './dynamic-rooms/useRoomTypes';
import { useVillaRoomCounts } from './dynamic-rooms/useVillaRoomCounts';
import { useVillaData } from './dynamic-rooms/useVillaData';
import { useRoomCountOperations } from './dynamic-rooms/useRoomCountOperations';
import { useRoomCountInitialization } from './dynamic-rooms/useRoomCountInitialization';

export const useDynamicRooms = (villaId?: string) => {
  const [roomCounts, setRoomCounts] = useState<RoomCount[]>([]);

  // Fetch room types
  const { roomTypes, loadingRoomTypes, refetchRoomTypes } = useRoomTypes();

  // Fetch existing room counts for villa (when editing)
  const { existingRoomCounts, refetchRoomCounts } = useVillaRoomCounts(villaId);

  // Fetch villa data to create defaults if needed
  const { villaData } = useVillaData(villaId);

  // Room count operations
  const {
    addRoom,
    removeRoom,
    updateRoomIcon,
    updateRoomCount,
    addManualRoom
  } = useRoomCountOperations(roomCounts, setRoomCounts, roomTypes);

  // Initialize room counts when data is loaded
  useRoomCountInitialization({
    roomTypes,
    villaId,
    existingRoomCounts,
    villaData,
    setRoomCounts,
    refetchRoomCounts
  });

  // Update room counts with new room type info when room types are refetched
  useEffect(() => {
    if (roomTypes.length > 0 && roomCounts.length > 0) {
      setRoomCounts(prevCounts => 
        prevCounts.map(rc => {
          const updatedRoomType = roomTypes.find(rt => rt.id === rc.room_type_id);
          if (updatedRoomType) {
            return {
              ...rc,
              room_type_name: updatedRoomType.name,
              room_type_display_name: updatedRoomType.display_name,
              is_manual: updatedRoomType.is_manual || false
            };
          }
          return rc;
        })
      );
    }
  }, [roomTypes]);

  // Handle manual room addition with proper state preservation
  const handleAddManualRoom = useCallback(async (name: string, displayName: string) => {
    try {
      console.log('Adding manual room:', name, displayName);
      
      // Store current room counts before adding manual room
      const currentRoomCounts = roomCounts;
      
      const result = await addManualRoom(name, displayName);
      
      console.log('Manual room added to database, refetching room types');
      
      // Refetch room types to include the new manual room type
      await refetchRoomTypes();
      
      console.log('Manual room added successfully, room types refetched');
      return result;
    } catch (error) {
      console.error('Error adding manual room:', error);
      throw error;
    }
  }, [addManualRoom, refetchRoomTypes, roomCounts]);

  return {
    roomTypes,
    roomCounts,
    loadingRoomTypes,
    addRoom,
    removeRoom,
    updateRoomIcon,
    updateRoomCount,
    addManualRoom: handleAddManualRoom,
    setRoomCounts
  };
};
