
import { useState, useRef, useCallback } from 'react';
import { Villa } from '../../types/mapTypes';

export const useVillaDrag = () => {
  const [draggedVilla, setDraggedVilla] = useState<Villa | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [pendingMove, setPendingMove] = useState<{ villa: Villa; newX: number; newY: number; originalVilla: Villa } | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = useCallback((e: React.MouseEvent, villa: Villa) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!mapRef.current) return;
    
    const rect = mapRef.current.getBoundingClientRect();
    const villaX = (villa.x / 100) * rect.width;
    const villaY = (villa.y / 100) * rect.height;
    
    console.log('Starting drag for villa:', villa.id, 'at position:', { x: villa.x, y: villa.y });
    
    setDraggedVilla(villa);
    setDragOffset({
      x: e.clientX - rect.left - villaX,
      y: e.clientY - rect.top - villaY
    });
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!draggedVilla || !mapRef.current) return;
    
    const rect = mapRef.current.getBoundingClientRect();
    const newX = ((e.clientX - rect.left - dragOffset.x) / rect.width) * 100;
    const newY = ((e.clientY - rect.top - dragOffset.y) / rect.height) * 100;
    
    // Constrain within bounds
    const constrainedX = Math.max(0, Math.min(100, newX));
    const constrainedY = Math.max(0, Math.min(100, newY));
    
    // Update dragged villa position for visual feedback
    setDraggedVilla(prev => prev ? { ...prev, x: constrainedX, y: constrainedY } : null);
  }, [draggedVilla, dragOffset]);

  const handleMouseUp = useCallback((villas: Villa[]) => {
    if (draggedVilla) {
      // Find the original villa to check if position actually changed
      const originalVilla = villas.find(v => v.id === draggedVilla.id);
      
      if (originalVilla) {
        const positionChanged = Math.abs(draggedVilla.x - originalVilla.x) > 1 || 
                              Math.abs(draggedVilla.y - originalVilla.y) > 1;
        
        console.log('Drag ended. Position changed:', positionChanged, 
                   'From:', { x: originalVilla.x, y: originalVilla.y }, 
                   'To:', { x: draggedVilla.x, y: draggedVilla.y });
        
        if (positionChanged) {
          // Show confirmation for the move
          setPendingMove({
            villa: { ...draggedVilla },
            newX: draggedVilla.x,
            newY: draggedVilla.y,
            originalVilla
          });
        }
      }
    }
    
    setDraggedVilla(null);
    setDragOffset({ x: 0, y: 0 });
  }, [draggedVilla]);

  return {
    draggedVilla,
    pendingMove,
    mapRef,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    setPendingMove
  };
};
