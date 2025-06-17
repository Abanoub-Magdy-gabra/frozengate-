import React, { useState } from 'react';
import styled from 'styled-components';
import "@fontsource/montserrat"; // Defaults to weight 400
import "@fontsource/montserrat/400.css"; // Specify weight
import "@fontsource/montserrat/500.css"; // Specify weight
import "@fontsource/montserrat/600.css"; // Specify weight
import "@fontsource/montserrat/700.css"; // Specify weight
import "@fontsource/montserrat/900.css"; // Specify weight
import "@fontsource/montserrat/400-italic.css";

// Styled Components
const Section = styled.section`
  padding: 4.5rem 1rem;
  
  @media (min-width: 640px) {
    padding: 4.5rem 2rem;
  }
  
  @media (min-width: 768px) {
    padding: 5rem 3rem;
  }
`;

const Container = styled.div`
  max-width: 60rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  
  @media (min-width: 640px) {
    gap: 0.1rem;
  }
  
  @media (min-width: 768px) {
    flex-direction: row;
    gap: 1rem;
  }
`;

const ContentArea = styled.div`
  width: 100%;
  order: 2;
  position:relative;
  top:-40px;
  @media (min-width: 768px) {
    width: 60%;
    order: 1;
  }
  
  @media (min-width: 1024px) {
    width: 60%;
  }
`;

const Heading = styled.h2`
  font-family: "Montserrat", sans-serif;
  font-weight: 700;
  font-size: 1.25rem;
  line-height: 1.25;
  margin-bottom: 0.5rem;
  
  @media (min-width: 640px) {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
  
  @media (min-width: 768px) {
    font-size: 1.875rem;
    margin-bottom: 1rem;
  }
  
  @media (min-width: 1024px) {
    font-size: 2.25rem;
  }
`;

const Subheading = styled.p`
  font-family: "Montserrat", sans-serif;
  font-size: 0.5rem;
  line-height: 1.5;
  color: #5FB446;
  margin-bottom: 1rem;
  width:36rem;
  @media (min-width: 640px) {
    font-size: 1rem;
    margin-bottom: 1.5rem;
  }
  
  @media (min-width: 768px) {
    font-size: 1rem;
    margin-bottom: 2.5rem;
  }
  
  @media (min-width: 1024px) {
    font-size: 1.2rem;
  }
`;

const HiddenBreak = styled.br`
  display: none;
  
  @media (min-width: 768px) {
    display: block;
  }
`;

const Description = styled.p`
  font-family: "Montserrat", sans-serif;
  font-size: 0.5rem;
  line-height: 1.5;
  color: #1f2937;
  max-width:31rem;
  margin-top:150px;
  @media (min-width: 640px) {
    font-size: 0.756rem;
  }
`;

const ImageArea = styled.div`
  width:90%;
  position: relative;
  order: 1;
  margin-bottom: 1.5rem;
  
  @media (min-width: 640px) {
    width: 80%;
    margin: 0 auto;
  }
  
  @media (min-width: 768px) {
    width: 40%;
    margin: 0;
    order: 2;
    margin-bottom: 0;
  }
  
  @media (min-width: 1024px) {
    width: 40%;
  }
`;

const SliderContainer = styled.div`
  position: relative;
  width: 100%;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 90%;
  padding-bottom: 75%;
  
  @media (min-width: 640px) {
    padding-bottom: 80%;
  }
  
  @media (min-width: 768px) {
    padding-bottom: 100%;
  }
`;

const Image = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  margin: 0 0;
  border-radius: 0.5rem;
  transition: opacity 0.5s ease-in-out;
`;

const NavigationControls = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
  gap: 1rem;
`;

const NavButton = styled.button`
  background-color: #5FB446;
  color: white;
  border-radius: 9999px;
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s, color 0.3s;
  border: none;
  cursor: pointer;
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #5FB446;
  }
  
  &:hover {
    background-color: #eff4ed;
    color: #5FB446;
  }
  
  @media (min-width: 640px) {
    width: 3rem;
    height: 3rem;
  }
`;

const ButtonIcon = styled.svg`
  width: 1rem;
  height: 1rem;
  stroke-width: 2;
  fill: none;
  stroke: currentColor;
  
  @media (min-width: 640px) {
    width: 1.5rem;
    height: 1.5rem;
  }
`;

const SliderDots = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 0.75rem;
`;

// Fixed the Dot component to use the $isActive transient prop
const Dot = styled.button`
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 50%;
  background-color: ${props => props.$isActive ? '#5FB446' : '#e5e7eb'};
  margin: 0 0.25rem;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: ${props => props.$isActive ? '#5FB446' : '#d1d5db'};
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(95, 180, 70, 0.5);
  }
`;

const FactorySectionComponent = () => {
  // Sample images for the slider
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [
    { src: "/images/Rectangle 16.png", alt: "Factory production line with red produce" },
    { src: "/images/Rectangle 7.jpg", alt: "Factory packaging area" },
    { src: "/images/Rectangle 8.jpg", alt: "Quality control section" }
  ];

  const goToPrevious = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToIndex = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <Section>
      <Container>
        {/* Content Area */}
        <ContentArea>
          <Heading>
            Take a Look at our Factory
          </Heading>
          <Subheading>
            We have more than 30 years of experience in 
            <HiddenBreak /> the production and exporting of frozen 
            <HiddenBreak /> fruits and vegetables.
          </Subheading>
          <Description>
            Our factory processes and packages fresh produce. We play a crucial role in preserving the nutritional value and extending the shelf life of fruits and vegetables. We employ various techniques such as washing, sorting, cutting, and packaging to ensure the quality and safety of the final products. Our frozen factory utilizes advanced technologies and adheres to strict food safety standards to maintain freshness and minimize waste.
          </Description>
        </ContentArea>

        {/* Image Area */}
        <ImageArea>
          <SliderContainer>
            <ImageContainer>
              <Image 
                src={images[currentImageIndex].src} 
                alt={images[currentImageIndex].alt}
              />
            </ImageContainer>
            
            {/* Navigation Controls - Now outside the image */}
            <NavigationControls>
              <NavButton 
                onClick={goToPrevious}
                aria-label="Previous image"
              >
                <ButtonIcon viewBox="0 0 24 24">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </ButtonIcon>
              </NavButton>
              
              <NavButton 
                onClick={goToNext}
                aria-label="Next image"
              >
                <ButtonIcon viewBox="0 0 24 24">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </ButtonIcon>
              </NavButton>
            </NavigationControls>
            
            {/* Slider Dots with fixed prop name */}
            <SliderDots>
              {images.map((_, index) => (
                <Dot 
                  key={index}
                  $isActive={index === currentImageIndex}
                  onClick={() => goToIndex(index)}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </SliderDots>
          </SliderContainer>
        </ImageArea>
      </Container>
    </Section>
  );
};

export default FactorySectionComponent;