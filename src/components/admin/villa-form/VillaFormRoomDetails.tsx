
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface RoomDetails {
  bedrooms: number | null;
  bathrooms: number | null;
  living_rooms: number | null;
  halls: number | null;
  bedroom_icon_id?: string;
  bathroom_icon_id?: string;
  living_room_icon_id?: string;
  hall_icon_id?: string;
}

interface VillaFormRoomDetailsProps {
  roomDetails: RoomDetails;
  onRoomDetailsChange: (details: Partial<RoomDetails>) => void;
}

const VillaFormRoomDetails: React.FC<VillaFormRoomDetailsProps> = ({
  roomDetails,
  onRoomDetailsChange
}) => {
  const handleNumberChange = (field: keyof RoomDetails, value: string) => {
    const numValue = value === '' ? null : parseInt(value, 10);
    onRoomDetailsChange({ [field]: numValue });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Temel Oda Detayları</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center py-8 text-gray-500">
          <p className="text-sm mb-4">
            Temel oda tipleri sıfırlandı. Dinamik oda sistemi kullanın.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Yatak Odası */}
            <div>
              <Label htmlFor="bedrooms">Yatak Odası Sayısı</Label>
              <Input
                id="bedrooms"
                type="number"
                min="0"
                value="0"
                disabled
                placeholder="0"
              />
            </div>

            {/* Banyo */}
            <div>
              <Label htmlFor="bathrooms">Banyo Sayısı</Label>
              <Input
                id="bathrooms"
                type="number"
                min="0"
                value="0"
                disabled
                placeholder="0"
              />
            </div>

            {/* Oturma Odası */}
            <div>
              <Label htmlFor="living-rooms">Oturma Odası Sayısı</Label>
              <Input
                id="living-rooms"
                type="number"
                min="0"
                value="0"
                disabled
                placeholder="0"
              />
            </div>

            {/* Salon */}
            <div>
              <Label htmlFor="halls">Salon Sayısı</Label>
              <Input
                id="halls"
                type="number"
                min="0"
                value="0"
                disabled
                placeholder="0"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VillaFormRoomDetails;
