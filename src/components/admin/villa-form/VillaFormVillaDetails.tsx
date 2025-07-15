import React from 'react';
import { Button } from '../../ui/button';
import { Label } from '../../ui/label';
import { Input } from '../../ui/input';
import { Textarea } from '../../ui/textarea';
import { Upload, X } from 'lucide-react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';

interface VillaFormVillaDetailsProps {
  villaDetails: string;
  detailGalleryImages: string[];
  uploadingImage: boolean;
  onVillaDetailsChange: (value: string) => void;
  onDetailImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDetailImageRemove: (index: number) => void;
  onDetailImagesReorder?: (reorderedImages: string[]) => void;
}

const VillaFormVillaDetails: React.FC<VillaFormVillaDetailsProps> = ({
  villaDetails,
  detailGalleryImages,
  uploadingImage,
  onVillaDetailsChange,
  onDetailImageUpload,
  onDetailImageRemove,
  onDetailImagesReorder
}) => {
  const handleMultipleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    // Her dosya için tek tek upload işlemi yap
    for (let i = 0; i < files.length; i++) {
      // Create a new input element for each file to properly simulate the event
      const input = document.createElement('input');
      input.type = 'file';
      
      // Create a DataTransfer object to hold the single file
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(files[i]);
      input.files = dataTransfer.files;
      
      // Create a proper event object
      const singleFileEvent = {
        target: input,
        currentTarget: input
      } as React.ChangeEvent<HTMLInputElement>;
      
      await onDetailImageUpload(singleFileEvent);
    }
    
    // Input'u temizle
    e.target.value = '';
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
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
          <Input
            type="file"
            accept="image/*"
            multiple
            onChange={handleMultipleImageUpload}
            disabled={uploadingImage}
            className="hidden"
            id="detail-image-upload"
          />
          <label
            htmlFor="detail-image-upload"
            className="flex flex-col items-center justify-center cursor-pointer"
          >
            <Upload className="h-8 w-8 text-gray-400 mb-2" />
            <span className="text-sm text-gray-600">
              {uploadingImage ? 'Resimler yükleniyor...' : 'Çoklu resim yüklemek için tıklayın'}
            </span>
            <span className="text-xs text-gray-500 mt-1">
              Ctrl/Cmd tuşu ile birden fazla resim seçebilirsiniz
            </span>
          </label>
        </div>
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

export default VillaFormVillaDetails;
