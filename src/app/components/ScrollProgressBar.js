"use client";
import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

const ScrollProgressBar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  
  // Calculate the percentage of scroll progress
  const percent = useTransform(scrollYProgress, [0, 1], [0, 100]);
  
  // Show the progress bar only after scrolling down 100px
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsVisible(scrollY > 100);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <>
      {/* Horizontal progress bar at the top of the screen */}
      <motion.div
        className={`fixed top-0 left-0 right-0 h-[3px] bg-primary-500 origin-left z-[1000] ${isVisible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
        style={{ scaleX }}
      />
      
      {/* Circular progress indicator */}
      <motion.div 
        className={`fixed bottom-6 left-6 z-[999] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} transition-all duration-500`}
      >
        <div className="relative w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center">
          <svg className="w-10 h-10" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="rgba(34, 197, 94, 0.2)"
              strokeWidth="8"
              fill="none"
            />
            
            {/* Progress circle */}
            <motion.circle
              cx="50"
              cy="50"
              r="40"
              stroke="var(--primary)"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              strokeDasharray="251.2"
              style={{ 
                strokeDashoffset: useTransform(scrollYProgress, [0, 1], [251.2, 0]) 
              }}
            />
          </svg>
          
          {/* Percentage text */}
          <motion.div 
            className="absolute inset-0 flex items-center justify-center text-primary-600 font-bold text-xs"
          >
            <motion.span>{percent.get().toFixed(0)}%</motion.span>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

export default ScrollProgressBar; 