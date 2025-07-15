
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { createSliderImage, updateSliderImage, SliderImage } from '@/services/sliderService';
import { useToast } from '@/components/ui/use-toast';

interface SliderImageFormProps {
  sliderImage?: SliderImage | null;
  onComplete: () => void;
  pageType?: string;
}

const SliderImageForm: React.FC<SliderImageFormProps> = ({ sliderImage, onComplete, pageType = 'home' }) => {
  const [formData, setFormData] = useState({
    image_url: '',
    title: '',
    description: '',
    order_index: 0,
    is_active: true,
    page_type: pageType,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (sliderImage) {
      setFormData({
        image_url: sliderImage.image_url || '',
        title: sliderImage.title || '',
        description: sliderImage.description || '',
        order_index: sliderImage.order_index || 0,
        is_active: sliderImage.is_active,
        page_type: sliderImage.page_type || pageType,
      });
    }
  }, [sliderImage, pageType]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (sliderImage) {
        await updateSliderImage(sliderImage.id, formData);
        toast({
          title: 'Başarılı',
          description: 'Slider resmi başarıyla güncellendi.',
        });
      } else {
        await createSliderImage(formData);
        toast({
          title: 'Başarılı',
          description: 'Yeni slider resmi başarıyla eklendi.',
        });
      }
      onComplete();
    } catch (error) {
      toast({
        title: 'Hata',
        description: 'İşlem sırasında bir hata oluştu.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="image_url">Resim URL'si *</Label>
        <Input
          id="image_url"
          type="url"
          value={formData.image_url}
          onChange={(e) => handleInputChange('image_url', e.target.value)}
          placeholder="https://example.com/image.jpg"
          required
        />
      </div>

      <div>
        <Label htmlFor="title">Başlık</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => handleInputChange('title', e.target.value)}
          placeholder="Slider resmi başlığı"
        />
      </div>

      <div>
        <Label htmlFor="description">Açıklama</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          placeholder="Slider resmi açıklaması"
          rows={3}
        />
      </div>

      <div>
        <Label htmlFor="order_index">Sıra Numarası</Label>
        <Input
          id="order_index"
          type="number"
          value={formData.order_index}
          onChange={(e) => handleInputChange('order_index', parseInt(e.target.value) || 0)}
          min="0"
        />
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="is_active"
          checked={formData.is_active}
          onCheckedChange={(checked) => handleInputChange('is_active', checked)}
        />
        <Label htmlFor="is_active">Aktif</Label>
      </div>

      {formData.image_url && (
        <div>
          <Label>Önizleme</Label>
          <div className="mt-2 border rounded-lg overflow-hidden">
            <img 
              src={formData.image_url} 
              alt="Önizleme"
              className="w-full h-48 object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
          </div>
        </div>
      )}

      <div className="flex justify-end space-x-2 pt-4">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Kaydediliyor...' : sliderImage ? 'Güncelle' : 'Ekle'}
        </Button>
      </div>
    </form>
  );
};

export default SliderImageForm;
