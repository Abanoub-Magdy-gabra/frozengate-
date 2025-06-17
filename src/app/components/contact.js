import React from 'react';
import styled from 'styled-components';

// Styled Components for Layout
const ContactSection = styled.section`
  margin: 5% 5% 10% 5%;
  padding: 40px 20px;
  display: flex;
  align-items: center;
  gap: 40px;
  max-width: 64rem;
  margin: 0 auto;
  padding: 1.5rem;
  font-family: 'Montserrat', sans-serif;
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const ContentWrapper = styled.div`
  flex: 1.5;
`;

const SectionTitle = styled.h2`
    font-size: 32px;
  color: black;
  font-weight: 700;
`;

const GreenText = styled.p`
  color: #5FB446;
  font-family: "Montserrat";
  font-weight: 500;
  font-size: 110%;
  margin-bottom: 15px;
`;

const Description = styled.p`
  font-family: "Montserrat";
  font-size: 90%;
  line-height: 1.6;
  color: #555;
  margin-bottom: 25px;
`;

// Form Styling
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Input = styled.input`
  padding: 12px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 12px;
  background: #f9f9f9;
  width: 100%;
`;

const TextArea = styled.textarea`
  padding: 12px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 12px;
  background: #f9f9f9;
  width: 100%;
  height: 120px;
  resize: none;
`;

const Button = styled.button`
  padding: 12px;
  font-size: 1rem;
  font-weight: 600;
  color: #fff;
  background: #5FB446;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: background 0.3s ease;
  
  &:hover {
    background: #4a9a36;
  }
`;

// Map Section
const MapWrapper = styled.div`
  flex: 1.2;
  text-align: center;
`;

const MapIframe = styled.iframe`
  width: 100%;
  max-width: 400px;
  height: 480px;
  border-radius: 8px;
  border: none;
`;

// Main Component
const ContactUs = () => {
  return (
    <ContactSection>
      <ContentWrapper>
        <SectionTitle>Contact Us</SectionTitle>
        <GreenText>We're here to assist you with any inquiries.</GreenText>
        <Description>
          Have questions or need support? Fill out the form below, and our team will get back to you as soon as possible.
        </Description>
        <Form>
          <Input type="text" placeholder="Your Name" required />
          <Input type="email" placeholder="Your Email" required />
          <TextArea placeholder="Your Message" required />
          <Button type="submit">Send Message</Button>
        </Form>
      </ContentWrapper>
      
      <MapWrapper>
        <MapIframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3441.08499901941!2d30.5853722!3d30.4053302!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145897b6674ab34b%3A0xc607769ea38690ae!2sFrozen%20Gate%20for%20food%20investment!5e0!3m2!1sen!2seg!4v1741437493719!5m2!1sen!2seg" 
          width="600" 
          height="750" 
          allowFullScreen 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
        />
      </MapWrapper>
    </ContactSection>
  );
};

export default ContactUs;