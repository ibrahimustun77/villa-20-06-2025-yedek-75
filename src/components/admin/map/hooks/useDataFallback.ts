
import { Villa, Road } from '../types/mapTypes';
import { initialVillas, initialRoads } from '../data/initialMapData';

export const useDataFallback = () => {
  const getFallbackData = (
    villas: Villa[] | null,
    roads: Road[] | null
  ) => {
    const finalVillas = villas || initialVillas;
    const finalRoads = roads || initialRoads;
    
    const nextVillaId = finalVillas.length > 0 
      ? Math.max(...finalVillas.map(v => typeof v.id === 'number' ? v.id : 0)) + 1
      : 1;
    
    const nextRoadId = finalRoads.length > 0 
      ? Math.max(...finalRoads.map(r => typeof r.id === 'number' ? r.id : 0)) + 1
      : 1;

    return {
      villas: finalVillas,
      roads: finalRoads,
      nextVillaId,
      nextRoadId
    };
  };

  return {
    getFallbackData
  };
};
