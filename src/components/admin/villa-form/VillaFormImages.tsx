
import React from 'react';
import { Button } from '../../ui/button';
import { Label } from '../../ui/label';
import { Input } from '../../ui/input';
import { Upload, X, Star } from 'lucide-react';
import { VillaFormImagesProps } from './types';

const VillaFormImages: React.FC<VillaFormImagesProps> = ({
  images,
  uploadingImage,
  onImageUpload,
  onImageRemove,
  onCoverImageSelect,
  coverImage
}) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Villa Resimleri</Label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
          <Input
            type="file"
            accept="image/*"
            onChange={onImageUpload}
            disabled={uploadingImage}
            className="hidden"
            id="image-upload"
          />
          <label
            htmlFor="image-upload"
            className="flex flex-col items-center justify-center cursor-pointer"
          >
            <Upload className="h-8 w-8 text-gray-400 mb-2" />
            <span className="text-sm text-gray-600">
              {uploadingImage ? 'Resim yükleniyor...' : 'Resim yüklemek için tıklayın'}
            </span>
          </label>
        </div>
      </div>

      {images && images.length > 0 && (
        <div className="space-y-2">
          <Label>Yüklenen Resimler</Label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {images.map((imageUrl, index) => (
              <div key={index} className="relative group">
                <img
                  src={imageUrl}
                  alt={`Villa resmi ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg"
                />
                
                {/* Cover image indicator */}
                {coverImage === imageUrl && (
                  <div className="absolute top-2 left-2 bg-therma text-white rounded-full p-1">
                    <Star className="h-4 w-4 fill-current" />
                  </div>
                )}
                
                {/* Action buttons */}
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
                  <Button
                    type="button"
                    size="sm"
                    variant="secondary"
                    onClick={() => onCoverImageSelect(imageUrl)}
                    className="text-xs"
                  >
                    {coverImage === imageUrl ? 'Kapak' : 'Kapak Yap'}
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="destructive"
                    onClick={() => onImageRemove(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-500">
            Kapak resmi ana sayfada görünecek olan resimdir. Kapak yapmak için resmin üzerine gelip "Kapak Yap" butonuna tıklayın.
          </p>
        </div>
      )}
    </div>
  );
};

export default VillaFormImages;
