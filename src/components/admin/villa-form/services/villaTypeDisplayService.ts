
import { supabase } from '@/integrations/supabase/client';
import { Villa } from '@/services/types';

export const updateVillaTypeDisplayData = async (villa: Villa) => {
  try {
    console.log('Updating villa type display data for villa:', villa);
    console.log('Villa feature_groups for display:', villa.feature_groups);
    
    // Check if villa type display data already exists
    const { data: existingDisplay } = await supabase
      .from('villa_type_displays')
      .select('*')
      .eq('id', villa.villa_type_id)
      .single();

    // Flatten feature_groups into display_features array
    let displayFeatures: string[] = [];
    if (villa.feature_groups && Array.isArray(villa.feature_groups)) {
      villa.feature_groups.forEach((group: any) => {
        if (group.features && Array.isArray(group.features)) {
          displayFeatures = [...displayFeatures, ...group.features];
        }
      });
    }
    
    // Fallback to old features format if no feature_groups
    if (displayFeatures.length === 0 && villa.features && Array.isArray(villa.features)) {
      displayFeatures = villa.features;
    }

    console.log('Flattened display features:', displayFeatures);

    const displayData = {
      id: villa.villa_type_id,
      display_bedrooms: villa.bedrooms || 0,
      display_bathrooms: villa.bathrooms || 0,
      display_living_rooms: villa.living_rooms || 1,
      display_halls: villa.halls || 1,
      display_image: villa.image_urls?.[0] || '',
      display_features: displayFeatures,
      gallery_images: villa.image_urls || [],
      // Convert empty strings to null for UUID fields
      bedroom_icon_id: villa.bedroom_icon_id === "" ? null : (villa.bedroom_icon_id || null),
      bathroom_icon_id: villa.bathroom_icon_id === "" ? null : (villa.bathroom_icon_id || null),
      living_room_icon_id: villa.living_room_icon_id === "" ? null : (villa.living_room_icon_id || null),
      hall_icon_id: villa.hall_icon_id === "" ? null : (villa.hall_icon_id || null)
    };

    console.log('Display data to upsert:', displayData);

    if (existingDisplay) {
      // Update existing display data
      const { error } = await supabase
        .from('villa_type_displays')
        .update(displayData)
        .eq('id', villa.villa_type_id);
        
      if (error) throw error;
    } else {
      // Insert new display data
      const { error } = await supabase
        .from('villa_type_displays')
        .insert(displayData);
        
      if (error) throw error;
    }

    console.log('Villa type display data updated successfully with features:', displayFeatures);
  } catch (error) {
    console.error('Error updating villa type display data:', error);
    throw error;
  }
};
