
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { updateContactSettings } from '@/services/contactSettingsService';
import { useContactSettings } from '@/contexts/ContactSettingsContext';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import ContactNumberFields from './contact-settings/ContactNumberFields';
import IconSettingsGrid from './contact-settings/IconSettingsGrid';

interface ContactSettingsForm {
  whatsapp_number: string;
  phone_number: string;
  phone_number_secondary: string;
  whatsapp_icon_size: string;
  phone_icon_size: string;
  whatsapp_icon_style: string;
  phone_icon_style: string;
  whatsapp_icon_url?: string;
  phone_icon_url?: string;
  location_iframe?: string;
  facebook_url?: string;
  instagram_url?: string;
}

const iconSizes = [
  { label: "Küçük", value: "small" },
  { label: "Normal", value: "medium" },
  { label: "Büyük", value: "large" },
];

const iconStyles = [
  { label: "Standart", value: "standard" },
  { label: "Modern", value: "modern" },
  { label: "Minimal", value: "minimal" },
];

const ContactSettings: React.FC = () => {
  const { contactSettings, refetch } = useContactSettings();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ContactSettingsForm>({
    defaultValues: {
      whatsapp_number: '',
      phone_number: '',
      phone_number_secondary: '',
      whatsapp_icon_size: 'medium',
      phone_icon_size: 'medium',
      whatsapp_icon_style: 'standard',
      phone_icon_style: 'standard',
      whatsapp_icon_url: '',
      phone_icon_url: '',
      location_iframe: '',
      facebook_url: '',
      instagram_url: '',
    },
  });

  useEffect(() => {
    if (contactSettings) {
      form.reset({
        whatsapp_number: contactSettings.whatsapp_number || '',
        phone_number: contactSettings.phone_number || '',
        phone_number_secondary: contactSettings.phone_number_secondary || '',
        whatsapp_icon_size: contactSettings.whatsapp_icon_size || 'medium',
        phone_icon_size: contactSettings.phone_icon_size || 'medium',
        whatsapp_icon_style: contactSettings.whatsapp_icon_style || 'standard',
        phone_icon_style: contactSettings.phone_icon_style || 'standard',
        whatsapp_icon_url: contactSettings.whatsapp_icon_url || '',
        phone_icon_url: contactSettings.phone_icon_url || '',
        location_iframe: contactSettings.location_iframe || '',
        facebook_url: contactSettings.facebook_url || '',
        instagram_url: contactSettings.instagram_url || '',
      });
    }
  }, [contactSettings, form]);

  const onSubmit = async (data: ContactSettingsForm) => {
    if (!contactSettings?.id) {
      toast.error('Ayarlar bulunamadı');
      return;
    }

    setIsLoading(true);
    try {
      await updateContactSettings(contactSettings.id, data);
      await refetch();
      toast.success('İletişim ayarları güncellendi');
    } catch (error) {
      console.error('Error updating contact settings:', error);
      toast.error('Ayarlar güncellenirken bir hata oluştu');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">İletişim Ayarları</h3>
        <p className="text-sm text-gray-500">
          İletişim butonları ve bilgileri için ayarları yapılandırın.
        </p>
      </div>

      <Separator />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <ContactNumberFields form={form} />

          <Separator />
          
          <h4 className="font-medium">İkon Görünüm Ayarları</h4>
          <p className="text-sm text-gray-500 mb-4">
            İletişim butonlarının boyutlarını ve stillerini ayarlayın.
          </p>

          <IconSettingsGrid form={form} iconSizes={iconSizes} iconStyles={iconStyles} />

          <Separator />
          
          <div>
            <h4 className="font-medium mb-2">Konum Ayarları</h4>
            <p className="text-sm text-gray-500 mb-4">
              İletişim sayfasında gösterilecek konum iframe kodunu girin.
            </p>
            
            <FormField
              control={form.control}
              name="location_iframe"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Google Maps Iframe Kodu</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='<iframe src="https://www.google.com/maps/embed?..." width="600" height="450" frameborder="0" allowfullscreen></iframe>'
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Separator />
          
          <div>
            <h4 className="font-medium mb-2">Sosyal Medya Ayarları</h4>
            <p className="text-sm text-gray-500 mb-4">
              Footer'da gösterilecek sosyal medya linklerini ekleyin.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="facebook_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Facebook URL</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://facebook.com/yourpage"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="instagram_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Instagram URL</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://instagram.com/yourpage"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex justify-end">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Kaydediliyor...' : 'Kaydet'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ContactSettings;
