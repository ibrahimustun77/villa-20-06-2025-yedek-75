
import React from 'react';
import { Villa, VillaType } from '@/services/types';
import VillaMapContainer from './VillaMapContainer';
import VillaMapSectionHeader from './VillaMapSectionHeader';

interface SitePlanVilla {
  id: number;
  type: string;
  x: number;
  y: number;
  villa_id: string;
  name: string;
}

interface VillaMapSectionProps {
  selectedVillaNumber: number | null;
  setSelectedVillaNumber: (id: number | null) => void;
  activeVilla: string;
  setActiveVilla: (id: string) => void;
  sitePlanVillas: SitePlanVilla[];
  villaTypes: VillaType[];
  villas: Villa[];
  isMobile: boolean;
  onMobileVillaClick: (villa: SitePlanVilla) => void;
}

const VillaMapSection: React.FC<VillaMapSectionProps> = ({
  selectedVillaNumber,
  setSelectedVillaNumber,
  activeVilla,
  setActiveVilla,
  sitePlanVillas,
  villaTypes,
  villas,
  isMobile,
  onMobileVillaClick
}) => {
  return (
    <div className="mb-8 animate-on-scroll" style={{ animationDelay: '300ms' }}>
      <VillaMapSectionHeader totalVillas={sitePlanVillas.length} />
      <VillaMapContainer
        selectedVillaNumber={selectedVillaNumber}
        setSelectedVillaNumber={setSelectedVillaNumber}
        activeVilla={activeVilla}
        setActiveVilla={setActiveVilla}
        sitePlanVillas={sitePlanVillas}
        villaTypes={villaTypes}
        villas={villas}
        isMobile={isMobile}
        onMobileVillaClick={onMobileVillaClick}
        filteredVillaType={null}
        backgroundImage={null}
        roads={[]}
        onVillaClick={onMobileVillaClick}
        onVillaSelect={setSelectedVillaNumber}
      />
    </div>
  );
};

export default VillaMapSection;
