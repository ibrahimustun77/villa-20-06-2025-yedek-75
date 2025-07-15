
import React from 'react';

interface SitePlanVilla {
  id: number;
  type: string;
  x: number;
  y: number;
  villa_id: string;
  name: string;
}

interface Villa {
  id: string;
  square_meters: number;
  bedrooms: number;
}

interface VillaType {
  id: string;
  name: string;
}

interface VillaPopupProps {
  selectedVillaNumber: number | null;
  sitePlanVillas: SitePlanVilla[];
  villaTypes: VillaType[];
  villas: Villa[];
  onClose: () => void;
  onViewDetails: (villa: SitePlanVilla) => void;
}

const VillaPopup: React.FC<VillaPopupProps> = ({
  selectedVillaNumber,
  sitePlanVillas,
  villaTypes,
  villas,
  onClose,
  onViewDetails
}) => {
  if (!selectedVillaNumber) return null;

  const villa = sitePlanVillas.find(v => v.id === selectedVillaNumber);
  const villaType = villaTypes.find(type => type.id === villa?.type);
  const villaDetails = villas.find(v => v.id === villa?.villa_id);

  if (!villa) return null;

  return (
    <div className="absolute bottom-4 left-4 glass-card p-4 rounded-xl max-w-xs animate-fade-in z-40">
      <div className="flex justify-between items-start mb-2">
        <div className="font-bold">{`Villa ${selectedVillaNumber}`}</div>
        <button 
          className="text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4"
          >
            <path d="M18 6 6 18"></path>
            <path d="m6 6 12 12"></path>
          </svg>
        </button>
      </div>
      
      <div className="text-sm text-gray-600 mb-1">{villaType?.name}</div>
      <div className="text-sm text-gray-600 mb-1">Koordinatlar: x:{villa.x}, y:{villa.y}</div>
      <div className="text-sm text-gray-600 mb-2">
        {villaDetails?.square_meters}m² - {villaDetails?.bedrooms} Yatak Odası
      </div>
      <button 
        className="text-therma text-sm font-medium"
        onClick={() => onViewDetails(villa)}
      >
        Detayları Görüntüle →
      </button>
    </div>
  );
};

export default VillaPopup;
