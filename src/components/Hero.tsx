
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchActiveSliderImages } from '@/services/sliderService';

// Fallback images in case database is empty
const fallbackImages = [
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200',
  'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=1200',
  'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1200',
  'https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=1200'
];

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  
  const { data: sliderImages = [], isLoading, isSuccess } = useQuery({
    queryKey: ['activeSliderImages', 'home'],
    queryFn: () => fetchActiveSliderImages('home'),
    staleTime: 1000 * 60 * 10, // 10 minutes cache
  });

  // Only use database images, no fallback to prevent flashing
  const heroImageUrls = sliderImages.length > 0 
    ? sliderImages.map(img => img.image_url)
    : [];

  // Preload images for better performance
  useEffect(() => {
    if (heroImageUrls.length > 0) {
      let loadedCount = 0;
      const totalImages = heroImageUrls.length;
      
      heroImageUrls.forEach((url) => {
        const img = new Image();
        img.onload = () => {
          loadedCount++;
          if (loadedCount === totalImages) {
            setImagesLoaded(true);
          }
        };
        img.src = url;
      });
    }
  }, [heroImageUrls]);

  useEffect(() => {
    if (!imagesLoaded) return;
    
    const interval = setInterval(() => {
      setCurrentImageIndex(prevIndex => (prevIndex + 1) % heroImageUrls.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroImageUrls.length, imagesLoaded]);

  if (isLoading || (heroImageUrls.length > 0 && !imagesLoaded)) {
    return (
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-therma/20 to-gray-900">
        <div className="container-custom relative z-20 text-white pt-20">
          <div className="max-w-3xl mx-auto text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-white/20 rounded mb-6 w-48 mx-auto"></div>
              <div className="h-16 bg-white/20 rounded mb-4"></div>
              <div className="h-6 bg-white/20 rounded mb-8"></div>
              <div className="flex justify-center gap-4">
                <div className="h-12 bg-white/20 rounded w-32"></div>
                <div className="h-12 bg-white/20 rounded w-32"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If no images available from database, show content without slider
  if (heroImageUrls.length === 0) {
    return (
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-therma/20 to-gray-900">
        <div className="container-custom relative z-20 text-white pt-20">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-block px-3 py-1 mb-6 border border-white/30 rounded-full bg-white/10 backdrop-blur-sm animate-fade-in">
              <span className="text-sm font-medium">Yalova Termal Bölgesi</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 hero-content animate-fade-in">
              <span className="text-therma">Doğanın Kabli Termal'de</span> Lüks Yaşam Villaları
            </h1>
            
            <p className="text-lg md:text-xl opacity-90 mb-8 hero-content animate-fade-in">Doğayla iç içe, lüks ve ayrıcalıklı bir yaşam için tasarlanan 44 özel villadan oluşan Therma Prime ile tanışın.</p>
            
            <div className="flex flex-wrap justify-center gap-4 hero-cta animate-fade-in">
              <Link to="/villalar" className="button-primary">
                Villaları Keşfedin
              </Link>
              <Link to="/iletisim" className="bg-white/20 backdrop-blur-sm border border-white/30 text-white font-medium py-3 px-6 rounded-full hover:bg-white/30 transform transition-all duration-300 ease-in-out hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50">
                İletişime Geçin
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Images with Crossfade */}
      {heroImageUrls.map((url, index) => (
        <div 
          key={`${url}-${index}`} 
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'}`}
        >
          <div className="absolute inset-0 bg-black/30 z-10"></div>
          <img 
            src={url} 
            alt={`Therma Prime Villa ${index + 1}`} 
            className="absolute inset-0 h-full w-full object-cover"
            loading={index === 0 ? "eager" : "lazy"}
          />
        </div>
      ))}

      {/* Content */}
      <div className="container-custom relative z-20 text-white pt-20">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-block px-3 py-1 mb-6 border border-white/30 rounded-full bg-white/10 backdrop-blur-sm animate-fade-in">
            <span className="text-sm font-medium">Yalova Termal Bölgesi</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 hero-content animate-fade-in">
            <span className="text-therma">Doğanın Kabli Termal'de</span> Lüks Yaşam Villaları
          </h1>
          
          <p className="text-lg md:text-xl opacity-90 mb-8 hero-content animate-fade-in">Doğayla iç içe, lüks ve ayrıcalıklı bir yaşam için tasarlanan 44 özel villadan oluşan Therma Prime ile tanışın.</p>
          
          <div className="flex flex-wrap justify-center gap-4 hero-cta animate-fade-in">
            <Link to="/villalar" className="button-primary">
              Villaları Keşfedin
            </Link>
            <Link to="/iletisim" className="bg-white/20 backdrop-blur-sm border border-white/30 text-white font-medium py-3 px-6 rounded-full hover:bg-white/30 transform transition-all duration-300 ease-in-out hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50">
              İletişime Geçin
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
