
import React from 'react';
import { SitePlanVilla } from '@/hooks/useVillaPageData';
import { VillaType } from '@/services/villaService';
import VillaTypeSelector from './VillaTypeSelector';
import VillaDetails from './VillaDetails';
import VillaMapSection from './VillaMapSection';
import ContactSection from './ContactSection';

// Villa data helper functions - SEÇİLİ VILLA TİPİNE AİT TÜM VİLLALARI DÖNDÜR
const getSelectedVillaTypeData = (villaTypes: any[], villas: any[], activeVilla: string) => {
  console.log('=== VillaPageContent Debug ===');
  console.log('Getting villa type data for activeVilla:', activeVilla);
  console.log('Available villa types:', villaTypes.map(vt => ({ id: vt.id, name: vt.name })));
  console.log('Available villas:', villas.map(v => ({ id: v.id, villa_type_id: v.villa_type_id, name: v.name })));
  
  const villaType = villaTypes.find(vt => vt.id === activeVilla);
  
  if (!villaType) {
    console.log('Villa type not found for:', activeVilla);
    return null;
  }
  
  // Bu villa tipine ait TÜM villaları bul
  const villasOfType = villas.filter(v => v.villa_type_id === activeVilla);
  
  console.log('Found villas of type:', villasOfType);
  
  const result = {
    villa_type: villaType,
    villas: villasOfType
  };
  
  console.log('Final villa type data:', result);
  console.log('=== End VillaPageContent Debug ===');
  
  return result;
};

const getDefaultVillaData = () => {
  return {
    villa_type: {
      id: '',
      name: 'Villa Seçiniz',
      description: 'Lütfen bir villa tipi seçiniz.'
    },
    villas: []
  };
};

interface VillaPageContentProps {
  villaTypes: VillaType[];
  activeVilla: string;
  onSelectVilla: (villaId: string) => void;
  selectedVillaNumber: number | null;
  setSelectedVillaNumber: (number: number | null) => void;
  sitePlanVillas: SitePlanVilla[];
  villas: any[];
  onViewVillaDetails: (villa: SitePlanVilla) => void;
}

const VillaPageContent: React.FC<VillaPageContentProps> = ({
  villaTypes,
  activeVilla,
  onSelectVilla,
  selectedVillaNumber,
  setSelectedVillaNumber,
  sitePlanVillas,
  villas,
  onViewVillaDetails
}) => {
  const selectedVillaData = getSelectedVillaTypeData(villaTypes, villas, activeVilla) || getDefaultVillaData();

  console.log('VillaPageContent rendering with selectedVillaData:', selectedVillaData);

  return (
    <section id="villa-content-section" className="py-16 px-6">
      <div className="container-custom">
        {/* Villa Type Selector Component - this should be visible immediately */}
        <VillaTypeSelector 
          villaTypes={villaTypes}
          activeVilla={activeVilla}
          onSelect={onSelectVilla}
        />
        
        {/* Villa Details Component - make sure this gets animated immediately */}
        <VillaDetails villaData={selectedVillaData} />
        
        {/* Villa Map Section Component - enhance border visibility */}
        <VillaMapSection
          villas={villas}
          villaTypes={villaTypes}
          activeVilla={activeVilla}
          setActiveVilla={onSelectVilla}
          sitePlanVillas={sitePlanVillas}
          selectedVillaNumber={selectedVillaNumber}
          setSelectedVillaNumber={setSelectedVillaNumber}
          isMobile={false}
          onMobileVillaClick={onViewVillaDetails}
        />
        
        {/* Contact Section Component */}
        <ContactSection />
      </div>
    </section>
  );
};

export default VillaPageContent;
