
import { useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

interface SitePlanVilla {
  id: number;
  type: string;
  x: number;
  y: number;
  villa_id: string;
  name: string;
}

export const useMobileVillaHandling = (
  setSelectedVillaNumber: (id: number | null) => void
) => {
  const [mobileVillaDetails, setMobileVillaDetails] = useState<SitePlanVilla | null>(null);
  const isMobile = useIsMobile();

  const handleMobileVillaSelection = (villa: SitePlanVilla) => {
    setMobileVillaDetails(villa);
    setSelectedVillaNumber(villa.id);
    
    if (isMobile) {
      setTimeout(() => {
        const detailsSection = document.getElementById('mobile-villa-details');
        if (detailsSection) {
          const navbarHeight = document.querySelector('nav')?.clientHeight || 0;
          const yOffset = -navbarHeight - 20;
          const y = detailsSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
          
          window.scrollTo({
            top: y,
            behavior: 'smooth'
          });
        }
      }, 100);
    }
  };

  const handleMobileDetailsClose = () => {
    setMobileVillaDetails(null);
    setSelectedVillaNumber(null);
  };

  return {
    mobileVillaDetails,
    isMobile,
    handleMobileVillaSelection,
    handleMobileDetailsClose
  };
};
