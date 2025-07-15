
import { supabase } from '../../integrations/supabase/client';
import { Villa } from '../types';
import { toast } from '@/hooks/use-toast';
import { transformFeatureGroups, transformFeatures, transformCoordinates } from './villaTransformers';

export const fetchVillas = async (): Promise<Villa[]> => {
  try {
    console.log('Fetching villas from Supabase...');
    
    const { data, error } = await supabase
      .from('villas')
      .select(`
        *,
        villa_types!fk_villas_villa_type_id(id, name, description, color, created_at, updated_at, sort_order),
        villa_room_counts(
          id,
          room_type_id,
          count,
          icon_id,
          room_types(id, name, display_name, icon_category, is_manual),
          property_icons(icon_svg)
        )
      `)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching villas:', error);
      throw error;
    }
    
    console.log('Villas fetched successfully:', data);
    
    // Transform the data to match our Villa interface
    const transformedData: Villa[] = (data || []).map(villa => ({
      ...villa,
      features: transformFeatures(villa.features),
      feature_groups: transformFeatureGroups(villa.feature_groups),
      coordinates: transformCoordinates(villa.coordinates),
      dynamic_rooms: villa.villa_room_counts ? villa.villa_room_counts.map(vrc => ({
        ...vrc,
        display_name: vrc.room_types?.display_name || 'Oda',
        icon_svg: vrc.property_icons?.icon_svg || null
      })) : []
    }));
    
    return transformedData;
  } catch (error: any) {
    console.error('Error in fetchVillas:', error);
    toast({
      title: "Hata",
      description: `Villa verileri yüklenirken hata oluştu: ${error.message}`,
      variant: "destructive"
    });
    return [];
  }
};
