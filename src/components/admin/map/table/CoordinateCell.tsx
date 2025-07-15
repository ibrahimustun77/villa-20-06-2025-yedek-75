
import React from 'react';

interface CoordinateCellProps {
  isEditing: boolean;
  value: number;
  onChange: (value: number) => void;
}

const CoordinateCell: React.FC<CoordinateCellProps> = ({
  isEditing,
  value,
  onChange
}) => {
  if (isEditing) {
    return (
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value) || 0)}
        className="border rounded px-2 py-1 w-20"
        min={0}
        max={100}
      />
    );
  }

  return <span>{value}</span>;
};

export default CoordinateCell;
