
import React, { useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface FullscreenGalleryProps {
  active: boolean;
  images: string[];
  name: string;
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  onSelect: (index: number) => void;
}

const FullscreenGallery: React.FC<FullscreenGalleryProps> = ({
  active,
  images,
  name,
  currentIndex,
  onClose,
  onPrev,
  onNext,
  onSelect,
}) => {
  const isMobile = useIsMobile();
  
  // Listen for escape key to close fullscreen
  useEffect(() => {
    if (!active) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      console.log('FullscreenGallery - Key pressed:', e.key);
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') {
        console.log('FullscreenGallery - Arrow right pressed');
        onNext();
      }
      if (e.key === 'ArrowLeft') {
        console.log('FullscreenGallery - Arrow left pressed');
        onPrev();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onNext, onPrev, active]);

  const handleImageAreaClick = (e: React.MouseEvent) => {
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const imageWidth = rect.width;
    
    console.log('FullscreenGallery - Image area clicked:', { clickX, imageWidth, currentIndex });
    
    // Sol %30'luk alana tıklanırsa önceki resim
    if (clickX < imageWidth * 0.3) {
      console.log('FullscreenGallery - Clicking previous via image area');
      onPrev();
    }
    // Sağ %30'luk alana tıklanırsa sonraki resim  
    else if (clickX > imageWidth * 0.7) {
      console.log('FullscreenGallery - Clicking next via image area');
      onNext();
    }
  };

  const handlePrevClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('FullscreenGallery - Previous button clicked');
    onPrev();
  };

  const handleNextClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('FullscreenGallery - Next button clicked');
    onNext();
  };

  const handleThumbnailClick = (index: number) => {
    console.log('FullscreenGallery - Thumbnail clicked:', index);
    onSelect(index);
  };
  
  // Don't render anything if not active
  if (!active) return null;

  console.log('FullscreenGallery - Rendering:', { 
    active, 
    currentIndex, 
    totalImages: images.length,
    currentImage: images[currentIndex] 
  });
  
  // Using Dialog component which handles backdrop clicks and ESC key automatically
  return (
    <Dialog open={active} onOpenChange={() => onClose()}>
      <DialogContent 
        className="p-0 border-none bg-transparent shadow-none w-full h-full max-w-none m-0 flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="fixed inset-0 bg-black/95 flex flex-col items-center justify-center" onClick={onClose}>
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-10 p-3 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors"
            aria-label="Close fullscreen"
          >
            <X className="w-6 h-6" />
          </button>
          
          {/* Main image container - much bigger now */}
          <div className="relative flex items-center justify-center w-full h-[90vh]">
            <img
              src={images[currentIndex]}
              alt={name}
              className="max-w-[95vw] max-h-[85vh] object-contain cursor-pointer"
              onClick={handleImageAreaClick}
            />
          </div>
          
          {/* Enhanced thumbnails gallery - reduced height */}
          {images.length > 1 && (
            <div className="w-full max-w-[90vw] mt-2 overflow-x-auto" onClick={(e) => e.stopPropagation()}>
              <div className="flex space-x-3 min-w-max px-4 pb-2 justify-center">
                {images.map((image, index) => (
                  <div 
                    key={index} 
                    className={`relative cursor-pointer transition-all duration-300 ${
                      index === currentIndex 
                        ? 'ring-3 ring-therma ring-offset-2 ring-offset-black scale-110' 
                        : 'opacity-60 hover:opacity-90 hover:scale-105'
                    }`}
                    onClick={() => handleThumbnailClick(index)}
                  >
                    <img 
                      src={image} 
                      alt={`${name} thumbnail ${index + 1}`} 
                      className="w-16 h-12 object-cover rounded-lg" 
                    />
                    {/* Active indicator */}
                    {index === currentIndex && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-therma rounded-full border-2 border-black"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Enhanced navigation buttons */}
          {images.length > 1 && (
            <>
              <button
                onClick={handlePrevClick}
                className="absolute left-6 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-all duration-200"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={handleNextClick}
                className="absolute right-6 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-all duration-200"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}
          
          {/* Enhanced image counter - smaller and positioned lower */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/60 backdrop-blur-sm text-white py-1 px-3 rounded-full text-xs font-medium" onClick={(e) => e.stopPropagation()}>
            {currentIndex + 1} of {images.length}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FullscreenGallery;
