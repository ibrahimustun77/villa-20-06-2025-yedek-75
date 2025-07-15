import { useEffect } from 'react';

export const usePreloadImages = (imageUrls: string[]) => {
  useEffect(() => {
    imageUrls.forEach(url => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = url;
      document.head.appendChild(link);
    });
  }, [imageUrls]);
};