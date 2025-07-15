
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Villa } from './hooks/useMapManagement';
import { fetchVillaTypes } from '@/services/villaTypeService';
import VillaTableHeader from './table/VillaTableHeader';
import VillaTableRow from './table/VillaTableRow';

interface VillaTableProps {
  villas: Villa[];
  editingVilla: Villa | null;
  setEditingVilla: (villa: Villa) => void;
  onAdd: () => void;
  onEdit: (villa: Villa) => void;
  onDelete: (id: number) => void;
  onSave: () => void;
  onCancel: () => void;
}

const VillaTable: React.FC<VillaTableProps> = ({
  villas,
  editingVilla,
  setEditingVilla,
  onAdd,
  onEdit,
  onDelete,
  onSave,
  onCancel
}) => {
  // Fetch villa types from database with stable configuration
  const { data: villaTypes = [], isLoading: isLoadingVillaTypes, error } = useQuery({
    queryKey: ['villaTypes'],
    queryFn: fetchVillaTypes,
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 15 * 60 * 1000, // 15 minutes (previously cacheTime)
    retry: 1,
    refetchOnWindowFocus: false,
    refetchOnMount: false
  });

  console.log('VillaTable - Villa types loaded:', villaTypes);
  console.log('VillaTable - Loading status:', isLoadingVillaTypes);
  console.log('VillaTable - Error:', error);

  const getVillaTypeName = React.useCallback((typeId: string) => {
    if (isLoadingVillaTypes) return 'Yükleniyor...';
    if (!villaTypes || villaTypes.length === 0) return typeId;
    
    const villaType = villaTypes.find(vt => vt.id === typeId);
    return villaType?.name || typeId;
  }, [villaTypes, isLoadingVillaTypes]);

  if (isLoadingVillaTypes) {
    return (
      <div className="glass-card p-6 rounded-xl mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Villalar</h3>
          <button
            onClick={onAdd}
            className="px-4 py-2 bg-therma text-white rounded-lg hover:bg-therma-dark transition-colors"
          >
            + Yeni Villa
          </button>
        </div>
        <div className="text-center py-4">Villa tipleri yükleniyor...</div>
      </div>
    );
  }

  return (
    <div className="glass-card p-6 rounded-xl mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold">Villalar</h3>
        <button
          onClick={onAdd}
          className="px-4 py-2 bg-therma text-white rounded-lg hover:bg-therma-dark transition-colors"
        >
          + Yeni Villa
        </button>
      </div>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          Villa tipleri yüklenirken hata oluştu. Lütfen sayfayı yenileyin.
        </div>
      )}
      
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <VillaTableHeader />
          <tbody>
            {villas.map((villa) => (
              <VillaTableRow
                key={villa.id}
                villa={villa}
                isEditing={editingVilla?.id === villa.id}
                editingVilla={editingVilla}
                villaTypes={villaTypes}
                isLoadingVillaTypes={isLoadingVillaTypes}
                setEditingVilla={setEditingVilla}
                onEdit={onEdit}
                onDelete={onDelete}
                onSave={onSave}
                onCancel={onCancel}
                getVillaTypeName={getVillaTypeName}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VillaTable;
