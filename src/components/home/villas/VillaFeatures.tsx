
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface VillaFeaturesProps {
  features: string[];
  featureGroups?: any[];
}

interface FeatureGroup {
  category: string;
  features: string[];
}

interface FeatureCategory {
  id: string;
  name: string;
  color: string;
}

const VillaFeatures: React.FC<VillaFeaturesProps> = ({ features, featureGroups }) => {
  console.log('VillaFeatures - Received props:', { features, featureGroups });

  // Fetch feature categories for colors
  const { data: categories = [] } = useQuery({
    queryKey: ['feature-categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('feature_categories')
        .select('*')
        .order('order_index');
      
      if (error) throw error;
      return data as FeatureCategory[];
    }
  });

  // Prioritize featureGroups over features
  const shouldUseGroupedFeatures = featureGroups && featureGroups.length > 0;
  
  console.log('VillaFeatures - shouldUseGroupedFeatures:', shouldUseGroupedFeatures);

  const renderFeatures = () => {
    if (shouldUseGroupedFeatures) {
      // Use grouped features
      console.log('VillaFeatures - Rendering grouped features:', featureGroups);
      
      return featureGroups!.map((group, groupIndex) => {
        const category = categories.find(cat => cat.id === group.category);
        const categoryColor = category?.color || '#6b7280';
        
        console.log('VillaFeatures - Group:', group, 'Category:', category);
        
        return (
          <div key={groupIndex} className="mb-4">
            <div className="flex items-center mb-2">
              <div 
                className="w-2 h-2 rounded-full mr-2" 
                style={{ backgroundColor: categoryColor }}
              />
              <span className="text-sm font-medium text-gray-700">
                {category?.name || 'Diğer'}
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {group.features.map((feature: string, featureIndex: number) => (
                <span 
                  key={featureIndex}
                  className="inline-flex items-center px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full"
                >
                  ✓ {feature}
                </span>
              ))}
            </div>
          </div>
        );
      });
    } else if (features && features.length > 0) {
      // Fallback to simple string array
      console.log('VillaFeatures - Rendering simple features:', features);
      
      return (
        <div className="flex flex-wrap gap-2">
          {features.map((feature, index) => (
            <span 
              key={index}
              className="inline-flex items-center px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full"
            >
              ✓ {feature}
            </span>
          ))}
        </div>
      );
    }
    
    return null;
  };

  if (!shouldUseGroupedFeatures && (!features || features.length === 0)) {
    return (
      <div className="text-center py-4 text-gray-500">
        <p className="text-sm">Henüz özellik eklenmemiş</p>
      </div>
    );
  }

  return (
    <div className="mb-6 md:mb-8">
      <h4 className="text-sm md:text-base font-semibold mb-3 md:mb-4">Öne Çıkan Özellikler</h4>
      {renderFeatures()}
    </div>
  );
};

export default VillaFeatures;
