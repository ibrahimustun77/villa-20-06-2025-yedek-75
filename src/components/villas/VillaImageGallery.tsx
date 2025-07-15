
import React from 'react';
import { useImageGallery } from './image-gallery/hooks/useImageGallery';
import MainImage from './image-gallery/MainImage';
import ThumbnailGallery from './image-gallery/ThumbnailGallery';
import FullscreenGallery from './image-gallery/FullscreenGallery';
import NoImagesPlaceholder from './image-gallery/NoImagesPlaceholder';

interface VillaImageGalleryProps {
  images: string[];
  name: string;
}

const VillaImageGallery: React.FC<VillaImageGalleryProps> = ({ images, name }) => {
  const { 
    currentImageIndex, 
    setCurrentImageIndex,
    fullscreenActive,
    validImages,
    nextImage,
    prevImage,
    openFullscreen,
    closeFullscreen
  } = useImageGallery({ images });

  // If no valid images, show placeholder
  if (validImages.length === 0) {
    return <NoImagesPlaceholder />;
  }

  return (
    <div>
      <MainImage 
        imageUrl={validImages[currentImageIndex]}
        name={name}
        currentIndex={currentImageIndex}
        totalImages={validImages.length}
        onPrev={prevImage}
        onNext={nextImage}
        onOpenFullscreen={openFullscreen}
      />
      
      <ThumbnailGallery 
        images={validImages}
        name={name}
        currentIndex={currentImageIndex}
        onSelect={setCurrentImageIndex}
      />
      
      <FullscreenGallery 
        active={fullscreenActive}
        images={validImages}
        name={name}
        currentIndex={currentImageIndex}
        onClose={closeFullscreen}
        onPrev={prevImage}
        onNext={nextImage}
        onSelect={setCurrentImageIndex}
      />
    </div>
  );
};

export default VillaImageGallery;
