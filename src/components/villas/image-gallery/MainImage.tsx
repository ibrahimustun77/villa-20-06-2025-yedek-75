
import React from 'react';
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

interface MainImageProps {
  imageUrl: string;
  name: string;
  currentIndex: number;
  totalImages: number;
  onPrev: () => void;
  onNext: () => void;
  onOpenFullscreen: () => void;
}

const MainImage: React.FC<MainImageProps> = ({
  imageUrl,
  name,
  currentIndex,
  totalImages,
  onPrev,
  onNext,
  onOpenFullscreen,
}) => {
  return (
    <div className="relative">
      <div 
        className="image-hover rounded-2xl overflow-hidden shadow-2xl cursor-pointer"
        onClick={onOpenFullscreen}
      >
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-[350px] md:h-[500px] object-cover transition-all duration-700"
        />
      </div>
      
      {totalImages > 1 && (
        <>
          <div className="absolute inset-0 flex items-center justify-between px-4">
            <button
              onClick={(e) => { e.stopPropagation(); onPrev(); }}
              className="p-2 rounded-full bg-black/20 backdrop-blur-sm text-white hover:bg-black/40 transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onNext(); }}
              className="p-2 rounded-full bg-black/20 backdrop-blur-sm text-white hover:bg-black/40 transition-colors"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
          
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
            {Array.from({ length: totalImages }, (_, index) => (
              <button
                key={index}
                onClick={(e) => { e.stopPropagation(); /* Will be handled in parent */ }}
                className={`w-2 h-2 rounded-full mx-1 ${
                  index === currentIndex ? 'bg-white' : 'bg-white/50'
                }`}
                aria-label={`Image ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
      
      <div className="absolute top-6 left-6 glass-card p-4 rounded-xl">
        <h3 className="font-bold text-xl text-therma">{name}</h3>
      </div>
      
      <button 
        onClick={onOpenFullscreen}
        className="absolute top-6 right-6 p-3 rounded-full bg-black/20 backdrop-blur-sm text-white hover:bg-black/40 transition-colors"
        aria-label="View fullscreen"
      >
        <Maximize2 className="w-5 h-5" />
      </button>
    </div>
  );
};

export default MainImage;
