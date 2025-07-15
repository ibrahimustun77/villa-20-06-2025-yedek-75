
import React from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface FullscreenImageProps {
  selectedImage: string | null;
  currentImageIndex: number;
  images: {url: string; alt: string}[];
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  onThumbnailClick: (index: number) => void;
}

const FullscreenImage: React.FC<FullscreenImageProps> = ({
  selectedImage,
  currentImageIndex,
  images,
  onClose,
  onNext,
  onPrev,
  onThumbnailClick
}) => {
  if (!selectedImage) return null;
  
  return (
    <div 
      className="fixed inset-0 bg-black/95 z-50 flex flex-col items-center justify-center p-4"
      onClick={onClose} // Close when clicking on the background
    >
      <div className="absolute top-4 right-4 z-10">
        <button
          onClick={onClose}
          className="p-3 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors"
          aria-label="Close fullscreen"
        >
          <X className="w-6 h-6" />
        </button>
      </div>
      
      <div className="relative w-full h-[70vh] px-4" onClick={(e) => e.stopPropagation()}>
        <img
          src={selectedImage}
          alt={images[currentImageIndex]?.alt}
          className="w-full h-full object-contain"
        />
        
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onPrev();
              }}
              className="absolute left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onNext();
              }}
              className="absolute right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}
      </div>
      
      {images.length > 1 && (
        <div className="mt-6" onClick={(e) => e.stopPropagation()}>
          <Carousel className="w-[90vw] max-w-3xl">
            <CarouselContent>
              {images.map((image, index) => (
                <CarouselItem key={index} className="basis-1/6 md:basis-1/8">
                  <div 
                    className={`relative rounded-md overflow-hidden cursor-pointer border-2 ${
                      index === currentImageIndex ? 'border-white' : 'border-transparent'
                    }`}
                    onClick={(e) => { 
                      e.stopPropagation(); 
                      onThumbnailClick(index);
                    }}
                  >
                    <img 
                      src={image.url} 
                      alt={image.alt} 
                      className="w-full h-16 object-cover" 
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/40 text-white hover:bg-black/60" />
            <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/40 text-white hover:bg-black/60" />
          </Carousel>
        </div>
      )}
      
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 glass-card py-1 px-4 rounded-full" onClick={(e) => e.stopPropagation()}>
        <p className="text-white">
          {currentImageIndex + 1} / {images.length}
        </p>
      </div>
    </div>
  );
};

export default FullscreenImage;
