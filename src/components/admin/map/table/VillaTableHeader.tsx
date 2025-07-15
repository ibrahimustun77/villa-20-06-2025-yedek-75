
import React from 'react';

const VillaTableHeader: React.FC = () => {
  return (
    <thead>
      <tr className="border-b">
        <th className="text-left p-2">ID</th>
        <th className="text-left p-2">Tip</th>
        <th className="text-left p-2">X Koordinatı</th>
        <th className="text-left p-2">Y Koordinatı</th>
        <th className="text-left p-2">İşlemler</th>
      </tr>
    </thead>
  );
};

export default VillaTableHeader;
