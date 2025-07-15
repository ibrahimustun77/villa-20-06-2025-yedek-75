
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Villa, VillaType } from '@/services/types';
import VillaForm from '../VillaForm';
import VillaTypeForm from '../VillaTypeForm';
import ConfirmDeleteDialog from './ConfirmDeleteDialog';
import { DialogType } from './useVillaManagement';

interface VillaDialogManagerProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  dialogType: DialogType;
  selectedItem: Villa | VillaType | null;
  onFormComplete: () => void;
}

const VillaDialogManager: React.FC<VillaDialogManagerProps> = ({
  isOpen,
  setIsOpen,
  dialogType,
  selectedItem,
  onFormComplete
}) => {
  const [submittingVilla, setSubmittingVilla] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleVillaSubmit = async (data: any) => {
    setSubmittingVilla(true);
    try {
      // Handle villa submission logic here
      await onFormComplete();
    } finally {
      setSubmittingVilla(false);
    }
  };

  const renderDialogContent = () => {
    switch (dialogType) {
      case 'create-villa':
        return (
          <VillaForm
            onClose={handleClose}
            isSubmitting={submittingVilla}
            onSubmit={handleVillaSubmit}
          />
        );
      
      case 'edit-villa':
        return (
          <VillaForm
            editingVilla={selectedItem as Villa}
            onClose={handleClose}
            isSubmitting={submittingVilla}
            onSubmit={handleVillaSubmit}
          />
        );
      
      case 'create-villa-type':
        return (
          <VillaTypeForm
            onComplete={onFormComplete}
          />
        );
      
      case 'edit-villa-type':
        return (
          <VillaTypeForm
            villaType={selectedItem as VillaType}
            onComplete={onFormComplete}
          />
        );
      
      case 'delete-villa':
      case 'delete-villa-type':
        return (
          <ConfirmDeleteDialog
            itemType={dialogType === 'delete-villa' ? 'villa' : 'villa-type'}
            itemName={selectedItem?.name || ''}
            onConfirm={onFormComplete}
            onCancel={handleClose}
          />
        );
      
      default:
        return null;
    }
  };

  const getDialogTitle = () => {
    switch (dialogType) {
      case 'create-villa':
        return 'Yeni Villa Ekle';
      case 'edit-villa':
        return 'Villa Düzenle';
      case 'create-villa-type':
        return 'Yeni Villa Tipi Ekle';
      case 'edit-villa-type':
        return 'Villa Tipi Düzenle';
      case 'delete-villa':
        return 'Villa Sil';
      case 'delete-villa-type':
        return 'Villa Tipi Sil';
      default:
        return '';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>{getDialogTitle()}</DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 overflow-hidden">
          {renderDialogContent()}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VillaDialogManager;
