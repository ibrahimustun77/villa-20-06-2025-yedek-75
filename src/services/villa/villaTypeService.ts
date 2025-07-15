
import { supabase } from '../../integrations/supabase/client';
import { VillaType } from '../types';
import { toast } from '@/hooks/use-toast';

export const fetchVillaTypes = async (): Promise<VillaType[]> => {
  try {
    console.log('Fetching villa types from Supabase...');
    
    // Fetch data ordered by sort_order, then by name as fallback
    const { data, error } = await supabase
      .from('villa_types')
      .select('*')
      .order('sort_order', { ascending: true })
      .order('name', { ascending: true });

    if (error) {
      console.error('Error fetching villa types:', error);
      throw error;
    }
    
    console.log('Villa types fetched successfully:', data);
    return data || [];
  } catch (error: any) {
    console.error('Error in fetchVillaTypes:', error);
    toast({
      title: "Hata",
      description: `Villa tipleri yüklenirken hata oluştu: ${error.message}`,
      variant: "destructive"
    });
    return [];
  }
};

export const updateVillaTypeOrder = async (id: string, sortOrder: number): Promise<boolean> => {
  try {
    console.log('Updating villa type order:', id, sortOrder);
    
    const { error } = await supabase
      .from('villa_types')
      .update({ sort_order: sortOrder })
      .eq('id', id);

    if (error) throw error;
    
    console.log('Villa type order updated successfully');
    return true;
  } catch (error: any) {
    console.error('Error updating villa type order:', error);
    toast({
      title: "Hata",
      description: `Villa tipi sıralaması güncellenirken hata oluştu: ${error.message}`,
      variant: "destructive"
    });
    return false;
  }
};
