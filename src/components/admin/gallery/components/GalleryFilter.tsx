
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface GalleryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  categories: Array<{ id: string; name: string; value: string }>;
}

const GalleryFilter: React.FC<GalleryFilterProps> = ({
  selectedCategory,
  onCategoryChange,
  categories
}) => {
  return (
    <div className="flex gap-4 items-center">
      <Select value={selectedCategory} onValueChange={onCategoryChange}>
        <SelectTrigger className="w-48">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Tüm Kategoriler</SelectItem>
          {categories.map(cat => (
            <SelectItem key={cat.value} value={cat.value}>{cat.name}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      <span className="text-sm text-gray-500">
        {categories.length} kategori
      </span>
    </div>
  );
};

export default GalleryFilter;
