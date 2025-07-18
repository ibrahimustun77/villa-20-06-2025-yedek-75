
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';
import { sanitizeSVG } from '@/utils/security';

interface PropertyIcon {
  id: string;
  icon_name: string;
  icon_svg: string;
  category: string;
  display_name: string;
}

interface IconGalleryProps {
  selectedIconId?: string;
  onIconSelect: (iconId: string) => void;
  category?: string;
}

const IconGallery: React.FC<IconGalleryProps> = ({
  selectedIconId,
  onIconSelect,
  category = 'room'
}) => {
  const { data: icons = [], isLoading } = useQuery({
    queryKey: ['property-icons-gallery', category],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('property_icons')
        .select('*')
        .eq('category', category)
        .order('display_name');
      
      if (error) throw error;
      return data as PropertyIcon[];
    }
  });

  if (isLoading) {
    return (
      <div className="p-4 text-center text-gray-500">
        İkonlar yükleniyor...
      </div>
    );
  }

  if (!icons || icons.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        Bu kategori için ikon bulunamadı.
      </div>
    );
  }

  // Kategoriye göre ikonları grupla
  const groupedIcons = icons.reduce((acc, icon) => {
    const group = acc[icon.category] || [];
    group.push(icon);
    acc[icon.category] = group;
    return acc;
  }, {} as Record<string, PropertyIcon[]>);

  return (
    <div className="space-y-4">
      {Object.entries(groupedIcons).map(([cat, categoryIcons]) => (
        <div key={cat} className="space-y-2">
          <Badge variant="outline" className="capitalize">
            {cat === 'room' ? 'Oda' : cat === 'facility' ? 'Tesis' : 'Konfor'}
          </Badge>
          <ScrollArea className="h-64">
            <div className="grid grid-cols-4 gap-2 p-2">
              {categoryIcons.map((icon) => (
                <Button
                  key={icon.id}
                  variant={selectedIconId === icon.id ? "default" : "outline"}
                  className="h-20 flex flex-col gap-1 relative"
                  onClick={() => onIconSelect(icon.id)}
                >
                  {selectedIconId === icon.id && (
                    <Check className="absolute top-1 right-1 h-3 w-3" />
                  )}
                  <div 
                    className="w-6 h-6"
                    dangerouslySetInnerHTML={{ __html: sanitizeSVG(icon.icon_svg) }}
                  />
                  <span className="text-xs text-center leading-tight">
                    {icon.display_name}
                  </span>
                </Button>
              ))}
            </div>
          </ScrollArea>
        </div>
      ))}
    </div>
  );
};

export default IconGallery;
