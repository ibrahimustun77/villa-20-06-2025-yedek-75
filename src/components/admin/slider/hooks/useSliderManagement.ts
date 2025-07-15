
import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { MediaLibraryItem } from '@/services/mediaLibraryService';

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

export const useSliderManagement = () => {
  const [activePageType, setActivePageType] = useState('home');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSlider, setEditingSlider] = useState<SliderImage | null>(null);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    image_url: '',
    title: '',
    description: '',
    is_active: true
  });
  const queryClient = useQueryClient();

  const { data: sliderImages = [], isLoading } = useQuery({
    queryKey: ['slider-images'],
    queryFn: async () => {
      console.log('Fetching slider images...');
      const { data, error } = await supabase
        .from('slider_images')
        .select('*')
        .order('page_type')
        .order('order_index');
      
      if (error) {
        console.error('Error fetching slider images:', error);
        throw error;
      }
      
      console.log('Fetched slider images:', data);
      return data as SliderImage[];
    }
  });

  // Fix filtering to ensure proper comparison
  const filteredImages = sliderImages.filter(img => {
    const matches = img.page_type === activePageType;
    console.log(`Filtering: ${img.page_type} === ${activePageType} = ${matches}`, img);
    return matches;
  }).sort((a, b) => a.order_index - b.order_index);

  console.log('Active page type:', activePageType);
  console.log('All slider images:', sliderImages);
  console.log('Filtered images:', filteredImages);

  const handleMediaSelect = (media: MediaLibraryItem) => {
    console.log('Media selected for slider:', media);
    setFormData(prev => ({ ...prev, image_url: media.url }));
  };

  const resetForm = () => {
    setFormData({
      image_url: '',
      title: '',
      description: '',
      is_active: true
    });
    setEditingSlider(null);
    setIsDialogOpen(false);
  };

  const openEditDialog = (slider: SliderImage) => {
    console.log('Opening edit dialog for slider:', slider);
    setEditingSlider(slider);
    setFormData({
      image_url: slider.image_url,
      title: slider.title || '',
      description: slider.description || '',
      is_active: slider.is_active
    });
    setIsDialogOpen(true);
  };

  const openAddDialog = () => {
    console.log('Opening add dialog for page type:', activePageType);
    setEditingSlider(null);
    setFormData({
      image_url: '',
      title: '',
      description: '',
      is_active: true
    });
    setIsDialogOpen(true);
  };

  const invalidateQueries = () => {
    queryClient.invalidateQueries({ queryKey: ['slider-images'] });
    queryClient.invalidateQueries({ queryKey: ['gallery-slider-images'] });
    queryClient.invalidateQueries({ queryKey: ['activeSliderImages'] });
  };

  return {
    // State
    activePageType,
    isDialogOpen,
    editingSlider,
    selectedImages,
    previewImage,
    formData,
    sliderImages,
    filteredImages,
    isLoading,
    
    // Actions
    setActivePageType,
    setIsDialogOpen,
    setSelectedImages,
    setPreviewImage,
    setFormData,
    handleMediaSelect,
    resetForm,
    openEditDialog,
    openAddDialog,
    invalidateQueries
  };
};
