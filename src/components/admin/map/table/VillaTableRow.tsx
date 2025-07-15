
import React from 'react';
import { Villa } from '../hooks/useMapManagement';
import VillaTypeCell from './VillaTypeCell';
import CoordinateCell from './CoordinateCell';
import VillaTableActions from './VillaTableActions';

interface VillaType {
  id: string;
  name: string;
}

interface VillaTableRowProps {
  villa: Villa;
  isEditing: boolean;
  editingVilla: Villa | null;
  villaTypes: VillaType[];
  isLoadingVillaTypes: boolean;
  setEditingVilla: (villa: Villa) => void;
  onEdit: (villa: Villa) => void;
  onDelete: (id: number) => void;
  onSave: () => void;
  onCancel: () => void;
  getVillaTypeName: (typeId: string) => string;
}

const VillaTableRow: React.FC<VillaTableRowProps> = ({
  villa,
  isEditing,
  editingVilla,
  villaTypes,
  isLoadingVillaTypes,
  setEditingVilla,
  onEdit,
  onDelete,
  onSave,
  onCancel,
  getVillaTypeName
}) => {
  const handleTypeChange = (type: string) => {
    if (editingVilla) {
      setEditingVilla({ ...editingVilla, type });
    }
  };

  const handleXChange = (x: number) => {
    if (editingVilla) {
      setEditingVilla({ ...editingVilla, x });
    }
  };

  const handleYChange = (y: number) => {
    if (editingVilla) {
      setEditingVilla({ ...editingVilla, y });
    }
  };

  return (
    <tr key={villa.id} className="border-b hover:bg-gray-50">
      <td className="p-2">{villa.id}</td>
      <td className="p-2">
        <VillaTypeCell
          isEditing={isEditing}
          currentType={isEditing ? editingVilla?.type || villa.type : villa.type}
          villaTypes={villaTypes}
          isLoadingVillaTypes={isLoadingVillaTypes}
          onChange={handleTypeChange}
          getVillaTypeName={getVillaTypeName}
        />
      </td>
      <td className="p-2">
        <CoordinateCell
          isEditing={isEditing}
          value={isEditing ? editingVilla?.x || villa.x : villa.x}
          onChange={handleXChange}
        />
      </td>
      <td className="p-2">
        <CoordinateCell
          isEditing={isEditing}
          value={isEditing ? editingVilla?.y || villa.y : villa.y}
          onChange={handleYChange}
        />
      </td>
      <td className="p-2">
        <VillaTableActions
          isEditing={isEditing}
          onEdit={() => onEdit(villa)}
          onDelete={() => onDelete(villa.id)}
          onSave={onSave}
          onCancel={onCancel}
        />
      </td>
    </tr>
  );
};

export default VillaTableRow;
