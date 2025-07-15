
import { supabase } from '../../../../integrations/supabase/client';
import { Villa } from '../types/mapTypes';

// Load villas from Supabase
export const loadVillasFromSupabase = async (): Promise<Villa[] | null> => {
  try {
    const { data, error } = await supabase
      .from('map_villas')
      .select('*')
      .order('id');

    if (error) {
      console.error('Supabase villa yükleme hatası:', error);
      return null;
    }

    // Supabase'den gelen verileri Villa tipine dönüştür
    const villas: Villa[] = data.map((item, index) => ({
      id: index + 1, // Generate sequential numeric IDs
      type: item.type, // Keep as string to match database villa type IDs
      x: item.x,
      y: item.y
    }));
    
    return villas;
  } catch (error) {
    console.error('Villa yükleme hatası:', error);
    return null;
  }
};

// Save villa data to Supabase
export const saveVillasToSupabase = async (villas: Villa[]): Promise<boolean> => {
  try {
    // Önce tüm mevcut villaları siliyoruz
    const { error: deleteError } = await supabase
      .from('map_villas')
      .delete()
      .not('id', 'is', null); // Tüm kayıtları sil
    
    if (deleteError) {
      console.error('Villa silme hatası:', deleteError);
      return false;
    }
    
    // Yeni villaları ekliyoruz
    if (villas.length > 0) {
      const villasToInsert = villas.map(villa => ({
        type: villa.type, // Now string type matching database villa type IDs
        x: villa.x,
        y: villa.y
      }));
      
      const { error: insertError } = await supabase
        .from('map_villas')
        .insert(villasToInsert);
      
      if (insertError) {
        console.error('Villa ekleme hatası:', insertError);
        return false;
      }
    }
    
    return true;
  } catch (error) {
    console.error('Villa kaydetme hatası:', error);
    return false;
  }
};
