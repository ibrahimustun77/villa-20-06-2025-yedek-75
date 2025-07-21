
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UseFormReturn } from 'react-hook-form';

interface ContactNumberFieldsProps {
  form: UseFormReturn<any>;
}

const ContactNumberFields: React.FC<ContactNumberFieldsProps> = ({ form }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <FormField
        control={form.control}
        name="whatsapp_number"
        render={({ field }) => (
          <FormItem>
            <FormLabel>WhatsApp Numarası</FormLabel>
            <FormControl>
              <Input placeholder="Örn: 905001234567" {...field} />
            </FormControl>
            <p className="text-xs text-muted-foreground">
              Uluslararası format kullanın (örn: 905001234567)
            </p>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="phone_number"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Telefon Numarası (Ana)</FormLabel>
            <FormControl>
              <Input placeholder="Örn: 905311234567" {...field} />
            </FormControl>
            <p className="text-xs text-muted-foreground">
              Uluslararası format kullanın (örn: 905311234567)
            </p>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="phone_number_secondary"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Telefon Numarası (İkinci)</FormLabel>
            <FormControl>
              <Input placeholder="Örn: 905461234567" {...field} />
            </FormControl>
            <p className="text-xs text-muted-foreground">
              Uluslararası format kullanın (örn: 905461234567)
            </p>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default ContactNumberFields;
