import React, { useRef, useEffect } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface ThumbnailGalleryProps {
  images: string[];
  name: string;
  currentIndex: number;
  onSelect: (index: number) => void;
}

const ThumbnailGallery: React.FC<ThumbnailGalleryProps> = ({
  images,
  name,
  currentIndex,
  onSelect,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  // Auto scroll to keep active thumbnail visible
  useEffect(() => {
    if (!scrollContainerRef.current) return;
    
    const container = scrollContainerRef.current;
    const activeThumb = container.children[currentIndex] as HTMLElement;
    
    if (!activeThumb) return;
    
    // Calculate position to center the active thumbnail
    const containerWidth = container.offsetWidth;
    const thumbLeft = activeThumb.offsetLeft;
    const thumbWidth = activeThumb.offsetWidth;
    const scrollLeft = thumbLeft - containerWidth / 2 + thumbWidth / 2;
    
    // Smooth scroll to the calculated position
    container.scrollTo({
      left: scrollLeft,
      behavior: 'smooth',
    });
  }, [currentIndex]);
  
  if (images.length <= 1) return null;
  
  return (
    <div className="mt-4 relative">
      <div className="overflow-x-auto pb-2">
        <div 
          className="flex space-x-2 min-w-max"
          ref={scrollContainerRef}
        >
          {images.map((image, index) => (
            <div 
              key={index} 
              className={`relative cursor-pointer transition-all ${
                index === currentIndex 
                  ? 'ring-2 ring-therma ring-offset-2' 
                  : 'opacity-70 hover:opacity-100'
              }`}
              onClick={() => onSelect(index)}
            >
              <img 
                src={image} 
                alt={`${name} thumbnail ${index + 1}`} 
                className="w-16 h-16 md:w-20 md:h-20 object-cover rounded" 
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ThumbnailGallery;
