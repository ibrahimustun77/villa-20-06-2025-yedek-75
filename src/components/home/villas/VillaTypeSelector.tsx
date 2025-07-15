
import React from 'react';
import { VillaType } from '@/services/types';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

interface VillaTypeSelectorProps {
  villaTypes: VillaType[];
  activeVilla: string;
  onSelect: (villaId: string) => void;
}

const VillaTypeSelector: React.FC<VillaTypeSelectorProps> = ({ villaTypes, activeVilla, onSelect }) => {
  // Split villa types into two rows for mobile
  const firstRow = villaTypes.slice(0, 2);
  const secondRow = villaTypes.slice(2);

  return (
    <div className="mb-8 md:mb-12 animate-on-scroll" style={{ animationDelay: '150ms' }}>
      {/* Desktop version - horizontal scroll */}
      <div className="hidden sm:block">
        <ScrollArea className="w-full">
          <div className="flex justify-center py-2">
            <div className="inline-flex bg-therma-gray/50 backdrop-blur-sm rounded-full p-1 shadow-md">
              {villaTypes.map((villa) => (
                <button
                  key={villa.id}
                  onClick={() => onSelect(villa.id)}
                  className={`px-3 md:px-6 py-2 md:py-3 text-sm md:text-base rounded-full transition-all duration-300 text-center whitespace-nowrap ${
                    activeVilla === villa.id
                      ? 'bg-therma text-white shadow-md'
                      : 'hover:bg-white/70'
                  }`}
                >
                  {villa.name}
                </button>
              ))}
            </div>
          </div>
          <ScrollBar orientation="horizontal" className="opacity-0" />
        </ScrollArea>
      </div>

      {/* Mobile version - two rows */}
      <div className="block sm:hidden">
        <div className="flex flex-col items-center gap-2 py-2">
          {/* First row */}
          <div className="flex bg-therma-gray/50 backdrop-blur-sm rounded-full p-1 shadow-md">
            {firstRow.map((villa) => (
              <button
                key={villa.id}
                onClick={() => onSelect(villa.id)}
                className={`px-3 py-2 text-xs rounded-full transition-all duration-300 text-center whitespace-nowrap ${
                  activeVilla === villa.id
                    ? 'bg-therma text-white shadow-md'
                    : 'hover:bg-white/70'
                }`}
              >
                {villa.name}
              </button>
            ))}
          </div>
          
          {/* Second row */}
          {secondRow.length > 0 && (
            <div className="flex bg-therma-gray/50 backdrop-blur-sm rounded-full p-1 shadow-md">
              {secondRow.map((villa) => (
                <button
                  key={villa.id}
                  onClick={() => onSelect(villa.id)}
                  className={`px-3 py-2 text-xs rounded-full transition-all duration-300 text-center whitespace-nowrap ${
                    activeVilla === villa.id
                      ? 'bg-therma text-white shadow-md'
                      : 'hover:bg-white/70'
                  }`}
                >
                  {villa.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VillaTypeSelector;
