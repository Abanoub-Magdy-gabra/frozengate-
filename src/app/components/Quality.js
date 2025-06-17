import React from "react";
import styled, { createGlobalStyle, css } from "styled-components";

// Global Style for Montserrat Font
const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600;700&display=swap');
  
  * {
    font-family: 'Montserrat', sans-serif;
    box-sizing: border-box;
  }
`;

const Container = styled.div`
  max-width: 64rem;
  margin: 0 auto;
  padding: 1.5rem;
  font-family: 'Montserrat', sans-serif;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const SectionTitle = styled.h1`
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

const Subtitle = styled.p`
  font-size: 18px;
  color: #666;
  max-width: 1000px;
  margin-bottom: 40px;
  line-height: 1.6;
  
  @media (max-width: 768px) {
    font-size: 16px;
    margin-bottom: 30px;
  }
  
  @media (max-width: 480px) {
    font-size: 14px;
    margin-bottom: 20px;
  }
`;

const SectionWrapper = styled.div`
  margin-bottom: 50px;
  position: relative;
  
  @media (max-width: 768px) {
    margin-bottom: 40px;
  }
  
  @media (max-width: 480px) {
    margin-bottom: 30px;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 80px;
  
  @media (max-width: 1024px) {
    gap: 40px;
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
  }
  
  /* Alternate layout for even sections on mobile */
  ${props => props.$isEven && css`
    @media (max-width: 768px) {
      flex-direction: column-reverse;
    }
  `}
`;

const TextContent = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 80px;
  
  @media (max-width: 1024px) {
    margin-top: 60px;
  }
  
  @media (max-width: 768px) {
    margin-top: 20px;
  }
`;

const NumberAndTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  position: relative;
  
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Number = styled.h2`
  font-size: 50px;
  font-weight: 700;
  color: #E0E0E0;
  margin: 0 0 40px 0;
  padding-top: 0;
  
  @media (max-width: 1024px) {
    font-size: 42px;
    margin-bottom: 30px;
  }
  
  @media (max-width: 768px) {
    font-size: 36px;
    margin-bottom: 20px;
  }
  
  @media (max-width: 480px) {
    font-size: 32px;
    margin-bottom: 15px;
  }
`;

const Heading = styled.h2`
  font-size: 16px;
  font-weight: 700;
  color: #000;
  margin-bottom: 10px;
  
  @media (max-width: 480px) {
    font-size: 15px;
  }
`;

const Paragraph = styled.p`
  font-size: 14px;
  color: #666;
  line-height: 1.6;
  
  @media (max-width: 480px) {
    font-size: 13px;
  }
`;

const ImageContainer = styled.div`
  flex: 1;
  
  img {
    width: 100%;
    height: 300px;
    object-fit: cover;
    border-radius: 8px;
    
    @media (max-width: 1024px) {
      height: 280px;
    }
    
    @media (max-width: 768px) {
      height: 250px;
    }
    
    @media (max-width: 480px) {
      height: 200px;
    }
  }
`;

const QualitySection = () => {
  return (
    <>
      <GlobalStyle />
      <Container>
        <SectionTitle>Quality</SectionTitle>
        <Subtitle>
          At Frozen Gate, quality control is our top priority. We meticulously oversee every detail
          to ensure that all products meet the highest industry standards.
        </Subtitle>
        
        {/* Quality Management */}
        <SectionWrapper>
          <ContentWrapper>
            <NumberAndTextWrapper>
              <Number>1</Number>
              <TextContent>
                <Heading>Quality Management</Heading>
                <Paragraph>
                  Our priority is to make our customers happy. It is essential for us to maintain quality in
                  all aspects of production, from sourcing raw materials to final inspections.
                </Paragraph>
              </TextContent>
            </NumberAndTextWrapper>
            <ImageContainer>
              <img src="/images/Mask group (1).png" alt="Quality Management Process" />
            </ImageContainer>
          </ContentWrapper>
        </SectionWrapper>
        
        {/* Quality Assurance */}
        <SectionWrapper>
          <ContentWrapper $isEven={true}>
            <ImageContainer>
              <img src="/images/Mask group (13).jpg" alt="Quality Assurance Team" />
            </ImageContainer>
            <NumberAndTextWrapper>
              <Number>2</Number>
              <TextContent>
                <Heading>Quality Assurance</Heading>
                <Paragraph>
                  We strictly adhere to quality protocols, ensuring that all products undergo rigorous
                  testing. Our quality assurance team inspects every stage of production to maintain the
                  highest standards.
                </Paragraph>
              </TextContent>
            </NumberAndTextWrapper>
          </ContentWrapper>
        </SectionWrapper>
        
        {/* Meeting Standards */}
        <SectionWrapper>
          <ContentWrapper>
            <NumberAndTextWrapper>
              <Number>3</Number>
              <TextContent>
                <Heading>Meeting Standards</Heading>
                <Paragraph>
                  Our adherence to ISO standards guarantees high-quality production. We continually refine
                  our processes to align with industry requirements and customer expectations.
                </Paragraph>
              </TextContent>
            </NumberAndTextWrapper>
            <ImageContainer>
              <img src="/images/Mask group (3).png" alt="Meeting Industry Standards" />
            </ImageContainer>
          </ContentWrapper>
        </SectionWrapper>
      </Container>
    </>
  );
};

export default QualitySection;