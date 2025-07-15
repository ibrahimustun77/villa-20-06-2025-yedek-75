
import React from 'react';
import { Image } from 'lucide-react';

const NoImagesPlaceholder: React.FC = () => {
  return (
    <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gray-200 h-[350px] md:h-[500px] flex items-center justify-center">
      <div className="flex flex-col items-center justify-center text-gray-500">
        <Image className="w-12 h-12 mb-2 opacity-40" />
        <p>Resim bulunmuyor</p>
      </div>
    </div>
  );
};

export default NoImagesPlaceholder;
