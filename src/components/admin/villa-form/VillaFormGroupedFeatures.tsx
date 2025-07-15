
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { X, Plus, Info } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface FeatureGroup {
  category: string;
  features: string[];
}

interface VillaFormGroupedFeaturesProps {
  featureGroups: FeatureGroup[];
  onFeatureGroupsChange: (groups: FeatureGroup[]) => void;
}

const VillaFormGroupedFeatures: React.FC<VillaFormGroupedFeaturesProps> = ({
  featureGroups,
  onFeatureGroupsChange
}) => {
  const [newFeature, setNewFeature] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [hasConvertedFeatures, setHasConvertedFeatures] = useState(false);

  console.log('VillaFormGroupedFeatures - Received featureGroups:', featureGroups);

  // Fetch feature categories
  const { data: categories = [] } = useQuery({
    queryKey: ['feature-categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('feature_categories')
        .select('*')
        .order('order_index');
      
      if (error) throw error;
      console.log('Feature categories loaded:', data);
      return data;
    }
  });

  // Check if we have converted features (features in 'general' category)
  useEffect(() => {
    const hasGeneralCategory = featureGroups.some(group => group.category === 'general');
    setHasConvertedFeatures(hasGeneralCategory);
    console.log('Has converted features:', hasGeneralCategory);
  }, [featureGroups]);

  // Auto-convert general category to proper category when categories are loaded
  useEffect(() => {
    if (hasConvertedFeatures && categories.length > 0) {
      const generalGroup = featureGroups.find(group => group.category === 'general');
      if (generalGroup && generalGroup.features.length > 0) {
        console.log('Auto-converting general category to first available category');
        const firstCategory = categories[0];
        const updatedGroups = featureGroups.map(group => 
          group.category === 'general' 
            ? { ...group, category: firstCategory.id }
            : group
        );
        onFeatureGroupsChange(updatedGroups);
      }
    }
  }, [hasConvertedFeatures, categories, featureGroups, onFeatureGroupsChange]);

  const handleAddFeature = () => {
    if (!newFeature.trim() || !selectedCategory) return;

    console.log('Adding new feature:', newFeature, 'to category:', selectedCategory);

    const existingGroupIndex = featureGroups.findIndex(group => group.category === selectedCategory);
    
    if (existingGroupIndex >= 0) {
      // Add to existing category
      const updatedGroups = [...featureGroups];
      if (!updatedGroups[existingGroupIndex].features.includes(newFeature.trim())) {
        updatedGroups[existingGroupIndex].features.push(newFeature.trim());
        console.log('Updated existing group:', updatedGroups);
        onFeatureGroupsChange(updatedGroups);
      }
    } else {
      // Create new category group
      const newGroup: FeatureGroup = {
        category: selectedCategory,
        features: [newFeature.trim()]
      };
      const updatedGroups = [...featureGroups, newGroup];
      console.log('Created new group:', updatedGroups);
      onFeatureGroupsChange(updatedGroups);
    }

    setNewFeature('');
  };

  const handleRemoveFeature = (categoryId: string, featureIndex: number) => {
    console.log('Removing feature at index:', featureIndex, 'from category:', categoryId);
    
    const updatedGroups = featureGroups.map(group => {
      if (group.category === categoryId) {
        return {
          ...group,
          features: group.features.filter((_, index) => index !== featureIndex)
        };
      }
      return group;
    }).filter(group => group.features.length > 0);

    console.log('Updated groups after removal:', updatedGroups);
    onFeatureGroupsChange(updatedGroups);
  };

  const getCategoryInfo = (categoryId: string) => {
    return categories.find(cat => cat.id === categoryId);
  };

  console.log('Rendering VillaFormGroupedFeatures with groups:', featureGroups);

  return (
    <div className="space-y-4">
      {/* Migration Info Alert */}
      {hasConvertedFeatures && (
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription>
            Bu villa'nın öne çıkan özellikleri eski formattan yeni kategorili sisteme dönüştürüldü. 
            Değişikliklerinizi kaydederken yeni format kullanılacak.
          </AlertDescription>
        </Alert>
      )}

      {/* Debug Info */}
      <div className="text-xs text-gray-500 p-2 bg-gray-50 rounded">
        <strong>Debug:</strong> Feature Groups Count: {featureGroups.length}
        {featureGroups.length > 0 && (
          <div>Categories: {featureGroups.map(g => getCategoryInfo(g.category)?.name || 'Unknown').join(', ')}</div>
        )}
        {hasConvertedFeatures && (
          <div className="text-orange-600">⚠️ Contains converted features from old format</div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div>
          <Label htmlFor="feature-input">Yeni Özellik</Label>
          <Input
            id="feature-input"
            value={newFeature}
            onChange={(e) => setNewFeature(e.target.value)}
            placeholder="Özellik adı"
            onKeyPress={(e) => e.key === 'Enter' && handleAddFeature()}
          />
        </div>
        <div>
          <Label htmlFor="category-select">Kategori</Label>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Kategori seçin" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-end">
          <Button 
            type="button" 
            onClick={handleAddFeature}
            disabled={!newFeature.trim() || !selectedCategory}
            className="w-full"
          >
            <Plus className="w-4 h-4 mr-2" />
            Ekle
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        {featureGroups.map((group, groupIndex) => {
          const categoryInfo = getCategoryInfo(group.category);
          console.log('Rendering group:', group, 'with category info:', categoryInfo);
          
          return (
            <Card key={`${group.category}-${groupIndex}`}>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: categoryInfo?.color || '#6b7280' }}
                  />
                  {categoryInfo?.name || 'Bilinmeyen Kategori'}
                  <span className="text-xs text-gray-500">({group.features.length} özellik)</span>
                  {group.category === 'general' && (
                    <Badge variant="outline" className="text-xs">Dönüştürüldü</Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {group.features.map((feature, featureIndex) => (
                    <Badge key={`${feature}-${featureIndex}`} variant="secondary" className="text-xs">
                      {feature}
                      <button
                        type="button"
                        onClick={() => handleRemoveFeature(group.category, featureIndex)}
                        className="ml-2 hover:text-red-500"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {featureGroups.length === 0 && (
        <div className="text-center py-8 text-gray-500 border-2 border-dashed border-gray-200 rounded-lg">
          <p className="font-medium">Henüz özellik eklenmemiş</p>
          <p className="text-sm">Yukarıdaki formu kullanarak özellik ekleyebilirsiniz</p>
        </div>
      )}
    </div>
  );
};

export default VillaFormGroupedFeatures;
