
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import MediaSelector from '../../media/MediaSelector';
import { SliderImage } from '../hooks/useSliderManagement';

interface SliderFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  editingSlider: SliderImage | null;
  formData: {
    image_url: string;
    title: string;
    description: string;
    is_active: boolean;
  };
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  onSubmit: (e: React.FormEvent) => void;
  onMediaSelect: (media: any) => void;
}

const SliderFormDialog: React.FC<SliderFormDialogProps> = ({
  isOpen,
  onClose,
  editingSlider,
  formData,
  setFormData,
  onSubmit,
  onMediaSelect
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {editingSlider ? 'Slider Resmi Düzenle' : 'Yeni Slider Resmi Ekle'}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <Label>Resim Seç</Label>
            <div className="flex gap-4 items-center">
              <MediaSelector
                onSelect={onMediaSelect}
                category="slider"
                trigger={
                  <Button type="button" variant="outline">
                    Resim Seç
                  </Button>
                }
              />
              {formData.image_url && (
                <img
                  src={formData.image_url}
                  alt="Seçilen resim"
                  className="w-20 h-12 object-cover rounded border"
                />
              )}
            </div>
          </div>
          
          <div>
            <Label htmlFor="title">Başlık (İsteğe bağlı)</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Slider başlığı"
            />
          </div>
          
          <div>
            <Label htmlFor="description">Açıklama (İsteğe bağlı)</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Slider açıklaması"
              rows={3}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="is_active"
              checked={formData.is_active}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_active: checked }))}
            />
            <Label htmlFor="is_active">Aktif</Label>
          </div>
          
          <div className="flex gap-2 justify-end">
            <Button type="button" variant="outline" onClick={onClose}>
              İptal
            </Button>
            <Button type="submit">
              {editingSlider ? 'Güncelle' : 'Ekle'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SliderFormDialog;
