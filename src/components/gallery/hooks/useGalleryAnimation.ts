
import { useEffect, useRef } from 'react';

export const useGalleryAnimation = () => {
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Tüm animasyonları hemen tetikle, scroll bekleme
    const triggerAnimations = () => {
      if (galleryRef.current) {
        const elements = galleryRef.current.querySelectorAll('.animate-on-scroll');
        elements.forEach((el) => {
          el.classList.add('animate');
        });
      }
    };

    // Hemen tetikle
    triggerAnimations();
    
    // Kısa gecikme ile tekrar tetikle
    setTimeout(triggerAnimations, 50);
  }, []);

  return galleryRef;
};
