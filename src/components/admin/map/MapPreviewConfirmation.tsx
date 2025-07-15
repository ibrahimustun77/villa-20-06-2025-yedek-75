
import React from 'react';
import { Button } from '@/components/ui/button';
import { Check, X } from 'lucide-react';

interface MapPreviewConfirmationProps {
  villa: any;
  onConfirm: () => void;
  onCancel: () => void;
}

const MapPreviewConfirmation: React.FC<MapPreviewConfirmationProps> = ({
  villa,
  onConfirm,
  onCancel
}) => {
  if (!villa) return null;

  return (
    <div 
      className="absolute z-50 flex gap-1"
      style={{
        top: `${villa.y}%`,
        left: `${villa.x + 8}%`, // Villa'nın sağında
        transform: 'translateY(-50%)'
      }}
    >
      <Button
        size="sm"
        onClick={onConfirm}
        className="bg-green-500 hover:bg-green-600 text-white p-1 h-6 w-6"
      >
        <Check className="h-3 w-3" />
      </Button>
      <Button
        size="sm"
        onClick={onCancel}
        className="bg-red-500 hover:bg-red-600 text-white p-1 h-6 w-6"
      >
        <X className="h-3 w-3" />
      </Button>
    </div>
  );
};

export default MapPreviewConfirmation;
