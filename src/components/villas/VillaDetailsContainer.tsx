
import React from 'react';
import VillaImageGallery from './VillaImageGallery';
import VillaDetailsContent from './VillaDetailsContent';
import { useVillaImages } from './hooks/useVillaImages';

const VillaDetailsContainer = ({ villaData }) => {
  console.log('=== VillaDetailsContainer Debug ===');
  console.log('VillaDetailsContainer received villaData:', villaData);
  
  // If no villa data, show loading
  if (!villaData) {
    console.log('No villa data available');
    return <div className="text-center py-10">Yükleniyor...</div>;
  }
  
  // Extract villa type and villas from the data structure
  const villaType = villaData.villa_type || villaData;
  const villas = villaData.villas || [];
  
  console.log('VillaDetailsContainer - villaType:', villaType);
  console.log('VillaDetailsContainer - villas:', villas);
  console.log('VillaDetailsContainer - villas length:', villas?.length);

  // If no villa type, show loading
  if (!villaType || !villaType.name) {
    console.log('No villa type available');
    return <div className="text-center py-10">Yükleniyor...</div>;
  }
  
  // Default properties - using actual villa data now
  const defaultProps = {
    bedrooms: 4,
    bathrooms: 3,
    livingRooms: 1,
    halls: 1,
    features: ['Özel Termal Havuz', 'Bahçe', 'Akıllı Ev Sistemi', 'Panoramik Manzara']
  };

  // Use villa data directly
  const firstVilla = villas && villas.length > 0 ? villas[0] : null;
  const bedrooms = firstVilla?.bedrooms || defaultProps.bedrooms;
  const bathrooms = firstVilla?.bathrooms || defaultProps.bathrooms;
  const livingRooms = firstVilla?.living_rooms || defaultProps.livingRooms;
  const halls = firstVilla?.halls || defaultProps.halls;
  const features = firstVilla?.features || defaultProps.features;
  
  // Fix price logic: only show price if it exists and is greater than 0, otherwise show empty
  const price = (firstVilla?.price && firstVilla.price > 0) ? `₺${firstVilla.price.toLocaleString('tr-TR')}` : "";

  console.log('Before useVillaImages - villas:', villas);

  const { selectedVilla, galleryImages, villaCardImages } = useVillaImages(null, villas);

  console.log('VillaDetailsContainer - galleryImages:', galleryImages);
  console.log('VillaDetailsContainer - villaCardImages:', villaCardImages);
  console.log('VillaDetailsContainer - galleryImages count:', galleryImages.length);
  console.log('=== End VillaDetailsContainer Debug ===');

  return (
    <div id="villa-details" className="bg-white rounded-2xl shadow-xl overflow-hidden mb-20">
      {/* Villa Image Gallery */}
      <VillaImageGallery 
        images={galleryImages} 
        name={villaType?.name || 'Villa'} 
      />
      
      {/* Villa Content */}
      <div className="p-6 md:p-10">
        {/* Villa Title - Simple header without price */}
        <div className="mb-6 md:mb-10">
          <h1 className="text-2xl md:text-4xl font-bold">{villaType?.name || 'Villa'}</h1>
        </div>
        
        {/* Villa Details Content */}
        <VillaDetailsContent
          villaType={villaType}
          selectedVilla={selectedVilla}
          villaCardImages={villaCardImages}
          bedrooms={bedrooms}
          bathrooms={bathrooms}
          livingRooms={livingRooms}
          halls={halls}
          features={features}
          price={price}
          villaDetailsText=""
        />
      </div>
    </div>
  );
};

export default VillaDetailsContainer;
