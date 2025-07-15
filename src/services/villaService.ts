
// Export all villa operations from their respective modules
export { fetchVillas } from './villa/villaFetcher';
export { createVilla } from './villa/villaCreator';
export { updateVilla } from './villa/villaUpdater';
export { deleteVilla } from './villa/villaDeleter';
export { fetchVillaTypes } from './villa/villaTypeService';

// Re-export types for backward compatibility
export type { Villa, VillaType, FeatureGroup } from './types';
