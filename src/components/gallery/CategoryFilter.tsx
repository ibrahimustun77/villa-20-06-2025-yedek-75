
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onCategoryChange
}) => {
  const { data: categories = [] } = useQuery({
    queryKey: ['gallery-categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('gallery_categories')
        .select('*')
        .order('name');
      
      if (error) throw error;
      return data;
    }
  });

  return (
    <div className="flex flex-wrap gap-3 justify-center mb-8">
      <button
        onClick={() => onCategoryChange('all')}
        className={`px-4 py-2 rounded-full transition-all duration-300 text-sm font-medium ${
          selectedCategory === 'all'
            ? 'bg-therma text-white shadow-lg'
            : 'bg-white text-gray-700 hover:bg-gray-50'
        }`}
      >
        Tümü
      </button>
      {categories.map((category) => (
        <button
          key={category.value}
          onClick={() => onCategoryChange(category.value)}
          className={`px-4 py-2 rounded-full transition-all duration-300 text-sm font-medium ${
            selectedCategory === category.value
              ? 'bg-therma text-white shadow-lg'
              : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
