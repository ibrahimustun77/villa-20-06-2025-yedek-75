
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

// Image Upload for Villa Images
export const uploadVillaImage = async (file: File): Promise<string | null> => {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `villa-${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('villa_images')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (uploadError) throw uploadError;

    const { data } = await supabase.storage
      .from('villa_images')
      .getPublicUrl(filePath);

    return data.publicUrl;
  } catch (error: any) {
    toast({
      title: "Hata",
      description: `Resim yüklenirken hata oluştu: ${error.message}`,
      variant: "destructive"
    });
    return null;
  }
};

// Image Upload for Gallery Images
export const uploadGalleryImage = async (file: File): Promise<string | null> => {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `gallery-${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('gallery')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (uploadError) throw uploadError;

    const { data } = await supabase.storage
      .from('gallery')
      .getPublicUrl(filePath);

    return data.publicUrl;
  } catch (error: any) {
    toast({
      title: "Hata",
      description: `Galeri resmi yüklenirken hata oluştu: ${error.message}`,
      variant: "destructive"
    });
    return null;
  }
};

export const deleteVillaImage = async (url: string): Promise<boolean> => {
  try {
    const path = url.split('/').pop();
    if (!path) return false;

    const { error } = await supabase.storage
      .from('villa_images')
      .remove([path]);

    if (error) throw error;
    return true;
  } catch (error: any) {
    toast({
      title: "Hata",
      description: `Resim silinirken hata oluştu: ${error.message}`,
      variant: "destructive"
    });
    return false;
  }
};

export const deleteGalleryImage = async (url: string): Promise<boolean> => {
  try {
    // Extract filename from URL
    const urlParts = url.split('/');
    const fileName = urlParts[urlParts.length - 1];
    
    if (!fileName || !url.includes('supabase')) {
      return false; // Skip deletion for external URLs
    }

    const { error } = await supabase.storage
      .from('gallery')
      .remove([fileName]);

    if (error) throw error;
    return true;
  } catch (error: any) {
    toast({
      title: "Hata",
      description: `Galeri resmi silinirken hata oluştu: ${error.message}`,
      variant: "destructive"
    });
    return false;
  }
};
