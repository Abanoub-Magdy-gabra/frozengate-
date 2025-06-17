"use client";
import React, { useState, useEffect, useRef, forwardRef } from 'react';

const AnimateOnScroll = forwardRef(({ 
  children,
  animation = 'fade-up', // fade-up, fade-down, fade-left, fade-right, zoom-in, zoom-out, flip, rotate, bounce, none
  duration = 700,
  delay = 0,
  threshold = 0.1,
  once = true,
  easing = 'ease-out', // ease, ease-in, ease-out, ease-in-out, linear
  className = '',
  rootMargin = '0px',
  distance = 50 // Distance for translations (in pixels)
}, ref) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const innerRef = useRef(null);
  
  // Merge refs
  const setRefs = (element) => {
    innerRef.current = element;
    
    // Handle callback ref
    if (typeof ref === 'function') {
      ref(element);
    } 
    // Handle object ref
    else if (ref) {
      ref.current = element;
    }
  };

  // Generate transform style based on animation type
  const getTransformValue = () => {
    switch (animation) {
      case 'fade-up':
        return `translateY(${distance}px)`;
      case 'fade-down':
        return `translateY(-${distance}px)`;
      case 'fade-left':
        return `translateX(-${distance}px)`;
      case 'fade-right':
        return `translateX(${distance}px)`;
      case 'zoom-in':
        return 'scale(0.85)';
      case 'zoom-out':
        return 'scale(1.15)';
      case 'flip':
        return 'rotateY(90deg)';
      case 'rotate':
        return 'rotate(15deg)';
      case 'bounce':
        return 'translateY(20px)';
      default:
        return 'none';
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update state when intersection status changes
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) {
            setHasAnimated(true);
            observer.unobserve(entry.target);
          }
        } else if (!once && !hasAnimated) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin
      }
    );

    const currentRef = innerRef.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, once, hasAnimated, rootMargin]);

  // Apply special animation for bounce
  const getBounceStyle = () => {
    if (animation === 'bounce' && isVisible) {
      return {
        animation: `bounce 0.5s ${easing} ${delay}ms`,
        '@keyframes bounce': {
          '0%, 20%, 50%, 80%, 100%': {
            transform: 'translateY(0)'
          },
          '40%': {
            transform: 'translateY(-30px)'
          },
          '60%': {
            transform: 'translateY(-15px)'
          }
        }
      };
    }
    return {};
  };
  
  return (
    <div
      ref={setRefs}
      className={`${className} transition-all will-change-transform will-change-opacity`}
      style={{ 
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'none' : getTransformValue(),
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: easing,
        transitionProperty: 'opacity, transform',
        ...getBounceStyle()
      }}
    >
      {children}
    </div>
  );
});

AnimateOnScroll.displayName = 'AnimateOnScroll';

export default AnimateOnScroll; 