
import { useState } from 'react';
import { Villa, VillaType } from '@/services/types';
import { createVilla, updateVilla } from '@/services/villaService';
import { uploadVillaImage } from '@/services/storageService';
import { syncVillaImageToDisplay } from '@/services/villaDisplayService';

interface UseVillaFormLogicProps {
  villa?: Villa;
  villaTypes: VillaType[];
  onSuccess: () => void;
}

export const useVillaFormLogic = ({ villa, villaTypes, onSuccess }: UseVillaFormLogicProps) => {
  const [formData, setFormData] = useState({
    name: villa?.name || '',
    description: villa?.description || '',
    villa_type_id: villa?.villa_type_id || (villaTypes[0]?.id || ''),
    price: villa?.price || 0,
    bedrooms: villa?.bedrooms || null,
    bathrooms: villa?.bathrooms || null,
    living_rooms: villa?.living_rooms || null,
    halls: villa?.halls || null,
    features: villa?.features || [],
    is_active: villa?.is_active ?? true
  });

  const [images, setImages] = useState<string[]>(villa?.image_urls || []);
  const [coverImage, setCoverImage] = useState<string>(villa?.image_urls?.[0] || '');
  const [uploadingImage, setUploadingImage] = useState(false);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const imageUrl = await uploadVillaImage(file);
      if (imageUrl) {
        const newImages = [...images, imageUrl];
        setImages(newImages);
        
        // İlk resim ise onu cover image yap
        if (images.length === 0) {
          setCoverImage(imageUrl);
        }
      }
    } catch (error) {
      console.error('Image upload failed:', error);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleImageRemove = (index: number) => {
    const removedImage = images[index];
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
    
    // Eğer cover image silindiyse, yeni bir cover image seç
    if (removedImage === coverImage) {
      setCoverImage(newImages.length > 0 ? newImages[0] : '');
    }
  };

  const handleCoverImageSelect = (imageUrl: string) => {
    setCoverImage(imageUrl);
    // Cover image'ı listenin başına taşı
    const newImages = [imageUrl, ...images.filter(img => img !== imageUrl)];
    setImages(newImages);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Cover image listenin başında olduğundan emin ol
    const orderedImages = coverImage ? 
      [coverImage, ...images.filter(img => img !== coverImage)] : 
      images;

    const villaData = {
      ...formData,
      image_urls: orderedImages
    };

    try {
      let result;
      if (villa?.id) {
        result = await updateVilla(villa.id, villaData);
      } else {
        result = await createVilla(villaData);
      }

      if (result) {
        // Villa başarıyla oluşturuldu/güncellendi, display data'yı senkronize et
        if (orderedImages.length > 0) {
          await syncVillaImageToDisplay(formData.villa_type_id, orderedImages);
        }
        onSuccess();
      }
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  return {
    formData,
    setFormData,
    images,
    coverImage,
    uploadingImage,
    handleImageUpload,
    handleImageRemove,
    handleCoverImageSelect,
    handleSubmit
  };
};
