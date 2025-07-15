
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { GalleryImage, GalleryFormData, CATEGORIES } from '../types';

interface GalleryImageDialogProps {
  isOpen: boolean;
  onClose: () => void;
  editingImage: GalleryImage | null;
  formData: GalleryFormData;
  onFormDataChange: (data: Partial<GalleryFormData>) => void;
  imageFile: File | null;
  onImageFileChange: (file: File | null) => void;
  onSubmit: () => void;
  uploading: boolean;
}

const GalleryImageDialog: React.FC<GalleryImageDialogProps> = ({
  isOpen,
  onClose,
  editingImage,
  formData,
  onFormDataChange,
  imageFile,
  onImageFileChange,
  onSubmit,
  uploading
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {editingImage ? 'Resmi Düzenle' : 'Yeni Resim Ekle'}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Başlık</label>
            <Input
              value={formData.title}
              onChange={(e) => onFormDataChange({ title: e.target.value })}
              placeholder="Resim başlığı (opsiyonel)"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Kategori</label>
            <Select 
              value={formData.category} 
              onValueChange={(value) => onFormDataChange({ category: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map(cat => (
                  <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Alt Metin (SEO)</label>
            <Textarea
              value={formData.alt_text}
              onChange={(e) => onFormDataChange({ alt_text: e.target.value })}
              placeholder="Resmin açıklaması"
              rows={2}
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-2">Sıralama</label>
              <Input
                type="number"
                value={formData.order_index}
                onChange={(e) => onFormDataChange({ order_index: parseInt(e.target.value) || 0 })}
              />
            </div>
            <div className="flex items-center space-x-2 pt-6">
              <input
                type="checkbox"
                id="is_active"
                checked={formData.is_active}
                onChange={(e) => onFormDataChange({ is_active: e.target.checked })}
              />
              <label htmlFor="is_active" className="text-sm">Aktif</label>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">
              {editingImage ? 'Yeni Resim (mevcut resmi değiştirmek için)' : 'Resim'}
            </label>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => onImageFileChange(e.target.files?.[0] || null)}
            />
          </div>

          {editingImage && !imageFile && (
            <div className="aspect-video relative">
              <img
                src={editingImage.image_url}
                alt="Mevcut resim"
                className="w-full h-full object-cover rounded"
              />
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            İptal
          </Button>
          <Button onClick={onSubmit} disabled={uploading}>
            {uploading ? 'Yükleniyor...' : editingImage ? 'Güncelle' : 'Ekle'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GalleryImageDialog;
