
import React from 'react';
import VillaDescription from './VillaDescription';
import VillaCard from '../home/villas/VillaCard';
import VillaDetailGallery from './VillaDetailGallery';

interface VillaDetailsContentProps {
  villaType: any;
  selectedVilla: any;
  villaCardImages: string[];
  bedrooms: number;
  bathrooms: number;
  livingRooms: number;
  halls: number;
  features: string[];
  price: string;
  villaDetailsText: string;
  pricePrefix?: string;
}

const VillaDetailsContent: React.FC<VillaDetailsContentProps> = ({
  villaType,
  selectedVilla,
  villaCardImages,
  bedrooms,
  bathrooms,
  livingRooms,
  halls,
  features,
  price,
  villaDetailsText
}) => {
  // Villa Card için actualVilla objesi oluştur - villaCardImages'ı kullan
  const actualVillaForCard = {
    ...selectedVilla,
    image_urls: villaCardImages && villaCardImages.length > 0 ? villaCardImages : selectedVilla?.image_urls || []
  };

  return (
    <>
      {/* Villa Card - Now using actual room data */}
      <div className="mb-8">
        <VillaCard
          villaType={villaType}
          displayBedrooms={bedrooms}
          displayBathrooms={bathrooms}
          displayLivingRooms={livingRooms}
          displayHalls={halls}
          displayFeatures={features}
          actualVilla={actualVillaForCard}
          isHomepage={false}
        />
      </div>
      
      {/* Villa Description korundu */}
      <VillaDescription 
        name={villaType?.name || 'Villa'} 
        description={villaType?.description || ''} 
        details=""
      />

      {/* Villa Details Section korundu */}
      {selectedVilla?.villa_details && (
        <div className="mt-8 p-6 bg-gray-50 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Villa Detayları</h3>
          <div className="prose max-w-none">
            <p className="whitespace-pre-wrap text-gray-700">{selectedVilla.villa_details}</p>
          </div>
        </div>
      )}

      {/* Detail Gallery korundu */}
      {selectedVilla?.detail_gallery_images && selectedVilla.detail_gallery_images.length > 0 && (
        <VillaDetailGallery images={selectedVilla.detail_gallery_images} />
      )}
    </>
  );
};

export default VillaDetailsContent;
