
import React from 'react';
import VillaCard from './VillaCard';
import { Villa } from '@/services/villaService';

interface VillasListProps {
  villas: Villa[];
  isLoading: boolean;
  searchQuery: string;
  onEdit: (villa: Villa) => void;
  onDelete: (villa: Villa) => void;
  onCopy: (villa: Villa) => void;
}

const VillasList: React.FC<VillasListProps> = ({ villas, isLoading, searchQuery, onEdit, onDelete, onCopy }) => {
  const filteredVillas = villas.filter((villa: Villa) => 
    villa.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    villa.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return <div className="text-center py-8">Yükleniyor...</div>;
  }

  if (filteredVillas.length === 0) {
    return (
      <div className="text-center py-8">
        {searchQuery ? 'Aramanızla eşleşen villa bulunamadı.' : 'Henüz villa eklenmemiş.'}
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {filteredVillas.map((villa: Villa) => (
        <VillaCard 
          key={villa.id} 
          villa={villa} 
          onEdit={onEdit} 
          onDelete={onDelete}
          onCopy={onCopy}
        />
      ))}
    </div>
  );
};

export default VillasList;
