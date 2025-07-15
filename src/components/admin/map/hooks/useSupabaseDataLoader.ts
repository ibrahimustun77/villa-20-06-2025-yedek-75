
import { useState } from 'react';
import { Villa, Road } from '../types/mapTypes';
import { 
  loadVillasFromSupabase,
  loadRoadsFromSupabase,
  loadBackgroundFromSupabase
} from '../services/mapService';

export const useSupabaseDataLoader = () => {
  const [isLoading, setIsLoading] = useState(false);

  const loadSupabaseData = async () => {
    setIsLoading(true);
    
    try {
      const [supabaseVillas, supabaseRoads, supabaseBackground] = await Promise.all([
        loadVillasFromSupabase(),
        loadRoadsFromSupabase(),
        loadBackgroundFromSupabase()
      ]);

      return {
        villas: supabaseVillas,
        roads: supabaseRoads,
        background: supabaseBackground,
        hasData: Boolean(supabaseVillas?.length || supabaseRoads?.length || supabaseBackground)
      };
    } catch (error) {
      console.error('Supabase data loading error:', error);
      return {
        villas: null,
        roads: null,
        background: null,
        hasData: false
      };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    loadSupabaseData
  };
};
