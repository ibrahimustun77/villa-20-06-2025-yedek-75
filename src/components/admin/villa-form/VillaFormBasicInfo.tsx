
import React from 'react';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Textarea } from '../../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Checkbox } from '../../ui/checkbox';
import { VillaFormBasicInfoProps } from './types';

const VillaFormBasicInfo: React.FC<VillaFormBasicInfoProps> = ({
  formData,
  villaTypes,
  onFieldChange,
  onSelectChange,
  onCheckboxChange
}) => {
  return (
    <div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Villa Adı</Label>
          <Input 
            id="name"
            name="name"
            value={formData.name}
            onChange={onFieldChange}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="villa_type_id">Villa Tipi</Label>
          <Select value={formData.villa_type_id} onValueChange={(value) => onSelectChange('villa_type_id', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Villa tipi seçin" />
            </SelectTrigger>
            <SelectContent>
              {villaTypes.map((type) => (
                <SelectItem key={type.id} value={type.id}>
                  {type.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2 mt-4">
        <Label htmlFor="description">Villa Detayları</Label>
        <Textarea 
          id="description"
          name="description"
          value={formData.description || ''}
          onChange={onFieldChange}
          rows={4}
          placeholder="Villa hakkında detaylı bilgi girin..."
        />
      </div>

      <div className="space-y-2 mt-4">
        <Label htmlFor="price">Fiyat (₺)</Label>
        <Input 
          id="price"
          name="price"
          type="number"
          value={formData.price || 0}
          onChange={onFieldChange}
          min={0}
          required
        />
      </div>

      <div className="flex items-center space-x-2 mt-4">
        <Checkbox 
          id="is_active" 
          checked={formData.is_active}
          onCheckedChange={onCheckboxChange}
        />
        <Label htmlFor="is_active">Aktif</Label>
      </div>
    </div>
  );
};

export default VillaFormBasicInfo;
