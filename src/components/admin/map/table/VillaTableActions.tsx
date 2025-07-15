
import React from 'react';
import { Pencil, Trash2, Check, X } from 'lucide-react';

interface VillaTableActionsProps {
  isEditing: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onSave: () => void;
  onCancel: () => void;
}

const VillaTableActions: React.FC<VillaTableActionsProps> = ({
  isEditing,
  onEdit,
  onDelete,
  onSave,
  onCancel
}) => {
  if (isEditing) {
    return (
      <div className="flex gap-2">
        <button
          onClick={onSave}
          className="text-green-600 hover:text-green-800"
          title="Kaydet"
        >
          <Check size={16} />
        </button>
        <button
          onClick={onCancel}
          className="text-red-600 hover:text-red-800"
          title="İptal"
        >
          <X size={16} />
        </button>
      </div>
    );
  }

  return (
    <div className="flex gap-2">
      <button
        onClick={onEdit}
        className="text-blue-600 hover:text-blue-800"
        title="Düzenle"
      >
        <Pencil size={16} />
      </button>
      <button
        onClick={onDelete}
        className="text-red-600 hover:text-red-800"
        title="Sil"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
};

export default VillaTableActions;
