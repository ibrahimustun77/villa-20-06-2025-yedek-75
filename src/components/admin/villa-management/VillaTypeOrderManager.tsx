
import React, { useState } from 'react';
import { VillaType } from '@/services/types';
import { Button } from '@/components/ui/button';
import { ChevronUp, ChevronDown, GripVertical } from 'lucide-react';
import { updateVillaTypeOrder } from '@/services/villaTypeService';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

interface VillaTypeOrderManagerProps {
  villaTypes: VillaType[];
}

const VillaTypeOrderManager: React.FC<VillaTypeOrderManagerProps> = ({ villaTypes }) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const queryClient = useQueryClient();

  const handleMoveUp = async (villaType: VillaType, currentIndex: number) => {
    if (currentIndex === 0) return;
    
    setIsUpdating(true);
    try {
      const currentOrder = villaType.sort_order || currentIndex + 1;
      const newOrder = currentOrder - 1;
      
      const success = await updateVillaTypeOrder(villaType.id, newOrder);
      if (success) {
        // Also update the villa type that was above
        const aboveVillaType = villaTypes[currentIndex - 1];
        await updateVillaTypeOrder(aboveVillaType.id, currentOrder);
        
        queryClient.invalidateQueries({ queryKey: ['villaTypes'] });
        toast.success('Sıralama güncellendi');
      }
    } catch (error) {
      console.error('Error moving villa type up:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleMoveDown = async (villaType: VillaType, currentIndex: number) => {
    if (currentIndex === villaTypes.length - 1) return;
    
    setIsUpdating(true);
    try {
      const currentOrder = villaType.sort_order || currentIndex + 1;
      const newOrder = currentOrder + 1;
      
      const success = await updateVillaTypeOrder(villaType.id, newOrder);
      if (success) {
        // Also update the villa type that was below
        const belowVillaType = villaTypes[currentIndex + 1];
        await updateVillaTypeOrder(belowVillaType.id, currentOrder);
        
        queryClient.invalidateQueries({ queryKey: ['villaTypes'] });
        toast.success('Sıralama güncellendi');
      }
    } catch (error) {
      console.error('Error moving villa type down:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Villa Tipi Sıralaması</h3>
      <div className="space-y-2">
        {villaTypes.map((villaType, index) => (
          <div key={villaType.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <GripVertical className="w-5 h-5 text-gray-400" />
            <div className="flex-1">
              <span className="font-medium">{villaType.name}</span>
              <span className="ml-2 text-sm text-gray-500">
                (Sıra: {villaType.sort_order || index + 1})
              </span>
            </div>
            <div className="flex gap-1">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleMoveUp(villaType, index)}
                disabled={index === 0 || isUpdating}
              >
                <ChevronUp className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleMoveDown(villaType, index)}
                disabled={index === villaTypes.length - 1 || isUpdating}
              >
                <ChevronDown className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VillaTypeOrderManager;
