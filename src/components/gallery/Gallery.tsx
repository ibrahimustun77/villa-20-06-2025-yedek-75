
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useGalleryAnimation } from './hooks/useGalleryAnimation';
import { useGalleryState } from './hooks/useGalleryState';
import GalleryHeader from './GalleryHeader';
import GalleryGrid from './GalleryGrid';
import FullscreenImage from './FullscreenImage';
import ViewAllButton from './ViewAllButton';

interface GalleryImage {
  id: string;
  url: string;
  alt: string;
  category?: string;
}

const Gallery: React.FC = () => {
  const galleryRef = useGalleryAnimation();

  // Optimized fetch with better caching and filtering
  const { data: galleryImages = [], isLoading } = useQuery({
    queryKey: ['gallery-images-homepage'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('gallery_images')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(12); // Limit for homepage display
      
      if (error) throw error;
      
      return data.map(img => ({
        id: img.id,
        url: img.image_url,
        alt: (img as any).alt_text || img.title || 'Galeri resmi',
        category: (img as any).category || 'villa'
      }));
    },
    staleTime: 15 * 60 * 1000, // 15 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
    refetchOnWindowFocus: false
  });

  const { 
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
  } = useGalleryState(galleryImages);

  if (isLoading) {
    return (
      <section className="py-24 px-6" ref={galleryRef}>
        <div className="container-custom">
          <GalleryHeader />
          <div className="flex justify-center items-center h-64">
            <div className="text-lg">Galeri yükleniyor...</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 px-6" ref={galleryRef}>
      <div className="container-custom">
        <GalleryHeader />
        <GalleryGrid images={filteredImages} onImageClick={openFullscreen} />
        <ViewAllButton />
        
        <FullscreenImage
          selectedImage={selectedImage}
          currentImageIndex={currentImageIndex}
          images={filteredImages}
          onClose={closeFullscreen}
          onNext={nextImage}
          onPrev={prevImage}
          onThumbnailClick={handleThumbnailClick}
        />
      </div>
    </section>
  );
};

export default Gallery;
