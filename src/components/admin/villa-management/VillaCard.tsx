
import React from 'react';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, Copy } from 'lucide-react';
import { Villa } from '@/services/villaService';

interface VillaCardProps {
  villa: Villa;
  onEdit: (villa: Villa) => void;
  onDelete: (villa: Villa) => void;
  onCopy: (villa: Villa) => void;
}

const VillaCard: React.FC<VillaCardProps> = ({ villa, onEdit, onDelete, onCopy }) => {
  const getVillaImage = () => {
    if (villa.image_urls && villa.image_urls.length > 0) {
      return villa.image_urls[0];
    }
    return null;
  };

  const villaImage = getVillaImage();

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="relative bg-gray-200 h-48 md:h-48">
        {villaImage ? (
          <img 
            src={villaImage} 
            alt={villa.name}
            className="w-full h-full object-contain md:object-cover bg-gray-100"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-image"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
          </div>
        )}
        <div className="absolute top-2 right-2 flex gap-1">
          <Button size="icon" variant="outline" className="bg-white" onClick={() => onCopy(villa)} title="Kopyala">
            <Copy className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="outline" className="bg-white" onClick={() => onEdit(villa)}>
            <Edit className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="outline" className="bg-white" onClick={() => onDelete(villa)}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
        {!villa.is_active && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs rounded">
            Pasif
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg leading-tight">{villa.name}</h3>
          <div className="bg-therma text-white px-2 py-1 text-xs rounded">
            {villa.villa_types?.name}
          </div>
        </div>
        <p className="text-gray-600 line-clamp-2 text-sm mb-2">
          {villa.description || 'Açıklama yok'}
        </p>
        <div className="flex justify-between items-center">
          <div className="font-medium">{villa.price.toLocaleString('tr-TR')} ₺</div>
          <div className="text-sm text-gray-500">
            {villa.bedrooms || 0} Yatak • {villa.bathrooms || 0} Banyo • {villa.living_rooms || 0} Oturma • {villa.halls || 0} Salon
          </div>
        </div>
      </div>
    </div>
  );
};

export default VillaCard;
