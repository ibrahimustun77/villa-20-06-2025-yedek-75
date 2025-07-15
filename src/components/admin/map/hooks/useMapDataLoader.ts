
import { useState } from 'react';
import { Villa, Road } from '../types/mapTypes';
import { useSupabaseDataLoader } from './useSupabaseDataLoader';
import { useLocalStorageDataLoader } from './useLocalStorageDataLoader';
import { useDataFallback } from './useDataFallback';

export const useMapDataLoader = () => {
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const { isLoading, loadSupabaseData } = useSupabaseDataLoader();
  const { loadLocalStorageData } = useLocalStorageDataLoader();
  const { getFallbackData } = useDataFallback();

  const loadInitialData = async () => {
    try {
      // Try to load from Supabase first
      const supabaseData = await loadSupabaseData();
      
      if (supabaseData.hasData) {
        console.log("Data loaded from Supabase");
        if (supabaseData.background) {
          setBackgroundImage(supabaseData.background);
        }
        
        return getFallbackData(supabaseData.villas, supabaseData.roads);
      }
      
      // Fallback to localStorage
      const localData = loadLocalStorageData();
      
      if (localData.background) {
        setBackgroundImage(localData.background);
      }
      
      console.log("Data loaded from localStorage or defaults");
      return getFallbackData(localData.villas, localData.roads);
      
    } catch (error) {
      console.error('Data loading error:', error);
      
      // Final fallback to localStorage
      const localData = loadLocalStorageData();
      if (localData.background) {
        setBackgroundImage(localData.background);
      }
      
      return getFallbackData(localData.villas, localData.roads);
    }
  };

  const reloadData = async () => {
    try {
      // Try to load from Supabase first
      const supabaseData = await loadSupabaseData();
      
      if (supabaseData.hasData) {
        console.log("Data reloaded from Supabase");
        if (supabaseData.background) {
          setBackgroundImage(supabaseData.background);
        }
        
        const result = getFallbackData(supabaseData.villas, supabaseData.roads);
        return { ...result, source: 'supabase' };
      }
      
      // Fallback to localStorage if no data in Supabase
      const localData = loadLocalStorageData();
      
      if (localData.background) {
        setBackgroundImage(localData.background);
      }
      
      console.log("Data reloaded from localStorage");
      const result = getFallbackData(localData.villas, localData.roads);
      return { ...result, source: 'localStorage' };
      
    } catch (error) {
      console.error("Data reload error:", error);
      throw error;
    }
  };

  return {
    isLoading,
    backgroundImage,
    setBackgroundImage,
    loadInitialData,
    reloadData
  };
};
