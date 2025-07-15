
import React, { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchMediaLibraryItems, deleteFromMediaLibrary, MediaLibraryItem } from '@/services/mediaLibraryService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Trash2, Search, Image, Eye } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface MediaLibraryProps {
  onSelect?: (item: MediaLibraryItem) => void;
  selectionMode?: boolean;
  selectedItems?: string[];
  multiSelect?: boolean;
}

const MediaLibrary: React.FC<MediaLibraryProps> = ({
  onSelect,
  selectionMode = false,
  selectedItems = [],
  multiSelect = false
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [previewItem, setPreviewItem] = useState<MediaLibraryItem | null>(null);
  const queryClient = useQueryClient();

  const { data: mediaItems = [], isLoading } = useQuery({
    queryKey: ['media-library'],
    queryFn: fetchMediaLibraryItems,
    staleTime: 5 * 60 * 1000
  });

  const filteredItems = mediaItems.filter(item => {
    const matchesSearch = item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.alt_text?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', ...Array.from(new Set(mediaItems.map(item => item.category).filter(Boolean)))];

  const handleDelete = async (item: MediaLibraryItem) => {
    if (!confirm('Bu medya öğesini silmek istediğinizden emin misiniz?')) return;

    try {
      await deleteFromMediaLibrary(item.id, item.url);
      queryClient.invalidateQueries({ queryKey: ['media-library'] });
      toast({
        title: 'Başarılı',
        description: 'Medya öğesi silindi'
      });
    } catch (error: any) {
      toast({
        title: 'Hata',
        description: error.message,
        variant: 'destructive'
      });
    }
  };

  const handleSelect = (item: MediaLibraryItem) => {
    if (onSelect) {
      onSelect(item);
    }
  };

  const isSelected = (itemId: string) => selectedItems.includes(itemId);

  if (isLoading) {
    return <div className="flex justify-center p-8">Medya kütüphanesi yükleniyor...</div>;
  }

  return (
    <div className="space-y-4">
      {/* Search and Filter */}
      <div className="flex gap-4 mb-6">
        <div className="flex-1">
          <Label htmlFor="search">Ara</Label>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              id="search"
              placeholder="Medya ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <div>
          <Label htmlFor="category">Kategori</Label>
          <select
            id="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full p-2 border rounded-md"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'Tümü' : category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className={`relative group border rounded-lg overflow-hidden cursor-pointer transition-all hover:shadow-md ${
              selectionMode && isSelected(item.id) ? 'ring-2 ring-blue-500' : ''
            }`}
            onClick={() => selectionMode && handleSelect(item)}
          >
            <div className="aspect-square relative">
              {item.file_type?.startsWith('image/') ? (
                <img
                  src={item.url}
                  alt={item.alt_text || item.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                  <Image className="h-8 w-8 text-gray-400" />
                </div>
              )}
              
              {/* Selection indicator */}
              {selectionMode && isSelected(item.id) && (
                <div className="absolute inset-0 bg-blue-500 bg-opacity-20 flex items-center justify-center">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                </div>
              )}

              {/* Action buttons */}
              {!selectionMode && (
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={(e) => {
                        e.stopPropagation();
                        setPreviewItem(item);
                      }}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(item);
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Info */}
            <div className="p-2">
              <div className="text-sm font-medium truncate">{item.title}</div>
              {item.category && (
                <Badge variant="secondary" className="text-xs mt-1">
                  {item.category}
                </Badge>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          {searchTerm || selectedCategory !== 'all' 
            ? 'Arama kriterlerine uygun medya bulunamadı.' 
            : 'Henüz medya kütüphanesi boş.'}
        </div>
      )}

      {/* Preview Dialog */}
      {previewItem && (
        <Dialog open={!!previewItem} onOpenChange={() => setPreviewItem(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{previewItem.title}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="aspect-video relative">
                <img
                  src={previewItem.url}
                  alt={previewItem.alt_text || previewItem.title}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <strong>Kategori:</strong> {previewItem.category}
                </div>
                <div>
                  <strong>Dosya Tipi:</strong> {previewItem.file_type}
                </div>
                <div>
                  <strong>Boyut:</strong> {previewItem.file_size ? `${Math.round(previewItem.file_size / 1024)} KB` : 'Bilinmiyor'}
                </div>
                <div>
                  <strong>Boyutlar:</strong> {previewItem.width && previewItem.height ? `${previewItem.width}x${previewItem.height}` : 'Bilinmiyor'}
                </div>
              </div>
              {previewItem.description && (
                <div>
                  <strong>Açıklama:</strong> {previewItem.description}
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default MediaLibrary;
