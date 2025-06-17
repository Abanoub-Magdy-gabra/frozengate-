import React from "react";
import styled, { createGlobalStyle } from "styled-components";

// Global Style to apply Montserrat font
const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600;700&display=swap');
  
  * {
    font-family: 'Montserrat', sans-serif;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
`;

// Main Container
const Container = styled.div`
  max-width: 64rem;
  width: 100%;
  margin: 0 auto;
  padding: 1.5rem;
  font-family: 'Montserrat', sans-serif;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

// Typography Styles
const AboutTitle = styled.h1`
  font-size: 32px;
  color: black;
  font-weight: 700;
  
  @media (max-width: 768px) {
    font-size: 28px;
  }
  
  @media (max-width: 480px) {
    font-size: 24px;
  }
`;

const AboutSubtitle = styled.div`
  color: #4caf50;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 24px;
  
  @media (max-width: 768px) {
    font-size: 16px;
    margin-bottom: 20px;
  }
`;

const AboutText = styled.p`
  color: #666;
  line-height: 1.6;
  font-weight: 400;
  margin-bottom: 24px;
  
  @media (max-width: 768px) {
    font-size: 15px;
    margin-bottom: 20px;
  }
`;

const Highlight = styled.span`
  color: #4caf50;
  font-weight: 700;
`;

// Green Gradient Background
const GradientBackground = styled.div`
  background: linear-gradient(101.08deg, #5FB446 0.09%, #B3CB35 99.91%);
  color: white;
  margin-top: 40px;
  width: 100vw;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
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
    margin-top: 60px;
    
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

// Content Wrapper inside Green Section
const BannerContent = styled.div`
  text-align: left;
  margin: 0 auto;
  padding: clamp(40px, 6vw, 80px) clamp(1rem, 5vw, 2rem);
  max-width: 1080px;
  position: relative;
  z-index: 2;
  
  @media (min-width: 1921px) {
    max-width: 1400px;
    padding: clamp(60px, 7vw, 100px) clamp(2rem, 6vw, 3rem);
  }
  
  @media (min-width: 1440px) and (max-width: 1920px) {
    max-width: 1200px;
    padding: clamp(50px, 6.5vw, 90px) clamp(1.5rem, 5.5vw, 2.5rem);
  }
  
  @media (max-width: 1024px) {
    padding: 60px clamp(1.5rem, 4vw, 2rem);
  }
  
  @media (max-width: 768px) {
    padding: 40px clamp(1rem, 3vw, 1.5rem);
  }
  
  @media (max-width: 480px) {
    padding: 30px clamp(1rem, 2vw, 1.5rem);
  }
`;

const BannerContentt = styled.div`
  text-align: left;
  margin-bottom: 50px;
  
  @media (min-width: 1921px) {
    margin-bottom: 70px;
  }
  
  @media (max-width: 768px) {
    margin-bottom: 30px;
  }
`;

const BannerHeading = styled.h2`
  font-size: 1.8rem;
  font-weight: 700;
  
  @media (min-width: 1921px) {
    font-size: 2.5rem;
  }
  
  @media (min-width: 1440px) and (max-width: 1920px) {
    font-size: 2.2rem;
  }
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.3rem;
  }
`;

const BannerText = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  font-weight: 400;
  margin: 15px 0;
  
  @media (min-width: 1921px) {
    font-size: 1.2rem;
    line-height: 1.7;
    margin: 20px 0;
  }
  
  @media (min-width: 1440px) and (max-width: 1920px) {
    font-size: 1.1rem;
  }
  
  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

const ProductsList = styled.p`
  font-size: 1rem;
  font-weight: 600;
  
  @media (min-width: 1921px) {
    font-size: 1.2rem;
  }
  
  @media (min-width: 1440px) and (max-width: 1920px) {
    font-size: 1.1rem;
  }
  
  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

const Agronomy = () => {
  return (
    <>
      <GlobalStyle /> {/* Apply Montserrat font globally */}
      <Container>
        <AboutTitle>Agronomy</AboutTitle>
        <AboutSubtitle>Agronomy is our focus...</AboutSubtitle>
        <AboutText>
          Our entire production process, starting from the selection of seeds all the way to independent audits, is based on the skills and knowledge of our agronomists. This ensures the best farming practices, adherence to the latest standards, and the highest quality of cultivation, soil management, and food safety.
        </AboutText>
        <AboutText>
          Working with our quality management, quality assurance, and our team of agronomists in an integrated manner allows us to confidently promise our customers consistent, high-quality crop production, complete supply-chain control, and superior quality fruits and vegetables.
        </AboutText>
      </Container>
      {/* Green Background Section */}
      <GradientBackground>
        <BannerContent>
          <BannerContentt>
            <BannerHeading>Fruit Assortment</BannerHeading>
            <BannerText>
              With over 30 years of experience in harvesting fruits, our farmers, along with our team of agronomists, spend the entire season ensuring the best fruit harvests. Some of our most popular fruits include:
            </BannerText>
            <ProductsList>Strawberry, Mango, Figs, Grapes, Pomegranate, Apricots, Orange, Lemon, and Lime.</ProductsList>
          </BannerContentt>
          <BannerHeading>Vegetables Assortment</BannerHeading>
          <BannerText>
            Our vegetable varieties offer organic choices. Our team of agronomists work closely with farmers year-round to ensure the finest vegetables with great nutritional value and vibrant colors.
          </BannerText>
          <ProductsList>Broccoli, Cauliflower, Artichoke, Green beans, Spinach, and Potato.</ProductsList>
        </BannerContent>
      </GradientBackground>
    </>
  );
};

export default Agronomy;