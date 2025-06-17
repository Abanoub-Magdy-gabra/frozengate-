// App.js or index.js
"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navigation from './components/Nav';
import Home from './components/Home';
import Footer from './components/Footer';
import PageTransition from './components/PageTransition';
import Cursor from './components/Cursor';
import ParallaxBackground from './components/ParallaxBackground';
import ScrollProgressBar from './components/ScrollProgressBar';
import "@fontsource/montserrat"; // Defaults to weight 400
import "@fontsource/montserrat/400.css"; // Specify weight
import "@fontsource/montserrat/500.css"; // Specify weight
import "@fontsource/montserrat/600.css"; // Specify weight
import "@fontsource/montserrat/700.css"; // Specify weight
import "@fontsource/montserrat/900.css"; // Specify weight
import "@fontsource/montserrat/400-italic.css";

// Loading spinner component
const Loader = () => (
  <div className="fixed inset-0 bg-white z-[9999] flex flex-col items-center justify-center">
    <div className="relative w-20 h-20">
      <div className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-primary-200 opacity-25"></div>
      <div className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-t-primary-500 animate-spin"></div>
    </div>
    <div className="mt-6 text-primary-600 font-montserrat">
      <div className="text-2xl font-bold animate-pulse">Frozen Gate</div>
      <div className="flex space-x-2 justify-center mt-2">
        {[0, 1, 2].map(i => (
          <div 
            key={i} 
            className="w-2 h-2 bg-primary-500 rounded-full"
            style={{ 
              animation: `bounce 1.4s infinite ease-in-out both`,
              animationDelay: `${i * 0.16}s`
            }}
          ></div>
        ))}
      </div>
    </div>
  </div>
);

export default function App() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [pageTransition, setPageTransition] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [cursorEnabled, setCursorEnabled] = useState(false);
  
  useEffect(() => {
    // Client-side only code
    if (typeof window !== 'undefined') {
      // Check if not mobile device
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      setCursorEnabled(!isMobile);
      
      // Simulate initial loading
      const timer = setTimeout(() => {
        setIsLoading(false);
        // After loading, start page transition
        setTimeout(() => {
          setPageTransition(true);
        }, 100);
      }, 2000);
      
      const handleScroll = () => {
        if (window.scrollY > 300) {
          setShowScrollTop(true);
        } else {
          setShowScrollTop(false);
        }
      };
      
      window.addEventListener('scroll', handleScroll);
      
      // Add class to body to hide cursor
      if (!isMobile && typeof document !== 'undefined') {
        document.body.classList.add('custom-cursor');
      }
      
      return () => {
        window.removeEventListener('scroll', handleScroll);
        clearTimeout(timer);
        if (typeof document !== 'undefined') {
          document.body.classList.remove('custom-cursor');
        }
      };
    }
  }, []);
  
  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {cursorEnabled && <Cursor />}
          <ScrollProgressBar />
          
          <ParallaxBackground>
            <div className={`min-h-screen overflow-x-hidden transition-opacity duration-700 ease-in-out ${pageTransition ? 'opacity-100' : 'opacity-0'}`}>
              <div className="flex flex-col min-h-screen">
                <Navigation />
                
                <main className="flex-grow pt-[10vh] transition-all duration-700 ease-in-out">
                  <Suspense fallback={<div className="h-screen flex items-center justify-center"><div className="w-10 h-10 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div></div>}>
                    <Home />
                  </Suspense>
                </main>

                <Footer className="mt-auto" />
              </div>
              
              {/* Scroll to top button */}
              <button 
                onClick={scrollToTop}
                className={`
                  fixed bottom-6 right-6 p-3 rounded-full 
                  bg-primary-500/80 backdrop-blur-sm text-white shadow-lg
                  transition-all duration-300 ease-in-out
                  hover:bg-primary-600 hover:scale-110 hover:shadow-xl focus:outline-none
                  ${showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
                `}
                aria-label="Scroll to top"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-6 w-6" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M5 10l7-7m0 0l7 7m-7-7v18" 
                  />
                </svg>
              </button>
            </div>
          </ParallaxBackground>
        </>
      )}
    </>
  );
}
