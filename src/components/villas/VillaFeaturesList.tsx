
import React from 'react';

interface VillaFeaturesListProps {
  features: string[];
}

const VillaFeaturesList: React.FC<VillaFeaturesListProps> = ({ features }) => {
  return (
    <>
      <h3 className="font-bold text-lg mb-3">Öne Çıkan Özellikler</h3>
      <div className="grid grid-cols-2 gap-2 mb-8">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5 text-therma mr-2 flex-shrink-0"
            >
              <path d="M5 12l5 5L20 7"></path>
            </svg>
            <span className="text-gray-700 text-sm">{feature}</span>
          </div>
        ))}
      </div>
    </>
  );
};

export default VillaFeaturesList;
