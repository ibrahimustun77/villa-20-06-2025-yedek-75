
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import VillaPageHeader from '@/components/villas/VillaPageHeader';
import VillaPageContent from '@/components/villas/VillaPageContent';
import LoadingSkeleton from '@/components/villas/LoadingSkeleton';
import { useVillaPageData } from '@/hooks/useVillaPageData';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { SitePlanVilla } from '@/hooks/useVillaPageData';

const VillasPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const villaParam = queryParams.get('villa');
  
  const {
    activeVilla,
    setActiveVilla,
    selectedVillaNumber,
    setSelectedVillaNumber,
    sitePlanVillas,
    villaTypes,
    villas,
    isLoading
  } = useVillaPageData();
  
  // Apply scroll animations - this will now show content immediately
  useScrollAnimation();
  
  // Scroll to top and trigger animations when the component mounts
  useEffect(() => {
    console.log('VillasPage mounted - scrolling to top');
    window.scrollTo(0, 0);
    
    // Trigger animations after a very short delay to ensure DOM is ready
    const animateElements = () => {
      console.log('Forcing animations on all elements');
      const elements = document.querySelectorAll('.animate-on-scroll');
      elements.forEach((element) => {
        element.classList.add('animate');
      });
    };
    
    // Run immediately with a minimal delay
    setTimeout(animateElements, 50);
  }, []);
  
  // Set active villa from URL parameter if it exists
  useEffect(() => {
    if (villaParam && !isLoading && villaTypes.some(vt => vt.id === villaParam)) {
      setActiveVilla(villaParam);
      
      // Scroll to the section above villa content
      setTimeout(() => {
        const contentSection = document.getElementById('villa-content-section');
        if (contentSection) {
          const headerOffset = 100; // Increased offset to ensure we're above the villa selector
          const elementPosition = contentSection.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 300);
    }
  }, [villaParam, isLoading, villaTypes, setActiveVilla]);
  
  // Function to view villa details
  const viewVillaDetails = (villa: SitePlanVilla) => {
    setActiveVilla(villa.type);
    setSelectedVillaNumber(null); // Close the villa info popup
    
    // Scroll to above the villa type selector
    setTimeout(() => {
      const contentSection = document.getElementById('villa-content-section');
      if (contentSection) {
        const headerOffset = 100; // Increased to scroll further up
        const elementPosition = contentSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 300);
  };

  // Render loading skeleton
  if (isLoading) {
    return <LoadingSkeleton />;
  }
  
  return (
    <>
      <Navbar />
      <VillaPageHeader />
      <VillaPageContent 
        villaTypes={villaTypes}
        activeVilla={activeVilla}
        onSelectVilla={(villaId) => {
          setActiveVilla(villaId);
          // Scroll to above the villa selector
          setTimeout(() => {
            const contentSection = document.getElementById('villa-content-section');
            if (contentSection) {
              const headerOffset = 100; // Increased to scroll above the villa selector
              const elementPosition = contentSection.getBoundingClientRect().top;
              const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
              
              window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
              });
            }
          }, 300);
        }}
        selectedVillaNumber={selectedVillaNumber}
        setSelectedVillaNumber={setSelectedVillaNumber}
        sitePlanVillas={sitePlanVillas}
        villas={villas}
        onViewVillaDetails={viewVillaDetails}
      />
      <Footer />
    </>
  );
};

export default VillasPage;
