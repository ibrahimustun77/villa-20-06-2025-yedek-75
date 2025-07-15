
import { supabase } from '@/integrations/supabase/client';

export const uploadImageToStorage = async (file: File): Promise<string> => {
  const fileExt = file.name.split('.').pop();
  const fileName = `gallery-${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
  const filePath = fileName;

  const { error: uploadError } = await supabase.storage
    .from('gallery')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false
    });

  if (uploadError) throw uploadError;

  const { data } = supabase.storage
    .from('gallery')
    .getPublicUrl(filePath);

  return data.publicUrl;
};

export const deleteImageFromStorage = async (imageUrl: string): Promise<void> => {
  try {
    const urlParts = imageUrl.split('/');
    const fileName = urlParts[urlParts.length - 1];
    if (fileName && imageUrl.includes('supabase')) {
      await supabase.storage
        .from('gallery')
        .remove([fileName]);
    }
  } catch (storageError) {
    console.log('Storage deletion failed (non-critical):', storageError);
  }
};
