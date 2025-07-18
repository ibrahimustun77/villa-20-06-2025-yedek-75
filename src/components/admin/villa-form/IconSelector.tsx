
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { sanitizeSVG } from '@/utils/security';

interface IconSelectorProps {
  label: string;
  value: string;
  onValueChange: (value: string) => void;
  category?: string;
}

const IconSelector: React.FC<IconSelectorProps> = ({
  label,
  value,
  onValueChange,
  category = 'room'
}) => {
  const { data: icons = [], isLoading, error } = useQuery({
    queryKey: ['property-icons', category],
    queryFn: async () => {
      console.log('IconSelector - Fetching icons for category:', category);
      const { data, error } = await supabase
        .from('property_icons')
        .select('*')
        .eq('category', category)
        .order('display_name');
      
      if (error) {
        console.error('IconSelector - Error fetching icons:', error);
        throw error;
      }
      
      console.log('IconSelector - Fetched icons:', data);
      return data;
    }
  });

  console.log('IconSelector - Component render:', { label, value, category, icons, isLoading, error });

  if (isLoading) {
    return (
      <div>
        <Label>{label}</Label>
        <div className="p-2 text-sm text-gray-500">İkonlar yükleniyor...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Label>{label}</Label>
        <div className="p-2 text-sm text-red-500">İkonlar yüklenirken hata oluştu</div>
      </div>
    );
  }

  if (!icons || icons.length === 0) {
    return (
      <div>
        <Label>{label}</Label>
        <div className="p-2 text-sm text-gray-500">Bu kategori için ikon bulunamadı</div>
      </div>
    );
  }

  const selectedIcon = icons.find(icon => icon.id === value);

  return (
    <div>
      <Label>{label}</Label>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger>
          <SelectValue placeholder="İkon seçin">
            {selectedIcon && (
              <div className="flex items-center gap-2">
                <div 
                  className="w-4 h-4 flex-shrink-0"
                  dangerouslySetInnerHTML={{ __html: sanitizeSVG(selectedIcon.icon_svg) }}
                />
                <span className="truncate">{selectedIcon.display_name}</span>
              </div>
            )}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {icons.map(icon => (
            <SelectItem key={icon.id} value={icon.id}>
              <div className="flex items-center gap-2">
                <div 
                  className="w-4 h-4 flex-shrink-0"
                  dangerouslySetInnerHTML={{ __html: sanitizeSVG(icon.icon_svg) }}
                />
                <span>{icon.display_name}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default IconSelector;
