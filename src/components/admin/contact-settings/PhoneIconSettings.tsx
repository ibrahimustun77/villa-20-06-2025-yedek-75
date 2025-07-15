
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UseFormReturn } from 'react-hook-form';
import IconUploader from './IconUploader';
import IconPreview from './IconPreview';

interface PhoneIconSettingsProps {
  form: UseFormReturn<any>;
  iconSizes: { label: string; value: string }[];
  iconStyles: { label: string; value: string }[];
}

const PhoneIconSettings: React.FC<PhoneIconSettingsProps> = ({ 
  form, 
  iconSizes, 
  iconStyles 
}) => {
  return (
    <div className="space-y-4 p-4 border rounded-md">
      <h5 className="font-medium">Telefon İkonu</h5>
      
      <FormField
        control={form.control}
        name="phone_icon_size"
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
        name="phone_icon_style"
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
        name="phone_icon_url"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Özel İkon (GIF veya görsel)</FormLabel>
            <IconUploader
              iconUrl={field.value}
              onIconUploaded={(url) => form.setValue('phone_icon_url', url)}
              onIconCleared={() => form.setValue('phone_icon_url', '')}
              label="Telefon"
              id="phone-icon-upload"
            />
            <input type="hidden" {...field} />
            <FormMessage />
          </FormItem>
        )}
      />

      <IconPreview 
        iconUrl={form.watch('phone_icon_url')} 
        defaultIcon={
          <div className="bg-blue-500 text-white p-2 rounded-full">
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
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
          </div>
        }
        label="Telefon"
      />
    </div>
  );
};

export default PhoneIconSettings;
