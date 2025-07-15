
import React from 'react';

interface GalleryImage {
  id: string;
  url: string;
  alt: string;
  category?: string;
}

interface GalleryGridProps {
  images: GalleryImage[];
  onImageClick: (url: string, index: number) => void;
}

const GalleryGrid: React.FC<GalleryGridProps> = ({ images, onImageClick }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {images.map((image, index) => (
        <div 
          key={image.id} 
          className="animate-on-scroll"
        >
          <div 
            className="image-hover rounded-2xl overflow-hidden shadow-md cursor-pointer transition-transform duration-300 hover:shadow-xl"
            onClick={() => onImageClick(image.url, index)}
          >
            <img
              src={image.url}
              alt={image.alt}
              className="w-full h-[300px] md:h-[250px] object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default GalleryGrid;
