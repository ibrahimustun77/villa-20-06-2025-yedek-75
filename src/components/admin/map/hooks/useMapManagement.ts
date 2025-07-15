
import { useState, useEffect } from 'react';
import { Villa, Road } from '../types/mapTypes';
import { useVillaManagement } from './useVillaManagement';
import { useRoadManagement } from './useRoadManagement';
import { useMapDataLoader } from './useMapDataLoader';
import { useMapStorage } from './useMapStorage';
import { toast } from "../../../../components/ui/use-toast";

export type { Villa, Road } from '../types/mapTypes';

export const useMapManagement = () => {
  const [showPreview, setShowPreview] = useState(true);

  // Initialize hooks
  const dataLoader = useMapDataLoader();
  const storage = useMapStorage();
  
  // Initialize villa and road management hooks with empty arrays
  const villaManager = useVillaManagement([], 16);
  const roadManager = useRoadManagement([], 3);

  // Destructure for convenience
  const { 
    villas, setVillas, setNextVillaId, editingVilla, setEditingVilla,
    addNewVilla, startEditVilla, cancelEditVilla, saveVilla, deleteVilla
  } = villaManager;
  
  const { 
    roads, setRoads, setNextRoadId, editingRoad, setEditingRoad,
    addNewRoad, startEditRoad, cancelEditRoad, saveRoad, deleteRoad
  } = roadManager;

  // Load data on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await dataLoader.loadInitialData();
        setVillas(data.villas);
        setRoads(data.roads);
        setNextVillaId(data.nextVillaId);
        setNextRoadId(data.nextRoadId);
      } catch (error) {
        console.error('Initial data loading failed:', error);
      }
    };

    loadData();
  }, []);

  // Enhanced save changes to storage with better error handling
  const saveChangesToStorage = async () => {
    try {
      await storage.saveChangesToStorage(villas, roads, dataLoader.backgroundImage);
      console.log('Data successfully saved to database');
    } catch (error) {
      console.error('Failed to save to database:', error);
      toast({
        title: "Hata",
        description: "Veritabanına kaydetme başarısız",
        variant: "destructive"
      });
    }
  };

  // Load data from storage
  const loadFromStorage = async () => {
    try {
      const data = await dataLoader.reloadData();
      setVillas(data.villas);
      setRoads(data.roads);
      setNextVillaId(data.nextVillaId);
      setNextRoadId(data.nextRoadId);
      
      if (data.source === 'supabase') {
        toast({
          title: "Başarılı",
          description: "Veriler Supabase'den yüklendi"
        });
      } else {
        toast({
          title: "Başarılı",
          description: "Kaydedilmiş veriler yerel depolama alanından yüklendi"
        });
      }
    } catch (error) {
      toast({
        title: "Uyarı",
        description: "Veritabanından yüklenemedi, yerel depolama alanından yüklendi",
        variant: "destructive"
      });
    }
  };

  const isLoading = dataLoader.isLoading || storage.isLoading;

  return {
    villas,
    roads,
    editingVilla,
    editingRoad,
    showPreview,
    backgroundImage: dataLoader.backgroundImage,
    isLoading,
    setEditingVilla,
    setEditingRoad,
    setShowPreview,
    setBackgroundImage: dataLoader.setBackgroundImage,
    addNewVilla,
    startEditVilla,
    cancelEditVilla,
    saveVilla,
    deleteVilla,
    addNewRoad,
    startEditRoad,
    cancelEditRoad,
    saveRoad,
    deleteRoad,
    saveChangesToStorage,
    loadFromStorage
  };
};
