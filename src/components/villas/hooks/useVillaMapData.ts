
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useVillaMapData = () => {
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const [roads, setRoads] = useState<any[]>([]);

  useEffect(() => {
    const loadMapData = async () => {
      try {
        // Load background image
        const { data: settingsData, error: settingsError } = await supabase
          .from('map_settings')
          .select('background_image')
          .limit(1)
          .maybeSingle();
        
        if (!settingsError && settingsData?.background_image) {
          setBackgroundImage(settingsData.background_image);
        } else {
          // Fallback to localStorage
          const localBackground = localStorage.getItem('mapBackgroundImage');
          if (localBackground) {
            setBackgroundImage(localBackground);
          }
        }
        
        // Load roads
        const { data: roadsData, error: roadsError } = await supabase
          .from('roads')
          .select('*');
        
        if (!roadsError && roadsData) {
          setRoads(roadsData);
        } else {
          // Fallback to localStorage
          const savedRoads = localStorage.getItem('roadData');
          if (savedRoads) {
            setRoads(JSON.parse(savedRoads));
          } else {
            setRoads([
              { id: 1, orientation: 'horizontal', position: 50, start_pos: 0, end_pos: 100, thickness: 8 },
              { id: 2, orientation: 'vertical', position: 50, start_pos: 0, end_pos: 100, thickness: 8 }
            ]);
          }
        }
      } catch (error) {
        console.error('Error loading map data:', error);
        
        // Fallback to localStorage
        const localBackground = localStorage.getItem('mapBackgroundImage');
        if (localBackground) {
          setBackgroundImage(localBackground);
        }
        
        const savedRoads = localStorage.getItem('roadData');
        if (savedRoads) {
          setRoads(JSON.parse(savedRoads));
        } else {
          setRoads([
            { id: 1, orientation: 'horizontal', position: 50, start_pos: 0, end_pos: 100, thickness: 8 },
            { id: 2, orientation: 'vertical', position: 50, start_pos: 0, end_pos: 100, thickness: 8 }
          ]);
        }
      }
    };
    
    loadMapData();
  }, []);

  return {
    backgroundImage,
    roads
  };
};
