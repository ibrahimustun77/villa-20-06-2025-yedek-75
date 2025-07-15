
import { useState } from 'react';
import { uploadVillaImage } from '@/services/storageService';
import { toast } from '@/hooks/use-toast';

export const useVillaImageHandlers = (formData: any, setFormData: any) => {
  const [uploadingImage, setUploadingImage] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingImage(true);
      const imageUrl = await uploadVillaImage(file);
      
      if (imageUrl) {
        setFormData((prev: any) => ({
          ...prev,
          image_urls: [...(prev.image_urls || []), imageUrl]
        }));
        
        toast({
          title: "Başarılı",
          description: "Resim yüklendi"
        });
      }
    } catch (error) {
      console.error('Image upload error:', error);
      toast({
        title: "Hata",
        description: "Resim yüklenirken hata oluştu",
        variant: "destructive"
      });
    } finally {
      setUploadingImage(false);
    }
  };

  const handleImageRemove = (index: number) => {
    setFormData((prev: any) => ({
      ...prev,
      image_urls: (prev.image_urls || []).filter((_: any, i: number) => i !== index)
    }));
  };

  const handleDetailImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingImage(true);
      const imageUrl = await uploadVillaImage(file);
      
      if (imageUrl) {
        setFormData((prev: any) => ({
          ...prev,
          detail_gallery_images: [...(prev.detail_gallery_images || []), imageUrl]
        }));
        
        toast({
          title: "Başarılı",
          description: "Detay galerisi resmi yüklendi"
        });
      }
    } catch (error) {
      console.error('Detail image upload error:', error);
      toast({
        title: "Hata",
        description: "Detay galerisi resmi yüklenirken hata oluştu",
        variant: "destructive"
      });
    } finally {
      setUploadingImage(false);
    }
  };

  const handleDetailImageRemove = (index: number) => {
    setFormData((prev: any) => ({
      ...prev,
      detail_gallery_images: (prev.detail_gallery_images || []).filter((_: any, i: number) => i !== index)
    }));
  };

  const handleDetailImagesReorder = (reorderedImages: string[]) => {
    setFormData((prev: any) => ({
      ...prev,
      detail_gallery_images: reorderedImages
    }));
  };

  return {
    uploadingImage,
    handleImageUpload,
    handleImageRemove,
    handleDetailImageUpload,
    handleDetailImageRemove,
    handleDetailImagesReorder
  };
};
