
import { supabase } from '../../integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

export const deleteVilla = async (id: string): Promise<boolean> => {
  try {
    console.log('Deleting villa:', id);
    
    const { error } = await supabase
      .from('villas')
      .delete()
      .eq('id', id);

    if (error) throw error;
    
    console.log('Villa deleted successfully');
    
    toast({
      title: "Başarılı",
      description: 'Villa başarıyla silindi'
    });
    return true;
  } catch (error: any) {
    console.error('Error deleting villa:', error);
    toast({
      title: "Hata",
      description: `Villa silinirken hata oluştu: ${error.message}`,
      variant: "destructive"
    });
    return false;
  }
};
