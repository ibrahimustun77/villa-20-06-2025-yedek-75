import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { GalleryImage, GalleryFormData } from '../types';
import { uploadImageToStorage, deleteImageFromStorage } from '../services/galleryImageService';

export const useGalleryManagement = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null);
  const [formData, setFormData] = useState<GalleryFormData>({
    image_url: '',
    title: '',
    category: 'villa',
    alt_text: '',
    order_index: 0,
    is_active: true
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const queryClient = useQueryClient();

  const { data: images = [], isLoading } = useQuery({
    queryKey: ['gallery-images'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('gallery_images')
        .select('*')
        .order('order_index', { ascending: true });
      
      if (error) throw error;
      
      return data.map(img => ({
        id: img.id,
        image_url: img.image_url,
        title: img.title,
        category: img.category || 'villa',
        order_index: img.order_index || 0,
        alt_text: img.alt_text,
        is_active: img.is_active !== false,
        created_at: img.created_at,
        updated_at: img.updated_at
      })) as GalleryImage[];
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000
  });

  const handleSubmit = async () => {
    console.log('Gallery submit - formData:', formData, 'imageFile:', imageFile, 'editingImage:', editingImage);
    
    // Check if we have either an image URL from media library or a file upload
    if (!imageFile && !formData.image_url && !editingImage) {
      toast({
        title: "Hata",
        description: "Lütfen bir resim seçin",
        variant: "destructive"
      });
      return;
    }

    setUploading(true);
    try {
      let imageUrl = editingImage?.image_url || formData.image_url || '';
      
      // If we have a file, upload it
      if (imageFile) {
        imageUrl = await uploadImageToStorage(imageFile);
      }

      // If we still don't have an image URL, show error
      if (!imageUrl) {
        toast({
          title: "Hata",
          description: "Resim yüklenemedi, lütfen tekrar deneyin",
          variant: "destructive"
        });
        return;
      }

      const updateData = {
        title: formData.title || null,
        category: formData.category,
        alt_text: formData.alt_text || null,
        order_index: formData.order_index,
        is_active: formData.is_active,
        image_url: imageUrl
      };

      console.log('Submitting update data:', updateData);

      if (editingImage) {
        console.log('Updating existing image with ID:', editingImage.id);
        const { error } = await supabase
          .from('gallery_images')
          .update(updateData)
          .eq('id', editingImage.id);

        if (error) {
          console.error('Update error:', error);
          throw error;
        }
        
        toast({
          title: "Başarılı",
          description: "Resim güncellendi"
        });
      } else {
        console.log('Creating new image');
        const { error } = await supabase
          .from('gallery_images')
          .insert(updateData);

        if (error) {
          console.error('Insert error:', error);
          throw error;
        }
        
        toast({
          title: "Başarılı",
          description: "Resim eklendi"
        });
      }

      queryClient.invalidateQueries({ queryKey: ['gallery-images'] });
      queryClient.invalidateQueries({ queryKey: ['gallery-images-homepage'] });
      queryClient.invalidateQueries({ queryKey: ['gallery-images-page'] });
      resetForm();
    } catch (error: any) {
      console.error('Error:', error);
      toast({
        title: "Hata",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string, imageUrl: string) => {
    try {
      const { error } = await supabase
        .from('gallery_images')
        .delete()
        .eq('id', id);

      if (error) throw error;

      await deleteImageFromStorage(imageUrl);

      queryClient.invalidateQueries({ queryKey: ['gallery-images'] });
      queryClient.invalidateQueries({ queryKey: ['gallery-images-homepage'] });
      queryClient.invalidateQueries({ queryKey: ['gallery-images-page'] });
      toast({
        title: "Başarılı",
        description: "Resim silindi"
      });
    } catch (error: any) {
      console.error('Error deleting image:', error);
      toast({
        title: "Hata",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const resetForm = () => {
    setFormData({
      image_url: '',
      title: '',
      category: 'villa',
      alt_text: '',
      order_index: 0,
      is_active: true
    });
    setImageFile(null);
    setEditingImage(null);
    setIsDialogOpen(false);
  };

  const openEditDialog = (image: GalleryImage) => {
    console.log('Opening edit dialog for image:', image);
    setEditingImage(image);
    setFormData({
      image_url: image.image_url || '',
      title: image.title || '',
      category: image.category || 'villa',
      alt_text: image.alt_text || '',
      order_index: image.order_index || 0,
      is_active: image.is_active !== false
    });
    setImageFile(null);
    setIsDialogOpen(true);
  };

  const openAddDialog = () => {
    setEditingImage(null);
    const maxOrder = Math.max(...images.map(img => img.order_index || 0), -1);
    setFormData({
      image_url: '',
      title: '',
      category: 'villa',
      alt_text: '',
      order_index: maxOrder + 1,
      is_active: true
    });
    setImageFile(null);
    setIsDialogOpen(true);
  };

  const filteredImages = selectedCategory === 'all' 
    ? images 
    : images.filter(img => img.category === selectedCategory);

  return {
    // State
    images,
    filteredImages,
    isLoading,
    isDialogOpen,
    editingImage,
    formData,
    imageFile,
    uploading,
    selectedCategory,
    
    // Actions
    setFormData,
    setImageFile,
    setSelectedCategory,
    handleSubmit,
    handleDelete,
    resetForm,
    openEditDialog,
    openAddDialog
  };
};
