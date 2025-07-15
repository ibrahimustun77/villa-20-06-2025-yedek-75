
import React from 'react';

interface VillaType {
  id: string;
  name: string;
  color?: string;
}

interface SitePlanVilla {
  id: number;
  type: string;
  x: number;
  y: number;
  villa_id: string;
  name: string;
}

interface VillaMapLegendProps {
  villaTypes: VillaType[];
  sitePlanVillas: SitePlanVilla[];
  filteredVillaType: string | null;
  onFilterByType: (type: string | null) => void;
}

const VillaMapLegend: React.FC<VillaMapLegendProps> = ({
  villaTypes,
  sitePlanVillas,
  filteredVillaType,
  onFilterByType
}) => {
  return (
    <div className="mt-4 glass-card p-4 rounded-xl animate-on-scroll">
      <div className="text-sm font-medium mb-2">Villa Tipleri</div>
      <div className="flex flex-wrap gap-4">
        {villaTypes.map((type) => {
          const isFiltered = filteredVillaType === type.id;
          
          // Map villa'da bu villa tipinin kaç tane olduğunu say
          const villaCount = sitePlanVillas.filter(villa => villa.type === type.id).length;
          
          return (
            <button
              key={type.id}
              onClick={() => onFilterByType(isFiltered ? null : type.id)}
              className={`flex items-center hover:bg-gray-100 p-2 rounded transition-colors ${
                isFiltered ? 'bg-gray-100 ring-1 ring-therma/30' : ''
              }`}
            >
              <div 
                className={`w-4 h-4 rounded-full mr-2 ${
                  isFiltered 
                    ? 'ring-2 ring-offset-1 ring-therma' 
                    : ''
                }`}
                style={{ backgroundColor: type.color || '#e94560' }}
              ></div>
              <span className={`text-sm ${isFiltered ? 'font-bold' : ''}`}>
                {type.name} ({villaCount})
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default VillaMapLegend;
