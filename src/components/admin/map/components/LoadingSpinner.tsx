
import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-64">
      <Loader2 className="w-8 h-8 animate-spin text-therma" />
      <span className="ml-2 text-lg">Veriler yükleniyor...</span>
    </div>
  );
};

export default LoadingSpinner;
