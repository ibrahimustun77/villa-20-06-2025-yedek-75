
import React from 'react';

const MapGrid: React.FC = () => {
  return (
    <div className="absolute inset-0 grid grid-cols-10 grid-rows-10 pointer-events-none z-10">
      {Array.from({ length: 11 }).map((_, i) => (
        <div key={`grid-${i}`}>
          {/* Horizontal grid lines with labels */}
          <div 
            className="absolute w-full h-px bg-gray-200/50" 
            style={{top: `${i * 10}%`}}
          >
            <span className="absolute -translate-y-1/2 -left-1 text-[10px] text-gray-500 bg-white/80 px-1 rounded">
              {i * 10}
            </span>
            <span className="absolute -translate-y-1/2 -right-1 text-[10px] text-gray-500 bg-white/80 px-1 rounded">
              {i * 10}
            </span>
          </div>
          
          {/* Vertical grid lines with labels */}
          <div 
            className="absolute h-full w-px bg-gray-200/50" 
            style={{left: `${i * 10}%`}}
          >
            <span className="absolute -translate-x-1/2 -top-3 text-[10px] text-gray-500 bg-white/80 px-1 rounded">
              {i * 10}
            </span>
            <span className="absolute -translate-x-1/2 bottom-1 text-[10px] text-gray-500 bg-white/80 px-1 rounded">
              {i * 10}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MapGrid;
