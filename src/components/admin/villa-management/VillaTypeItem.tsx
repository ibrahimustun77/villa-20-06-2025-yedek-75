
import React from 'react';
import { Button } from '@/components/ui/button';
import { Edit, Trash2 } from 'lucide-react';
import { VillaType } from '@/services/types';

interface VillaTypeItemProps {
  villaType: VillaType;
  onEdit: (villaType: VillaType) => void;
  onDelete: (villaType: VillaType) => void;
}

const VillaTypeItem: React.FC<VillaTypeItemProps> = ({ villaType, onEdit, onDelete }) => {
  return (
    <div className="border rounded-lg p-4">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-lg">{villaType.name}</h3>
        <div className="flex gap-1">
          <Button size="icon" variant="outline" onClick={() => onEdit(villaType)}>
            <Edit className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="outline" onClick={() => onDelete(villaType)}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <p className="text-gray-600 mt-2">
        {villaType.description || 'Açıklama yok'}
      </p>
    </div>
  );
};

export default VillaTypeItem;
