
import React from 'react';

interface VillaType {
  id: string;
  name: string;
}

interface VillaTypeCellProps {
  isEditing: boolean;
  currentType: string;
  villaTypes: VillaType[];
  isLoadingVillaTypes: boolean;
  onChange: (type: string) => void;
  getVillaTypeName: (typeId: string) => string;
}

const VillaTypeCell: React.FC<VillaTypeCellProps> = ({
  isEditing,
  currentType,
  villaTypes,
  isLoadingVillaTypes,
  onChange,
  getVillaTypeName
}) => {
  if (isEditing) {
    return (
      <select
        value={currentType}
        onChange={(e) => onChange(e.target.value)}
        className="border rounded px-2 py-1"
        disabled={isLoadingVillaTypes}
      >
        {villaTypes.length > 0 ? (
          villaTypes.map((type) => (
            <option key={type.id} value={type.id}>
              {type.name}
            </option>
          ))
        ) : (
          <option value="">Villa tipleri yükleniyor...</option>
        )}
      </select>
    );
  }

  return <span>{getVillaTypeName(currentType)}</span>;
};

export default VillaTypeCell;
