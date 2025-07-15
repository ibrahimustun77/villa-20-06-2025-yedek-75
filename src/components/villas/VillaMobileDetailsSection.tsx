
import React from 'react';
import MobileVillaDetails from './MobileVillaDetails';
import { Villa, VillaType } from '@/services/types';

interface SitePlanVilla {
  id: number;
  type: string;
  x: number;
  y: number;
  villa_id: string;
  name: string;
}

interface VillaMobileDetailsSectionProps {
  isMobile: boolean;
  mobileVillaDetails: SitePlanVilla | null;
  villaTypes: VillaType[];
  villas: Villa[];
  onClose: () => void;
  onViewDetails: (villa: SitePlanVilla) => void;
}

const VillaMobileDetailsSection: React.FC<VillaMobileDetailsSectionProps> = ({
  isMobile,
  mobileVillaDetails,
  villaTypes,
  villas,
  onClose,
  onViewDetails
}) => {
  if (!isMobile) return null;

  return (
    <div id="mobile-villa-details" className="mt-6 pt-6 mb-12 animate-on-scroll">
      <MobileVillaDetails
        mobileVillaDetails={mobileVillaDetails}
        villaTypes={villaTypes}
        villas={villas}
        onClose={onClose}
        onViewDetails={onViewDetails}
      />
    </div>
  );
};

export default VillaMobileDetailsSection;
