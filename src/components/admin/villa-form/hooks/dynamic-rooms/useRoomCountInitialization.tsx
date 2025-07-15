
import { useEffect, useRef } from 'react';
import { RoomType, RoomCount } from './types';

interface UseRoomCountInitializationProps {
  roomTypes: RoomType[];
  villaId?: string;
  existingRoomCounts: any[];
  villaData: any;
  setRoomCounts: React.Dispatch<React.SetStateAction<RoomCount[]>>;
  refetchRoomCounts: () => void;
}

export const useRoomCountInitialization = ({
  roomTypes,
  villaId,
  existingRoomCounts,
  villaData,
  setRoomCounts,
  refetchRoomCounts
}: UseRoomCountInitializationProps) => {
  const hasInitialized = useRef(false);
  
  useEffect(() => {
    if (!roomTypes.length) return;

    console.log('Room count initialization triggered', {
      villaId,
      roomTypesLength: roomTypes.length,
      existingRoomCountsLength: existingRoomCounts.length,
      villaData,
      hasInitialized: hasInitialized.current
    });

    // If editing villa and have existing room counts from database
    if (villaId && existingRoomCounts.length > 0 && !hasInitialized.current) {
      console.log('Using existing room counts from database');
      const roomCountsWithNames = existingRoomCounts.map(vrc => {
        const roomType = roomTypes.find(rt => rt.id === vrc.room_type_id);
        return {
          room_type_id: vrc.room_type_id,
          count: vrc.count,
          icon_id: vrc.icon_id || '',
          room_type_name: roomType?.name || 'unknown',
          room_type_display_name: roomType?.display_name || 'Unknown',
          is_manual: roomType?.is_manual || false
        };
      });
      
      setRoomCounts(roomCountsWithNames);
      hasInitialized.current = true;
      return;
    }

    // If creating new villa, initialize with defaults from villa data (only once)
    if (villaData && !villaId && !hasInitialized.current) {
      console.log('Creating defaults from villa data for new villa');
      const defaults: RoomCount[] = [];
      const basicRoomTypes = ['bedroom', 'bathroom', 'living_room', 'hall'];
      
      basicRoomTypes.forEach(roomTypeName => {
        const roomType = roomTypes.find(rt => rt.name === roomTypeName);
        if (roomType) {
          let count = 0;
          switch (roomTypeName) {
            case 'bedroom':
              count = villaData.bedrooms || 0;
              break;
            case 'bathroom':
              count = villaData.bathrooms || 0;
              break;
            case 'living_room':
              count = villaData.living_rooms || 0;
              break;
            case 'hall':
              count = villaData.halls || 0;
              break;
          }
          
          if (count > 0) {
            defaults.push({
              room_type_id: roomType.id,
              count,
              icon_id: roomType.default_icon_id || '',
              room_type_name: roomType.name,
              room_type_display_name: roomType.display_name,
              is_manual: roomType.is_manual || false
            });
          }
        }
      });
      
      setRoomCounts(defaults);
      hasInitialized.current = true;
    }
  }, [roomTypes, villaId, existingRoomCounts, villaData, setRoomCounts, refetchRoomCounts]);

  // Reset initialization flag when villa changes
  useEffect(() => {
    hasInitialized.current = false;
  }, [villaId]);
};
