
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';
import { updateVilla } from '@/services/villa/villaUpdater';
import { createVilla } from '@/services/villa/villaCreator';
import { Villa } from '@/services/types';
import { useAuth } from '@/contexts/AuthContext';
import { syncVillaRoomCounts } from '../services/villaRoomCountsService';

interface UseVillaFormSubmitProps {
  editingVilla?: Villa;
  onClose: () => void;
}

export const useVillaFormSubmit = ({ editingVilla, onClose }: UseVillaFormSubmitProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isAuthenticated } = useAuth();

  const handleSubmit = async (formData: any) => {
    if (!isAuthenticated) {
      toast({
        title: "Hata",
        description: "Bu işlem için giriş yapmanız gerekiyor.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      console.log('Villa form submit with data:', formData);
      console.log('Dynamic rooms to save:', formData.dynamic_rooms);

      let result;
      if (editingVilla?.id) {
        // Update existing villa
        result = await updateVilla(editingVilla.id, formData);
        
        // Sync dynamic room counts after villa update
        if (formData.dynamic_rooms && formData.dynamic_rooms.length > 0) {
          console.log('Syncing room counts for existing villa:', editingVilla.id);
          await syncVillaRoomCounts(editingVilla.id, formData.dynamic_rooms);
        }
      } else {
        // Create new villa
        result = await createVilla(formData);
        
        // Sync dynamic room counts after villa creation
        if (result && formData.dynamic_rooms && formData.dynamic_rooms.length > 0) {
          console.log('Syncing room counts for new villa:', result.id);
          await syncVillaRoomCounts(result.id, formData.dynamic_rooms);
        }
      }

      if (result) {
        toast({
          title: "Başarılı",
          description: editingVilla ? "Villa başarıyla güncellendi" : "Villa başarıyla oluşturuldu"
        });
        onClose();
      }
    } catch (error: any) {
      console.error('Villa submit error:', error);
      toast({
        title: "Hata",
        description: `Villa kaydedilirken hata oluştu: ${error.message}`,
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isSubmitting,
    isAuthenticated,
    handleSubmit
  };
};
