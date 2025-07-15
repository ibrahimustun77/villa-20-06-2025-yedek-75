
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Edit, Trash2 } from 'lucide-react';
import { SliderImage } from '../hooks/useSliderManagement';

interface SliderImageTableProps {
  images: SliderImage[];
  selectedImages: string[];
  onSelectAll: (checked: boolean) => void;
  onSelectImage: (imageId: string, checked: boolean) => void;
  onToggleActive: (id: string, isActive: boolean) => void;
  onMoveUp: (slider: SliderImage) => void;
  onMoveDown: (slider: SliderImage) => void;
  onEdit: (slider: SliderImage) => void;
  onDelete: (id: string) => void;
  onPreview: (imageUrl: string) => void;
}

const SliderImageTable: React.FC<SliderImageTableProps> = ({
  images,
  selectedImages,
  onSelectAll,
  onSelectImage,
  onToggleActive,
  onMoveUp,
  onMoveDown,
  onEdit,
  onDelete,
  onPreview
}) => {
  if (images.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        Bu sayfa için henüz slider resmi eklenmemiş.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500">
          {images.length} resim
        </span>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="select-all"
            checked={selectedImages.length === images.length}
            onCheckedChange={onSelectAll}
          />
          <Label htmlFor="select-all" className="text-sm">
            Tümünü Seç
          </Label>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">Seç</TableHead>
            <TableHead className="w-12">#</TableHead>
            <TableHead>Resim</TableHead>
            <TableHead>Başlık</TableHead>
            <TableHead>Açıklama</TableHead>
            <TableHead>Durum</TableHead>
            <TableHead className="text-right">İşlemler</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {images.map((slider, index) => (
            <TableRow key={slider.id}>
              <TableCell>
                <Checkbox
                  checked={selectedImages.includes(slider.id)}
                  onCheckedChange={(checked) => onSelectImage(slider.id, checked as boolean)}
                />
              </TableCell>
              <TableCell>{index + 1}</TableCell>
              <TableCell>
                <img
                  src={slider.image_url}
                  alt={slider.title || 'Slider resmi'}
                  className="w-16 h-10 object-cover rounded cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => onPreview(slider.image_url)}
                />
              </TableCell>
              <TableCell>{slider.title || '-'}</TableCell>
              <TableCell className="max-w-xs truncate">
                {slider.description || '-'}
              </TableCell>
              <TableCell>
                <Switch
                  checked={slider.is_active}
                  onCheckedChange={(checked) => onToggleActive(slider.id, checked)}
                />
              </TableCell>
              <TableCell className="text-right">
                <div className="flex gap-1 justify-end">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => onMoveUp(slider)}
                    disabled={index === 0}
                    title="Yukarı Taşı"
                  >
                    ↑
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => onMoveDown(slider)}
                    disabled={index === images.length - 1}
                    title="Aşağı Taşı"
                  >
                    ↓
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => onEdit(slider)}
                    title="Düzenle"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="destructive"
                    onClick={() => onDelete(slider.id)}
                    title="Sil"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default SliderImageTable;
