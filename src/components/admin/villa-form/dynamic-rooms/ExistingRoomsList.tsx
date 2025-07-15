
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Minus, Trash2 } from 'lucide-react';
import IconSelectorEnhanced from '../IconSelectorEnhanced';

interface ExistingRoomsListProps {
  roomCounts: any[];
  roomTypes: any[];
  onUpdateRoomCount: (roomTypeId: string, count: number) => void;
  onAddRoom: (roomTypeId: string) => void;
  onRemoveRoom: (roomTypeId: string) => void;
  onUpdateRoomIcon: (roomTypeId: string, iconId: string) => void;
}

const ExistingRoomsList: React.FC<ExistingRoomsListProps> = ({
  roomCounts,
  roomTypes,
  onUpdateRoomCount,
  onAddRoom,
  onRemoveRoom,
  onUpdateRoomIcon
}) => {
  const getRoomTypeById = (id: string) => {
    return roomTypes.find(rt => rt.id === id);
  };

  return (
    <div className="space-y-4">
      {roomCounts.map((roomCount) => {
        const roomType = getRoomTypeById(roomCount.room_type_id);
        if (!roomType) return null;

        return (
          <div key={roomCount.room_type_id} className="p-4 border rounded-lg space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">{roomType.display_name}</h4>
                <p className="text-sm text-gray-500">
                  {roomType.name} {roomType.is_manual ? '(Manuel)' : ''}
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onUpdateRoomCount(roomCount.room_type_id, 0)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Room count */}
              <div className="space-y-2">
                <Label>Adet</Label>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onRemoveRoom(roomCount.room_type_id)}
                    disabled={roomCount.count <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <Input
                    type="number"
                    min="0"
                    value={roomCount.count}
                    onChange={(e) => onUpdateRoomCount(roomCount.room_type_id, parseInt(e.target.value) || 0)}
                    className="w-20 text-center"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onAddRoom(roomCount.room_type_id)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Icon selector */}
              <IconSelectorEnhanced
                label="İkon"
                value={roomCount.icon_id}
                onValueChange={(iconId) => onUpdateRoomIcon(roomCount.room_type_id, iconId)}
                category={roomType.icon_category}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ExistingRoomsList;
