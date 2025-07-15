
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface ManagementHeaderProps {
  activeTab: string;
  onAddVilla: () => void;
  onAddVillaType: () => void;
}

const ManagementHeader: React.FC<ManagementHeaderProps> = ({ 
  activeTab,
  onAddVilla,
  onAddVillaType
}) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <h2 className="text-3xl font-bold">Villa Yönetimi</h2>
      <div className="flex gap-2">
        {activeTab === 'villas' ? (
          <Button onClick={onAddVilla}>
            <Plus className="mr-2 h-4 w-4" />
            Yeni Villa
          </Button>
        ) : (
          <Button onClick={onAddVillaType}>
            <Plus className="mr-2 h-4 w-4" />
            Yeni Villa Tipi
          </Button>
        )}
      </div>
    </div>
  );
};

export default ManagementHeader;
