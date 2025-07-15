
import React from 'react';
import { useMapManagement } from '../hooks/useMapManagement';
import MapManagementTables from '../MapManagementTables';
import MapPreviewSection from '../MapPreviewSection';
import LoadingSpinner from './LoadingSpinner';

const MapManagementContainer: React.FC = () => {
  const {
    villas,
    editingVilla,
    showPreview,
    backgroundImage,
    isLoading,
    setEditingVilla,
    setShowPreview,
    setBackgroundImage,
    addNewVilla,
    startEditVilla,
    cancelEditVilla,
    saveVilla,
    deleteVilla,
    saveChangesToStorage,
    loadFromStorage
  } = useMapManagement();

  // Handle villa movement from drag and drop - fixed logic
  const handleVillaMove = async (id: number, x: number, y: number) => {
    console.log(`Moving villa ${id} to position (${x}, ${y})`);
    
    try {
      // Find the villa and update its position directly in the villas array
      const villaIndex = villas.findIndex(v => v.id === id);
      if (villaIndex === -1) {
        console.error('Villa not found:', id);
        return;
      }

      const originalVilla = villas[villaIndex];
      const updatedVilla = {
        ...originalVilla,
        x: Math.round(x),
        y: Math.round(y)
      };
      
      console.log('Updating villa position from:', originalVilla, 'to:', updatedVilla);
      
      // Set the villa as editing to update it
      setEditingVilla(updatedVilla);
      
      // Wait a moment for state to update, then save
      setTimeout(async () => {
        try {
          await saveVilla();
          console.log('Villa position saved successfully');
        } catch (error) {
          console.error('Error saving villa position:', error);
          throw error;
        }
      }, 100);
      
    } catch (error) {
      console.error('Error in handleVillaMove:', error);
      throw error;
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container-custom py-8">
      <div className="space-y-8">
        <MapManagementTables
          villas={villas}
          editingVilla={editingVilla}
          setEditingVilla={setEditingVilla}
          onAddVilla={addNewVilla}
          onEditVilla={startEditVilla}
          onDeleteVilla={deleteVilla}
          onSaveVilla={saveVilla}
          onCancelVilla={cancelEditVilla}
          onSave={saveChangesToStorage}
          onLoad={loadFromStorage}
        />

        <MapPreviewSection
          villas={villas}
          backgroundImage={backgroundImage}
          showPreview={showPreview}
          setBackgroundImage={setBackgroundImage}
          setShowPreview={setShowPreview}
          onVillaMove={handleVillaMove}
        />
      </div>
    </div>
  );
};

export default MapManagementContainer;
