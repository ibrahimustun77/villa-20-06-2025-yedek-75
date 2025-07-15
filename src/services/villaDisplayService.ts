
import { supabase } from "@/integrations/supabase/client";
import { VillaTypeDisplay, updateVillaTypeDisplay } from "./villaTypeDisplayService";

// Villa resmi güncellendiğinde villa_type_displays tablosunu da güncelle
export const syncVillaImageToDisplay = async (villaTypeId: string, imageUrls: string[], displayImage?: string) => {
  try {
    console.log('Syncing villa images to display for villa type:', villaTypeId);
    console.log('Image URLs:', imageUrls);
    console.log('Display image:', displayImage);
    
    // Mevcut display data'yı al
    const { data: existingDisplay } = await supabase
      .from('villa_type_displays')
      .select('*')
      .eq('id', villaTypeId)
      .single();

    let finalDisplayImage = displayImage || '';
    let galleryImages: string[] = [];

    if (imageUrls && imageUrls.length > 0) {
      // Resimler varsa, gallery'yi ayarla
      galleryImages = [...new Set(imageUrls)]; // Duplicateları temizle
      // Display image belirtilmemişse ilkini kullan
      if (!finalDisplayImage) {
        finalDisplayImage = galleryImages[0];
      }
    }

    // Display data'yı güncelle veya oluştur
    const displayDataToUpdate = {
      display_image: finalDisplayImage,
      gallery_images: galleryImages,
      // Mevcut veriler varsa koru, yoksa varsayılan değerler kullan
      display_bedrooms: existingDisplay?.display_bedrooms || 4,
      display_bathrooms: existingDisplay?.display_bathrooms || 3,
      display_living_rooms: existingDisplay?.display_living_rooms || 1,
      display_halls: existingDisplay?.display_halls || 1,
      display_features: existingDisplay?.display_features || ['Özel Termal Havuz', 'Bahçe', 'Akıllı Ev Sistemi', 'Panoramik Manzara']
    };

    console.log('Updating display data with:', displayDataToUpdate);

    const result = await updateVillaTypeDisplay(villaTypeId, displayDataToUpdate);
    
    console.log('Villa display data synced successfully for villa type:', villaTypeId);
    return result;
  } catch (error) {
    console.error('Error syncing villa image to display:', error);
    throw error;
  }
};

// Villa silindiğinde villa_type_displays tablosundan da temizle
export const cleanupVillaDisplay = async (villaTypeId: string) => {
  try {
    // Bu villa tipine ait başka villa var mı kontrol et
    const { data: remainingVillas } = await supabase
      .from('villas')
      .select('image_urls')
      .eq('villa_type_id', villaTypeId)
      .not('image_urls', 'is', null);
    
    if (!remainingVillas || remainingVillas.length === 0) {
      // Bu villa tipine ait villa kalmadıysa display'i temizle
      await updateVillaTypeDisplay(villaTypeId, {
        display_image: '',
        gallery_images: []
      });
    } else {
      // Kalan villalardan tüm resimleri birleştir
      let allImages: string[] = [];
      remainingVillas.forEach(villa => {
        if (villa.image_urls && Array.isArray(villa.image_urls)) {
          allImages = [...allImages, ...villa.image_urls];
        }
      });
      
      // Duplicateları temizle
      allImages = [...new Set(allImages)];
      
      if (allImages.length > 0) {
        await syncVillaImageToDisplay(
          villaTypeId, 
          allImages, 
          allImages[0]
        );
      }
    }
  } catch (error) {
    console.error('Error cleaning up villa display:', error);
  }
};

// Villa tipine ait tüm villaların resimlerini birleştir ve display'e senkronize et - GÜÇLENDIRILMIŞ VERSİYON
export const syncAllVillasOfTypeToDisplay = async (villaTypeId: string) => {
  try {
    console.log('=== SYNC ALL VILLAS OF TYPE TO DISPLAY ===');
    console.log('Villa Type ID:', villaTypeId);
    
    // Bu villa tipine ait tüm villaları al
    const { data: villas, error: villaError } = await supabase
      .from('villas')
      .select('image_urls, name')
      .eq('villa_type_id', villaTypeId);
    
    if (villaError) {
      console.error('Error fetching villas:', villaError);
      throw villaError;
    }
    
    if (!villas || villas.length === 0) {
      console.log('No villas found for villa type:', villaTypeId);
      return;
    }
    
    console.log('Found villas:', villas);
    
    // Tüm resimleri birleştir
    let allImages: string[] = [];
    let coverImage = '';
    
    villas.forEach(villa => {
      console.log('Processing villa:', villa.name, 'Images:', villa.image_urls);
      if (villa.image_urls && Array.isArray(villa.image_urls)) {
        allImages = [...allImages, ...villa.image_urls];
        // İlk villa'nın ilk resmini kapak olarak kullan
        if (!coverImage && villa.image_urls.length > 0) {
          coverImage = villa.image_urls[0];
        }
      }
    });
    
    // Duplicateları temizle
    allImages = [...new Set(allImages)];
    
    console.log('All combined images for villa type:', villaTypeId, allImages);
    console.log('Cover image selected:', coverImage);
    
    if (allImages.length > 0) {
      // Kapak resmi yoksa ilk resmi kullan
      if (!coverImage && allImages.length > 0) {
        coverImage = allImages[0];
      }
      
      // Display tablosunu güncelle
      await syncVillaImageToDisplay(villaTypeId, allImages, coverImage);
      console.log('Successfully synced all villa images to display for type:', villaTypeId);
      
      // Senkronizasyon sonrası display data'yı kontrol et
      const { data: updatedDisplay } = await supabase
        .from('villa_type_displays')
        .select('*')
        .eq('id', villaTypeId)
        .single();
      
      console.log('Updated display data:', updatedDisplay);
    } else {
      console.log('No images found to sync for villa type:', villaTypeId);
    }
    
    console.log('=== END SYNC ALL VILLAS OF TYPE TO DISPLAY ===');
    
  } catch (error) {
    console.error('Error syncing all villas of type to display:', error);
    throw error;
  }
};
