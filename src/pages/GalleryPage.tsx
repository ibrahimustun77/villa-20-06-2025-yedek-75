
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import Navbar from '@/components/Navbar';
import GalleryHero from '@/components/gallery-page/GalleryHero';
import GalleryFilter from '@/components/gallery-page/GalleryFilter';
import GalleryGrid from '@/components/gallery-page/GalleryGrid';
import EmptyGallery from '@/components/gallery-page/EmptyGallery';
import ImageLightbox from '@/components/gallery-page/ImageLightbox';
import { useGalleryAnimation } from '@/components/gallery/hooks/useGalleryAnimation';

const GalleryPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const galleryRef = useGalleryAnimation();

  const { data: images = [], isLoading } = useQuery({
    queryKey: ['gallery-images-page'],
    queryFn: async () => {
      console.log('Fetching gallery images for page...');
      const { data, error } = await supabase
        .from('gallery_images')
        .select('*')
        .eq('is_active', true)
        .order('order_index');
      
      if (error) {
        console.error('Error fetching gallery images:', error);
        throw error;
      }
      
      console.log('Gallery images fetched:', data);
      return data || [];
    },
    staleTime: 1000 * 60 * 10, // 10 minutes cache for better performance
  });

  const filteredImages = selectedCategory === 'all' 
    ? images 
    : images.filter(img => img.category === selectedCategory);

  console.log('Gallery page - filtered images:', filteredImages);

  const selectedImage = selectedImageId 
    ? images.find(img => img.id === selectedImageId) 
    : null;

  const handleImageClick = (imageId: string) => {
    const index = filteredImages.findIndex(img => img.id === imageId);
    setCurrentImageIndex(index);
    setSelectedImageId(imageId);
  };

  const handleNext = () => {
    const nextIndex = (currentImageIndex + 1) % filteredImages.length;
    setCurrentImageIndex(nextIndex);
    setSelectedImageId(filteredImages[nextIndex].id);
  };

  const handlePrev = () => {
    const prevIndex = currentImageIndex === 0 ? filteredImages.length - 1 : currentImageIndex - 1;
    setCurrentImageIndex(prevIndex);
    setSelectedImageId(filteredImages[prevIndex].id);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <GalleryHero />
        <div className="container-custom py-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-300 h-[300px] rounded-2xl"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" ref={galleryRef}>
      <Navbar />
      <GalleryHero />
      
      <div className="container-custom py-20">
        <GalleryFilter 
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        {filteredImages.length > 0 ? (
          <GalleryGrid 
            images={filteredImages.map(img => ({
              id: img.id,
              url: img.image_url,
              alt: img.alt_text || img.title || 'Gallery image'
            }))}
            onImageClick={handleImageClick}
          />
        ) : (
          <EmptyGallery />
        )}
      </div>

      {selectedImage && (
        <ImageLightbox
          imageId={selectedImage.id}
          imageUrl={selectedImage.image_url}
          imageAlt={selectedImage.alt_text || selectedImage.title || 'Gallery image'}
          onClose={() => setSelectedImageId(null)}
          images={filteredImages.map(img => ({
            id: img.id,
            url: img.image_url,
            alt: img.alt_text || img.title || 'Gallery image'
          }))}
          currentIndex={currentImageIndex}
          onNext={handleNext}
          onPrev={handlePrev}
        />
      )}
    </div>
  );
};

export default GalleryPage;
