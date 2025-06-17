"use client";
import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';

// Pre-generated positions to avoid client/server mismatch
const STATIC_POSITIONS = [
  { top: "10%", left: "20%" },
  { top: "75%", left: "15%" },
  { top: "45%", left: "85%" },
  { top: "20%", left: "70%" },
  { top: "15%", left: "35%" },
  { top: "55%", left: "10%" },
  { top: "70%", left: "60%" },
  { top: "25%", left: "90%" },
  { top: "50%", left: "30%" },
  { top: "85%", left: "45%" }
];

const ParallaxBackground = ({ children }) => {
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  // Mouse motion values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Get scroll progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Define transforms outside of render - all transforms need to be defined here
  // to avoid breaking Rules of Hooks
  const parallaxIntensity = isMobile ? 0.5 : 1;
  
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200 * parallaxIntensity]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -150 * parallaxIntensity]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -100 * parallaxIntensity]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, -50 * parallaxIntensity]);
  
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.5]);
  
  // Define all mouseX transforms outside of the render function
  const mouseXTransform2 = useTransform(mouseX, value => value * -0.5);
  const mouseXTransformMobile2 = useTransform(mouseX, value => value * -0.2);
  
  const mouseXTransform3 = useTransform(mouseX, value => value * -1);
  const mouseXTransformMobile3 = useTransform(mouseX, value => value * -0.3);
  const rotateZ3 = useTransform(mouseX, [-20, 20], [-2, 2]);
  
  const mouseXTransform4 = useTransform(mouseX, value => value * -1.5);
  const mouseXTransformMobile4 = useTransform(mouseX, value => value * -0.5);
  const rotateZ4 = useTransform(mouseY, [-20, 20], [-1, 1]);
  
  // Apply spring physics to make movements smooth
  const smoothY1 = useSpring(y1, { stiffness: 100, damping: 30 });
  const smoothY2 = useSpring(y2, { stiffness: 100, damping: 30 });
  const smoothY3 = useSpring(y3, { stiffness: 100, damping: 30 });
  const smoothY4 = useSpring(y4, { stiffness: 100, damping: 30 });

  useEffect(() => {
    // Check if device is mobile
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    // Initial check
    checkIsMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkIsMobile);
    
    const handleMouseMove = (e) => {
      // Skip mouse effect on mobile devices
      if (isMobile) return;
      
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      // Convert mouse position to normalized coordinates (-1 to 1)
      const normalizedX = (clientX / innerWidth) * 2 - 1;
      const normalizedY = (clientY / innerHeight) * 2 - 1;
      
      mouseX.set(normalizedX * 20); // Scale for movement amount
      mouseY.set(normalizedY * 20);
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', checkIsMobile);
    };
  }, [mouseX, mouseY, isMobile]);

  return (
    <div ref={containerRef} className="relative overflow-hidden w-full">
      {/* Parallax elements - Only rendered on client side */}
      {mounted && (
        <div className="fixed inset-0 -z-10 pointer-events-none">
          {/* Depth layer 1 - Furthest */}
          <motion.div 
            className="absolute inset-0" 
            style={{ 
              y: smoothY1,
              opacity
            }}
          >
            <div className="absolute top-[10%] left-[10%] w-[10vw] h-[10vw] max-w-32 max-h-32 rounded-full bg-primary-200/20 blur-2xl"></div>
            <div className="absolute top-[60%] right-[5%] w-[12vw] h-[12vw] max-w-40 max-h-40 rounded-full bg-primary-300/10 blur-3xl"></div>
          </motion.div>

          {/* Depth layer 2 */}
          <motion.div 
            className="absolute inset-0" 
            style={{ 
              y: smoothY2,
              x: isMobile ? mouseXTransformMobile2 : mouseXTransform2
            }}
          >
            <div className="absolute top-[20%] right-[20%] w-[15vw] h-[15vw] max-w-64 max-h-64 rounded-full bg-primary-100/20 blur-2xl"></div>
            <motion.div 
              className="absolute bottom-[20%] left-[15%] w-[8vw] h-[8vw] max-w-24 max-h-24 rounded-full bg-primary-400/10"
              animate={{ 
                y: [0, -20, 0], 
                filter: ['blur(10px)', 'blur(15px)', 'blur(10px)'],
                opacity: [0.1, 0.2, 0.1]
              }}
              transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
            ></motion.div>
          </motion.div>

          {/* Depth layer 3 */}
          <motion.div 
            className="absolute inset-0" 
            style={{ 
              y: smoothY3,
              x: isMobile ? mouseXTransformMobile3 : mouseXTransform3,
              rotateZ: rotateZ3
            }}
          >
            <div className="absolute top-[30%] left-[30%] w-[6vw] h-[6vw] max-w-20 max-h-20 rounded-full bg-primary-300/20 blur-md"></div>
            <motion.div 
              className="absolute top-[70%] right-[25%] w-[5vw] h-[5vw] max-w-16 max-h-16 rounded-full bg-primary-200/30"
              animate={{ 
                x: [0, 30, 0], 
                filter: ['blur(5px)', 'blur(8px)', 'blur(5px)'],
              }}
              transition={{ repeat: Infinity, duration: 15, ease: "easeInOut" }}
            ></motion.div>
          </motion.div>

          {/* Depth layer 4 - Closest */}
          <motion.div 
            className="absolute inset-0" 
            style={{ 
              y: smoothY4,
              x: isMobile ? mouseXTransformMobile4 : mouseXTransform4,
              rotateZ: rotateZ4
            }}
          >
            <motion.div 
              className="absolute top-[15%] right-[40%] w-[3vw] h-[3vw] max-w-8 max-h-8 rounded-full bg-primary-400/30"
              animate={{ 
                y: [0, -15, 0], 
                filter: ['blur(2px)', 'blur(4px)', 'blur(2px)'],
              }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            ></motion.div>
            <motion.div 
              className="absolute bottom-[30%] left-[40%] w-[2vw] h-[2vw] max-w-6 max-h-6 rounded-full bg-primary-500/20"
              animate={{ 
                x: [0, 20, 0], 
                filter: ['blur(1px)', 'blur(3px)', 'blur(1px)'],
              }}
              transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
            ></motion.div>
          </motion.div>
          
          {/* Additional floating elements - Using static positions to prevent hydration errors */}
          <div>
            {STATIC_POSITIONS.slice(0, isMobile ? 5 : 10).map((position, i) => (
              <motion.div
                key={i}
                className="absolute w-[0.5vw] h-[0.5vw] max-w-2 max-h-2 rounded-full bg-primary-300/30"
                style={{
                  top: position.top,
                  left: position.left,
                  filter: 'blur(1px)'
                }}
                animate={{
                  y: [0, -10, 0],
                  x: [0, 10, 0],
                  opacity: [0.1, 0.3, 0.1]
                }}
                transition={{
                  duration: 3 + (i % 5),
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.5
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Content */}
      <div className="relative">{children}</div>
    </div>
  );
};

export default ParallaxBackground; 