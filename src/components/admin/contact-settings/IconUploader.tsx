
import React, { useState } from 'react';
import { toast } from 'sonner';
import { uploadContactIcon } from '@/services/contactSettingsService';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loader2, Upload, X } from 'lucide-react';

interface IconUploaderProps {
  iconUrl: string | undefined;
  onIconUploaded: (url: string) => void;
  onIconCleared: () => void;
  label: string;
  id: string;
}

const IconUploader: React.FC<IconUploaderProps> = ({
  iconUrl,
  onIconUploaded,
  onIconCleared,
  label,
  id
}) => {
  const [isUploading, setIsUploading] = useState(false);

  const handleIconUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const url = await uploadContactIcon(file);
      
      if (url) {
        onIconUploaded(url);
        toast.success(`${label} ikonu yüklendi`);
      } else {
        toast.error('İkon yüklenemedi');
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('İkon yüklenirken bir hata oluştu');
    } finally {
      setIsUploading(false);
      // Reset the file input
      event.target.value = '';
    }
  };

  return (
    <div className="flex flex-col space-y-2">
      <div className="flex items-center space-x-2">
        <Button 
          type="button" 
          variant="outline" 
          className="w-full"
          disabled={isUploading}
          onClick={() => document.getElementById(id)?.click()}
        >
          {isUploading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Upload className="mr-2 h-4 w-4" />
          )}
          İkon Yükle
        </Button>
        <input
          id={id}
          type="file"
          accept="image/*,.gif"
          className="hidden"
          onChange={handleIconUpload}
        />
      </div>

      {iconUrl && (
        <div className="flex items-center space-x-2">
          <Badge className="flex items-center space-x-1">
            <span className="truncate max-w-[200px]">İkon yüklendi</span>
            <Button 
              type="button" 
              variant="ghost" 
              size="sm" 
              className="h-5 w-5 p-0 rounded-full" 
              onClick={onIconCleared}
            >
              <X className="h-3 w-3" />
            </Button>
          </Badge>
        </div>
      )}
    </div>
  );
};

export default IconUploader;
