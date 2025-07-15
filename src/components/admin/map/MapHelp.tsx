
import React from 'react';

const MapHelp: React.FC = () => {
  return (
    <div className="glass-card p-6 rounded-xl mt-8">
      <h3 className="text-xl font-bold mb-4">Yardım</h3>
      <div className="space-y-4 text-sm">
        <div>
          <h4 className="font-medium">Villa Türleri:</h4>
          <div className="flex space-x-4 mt-2">
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full bg-therma-light mr-2"></div>
              <span>A Tipi</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full bg-therma mr-2"></div>
              <span>B Tipi</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full bg-therma-dark mr-2"></div>
              <span>C Tipi</span>
            </div>
          </div>
        </div>
        
        <div>
          <h4 className="font-medium">Konumlandırma:</h4>
          <p>X ve Y değerleri 0-100 arasında olmalıdır. Bu değerler, yerleşim planındaki yüzdelik konumları belirtir.</p>
        </div>
        
        <div>
          <h4 className="font-medium">Yollar:</h4>
          <p>Yollar yatay veya dikey olabilir. "Konum" değeri, yatay yollar için y-koordinatını, dikey yollar için x-koordinatını belirtir. "Başlangıç" ve "Bitiş" değerleri, yolun başlangıç ve bitiş noktalarını belirtir (0-100 arasında). "Kalınlık" değeri, yolun piksel cinsinden kalınlığını belirtir.</p>
        </div>
        
        <div>
          <h4 className="font-medium">Değişiklikleri Kaydetme:</h4>
          <p>Yaptığınız değişiklikler tarayıcı önbelleğine kaydedilir. Siteyi ziyaret eden kullanıcılar bu değişiklikleri göremez.</p>
        </div>
        
        <div>
          <h4 className="font-medium">Koordinat Sistemi:</h4>
          <p>Görünüm alanında X değeri soldan sağa (0-100), Y değeri yukarıdan aşağıya (0-100) doğru artar.</p>
        </div>
      </div>
    </div>
  );
};

export default MapHelp;
