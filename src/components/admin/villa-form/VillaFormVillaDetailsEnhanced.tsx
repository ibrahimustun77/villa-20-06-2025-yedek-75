
import React from 'react';
import { Button } from '../../ui/button';
import { Label } from '../../ui/label';
import { Textarea } from '../../ui/textarea';
import { X } from 'lucide-react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import MediaSelector from '../media/MediaSelector';
import { MediaLibraryItem } from '@/services/mediaLibraryService';

interface VillaFormVillaDetailsEnhancedProps {
  villaDetails: string;
  detailGalleryImages: string[];
  uploadingImage: boolean;
  onVillaDetailsChange: (value: string) => void;
  onDetailImageAdd: (imageUrl: string) => void;
  onDetailImageRemove: (index: number) => void;
  onDetailImagesReorder?: (reorderedImages: string[]) => void;
}

const VillaFormVillaDetailsEnhanced: React.FC<VillaFormVillaDetailsEnhancedProps> = ({
  villaDetails,
  detailGalleryImages,
  uploadingImage,
  onVillaDetailsChange,
  onDetailImageAdd,
  onDetailImageRemove,
  onDetailImagesReorder
}) => {
  const handleMediaSelect = (media: MediaLibraryItem) => {
    onDetailImageAdd(media.url);
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination || !onDetailImagesReorder) return;

    const items = Array.from(detailGalleryImages);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    onDetailImagesReorder(items);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Villa Detay Açıklaması</Label>
        <Textarea
          value={villaDetails}
          onChange={(e) => onVillaDetailsChange(e.target.value)}
          placeholder="Villa hakkında detaylı bilgi girin..."
          rows={4}
        />
      </div>

      <div className="space-y-2">
        <Label>İç Görseller (Detay Galerisi)</Label>
        <MediaSelector
          onSelect={handleMediaSelect}
          category="villa-interior"
          trigger={
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
              <div className="flex flex-col items-center justify-center cursor-pointer">
                <span className="text-sm text-gray-600">
                  {uploadingImage ? 'Resim ekleniyor...' : 'Detay galerisi resmi eklemek için tıklayın'}
                </span>
                <span className="text-xs text-gray-500 mt-1">
                  Kütüphaneden seç veya bilgisayardan yükle
                </span>
              </div>
            </div>
          }
        />
      </div>

      {detailGalleryImages && detailGalleryImages.length > 0 && (
        <div className="space-y-2">
          <Label>Yüklenen İç Görseller</Label>
          <p className="text-sm text-gray-500 mb-3">
            Resimleri sürükleyerek sıralayabilirsiniz
          </p>
          
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="detail-images" direction="horizontal">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
                >
                  {detailGalleryImages.map((imageUrl, index) => (
                    <Draggable key={imageUrl} draggableId={imageUrl} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`relative group ${
                            snapshot.isDragging ? 'opacity-75 rotate-3 scale-105' : ''
                          }`}
                          style={{
                            ...provided.draggableProps.style,
                            transition: snapshot.isDragging ? 'none' : 'all 0.2s ease',
                          }}
                        >
                          <img
                            src={imageUrl}
                            alt={`İç görsel ${index + 1}`}
                            className="w-full h-32 object-cover rounded-lg border-2 border-transparent group-hover:border-blue-300"
                          />
                          
                          {/* Sıra numarası */}
                          <div className="absolute top-2 left-2 bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-semibold">
                            {index + 1}
                          </div>
                          
                          {/* Silme butonu */}
                          <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                            <Button
                              type="button"
                              size="sm"
                              variant="destructive"
                              onClick={() => onDetailImageRemove(index)}
                              className="h-8 w-8 p-0"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                          
                          {/* Sürükleme göstergesi */}
                          {snapshot.isDragging && (
                            <div className="absolute inset-0 bg-blue-200 opacity-50 rounded-lg border-2 border-blue-400 border-dashed"></div>
                          )}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      )}
    </div>
  );
};

export default VillaFormVillaDetailsEnhanced;
