
import React from 'react';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface SitePlanVilla {
  id: number;
  type: string;
  x: number;
  y: number;
  villa_id: string;
  name: string;
}

interface VillaType {
  id: string;
  name: string;
  color?: string;
}

interface VillaMapContainerProps {
  selectedVillaNumber: number | null;
  setSelectedVillaNumber: (id: number | null) => void;
  activeVilla: string;
  setActiveVilla: (id: string) => void;
  sitePlanVillas: SitePlanVilla[];
  villaTypes: VillaType[];
  villas: any[];
  isMobile: boolean;
  onMobileVillaClick: (villa: SitePlanVilla) => void;
  filteredVillaType: string | null;
  backgroundImage: string | null;
  roads: any[];
  onVillaClick: (villa: SitePlanVilla) => void;
  onVillaSelect: (id: number) => void;
}

const VillaMapContainer: React.FC<VillaMapContainerProps> = ({
  sitePlanVillas,
  villaTypes,
  activeVilla,
  filteredVillaType,
  selectedVillaNumber,
  setSelectedVillaNumber,
  backgroundImage,
  roads,
  isMobile,
  onVillaClick,
  onVillaSelect
}) => {
  // Villa tipine göre renk bul
  const getVillaColor = (villaType: string) => {
    const type = villaTypes.find(vt => vt.id === villaType);
    return type?.color || '#e94560';
  };

  return (
    <div className="relative rounded-xl overflow-hidden">
      <AspectRatio ratio={16/9} className="w-full">
        <div className="absolute inset-0 bg-therma-beige/50">
          {backgroundImage && (
            <div className="absolute inset-0 z-0">
              <img 
                src={backgroundImage} 
                alt="Harita arka planı" 
                className="w-full h-full object-cover opacity-70"
              />
            </div>
          )}
          
          {/* Roads */}
          {roads.map(road => {
            const endValue = road.end_pos !== undefined ? road.end_pos : road.end;
            const startValue = road.start_pos !== undefined ? road.start_pos : road.start;
            const length = endValue - startValue;
            
            return (
              <div 
                key={`road-${road.id}`}
                className="absolute bg-gray-400/70 z-20"
                style={{
                  ...(road.orientation === 'horizontal' 
                    ? {
                        top: `${road.position}%`,
                        left: `${startValue}%`,
                        width: `${length}%`,
                        height: `${road.thickness || 8}px`,
                        transform: 'translateY(-50%)'
                      } 
                    : {
                        left: `${road.position}%`,
                        top: `${startValue}%`,
                        height: `${length}%`,
                        width: `${road.thickness || 8}px`,
                        transform: 'translateX(-50%)'
                      }
                  )
                }}
              ></div>
            );
          })}
          
          {/* Villas */}
          {sitePlanVillas.map((villa) => {
            const showVilla = filteredVillaType === null || villa.type === filteredVillaType;
            
            let bgColor = 'bg-white';
            let opacity = showVilla ? '1' : '0.3';
            
            if (selectedVillaNumber === villa.id) {
              bgColor = 'bg-therma';
            } else if (activeVilla === villa.type || filteredVillaType === villa.type) {
              // Dinamik renk kullan
              const villaColor = getVillaColor(villa.type);
              bgColor = '';
            }
            
            const textColor = (selectedVillaNumber === villa.id || activeVilla === villa.type || filteredVillaType === villa.type) ? 'text-white' : 'text-gray-500';
            const villaBgColor = selectedVillaNumber === villa.id ? '#e94560' : 
                               (activeVilla === villa.type || filteredVillaType === villa.type) ? getVillaColor(villa.type) : 
                               '#ffffff';
            
            return (
              <button
                key={villa.id}
                className={`absolute w-8 h-8 md:w-8 md:h-8 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 transform z-30 ${
                  selectedVillaNumber === villa.id 
                    ? 'scale-110 z-10' 
                    : ''
                } ${textColor}`}
                style={{ 
                  top: `${villa.y}%`, 
                  left: `${villa.x}%`,
                  opacity: opacity,
                  transform: 'translate(-50%, -50%)',
                  backgroundColor: villaBgColor
                }}
                onClick={() => isMobile ? onVillaClick(villa) : onVillaSelect(villa.id)}
              >
                {villa.id}
              </button>
            );
          })}
        </div>
      </AspectRatio>
    </div>
  );
};

export default VillaMapContainer;
