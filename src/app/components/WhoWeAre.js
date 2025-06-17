"use client";
import React, { useState, useEffect, useRef } from 'react';
import "@fontsource/montserrat"; // Defaults to weight 400
import "@fontsource/montserrat/400.css"; // Specify weight
import "@fontsource/montserrat/500.css"; // Specify weight
import "@fontsource/montserrat/600.css"; // Specify weight
import "@fontsource/montserrat/700.css"; // Specify weight
import "@fontsource/montserrat/900.css"; // Specify weight
import "@fontsource/montserrat/400-italic.css"; 
import styled from 'styled-components';
import AnimateOnScroll from './AnimateOnScroll';

const Link = styled.a`
  font-family: "Montserrat";
  position: relative;
  overflow: hidden;
  
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 0.1em;
    background-color: white;
    opacity: 0;
    transition: opacity 300ms, transform 300ms;
    transform: translate3d(-100%, 0, 0);
  }
  
  &:hover:after {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`;


// Add a container for better large screen display
const SectionContainer = styled.div`
  width: 100%;
  max-width: 1920px;
  margin: 0 auto;
  position: relative;
  transition: all 0.4s ease-in-out;
  
  @media (min-width: 1921px) {
    max-width: 1800px;
    padding: clamp(4rem, 8vw, 6rem) clamp(2rem, 12%, 15rem);
  }
`;

const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  justify-content: center;
  transition: all 0.3s ease;
  
  @media (min-width: 768px) {
    grid-template-columns: 1fr 2fr;
    gap: 2rem;
  }
  
  @media (min-width: 1024px) {
    gap: clamp(2rem, 4vw + 1rem, 4rem);
  }
  
  @media (min-width: 1440px) {
    gap: clamp(3rem, 5vw + 1rem, 5rem);
  }
  
  @media (min-width: 1921px) {
    grid-template-columns: 0.8fr 2.2fr;
    gap: clamp(4rem, 6vw, 6rem);
  }
`;

const Heading = styled.h2`
  font-family: 'Montserrat';
  font-weight: 700;
  font-size: 22px;
  line-height: 1.5;
  position: relative;
  transition: all 0.3s ease;
  
  @media (min-width: 768px) {
    font-size: 25px;
  }
  
  @media (min-width: 1440px) {
    font-size: 28px;
  }
  
  @media (min-width: 1921px) {
    font-size: 32px;
  }
`;

const Subheading = styled.h3`
  font-family: 'Montserrat';
  font-weight: 700;
  font-size: 14px;
  line-height: 1.5;
  transition: all 0.3s ease;
  
  @media (min-width: 768px) {
    font-size: 15px;
  }
  
  @media (min-width: 1440px) {
    font-size: 17px;
  }
  
  @media (min-width: 1921px) {
    font-size: 18px;
  }
`;

const PrimarySubheading = styled(Subheading)`
  color: var(--primary-500);
`;

const Paragraph = styled.p`
  font-family: 'Montserrat';
  font-size: 12px;
  line-height: 1.5;
  position: relative;
  transition: all 0.3s ease;
  
  @media (min-width: 768px) {
    font-size: 13px;
  }
  
  @media (min-width: 1440px) {
    font-size: 14px;
  }
  
  @media (min-width: 1921px) {
    font-size: 16px;
  }
`;

const ReadMoreButton = styled.div`
  display: inline-block;
  background-color: var(--primary-500);
  border-radius: 55px;
  transition: all 0.3s ease;
  transform: scale(1);
  
  &:hover {
    background-color: var(--primary-600);
    transform: scale(1.05);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }
  
  @media (min-width: 1440px) {
    padding: 12px 24px;
  }
  
  @media (min-width: 1921px) {
    padding: 14px 30px;
  }
`;

const SectionBackground = styled.div`
  position: absolute;
  inset: 0;
  background: ${props => props.$scrolled 
    ? 'linear-gradient(to bottom, white, rgba(95, 180, 70, 0.05), white)'
    : 'linear-gradient(to bottom, white, rgba(95, 180, 70, 0.12), white)'};
  opacity: ${props => props.$scrolled ? '0.35' : '0.4'};
  z-index: -10;
  transition: all 0.4s ease-in-out;
`;

const SectionWrapper = styled.div`
  min-height: ${props => props.$scrolled ? '60vh' : '80vh'};
  padding: ${props => props.$scrolled 
    ? 'clamp(1.5rem, 5vw, 3rem) 0'
    : 'clamp(2.5rem, 7vw, 6rem) 0'};
  transition: all 0.5s ease-in-out;
  
  @media (max-width: 768px) {
    min-height: ${props => props.$scrolled ? '70vh' : '85vh'};
  }
`;

const WhoWeAreSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [highlightVisible, setHighlightVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const sectionRef = useRef(null);
  const highlightRef = useRef(null);

  useEffect(() => {
    setIsVisible(true);
    
    const timer = setTimeout(() => {
      setHighlightVisible(true);
    }, 1200);
    
    const observerOptions = {
      threshold: 0.5,
      rootMargin: '0px'
    };
    
    const highlightObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setHighlightVisible(true);
          highlightObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    if (highlightRef.current) {
      highlightObserver.observe(highlightRef.current);
    }
    
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      clearTimeout(timer);
      if (highlightRef.current) {
        highlightObserver.unobserve(highlightRef.current);
      }
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <SectionWrapper
      ref={sectionRef}
      $scrolled={scrolled}
      className="px-4 md:px-8 lg:px-[10%] xl:px-[12%] 2xl:px-[15%] relative"
    >
      {/* Background gradient effect */}
      <SectionBackground $scrolled={scrolled} />
      
      <SectionContainer>
        <ContentWrapper>
          {/* Left Column */}
          <AnimateOnScroll
            animation="fade-right"
            duration={800}
            className={`text-center mb-8 md:mb-0 flex flex-col items-center`}
          >
            <Heading 
              ref={highlightRef}
              className="text-black relative"
            >
              Who we are?
             
            </Heading>
            {/* Only show this on medium screens and above */}
            <ReadMoreButton className="hidden md:inline-block w-[55%] mt-[40%] lg:mt-[70%] xl:mt-[60%] 2xl:mt-[50%] px-[10px] py-[10px] group">
              <Link href="#" className="text-white no-underline text-xs md:text-xs lg:text-sm xl:text-sm 2xl:text-base font-medium font-montserrat block text-center">
                Read more
                <span className="inline-block ml-1 transform group-hover:translate-x-1 transition-transform duration-300">→</span>
              </Link>
            </ReadMoreButton>
          </AnimateOnScroll>
          
          {/* Right Column */}
          <AnimateOnScroll
            animation="fade-left"
            duration={800}
            delay={200}
          >
            <AnimateOnScroll
              animation="fade-up"
              duration={600}
              delay={400}
            >
              <Subheading className="text-black max-w-full">
                Frozen Gate is a manufacturer of IQF Frozen Fruits & Vegetables.<br className="hidden md:block" />
                100% of our products are exported worldwide.
              </Subheading>
            </AnimateOnScroll>
            <br />
            
            <AnimateOnScroll
              animation="fade-up"
              duration={600}
              delay={600}
            >
              <PrimarySubheading className="max-w-full">
                We have more than 30 years of experience in the production and<br className="hidden md:block" />
                exporting of frozen fruits and vegetables.
              </PrimarySubheading>
            </AnimateOnScroll>
            <br />
            
            <AnimateOnScroll
              animation="fade-up"
              duration={600}
              delay={800}
            >
              <Paragraph className="relative">
                <span className="md:ml-3">
                  Frozen Gate is a leading factory specializing in the production and distribution of
                  <span className="hidden md:inline"><br /></span> premium frozen fruits and vegetables. With a commitment to excellence, we
                  <span className="hidden md:inline"><br /></span> have become a trusted name in the industry, delivering top-notch products to
                  <span className="hidden md:inline"><br /></span> customers in England, Russia, Germany, and across Europe.
                  <br /><br />
                  At Frozen Gate, we understand the importance of maintaining the nutritional
                  <span className="hidden md:inline"><br /></span> value, freshness, and flavor of fruits and vegetables. That's why we employ state-
                  <span className="hidden md:inline"><br /></span> of-the-art freezing techniques and adhere to stringent quality control measures
                  <span className="hidden md:inline"><br /></span> throughout our production process. From sourcing the finest raw materials to
                  <span className="hidden md:inline"><br /></span> packaging and distribution, every step is meticulously executed to ensure our
                  <span className="hidden md:inline"><br /></span> customers receive the highest quality products.
                </span>
              </Paragraph>
            </AnimateOnScroll>
            
            {/* Only show this on small screens */}
            <div className="flex md:hidden justify-center mt-6">
              <ReadMoreButton className="inline-block px-[20px] py-[10px] w-auto group">
                <Link href="#" className="text-white no-underline text-xs font-medium font-montserrat">
                  Read more
                  <span className="inline-block ml-1 transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                </Link>
              </ReadMoreButton>
            </div>
          </AnimateOnScroll>
        </ContentWrapper>
      </SectionContainer>
    </SectionWrapper>
  );
};
 
export default WhoWeAreSection;