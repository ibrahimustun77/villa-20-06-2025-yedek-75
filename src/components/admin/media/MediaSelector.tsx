
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Upload, Image, FolderOpen } from 'lucide-react';
import MediaLibrary from './MediaLibrary';
import { uploadToMediaLibrary, MediaLibraryItem } from '@/services/mediaLibraryService';
import { toast } from '@/hooks/use-toast';
import { useQueryClient } from '@tanstack/react-query';

interface MediaSelectorProps {
  onSelect: (item: MediaLibraryItem) => void;
  trigger?: React.ReactNode;
  accept?: string;
  category?: string;
  multiSelect?: boolean;
}

const MediaSelector: React.FC<MediaSelectorProps> = ({
  onSelect,
  trigger,
  accept = "image/*",
  category = "general",
  multiSelect = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadMetadata, setUploadMetadata] = useState({
    title: '',
    alt_text: '',
    description: ''
  });
  const queryClient = useQueryClient();

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const mediaItem = await uploadToMediaLibrary(file, {
        ...uploadMetadata,
        category,
        title: uploadMetadata.title || file.name
      });

      queryClient.invalidateQueries({ queryKey: ['media-library'] });
      onSelect(mediaItem);
      setIsOpen(false);
      setUploadMetadata({ title: '', alt_text: '', description: '' });
      
      toast({
        title: 'Başarılı',
        description: 'Dosya medya kütüphanesine yüklendi'
      });
    } catch (error: any) {
      toast({
        title: 'Hata',
        description: error.message,
        variant: 'destructive'
      });
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const handleLibrarySelect = (item: MediaLibraryItem) => {
    onSelect(item);
    setIsOpen(false);
  };

  const defaultTrigger = (
    <Button variant="outline" type="button">
      <FolderOpen className="mr-2 h-4 w-4" />
      Medya Seç
    </Button>
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || defaultTrigger}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>Medya Seç</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="library" className="h-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="library">
              <Image className="mr-2 h-4 w-4" />
              Kütüphaneden Seç
            </TabsTrigger>
            <TabsTrigger value="upload">
              <Upload className="mr-2 h-4 w-4" />
              Bilgisayardan Yükle
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="library" className="mt-4 h-[500px] overflow-y-auto">
            <MediaLibrary
              onSelect={handleLibrarySelect}
              selectionMode={true}
              multiSelect={multiSelect}
            />
          </TabsContent>
          
          <TabsContent value="upload" className="mt-4 space-y-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="file-upload">Dosya Seç</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                  <Input
                    id="file-upload"
                    type="file"
                    accept={accept}
                    onChange={handleFileUpload}
                    disabled={uploading}
                    className="hidden"
                  />
                  <label
                    htmlFor="file-upload"
                    className="flex flex-col items-center justify-center cursor-pointer"
                  >
                    <Upload className="h-8 w-8 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-600">
                      {uploading ? 'Yükleniyor...' : 'Dosya seçmek için tıklayın'}
                    </span>
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Başlık</Label>
                  <Input
                    id="title"
                    value={uploadMetadata.title}
                    onChange={(e) => setUploadMetadata(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Dosya başlığı"
                  />
                </div>
                <div>
                  <Label htmlFor="alt_text">Alt Metin</Label>
                  <Input
                    id="alt_text"
                    value={uploadMetadata.alt_text}
                    onChange={(e) => setUploadMetadata(prev => ({ ...prev, alt_text: e.target.value }))}
                    placeholder="Erişilebilirlik için alt metin"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Açıklama</Label>
                <Input
                  id="description"
                  value={uploadMetadata.description}
                  onChange={(e) => setUploadMetadata(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Dosya açıklaması"
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default MediaSelector;
