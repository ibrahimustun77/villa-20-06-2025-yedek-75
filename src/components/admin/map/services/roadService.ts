
import { supabase } from '../../../../integrations/supabase/client';
import { Road } from '../types/mapTypes';

// Load roads from Supabase
export const loadRoadsFromSupabase = async (): Promise<Road[] | null> => {
  try {
    const { data, error } = await supabase
      .from('roads')
      .select('*')
      .order('id');

    if (error) {
      console.error('Supabase road yükleme hatası:', error);
      return null;
    }

    // Supabase'den gelen verileri Road tipine dönüştür
    // UUID string tipinden number tipine dönüşüm yapıyoruz
    const roads: Road[] = data.map((item, index) => ({
      id: index + 1, // Generate sequential numeric IDs
      orientation: item.orientation as 'horizontal' | 'vertical',
      position: item.position,
      start: item.start_pos,
      end: item.end_pos,
      thickness: item.thickness
    }));
    
    return roads;
  } catch (error) {
    console.error('Road yükleme hatası:', error);
    return null;
  }
};

// Save road data to Supabase
export const saveRoadsToSupabase = async (roads: Road[]): Promise<boolean> => {
  try {
    // Önce tüm mevcut yolları siliyoruz
    const { error: deleteError } = await supabase
      .from('roads')
      .delete()
      .not('id', 'is', null); // Tüm kayıtları sil
    
    if (deleteError) {
      console.error('Yol silme hatası:', deleteError);
      return false;
    }
    
    // Yeni yolları ekliyoruz
    if (roads.length > 0) {
      const roadsToInsert = roads.map(road => ({
        orientation: road.orientation,
        position: road.position,
        start_pos: road.start,
        end_pos: road.end,
        thickness: road.thickness
      }));
      
      const { error: insertError } = await supabase
        .from('roads')
        .insert(roadsToInsert);
      
      if (insertError) {
        console.error('Yol ekleme hatası:', insertError);
        return false;
      }
    }
    
    return true;
  } catch (error) {
    console.error('Yol kaydetme hatası:', error);
    return false;
  }
};
