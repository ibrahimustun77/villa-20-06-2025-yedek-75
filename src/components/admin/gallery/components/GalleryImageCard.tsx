
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit, Trash2 } from 'lucide-react';
import { GalleryImage, CATEGORIES } from '../types';

interface GalleryImageCardProps {
  image: GalleryImage;
  onEdit: (image: GalleryImage) => void;
  onDelete: (id: string, imageUrl: string) => void;
}

const GalleryImageCard: React.FC<GalleryImageCardProps> = ({ 
  image, 
  onEdit, 
  onDelete 
}) => {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-video relative">
        <img
          src={image.image_url}
          alt={image.alt_text || image.title || 'Galeri resmi'}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {image.is_active === false && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white font-semibold">Pasif</span>
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold mb-1">{image.title || 'Başlıksız'}</h3>
        <p className="text-sm text-gray-500 mb-2">
          {CATEGORIES.find(c => c.value === image.category)?.label || 'Villa'} • Sıra: {image.order_index || 0}
        </p>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(image)}
          >
            <Edit className="w-4 h-4" />
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => onDelete(image.id, image.image_url)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default GalleryImageCard;
