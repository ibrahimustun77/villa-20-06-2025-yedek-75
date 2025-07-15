
import React from 'react';

interface MapBackgroundProps {
  backgroundImage: string | null;
}

const MapBackground: React.FC<MapBackgroundProps> = ({ backgroundImage }) => {
  return (
    <>
      {backgroundImage && (
        <div className="absolute inset-0 z-0">
          <img 
            src={backgroundImage} 
            alt="Harita arka planı" 
            className="w-full h-full object-cover opacity-70"
          />
        </div>
      )}
    </>
  );
};

export default MapBackground;
