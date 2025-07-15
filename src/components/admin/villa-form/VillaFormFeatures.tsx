
import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';
import { Label } from '../../ui/label';
import { VillaFormFeaturesProps } from './types';

const VillaFormFeatures: React.FC<VillaFormFeaturesProps> = ({
  features,
  onFeatureAdd,
  onFeatureRemove
}) => {
  const [featureInput, setFeatureInput] = useState('');
  
  const handleAddFeature = () => {
    if (featureInput.trim()) {
      onFeatureAdd(featureInput.trim());
      setFeatureInput('');
    }
  };

  return (
    <div className="space-y-2">
      <Label>Özellikler</Label>
      <div className="flex items-center space-x-2">
        <Input 
          value={featureInput}
          onChange={(e) => setFeatureInput(e.target.value)}
          placeholder="Yeni özellik ekle"
          className="flex-1"
        />
        <Button 
          type="button"
          size="icon"
          onClick={handleAddFeature}
          disabled={!featureInput.trim()}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="mt-2 flex flex-wrap gap-2">
        {features?.map((feature, index) => (
          <div key={index} className="bg-gray-100 rounded-lg px-2 py-1 flex items-center gap-1">
            <span className="text-sm">{feature}</span>
            <button 
              type="button"
              className="text-gray-500 hover:text-gray-700"
              onClick={() => onFeatureRemove(index)}
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VillaFormFeatures;
