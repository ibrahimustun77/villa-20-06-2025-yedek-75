import { Villa } from '../types';
import { createVilla } from './villaCreator';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

export const copyVilla = async (originalVilla: Villa): Promise<boolean> => {
  try {
    // Fetch room counts for the original villa
    const { data: roomCounts = [], error } = await supabase
      .from('villa_room_counts')
      .select('room_type_id, count, icon_id')
      .eq('villa_id', originalVilla.id);
    
    if (error) {
      console.error('Error fetching room counts:', error);
    }
    
    // Create a copy of the villa with modified name
    const villaCopy = {
      villa_type_id: originalVilla.villa_type_id,
      name: `${originalVilla.name} - Kopya`,
      description: originalVilla.description,
      price: originalVilla.price,
      bedrooms: originalVilla.bedrooms,
      bathrooms: originalVilla.bathrooms,
      living_rooms: originalVilla.living_rooms,
      halls: originalVilla.halls,
      features: originalVilla.features ? [...originalVilla.features] : null,
      feature_groups: originalVilla.feature_groups ? JSON.parse(JSON.stringify(originalVilla.feature_groups)) : null,
      coordinates: originalVilla.coordinates ? { ...originalVilla.coordinates } : null,
      image_urls: originalVilla.image_urls ? [...originalVilla.image_urls] : null,
      villa_details: originalVilla.villa_details,
      detail_gallery_images: originalVilla.detail_gallery_images ? [...originalVilla.detail_gallery_images] : null,
      is_active: true, // Always set active for new copies
      // Convert empty strings to null for UUID fields
      bedroom_icon_id: originalVilla.bedroom_icon_id === "" ? null : originalVilla.bedroom_icon_id,
      bathroom_icon_id: originalVilla.bathroom_icon_id === "" ? null : originalVilla.bathroom_icon_id,
      living_room_icon_id: originalVilla.living_room_icon_id === "" ? null : originalVilla.living_room_icon_id,
      hall_icon_id: originalVilla.hall_icon_id === "" ? null : originalVilla.hall_icon_id,
      dynamic_rooms: roomCounts // Include room counts
    };

    console.log('Copying villa with data:', villaCopy);
    
    const result = await createVilla(villaCopy);
    
    if (result) {
      toast({
        title: "Başarılı",
        description: `"${originalVilla.name}" villa başarıyla kopyalandı`,
      });
      return true;
    }
    
    return false;
  } catch (error: any) {
    console.error('Error copying villa:', error);
    toast({
      title: "Hata",
      description: `Villa kopyalanırken hata oluştu: ${error.message}`,
      variant: "destructive"
    });
    return false;
  }
};