
import React, { useRef } from 'react';
import { Upload, ImageIcon } from 'lucide-react';
import { toast } from "../../../components/ui/use-toast";

interface MapBackgroundControlProps {
  backgroundImage: string | null;
  showPreview: boolean;
  setBackgroundImage: (url: string | null) => void;
  setShowPreview: (show: boolean) => void;
}

const MapBackgroundControl: React.FC<MapBackgroundControlProps> = ({
  backgroundImage,
  showPreview,
  setBackgroundImage,
  setShowPreview
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Hata",
        description: "Lütfen bir resim dosyası seçin",
        variant: "destructive"
      });
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Hata",
        description: "Dosya boyutu çok büyük (maksimum 5MB)",
        variant: "destructive"
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setBackgroundImage(result);
      localStorage.setItem('mapBackgroundImage', result);
      toast({
        title: "Başarılı",
        description: "Harita arka planı başarıyla güncellendi"
      });
    };
    reader.readAsDataURL(file);
  };

  const removeBackgroundImage = () => {
    setBackgroundImage(null);
    localStorage.removeItem('mapBackgroundImage');
    toast({
      title: "Başarılı",
      description: "Harita arka planı kaldırıldı"
    });
  };

  return (
    <div className="flex items-center gap-2">
      <input 
        type="file" 
        ref={fileInputRef}
        className="hidden" 
        accept="image/*" 
        onChange={handleImageUpload}
      />
      <button
        onClick={() => fileInputRef.current?.click()}
        className="flex items-center gap-1 px-3 py-1.5 bg-therma text-white rounded-lg hover:bg-therma-dark transition-colors"
      >
        <Upload size={16} />
        Harita Yükle
      </button>
      {backgroundImage && (
        <button
          onClick={removeBackgroundImage}
          className="px-3 py-1.5 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
        >
          Resmi Kaldır
        </button>
      )}
      <button
        onClick={() => setShowPreview(!showPreview)}
        className="px-3 py-1.5 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
      >
        {showPreview ? 'Gizle' : 'Göster'}
      </button>
    </div>
  );
};

export default MapBackgroundControl;
