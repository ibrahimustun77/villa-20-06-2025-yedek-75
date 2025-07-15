
import { useState, useEffect } from 'react';
import { Villa } from '@/services/villaService';

export const useVillaFormData = (villa: Villa | undefined, villaTypes: any[]) => {
  const [formData, setFormData] = useState({
    id: '',
    villa_type_id: '',
    name: '',
    description: '',
    price: 0,
    bedrooms: null,
    bathrooms: null,
    living_rooms: null,
    halls: null,
    features: [],
    feature_groups: [],
    coordinates: null,
    image_urls: [],
    is_active: true,
    created_at: '',
    updated_at: '',
    villa_details: '',
    detail_gallery_images: [],
    // Icon fields for room details
    bedroom_icon_id: '',
    bathroom_icon_id: '',
    living_room_icon_id: '',
    hall_icon_id: ''
  });

  // Helper function to convert old features to feature_groups format
  const convertFeaturesToGroups = (features: string[] | null): any[] => {
    if (!features || features.length === 0) return [];
    
    return [{
      category: 'general', // Use a default category ID for converted features
      features: features
    }];
  };

  // Initialize form with villa data if editing
  useEffect(() => {
    if (villa) {
      console.log('Loading villa data for editing - Full villa object:', villa);
      console.log('Villa feature_groups:', villa.feature_groups);
      console.log('Villa features (old format):', villa.features);
      
      // Determine which features to use
      let finalFeatureGroups = villa.feature_groups || [];
      
      // If no feature_groups but has old features, convert them
      if ((!villa.feature_groups || villa.feature_groups.length === 0) && villa.features && villa.features.length > 0) {
        console.log('Converting old features to feature_groups format');
        finalFeatureGroups = convertFeaturesToGroups(villa.features);
        console.log('Converted feature_groups:', finalFeatureGroups);
      }
      
      setFormData({
        ...villa,
        price: Number(villa.price),
        features: villa.features || [],
        feature_groups: finalFeatureGroups,
        image_urls: villa.image_urls || [],
        villa_details: villa.villa_details || '',
        detail_gallery_images: villa.detail_gallery_images || [],
        // Initialize icon fields with existing data or empty strings
        bedroom_icon_id: villa.bedroom_icon_id || '',
        bathroom_icon_id: villa.bathroom_icon_id || '',
        living_room_icon_id: villa.living_room_icon_id || '',
        hall_icon_id: villa.hall_icon_id || ''
      });
      
      console.log('Form data set with converted feature_groups:', finalFeatureGroups);
    } else if (villaTypes.length > 0) {
      setFormData(prev => ({
        ...prev,
        villa_type_id: villaTypes[0].id
      }));
    }
  }, [villa, villaTypes]);

  return { formData, setFormData };
};
