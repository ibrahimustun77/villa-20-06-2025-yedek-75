
import React from 'react';
import VillaPropertyItem from './VillaPropertyItem';
import { getDefaultRoomIcon } from './utils/iconUtils';
import { sanitizeSVG } from '@/utils/security';

interface DynamicRoomsListProps {
  otherRoomCounts: any[];
}

const DynamicRoomsList: React.FC<DynamicRoomsListProps> = ({ otherRoomCounts }) => {
  return (
    <>
      {otherRoomCounts.map((roomCount, index) => {
        // Prioritize display_name from multiple sources
        const displayName = roomCount.display_name || 
                           roomCount.room_types?.display_name || 
                           roomCount.room_type_display_name ||
                           'Oda';

        console.log('DynamicRoomsList - Room count data:', {
          roomCount,
          displayName,
          roomTypesDisplayName: roomCount.room_types?.display_name,
          directDisplayName: roomCount.display_name
        });

        return (
          <VillaPropertyItem
            key={roomCount.id || `dynamic-room-${index}`}
            icon={
              roomCount.property_icons?.icon_svg || roomCount.icon_svg ? (
                <div 
                  className="w-4 h-4 md:w-5 md:h-5 text-therma mr-2 md:mr-3"
                  dangerouslySetInnerHTML={{ __html: sanitizeSVG(roomCount.property_icons?.icon_svg || roomCount.icon_svg) }}
                />
              ) : (
                getDefaultRoomIcon()
              )
            }
            label={displayName}
            value={roomCount.count}
          />
        );
      })}
    </>
  );
};

export default DynamicRoomsList;
