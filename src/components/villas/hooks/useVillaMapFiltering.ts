
import { useState } from 'react';

export const useVillaMapFiltering = () => {
  const [filteredVillaType, setFilteredVillaType] = useState<string | null>(null);

  const handleFilterByType = (type: string | null) => {
    console.log("Filtering by type:", type);
    console.log("Current filtered type:", filteredVillaType);
    setFilteredVillaType(type === filteredVillaType ? null : type);
  };

  return {
    filteredVillaType,
    handleFilterByType
  };
};
