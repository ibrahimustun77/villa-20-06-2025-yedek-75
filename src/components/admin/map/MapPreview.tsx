import React, { useCallback } from 'react';
import MapPreviewConfirmation from './MapPreviewConfirmation';
import MapBackground from './preview/MapBackground';
import MapGrid from './preview/MapGrid';
import VillaRenderer from './preview/VillaRenderer';
import { useVillaDrag } from './preview/hooks/useVillaDrag';
import { Villa } from './types/mapTypes';

interface MapPreviewProps {
  villas: Villa[];
  backgroundImage: string | null;
  showPreview: boolean;
  onVillaMove?: (id: number, x: number, y: number) => void;
}

const MapPreview: React.FC<MapPreviewProps> = ({
  villas,
  backgroundImage,
  showPreview,
  onVillaMove
}) => {
  const {
    draggedVilla,
    pendingMove,
    mapRef,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    setPendingMove
  } = useVillaDrag();

  const confirmMove = useCallback(async () => {
    if (pendingMove && onVillaMove) {
      try {
        console.log(`Confirming move for villa ${pendingMove.villa.id} to (${pendingMove.newX}, ${pendingMove.newY})`);
        
        // Call the move function and wait for it to complete
        await onVillaMove(pendingMove.villa.id, pendingMove.newX, pendingMove.newY);
        
        console.log(`Villa ${pendingMove.villa.id} position confirmed and saved`);
        
        // Clear pending move after successful save
        setPendingMove(null);
        
      } catch (error) {
        console.error('Error confirming villa position:', error);
        // Revert on error
        cancelMove();
      }
    }
  }, [pendingMove, onVillaMove, setPendingMove]);

  const cancelMove = useCallback(() => {
    console.log('Canceling villa move');
    setPendingMove(null);
  }, [setPendingMove]);

  if (!showPreview) {
    return null;
  }

  // Display villas with current positions - use original villas array data
  const displayVillas = villas.map(villa => {
    // If this villa is being dragged, show the dragged position
    if (draggedVilla && villa.id === draggedVilla.id) {
      return draggedVilla;
    }
    // If there's a pending move for this villa, show the pending position
    if (pendingMove && villa.id === pendingMove.villa.id) {
      return { ...villa, x: pendingMove.newX, y: pendingMove.newY };
    }
    // Otherwise show the original villa position
    return villa;
  });

  return (
    <div className="relative rounded-xl overflow-hidden border border-gray-200 w-full h-full">
      <div 
        ref={mapRef}
        className="absolute inset-0 bg-therma-beige/50 cursor-default"
        onMouseMove={handleMouseMove}
        onMouseUp={() => handleMouseUp(villas)}
        onMouseLeave={() => handleMouseUp(villas)}
      >
        <MapBackground backgroundImage={backgroundImage} />
        <MapGrid />
        <VillaRenderer
          villas={displayVillas}
          draggedVilla={draggedVilla}
          pendingMove={pendingMove}
          onMouseDown={handleMouseDown}
        />

        {/* Confirmation buttons - show next to the pending villa */}
        {pendingMove && (
          <MapPreviewConfirmation
            villa={pendingMove.villa}
            onConfirm={confirmMove}
            onCancel={cancelMove}
          />
        )}
      </div>
    </div>
  );
};

export default MapPreview;
