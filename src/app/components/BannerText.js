import React, { useState, useEffect, useRef } from "react";
import "@fontsource/montserrat"; // Defaults to weight 400
import "@fontsource/montserrat/400.css"; // Specify weight
import "@fontsource/montserrat/400-italic.css";
import styled from "styled-components";

// Styled Components with standardized layout patterns
const Container = styled.div`
  width: 100%;
  max-width: 100%;
  overflow: hidden;
  padding: 1rem;
  position: relative;
  z-index: 10;
  
  @media (min-width: 640px) {
    padding: 1.5rem;
  }
  
  @media (min-width: 768px) {
    padding: 2rem;
  }
  
  @media (min-width: 1440px) {
    padding: 2.5rem;
    max-width: 1400px;
    margin: 0 auto;
  }
  
  @media (min-width: 1921px) {
    padding: 3rem;
    max-width: 1800px;
  }
`;

const Paragraph = styled.p`
  font-family: "Montserrat", sans-serif;
  color: black;
  font-weight: normal;
  margin-bottom: 0.5rem;
  font-size: 0.5rem;
  position: relative;
  
  @media (min-width: 640px) {
    font-size: 9px;
  }
  
  @media (min-width: 768px) {
    font-size: 0.75rem;
    margin-bottom: 0.4rem;
  }
  
  @media (min-width: 1024px) {
    font-size: 1rem;
  }
  
  @media (min-width: 1440px) {
    font-size: 1.1rem;
    margin-bottom: 0.6rem;
  }
  
  @media (min-width: 1921px) {
    font-size: 1.25rem;
    margin-bottom: 0.8rem;
  }
`;

// Wrapper for heading and button - standardized layout pattern
const HeadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  
  @media (min-width: 1440px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    flex-wrap: nowrap;
  }
  
  @media (max-width: 1439px) and (min-width: 768px) {
    gap: 2rem;
  }
  
  @media (max-width: 767px) {
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
  }
`;

const Heading = styled.h1`
  font-family: "Montserrat", sans-serif;
  font-weight: bold;
  font-size: 30px;
  line-height: 1.1;
  letter-spacing: normal;
  margin-bottom: 1rem;
  position: relative;
  overflow: hidden;
  color: #000;
  
  @media (min-width: 640px) {
    font-size: 30px;
  }
  
  @media (min-width: 768px) {
    font-size: 45px;
  }
  
  @media (min-width: 1024px) {
    font-size: 65px;
  }
  
  @media (min-width: 1440px) {
    font-size: 75px;
    line-height: 1.05;
    margin-bottom: 0;
    margin-right: 2rem;
    flex: 1;
  }
  
  @media (min-width: 1921px) {
    font-size: 85px;
    margin-right: 3rem;
  }
  
  @media (max-width: 767px) {
    margin-bottom: 0.5rem;
    margin-right: 1rem;
  }
`;

// Standardized button style to match global pattern
const ButtonContainer = styled.div`
  background-color: var(--primary);
  border-radius: 55px;
  text-align: center;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  position: relative;
  cursor: pointer;
  
  &:hover {
    background-color: var(--primary-dark);
    transform: translateY(-3px);
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
  }
  
  &:active {
    transform: translateY(-1px);
  }
  
  &:focus-visible {
    outline: 2px solid var(--primary-dark);
    outline-offset: 2px;
  }
  
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.1);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s ease;
  }
  
  &:hover:after {
    transform: scaleX(1);
  }
  
  /* Mobile */
  @media (max-width: 767px) {
    align-self: flex-start;
    padding: 5px 15px;
  }
  
  /* Tablet */
  @media (min-width: 768px) and (max-width: 1023px) {
    padding: 8px 25px;
  }
  
  /* Desktop */
  @media (min-width: 1024px) and (max-width: 1439px) {
    padding: 10px 40px;
  }
  
  /* Large Desktop */
  @media (min-width: 1440px) {
    padding: 12px 45px;
    align-self: center;
  }
  
  /* Extra Large Desktop */
  @media (min-width: 1921px) {
    padding: 15px 50px;
    border-radius: 60px;
  }
`;

const StyledLink = styled.a`
  font-family: "Montserrat", sans-serif;
  color: white;
  text-decoration: none;
  font-weight: 500;
  white-space: nowrap;
  display: flex;
  align-items: center;
  transition: all 0.3s ease;
  
  /* Mobile */
  @media (max-width: 639px) {
    font-size: 0.5rem;
  }
  
  /* Small tablet */
  @media (min-width: 640px) and (max-width: 767px) {
    font-size: 0.65rem;
  }
  
  /* Tablet */
  @media (min-width: 768px) and (max-width: 1023px) {
    font-size: 0.75rem;
  }
  
  /* Desktop */
  @media (min-width: 1024px) and (max-width: 1439px) {
    font-size: 0.875rem;
  }
  
  /* Large Desktop */
  @media (min-width: 1440px) {
    font-size: 1rem;
  }
  
  /* Extra Large Desktop */
  @media (min-width: 1921px) {
    font-size: 1.15rem;
  }
`;

// Standardized highlight text style
const HighlightText = styled.span`
  color: var(--primary);
  font-weight: bold;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    width: 100%;
    height: 2px;
    background-color: var(--primary);
    bottom: -2px;
    left: 0;
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 0.6s cubic-bezier(0.19, 1, 0.22, 1);
  }
  
  &.animate:after {
    transform: scaleX(1);
    transform-origin: left;
  }
  
  @media (min-width: 1440px) {
    &:after {
      height: 3px;
      bottom: -3px;
    }
  }
  
  @media (min-width: 1921px) {
    &:after {
      height: 4px;
      bottom: -4px;
    }
  }
`;

// Standardized animation components
const TextAnimation = styled.div`
  display: inline-block;
  opacity: ${props => props.visible === "true" ? 1 : 0};
  transform: ${props => props.visible === "true" ? 'translateY(0)' : 'translateY(20px)'};
  transition: opacity 0.7s ease, transform 0.7s cubic-bezier(0.19, 1, 0.22, 1);
  transition-delay: ${props => props.delay}ms;
  
  @media (min-width: 1440px) {
    transition: opacity 0.9s ease, transform 0.9s cubic-bezier(0.19, 1, 0.22, 1);
  }
`;

const AnimatedChar = styled.span`
  display: inline-block;
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.6s cubic-bezier(0.19, 1, 0.22, 1) forwards;
  animation-delay: ${props => props.delay}ms;
  
  @keyframes fadeInUp {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @media (min-width: 1440px) {
    animation: fadeInUpLarge 0.7s cubic-bezier(0.19, 1, 0.22, 1) forwards;
    animation-delay: ${props => props.delay}ms;
    transform: translateY(25px);
  }
  
  @media (min-width: 1921px) {
    animation: fadeInUpLarge 0.8s cubic-bezier(0.19, 1, 0.22, 1) forwards;
    animation-delay: ${props => props.delay}ms;
    transform: translateY(30px);
  }
  
  @keyframes fadeInUpLarge {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

// Standardized background effect
const ParticleContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: -1;
  pointer-events: none;
`;

const Particle = styled.div`
  position: absolute;
  background-color: var(--primary);
  border-radius: 50%;
  opacity: 0.1;
  transform: translate(-50%, -50%);
  animation: float 3s infinite ease-in-out;
  
  @keyframes float {
    0%, 100% {
      transform: translate(calc(-50% + 5px), calc(-50% + 5px));
    }
    50% {
      transform: translate(calc(-50% - 5px), calc(-50% - 5px));
    }
  }
  
  @media (min-width: 1440px) {
    @keyframes float {
      0%, 100% {
        transform: translate(calc(-50% + 8px), calc(-50% + 8px));
      }
      50% {
        transform: translate(calc(-50% - 8px), calc(-50% - 8px));
      }
    }
  }
`;

// Arrow icon as SVG for better consistency and accessibility
const ArrowIcon = () => (
  <svg 
    width="16" 
    height="16" 
    viewBox="0 0 16 16" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className="inline-block ml-2 transform group-hover:translate-x-1 transition-transform duration-300"
    aria-hidden="true"
  >
    <path 
      d="M8 1L15 8L8 15" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M1 8H15" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

const BannerText = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [charAnimation, setCharAnimation] = useState(false);
  const [highlightAnimation, setHighlightAnimation] = useState(false);
  const containerRef = useRef(null);
  const particlesRef = useRef([]);

  // Split text into characters for animation
  const splitTextIntoChars = (text) => {
    return text.split('').map((char, index) => (
      <AnimatedChar 
        key={index} 
        delay={700 + (index * 30)}
      >
        {char === ' ' ? '\u00A0' : char}
      </AnimatedChar>
    ));
  };

  // Create particles for background effect with improved performance
  useEffect(() => {
    setIsVisible(true);
    
    setTimeout(() => {
      setCharAnimation(true);
    }, 300);
    
    setTimeout(() => {
      setHighlightAnimation(true);
    }, 1200);

    // Only run particle creation on client-side
    if (typeof document !== 'undefined' && containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      
      // Clear previous particles
      particlesRef.current.forEach(particle => {
        if (particle && particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      });
      
      particlesRef.current = [];
      
      // Create new particles with optimized count for performance
      const isLargeScreen = window.innerWidth >= 1440;
      const particleCount = isLargeScreen ? 15 : 10;
      const particleContainer = document.createElement('div');
      particleContainer.className = 'particle-container';
      particleContainer.style.position = 'absolute';
      particleContainer.style.top = '0';
      particleContainer.style.left = '0';
      particleContainer.style.width = '100%';
      particleContainer.style.height = '100%';
      particleContainer.style.overflow = 'hidden';
      particleContainer.style.zIndex = '-1';
      particleContainer.style.pointerEvents = 'none';
      
      containerRef.current.appendChild(particleContainer);
      
      for (let i = 0; i < particleCount; i++) {
        const size = Math.random() * (isLargeScreen ? 25 : 15) + 5;
        const x = Math.random() * containerRect.width;
        const y = Math.random() * containerRect.height;
        const opacity = Math.random() * 0.1 + 0.05;
        const animationDuration = Math.random() * 20 + 10;
        
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.position = 'absolute';
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.borderRadius = '50%';
        particle.style.backgroundColor = 'var(--primary)';
        particle.style.opacity = opacity.toString();
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        particle.style.animation = `float ${animationDuration}s infinite ease-in-out`;
        particle.style.willChange = 'transform';
        
        particleContainer.appendChild(particle);
        particlesRef.current.push(particle);
      }
    }
    
    return () => {
      // Clean up particles
      if (typeof document !== 'undefined') {
        particlesRef.current.forEach(particle => {
          if (particle && particle.parentNode) {
            particle.parentNode.removeChild(particle);
          }
        });
      }
    };
  }, []);

  return (
    <Container ref={containerRef}>
      <TextAnimation visible={isVisible ? "true" : "false"} delay={200}>
        <Paragraph>
          High quality & <HighlightText className={highlightAnimation ? 'animate' : ''}>premium</HighlightText> IQF products
        </Paragraph>
      </TextAnimation>
      
      <HeadingWrapper>
        <TextAnimation visible={isVisible ? "true" : "false"} delay={400}>
          <Heading>
            {charAnimation ? (
              <>
                {splitTextIntoChars('Frozen Fruits')}
                <br /> 
                {splitTextIntoChars('& Vegetables')}
              </>
            ) : (
              <>
                Frozen Fruits <br /> & Vegetables
              </>
            )}
          </Heading>
        </TextAnimation>
        
        <TextAnimation visible={isVisible ? "true" : "false"} delay={700}>
          <ButtonContainer className="group" role="button" aria-label="Discover more about our products">
            <StyledLink href="#products" className="flex items-center">
              Discover more
              <ArrowIcon />
            </StyledLink>
          </ButtonContainer>
        </TextAnimation>
      </HeadingWrapper>
    </Container>
  );
};

export default BannerText;