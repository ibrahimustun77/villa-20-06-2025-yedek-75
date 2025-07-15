
import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import IconGallery from './IconGallery';
import { Image, X } from 'lucide-react';

interface IconSelectorEnhancedProps {
  label: string;
  value: string;
  onValueChange: (value: string) => void;
  category?: string;
}

const IconSelectorEnhanced: React.FC<IconSelectorEnhancedProps> = ({
  label,
  value,
  onValueChange,
  category = 'room'
}) => {
  const [open, setOpen] = useState(false);

  const { data: selectedIcon } = useQuery({
    queryKey: ['selected-icon', value],
    queryFn: async () => {
      if (!value) return null;
      
      const { data, error } = await supabase
        .from('property_icons')
        .select('*')
        .eq('id', value)
        .single();
      
      if (error) return null;
      return data;
    },
    enabled: !!value
  });

  const handleIconSelect = (iconId: string) => {
    onValueChange(iconId);
    setOpen(false);
  };

  const clearSelection = () => {
    onValueChange('');
  };

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="flex items-center gap-2">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button 
              variant="outline" 
              className="h-12 px-4 justify-start gap-2 flex-1"
            >
              {selectedIcon ? (
                <>
                  <div 
                    className="w-5 h-5 flex-shrink-0"
                    dangerouslySetInnerHTML={{ __html: selectedIcon.icon_svg }}
                  />
                  <span className="truncate">{selectedIcon.display_name}</span>
                </>
              ) : (
                <>
                  <Image className="w-5 h-5" />
                  <span>İkon seçin</span>
                </>
              )}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh]">
            <DialogHeader>
              <DialogTitle>İkon Seçin - {label}</DialogTitle>
            </DialogHeader>
            <IconGallery
              selectedIconId={value}
              onIconSelect={handleIconSelect}
              category={category}
            />
          </DialogContent>
        </Dialog>
        
        {value && (
          <Button
            variant="outline"
            size="icon"
            onClick={clearSelection}
            className="h-12 w-12 flex-shrink-0"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default IconSelectorEnhanced;
