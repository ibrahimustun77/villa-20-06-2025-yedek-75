
import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Villa, VillaType } from '@/services/types';

export type DialogType = 'create-villa' | 'edit-villa' | 'create-villa-type' | 'edit-villa-type' | 'delete-villa' | 'delete-villa-type';

export const useVillaManagement = () => {
  const [activeTab, setActiveTab] = useState('villas');
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState<DialogType>('create-villa');
  const [selectedItem, setSelectedItem] = useState<Villa | VillaType | null>(null);
  
  const queryClient = useQueryClient();
  
  const handleAddVilla = () => {
    setDialogType('create-villa');
    setSelectedItem(null);
    setIsDialogOpen(true);
  };
  
  const handleEditVilla = (villa: Villa) => {
    setDialogType('edit-villa');
    setSelectedItem(villa);
    setIsDialogOpen(true);
  };
  
  const handleDeleteVilla = (villa: Villa) => {
    setDialogType('delete-villa');
    setSelectedItem(villa);
    setIsDialogOpen(true);
  };

  const handleCopyVilla = async (villa: Villa) => {
    try {
      // Dynamic import to avoid circular dependencies
      const { copyVilla } = await import('@/services/villa/villaCopier');
      const success = await copyVilla(villa);
      if (success) {
        queryClient.invalidateQueries({ queryKey: ['villas'] });
      }
    } catch (error) {
      console.error('Error copying villa:', error);
    }
  };
  
  const handleAddVillaType = () => {
    setDialogType('create-villa-type');
    setSelectedItem(null);
    setIsDialogOpen(true);
  };
  
  const handleEditVillaType = (villaType: VillaType) => {
    setDialogType('edit-villa-type');
    setSelectedItem(villaType);
    setIsDialogOpen(true);
  };
  
  const handleDeleteVillaType = (villaType: VillaType) => {
    setDialogType('delete-villa-type');
    setSelectedItem(villaType);
    setIsDialogOpen(true);
  };

  const handleFormComplete = async () => {
    // If we're deleting an item, perform the actual deletion
    if (dialogType === 'delete-villa' && selectedItem) {
      const { deleteVilla } = await import('@/services/villaService');
      const success = await deleteVilla(selectedItem.id);
      if (!success) return; // Don't close dialog if deletion failed
    } else if (dialogType === 'delete-villa-type' && selectedItem) {
      // Add villa type deletion logic here if needed
      console.log('Villa type deletion not implemented yet');
    }
    
    // Invalidate queries to refetch data after form completion
    queryClient.invalidateQueries({ queryKey: ['villas'] });
    queryClient.invalidateQueries({ queryKey: ['villaTypes'] });
    setIsDialogOpen(false);
    setSelectedItem(null);
  };
  
  return {
    activeTab,
    searchQuery,
    isDialogOpen,
    dialogType,
    selectedItem,
    setActiveTab,
    setSearchQuery,
    setIsDialogOpen,
    handleAddVilla,
    handleEditVilla,
    handleDeleteVilla,
    handleCopyVilla,
    handleAddVillaType,
    handleEditVillaType,
    handleDeleteVillaType,
    handleFormComplete
  };
};
