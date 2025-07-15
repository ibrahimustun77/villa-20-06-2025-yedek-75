
import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';
import { VillaType } from '@/services/types';
import { useContactSettings } from '@/contexts/ContactSettingsContext';

interface VillaPriceSectionProps {
  villaType?: VillaType;
  actualVilla?: {
    price?: number;
  };
  isHomepage?: boolean;
}

const VillaPriceSection: React.FC<VillaPriceSectionProps> = ({
  villaType,
  actualVilla,
  isHomepage = true
}) => {
  const { contactSettings } = useContactSettings();

  const handlePriceClick = () => {
    const message = `Merhaba, ${villaType?.name || 'Villa'} için fiyat bilgisi almak istiyorum`;
    const whatsappNumber = contactSettings?.whatsapp_number;
    
    if (whatsappNumber) {
      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
      window.open(whatsappUrl, '_blank');
    }
  };

  // Fiyat kontrolü - sadece villalar sayfasında
  const price = actualVilla?.price;
  const hasValidPrice = !isHomepage && price != null && price > 0;
  const shouldShowPriceButton = !isHomepage && (price == null || price <= 0);

  if (isHomepage) {
    return null; // Ana sayfada fiyat gösterme
  }

  return (
    <>
      {/* Fiyat butonu - sadece villalar sayfasında ve fiyat yoksa göster */}
      {shouldShowPriceButton && (
        <Button 
          onClick={handlePriceClick}
          size="sm"
          className="bg-therma hover:bg-therma/90 text-white"
        >
          <MessageCircle className="w-4 h-4 mr-1" />
          Fiyat için tıklayın
        </Button>
      )}
      
      {/* Fiyat gösterimi - sadece villalar sayfasında ve geçerli fiyat varsa */}
      {hasValidPrice && (
        <div className="text-right">
          <span className="text-lg md:text-xl font-bold text-therma">
            ₺{actualVilla.price?.toLocaleString('tr-TR')}
          </span>
        </div>
      )}
    </>
  );
};

export default VillaPriceSection;
