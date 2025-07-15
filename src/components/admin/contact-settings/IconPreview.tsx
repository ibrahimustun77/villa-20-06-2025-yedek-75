
import React from 'react';

interface IconPreviewProps {
  iconUrl: string | undefined;
  defaultIcon: React.ReactNode;
  label: string;
}

const IconPreview: React.FC<IconPreviewProps> = ({ iconUrl, defaultIcon, label }) => {
  return (
    <div className="mt-2 p-3 bg-gray-50 rounded-md flex justify-center">
      <div className="w-full text-center">
        <div className="mx-auto mb-2 inline-block p-2">
          {iconUrl ? (
            <img 
              src={iconUrl} 
              alt={`${label} icon`} 
              className="w-10 h-10 object-contain"
            />
          ) : (
            defaultIcon
          )}
        </div>
        <p className="text-xs text-gray-500">Önizleme</p>
      </div>
    </div>
  );
};

export default IconPreview;
