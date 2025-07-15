
import { fetchVillaTypeDisplays } from '@/services/villaTypeDisplayService';

export const fetchVillaTypeDisplayById = async (villaTypeId: string) => {
  try {
    const displays = await fetchVillaTypeDisplays();
    return displays[villaTypeId] || null;
  } catch (error) {
    console.error('Error fetching villa type display by ID:', error);
    return null;
  }
};

// Villa resimlerini doğru sıralamak için yardımcı fonksiyon
export const getOrderedImages = (images: string[], coverImage?: string) => {
  if (!images || images.length === 0) return [];
  
  if (!coverImage) return images;
  
  // Cover image'ı başa koy, diğerlerini sıralama
  return [coverImage, ...images.filter(img => img !== coverImage)];
};

// Villa display data'sından resim listesi almak için
export const getVillaImages = (displayData: any, fallbackImages: string[] = []) => {
  const galleryImages = displayData?.gallery_images || [];
  const displayImage = displayData?.display_image;
  
  if (galleryImages.length > 0) {
    return galleryImages;
  }
  
  if (displayImage) {
    return [displayImage];
  }
  
  return fallbackImages;
};

// Get selected villa type data by combining villa type and villa data
export const getSelectedVillaTypeData = (villaTypes: any[], villas: any[], activeVilla: string) => {
  const villaType = villaTypes.find(vt => vt.id === activeVilla);
  const villa = villas.find(v => v.villa_type_id === activeVilla);
  
  if (!villaType) return null;
  
  return {
    ...villaType,
    ...villa,
    villa_type: villaType
  };
};

// Get default villa data when no villa is selected
export const getDefaultVillaData = () => {
  return {
    id: '',
    name: 'Villa Seçiniz',
    description: 'Lütfen bir villa tipi seçiniz.',
    price: 0,
    square_meters: 0,
    bedrooms: 0,
    bathrooms: 0,
    max_guests: 0,
    features: [],
    image_urls: [],
    villa_type: {
      name: 'Villa Seçiniz',
      description: 'Lütfen bir villa tipi seçiniz.'
    }
  };
};
