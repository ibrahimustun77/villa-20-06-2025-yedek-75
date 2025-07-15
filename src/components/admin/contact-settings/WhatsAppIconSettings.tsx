
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UseFormReturn } from 'react-hook-form';
import IconUploader from './IconUploader';
import IconPreview from './IconPreview';

interface WhatsAppIconSettingsProps {
  form: UseFormReturn<any>;
  iconSizes: { label: string; value: string }[];
  iconStyles: { label: string; value: string }[];
}

const WhatsAppIconSettings: React.FC<WhatsAppIconSettingsProps> = ({ 
  form, 
  iconSizes, 
  iconStyles 
}) => {
  return (
    <div className="space-y-4 p-4 border rounded-md">
      <h5 className="font-medium">WhatsApp İkonu</h5>
      
      <FormField
        control={form.control}
        name="whatsapp_icon_size"
        render={({ field }) => (
          <FormItem>
            <FormLabel>İkon Boyutu</FormLabel>
            <Select 
              onValueChange={field.onChange} 
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="İkon boyutu seçin" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {iconSizes.map((size) => (
                  <SelectItem key={size.value} value={size.value}>
                    {size.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="whatsapp_icon_style"
        render={({ field }) => (
          <FormItem>
            <FormLabel>İkon Stili</FormLabel>
            <Select 
              onValueChange={field.onChange} 
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="İkon stili seçin" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {iconStyles.map((style) => (
                  <SelectItem key={style.value} value={style.value}>
                    {style.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="whatsapp_icon_url"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Özel İkon (GIF veya görsel)</FormLabel>
            <IconUploader
              iconUrl={field.value}
              onIconUploaded={(url) => form.setValue('whatsapp_icon_url', url)}
              onIconCleared={() => form.setValue('whatsapp_icon_url', '')}
              label="WhatsApp"
              id="whatsapp-icon-upload"
            />
            <input type="hidden" {...field} />
            <FormMessage />
          </FormItem>
        )}
      />

      <IconPreview 
        iconUrl={form.watch('whatsapp_icon_url')} 
        defaultIcon={
          <div className="bg-green-500 text-white p-2 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"></path>
              <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z"></path>
              <path d="M14 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z"></path>
              <path d="M9 15h6"></path>
            </svg>
          </div>
        }
        label="WhatsApp"
      />
    </div>
  );
};

export default WhatsAppIconSettings;
