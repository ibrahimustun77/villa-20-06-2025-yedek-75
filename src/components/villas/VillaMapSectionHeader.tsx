
import React from 'react';

interface VillaMapSectionHeaderProps {
  totalVillas: number;
}

const VillaMapSectionHeader: React.FC<VillaMapSectionHeaderProps> = ({ totalVillas }) => {
  return (
    <div className="text-center max-w-3xl mx-auto mb-12 animate-on-scroll">
      <span className="inline-block text-sm font-medium text-therma mb-3">YERLEŞİM PLANI</span>
      <h2 className="text-3xl md:text-4xl font-bold mb-6">
        Villaların <span className="text-therma">Konumları</span>
      </h2>
      <p className="text-gray-600 md:text-lg">
        Therma Prime'daki {totalVillas} villanın yerleşim planını inceleyerek, size en uygun villayı seçebilirsiniz.
      </p>
    </div>
  );
};

export default VillaMapSectionHeader;
