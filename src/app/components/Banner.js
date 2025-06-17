"use client";
import React, { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';
import { motion, AnimatePresence } from 'framer-motion';

const Banner = ({ 
  slides: propSlides,
  autoPlayInterval = 5000,
  transitionDuration = 500,
  aspectRatio = "3:1",
  initialSlide = 0,
  className = "",
  showThumbnails = true,
  showControls = true,
  pauseOnHover = true,
  fallbackImage = "/images/potatoes.jpg",
  withCounter = true,
}) => {
  // State for scroll position
  const [scrolled, setScrolled] = useState(false);
  // State for viewport size
  const [viewportSize, setViewportSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800,
  });

  // Default slides with validation
  const slides = React.useMemo(() => {
    if (Array.isArray(propSlides) && propSlides.length > 0) {
      return propSlides.map(slide => ({
        src: slide.src || fallbackImage,
        alt: slide.alt || "Carousel image",
        caption: slide.caption || "",
        ...slide
      }));
    } 
    return [
      { src: "/images/Strawberry.png", alt: "Fresh strawberries in a basket", caption: " strawberries" },
      { src: "/images/mangoweb.png", alt: "Ripe yellow mangoes", caption: "Sweet mangoes" },
      { src: "/images/broccoliweb.jpg", alt: "Fresh organic broccoli", caption: "Organic broccoli" }
    ];
  }, [propSlides, fallbackImage]);

  // State
  const [currentSlide, setCurrentSlide] = useState(initialSlide);
  const [direction, setDirection] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  
  // Refs
  const containerRef = useRef(null);
  const slideTimerRef = useRef(null);
  
  // Intersection observer to pause when not in view
  const { ref: observerRef, inView } = useInView({
    threshold: 0.5,
    triggerOnce: false,
  });

  // Update viewport size on resize
  useEffect(() => {
    const handleResize = () => {
      setViewportSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      // Initial call to set correct values
      handleResize();
    }
    
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleResize);
      }
    };
  }, []);

  // Animation variants
  const slideVariants = {
    enter: (direction) => ({
      x: direction === 'right' ? '100%' : '-100%',
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: transitionDuration / 1000,
        ease: 'easeOut',
      },
    },
    exit: (direction) => ({
      x: direction === 'right' ? '-100%' : '100%',
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: transitionDuration / 1000,
        ease: 'easeIn',
      },
    }),
  };

  // Change slide function
  const changeSlide = useCallback((index) => {
    // Validate slide index
    if (index < 0 || index >= slides.length || index === currentSlide) return;
    
    // Determine direction for animations
    const dir = index > currentSlide ? 'right' : 'left';
    setDirection(dir);
    setCurrentSlide(index);
  }, [currentSlide, slides.length]);

  // Navigation functions
  const goToNextSlide = useCallback(() => {
    const next = (currentSlide + 1) % slides.length;
    changeSlide(next);
  }, [currentSlide, slides.length, changeSlide]);

  const goToPrevSlide = useCallback(() => {
    const prev = (currentSlide - 1 + slides.length) % slides.length;
    changeSlide(prev);
  }, [currentSlide, slides.length, changeSlide]);

  // Toggle autoplay
  const toggleAutoplay = useCallback(() => {
    setIsPaused(prev => !prev);
    setIsAutoPlaying(prev => !prev);
  }, []);

  // Handle pause on hover
  const handleMouseEnter = useCallback(() => {
    if (pauseOnHover && isAutoPlaying) {
      setIsPaused(true);
    }
  }, [pauseOnHover, isAutoPlaying]);

  const handleMouseLeave = useCallback(() => {
    if (pauseOnHover && isAutoPlaying) {
      setIsPaused(false);
    }
  }, [pauseOnHover, isAutoPlaying]);

  // Keyboard navigation
  useEffect(() => {
    if (typeof document === 'undefined') return;
    
    const handleKeyDown = (e) => {
      if (document.activeElement === containerRef.current || 
          (containerRef.current && containerRef.current.contains(document.activeElement))) {
        switch (e.key) {
          case 'ArrowLeft':
            goToPrevSlide();
            e.preventDefault();
            break;
          case 'ArrowRight':
            goToNextSlide();
            e.preventDefault();
            break;
          case ' ':
          case 'Spacebar':
            toggleAutoplay();
            e.preventDefault();
            break;
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNextSlide, goToPrevSlide, toggleAutoplay]);

  // Auto transition effect
  useEffect(() => {
    if (isPaused || !inView) return;
    
    const interval = setInterval(() => {
      goToNextSlide();
    }, autoPlayInterval);
    
    return () => clearInterval(interval);
  }, [currentSlide, isPaused, inView, goToNextSlide, autoPlayInterval]);

  // Pause when not in view
  useEffect(() => {
    if (!inView) {
      setIsPaused(true);
    } else if (isAutoPlaying) {
      setIsPaused(false);
    }
  }, [isAutoPlaying, inView]);

  // Add scroll listener effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  // Calculate dynamic aspect ratio based on viewport size and scroll position
  const dynamicAspectRatio = React.useMemo(() => {
    const isLargeScreen = viewportSize.width >= 1920;
    const isUltraWideScreen = viewportSize.width / viewportSize.height > 2.1;
    
    if (isLargeScreen) {
      // Wider aspect ratio for large screens
      const [width, height] = aspectRatio.split(':').map(Number);
      
      if (scrolled) {
        // When scrolled on large screens, make it shorter
        return isUltraWideScreen 
          ? `${width * 1.1}:${height * 0.7}` // Wider and shorter for ultrawide
          : `${width}:${height * 0.65}`; // Just shorter for regular large screens
      }
      
      // Not scrolled, large screen
      return isUltraWideScreen
        ? `${width * 1.1}:${height * 0.85}` // Wider but not as short for ultrawide
        : `${width}:${height * 0.9}`; // Slightly shorter for large screens
    }
    
    // Standard screens (including mobile/tablet)
    if (scrolled) {
      const [width, height] = aspectRatio.split(':').map(Number);
      return `${width}:${height * 0.75}`; // 25% shorter when scrolled
    }
    
    return aspectRatio; // Default aspect ratio
  }, [aspectRatio, scrolled, viewportSize]);

  // Calculate optimal max height based on viewport
  const maxHeight = React.useMemo(() => {
    const isLargeScreen = viewportSize.width >= 1920;
    
    if (isLargeScreen) {
      return scrolled ? '60vh' : '75vh';
    }
    
    if (viewportSize.width >= 1440) {
      return scrolled ? '62vh' : '78vh';
    }
    
    return scrolled ? '65vh' : '80vh';
  }, [scrolled, viewportSize]);

  // Controls component with scroll and screen size awareness
  const Controls = () => {
    const isLargeScreen = viewportSize.width >= 1440;
    const buttonSize = isLargeScreen 
      ? (scrolled ? "20" : "22") 
      : (scrolled ? "18" : "20");
      
    const padding = isLargeScreen
      ? (scrolled ? "p-2.5" : "p-3")
      : (scrolled ? "p-2" : "p-2.5");
    
    return (
      <div className={`absolute ${scrolled ? 'bottom-3' : 'bottom-4'} left-0 right-0 flex justify-center items-center ${scrolled ? 'gap-2' : 'gap-3'} z-10 transition-all duration-300`}>
        <button
          onClick={goToPrevSlide}
          className={`rounded-full bg-white/90 text-black hover:bg-primary hover:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 shadow-lg transform transition-all duration-300 hover:scale-110 ${padding}`}
          aria-label="Previous slide"
        >
          <svg width={buttonSize} height={buttonSize} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        
        <button
          onClick={toggleAutoplay}
          className={`rounded-full bg-white/90 text-black hover:bg-primary hover:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 shadow-lg transform transition-all duration-300 hover:scale-110 ${padding}`}
          aria-label={isAutoPlaying ? "Pause slideshow" : "Play slideshow"}
        >
          {isAutoPlaying ? (
            <svg width={buttonSize} height={buttonSize} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="6" y="5" width="4" height="14" />
              <rect x="14" y="5" width="4" height="14" />
            </svg>
          ) : (
            <svg width={buttonSize} height={buttonSize} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          )}
        </button>
        
        <button
          onClick={goToNextSlide}
          className={`rounded-full bg-white/90 text-black hover:bg-primary hover:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 shadow-lg transform transition-all duration-300 hover:scale-110 ${padding}`}
          aria-label="Next slide"
        >
          <svg width={buttonSize} height={buttonSize} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>

        <div className={`flex ${scrolled ? 'gap-1 ml-2' : 'gap-1.5 ml-3'}`}>
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => changeSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-300 ${
                scrolled ? 'w-2 h-2' : 'w-2.5 h-2.5'
              } ${
                currentSlide === index 
                  ? "bg-white scale-125" 
                  : "bg-white/50 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      </div>
    );
  };

  // Thumbnails component with screen size awareness
  const Thumbnails = () => {
    const isLargeScreen = viewportSize.width >= 1440;
    
    // Larger thumbnails on bigger screens
    const thumbWidth = isLargeScreen 
      ? (scrolled ? "w-20 h-12" : "w-24 h-16") 
      : (scrolled ? "w-16 h-10" : "w-20 h-14");
    
    const sizes = isLargeScreen 
      ? (scrolled ? "80px" : "96px") 
      : (scrolled ? "64px" : "80px");
      
    return (
      <div className={`hidden md:flex justify-center overflow-x-auto px-2 transition-all duration-300 ease-in-out ${
        scrolled ? 'mt-1 gap-2 py-1' : 'mt-3 gap-3 py-2'
      }`}>
        {slides.map((slide, index) => (
          <button
            key={index}
            onClick={() => changeSlide(index)}
            className={`relative flex-shrink-0 rounded-md focus:outline-none overflow-hidden transition-all duration-300 ease-in-out ${thumbWidth} ${
              currentSlide === index
                ? "ring-2 ring-primary scale-110 shadow-md"
                : "ring-1 ring-gray-300 opacity-70 hover:opacity-100 hover:ring-primary-light"
            }`}
            aria-label={`Thumbnail for slide ${index + 1}`}
          >
            <div className="w-full h-full image-hover">
              <Image
                src={slide.src}
                alt=""
                fill
                sizes={sizes}
                className="object-cover"
                loading="lazy"
                quality={40}
              />
            </div>
          </button>
        ))}
      </div>
    );
  };

  // Calculate image sizes attribute based on viewport
  const getImageSizes = React.useMemo(() => {
    if (viewportSize.width >= 1920) {
      return "(max-width: 768px) 100vw, (max-width: 1920px) 85vw, 80vw";
    }
    if (viewportSize.width >= 1440) {
      return "(max-width: 768px) 100vw, (max-width: 1440px) 85vw, 75vw";
    }
    return "(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw";
  }, [viewportSize]);

  return (
    <div
      ref={observerRef}
      className={`relative w-full overflow-hidden rounded-lg shadow-lg transition-all duration-300 ease-in-out ${className}`}
      style={{ 
        aspectRatio: dynamicAspectRatio.replace(':', '/'),
        maxHeight,
        maxWidth: viewportSize.width >= 1920 ? '1800px' : '100%',
        margin: viewportSize.width >= 1920 ? '0 auto' : undefined
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div 
        ref={containerRef}
        className="relative w-full h-full" 
        tabIndex="0"
        role="region"
        aria-label={`Slideshow with ${slides.length} slides`}
      >
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentSlide}
            className="absolute inset-0"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            role="group"
          >
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60 z-[1]"></div>
              <Image
                src={slides[currentSlide].src}
                alt={slides[currentSlide].alt}
                fill
                sizes={getImageSizes}
                className="object-cover transform transition-transform duration-10000 ease-in-out hover:scale-105"
                priority={true}
              />
            </div>
            
            {slides[currentSlide].caption && (
              <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent text-white backdrop-blur-sm z-[2] transition-all duration-300 ${
                scrolled ? 'p-3' : 'p-4'
              }`}>
                <motion.p 
                  className={`font-medium drop-shadow-md transition-all duration-300 ${
                    viewportSize.width >= 1440 
                      ? (scrolled ? 'text-sm md:text-base' : 'text-base md:text-lg') 
                      : (scrolled ? 'text-xs md:text-sm' : 'text-sm md:text-base')
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  {slides[currentSlide].caption}
                </motion.p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
        
        {/* Autoplay progress bar */}
        {isAutoPlaying && !isPaused && (
          <div className="absolute top-0 left-0 w-full h-1 bg-white/20">
            <div
              className="h-full bg-white/60 transition-all"
              style={{ 
                width: '0%', 
                animation: `progress ${autoPlayInterval}ms linear` 
              }}
            />
          </div>
        )}
        
        {/* Counter */}
        {withCounter && (
          <div className={`absolute ${scrolled ? 'top-1.5 right-1.5' : 'top-2 right-2'} bg-black/70 text-white px-2 py-1 rounded transition-all duration-300 ${
            viewportSize.width >= 1440 
              ? (scrolled ? 'text-sm' : 'text-base px-2.5 py-1.5') 
              : (scrolled ? 'text-xs' : 'text-sm')
          }`}>
            {currentSlide + 1}/{slides.length}
          </div>
        )}
        
        {/* Controls */}
        {showControls && <Controls />}
      </div>
      
      {/* Thumbnails */}
      {showThumbnails && <Thumbnails />}
      
      {/* Animation keyframes for progress bar */}
      <style jsx global>{`
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </div>
  );
};

export default Banner;