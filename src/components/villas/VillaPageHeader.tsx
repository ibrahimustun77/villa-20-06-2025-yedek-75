
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

const VillaPageHeader = () => {
  const { data: sliderImages = [] } = useQuery({
    queryKey: ['slider-images', 'villas'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('slider_images')
        .select('*')
        .eq('page_type', 'villas')
        .eq('is_active', true)
        .order('order_index');
      
      if (error) throw error;
      return data;
    },
    staleTime: 1000 * 60 * 10, // 10 minutes cache
  });

  // Use the first slider image if available, otherwise fallback to default
  const heroImage = sliderImages.length > 0 
    ? sliderImages[0].image_url 
    : "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1200";

  const heroTitle = sliderImages.length > 0 && sliderImages[0].title
    ? sliderImages[0].title
    : "Therma Prime Villalar";

  const heroDescription = sliderImages.length > 0 && sliderImages[0].description
    ? sliderImages[0].description
    : "Farklı ihtiyaçlara ve zevklere hitap eden, termal su kaynaklarına yakın lüks villalarımızı keşfedin.";

  return (
    <div className="relative pt-20">
      <div className="h-[60vh] relative overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <img 
          src={heroImage} 
          alt="Therma Prime Villalar" 
          className="absolute inset-0 h-full w-full object-cover" 
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
        <div className="container-custom relative z-20 h-full flex flex-col justify-center text-white">
          <div className="max-w-3xl">
            <div className="inline-block px-3 py-1 mb-6 border border-white/30 rounded-full bg-white/10 backdrop-blur-sm animate-fade-in">
              <span className="text-sm font-medium">Villalar</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
              {heroTitle.includes('Therma Prime') ? (
                <>
                  Therma Prime <span className="text-therma">Villalar</span>
                </>
              ) : (
                heroTitle
              )}
            </h1>
            <p className="text-lg md:text-xl opacity-90 animate-fade-in" style={{
              animationDelay: '200ms'
            }}>
              {heroDescription}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VillaPageHeader;
