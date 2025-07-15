
import React from 'react';
import { Link } from 'react-router-dom';
import { VillaType } from '@/services/types';
import VillaFeatures from './VillaFeatures';
import VillaPriceSection from './VillaPriceSection';
import VillaPropertiesGrid from './VillaPropertiesGrid';

interface VillaCardProps {
  villaType?: VillaType;
  displayBedrooms: number;
  displayBathrooms: number;
  displayLivingRooms: number;
  displayHalls: number;
  displayFeatures: string[];
  actualVilla?: {
    id?: string;
    bedrooms?: number;
    bathrooms?: number;
    living_rooms?: number;
    halls?: number;
    features?: string[];
    feature_groups?: any[];
    image_urls?: string[];
    price?: number;
    dynamic_rooms?: any[];
  };
  isHomepage?: boolean;
}

const VillaCard: React.FC<VillaCardProps> = ({
  villaType,
  displayBedrooms,
  displayBathrooms,
  displayLivingRooms,
  displayHalls,
  displayFeatures,
  actualVilla,
  isHomepage = true
}) => {
  // Always use actual villa data if available (this now comes from database with proper sync)
  const bedrooms = actualVilla?.bedrooms ?? displayBedrooms;
  const bathrooms = actualVilla?.bathrooms ?? displayBathrooms;
  const livingRooms = actualVilla?.living_rooms ?? displayLivingRooms;
  const halls = actualVilla?.halls ?? displayHalls;
    
  // Features için mevcut kodları koru
  const featureGroups = actualVilla?.feature_groups;
  const features = isHomepage 
    ? displayFeatures 
    : actualVilla?.features || displayFeatures;

  console.log('VillaCard - using room counts:', {
    bedrooms,
    bathrooms,
    livingRooms,
    halls,
    villaId: actualVilla?.id
  });

  const handleDetailClick = () => {
    if (isHomepage) {
      // Anasayfadaysa villalar sayfasına villa type ile yönlendir
      const villaTypeId = villaType?.id;
      if (villaTypeId) {
        window.location.href = `/villalar?villa=${villaTypeId}`;
      } else {
        window.location.href = '/villalar';
      }
    } else {
      // Villalar sayfasındaysa WhatsApp'a yönlendir
      const villaName = villaType?.name || 'Villa';
      const message = `Merhabalar ${villaName} hakkında bilgi almak istiyorum`;
      const phoneNumber = "905318423477";
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    }
  };

  return (
    <div className="glass-card p-6 md:p-8 rounded-2xl">
      <div className="flex justify-between items-start mb-4 md:mb-6">
        <h3 className="text-xl md:text-2xl font-bold">
          {villaType?.name || 'Villa'} Özellikleri
        </h3>
        
        <VillaPriceSection 
          villaType={villaType}
          actualVilla={actualVilla}
          isHomepage={isHomepage}
        />
      </div>
      
      {/* Now consistently using synchronized room data */}
      <VillaPropertiesGrid 
        bedrooms={bedrooms}
        bathrooms={bathrooms}
        livingRooms={livingRooms}
        halls={halls}
        dynamicRooms={actualVilla?.dynamic_rooms || []}
        villaId={actualVilla?.id}
      />
      
      {/* Features korundu */}
      <VillaFeatures 
        features={features} 
        featureGroups={featureGroups}
      />
      
      <div className="flex justify-center">
        <button
          onClick={handleDetailClick}
          className="button-primary text-center text-sm md:text-base px-6 py-3"
        >
          Detaylı Bilgi
        </button>
      </div>
    </div>
  );
};

export default VillaCard;
