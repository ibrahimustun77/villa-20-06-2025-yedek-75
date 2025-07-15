
import React, { ReactNode } from 'react';

interface VillaPropertyItemProps {
  icon: ReactNode;
  label: string;
  value: string | number;
}

const VillaPropertyItem: React.FC<VillaPropertyItemProps> = ({ icon, label, value }) => {
  return (
    <div className="flex items-center p-3 md:p-4 bg-white/70 rounded-xl">
      {icon}
      <div>
        <p className="text-xs md:text-sm text-gray-500">{label}</p>
        <p className="text-sm md:text-base font-medium">{value}</p>
      </div>
    </div>
  );
};

export default VillaPropertyItem;
