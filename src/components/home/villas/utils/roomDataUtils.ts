
export const determineRoomCountsToUse = (villaId?: string, villaRoomCounts?: any[], dynamicRooms?: any[]) => {
  console.log('determineRoomCountsToUse called with:', {
    villaId,
    villaRoomCountsLength: villaRoomCounts?.length,
    dynamicRoomsLength: dynamicRooms?.length
  });

  // Always prioritize villa_room_counts from database if available
  if (villaId && villaRoomCounts && villaRoomCounts.length > 0) {
    console.log('Using villa_room_counts from database');
    return villaRoomCounts.map(vrc => ({
      room_type_id: vrc.room_type_id,
      count: vrc.count,
      icon_id: vrc.icon_id,
      room_type_name: vrc.room_types?.name || 'unknown',
      room_type_display_name: vrc.room_types?.display_name || vrc.display_name || 'Unknown',
      display_name: vrc.room_types?.display_name || vrc.display_name || 'Oda',
      property_icons: vrc.property_icons,
      icon_svg: vrc.property_icons?.icon_svg || vrc.icon_svg,
      is_manual: vrc.room_types?.is_manual || false
    }));
  }

  // Fallback to dynamicRooms prop if provided
  if (dynamicRooms && dynamicRooms.length > 0) {
    console.log('Using dynamicRooms prop as fallback');
    return dynamicRooms.map(room => ({
      ...room,
      display_name: room.display_name || room.room_types?.display_name || 'Oda'
    }));
  }

  console.log('No room data available, returning empty array');
  return [];
};

export const filterOtherRoomCounts = (roomCountsToUse: any[]) => {
  const basicRoomTypes = ['bedroom', 'bathroom', 'living_room', 'hall'];
  
  return roomCountsToUse.filter(room => 
    !basicRoomTypes.includes(room.room_type_name) && room.count > 0
  );
};

export const getBasicRoomCount = (roomCountsToUse: any[], roomTypeName: string) => {
  const roomData = roomCountsToUse.find(room => room.room_type_name === roomTypeName);
  return roomData?.count || 0;
};
