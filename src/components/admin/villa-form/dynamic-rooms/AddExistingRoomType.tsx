
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Plus } from 'lucide-react';

interface AddExistingRoomTypeProps {
  roomTypes: any[];
  existingRoomCounts: any[];
  onAddRoom: (roomTypeId: string) => void;
}

const AddExistingRoomType: React.FC<AddExistingRoomTypeProps> = ({
  roomTypes,
  existingRoomCounts,
  onAddRoom
}) => {
  const [selectedRoomType, setSelectedRoomType] = useState<string>('');

  // Get available room types (not already added)
  const availableRoomTypes = roomTypes.filter(rt => 
    !existingRoomCounts.some(rc => rc.room_type_id === rt.id)
  );

  const handleAddExistingRoom = () => {
    if (selectedRoomType) {
      onAddRoom(selectedRoomType);
      setSelectedRoomType('');
    }
  };

  return (
    <div className="border-t pt-4 space-y-4">
      <Label className="text-sm font-medium">Mevcut Oda Tipi Ekle</Label>
      <div className="flex items-end gap-4">
        <div className="flex-1">
          <Select value={selectedRoomType} onValueChange={setSelectedRoomType}>
            <SelectTrigger>
              <SelectValue placeholder="Oda tipi seçin" />
            </SelectTrigger>
            <SelectContent>
              {availableRoomTypes.map((roomType) => (
                <SelectItem key={roomType.id} value={roomType.id}>
                  {roomType.display_name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button 
          onClick={handleAddExistingRoom}
          disabled={!selectedRoomType}
        >
          <Plus className="h-4 w-4 mr-2" />
          Ekle
        </Button>
      </div>
    </div>
  );
};

export default AddExistingRoomType;
