
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface GalleryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const GalleryFilter: React.FC<GalleryFilterProps> = ({
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
    <div className="flex flex-wrap gap-3 justify-center mb-12">
      <button
        onClick={() => onCategoryChange('all')}
        className={`px-6 py-3 rounded-full transition-all duration-300 font-medium ${
          selectedCategory === 'all'
            ? 'bg-therma text-white shadow-lg'
            : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
        }`}
      >
        Tümü
      </button>
      {categories.map((category) => (
        <button
          key={category.value}
          onClick={() => onCategoryChange(category.value)}
          className={`px-6 py-3 rounded-full transition-all duration-300 font-medium ${
            selectedCategory === category.value
              ? 'bg-therma text-white shadow-lg'
              : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
          }`}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};

export default GalleryFilter;
