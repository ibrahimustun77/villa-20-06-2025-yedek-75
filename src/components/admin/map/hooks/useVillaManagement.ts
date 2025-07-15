
import { useState } from 'react';
import { Villa } from '../types/mapTypes';
import { toast } from "../../../../hooks/use-toast";

export const useVillaManagement = (initialVillas: Villa[], initialNextId: number) => {
  const [villas, setVillas] = useState<Villa[]>(initialVillas);
  const [editingVilla, setEditingVilla] = useState<Villa | null>(null);
  const [nextVillaId, setNextVillaId] = useState(initialNextId);

  // Villa CRUD operations
  const addNewVilla = (villaData?: { type: string; x: number; y: number }) => {
    const newVilla: Villa = {
      id: nextVillaId,
      type: villaData?.type || 'type-a',
      x: villaData?.x || 50,
      y: villaData?.y || 50
    };
    setVillas([...villas, newVilla]);
    setNextVillaId(nextVillaId + 1);
    toast({
      title: "Başarılı",
      description: `Villa #${nextVillaId} eklendi`,
      duration: 3000
    });
  };

  const startEditVilla = (villa: Villa) => {
    setEditingVilla({ ...villa });
  };

  const cancelEditVilla = () => {
    setEditingVilla(null);
  };

  const saveVilla = () => {
    if (editingVilla) {
      // Update the villa in the array immediately
      setVillas(prevVillas => 
        prevVillas.map(v => v.id === editingVilla.id ? editingVilla : v)
      );
      
      console.log('Villa saved:', editingVilla);
      
      setEditingVilla(null);
      
      toast({
        title: "Başarılı",
        description: `Villa #${editingVilla.id} güncellendi`,
        duration: 3000
      });
    }
  };

  const deleteVilla = (id: number) => {
    setVillas(villas.filter(villa => villa.id !== id));
    toast({
      title: "Başarılı",
      description: `Villa #${id} silindi`,
      duration: 3000
    });
  };

  return {
    villas,
    editingVilla,
    setEditingVilla,
    setVillas,
    setNextVillaId,
    addNewVilla,
    startEditVilla,
    cancelEditVilla,
    saveVilla,
    deleteVilla
  };
};
