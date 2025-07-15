
import React from 'react';
import WhatsAppIconSettings from './WhatsAppIconSettings';
import PhoneIconSettings from './PhoneIconSettings';
import { UseFormReturn } from 'react-hook-form';

interface IconSettingsGridProps {
  form: UseFormReturn<any>;
  iconSizes: { label: string; value: string }[];
  iconStyles: { label: string; value: string }[];
}

const IconSettingsGrid: React.FC<IconSettingsGridProps> = ({ form, iconSizes, iconStyles }) => {
  console.log('IconSettingsGrid rendering with:', { iconSizes, iconStyles });
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <WhatsAppIconSettings form={form} iconSizes={iconSizes} iconStyles={iconStyles} />
      <PhoneIconSettings form={form} iconSizes={iconSizes} iconStyles={iconStyles} />
    </div>
  );
};

export default IconSettingsGrid;
