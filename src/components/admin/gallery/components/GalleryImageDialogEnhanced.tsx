
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import MediaSelector from '../../media/MediaSelector';
import { GalleryImage, GalleryFormData } from '../types';

interface GalleryImageDialogEnhancedProps {
  isOpen: boolean;
  onClose: () => void;
  editingImage: GalleryImage | null;
  formData: GalleryFormData;
  setFormData: React.Dispatch<React.SetStateAction<GalleryFormData>>;
  imageFile: File | null;
  setImageFile: React.Dispatch<React.SetStateAction<File | null>>;
  uploading: boolean;
  onSubmit: () => void;
  categories: { name: string; value: string; }[];
}

const GalleryImageDialogEnhanced: React.FC<GalleryImageDialogEnhancedProps> = ({
  isOpen,
  onClose,
  editingImage,
  formData,
  setFormData,
  imageFile,
  setImageFile,
  uploading,
  onSubmit,
  categories = []
}) => {
  const handleMediaSelect = (media: any) => {
    console.log('Media selected:', media);
    setFormData(prev => ({ 
      ...prev, 
      image_url: media.url 
    }));
    // Clear the file input since we're using media library
    setImageFile(null);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      // Clear the media library URL since we're using file upload
      setFormData(prev => ({ 
        ...prev, 
        image_url: '' 
      }));
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {editingImage ? 'Galeri Resmini Düzenle' : 'Yeni Galeri Resmi Ekle'}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label>Resim Seç</Label>
            <div className="space-y-3">
              <div className="flex gap-4 items-center">
                <MediaSelector
                  onSelect={handleMediaSelect}
                  category="gallery"
                  trigger={
                    <Button type="button" variant="outline">
                      Kütüphaneden Seç
                    </Button>
                  }
                />
                {(formData.image_url || editingImage?.image_url) && (
                  <img
                    src={formData.image_url || editingImage?.image_url}
                    alt="Seçilen resim"
                    className="w-20 h-12 object-cover rounded border"
                  />
                )}
              </div>
              
              <div>
                <Label htmlFor="file-upload">Veya Bilgisayardan Yükle</Label>
                <Input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                />
                {imageFile && (
                  <p className="text-sm text-gray-600 mt-1">
                    Seçilen dosya: {imageFile.name}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div>
            <Label htmlFor="title">Başlık (İsteğe bağlı)</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Resim başlığı"
            />
          </div>

          <div>
            <Label htmlFor="category">Kategori</Label>
            <Select 
              value={formData.category || 'villa'} 
              onValueChange={(value) => {
                console.log('Category selected:', value);
                setFormData(prev => ({ ...prev, category: value }));
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Kategori seçin" />
              </SelectTrigger>
              <SelectContent>
                {categories.length > 0 ? categories.map(cat => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.name}
                  </SelectItem>
                )) : (
                  <SelectItem value="villa">Villa</SelectItem>
                )}
              </SelectContent>
            </Select>
            {formData.category && (
              <p className="text-sm text-gray-500 mt-1">
                Seçilen kategori: {categories.find(c => c.value === formData.category)?.name || formData.category}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="alt_text">Alt Metin (SEO)</Label>
            <Textarea
              id="alt_text"
              value={formData.alt_text}
              onChange={(e) => setFormData(prev => ({ ...prev, alt_text: e.target.value }))}
              placeholder="Resmin açıklaması (erişilebilirlik için)"
              rows={2}
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <Label htmlFor="order_index">Sıralama</Label>
              <Input
                id="order_index"
                type="number"
                value={formData.order_index}
                onChange={(e) => setFormData(prev => ({ ...prev, order_index: parseInt(e.target.value) || 0 }))}
              />
            </div>
            <div className="flex items-center space-x-2 pt-6">
              <Switch
                id="is_active"
                checked={formData.is_active}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_active: checked }))}
              />
              <Label htmlFor="is_active">Aktif</Label>
            </div>
          </div>
        </div>

        <div className="flex gap-2 justify-end pt-4">
          <Button type="button" variant="outline" onClick={onClose}>
            İptal
          </Button>
          <Button onClick={onSubmit} disabled={uploading}>
            {uploading ? 'Yükleniyor...' : editingImage ? 'Güncelle' : 'Ekle'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GalleryImageDialogEnhanced;
