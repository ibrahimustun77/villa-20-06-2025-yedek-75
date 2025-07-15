
import React from 'react';

interface VillaDescriptionProps {
  name: string;
  description: string;
  details: string;
}

const VillaDescription: React.FC<VillaDescriptionProps> = ({ 
  name, 
  description, 
  details
}) => {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{name}</h2>
          <p className="text-gray-600 text-lg leading-relaxed">{description}</p>
        </div>
      </div>
      
      {details && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{details}</p>
        </div>
      )}
    </div>
  );
};

export default VillaDescription;
