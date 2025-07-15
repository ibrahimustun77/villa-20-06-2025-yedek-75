
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../../ui/dialog';
import { Button } from '../../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Label } from '../../ui/label';
import { fetchVillaTypes } from '@/services/villaTypeService';

interface VillaAddModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (villaData: { type: string, x: number, y: number }) => void;
}

const VillaAddModal: React.FC<VillaAddModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [selectedType, setSelectedType] = useState<string>('');

  // Fetch villa types from database
  const { data: villaTypes = [] } = useQuery({
    queryKey: ['villaTypes'],
    queryFn: fetchVillaTypes
  });

  // Set default type when villa types are loaded
  React.useEffect(() => {
    if (villaTypes.length > 0 && !selectedType) {
      setSelectedType(villaTypes[0].id);
    }
  }, [villaTypes, selectedType]);

  const handleSubmit = () => {
    if (!selectedType) return;
    
    // Default coordinates to center of map
    onAdd({
      type: selectedType,
      x: 50,
      y: 50
    });
    onClose();
    // Reset form
    setSelectedType(villaTypes[0]?.id || '');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Yeni Villa Ekle</DialogTitle>
          <DialogDescription>
            Haritaya yeni bir villa eklemek için villa tipini seçin.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="villa-type">Villa Tipi</Label>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger>
                <SelectValue placeholder="Villa tipi seçin" />
              </SelectTrigger>
              <SelectContent>
                {villaTypes.map((type) => (
                  <SelectItem key={type.id} value={type.id}>
                    {type.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              Villa harita üzerinde merkezi konuma (50, 50) yerleştirilecektir. 
              Konumunu harita önizlemesinde sürükleyerek değiştirebilirsiniz.
            </p>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={onClose}>
              İptal
            </Button>
            <Button 
              onClick={handleSubmit} 
              className="bg-therma hover:bg-therma-dark"
              disabled={!selectedType}
            >
              Villa Ekle
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VillaAddModal;
