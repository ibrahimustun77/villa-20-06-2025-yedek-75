
import React from 'react';
import MapPreview from './MapPreview';
import MapBackgroundControl from './MapBackgroundControl';
import MapHelp from './MapHelp';
import { Villa } from './types/mapTypes';

interface MapPreviewSectionProps {
  villas: Villa[];
  backgroundImage: string | null;
  showPreview: boolean;
  setBackgroundImage: (url: string | null) => void;
  setShowPreview: (show: boolean) => void;
  onVillaMove?: (id: number, x: number, y: number) => void;
}

const MapPreviewSection: React.FC<MapPreviewSectionProps> = ({
  villas,
  backgroundImage,
  showPreview,
  setBackgroundImage,
  setShowPreview,
  onVillaMove
}) => {
  return (
    <div className="space-y-6">
      <div className="glass-card p-6 rounded-xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Harita Önizleme</h3>
          <MapBackgroundControl 
            backgroundImage={backgroundImage} 
            showPreview={showPreview}
            setBackgroundImage={setBackgroundImage}
            setShowPreview={setShowPreview}
          />
        </div>
        
        {/* Much larger preview container - full width and tall height */}
        <div className="w-full h-[600px]">
          <MapPreview 
            villas={villas}
            backgroundImage={backgroundImage}
            showPreview={showPreview}
            onVillaMove={onVillaMove}
          />
        </div>

        {!backgroundImage && (
          <div className="mt-4 p-4 border border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center bg-gray-50">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-image text-gray-400 mb-2"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
            <p className="text-gray-500 text-center">
              Harita arka planı yüklemek için "Harita Yükle" butonuna tıklayın.
              <br />
              Varsayılan sarı arka plan görünümünü korunacaktır.
            </p>
          </div>
        )}

        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-2">💡 Sürükle-Bırak Yönergeleri</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Villa numaralarını fare ile sürükleyerek konumlandırabilirsiniz</li>
            <li>• Koordinatlar otomatik olarak güncellenecektir</li>
            <li>• Değişiklikleri onaylamanız gerekecektir</li>
          </ul>
        </div>
      </div>

      <MapHelp />
    </div>
  );
};

export default MapPreviewSection;
