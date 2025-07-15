
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
  bedrooms: number;
  bathrooms: number;
  living_rooms: number;
  halls: number;
  description?: string;
}

interface VillaType {
  id: string;
  name: string;
  description?: string;
}

interface MobileVillaDetailsProps {
  mobileVillaDetails: SitePlanVilla | null;
  villaTypes: VillaType[];
  villas: Villa[];
  onClose: () => void;
  onViewDetails: (villa: SitePlanVilla) => void;
}

const MobileVillaDetails: React.FC<MobileVillaDetailsProps> = ({
  mobileVillaDetails,
  villaTypes,
  villas,
  onClose,
  onViewDetails
}) => {
  if (!mobileVillaDetails) {
    return (
      <div className="text-center py-6 glass-card rounded-2xl">
        <div className="text-therma text-lg font-medium mb-2">Villa Seçimi</div>
        <p className="text-gray-600">
          Haritadan bir villa seçerek detaylarını görüntüleyebilirsiniz.
        </p>
      </div>
    );
  }

  const villa = mobileVillaDetails;
  const villaType = villaTypes.find(type => type.id === villa.type);
  const villaDetails = villas.find(v => v.id === villa.villa_id);

  return (
    <div className="glass-card p-6 rounded-2xl">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold mb-1">{`Villa ${villa.id}`}</h3>
          <h4 className="text-lg text-therma font-medium mb-1">{villaType?.name}</h4>
        </div>
        <button 
          className="text-gray-500 hover:text-gray-700 p-2"
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
            className="w-5 h-5"
          >
            <path d="M18 6 6 18"></path>
            <path d="m6 6 12 12"></path>
          </svg>
        </button>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center bg-white/70 p-3 rounded-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5 text-therma mr-2"
          >
            <path d="M2 22v-5h20v5" />
            <path d="M18 11V2H6v9" />
            <path d="M2 16h20" />
            <path d="M14 7h-4" />
          </svg>
          <div>
            <p className="text-xs text-gray-500">Yatak Odası</p>
            <p className="font-medium">{villaDetails?.bedrooms || 0}</p>
          </div>
        </div>
        
        <div className="flex items-center bg-white/70 p-3 rounded-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5 text-therma mr-2"
          >
            <path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1-.5C4.683 3 4 3.683 4 4.5V17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5" />
            <line x1="10" x2="8" y1="5" y2="7" />
            <line x1="2" x2="22" y1="12" y2="12" />
            <line x1="7" x2="7" y1="19" y2="21" />
            <line x1="17" x2="17" y1="19" y2="21" />
          </svg>
          <div>
            <p className="text-xs text-gray-500">Banyo</p>
            <p className="font-medium">{villaDetails?.bathrooms || 0}</p>
          </div>
        </div>
      </div>
      
      <div className="mb-4">
        <div className="text-sm text-gray-600 mb-2">
          {villaDetails?.description || villaType?.description}
        </div>
      </div>
      
      <button 
        onClick={() => onViewDetails(villa)}
        className="w-full py-3 rounded-lg bg-therma text-white font-medium hover:bg-therma-dark transition-colors"
      >
        Tüm Detayları Görüntüle
      </button>
    </div>
  );
};

export default MobileVillaDetails;
