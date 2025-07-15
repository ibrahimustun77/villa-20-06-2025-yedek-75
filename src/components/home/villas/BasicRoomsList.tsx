
import React from 'react';
import VillaPropertyItem from './VillaPropertyItem';
import { getIconForRoomType } from './utils/iconUtils';
import { getBasicRoomCount } from './utils/roomDataUtils';

interface BasicRoomsListProps {
  roomCountsToUse: any[];
  bedrooms: number;
  bathrooms: number;
  livingRooms: number;
  halls: number;
}

const BasicRoomsList: React.FC<BasicRoomsListProps> = ({
  roomCountsToUse,
  bedrooms,
  bathrooms,
  livingRooms,
  halls
}) => {
  // Use dynamic room counts if available, otherwise fall back to passed props
  const bedroomCount = getBasicRoomCount(roomCountsToUse, 'bedroom') || bedrooms;
  const bathroomCount = getBasicRoomCount(roomCountsToUse, 'bathroom') || bathrooms;
  const livingRoomCount = getBasicRoomCount(roomCountsToUse, 'living_room') || livingRooms;
  const hallCount = getBasicRoomCount(roomCountsToUse, 'hall') || halls;

  // Get custom icons from room counts
  const bedroomIcon = roomCountsToUse.find(r => r.room_type_name === 'bedroom')?.property_icons?.icon_svg;
  const bathroomIcon = roomCountsToUse.find(r => r.room_type_name === 'bathroom')?.property_icons?.icon_svg;
  const livingRoomIcon = roomCountsToUse.find(r => r.room_type_name === 'living_room')?.property_icons?.icon_svg;
  const hallIcon = roomCountsToUse.find(r => r.room_type_name === 'hall')?.property_icons?.icon_svg;

  return (
    <>
      {bedroomCount > 0 && (
        <VillaPropertyItem
          icon={getIconForRoomType('bedroom', bedroomIcon)}
          label="Yatak Odası"
          value={bedroomCount}
        />
      )}
      
      {bathroomCount > 0 && (
        <VillaPropertyItem
          icon={getIconForRoomType('bathroom', bathroomIcon)}
          label="Banyo"
          value={bathroomCount}
        />
      )}
      
      {livingRoomCount > 0 && (
        <VillaPropertyItem
          icon={getIconForRoomType('living_room', livingRoomIcon)}
          label="Oturma Odası"
          value={livingRoomCount}
        />
      )}
      
      {hallCount > 0 && (
        <VillaPropertyItem
          icon={getIconForRoomType('hall', hallIcon)}
          label="Salon"
          value={hallCount}
        />
      )}
    </>
  );
};

export default BasicRoomsList;
