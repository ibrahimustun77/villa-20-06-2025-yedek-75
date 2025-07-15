
import React, { useState } from 'react';
import VillaTable from './VillaTable';
import VillaAddModal from './VillaAddModal';
import { Villa } from './hooks/useMapManagement';

interface MapManagementTablesProps {
  villas: Villa[];
  editingVilla: Villa | null;
  setEditingVilla: (villa: Villa) => void;
  onAddVilla: (villaData?: { type: string; x: number; y: number }) => void;
  onEditVilla: (villa: Villa) => void;
  onDeleteVilla: (id: number) => void;
  onSaveVilla: () => void;
  onCancelVilla: () => void;
  onSave: () => void;
  onLoad: () => void;
}

const MapManagementTables: React.FC<MapManagementTablesProps> = ({
  villas,
  editingVilla,
  setEditingVilla,
  onAddVilla,
  onEditVilla,
  onDeleteVilla,
  onSaveVilla,
  onCancelVilla,
  onSave,
  onLoad
}) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleAddVilla = () => {
    setIsAddModalOpen(true);
  };

  const handleModalAdd = async (villaData: { type: string; x: number; y: number }) => {
    // Villa ekle ve otomatik kaydet
    onAddVilla(villaData);
    setIsAddModalOpen(false);
    // Kısa bir gecikme ile kaydet
    setTimeout(() => {
      onSave();
    }, 100);
  };

  return (
    <div>
      <VillaTable 
        villas={villas} 
        editingVilla={editingVilla} 
        onAdd={handleAddVilla}
        onEdit={onEditVilla}
        onDelete={onDeleteVilla}
        onSave={onSaveVilla}
        onCancel={onCancelVilla}
        setEditingVilla={setEditingVilla}
      />

      <VillaAddModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleModalAdd}
      />

      {/* Tek kaydetme butonu */}
      <div className="mt-8 flex justify-between">
        <button
          onClick={onLoad}
          className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
        >
          Kaydedilmiş Verileri Yükle
        </button>
        <button
          onClick={onSave}
          className="px-6 py-3 bg-therma text-white rounded-lg hover:bg-therma-dark transition-colors font-semibold"
        >
          Tüm Değişiklikleri Kaydet
        </button>
      </div>
    </div>
  );
};

export default MapManagementTables;
