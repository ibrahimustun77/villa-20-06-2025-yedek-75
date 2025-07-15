
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { RoomCount, RoomType } from './types';

export const useRoomCountOperations = (
  roomCounts: RoomCount[],
  setRoomCounts: React.Dispatch<React.SetStateAction<RoomCount[]>>,
  roomTypes: RoomType[]
) => {
  const addRoom = (roomTypeId: string) => {
    const roomType = roomTypes.find(rt => rt.id === roomTypeId);
    if (!roomType) return;

    const existing = roomCounts.find(rc => rc.room_type_id === roomTypeId);
    if (existing) {
      // Update existing count
      setRoomCounts(prev => prev.map(rc => 
        rc.room_type_id === roomTypeId 
          ? { ...rc, count: rc.count + 1 }
          : rc
      ));
    } else {
      // Add new room type
      setRoomCounts(prev => [...prev, {
        room_type_id: roomTypeId,
        count: 1,
        icon_id: roomType.default_icon_id || '',
        room_type_name: roomType.name,
        room_type_display_name: roomType.display_name,
        is_manual: roomType.is_manual || false
      }]);
    }
  };

  const removeRoom = (roomTypeId: string) => {
    setRoomCounts(prev => {
      const updated = prev.map(rc => 
        rc.room_type_id === roomTypeId && rc.count > 0
          ? { ...rc, count: rc.count - 1 }
          : rc
      ).filter(rc => rc.count > 0);
      return updated;
    });
  };

  const updateRoomIcon = (roomTypeId: string, iconId: string) => {
    setRoomCounts(prev => prev.map(rc => 
      rc.room_type_id === roomTypeId 
        ? { ...rc, icon_id: iconId }
        : rc
    ));
  };

  const updateRoomCount = (roomTypeId: string, count: number) => {
    if (count <= 0) {
      setRoomCounts(prev => prev.filter(rc => rc.room_type_id !== roomTypeId));
    } else {
      const existing = roomCounts.find(rc => rc.room_type_id === roomTypeId);
      if (existing) {
        setRoomCounts(prev => prev.map(rc => 
          rc.room_type_id === roomTypeId 
            ? { ...rc, count }
            : rc
        ));
      } else {
        const roomType = roomTypes.find(rt => rt.id === roomTypeId);
        if (roomType) {
          setRoomCounts(prev => [...prev, {
            room_type_id: roomTypeId,
            count,
            icon_id: roomType.default_icon_id || '',
            room_type_name: roomType.name,
            room_type_display_name: roomType.display_name,
            is_manual: roomType.is_manual || false
          }]);
        }
      }
    }
  };

  const addManualRoom = async (name: string, displayName: string) => {
    try {
      console.log('Creating manual room type in database:', name, displayName);
      
      // Create new room type in database
      const { data: newRoomType, error } = await supabase
        .from('room_types')
        .insert({
          name,
          display_name: displayName,
          icon_category: 'room',
          default_icon_id: null,
          sort_order: 999,
          is_manual: true,
          is_active: true
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating manual room type:', error);
        throw error;
      }

      console.log('Manual room type created successfully:', newRoomType);

      // Add to room counts immediately with correct display_name
      const newRoomCount = {
        room_type_id: newRoomType.id,
        count: 1,
        icon_id: '',
        room_type_name: newRoomType.name,
        room_type_display_name: newRoomType.display_name,
        is_manual: true
      };

      setRoomCounts(prev => {
        // Check if this room type already exists in the state
        const existing = prev.find(rc => rc.room_type_id === newRoomType.id);
        if (existing) {
          return prev.map(rc => 
            rc.room_type_id === newRoomType.id 
              ? { ...rc, count: rc.count + 1, room_type_display_name: newRoomType.display_name }
              : rc
          );
        } else {
          console.log('Adding new manual room to state:', newRoomCount);
          return [...prev, newRoomCount];
        }
      });

      return newRoomType;
    } catch (error) {
      console.error('Failed to add manual room:', error);
      throw error;
    }
  };

  return {
    addRoom,
    removeRoom,
    updateRoomIcon,
    updateRoomCount,
    addManualRoom
  };
};
