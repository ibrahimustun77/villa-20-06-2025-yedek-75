
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface VillaDetailGalleryProps {
  images: string[];
}

const VillaDetailGallery: React.FC<VillaDetailGalleryProps> = ({ images }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  if (!images || images.length === 0) return null;

  const openLightbox = (index: number) => {
    setSelectedImageIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImageIndex(null);
  };

  const nextImage = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex + 1) % images.length);
    }
  };

  const prevImage = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex - 1 + images.length) % images.length);
    }
  };

  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeLightbox();
    }
  };

  const handleImageAreaClick = (e: React.MouseEvent) => {
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const imageWidth = rect.width;
    
    // Sol %30'luk alana tıklanırsa önceki resim
    if (clickX < imageWidth * 0.3) {
      prevImage();
    }
    // Sağ %30'luk alana tıklanırsa sonraki resim  
    else if (clickX > imageWidth * 0.7) {
      nextImage();
    }
  };

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4">İç Galeri</h3>
      
      {/* Gallery Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <div
            key={index}
            className="aspect-square cursor-pointer overflow-hidden rounded-lg border hover:shadow-lg transition-shadow"
            onClick={() => openLightbox(index)}
          >
            <img
              src={image}
              alt={`Villa detail ${index + 1}`}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedImageIndex !== null && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center"
          onClick={handleBackgroundClick}
        >
          <div className="relative max-w-4xl max-h-full p-4">
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
            >
              <X size={24} />
            </button>

            {/* Navigation Buttons */}
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10"
                >
                  <ChevronLeft size={32} />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10"
                >
                  <ChevronRight size={32} />
                </button>
              </>
            )}

            {/* Image with click navigation */}
            <img
              src={images[selectedImageIndex]}
              alt={`Villa detail ${selectedImageIndex + 1}`}
              className="max-w-full max-h-full object-contain cursor-pointer"
              onClick={handleImageAreaClick}
            />

            {/* Image Counter */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white bg-black bg-opacity-50 px-3 py-1 rounded">
              {selectedImageIndex + 1} / {images.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VillaDetailGallery;
