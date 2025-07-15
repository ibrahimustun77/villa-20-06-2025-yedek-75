import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useDynamicRooms } from './hooks/useDynamicRooms';
import AddExistingRoomType from './dynamic-rooms/AddExistingRoomType';
import AddManualRoomType from './dynamic-rooms/AddManualRoomType';
import ExistingRoomsList from './dynamic-rooms/ExistingRoomsList';

interface VillaFormDynamicRoomsProps {
  villaId?: string;
  onChange: (roomCounts: any[]) => void;
}

const VillaFormDynamicRooms: React.FC<VillaFormDynamicRoomsProps> = ({
  villaId,
  onChange
}) => {
  const {
    roomTypes,
    roomCounts,
    loadingRoomTypes,
    addRoom,
    removeRoom,
    updateRoomIcon,
    updateRoomCount,
    addManualRoom
  } = useDynamicRooms(villaId);

  // Parent'ı room counts ile güncelle
  React.useEffect(() => {
    onChange(roomCounts);
  }, [roomCounts, onChange]);

  if (loadingRoomTypes) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Dinamik Oda Detayları</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-sm text-gray-500">Oda tipleri yükleniyor...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Dinamik Oda Detayları</span>
          <Badge variant="outline">
            {roomCounts.length} oda tipi
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Existing room counts */}
        {roomCounts.length > 0 && (
          <div>
            <h4 className="font-medium mb-4">Mevcut Oda Tipleri</h4>
            <ExistingRoomsList
              roomCounts={roomCounts}
              roomTypes={roomTypes}
              onUpdateRoomCount={updateRoomCount}
              onAddRoom={addRoom}
              onRemoveRoom={removeRoom}
              onUpdateRoomIcon={updateRoomIcon}
            />
          </div>
        )}

        {/* Add existing room type */}
        <AddExistingRoomType
          roomTypes={roomTypes}
          existingRoomCounts={roomCounts}
          onAddRoom={addRoom}
        />

        {/* Add manual room type */}
        <AddManualRoomType
          onAddManualRoom={addManualRoom}
        />
      </CardContent>
    </Card>
  );
};

export default VillaFormDynamicRooms;
