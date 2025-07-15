
import React from 'react';

interface GalleryImage {
  id: string;
  url: string;
  alt: string;
}

interface GalleryGridProps {
  images: GalleryImage[];
  onImageClick: (id: string) => void;
}

const GalleryGrid: React.FC<GalleryGridProps> = ({ images, onImageClick }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {images.map((image) => (
        <div 
          key={image.id} 
          className="animate-on-scroll animate"
          onClick={() => onImageClick(image.id)}
        >
          <div className="image-hover rounded-2xl overflow-hidden shadow-md cursor-pointer transition-transform duration-300 hover:shadow-xl relative">
            <img
              src={image.url}
              alt={image.alt}
              className="w-full h-[300px] object-cover"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 hover:opacity-100">
              <div className="p-2 rounded-full bg-white/20 backdrop-blur-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-6 h-6 text-white"
                >
                  <path d="M15 3h6v6" />
                  <path d="M10 14 21 3" />
                  <path d="M9 21H3v-6" />
                  <path d="M14 10 3 21" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GalleryGrid;
