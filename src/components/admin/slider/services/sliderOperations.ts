import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { SliderImage } from '../hooks/useSliderManagement';

export const sliderOperations = {
  async submit(formData: any, editingSlider: SliderImage | null, activePageType: string, filteredImages: SliderImage[]) {
    console.log('Submitting slider data:', { formData, editingSlider, activePageType });
    
    if (!formData.image_url) {
      toast({
        title: 'Hata',
        description: 'Lütfen bir resim seçin',
        variant: 'destructive'
      });
      return false;
    }

    try {
      const maxOrder = filteredImages.length > 0 
        ? Math.max(...filteredImages.map(img => img.order_index))
        : -1;
      
      if (editingSlider) {
        console.log('Updating slider image:', editingSlider.id);
        const { error } = await supabase
          .from('slider_images')
          .update({
            image_url: formData.image_url,
            title: formData.title || null,
            description: formData.description || null,
            is_active: formData.is_active
          })
          .eq('id', editingSlider.id);
        
        if (error) throw error;
        
        toast({
          title: 'Başarılı',
          description: 'Slider resmi güncellendi'
        });
      } else {
        console.log('Creating new slider image for page:', activePageType);
        const insertData = {
          image_url: formData.image_url,
          title: formData.title || null,
          description: formData.description || null,
          is_active: formData.is_active,
          page_type: activePageType,
          order_index: maxOrder + 1
        };
        
        console.log('Insert data:', insertData);
        
        const { error } = await supabase
          .from('slider_images')
          .insert(insertData);
        
        if (error) throw error;
        
        toast({
          title: 'Başarılı',
          description: 'Slider resmi eklendi'
        });
      }

      return true;
    } catch (error: any) {
      console.error('Submit error:', error);
      toast({
        title: 'Hata',
        description: error.message,
        variant: 'destructive'
      });
      return false;
    }
  },

  async delete(id: string) {
    if (!confirm('Bu slider resmini silmek istediğinizden emin misiniz?')) return false;

    try {
      const { error } = await supabase
        .from('slider_images')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: 'Başarılı',
        description: 'Slider resmi silindi'
      });
      
      return true;
    } catch (error: any) {
      toast({
        title: 'Hata',
        description: error.message,
        variant: 'destructive'
      });
      return false;
    }
  },

  async bulkDelete(selectedImages: string[]) {
    if (selectedImages.length === 0) return false;
    
    if (!confirm(`${selectedImages.length} slider resmini silmek istediğinizden emin misiniz?`)) return false;

    try {
      const { error } = await supabase
        .from('slider_images')
        .delete()
        .in('id', selectedImages);

      if (error) throw error;

      toast({
        title: 'Başarılı',
        description: `${selectedImages.length} slider resmi silindi`
      });
      
      return true;
    } catch (error: any) {
      toast({
        title: 'Hata',
        description: error.message,
        variant: 'destructive'
      });
      return false;
    }
  },

  async toggleActive(id: string, isActive: boolean) {
    try {
      const { error } = await supabase
        .from('slider_images')
        .update({ is_active: isActive })
        .eq('id', id);

      if (error) throw error;
      return true;
    } catch (error: any) {
      toast({
        title: 'Hata',
        description: error.message,
        variant: 'destructive'
      });
      return false;
    }
  },

  async moveUp(slider: SliderImage, filteredImages: SliderImage[]) {
    const currentIndex = filteredImages.findIndex(img => img.id === slider.id);
    if (currentIndex <= 0) return false;

    const aboveSlider = filteredImages[currentIndex - 1];
    
    try {
      await supabase
        .from('slider_images')
        .update({ order_index: aboveSlider.order_index })
        .eq('id', slider.id);
        
      await supabase
        .from('slider_images')
        .update({ order_index: slider.order_index })
        .eq('id', aboveSlider.id);

      return true;
    } catch (error: any) {
      toast({
        title: 'Hata',
        description: error.message,
        variant: 'destructive'
      });
      return false;
    }
  },

  async moveDown(slider: SliderImage, filteredImages: SliderImage[]) {
    const currentIndex = filteredImages.findIndex(img => img.id === slider.id);
    if (currentIndex >= filteredImages.length - 1) return false;

    const belowSlider = filteredImages[currentIndex + 1];
    
    try {
      await supabase
        .from('slider_images')
        .update({ order_index: belowSlider.order_index })
        .eq('id', slider.id);
        
      await supabase
        .from('slider_images')
        .update({ order_index: slider.order_index })
        .eq('id', belowSlider.id);

      return true;
    } catch (error: any) {
      toast({
        title: 'Hata',
        description: error.message,
        variant: 'destructive'
      });
      return false;
    }
  },

  async reorderImages(filteredImages: SliderImage[], selectedImages: string[]) {
    const currentPageImages = filteredImages.filter(img => !selectedImages.includes(img.id));
    
    for (let i = 0; i < currentPageImages.length; i++) {
      await supabase
        .from('slider_images')
        .update({ order_index: i })
        .eq('id', currentPageImages[i].id);
    }
  }
};
