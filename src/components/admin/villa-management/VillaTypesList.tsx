
import React, { useEffect, useState } from 'react';
import VillaTypeItem from './VillaTypeItem';
import VillaTypeOrderManager from './VillaTypeOrderManager';
import { VillaType } from '@/services/types';
import { Button } from '@/components/ui/button';
import { ArrowUpDown, List } from 'lucide-react';

interface VillaTypesListProps {
  villaTypes: VillaType[];
  isLoading: boolean;
  searchQuery: string;
  onEdit: (villaType: VillaType) => void;
  onDelete: (villaType: VillaType) => void;
}

const VillaTypesList: React.FC<VillaTypesListProps> = ({ villaTypes, isLoading, searchQuery, onEdit, onDelete }) => {
  const [showOrderManager, setShowOrderManager] = useState(false);
  
  // Add debugging to help see what's happening
  useEffect(() => {
    console.log('VillaTypesList - villaTypes received:', villaTypes);
  }, [villaTypes]);
  
  const filteredVillaTypes = villaTypes.filter((type: VillaType) => 
    type.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    type.description?.toLowerCase().includes(searchQuery.toLowerCase() || '')
  );

  if (isLoading) {
    return <div className="text-center py-8">Yükleniyor...</div>;
  }

  if (villaTypes.length === 0) {
    return (
      <div className="text-center py-8">
        Henüz villa tipi eklenmemiş.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Villa Tipleri</h3>
        <Button
          variant="outline"
          onClick={() => setShowOrderManager(!showOrderManager)}
          className="flex items-center gap-2"
        >
          {showOrderManager ? <List className="w-4 h-4" /> : <ArrowUpDown className="w-4 h-4" />}
          {showOrderManager ? 'Liste Görünümü' : 'Sıralama Yönetimi'}
        </Button>
      </div>

      {showOrderManager ? (
        <VillaTypeOrderManager villaTypes={villaTypes} />
      ) : (
        <div className="space-y-4">
          {searchQuery && (
            <div className="text-sm text-gray-600">
              "{searchQuery}" için {filteredVillaTypes.length} sonuç bulundu
            </div>
          )}
          
          {filteredVillaTypes.length === 0 ? (
            <div className="text-center py-8">
              {searchQuery ? 'Aramanızla eşleşen villa tipi bulunamadı.' : 'Villa tipi bulunamadı.'}
            </div>
          ) : (
            filteredVillaTypes.map((type: VillaType) => (
              <VillaTypeItem 
                key={type.id} 
                villaType={type}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default VillaTypesList;
