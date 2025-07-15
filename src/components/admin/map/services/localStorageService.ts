
import { Villa, Road } from '../types/mapTypes';

// Load villas from localStorage
export const loadVillasFromLocalStorage = (): Villa[] | null => {
  const savedVillas = localStorage.getItem('villaData');
  if (savedVillas) {
    return JSON.parse(savedVillas);
  }
  return null;
};

// Load roads from localStorage
export const loadRoadsFromLocalStorage = (): Road[] | null => {
  const savedRoads = localStorage.getItem('roadData');
  if (savedRoads) {
    return JSON.parse(savedRoads);
  }
  return null;
};

// Load background image from localStorage
export const loadBackgroundFromLocalStorage = (): string | null => {
  const savedBackgroundImage = localStorage.getItem('mapBackgroundImage');
  if (savedBackgroundImage) {
    return savedBackgroundImage;
  }
  return null;
};

// Save data to localStorage
export const saveDataToLocalStorage = (
  villas: Villa[], 
  roads: Road[], 
  backgroundImage: string | null
): void => {
  localStorage.setItem('villaData', JSON.stringify(villas));
  localStorage.setItem('roadData', JSON.stringify(roads));
  if (backgroundImage) {
    localStorage.setItem('mapBackgroundImage', backgroundImage);
  }
};
