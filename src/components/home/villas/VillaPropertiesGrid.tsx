
import React from 'react';
import { useVillaRoomData } from './hooks/useVillaRoomData';
import BasicRoomsList from './BasicRoomsList';
import DynamicRoomsList from './DynamicRoomsList';

interface VillaPropertiesGridProps {
  bedrooms: number;
  bathrooms: number;
  livingRooms: number;
  halls: number;
  dynamicRooms?: any[];
  villaId?: string;
}

const VillaPropertiesGrid: React.FC<VillaPropertiesGridProps> = ({
  bedrooms,
  bathrooms,
  livingRooms,
  halls,
  dynamicRooms,
  villaId
}) => {
  const { roomCountsToUse, otherRoomCounts } = useVillaRoomData(villaId, dynamicRooms);

  console.log('VillaPropertiesGrid - villaId:', villaId);
  console.log('VillaPropertiesGrid - roomCountsToUse:', roomCountsToUse);
  console.log('VillaPropertiesGrid - otherRoomCounts:', otherRoomCounts);

  return (
    <div className="mb-6 md:mb-8">
      <div className="grid grid-cols-2 gap-3 md:gap-4">
        {/* Basic room types (bedroom, bathroom, living room, hall) */}
        <BasicRoomsList
          roomCountsToUse={roomCountsToUse}
          bedrooms={bedrooms}
          bathrooms={bathrooms}
          livingRooms={livingRooms}
          halls={halls}
        />
        
        {/* Dynamic/other room types */}
        <DynamicRoomsList otherRoomCounts={otherRoomCounts} />
      </div>
    </div>
  );
};

export default VillaPropertiesGrid;
