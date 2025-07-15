
import { useState, useEffect } from 'react';

interface GalleryImage {
  id: string;
  url: string;
  alt: string;
  category: string;
}

export const useGalleryState = (galleryImages: GalleryImage[]) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const filteredImages = activeCategory === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeCategory);
  
  // Prevent scrolling when fullscreen is active
  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedImage]);
  
  const openFullscreen = (imageUrl: string, index: number) => {
    setSelectedImage(imageUrl);
    setCurrentImageIndex(index);
  };
  
  const closeFullscreen = () => {
    setSelectedImage(null);
  };
  
  const nextImage = () => {
    const nextIndex = (currentImageIndex + 1) % filteredImages.length;
    setCurrentImageIndex(nextIndex);
    setSelectedImage(filteredImages[nextIndex].url);
  };
  
  const prevImage = () => {
    const prevIndex = currentImageIndex === 0 ? filteredImages.length - 1 : currentImageIndex - 1;
    setCurrentImageIndex(prevIndex);
    setSelectedImage(filteredImages[prevIndex].url);
  };
  
  const handleThumbnailClick = (index: number) => {
    setCurrentImageIndex(index);
    setSelectedImage(filteredImages[index].url);
  };

  return {
    activeCategory,
    setActiveCategory,
    selectedImage,
    currentImageIndex,
    filteredImages,
    openFullscreen,
    closeFullscreen,
    nextImage,
    prevImage,
    handleThumbnailClick
  };
};
