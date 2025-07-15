
import { FeatureGroup } from '../types';

// Helper function to transform feature_groups from Json to FeatureGroup[]
export const transformFeatureGroups = (featureGroups: any): FeatureGroup[] | null => {
  if (!featureGroups) return null;
  
  try {
    if (Array.isArray(featureGroups)) {
      return featureGroups as FeatureGroup[];
    }
    
    if (typeof featureGroups === 'string') {
      const parsed = JSON.parse(featureGroups);
      return Array.isArray(parsed) ? parsed : null;
    }
    
    return featureGroups as FeatureGroup[];
  } catch (error) {
    console.error('Error transforming feature_groups:', error);
    return null;
  }
};

// Helper function to transform features array
export const transformFeatures = (features: any): string[] | null => {
  return Array.isArray(features) ? features.filter((f): f is string => typeof f === 'string') : null;
};

// Helper function to transform coordinates
export const transformCoordinates = (coordinates: any): { x: number; y: number } | null => {
  return coordinates as { x: number; y: number } | null;
};
