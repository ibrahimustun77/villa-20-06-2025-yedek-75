
import { Villa, Road } from '../types/mapTypes';
import { loadVillasFromSupabase, saveVillasToSupabase } from './villaService';
import { loadRoadsFromSupabase, saveRoadsToSupabase } from './roadService';
import { loadBackgroundFromSupabase, saveBackgroundToSupabase } from './backgroundService';

// Re-export individual services for backward compatibility
export { loadVillasFromSupabase, saveVillasToSupabase } from './villaService';
export { loadRoadsFromSupabase, saveRoadsToSupabase } from './roadService';
export { loadBackgroundFromSupabase, saveBackgroundToSupabase } from './backgroundService';

// Save all data to Supabase
export const saveDataToSupabase = async (
  villas: Villa[],
  roads: Road[],
  backgroundImage: string | null
): Promise<boolean> => {
  try {
    const villasSuccess = await saveVillasToSupabase(villas);
    const roadsSuccess = await saveRoadsToSupabase(roads);
    const backgroundSuccess = await saveBackgroundToSupabase(backgroundImage);
    
    return villasSuccess && roadsSuccess && backgroundSuccess;
  } catch (error) {
    console.error('Veri kaydetme hatası:', error);
    return false;
  }
};
