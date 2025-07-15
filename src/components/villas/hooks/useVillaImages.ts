
export const useVillaImages = (displayData: any, villas: any[]) => {
  const selectedVilla = villas && villas.length > 0 ? villas[0] : null;

  const getGalleryImages = () => {
    let gallery: string[] = [];
    
    console.log('=== useVillaImages Gallery Debug (ENHANCED) ===');
    console.log('useVillaImages - Display Data:', displayData);
    console.log('useVillaImages - Villas:', villas);
    console.log('useVillaImages - Villas length:', villas?.length);
    
    // Use villa image_urls directly (no more display data dependency)
    if (villas && villas.length > 0) {
      let allVillaImages: string[] = [];
      villas.forEach((villa, index) => {
        console.log(`Villa ${index + 1} (${villa.name}):`, villa);
        console.log(`Villa ${index + 1} image_urls:`, villa.image_urls);
        if (villa.image_urls && Array.isArray(villa.image_urls)) {
          console.log(`Villa ${index + 1} has ${villa.image_urls.length} images:`, villa.image_urls);
          allVillaImages = [...allVillaImages, ...villa.image_urls];
        } else {
          console.log(`Villa ${index + 1} has no image_urls or invalid format`);
        }
      });
      
      // Remove duplicates
      allVillaImages = [...new Set(allVillaImages)];
      console.log('Combined villa images (duplicates removed):', allVillaImages);
      
      if (allVillaImages.length > 0) {
        console.log('SUCCESS: Using combined villa images:', allVillaImages);
        gallery = allVillaImages.filter(img => img && img.trim() !== '');
        console.log('Filtered gallery images from villas:', gallery);
        console.log('=== End useVillaImages Gallery Debug (SUCCESS) ===');
        return gallery;
      }
    }
    
    console.log('Final gallery images for villa details:', gallery);
    console.log('=== End useVillaImages Gallery Debug (FINAL) ===');
    return gallery;
  };

  const getVillaCardImages = () => {
    console.log('=== useVillaImages VillaCard Debug (ENHANCED) ===');
    console.log('Getting images for VillaCard...');
    console.log('Villas for card:', villas);
    
    let cardImages: string[] = [];
    
    // Use villa image_urls directly
    if (villas && villas.length > 0) {
      let allVillaImages: string[] = [];
      villas.forEach((villa, index) => {
        console.log(`VillaCard - Villa ${index + 1} (${villa.name}):`, villa);
        console.log(`VillaCard - Villa ${index + 1} image_urls:`, villa.image_urls);
        if (villa.image_urls && Array.isArray(villa.image_urls)) {
          console.log(`VillaCard - Villa ${index + 1} has ${villa.image_urls.length} images`);
          allVillaImages = [...allVillaImages, ...villa.image_urls];
        }
      });
      
      // Remove duplicates
      allVillaImages = [...new Set(allVillaImages)];
      
      if (allVillaImages.length > 0) {
        cardImages = allVillaImages.filter(img => img && img.trim() !== '');
        console.log('SUCCESS: VillaCard using combined villa images:', cardImages);
        console.log('=== End useVillaImages VillaCard Debug (SUCCESS) ===');
        return cardImages;
      }
    }
    
    console.log('Final VillaCard images:', cardImages);
    console.log('=== End useVillaImages VillaCard Debug (FINAL) ===');
    return cardImages;
  };

  return {
    selectedVilla,
    galleryImages: getGalleryImages(),
    villaCardImages: getVillaCardImages()
  };
};
