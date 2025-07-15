
import { supabase } from '../../integrations/supabase/client';
import { Villa, FeatureGroup } from '../types';
import { toast } from '@/hooks/use-toast';
import { transformFeatureGroups, transformFeatures, transformCoordinates } from './villaTransformers';
import { syncVillaRoomCounts } from '@/components/admin/villa-form/services/villaRoomCountsService';

export const createVilla = async (villa: { 
  villa_type_id: string, 
  name: string,
  description?: string | null,
  price: number,
  bedrooms?: number | null,
  bathrooms?: number | null,
  living_rooms?: number | null,
  halls?: number | null,
  features?: string[] | null,
  feature_groups?: FeatureGroup[] | null,
  coordinates?: { x: number; y: number } | null,
  image_urls?: string[] | null,
  villa_details?: string | null,
  detail_gallery_images?: string[] | null,
  is_active?: boolean,
  bedroom_icon_id?: string | null,
  bathroom_icon_id?: string | null,
  living_room_icon_id?: string | null,
  hall_icon_id?: string | null,
  dynamic_rooms?: any[] | null
}): Promise<Villa | null> => {
  try {
    console.log('Creating villa with complete data:', villa);
    console.log('Villa feature_groups to save:', villa.feature_groups);
    console.log('Villa dynamic_rooms to save:', villa.dynamic_rooms);
    
    // Convert types to match database schema
    // Convert empty strings to null for UUID fields to avoid invalid input syntax errors
    const villaData = {
      villa_type_id: villa.villa_type_id,
      name: villa.name,
      description: villa.description,
      price: villa.price,
      bedrooms: villa.bedrooms,
      bathrooms: villa.bathrooms,
      living_rooms: villa.living_rooms,
      halls: villa.halls,
      features: villa.features ? villa.features as any : null,
      feature_groups: villa.feature_groups ? JSON.stringify(villa.feature_groups) : null,
      coordinates: villa.coordinates ? villa.coordinates as any : null,
      image_urls: villa.image_urls,
      villa_details: villa.villa_details,
      detail_gallery_images: villa.detail_gallery_images || [],
      is_active: villa.is_active ?? true,
      // Convert empty strings to null for UUID fields
      bedroom_icon_id: villa.bedroom_icon_id === "" ? null : villa.bedroom_icon_id,
      bathroom_icon_id: villa.bathroom_icon_id === "" ? null : villa.bathroom_icon_id,
      living_room_icon_id: villa.living_room_icon_id === "" ? null : villa.living_room_icon_id,
      hall_icon_id: villa.hall_icon_id === "" ? null : villa.hall_icon_id
    };
    
    console.log('Villa create data prepared for database:', villaData);
    console.log('Feature groups as JSON:', villaData.feature_groups);
    
    const { data, error } = await supabase
      .from('villas')
      .insert(villaData)
      .select(`
        *,
        villa_types!fk_villas_villa_type_id(id, name, description, color, created_at, updated_at, sort_order)
      `)
      .single();

    if (error) {
      console.error('Supabase error details:', error);
      throw error;
    }
    
    console.log('Villa created successfully:', data);

    // Sync villa room counts using the new service
    if (villa.dynamic_rooms && villa.dynamic_rooms.length > 0) {
      console.log('Syncing villa room counts:', villa.dynamic_rooms);
      await syncVillaRoomCounts(data.id, villa.dynamic_rooms);
    }
    
    toast({
      title: "Başarılı",
      description: 'Villa başarıyla oluşturuldu'
    });
    
    // Transform the data to match our Villa interface
    const transformedData: Villa = {
      ...data,
      features: transformFeatures(data.features),
      feature_groups: transformFeatureGroups(data.feature_groups),
      coordinates: transformCoordinates(data.coordinates),
    };
    
    console.log('Transformed villa data with feature_groups:', transformedData.feature_groups);
    
    return transformedData;
  } catch (error: any) {
    console.error('Error creating villa:', error);
    toast({
      title: "Hata",
      description: `Villa oluşturulurken hata oluştu: ${error.message}`,
      variant: "destructive"
    });
    return null;
  }
};
