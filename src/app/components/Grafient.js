import React from 'react';
import styled from 'styled-components';

// Styled-component for gradient container
const GradientContainer = styled.div`
  width: 100%;
  
  min-height: 80vh;
  background: linear-gradient(101.08deg, #5FB446 0.09%, #B3CB35 99.91%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: clamp(2rem, 6vw, 5rem);
  box-sizing: border-box;
  overflow: hidden;
  position: relative;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at top right, rgba(255, 255, 255, 0.1), transparent 70%);
    z-index: 1;
  }
  
  @media (min-width: 1921px) {
    min-height: 40vh;
    padding: clamp(3rem, 4vw, 6rem);
    
    /* Center content on extra large screens */
    &::after {
      content: '';
      position: absolute;
      max-width: 1800px;
      width: 100%;
      height: 100%;
      left: 50%;
      transform: translateX(-50%);
      pointer-events: none;
      box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.1) inset;
      border-radius: 8px;
    }
  }
  
  @media (max-width: 768px) {
    min-height: 60vh;
    padding: clamp(1.5rem, 4vw, 3rem);
  }
  
  @media (max-width: 480px) {
    min-height: 50vh;
    padding: clamp(1rem, 3vw, 2rem);
  }
`;

// Styled-component for the heading with background image
const Heading = styled.div`
  background-image: url("/images/Vector.png");
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-position: center center;
  background-size: contain;
  background-repeat: no-repeat;
  padding: clamp(1.5rem, 5vw, 3rem);
  box-sizing: border-box;
  position: relative;
  z-index: 2;
  max-width: 1600px;
  margin: 0 auto;
  
  @media (min-width: 1921px) {
    background-size: 85% auto;
    max-width: 1800px;
    padding: clamp(2rem, 3vw, 4rem);
  }
  
  @media (max-width: 768px) {
    background-size: 120% auto;
    padding: 1.5rem;
  }
  
  @media (max-width: 480px) {
    background-size: 150% auto;
    padding: 1rem;
  }
`;

// Styled-components for text inside the heading
const Title = styled.h2`
  color: white;
  text-align: center;
  font-size: clamp(1.5rem, 5vw, 3.5rem);
  font-weight: bold;
  margin-bottom: clamp(0.5rem, 2vw, 1rem);
  max-width: 90%;
  line-height: 1.2;
  position: relative;
  z-index: 21;
  font-family: "Montserrat";
  
  @media (min-width: 1921px) {
    font-size: clamp(2.5rem, 3.5vw, 4rem);
    max-width: 80%;
    margin-bottom: 1.5rem;
  }
  
  @media (max-width: 480px) {
    margin-bottom: 0.5rem;
  }
`;

const Description = styled.p`
  font-family: "Montserrat";
  font-weight: 400;
  font-size: clamp(0.875rem, 2vw, 1rem);
  line-height: 1.5;
  text-align: center;
  max-width: min(800px, 90%);
  margin-top: clamp(0.5rem, 2vw, 1rem);
  color: white;
  
  @media (min-width: 1921px) {
    font-size: clamp(1rem, 1.2vw, 1.25rem);
    max-width: min(1000px, 70%);
    line-height: 1.6;
  }
  
  @media (max-width: 768px) {
    margin-top: 0.5rem;
  }
`;

const GradientSection = () => {
  return (
    <GradientContainer>
      <Heading>
        <Title>We Export Worldwide!</Title>
        <Description>
          We export to almost all parts of the world, with a day-by-day growing market around the world. 100% of our products are exported abroad, especially to European countries.
        </Description>
      </Heading>
    </GradientContainer>
  );
};

export default GradientSection;

// Export components
export { GradientContainer, Heading, Title, Description };