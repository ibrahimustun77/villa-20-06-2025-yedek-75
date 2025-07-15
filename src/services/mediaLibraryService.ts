
import { supabase } from '@/integrations/supabase/client';

export interface MediaLibraryItem {
  id: string;
  url: string;
  title?: string;
  category?: string;
  file_type?: string;
  file_size?: number;
  width?: number;
  height?: number;
  alt_text?: string;
  description?: string;
  tags?: string[];
  created_at: string;
  updated_at: string;
}

export const fetchMediaLibraryItems = async (): Promise<MediaLibraryItem[]> => {
  const { data, error } = await supabase
    .from('media_library')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
};

export const uploadToMediaLibrary = async (file: File, metadata?: {
  title?: string;
  category?: string;
  alt_text?: string;
  description?: string;
  tags?: string[];
}): Promise<MediaLibraryItem> => {
  // Upload to storage
  const fileExt = file.name.split('.').pop();
  const fileName = `media-${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
  
  const { error: uploadError } = await supabase.storage
    .from('media-library')
    .upload(fileName, file);

  if (uploadError) throw uploadError;

  // Get public URL
  const { data: urlData } = supabase.storage
    .from('media-library')
    .getPublicUrl(fileName);

  // Create media library record
  const mediaData = {
    url: urlData.publicUrl,
    title: metadata?.title || file.name,
    category: metadata?.category || 'general',
    file_type: file.type,
    file_size: file.size,
    alt_text: metadata?.alt_text,
    description: metadata?.description,
    tags: metadata?.tags || [],
    usage_count: 0
  };

  const { data, error } = await supabase
    .from('media_library')
    .insert(mediaData)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const deleteFromMediaLibrary = async (id: string, url: string): Promise<void> => {
  // Delete from database
  const { error: dbError } = await supabase
    .from('media_library')
    .delete()
    .eq('id', id);

  if (dbError) throw dbError;

  // Delete from storage
  try {
    const urlParts = url.split('/');
    const fileName = urlParts[urlParts.length - 1];
    if (fileName && url.includes('supabase')) {
      await supabase.storage
        .from('media-library')
        .remove([fileName]);
    }
  } catch (storageError) {
    console.log('Storage deletion failed (non-critical):', storageError);
  }
};

export const updateMediaLibraryItem = async (id: string, updates: Partial<MediaLibraryItem>): Promise<void> => {
  const { error } = await supabase
    .from('media_library')
    .update(updates)
    .eq('id', id);

  if (error) throw error;
};
