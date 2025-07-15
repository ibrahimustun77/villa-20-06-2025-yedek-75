
import { useState, useEffect } from 'react';

interface UseImageGalleryProps {
  images: string[];
}

export const useImageGallery = ({ images }: UseImageGalleryProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fullscreenActive, setFullscreenActive] = useState(false);
  
  // Filter out empty strings or invalid URLs
  const validImages = images.filter(img => img && img.trim() !== '');

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % validImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? validImages.length - 1 : prevIndex - 1
    );
  };

  const openFullscreen = () => {
    setFullscreenActive(true);
    // Prevent background scrolling
    document.body.style.overflow = 'hidden';
  };

  const closeFullscreen = () => {
    setFullscreenActive(false);
    // Re-enable scrolling
    document.body.style.overflow = '';
  };

  return {
    currentImageIndex,
    setCurrentImageIndex,
    fullscreenActive,
    validImages,
    nextImage,
    prevImage,
    openFullscreen,
    closeFullscreen,
  };
};
