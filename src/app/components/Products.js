import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

// Styled Components
const Container = styled.div`
  max-width: 1000px;
  margin: ${props => props.$scrolled ? '70px auto' : '80px auto'};
  padding: ${props => props.$scrolled ? '0.75rem' : '1rem'};
  text-align: center;
  transition: all 0.3s ease-in-out;
  position: relative;
  z-index: 5;

  @media (min-width: 768px) {
    margin: ${props => props.$scrolled ? '100px auto' : '120px auto'};
    padding: ${props => props.$scrolled ? '1.5rem 1rem' : '2rem 1rem'};
  }
`;

const Title = styled(motion.h2)`
  font-family: 'Montserrat';
  font-size: ${props => props.$scrolled ? '22px' : '24px'};
  line-height: 1.4;
  font-weight: bold;
  margin-bottom: ${props => props.$scrolled ? '1.5rem' : '2rem'};
  text-align: center;
  transition: all 0.3s ease-in-out;
  position: relative;
  display: inline-block;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 50%;
    width: ${props => props.$scrolled ? '60px' : '80px'};
    height: 3px;
    background: var(--primary-500);
    transform: translateX(-50%);
    border-radius: 2px;
    transition: all 0.3s ease;
    box-shadow: 0 0 8px rgba(95, 180, 70, 0.3);
  }
  
  @media (min-width: 768px) {
    font-size: ${props => props.$scrolled ? '25px' : '28px'};
    text-align: center;
    margin-left: auto;
    margin-right: auto;
    position: relative;
    right: 0;
    
    &::after {
      left: 50%;
      width: ${props => props.$scrolled ? '80px' : '100px'};
    }
  }
  
  @media (min-width: 1024px) {
    font-size: ${props => props.$scrolled ? '30px' : '35px'};
    line-height: 48.76px;
    right: 0;
    
    &::after {
      left: 50%;
      width: ${props => props.$scrolled ? '100px' : '120px'};
    }
  }
`;

const CarouselContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${props => props.$scrolled ? '0 8px' : '0 10px'};
  text-align: center;
  transition: all 0.3s ease-in-out;
  margin-top: 2rem;
  margin-bottom: 2rem;
  min-height: ${props => props.$scrolled ? '280px' : '320px'};
  
  @media (min-width: 640px) {
    padding: ${props => props.$scrolled ? '0 20px' : '0 30px'};
    min-height: ${props => props.$scrolled ? '300px' : '340px'};
  }
  
  @media (min-width: 768px) {
    padding: ${props => props.$scrolled ? '0 40px' : '0 50px'};
    min-height: ${props => props.$scrolled ? '320px' : '360px'};
  }
`;

const NavigationButton = styled(motion.button)`
  position: relative;
  background-color: #5FB446;
  color: white;
  border-radius: 50%;
  width: ${props => props.$scrolled ? '2.2rem' : '2.5rem'};
  height: ${props => props.$scrolled ? '2.2rem' : '2.5rem'};
  cursor: pointer;
  margin: 0 0.5rem;
  border: none;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 20;
  box-shadow: 0 4px 8px rgba(95, 180, 70, 0.3);
  transition: all 0.3s ease-in-out;
  
  @media (min-width: 768px) {
    width: ${props => props.$scrolled ? '3.3rem' : '3rem'};
    height: ${props => props.$scrolled ? '2.7rem' : '3rem'};
    margin: 0 0.75rem;
  }
`;

const PrevButton = styled(NavigationButton)`
  left: 0;
`;

const NextButton = styled(NavigationButton)`
  right: 0;
`;

const ChevronLeftIcon = styled(ChevronLeft)`
  width: ${props => props.$scrolled ? '1.3rem' : '1.5rem'};
  height: ${props => props.$scrolled ? '1.3rem' : '1.5rem'};
  stroke-width: 2;
  transition: all 0.3s ease;
  
  @media (min-width: 768px) {
    width: ${props => props.$scrolled ? '1.8rem' : '2rem'};
    height: ${props => props.$scrolled ? '1.8rem' : '2rem'};
  }
`;

const ChevronRightIcon = styled(ChevronRight)`
  width: ${props => props.$scrolled ? '1.3rem' : '1.5rem'};
  height: ${props => props.$scrolled ? '1.3rem' : '1.5rem'};
  stroke-width: 2;
  transition: all 0.3s ease;
  
  @media (min-width: 768px) {
    width: ${props => props.$scrolled ? '1.8rem' : '2rem'};
    height: ${props => props.$scrolled ? '1.8rem' : '2rem'};
  }
`;

const SliderWrapper = styled.div`
  display: flex;
  gap: ${props => props.$scrolled ? '0.75rem' : '1rem'};
  justify-content: center;
  overflow: visible;
  width: 100%;
  max-width: ${props => props.$scrolled ? '750px' : '780px'};
  transition: all 0.3s ease;
  margin: 2rem auto;
  
  @media (min-width: 640px) {
    max-width: ${props => props.$scrolled ? '640px' : '660px'};
    gap: ${props => props.$scrolled ? '0.8rem' : '1rem'};
  }
  
  @media (min-width: 1024px) {
    max-width: ${props => props.$scrolled ? '870px' : '890px'};
    gap: ${props => props.$scrolled ? '0.8rem' : '1rem'};
  }
`;

const SliderContent = styled.div`
  display: flex;
  transition: transform 0.7s ease-in-out;
  transform: translateX(-${props => {
    // Calculate different widths based on screen size
    const baseWidth = 240;
    const gap = 24;
    return props.$activeIndex * (baseWidth + gap);
  }}px);
  position: relative;
  left: 16.1%;
`;

const ProductCard = styled(motion.div)`
  width: ${props => props.$scrolled ? 'clamp(12rem, 14vw, 16rem)' : 'clamp(14rem, 16vw, 18rem)'};
  height: ${props => props.$scrolled ? 'clamp(12rem, 14vw, 16rem)' : 'clamp(14rem, 16vw, 18rem)'};
  border-radius: clamp(24px, 3vw, 36px);
  padding: clamp(0.75rem, 2vw, 1rem);
  text-align: left;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  opacity: 100;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
  will-change: transform;
  transition: all 0.8s ease, box-shadow 1s ease;
  display: flex;
  align-items: flex-end;
  transform-origin: center bottom;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url(${props => props.$bgUrl});
    background-size: cover;
    background-position: center;
    transition: transform 1.5s cubic-bezier(0.33, 1, 0.68, 1);
    z-index: 0;
  }
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.1));
    opacity: 0;
    transition: opacity 1s ease;
    border-radius: inherit;
    z-index: 1;
  }
  
  &:hover::after {
    transform: scale(1.2);
  }
  
  &:hover {
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3), 0 0 20px rgba(95, 180, 70, 0.6);
  }
  
  /* Card edge highlight effect */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.1));
    opacity: 0;
    transition: opacity 1s ease;
    border-radius: inherit;
    z-index: 1;
  }
  
  /* Edge glow effect */
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url(${props => props.$bgUrl});
    background-size: cover;
    background-position: center;
    transition: transform 1.5s cubic-bezier(0.33, 1, 0.68, 1), filter 1.2s ease;
    z-index: 0;
  }
  
  &:hover::after {
    transform: scale(1.2);
    filter: brightness(1.1) contrast(1.1);
  }
  
  /* Top highlight/shine effect */
    &:before {
    content: '';
    position: absolute;
    top: -50%;
    left: -60%;
    width: 20%;
    height: 200%;
    background: rgba(255, 255, 255, 0.1);
    transform: rotate(30deg);
    transition: transform 1.5s ease;
    z-index: 3;
  }
  
  &:hover:before {
    transform: translate(500%, 0) rotate(30deg);
  }
  
  /* Bottom overlay for text legibility */
  &:after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.1), transparent);
    opacity: 0;
    transition: opacity 1s ease;
    border-radius: inherit;
    z-index: 2;
    pointer-events: none;
  }
  
  &:hover:after {
    opacity: 1;
  }
  
  @media (hover: hover) {
    &:hover:after {
      opacity: 1;
    }
  }
  
  @media (max-width: 768px) {
    &:after {
      opacity: 0.5;
    }
  }
  
  @media (max-width: 480px) {
    width: ${props => props.$scrolled ? 'clamp(10rem, 65vw, 14rem)' : 'clamp(12rem, 75vw, 16rem)'};
    height: ${props => props.$scrolled ? 'clamp(10rem, 65vw, 14rem)' : 'clamp(12rem, 75vw, 16rem)'};
    margin: 0 auto;
  }
`;

const ProductImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${props => props.$bgUrl});
  background-size: cover;
  background-position: center;
  transition: transform 1.5s cubic-bezier(0.33, 1, 0.68, 1), filter 1.2s ease;
  z-index: 0;

  ${ProductCard}:hover & {
    transform: scale(1.2);
    filter: brightness(1.1) contrast(1.1);
  }
`;

const ProductOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.1), transparent);
  opacity: 0;
  transition: opacity 1s ease;
  border-radius: inherit;
  z-index: 2;
  pointer-events: none;

  ${ProductCard}:hover & {
    opacity: 1;
  }

  @media (max-width: 768px) {
    opacity: 0.5;
  }
`;

const ShineEffect = styled.div`
  position: absolute;
  top: -50%;
  left: -60%;
  width: 20%;
  height: 200%;
  background: rgba(255, 255, 255, 0.1);
  transform: rotate(30deg);
  transition: transform 1.5s ease;
  z-index: 3;

  ${ProductCard}:hover & {
    transform: translate(500%, 0) rotate(30deg);
  }
`;

const ProductInfo = styled(motion.div)`
  position: absolute;
  font-family: 'Montserrat';
  font-weight: normal;
  inset: 0;
  padding: ${props => props.$scrolled ? '1.2rem' : '1.5rem'};
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  z-index: 4;
  transition: all 0.5s ease, transform 0.8s ease;
  transform: translateY(${props => props.$isHovering ? '-10px' : '0'});
`;

const ProductName = styled.h3`
  font-size: ${props => props.$scrolled ? '1.1rem' : '1.25rem'};
  font-weight: 600;
  margin-bottom: 0.5rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  transition: all 0.5s ease, transform 0.8s ease;
  position: relative;
  display: inline-block;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0;
    height: 2px;
    background-color: #5FB446;
    box-shadow: 0 0 8px rgba(95, 180, 70, 0.7);
    transition: width 0.8s ease;
  }
  
  ${ProductCard}:hover & {
    transform: translateY(-5px);
    
    &::after {
      width: 100%;
    }
  }
  
  @media (min-width: 768px) {
    font-size: ${props => props.$scrolled ? '1.3rem' : '1.5rem'};
  }
`;

const PaginationDots = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${props => props.$scrolled ? '1.5rem' : '2rem'};
  gap: 0.5rem;
  transition: all 0.3s ease;
`;

const ButtonContainer = styled.div`
  position: relative;
  margin-top: ${props => props.$scrolled ? '20px' : '30px'};
  width: 100%;
  display: flex;
  justify-content: center;
  transition: all 0.3s ease;
  
  @media (min-width: 768px) {
    margin-top: ${props => props.$scrolled ? '40px' : '50px'};
  }
`;

const Link = styled(motion.a)`
  font-family: "Montserrat";
  background-color: #5FB446;
  color: white;
  padding: ${props => props.$scrolled ? '0.75rem 1.75rem' : '0.875rem 2rem'};
  border-radius: 9999px;
  font-size: ${props => props.$scrolled ? '14px' : '15px'};
  font-weight: 500;
  text-decoration: none;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: fit-content;
  margin: 0 auto;
  box-shadow: 0 4px 10px rgba(95, 180, 70, 0.3);
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;

  @media (min-width: 640px) {
    padding: ${props => props.$scrolled ? '0.9rem 2.2rem' : '1rem 2.5rem'};
    font-size: ${props => props.$scrolled ? '15px' : '16px'};
  }
`;

const SectionBackground = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, 
    rgba(255, 255, 255, 0.7), 
    rgba(95, 180, 70, 0.03), 
    rgba(255, 255, 255, 0.7)
  );
  opacity: 0.7;
  z-index: -1;
  pointer-events: none;
  padding: 3rem 0;
  margin-top: -3rem;
`;

const ProductsSection = () => {
  const products = [
    { name: 'Strawberry', bgUrl: '/images/Component1.png' },
    { name: 'Artichoke', bgUrl: '/images/Component2.png' },
    { name: 'Broccoli', bgUrl: '/images/Component4.png' },
    { name: 'Mango', bgUrl: '/images/Component32.png' }
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const totalSlides = products.length;
  const [hoveringIndex, setHoveringIndex] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [direction, setDirection] = useState(1); // 1 for right, -1 for left
  const [scrolled, setScrolled] = useState(false);
  const sectionRef = useRef(null);

  // Animation variants
  const cardVariants = {
    enter: (custom) => ({
      scale: 0.9,
      opacity: 0,
      x: custom.direction > 0 ? 100 : -100,
      y: 0
    }),
    center: (custom) => ({
      scale: custom.isActive ? (scrolled ? 1.05 : 1.1) : 1,
      opacity: 1,
      x: 0,
      y: custom.isActive ? (scrolled ? -10 : -15) : 0,
      zIndex: custom.isActive ? 10 : 1,
      boxShadow: custom.isActive 
        ? (scrolled ? '0 10px 25px rgba(0, 0, 0, 0.18)' : '0 15px 30px rgba(0, 0, 0, 0.2)') 
        : '0 4px 6px rgba(0, 0, 0, 0.1)',
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    }),
    exit: (custom) => ({
      scale: 0.9,
      opacity: 0,
      x: custom.direction > 0 ? -100 : 100,
      y: 0
    }),
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.1,
      backgroundColor: '#4a9037',
      boxShadow: '0 6px 12px rgba(95, 180, 70, 0.4)',
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: { scale: 0.95 }
  };

  const linkVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.05, 
      y: -3,
      backgroundColor: '#4a9037',
      boxShadow: '0 6px 15px rgba(95, 180, 70, 0.4)',
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: { 
      scale: 0.98,
      y: -1
    }
  };

  // Check if viewport is mobile
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  // Add scroll listener effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 100;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // Initial check
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  // Auto-slide functionality
  useEffect(() => {
    if (isHovering) return; // Pause auto-sliding when user is hovering
    
    const interval = setInterval(() => {
      handleNext();
    }, 9000);
    
    return () => clearInterval(interval);
  }, [activeIndex, isHovering]);

  const handleNext = () => {
    setDirection(1);
    setActiveIndex((prevIndex) => (prevIndex + 1) % totalSlides);
  };

  const handlePrev = () => {
    setDirection(-1);
    setActiveIndex((prevIndex) => (prevIndex - 1 + totalSlides) % totalSlides);
  };

  // Handle dot click for direct navigation
  const handleDotClick = (index) => {
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  };

  return (
    <div className="relative mt-12 pt-8 pb-12" ref={sectionRef}>
      <SectionBackground />
    <Container
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
        $scrolled={scrolled}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
          <Title $scrolled={scrolled}>Our Products</Title>
      </motion.div>
      
        <CarouselContainer $scrolled={scrolled}>
        <PrevButton
          onClick={handlePrev}
          aria-label="Previous product"
          variants={buttonVariants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
            $scrolled={scrolled}
        >
            <ChevronLeftIcon $scrolled={scrolled} />
        </PrevButton>
        
          <SliderWrapper $scrolled={scrolled}>
          <AnimatePresence mode="wait" initial={false} custom={{ direction }}>
            <motion.div
              key={activeIndex}
              custom={{ direction }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              style={{
                position: 'relative',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                  alignItems: 'center',
                  gap: scrolled ? '0.8rem' : '1rem',
                  minHeight: scrolled ? '260px' : '300px',
                  margin: '1rem 0'
              }}
            >
              {products.map((product, index) => {
                // Calculate relative position
                let position = (index - activeIndex) % totalSlides;
                if (position < 0) position += totalSlides;
                
                // Only render visible cards for performance (current, prev, next)
                const isVisible = position === 0 || position === 1 || position === totalSlides - 1;
                  const isCardHovering = hoveringIndex === index;
                
                return isVisible && (
                  <ProductCard
                    key={`product-${index}`}
                    custom={{ 
                      direction, 
                      isActive: index === activeIndex,
                      position
                    }}
                    variants={cardVariants}
                    initial="enter"
                    animate="center"
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 25,
                      delay: position * 0.1
                    }}
                    whileHover={{ 
                        scale: index === activeIndex ? (scrolled ? 1.07 : 1.1) : (scrolled ? 1.02 : 1.04),
                        y: index === activeIndex ? (scrolled ? -10 : -15) : (scrolled ? -5 : -8),
                        transition: { duration: 1, ease: [0.33, 1, 0.68, 1] }
                    }}
                    onMouseEnter={() => setHoveringIndex(index)}
                    onMouseLeave={() => setHoveringIndex(null)}
                    $bgUrl={product.bgUrl}
                      $scrolled={scrolled}
                    style={{
                      originX: index === activeIndex ? 0.5 : (index > activeIndex ? 0.3 : 0.7),
                      originY: 0.5,
                    }}
                  >
                      <ProductImage $bgUrl={product.bgUrl} />
                      <ProductOverlay />
                      <ShineEffect />
                      
                    <ProductInfo
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.3 }}
                        $scrolled={scrolled}
                        $isHovering={isCardHovering}
                    >
                        <ProductName $scrolled={scrolled}>{product.name}</ProductName>
                    </ProductInfo>
                  </ProductCard>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </SliderWrapper>
        
        <NextButton
          onClick={handleNext}
          aria-label="Next product"
          variants={buttonVariants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
            $scrolled={scrolled}
        >
            <ChevronRightIcon $scrolled={scrolled} />
        </NextButton>
      </CarouselContainer>
      
        <PaginationDots $scrolled={scrolled}>
        {products.map((_, index) => (
          <motion.button 
            key={`dot-${index}`}
            initial={{ scale: 1 }}
            animate={{ 
              scale: activeIndex % totalSlides === index ? [1, 1.2, 1] : 1,
                width: activeIndex % totalSlides === index ? (scrolled ? '1.75rem' : '2rem') : '0.75rem',
              backgroundColor: activeIndex % totalSlides === index ? '#5FB446' : '#d1d5db',
              boxShadow: activeIndex % totalSlides === index ? '0 2px 4px rgba(95, 180, 70, 0.3)' : 'none'
            }}
            transition={{ duration: 0.3 }}
            whileHover={{ 
              scale: activeIndex % totalSlides === index ? 1 : 1.2,
              backgroundColor: activeIndex % totalSlides === index ? '#5FB446' : '#a3a3a3'
            }}
            onClick={() => handleDotClick(index)}
            aria-label={`Go to product ${index + 1}`}
            style={{
                height: scrolled ? '0.65rem' : '0.75rem',
              borderRadius: '9999px',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
            }}
          />
        ))}
      </PaginationDots>
      
        <ButtonContainer $scrolled={scrolled}>
        <Link 
          href="/ProductsPage"
          variants={linkVariants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
            $scrolled={scrolled}
        >
          <span>Discover more</span>
          <motion.span
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(45deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.2) 100%)',
              borderRadius: 'inherit'
            }}
            initial={{ x: '-100%' }}
            whileHover={{ x: '100%' }}
            transition={{ duration: 0.8 }}
          />
        </Link>
      </ButtonContainer>
    </Container>
    </div>
  );
};

export default ProductsSection;