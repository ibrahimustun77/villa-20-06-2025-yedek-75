
import React from 'react';
import { Button } from '@/components/ui/button';

interface VillaFormActionsProps {
  isEditing: boolean;
  isSubmitting: boolean;
  isAuthenticated: boolean;
  onCancel: () => void;
}

const VillaFormActions: React.FC<VillaFormActionsProps> = ({
  isEditing,
  isSubmitting,
  isAuthenticated,
  onCancel
}) => {
  return (
    <div className="flex justify-end gap-2">
      <Button 
        type="button"
        variant="outline"
        onClick={onCancel}
        className="border-gray-300 hover:bg-gray-100"
      >
        İptal
      </Button>
      <Button 
        type="submit"
        disabled={isSubmitting || !isAuthenticated}
        className="bg-therma hover:bg-therma-dark"
      >
        {isSubmitting ? 'Kaydediliyor...' : isEditing ? 'Güncelle' : 'Oluştur'}
      </Button>
    </div>
  );
};

export default VillaFormActions;
