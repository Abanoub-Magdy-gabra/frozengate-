"use client";

import React, { useEffect, useRef, useState } from 'react';
import Banner from './Banner';
import BannerText from './BannerText';
import WhoWeAreSection from './WhoWeAre';
import CertificationsSection from './Certifications';
import ProductsSection from './Products';
import GradientStats from './World';
import FactorySectionComponent from './Factory';
import GradientSection from './Grafient';
import AnimatedSection from './AnimatedSection';
import AnimateOnScroll from './AnimateOnScroll';

const Home = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const sectionsRef = useRef([]);

  useEffect(() => {
    // Set loaded state for initial animations
    setIsLoaded(true);
    
    // Client-side only code
    if (typeof window === 'undefined' || typeof document === 'undefined') return;
    
    // Add animation to sections when they come into view
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15
    };

    const handleIntersect = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.setAttribute('data-visible', 'true');
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    
    // Observe all sections with the animate-on-scroll class
    document.querySelectorAll('.animate-on-scroll').forEach(section => {
      observer.observe(section);
    });

    // Preload key images to improve perceived performance
    const preloadImages = [
      // Add key image URLs here
    ];
    
    preloadImages.forEach(src => {
      const img = new Image();
      img.src = src;
    });

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, []);

  // Helper to add sections to ref array
  const addToRefs = (el) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  return (
    <div className="overflow-hidden">
      {/* Hero section with Banner */}
      <AnimatedSection 
        animation="fade" 
        duration={1000} 
        className="relative w-full"
      >
        <Banner />
        <AnimatedSection 
          animation="fade-down" 
          delay={500} 
          duration={1000} 
          className="absolute top-[15%] left-[8%] z-10"
        >
          <BannerText />
        </AnimatedSection>
      </AnimatedSection>
      
      {/* Main content sections with staggered animations */}
      <AnimateOnScroll 
        ref={el => addToRefs(el)}
        animation="fade-up"
        duration={900}
        delay={100}
        threshold={0.2}
        className="py-4"
      >
        <WhoWeAreSection />
      </AnimateOnScroll>
      
      <AnimateOnScroll 
        ref={el => addToRefs(el)}
        animation="fade-up"
        duration={900}
        delay={200}
        threshold={0.2}
        className="py-4"
      >
        <CertificationsSection />
      </AnimateOnScroll>
      
      <AnimateOnScroll 
        ref={el => addToRefs(el)}
        animation="zoom-in"
        duration={900}
        delay={300}
        threshold={0.1}
        className="py-4"
      >
        <ProductsSection />
      </AnimateOnScroll>
      
      <AnimateOnScroll 
        ref={el => addToRefs(el)}
        animation="fade-left"
        duration={900}
        delay={400}
        threshold={0.1}
        className="py-4"
      >
        <GradientStats />
      </AnimateOnScroll>
      
      <AnimateOnScroll 
        ref={el => addToRefs(el)}
        animation="fade-right"
        duration={900}
        delay={500}
        threshold={0.1}
        className="py-4"
      >
        <FactorySectionComponent />
      </AnimateOnScroll>
      
      <AnimateOnScroll 
        ref={el => addToRefs(el)}
        animation="fade-up"
        duration={900}
        delay={600}
        threshold={0.1}
        className="py-4"
      >
        <GradientSection />
      </AnimateOnScroll>
    </div>
  );
};

export default Home;