"use client";
import React, { useState, useEffect, useRef } from 'react';

const AnimatedSection = ({ 
  children, 
  animation = 'fade-up', // 'fade-up', 'fade-down', 'fade-left', 'fade-right', 'zoom-in', 'zoom-out', 'parallax'
  delay = 0,
  duration = 800,
  threshold = 0.1,
  className = '',
  once = true,
  parallaxSpeed = 0.1, // Speed for parallax effect (0-1)
  staggerChildren = false, // Enable staggered animation for children
  staggerDelay = 100, // Delay between each child animation in ms
  animateFrom = 0, // Starting progress of animation (0-1)
  backdropFilter = false, // Add blur effect on entrance
  intensity = 1 // Animation intensity multiplier
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const sectionRef = useRef(null);

  // Handle scroll position for parallax
  useEffect(() => {
    if (animation === 'parallax') {
      const handleScroll = () => {
        setScrollY(window.scrollY);
      };
      
      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [animation]);

  useEffect(() => {
    const section = sectionRef.current;
    
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: threshold
    };

    const handleIntersect = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once && observer) {
            observer.unobserve(section);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (observer && section) {
        observer.unobserve(section);
      }
    };
  }, [threshold, once]);

  // Return parallax style if parallax animation is selected
  const getParallaxStyle = () => {
    if (animation === 'parallax' && sectionRef.current) {
      const rect = sectionRef.current.getBoundingClientRect();
      const offsetY = (rect.top - window.innerHeight) * parallaxSpeed;
      
      return {
        transform: `translateY(${offsetY}px)`,
        transition: 'transform 0.1s ease-out'
      };
    }
    return {};
  };

  // Define animation styles based on the animation prop
  const getAnimationStyles = () => {
    const transformDistance = 30 * intensity;
    const baseStyles = {
      opacity: isVisible ? 1 : animateFrom,
      transition: `opacity ${duration}ms, transform ${duration}ms, filter ${duration}ms`,
      transitionDelay: `${delay}ms`,
      transitionTimingFunction: 'cubic-bezier(0.25, 0.1, 0.25, 1.0)',
      filter: backdropFilter && !isVisible ? 'blur(5px)' : 'blur(0px)',
      willChange: 'opacity, transform'
    };
    
    let transform = 'none';
    
    if (!isVisible) {
      switch (animation) {
        case 'fade-up':
          transform = `translateY(${transformDistance}px)`;
          break;
        case 'fade-down':
          transform = `translateY(-${transformDistance}px)`;
          break;
        case 'fade-left':
          transform = `translateX(${transformDistance}px)`;
          break;
        case 'fade-right':
          transform = `translateX(-${transformDistance}px)`;
          break;
        case 'zoom-in':
          transform = `scale(${1 - (0.1 * intensity)})`;
          break;
        case 'zoom-out':
          transform = `scale(${1 + (0.1 * intensity)})`;
          break;
        default:
          break;
      }
    }
    
    return {
      ...baseStyles,
      transform: isVisible ? 'none' : transform
    };
  };

  // Add staggered animation to children if enabled
  const getStaggeredChildren = () => {
    if (!staggerChildren || !children) return children;
    
    return React.Children.map(children, (child, index) => {
      if (!React.isValidElement(child)) return child;
      
      return React.cloneElement(child, {
        style: {
          ...child.props.style,
          transitionDelay: `${delay + (index * staggerDelay)}ms`
        },
        className: `${child.props.className || ''} 
          transition-all duration-${duration} 
          ${!isVisible ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`
      });
    });
  };

  return (
    <div
      ref={sectionRef}
      className={`${className}`}
      style={{ 
        ...getAnimationStyles(),
        ...getParallaxStyle()
      }}
    >
      {staggerChildren ? getStaggeredChildren() : children}
    </div>
  );
};

export default AnimatedSection; 