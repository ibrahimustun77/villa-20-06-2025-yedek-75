
import { Villa, Road } from '../types/mapTypes';
import { 
  loadVillasFromLocalStorage,
  loadRoadsFromLocalStorage,
  loadBackgroundFromLocalStorage
} from '../services/localStorageService';

export const useLocalStorageDataLoader = () => {
  const loadLocalStorageData = () => {
    try {
      const localVillas = loadVillasFromLocalStorage();
      const localRoads = loadRoadsFromLocalStorage();
      const localBackground = loadBackgroundFromLocalStorage();

      return {
        villas: localVillas,
        roads: localRoads,
        background: localBackground
      };
    } catch (error) {
      console.error('LocalStorage data loading error:', error);
      return {
        villas: null,
        roads: null,
        background: null
      };
    }
  };

  return {
    loadLocalStorageData
  };
};
