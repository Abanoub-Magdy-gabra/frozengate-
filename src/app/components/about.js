import React from 'react';
import styled from 'styled-components';

// Global style with improved responsiveness
const GlobalStyle = styled.div`
  font-family: 'Montserrat', sans-serif;
  width: 100%;
  overflow-x: hidden; // Prevent horizontal scrolling
`;

// Responsive container
const Container = styled.div`
  max-width: 64rem;
  margin: 0 auto;
  padding: 1.5rem;
  font-family: 'Montserrat', sans-serif;
  
  @media (max-width: 480px) {
    padding: 1rem;
  }
`;

// Responsive text elements
const AboutTitle = styled.h1`
  font-size: 32px;
  color: black;
  font-weight: 700;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 28px;
  }
  
  @media (max-width: 480px) {
    font-size: 24px;
  }
`;

const AboutSubtitle = styled.div`
  color: #4CAF50;
  font-size: 18px;
  margin-bottom: 24px;
  opacity: 0;
  transform: translateY(20px);
  animation: fadeIn 0.8s ease-out forwards;
  
  @media (max-width: 768px) {
    font-size: 16px;
    margin-bottom: 20px;
  }
  
  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

const AboutText = styled.p`
  color: #666;
  line-height: 1.6;
  margin-bottom: 40px;
  transform: translateY(20px);
  animation: fadeIn 0.8s ease-out forwards 0.3s;
  
  @media (max-width: 768px) {
    margin-bottom: 30px;
  }
  
  @media (max-width: 480px) {
    font-size: 15px;
    margin-bottom: 25px;
  }
`;

const Highlight = styled.span`
  color: #4CAF50;
  font-weight: bold;
`;

// Improved responsive gradient background
const GradientBackground = styled.div`
  background: linear-gradient(101.08deg, #5FB446 0.09%, #B3CB35 99.91%);
  padding: clamp(40px, 6vw, 80px) 0;
  margin: clamp(30px, 4vw, 60px) 0;
  width: 100vw;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  color: #ffffff;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  
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
    padding: clamp(60px, 5vw, 100px) 0;
    
    /* Center content on extra large screens */
    &::after {
      content: '';
      position: absolute;
      max-width: 1800px;
      width: 100%;
      height: 100%;
      left: 50%;
      top: 0;
      transform: translateX(-50%);
      pointer-events: none;
      box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.1) inset;
      border-radius: 8px;
      z-index: 1;
    }
  }
`;

// Fixed responsive banner content
const BannerContent = styled.div`
  max-width: 1080px;
  margin: 0 auto; // Center the content
  padding: 0 2rem;
  position: relative;
  z-index: 2;
  
  @media (min-width: 1921px) {
    max-width: 1400px;
    padding: 0 3rem;
  }
  
  @media (min-width: 1440px) and (max-width: 1920px) {
    max-width: 1200px;
  }
  
  @media (max-width: 768px) {
    padding: 0 1.5rem;
  }
  
  @media (max-width: 480px) {
    padding: 0 1rem;
  }
`;

const BannerHeading = styled.h2`
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  line-height: 1.3;
  
  @media (min-width: 1921px) {
    font-size: 2.5rem;
    margin-bottom: 2rem;
    max-width: 80%;
  }
  
  @media (min-width: 1440px) and (max-width: 1920px) {
    font-size: 2.2rem;
  }
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.2rem;
    margin-bottom: 0.8rem;
  }
`;

const BannerText = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  opacity: 0.9;
  
  @media (min-width: 1921px) {
    font-size: 1.2rem;
    max-width: 80%;
    line-height: 1.7;
  }
  
  @media (min-width: 1440px) and (max-width: 1920px) {
    font-size: 1.1rem;
  }
  
  @media (max-width: 768px) {
    font-size: 0.95rem;
  }
  
  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

// Responsive section elements
const Section = styled.div`
  margin-bottom: 40px;
  margin-top: 50px;
  transform: translateY(20px);
  animation: fadeIn 0.8s ease-out forwards 0.5s;
  
  @media (max-width: 768px) {
    margin-top: 30px;
    margin-bottom: 30px;
  }
  
  @media (max-width: 480px) {
    margin-top: 25px;
    margin-bottom: 25px;
  }
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
  
  @media (max-width: 480px) {
    gap: 10px;
    margin-bottom: 15px;
  }
`;

const IconWrapper = styled.div`
  width: 40px;
  height: 40px;
  background-color: #f5f5f5;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0; // Prevent icon from shrinking
  
  @media (max-width: 480px) {
    width: 32px;
    height: 32px;
  }
`;

const Icon = styled.svg`
  width: 20px;
  height: 20px;
  fill: #4CAF50;
  
  @media (max-width: 480px) {
    width: 16px;
    height: 16px;
  }
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin: 0;
  color: #333;
  
  @media (max-width: 768px) {
    font-size: 20px;
  }
  
  @media (max-width: 480px) {
    font-size: 18px;
  }
`;

const Subtitle = styled.p`
  color: #4CAF50;
  font-size: 14px;
  margin: 10px 0;
  
  @media (max-width: 480px) {
    font-size: 13px;
    margin: 8px 0;
  }
`;

const Description = styled.p`
  color: #666;
  line-height: 1.6;
  max-width: 800px;
  
  @media (max-width: 480px) {
    font-size: 15px;
  }
`;

// Added animation keyframes
const GlobalStyles = styled.div`
  @keyframes fadeIn {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

// React Functional Component for the About Us Section
const AboutUs = () => {
  return (
    <GlobalStyles>
      <GlobalStyle>
        <Container>
          <AboutTitle>About us</AboutTitle>
          <AboutSubtitle>A Leading Player in Agricultural Investment</AboutSubtitle>
          <AboutText>
            Frozen Gate is a leading factory specializing in the production and distribution of premium frozen fruits and vegetables. With a commitment to excellence, we have become a trusted name in the industry, delivering top-notch products to our valued customers across the globe.
          </AboutText>
          <AboutText>
            At <Highlight>Frozen Gate</Highlight>, we understand the importance of maintaining the nutritional value, freshness, and flavor of fruits and vegetables. That's why we strictly adhere to state-of-the-art freezing techniques and uphold stringent quality control measures throughout our production process. From sourcing the finest raw materials to packaging and distribution, every step is meticulously monitored to ensure our customers receive the highest quality products. Frozen factory utilizes advanced techniques and adheres to strict food safety standards to maintain freshness and minimize waste.
          </AboutText>

          <GradientBackground>
            <BannerContent>
              <BannerHeading>
                We have more than 30 years of experience in the production and exporting of frozen fruits and vegetables.
              </BannerHeading>
              <BannerText>
                Our factory processes and packages fresh produce. We play a crucial role in preserving the nutritional value and extending the shelf life of our products. We employ rigorous food handling and food safety standards in weighing, sorting, cutting, and packaging to ensure the quality and safety of the final products. Frozen factory utilizes advanced techniques and adheres to strict food safety standards to maintain freshness and minimize waste.
              </BannerText>
            </BannerContent>
          </GradientBackground>

          <Section>
            <SectionHeader>
              <IconWrapper>
                <Icon viewBox="0 0 24 24">
                  <path d="M12 2L1 12h3v9h6v-6h4v6h6v-9h3L12 2z" />
                </Icon>
              </IconWrapper>
              <Title>Our Mission</Title>
            </SectionHeader>
            <Subtitle>A Leading Player in Agricultural Investment</Subtitle>
            <Description>
              Our mission is to establish and maintain trustworthy relationships with our clients by providing them with the finest produce that fulfills their specific needs.
            </Description>
          </Section>

          <Section>
            <SectionHeader>
              <IconWrapper>
                <Icon viewBox="0 0 24 24">
                  <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z" />
                </Icon>
              </IconWrapper>
              <Title>Our Values</Title>
            </SectionHeader>
            <Subtitle>A Leading Player in Agricultural Investment</Subtitle>
            <Description>
              Our mission is to establish and maintain trustworthy relationships with our clients by providing them with the finest produce that fulfills their specific needs.
            </Description>
          </Section>
        </Container>
      </GlobalStyle>
    </GlobalStyles>
  );
};

export default AboutUs;