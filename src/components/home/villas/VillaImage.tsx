
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface VillaImageProps {
  images: string[];
  currentIndex: number;
  onNext: () => void;
  onPrev: () => void;
  onOpenFullscreen: () => void;
  name: string;
}

const VillaImage: React.FC<VillaImageProps> = ({
  images,
  currentIndex,
  onNext,
  onPrev,
  onOpenFullscreen,
  name
}) => {
  const handleImageClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const imageWidth = rect.width;
    
    console.log('VillaImage - Image clicked:', { clickX, imageWidth, currentIndex, totalImages: images.length });
    
    // Sol %30'luk alana tıklanırsa önceki resim
    if (clickX < imageWidth * 0.3) {
      console.log('VillaImage - Clicking previous image');
      onPrev();
    }
    // Sağ %30'luk alana tıklanırsa sonraki resim  
    else if (clickX > imageWidth * 0.7) {
      console.log('VillaImage - Clicking next image');
      onNext();
    }
    // Orta %40'lık alana tıklanırsa fullscreen aç
    else {
      console.log('VillaImage - Opening fullscreen');
      onOpenFullscreen();
    }
  };

  const handlePrevClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('VillaImage - Previous button clicked, current index:', currentIndex);
    onPrev();
  };

  const handleNextClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('VillaImage - Next button clicked, current index:', currentIndex);
    onNext();
  };

  // Ensure currentIndex is within bounds
  const safeCurrentIndex = Math.max(0, Math.min(currentIndex, images.length - 1));
  const currentImage = images.length > 0 ? images[safeCurrentIndex] : '/placeholder.svg';
  const hasMultipleImages = images.length > 1;

  console.log('VillaImage - Render:', { 
    totalImages: images.length, 
    currentIndex: safeCurrentIndex, 
    hasMultipleImages,
    currentImage: currentImage.substring(0, 50) + '...' // Truncate for logging
  });

  return (
    <div className="relative group">
      <div 
        className="relative w-full h-64 overflow-hidden rounded-lg cursor-pointer"
        onClick={handleImageClick}
      >
        <img
          src={currentImage}
          alt={`${name} - Image ${safeCurrentIndex + 1}`}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          loading="eager"
          fetchPriority="high"
          decoding="async"
          onError={(e) => {
            console.log('VillaImage - Image load error:', currentImage);
            (e.target as HTMLImageElement).src = '/placeholder.svg';
          }}
        />
        
        {/* Improved image indicators with better visibility */}
        {hasMultipleImages && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {images.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 border-2 ${
                  index === safeCurrentIndex 
                    ? 'bg-white border-therma scale-110 shadow-lg' 
                    : 'bg-white/60 border-white/80 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        )}

        {/* Navigation overlay areas with visual feedback */}
        {hasMultipleImages && (
          <>
            <div 
              className="absolute left-0 top-0 w-[30%] h-full cursor-pointer opacity-0 hover:opacity-20 bg-gradient-to-r from-black/50 to-transparent transition-opacity duration-200"
              onClick={handlePrevClick}
            />
            <div 
              className="absolute right-0 top-0 w-[30%] h-full cursor-pointer opacity-0 hover:opacity-20 bg-gradient-to-l from-black/50 to-transparent transition-opacity duration-200"
              onClick={handleNextClick}
            />
          </>
        )}
      </div>
      
      {/* Enhanced navigation buttons with better visibility */}
      {hasMultipleImages && (
        <>
          <button
            onClick={handlePrevClick}
            className="absolute left-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/90 text-gray-800 hover:bg-white hover:text-therma transition-all duration-200 opacity-0 group-hover:opacity-100 shadow-lg backdrop-blur-sm z-10"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNextClick}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/90 text-gray-800 hover:bg-white hover:text-therma transition-all duration-200 opacity-0 group-hover:opacity-100 shadow-lg backdrop-blur-sm z-10"
            aria-label="Next image"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}

      {/* Image counter for better user feedback */}
      {hasMultipleImages && (
        <div className="absolute top-3 right-3 px-2 py-1 rounded-full bg-black/60 text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          {safeCurrentIndex + 1} / {images.length}
        </div>
      )}
    </div>
  );
};

export default VillaImage;
