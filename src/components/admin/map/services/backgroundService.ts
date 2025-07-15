
import { supabase } from '../../../../integrations/supabase/client';

// Load background image from Supabase
export const loadBackgroundFromSupabase = async (): Promise<string | null> => {
  try {
    const { data, error } = await supabase
      .from('map_settings')
      .select('background_image')
      .limit(1)
      .maybeSingle();

    if (error) {
      console.error('Supabase arka plan yükleme hatası:', error);
      return null;
    }
    
    return data?.background_image || null;
  } catch (error) {
    console.error('Arka plan yükleme hatası:', error);
    return null;
  }
};

// Save background image to Supabase
export const saveBackgroundToSupabase = async (backgroundImage: string | null): Promise<boolean> => {
  try {
    // Önce mevcut ayarları kontrol ediyoruz
    const { data, error: selectError } = await supabase
      .from('map_settings')
      .select('id')
      .limit(1);
    
    if (selectError) {
      console.error('Ayarları kontrol hatası:', selectError);
      return false;
    }
    
    if (data && data.length > 0) {
      // Mevcut ayarı güncelle
      const { error: updateError } = await supabase
        .from('map_settings')
        .update({ background_image: backgroundImage })
        .eq('id', data[0].id);
      
      if (updateError) {
        console.error('Arka plan güncelleme hatası:', updateError);
        return false;
      }
    } else {
      // Yeni ayar ekle
      const { error: insertError } = await supabase
        .from('map_settings')
        .insert({ background_image: backgroundImage });
      
      if (insertError) {
        console.error('Arka plan ekleme hatası:', insertError);
        return false;
      }
    }
    
    return true;
  } catch (error) {
    console.error('Arka plan kaydetme hatası:', error);
    return false;
  }
};
