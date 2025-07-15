
import React from 'react';
import { Button } from '@/components/ui/button';

interface ConfirmDeleteDialogProps {
  itemType: 'villa' | 'villa-type';
  itemName: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmDeleteDialog: React.FC<ConfirmDeleteDialogProps> = ({ 
  itemType, 
  itemName, 
  onConfirm, 
  onCancel 
}) => {
  return (
    <div className="space-y-4">
      <p>
        {itemType === 'villa'
          ? `"${itemName}" villasını silmek istediğinizden emin misiniz?`
          : `"${itemName}" villa tipini silmek istediğinizden emin misiniz?`}
      </p>
      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={onCancel}>
          İptal
        </Button>
        <Button variant="destructive" onClick={onConfirm}>
          Sil
        </Button>
      </div>
    </div>
  );
};

export default ConfirmDeleteDialog;
