"use client";
import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const PageTransition = ({ 
  children,
  type = 'fade', // fade, slide, zoom, flip
  duration = 300,
  direction = 'left', // left, right, up, down (for slide transitions)
  timing = 'ease-in-out' // ease, ease-in, ease-out, ease-in-out, linear
}) => {
  const [displayChildren, setDisplayChildren] = useState(children);
  const [transitionStage, setTransitionStage] = useState('fadeIn');
  const [prevPath, setPrevPath] = useState('');
  const location = useLocation();
  const nodeRef = useRef(null);

  // Keep track of the scroll position
  useEffect(() => {
    // Scroll to top on page change
    if (transitionStage === 'fadeIn' && prevPath !== location.pathname) {
      window.scrollTo(0, 0);
    }
  }, [transitionStage, prevPath, location.pathname]);

  useEffect(() => {
    // If the location changes, trigger transition
    const currentPath = children.props.location?.pathname;
    const storedPath = displayChildren.props.location?.pathname;
    
    if (currentPath !== storedPath) {
      setPrevPath(storedPath || '');
      setTransitionStage('fadeOut');
    }
  }, [location, children, displayChildren.props.location?.pathname]);

  useEffect(() => {
    if (children !== displayChildren && transitionStage === 'fadeOut') {
      const timeout = setTimeout(() => {
        setDisplayChildren(children);
        setTransitionStage('fadeIn');
      }, duration); 
      
      return () => clearTimeout(timeout);
    }
  }, [children, displayChildren, transitionStage, duration]);

  // Get the appropriate transition style based on the type prop
  const getTransitionStyles = () => {
    const baseStyle = {
      transition: `all ${duration}ms ${timing}`,
      minHeight: '100vh'
    };

    // Exit animations
    if (transitionStage === 'fadeOut') {
      switch (type) {
        case 'slide':
          return {
            ...baseStyle,
            transform: direction === 'left' ? 'translateX(-5%)' : 
                       direction === 'right' ? 'translateX(5%)' : 
                       direction === 'up' ? 'translateY(5%)' : 
                       'translateY(-5%)',
            opacity: 0
          };
        case 'zoom':
          return {
            ...baseStyle,
            transform: 'scale(0.95)',
            opacity: 0
          };
        case 'flip':
          return {
            ...baseStyle,
            transform: 'rotateY(90deg)',
            opacity: 0
          };
        case 'fade':
        default:
          return {
            ...baseStyle,
            opacity: 0
          };
      }
    }
    
    // Enter animations
    switch (type) {
      case 'slide':
        return {
          ...baseStyle,
          transform: 'translateX(0) translateY(0)',
          opacity: 1
        };
      case 'zoom':
        return {
          ...baseStyle,
          transform: 'scale(1)',
          opacity: 1
        };
      case 'flip':
        return {
          ...baseStyle,
          transform: 'rotateY(0)',
          opacity: 1
        };
      case 'fade':
      default:
        return {
          ...baseStyle,
          opacity: 1
        };
    }
  };

  return (
    <div
      ref={nodeRef}
      className="overflow-hidden perspective-1000"
      style={getTransitionStyles()}
    >
      {displayChildren}
    </div>
  );
};

export default PageTransition; 