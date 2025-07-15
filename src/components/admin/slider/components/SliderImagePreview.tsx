
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface SliderImagePreviewProps {
  imageUrl: string | null;
  onClose: () => void;
}

const SliderImagePreview: React.FC<SliderImagePreviewProps> = ({ imageUrl, onClose }) => {
  return (
    <Dialog open={!!imageUrl} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Resim Önizleme</DialogTitle>
        </DialogHeader>
        <div className="flex justify-center">
          {imageUrl && (
            <img
              src={imageUrl}
              alt="Önizleme"
              className="max-w-full max-h-[70vh] object-contain rounded"
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SliderImagePreview;
