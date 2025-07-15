
import { useEffect, useState } from 'react';
import { fetchVillas, fetchVillaTypes, Villa, VillaType } from '@/services/villaService';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

// Define the SitePlanVilla interface for villa locations on the site map
export interface SitePlanVilla {
  id: number;
  type: string;
  x: number;
  y: number;
  villa_id: string;
  name: string;
}

export const useVillaPageData = () => {
  const [activeVilla, setActiveVilla] = useState<string>('');
  const [selectedVillaNumber, setSelectedVillaNumber] = useState<number | null>(null);
  const [sitePlanVillas, setSitePlanVillas] = useState<SitePlanVilla[]>([]);
  const [villaTypes, setVillaTypes] = useState<VillaType[]>([]);
  const [villas, setVillas] = useState<Villa[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch villa types and villas from the database
        const villaTypesData = await fetchVillaTypes();
        const villasData = await fetchVillas();
        
        setVillaTypes(villaTypesData);
        setVillas(villasData);
        
        // If we have villa types, set the active villa to the first one
        if (villaTypesData.length > 0) {
          setActiveVilla(villaTypesData[0].id);
        }
        
        // Load villa locations from Supabase for the map
        const { data: mapVillas, error: mapError } = await supabase
          .from('map_villas')
          .select('*');
        
        if (mapError) {
          console.error("Map villa data loading error:", mapError);
          throw mapError;
        }
        
        // Link villa types and database villas
        const sitePlanVillasData = mapVillas.map((mapVilla, index) => {
          // Find related villa type
          const villaType = mapVilla.type;
          
          // Find a villa of this type
          const matchingVilla = villasData.find(v => v.villa_type_id === villaType) || 
            villasData.find(v => v.villa_type_id === villaTypesData[0]?.id) || 
            villasData[0];
          
          return {
            id: index + 1,
            type: villaType,
            x: mapVilla.x,
            y: mapVilla.y,
            villa_id: matchingVilla?.id || '',
            name: matchingVilla?.name || `Villa ${index + 1}`
          };
        });
        
        // If no map villas, create from villa database
        if (sitePlanVillasData.length === 0) {
          const fallbackVillas = villasData.map((villa, index) => ({
            id: index + 1,
            type: villa.villa_type_id,
            x: villa.coordinates?.x || 50,
            y: villa.coordinates?.y || 50,
            villa_id: villa.id,
            name: villa.name
          }));
          
          setSitePlanVillas(fallbackVillas);
        } else {
          setSitePlanVillas(sitePlanVillasData);
        }
        
        setIsLoading(false);
      } catch (error) {
        console.error("Error loading villa data:", error);
        toast({
          title: "Hata",
          description: "Villa verileri yüklenirken bir hata oluştu.",
          variant: "destructive"
        });
        setIsLoading(false);
      }
    };
    
    loadData();
  }, []);

  return {
    activeVilla,
    setActiveVilla,
    selectedVillaNumber,
    setSelectedVillaNumber,
    sitePlanVillas,
    villaTypes,
    villas,
    isLoading
  };
};
