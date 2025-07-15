
import React from 'react';
import { Villa } from '../types/mapTypes';

interface MapDataHandlerProps {
  villas: Villa[];
  setEditingVilla: (villa: Villa) => void;
  saveVilla: () => void;
  saveChangesToStorage: () => void;
  onVillaMove: (id: number, x: number, y: number) => Promise<void>;
}

export const useMapDataHandler = ({
  villas,
  setEditingVilla,
  saveVilla,
  saveChangesToStorage
}: MapDataHandlerProps) => {
  
  // Handle villa movement from drag and drop
  const handleVillaMove = async (id: number, x: number, y: number) => {
    console.log(`Handling villa move: ID ${id} to position (${x}, ${y})`);
    
    // Find the villa and update its position
    const villa = villas.find(v => v.id === id);
    if (villa) {
      // Update the villa with new coordinates
      const updatedVilla = {
        ...villa,
        x: Math.round(x),
        y: Math.round(y)
      };
      
      console.log('Updating villa position:', updatedVilla);
      
      // Set as editing villa to trigger update
      setEditingVilla(updatedVilla);
      
      // Save the changes immediately
      try {
        await new Promise(resolve => setTimeout(resolve, 50)); // Small delay to ensure state is set
        await saveVilla();
        await saveChangesToStorage();
        console.log('Villa position saved successfully');
      } catch (error) {
        console.error('Error saving villa position:', error);
        throw error; // Re-throw to handle in MapPreview
      }
    }
  };

  return {
    handleVillaMove
  };
};

const MapDataHandler: React.FC<MapDataHandlerProps> = (props) => {
  // This component doesn't render anything, it's just for the hook
  return null;
};

export default MapDataHandler;
