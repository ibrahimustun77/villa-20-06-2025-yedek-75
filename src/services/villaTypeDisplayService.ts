
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast"; 
import type { TablesInsert, TablesUpdate } from "@/integrations/supabase/types"; 

export interface VillaTypeDisplay {
  id: string; 
  display_image: string; 
  display_bedrooms: number; 
  display_bathrooms: number; 
  display_living_rooms: number;
  display_halls: number;
  display_features: string[]; 
  gallery_images: string[] | null;
  created_at: string;
  updated_at: string;
}

// Type for form input, allowing nulls or undefined for optional fields.
export type PartialVillaTypeDisplayUpdate = {
    display_image?: string | null;
    display_bedrooms?: number | null;
    display_bathrooms?: number | null;
    display_living_rooms?: number | null;
    display_halls?: number | null;
    display_features?: string[] | null;
    gallery_images?: string[] | null;
};

export const fetchVillaTypeDisplays = async (): Promise<Record<string, VillaTypeDisplay>> => {
  try {
    console.log('Fetching villa type display data from Supabase...');
    const { data, error } = await supabase
      .from('villa_type_displays')
      .select('*');

    if (error) {
      console.error('Error fetching villa type displays:', error);
      throw error;
    }
    
    const displayData = data.reduce((acc, item) => {
      acc[item.id] = {
        ...item,
        display_image: item.display_image ?? "", 
        display_bedrooms: item.display_bedrooms ?? 0,
        display_bathrooms: item.display_bathrooms ?? 0,
        display_living_rooms: item.display_living_rooms ?? 1,
        display_halls: item.display_halls ?? 1,
        display_features: item.display_features ?? [],
        gallery_images: item.gallery_images || null,
      };
      return acc;
    }, {} as Record<string, VillaTypeDisplay>);
    
    console.log('Villa type displays fetched successfully:', displayData);
    return displayData;
  } catch (error: any) {
    console.error('Error in fetchVillaTypeDisplays:', error);
    toast({
      title: "Hata",
      description: `Villa tip görünümleri yüklenirken hata oluştu: ${error.message}`,
      variant: "destructive"
    });
    return {};
  }
};

export const updateVillaTypeDisplay = async (
  id: string, 
  displayData: PartialVillaTypeDisplayUpdate 
): Promise<VillaTypeDisplay | null> => {
  try {
    console.log('Updating/Creating villa type display with id:', id, 'and data:', displayData);
    
    // Prepare data for upsert, ensuring all NOT NULL fields have values.
    const dataToUpsert: TablesInsert<'villa_type_displays'> = {
      id: id,
      display_image: displayData.display_image ?? "", 
      display_bedrooms: displayData.display_bedrooms ?? 0, 
      display_bathrooms: displayData.display_bathrooms ?? 0, 
      display_living_rooms: displayData.display_living_rooms ?? 1,
      display_halls: displayData.display_halls ?? 1,
      display_features: displayData.display_features ?? [], 
      gallery_images: displayData.gallery_images || null,
      // created_at and updated_at are handled by the database
    };

    console.log('Data to upsert:', dataToUpsert);

    const { data, error } = await supabase
      .from('villa_type_displays')
      .upsert(dataToUpsert, { onConflict: 'id' })
      .select()
      .single();

    if (error) {
      console.error('Error upserting villa type display:', error);
      toast({
        title: "Hata",
        description: `Villa tipi görünümü güncellenirken/oluşturulurken hata oluştu: ${error.message}`,
        variant: "destructive"
      });
      throw error;
    }
    
    toast({
      title: "Başarılı",
      description: 'Villa tipi görünümü güncellendi/oluşturuldu.'
    });
    
    return data as VillaTypeDisplay;
  } catch (error: any) {
    console.error('Error in updateVillaTypeDisplay (outer catch):', error);
    if (!error.message.includes('Villa tipi görünümü')) {
        toast({
          title: "Hata",
          description: `İşlem sırasında bir hata oluştu: ${error.message}`,
          variant: "destructive"
        });
    }
    return null;
  }
};
