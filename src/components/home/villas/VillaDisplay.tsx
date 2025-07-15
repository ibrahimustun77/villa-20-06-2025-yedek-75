import React, { useState, useEffect } from 'react';
import { VillaType } from '@/services/types';
import VillaImage from './VillaImage';
import VillaCard from './VillaCard';
import FullscreenGallery from '@/components/villas/image-gallery/FullscreenGallery';

interface VillaDisplayProps {
  selectedVillaType?: VillaType;
  villas?: any[];
}

const VillaDisplay: React.FC<VillaDisplayProps> = ({ selectedVillaType, villas }) => {
  console.log('=== VillaDisplay Debug ===');
  console.log('selectedVillaType:', selectedVillaType);
  console.log('villas:', villas);

  // State for image navigation
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFullscreenOpen, setIsFullscreenOpen] = useState(false);

  // Get the first villa of the selected type for display
  const selectedVilla = villas && villas.length > 0 ? villas[0] : null;
  
  console.log('selectedVilla:', selectedVilla);
  console.log('selectedVilla.feature_groups:', selectedVilla?.feature_groups);

  const defaultProps = {
    name: 'Villa',
    description: 'Modern mimari ile doğanın buluştuğu, termal suya sahip lüks villalar.',
    bedrooms: 4,
    bathrooms: 3,
    livingRooms: 2,
    halls: 1,
    image: '',
    features: ['Özel Termal Havuz', 'Bahçe', 'Akıllı Ev Sistemi', 'Panoramik Manzara']
  };

  // Use villa data directly instead of display data
  const displayBedrooms = selectedVilla?.bedrooms || defaultProps.bedrooms;
  const displayBathrooms = selectedVilla?.bathrooms || defaultProps.bathrooms;
  const displayLivingRooms = selectedVilla?.living_rooms || defaultProps.livingRooms;
  const displayHalls = selectedVilla?.halls || defaultProps.halls;
  const displayFeatures = selectedVilla?.features || defaultProps.features;
  
  // Get villa images with improved logic
  const getVillaImages = () => {
    console.log('=== VillaDisplay - Getting villa images ===');
    
    let images: string[] = [];
    
    // Use villa image_urls directly
    if (villas && villas.length > 0) {
      let allVillaImages: string[] = [];
      villas.forEach((villa, index) => {
        console.log(`Villa ${index + 1} image_urls:`, villa.image_urls);
        if (villa.image_urls && Array.isArray(villa.image_urls)) {
          allVillaImages = [...allVillaImages, ...villa.image_urls];
        }
      });
      
      // Remove duplicates and filter out empty/invalid URLs
      images = [...new Set(allVillaImages)].filter(img => img && img.trim() !== '' && img !== 'null' && img !== 'undefined');
      console.log('Combined villa images:', images);
    }
    
    // If no images found, add a placeholder
    if (images.length === 0) {
      images = ['/placeholder.svg'];
    }
    
    console.log('Final villa images for VillaDisplay:', images);
    console.log('=== End VillaDisplay image processing ===');
    return images;
  };

  const villaImages = getVillaImages();

  // Reset current index when images change and ensure it's within bounds
  useEffect(() => {
    console.log('VillaDisplay - Images changed, resetting index. New images:', villaImages);
    setCurrentImageIndex(0);
  }, [villaImages.length, selectedVillaType?.id]);

  // Image navigation handlers with improved logic
  const handleNextImage = () => {
    console.log('VillaDisplay - handleNextImage called. Current:', currentImageIndex, 'Total:', villaImages.length);
    if (villaImages.length > 1) {
      const newIndex = (currentImageIndex + 1) % villaImages.length;
      console.log('VillaDisplay - Setting new index to:', newIndex);
      setCurrentImageIndex(newIndex);
    }
  };

  const handlePrevImage = () => {
    console.log('VillaDisplay - handlePrevImage called. Current:', currentImageIndex, 'Total:', villaImages.length);
    if (villaImages.length > 1) {
      const newIndex = currentImageIndex === 0 ? villaImages.length - 1 : currentImageIndex - 1;
      console.log('VillaDisplay - Setting new index to:', newIndex);
      setCurrentImageIndex(newIndex);
    }
  };

  const handleOpenFullscreen = () => {
    console.log('VillaDisplay - Opening fullscreen');
    setIsFullscreenOpen(true);
  };

  const handleCloseFullscreen = () => {
    console.log('VillaDisplay - Closing fullscreen');
    setIsFullscreenOpen(false);
  };

  const handleSelectImage = (index: number) => {
    console.log('VillaDisplay - Selecting image index:', index);
    if (index >= 0 && index < villaImages.length) {
      setCurrentImageIndex(index);
    }
  };

  console.log('VillaDisplay - Rendering with:', {
    currentImageIndex,
    totalImages: villaImages.length,
    villaImages: villaImages.slice(0, 3) // Show first 3 for debugging
  });

  return (
    <div className="grid md:grid-cols-2 gap-6 md:gap-12">
      {/* Villa Image */}
      <div className="w-full group">
        <VillaImage 
          images={villaImages}
          currentIndex={currentImageIndex}
          onNext={handleNextImage}
          onPrev={handlePrevImage}
          onOpenFullscreen={handleOpenFullscreen}
          name={selectedVillaType?.name || defaultProps.name}
        />
      </div>
      
      {/* Villa Details */}
      <div className="px-2 md:px-0">
        <VillaCard
          villaType={selectedVillaType}
          displayBedrooms={displayBedrooms}
          displayBathrooms={displayBathrooms}
          displayLivingRooms={displayLivingRooms}
          displayHalls={displayHalls}
          displayFeatures={displayFeatures}
          actualVilla={selectedVilla}
          isHomepage={true}
        />
      </div>

      {/* Fullscreen Gallery */}
      <FullscreenGallery
        active={isFullscreenOpen}
        images={villaImages}
        name={selectedVillaType?.name || defaultProps.name}
        currentIndex={currentImageIndex}
        onClose={handleCloseFullscreen}
        onPrev={handlePrevImage}
        onNext={handleNextImage}
        onSelect={handleSelectImage}
      />
    </div>
  );
};

export default VillaDisplay;
