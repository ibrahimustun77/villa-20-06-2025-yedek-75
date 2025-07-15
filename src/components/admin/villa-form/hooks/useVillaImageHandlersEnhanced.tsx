
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';

export const useVillaImageHandlersEnhanced = (formData: any, setFormData: any) => {
  const [uploadingImage, setUploadingImage] = useState(false);

  const handleImageAdd = (imageUrl: string) => {
    setFormData((prev: any) => ({
      ...prev,
      image_urls: [...(prev.image_urls || []), imageUrl]
    }));
    
    toast({
      title: "Başarılı",
      description: "Resim eklendi"
    });
  };

  const handleImageRemove = (index: number) => {
    setFormData((prev: any) => ({
      ...prev,
      image_urls: (prev.image_urls || []).filter((_: any, i: number) => i !== index)
    }));
  };

  const handleDetailImageAdd = (imageUrl: string) => {
    setFormData((prev: any) => ({
      ...prev,
      detail_gallery_images: [...(prev.detail_gallery_images || []), imageUrl]
    }));
    
    toast({
      title: "Başarılı",
      description: "Detay galerisi resmi eklendi"
    });
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

  const handleCoverImageSelect = (index: number) => {
    setFormData((prev: any) => {
      const images = [...(prev.image_urls || [])];
      const [selectedImage] = images.splice(index, 1);
      return {
        ...prev,
        image_urls: [selectedImage, ...images]
      };
    });
  };

  return {
    uploadingImage,
    handleImageAdd,
    handleImageRemove,
    handleDetailImageAdd,
    handleDetailImageRemove,
    handleDetailImagesReorder,
    handleCoverImageSelect
  };
};
