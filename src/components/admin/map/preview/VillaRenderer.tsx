
import React from 'react';
import VillaPreviewItem from './VillaPreviewItem';
import { Villa } from '../types/mapTypes';

interface VillaRendererProps {
  villas: Villa[];
  draggedVilla: Villa | null;
  pendingMove: { villa: Villa; newX: number; newY: number; originalVilla: Villa } | null;
  onMouseDown: (e: React.MouseEvent, villa: Villa) => void;
}

const VillaRenderer: React.FC<VillaRendererProps> = ({
  villas,
  draggedVilla,
  pendingMove,
  onMouseDown
}) => {
  return (
    <>
      {villas.map(villa => {
        // Use dragged villa position if currently being dragged, otherwise use pending move position if this villa is being moved
        let displayVilla = villa;
        
        if (draggedVilla?.id === villa.id) {
          displayVilla = draggedVilla;
        } else if (pendingMove?.villa.id === villa.id) {
          // Show villa at its new position while confirmation is pending
          displayVilla = { ...villa, x: pendingMove.newX, y: pendingMove.newY };
        }
        
        return (
          <VillaPreviewItem
            key={villa.id}
            villa={villa}
            displayVilla={displayVilla}
            isDragging={draggedVilla?.id === villa.id}
            onMouseDown={onMouseDown}
          />
        );
      })}
    </>
  );
};

export default VillaRenderer;
