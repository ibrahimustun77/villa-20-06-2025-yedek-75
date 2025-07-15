
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="flex items-center border rounded-md px-3 py-2 mb-6">
      <Search className="h-5 w-5 text-gray-400 mr-2" />
      <Input 
        placeholder="Ara..." 
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
      />
    </div>
  );
};

export default SearchBar;
