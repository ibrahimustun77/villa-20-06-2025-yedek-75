
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageLightboxProps {
  imageId: string;
  imageUrl: string;
  imageAlt: string;
  onClose: () => void;
  images?: Array<{id: string; url: string; alt: string}>;
  currentIndex?: number;
  onNext?: () => void;
  onPrev?: () => void;
}

const ImageLightbox: React.FC<ImageLightboxProps> = ({ 
  imageId, 
  imageUrl, 
  imageAlt, 
  onClose, 
  images = [], 
  currentIndex = 0, 
  onNext, 
  onPrev 
}) => {
  return (
    <div 
      className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="relative animate-zoom-in max-w-4xl max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
        <button 
          className="absolute top-4 right-4 text-white p-2 rounded-full bg-black/30 hover:bg-black/50 transition-colors z-10"
          onClick={onClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6 6 18"></path>
            <path d="m6 6 12 12"></path>
          </svg>
        </button>
        
        <img 
          src={imageUrl} 
          alt={imageAlt} 
          className="max-h-[80vh] max-w-full rounded-lg"
        />
        
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onPrev?.();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onNext?.();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}
        
        <div className="bg-black/60 backdrop-blur-sm text-white p-4 absolute bottom-0 left-0 right-0 rounded-b-lg">
          <div className="font-medium mb-1">{imageAlt}</div>
          {images.length > 1 && (
            <div className="text-sm opacity-75">
              {currentIndex + 1} / {images.length}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageLightbox;
