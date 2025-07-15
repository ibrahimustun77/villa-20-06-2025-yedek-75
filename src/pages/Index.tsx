
import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import About from '../components/About';
import Villas from '../components/Villas';
import Gallery from '../components/gallery/Gallery';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const Index = () => {
  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
    
    // Animation on scroll
    const handleScroll = () => {
      const elements = document.querySelectorAll('.animate-on-scroll');
      elements.forEach((element) => {
        const position = element.getBoundingClientRect();
        
        // If element is in viewport
        if (position.top < window.innerHeight * 0.8) {
          element.classList.add('animate');
        }
      });
    };
    
    // Initial check for elements in viewport
    handleScroll();
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Clean up
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <About />
      <Villas />
      <Gallery />
      <Contact />
      <Footer />
    </>
  );
};

export default Index;
