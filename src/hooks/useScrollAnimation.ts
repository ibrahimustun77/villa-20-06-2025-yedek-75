
import { useEffect } from 'react';

export const useScrollAnimation = () => {
  useEffect(() => {
    // Tüm animasyonları anında tetikle - scroll bekleme
    const triggerAllAnimations = () => {
      console.log('Tüm animasyonlar anında tetikleniyor');
      const elements = document.querySelectorAll('.animate-on-scroll');
      elements.forEach((element) => {
        // Tüm elementleri hemen görünür yap
        element.classList.add('animate');
      });
    };
    
    // Sayfa yüklendiği anda hemen çalıştır
    triggerAllAnimations();
    
    // DOM değişikliklerini izle ve yeni elementleri de hemen görünür yap
    const observer = new MutationObserver(() => {
      triggerAllAnimations();
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
    
    // Kısa bir gecikme ile tekrar çalıştır (herhangi bir gecikme için)
    setTimeout(triggerAllAnimations, 100);
    
    // Temizlik
    return () => {
      observer.disconnect();
    };
  }, []);
};
