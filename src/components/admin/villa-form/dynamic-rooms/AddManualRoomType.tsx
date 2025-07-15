
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';

interface AddManualRoomTypeProps {
  onAddManualRoom: (name: string, displayName: string) => Promise<any>;
}

const AddManualRoomType: React.FC<AddManualRoomTypeProps> = ({
  onAddManualRoom
}) => {
  const [manualRoomName, setManualRoomName] = useState('');
  const [manualRoomDisplayName, setManualRoomDisplayName] = useState('');
  const [isAddingManualRoom, setIsAddingManualRoom] = useState(false);

  const handleAddManualRoom = async () => {
    if (!manualRoomName.trim() || !manualRoomDisplayName.trim()) {
      toast.error('Lütfen oda adı ve görünen adı doldurun');
      return;
    }

    setIsAddingManualRoom(true);
    try {
      await onAddManualRoom(manualRoomName.trim(), manualRoomDisplayName.trim());
      setManualRoomName('');
      setManualRoomDisplayName('');
      toast.success('Manuel oda tipi başarıyla eklendi');
    } catch (error) {
      console.error('Error adding manual room:', error);
      toast.error('Manuel oda tipi eklenirken hata oluştu');
    } finally {
      setIsAddingManualRoom(false);
    }
  };

  return (
    <div className="border-t pt-4 space-y-4">
      <Label className="text-sm font-medium">Manuel Oda Tipi Ekle</Label>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="manual-room-name">Oda Adı (İngilizce)</Label>
          <Input
            id="manual-room-name"
            value={manualRoomName}
            onChange={(e) => setManualRoomName(e.target.value)}
            placeholder="örn: study_room"
            disabled={isAddingManualRoom}
          />
        </div>
        <div>
          <Label htmlFor="manual-room-display">Görünen Ad (Türkçe)</Label>
          <Input
            id="manual-room-display"
            value={manualRoomDisplayName}
            onChange={(e) => setManualRoomDisplayName(e.target.value)}
            placeholder="örn: Çalışma Odası"
            disabled={isAddingManualRoom}
          />
        </div>
      </div>
      <Button 
        onClick={handleAddManualRoom}
        disabled={!manualRoomName.trim() || !manualRoomDisplayName.trim() || isAddingManualRoom}
        className="w-full"
      >
        <Plus className="h-4 w-4 mr-2" />
        {isAddingManualRoom ? 'Ekleniyor...' : 'Manuel Oda Tipi Ekle'}
      </Button>
    </div>
  );
};

export default AddManualRoomType;
