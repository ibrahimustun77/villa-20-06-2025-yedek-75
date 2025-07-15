
// Re-export from the new location for backward compatibility
export { fetchVillaTypes, updateVillaTypeOrder } from './villa/villaTypeService';
export type { VillaType } from './types';

// Keep existing functions for backward compatibility
import { supabase } from '../integrations/supabase/client';
import { VillaType } from './types';
import { toast } from '@/hooks/use-toast';

export const createVillaType = async (villaType: {
  name: string;
  description?: string;
  color?: string;
  sort_order?: number;
}): Promise<VillaType | null> => {
  try {
    const { data, error } = await supabase
      .from('villa_types')
      .insert(villaType)
      .select()
      .single();

    if (error) throw error;
    
    toast({
      title: "Başarılı",
      description: 'Villa tipi başarıyla oluşturuldu'
    });
    
    return data;
  } catch (error: any) {
    console.error('Error creating villa type:', error);
    toast({
      title: "Hata",
      description: `Villa tipi oluşturulurken hata oluştu: ${error.message}`,
      variant: "destructive"
    });
    return null;
  }
};

export const updateVillaType = async (id: string, villaType: {
  name?: string;
  description?: string;
  color?: string;
  sort_order?: number;
}): Promise<VillaType | null> => {
  try {
    const { data, error } = await supabase
      .from('villa_types')
      .update(villaType)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    
    toast({
      title: "Başarılı",
      description: 'Villa tipi başarıyla güncellendi'
    });
    
    return data;
  } catch (error: any) {
    console.error('Error updating villa type:', error);
    toast({
      title: "Hata",
      description: `Villa tipi güncellenirken hata oluştu: ${error.message}`,
      variant: "destructive"
    });
    return null;
  }
};

export const deleteVillaType = async (id: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('villa_types')
      .delete()
      .eq('id', id);

    if (error) throw error;
    
    toast({
      title: "Başarılı",
      description: 'Villa tipi başarıyla silindi'
    });
    
    return true;
  } catch (error: any) {
    console.error('Error deleting villa type:', error);
    toast({
      title: "Hata",
      description: `Villa tipi silinirken hata oluştu: ${error.message}`,
      variant: "destructive"
    });
    return false;
  }
};
