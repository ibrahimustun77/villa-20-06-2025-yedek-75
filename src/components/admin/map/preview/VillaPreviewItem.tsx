
import React from 'react';
import { Villa } from '../types/mapTypes';

interface VillaPreviewItemProps {
  villa: Villa;
  displayVilla: Villa;
  isDragging: boolean;
  onMouseDown: (e: React.MouseEvent, villa: Villa) => void;
}

const VillaPreviewItem: React.FC<VillaPreviewItemProps> = ({
  villa,
  displayVilla,
  isDragging,
  onMouseDown
}) => {
  // Helper function to get villa color based on type
  const getVillaColor = (type: string) => {
    if (type.includes('a') || type.includes('A')) return 'bg-therma-light';
    if (type.includes('b') || type.includes('B')) return 'bg-therma';
    if (type.includes('c') || type.includes('C')) return 'bg-therma-dark';
    return 'bg-therma';
  };

  return (
    <div
      key={`villa-${villa.id}`}
      className={`absolute w-12 h-12 rounded-full flex items-center justify-center z-30 cursor-move select-none text-white font-bold ${getVillaColor(displayVilla.type)} ${isDragging ? 'scale-110 shadow-lg z-40' : 'hover:scale-105'} transition-transform`}
      style={{ 
        top: `${displayVilla.y}%`, 
        left: `${displayVilla.x}%`, 
        transform: 'translate(-50%, -50%)'
      }}
      onMouseDown={(e) => onMouseDown(e, villa)}
    >
      {villa.id}
      
      {/* Coordinate tooltip */}
      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-white/90 text-black text-xs rounded px-2 py-1 whitespace-nowrap shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
        x:{Math.round(displayVilla.x)}, y:{Math.round(displayVilla.y)}
      </div>
    </div>
  );
};

export default VillaPreviewItem;
