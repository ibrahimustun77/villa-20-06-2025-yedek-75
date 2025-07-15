
import React from 'react';
import { Button } from '../../ui/button';
import { Label } from '../../ui/label';
import { X } from 'lucide-react';
import MediaSelector from '../media/MediaSelector';
import { MediaLibraryItem } from '@/services/mediaLibraryService';

interface VillaFormImagesEnhancedProps {
  images: string[];
  uploadingImage: boolean;
  onImageAdd: (imageUrl: string) => void;
  onImageRemove: (index: number) => void;
  onCoverImageSelect: (index: number) => void;
  coverImage?: string;
}

const VillaFormImagesEnhanced: React.FC<VillaFormImagesEnhancedProps> = ({
  images,
  uploadingImage,
  onImageAdd,
  onImageRemove,
  onCoverImageSelect,
  coverImage
}) => {
  const handleMediaSelect = (media: MediaLibraryItem) => {
    onImageAdd(media.url);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Villa Görselleri</Label>
        <MediaSelector
          onSelect={handleMediaSelect}
          category="villa"
          trigger={
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
              <div className="flex flex-col items-center justify-center">
                <span className="text-sm text-gray-600">
                  {uploadingImage ? 'Resim ekleniyor...' : 'Resim eklemek için tıklayın'}
                </span>
                <span className="text-xs text-gray-500 mt-1">
                  Kütüphaneden seç veya bilgisayardan yükle
                </span>
              </div>
            </div>
          }
        />
      </div>

      {images && images.length > 0 && (
        <div className="space-y-2">
          <Label>Yüklenen Görseller</Label>
          <p className="text-sm text-gray-500 mb-3">
            İlk resim kapak resmi olarak kullanılır. Sıralamayı değiştirmek için kapak resmi seçin.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((imageUrl, index) => (
              <div key={index} className="relative group">
                <img
                  src={imageUrl}
                  alt={`Villa resmi ${index + 1}`}
                  className={`w-full h-32 object-cover rounded-lg border-2 transition-all ${
                    index === 0 ? 'border-blue-500' : 'border-transparent group-hover:border-blue-300'
                  }`}
                />
                
                {/* Kapak resmi işareti */}
                {index === 0 && (
                  <div className="absolute top-2 left-2 bg-blue-500 text-white px-2 py-1 rounded text-xs font-semibold">
                    Kapak
                  </div>
                )}
                
                {/* Sıra numarası */}
                <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-semibold">
                  {index + 1}
                </div>
                
                {/* Hover menüsü */}
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                  <div className="flex gap-2">
                    {index !== 0 && (
                      <Button
                        type="button"
                        size="sm"
                        variant="secondary"
                        onClick={() => onCoverImageSelect(index)}
                        className="h-8 text-xs"
                      >
                        Kapak Yap
                      </Button>
                    )}
                    <Button
                      type="button"
                      size="sm"
                      variant="destructive"
                      onClick={() => onImageRemove(index)}
                      className="h-8 w-8 p-0"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default VillaFormImagesEnhanced;
