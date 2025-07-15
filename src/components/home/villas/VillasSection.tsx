import React, { useEffect, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchVillaTypes, fetchVillas } from '@/services/villaService';
import VillaTypeSelector from './VillaTypeSelector';
import VillaDisplay from './VillaDisplay';

const VillasSection = () => {
  const [activeVilla, setActiveVilla] = useState('');
  const villasRef = useRef<HTMLDivElement>(null);

  // Fetch villa types from Supabase
  const {
    data: villaTypes = [],
    isLoading: isLoadingVillaTypes
  } = useQuery({
    queryKey: ['villaTypes'],
    queryFn: fetchVillaTypes
  });

  // Fetch villas from Supabase
  const {
    data: allVillas = [],
    isLoading: isLoadingVillas
  } = useQuery({
    queryKey: ['villas'],
    queryFn: fetchVillas
  });

  // Set active villa to first one when data loads
  useEffect(() => {
    if (villaTypes.length > 0 && !activeVilla) {
      setActiveVilla(villaTypes[0].id);
    }
  }, [villaTypes, activeVilla]);

  useEffect(() => {
    // Trigger animations immediately without waiting for intersection
    const triggerAnimations = () => {
      if (villasRef.current) {
        const elements = villasRef.current.querySelectorAll('.animate-on-scroll');
        elements.forEach(el => {
          el.classList.add('animate');
        });
      }
    };

    // Run immediately
    triggerAnimations();

    // Also run after a short delay to ensure DOM is ready
    setTimeout(triggerAnimations, 50);

    // Keep intersection observer as fallback for any missed elements
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        }
      });
    }, {
      threshold: 0.1 // Lower threshold for faster triggering
    });

    if (villasRef.current) {
      const elements = villasRef.current.querySelectorAll('.animate-on-scroll');
      elements.forEach(el => observer.observe(el));
    }

    return () => {
      if (villasRef.current) {
        const elements = villasRef.current.querySelectorAll('.animate-on-scroll');
        elements.forEach(el => observer.unobserve(el));
      }
    };
  }, [villaTypes, allVillas]); // Re-run when data loads

  // Find the selected villa type
  const selectedVillaType = villaTypes.find(villa => villa.id === activeVilla);

  // Get villas for the selected type
  const villasOfSelectedType = allVillas.filter(villa => villa.villa_type_id === activeVilla);

  const isLoading = isLoadingVillaTypes || isLoadingVillas;

  if (isLoading) {
    return (
      <section className="py-16 md:py-24 px-4 md:px-6 bg-therma-beige">
        <div className="container-custom">
          <div className="text-center">Yükleniyor...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24 px-4 md:px-6 bg-therma-beige" ref={villasRef}>
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16 animate-on-scroll animate">
          <span className="inline-block text-sm font-medium text-therma mb-3">VİLLALAR</span>
          <h2 className="text-2xl md:text-4xl font-bold mb-4 md:mb-6">
            Rüyalarınızdaki <span className="text-therma">Villayı</span> Keşfedin
          </h2>
          <p className="text-gray-600 md:text-lg">
            Therma Prime'da farklı ihtiyaçlara ve zevklere hitap eden villa seçenekleri bulunmaktadır. 
            Her Villa'da , doğayla iç içe yaşam alanları.
          </p>
        </div>

        <VillaTypeSelector 
          villaTypes={villaTypes} 
          activeVilla={activeVilla} 
          onSelect={setActiveVilla} 
        />
        
        <VillaDisplay 
          selectedVillaType={selectedVillaType} 
          villas={villasOfSelectedType}
        />
      </div>
    </section>
  );
};

export default VillasSection;
