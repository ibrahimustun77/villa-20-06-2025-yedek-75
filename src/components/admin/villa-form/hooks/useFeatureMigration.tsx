
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const useFeatureMigration = () => {
  // Ensure we have a default "Genel Özellikler" category for migration
  const { data: defaultCategory } = useQuery({
    queryKey: ['default-feature-category'],
    queryFn: async () => {
      // First try to find existing "Genel Özellikler" category
      const { data: existing } = await supabase
        .from('feature_categories')
        .select('*')
        .eq('name', 'Genel Özellikler')
        .single();

      if (existing) {
        return existing;
      }

      // If not found, create it
      const { data: created, error } = await supabase
        .from('feature_categories')
        .insert({
          name: 'Genel Özellikler',
          color: '#6b7280',
          order_index: 0
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating default category:', error);
        return null;
      }

      return created;
    }
  });

  const migrateFeaturesToGroups = (features: string[], defaultCategoryId: string) => {
    if (!features || features.length === 0) return [];
    
    return [{
      category: defaultCategoryId,
      features: features
    }];
  };

  return {
    defaultCategory,
    migrateFeaturesToGroups
  };
};
