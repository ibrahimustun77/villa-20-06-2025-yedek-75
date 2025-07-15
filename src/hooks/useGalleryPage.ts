
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface GalleryImage {
  id: string;
  url: string;
  alt: string;
  category: string;
  description: string;
}

export const useGalleryPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  // Optimized query with better caching
  const { data: galleryImages = [], isLoading } = useQuery({
    queryKey: ['gallery-images-page'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('gallery_images')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      return data.map(img => ({
        id: img.id,
        url: img.image_url,
        alt: (img as any).alt_text || img.title || 'Galeri resmi',
        category: (img as any).category || 'villa',
        description: img.title || 'Therma Prime galeri resmi'
      }));
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
    refetchOnWindowFocus: false
  });

  const filteredImages = activeCategory === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeCategory);
  
  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
    
    // Handle keyboard navigation for lightbox
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage !== null) {
        if (e.key === 'Escape') {
          setSelectedImage(null);
        } else if (e.key === 'ArrowRight') {
          navigateImage('next');
        } else if (e.key === 'ArrowLeft') {
          navigateImage('prev');
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedImage]);
  
  const navigateImage = (direction: 'prev' | 'next') => {
    if (selectedImage === null) return;
    
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage);
    if (currentIndex === -1) return;
    
    if (direction === 'next') {
      const nextIndex = (currentIndex + 1) % filteredImages.length;
      setSelectedImage(filteredImages[nextIndex].id);
    } else {
      const prevIndex = currentIndex === 0 ? filteredImages.length - 1 : currentIndex - 1;
      setSelectedImage(filteredImages[prevIndex].id);
    }
  };
  
  const selectedImageData = selectedImage !== null 
    ? galleryImages.find(img => img.id === selectedImage) || null
    : null;
    
  return {
    activeCategory,
    setActiveCategory,
    selectedImage,
    setSelectedImage,
    filteredImages,
    navigateImage,
    selectedImageData,
    isLoading
  };
};
