
import { supabase } from '@/integrations/supabase/client';

export interface SliderImage {
  id: string;
  image_url: string;
  title?: string;
  description?: string;
  order_index: number;
  is_active: boolean;
  page_type: string;
  created_at: string;
  updated_at: string;
}

export const fetchSliderImages = async (pageType?: string): Promise<SliderImage[]> => {
  let query = supabase
    .from('slider_images')
    .select('*');
  
  if (pageType) {
    query = query.eq('page_type', pageType);
  }
  
  const { data, error } = await query.order('order_index', { ascending: true });

  if (error) {
    console.error('Error fetching slider images:', error);
    throw error;
  }

  return data || [];
};

export const fetchActiveSliderImages = async (pageType?: string): Promise<SliderImage[]> => {
  let query = supabase
    .from('slider_images')
    .select('*')
    .eq('is_active', true);
  
  if (pageType) {
    query = query.eq('page_type', pageType);
  }
  
  const { data, error } = await query.order('order_index', { ascending: true });

  if (error) {
    console.error('Error fetching active slider images:', error);
    throw error;
  }

  return data || [];
};

export const createSliderImage = async (sliderImage: Omit<SliderImage, 'id' | 'created_at' | 'updated_at'>): Promise<SliderImage> => {
  const { data, error } = await supabase
    .from('slider_images')
    .insert([sliderImage])
    .select()
    .single();

  if (error) {
    console.error('Error creating slider image:', error);
    throw error;
  }

  return data;
};

export const updateSliderImage = async (id: string, updates: Partial<SliderImage>): Promise<SliderImage> => {
  const { data, error } = await supabase
    .from('slider_images')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating slider image:', error);
    throw error;
  }

  return data;
};

export const deleteSliderImage = async (id: string): Promise<boolean> => {
  const { error } = await supabase
    .from('slider_images')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting slider image:', error);
    throw error;
  }

  return true;
};

export const updateSliderImageOrder = async (imageId: string, newOrder: number): Promise<void> => {
  const { error } = await supabase
    .from('slider_images')
    .update({ order_index: newOrder })
    .eq('id', imageId);

  if (error) {
    console.error('Error updating slider image order:', error);
    throw error;
  }
};
