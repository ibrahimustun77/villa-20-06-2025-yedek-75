
import React from 'react';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { VillaFormDetailsProps } from './types';

const VillaFormDetails: React.FC<VillaFormDetailsProps> = ({
  formData,
  onFieldChange
}) => {
  return (
    <div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="bedrooms">Yatak Odası</Label>
          <Input 
            id="bedrooms"
            name="bedrooms"
            type="number"
            value={formData.bedrooms || 0}
            onChange={onFieldChange}
            min={0}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="bathrooms">Banyo</Label>
          <Input 
            id="bathrooms"
            name="bathrooms"
            type="number"
            value={formData.bathrooms || 0}
            onChange={onFieldChange}
            min={0}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="living_rooms">Oturma Odası</Label>
          <Input 
            id="living_rooms"
            name="living_rooms"
            type="number"
            value={formData.living_rooms || 0}
            onChange={onFieldChange}
            min={0}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="halls">Salon</Label>
          <Input 
            id="halls"
            name="halls"
            type="number"
            value={formData.halls || 0}
            onChange={onFieldChange}
            min={0}
          />
        </div>
      </div>
    </div>
  );
};

export default VillaFormDetails;
