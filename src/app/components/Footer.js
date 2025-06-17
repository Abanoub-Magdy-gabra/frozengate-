import React from 'react';
import styled from 'styled-components';

// Styled Components
const FooterContainer = styled.footer`
  background-color: #F0F0F0;
  padding: 2rem 1rem;
  font-family: 'Montserrat', sans-serif;
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600;700&display=swap');

* {
  font-family: 'Montserrat', sans-serif;
}
  @media (min-width: 768px) {
    padding: 4rem 2rem;
  }
  
  @media (min-width: 1024px) {
    padding: 4rem 5rem;
  }
`;

const FooterGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  
  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(7, 1fr);
  }
`;

const AboutSection = styled.div`
  display: flex;
  flex-direction: column;
  grid-column: span 7;
  
  @media (min-width: 640px) {
    grid-column: span 2;
  }
  
  @media (min-width: 768px) {
    grid-column: span 4;
    margin: 0 1rem;
  }
  
  @media (min-width: 1024px) {
    margin: 0 5rem;
  }
`;

const AboutTitle = styled.h2`
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: 15px;
  line-height: 18.29px;
  padding-top: 0.75rem;
  margin-bottom: 1rem;
  
  @media (min-width: 768px) {
    margin-bottom: 2.25rem;
  }
`;

const AboutText = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 12px;
  line-height: 15.59px;
  margin-top: 0.5rem;
  margin-bottom: 1.5rem;
  
  @media (min-width: 768px) {
    margin-bottom: 2.25rem;
  }
`;

const EgyptFlag = styled.img`
  width: 2.5rem;
  height: auto;
  margin-top: 0.5rem;
`;

const ContactSection = styled.div`
  display: flex;
  flex-direction: column;
  grid-column: span 1;
  margin-top: 1.5rem;
  
  @media (min-width: 640px) {
    grid-column: span 2;
    margin-top: 0;
  }
  
  @media (min-width: 768px) {
    grid-column: span 2;
  }
`;

const SectionTitle = styled.h3`
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  font-size: 1.25rem;
  margin-bottom: 1rem;
  
  @media (min-width: 768px) {
    font-size: 1.5rem;
  }
`;

const ContactList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  font-family: 'Montserrat', sans-serif;
  padding: 0;
  list-style-type: none;
`;

const ContactItem = styled.li`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const IconCircle = styled.div`
  background-color: #5FB446;
  width: 1.75rem;
  height: 1.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  flex-shrink: 0;
`;

const ContactLink = styled.a`
  color: black;
  text-decoration: none;
  font-size: 0.875rem;
  font-family: Montserrat;
  word-break: break-word;
  
  @media (min-width: 768px) {
    font-size: 1rem;
  }
`;

const LinksSection = styled.div`
  display: flex;
  flex-direction: column;
  grid-column: span 1;
  margin-top: 1.5rem;
  
  @media (min-width: 640px) {
    margin-top: 0;
  }
`;

const LinksList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  font-family: 'Montserrat', sans-serif;
  padding: 0;
  list-style-type: none;
`;

const LinkItem = styled.li`
  font-family: 'Montserrat', sans-serif;
`;

const NavLink = styled.a`
  color: black;
  text-decoration: none;
  font-size: 0.875rem;
  font-family: 'Montserrat', sans-serif;
  
  @media (min-width: 768px) {
    font-size: 1rem;
  }
`;

const SocialMediaSection = styled.div`
  display: flex;
  margin-top: 1.5rem;
  gap: 1rem;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterGrid>
        {/* About Section */}
        <AboutSection>
          <AboutTitle>
            Frozen Gate is a manufacturer of IQF Frozen Fruits & Vegetables. 100% of our products are exported worldwide.
          </AboutTitle>
          <AboutText>
            Established in 2023, Frozen Gate is a leading factory specializing in the production and distribution of premium frozen fruits and vegetables. With a commitment to excellence, we have become a trusted name in the industry, delivering top-notch products to customers in England, Russia, Germany, and across Europe.
          </AboutText>
          <EgyptFlag src="/images/footer/egp.png" alt="Egypt Flag" />
        </AboutSection>

        {/* Contact Section */}
        <ContactSection>
          <SectionTitle>Contact us</SectionTitle>
          <ContactList>
            <ContactItem>
              <IconCircle>
                <svg width="15" height="17" viewBox="0 0 15 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11.2455 16.7973C9.13916 16.686 7.56992 16.066 6.28605 14.9135C3.36241 12.2895 1.22436 9.14907 0.795326 5.15188C0.678199 4.06279 1.0134 2.82228 1.48838 1.8115C1.78993 1.17086 2.66871 0.624704 3.39994 0.39951C5.07919 -0.118178 5.68424 0.360682 5.91267 2.07293C5.99032 2.65533 5.99291 3.24485 6.09969 3.82013C6.28799 4.83286 6.00262 5.58092 5.04101 6.02936C4.42756 6.31474 4.2263 6.75606 4.60486 7.36175C5.47846 8.76016 6.33588 10.1696 7.25348 11.5388C7.75434 12.2863 8.41828 12.4772 9.15728 11.7796C9.76427 11.2062 10.436 11.203 11.1562 11.5693C11.7069 11.8501 12.2822 12.0831 12.8342 12.3613C13.5013 12.6972 14.272 12.9392 14.2267 13.9306C14.1795 14.9659 13.8275 15.8531 12.8723 16.3184C12.2731 16.6077 11.5788 16.7034 11.2455 16.7973Z" fill="white"/>
                </svg>
              </IconCircle>
              <ContactLink href="tel:+201227516340">
                +2 01227516340 / +201272781340
              </ContactLink>
            </ContactItem>
            <ContactItem>
              <IconCircle>
                <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23.0457 23.0458C28.3178 17.7737 28.3177 9.22601 23.0457 3.95394C17.7736 -1.31814 9.22586 -1.31815 3.95378 3.95393C-1.31829 9.22601 -1.3183 17.7737 3.95378 23.0458C9.22586 28.3179 17.7736 28.3179 23.0457 23.0458Z" fill="#5FB446"/>
                  <path d="M7.45863 11.2778C7.4631 11.4579 7.47759 11.6376 7.502 11.8162C7.69613 13.2346 8.51084 14.4959 9.24919 15.6872C10.2043 17.2228 11.197 18.7351 12.1961 20.2428C12.3756 20.5138 12.5555 20.7849 12.7358 21.0562C13.3396 21.9654 13.6754 21.9667 14.2643 21.0821C15.8109 18.7571 17.3801 16.4424 18.7999 14.0403C20.0617 11.9048 19.6528 9.13002 18.0149 7.29611C16.326 5.40526 13.7531 4.76397 11.4144 5.6518C10.2074 6.11104 9.17345 6.93506 8.45648 8.00923C7.81584 8.97795 7.43016 10.1169 7.45863 11.2778Z" fill="white"/>
                  <path d="M13.5 13.5C14.8567 13.5 15.9564 12.4002 15.9564 11.0436C15.9564 9.68694 14.8567 8.58716 13.5 8.58716C12.1434 8.58716 11.0436 9.68694 11.0436 11.0436C11.0436 12.4002 12.1434 13.5 13.5 13.5Z" fill="#5FB446"/>
                </svg>
              </IconCircle>
              <ContactLink href="#">
                6th industrial zone, Sadat city, MNF, Egypt.
              </ContactLink>
            </ContactItem>
            <ContactItem>
              <IconCircle>
                <svg width="16" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.01586 9.98594C5.69326 9.98594 3.36726 9.96963 1.04296 9.99594C0.295765 10.0044 -0.00503473 9.74123 6.36498e-05 9.04866C0.0204572 6.34961 0.0219722 3.65057 0.00459997 0.951521C-0.000498412 0.245271 0.322966 -0.00207869 1.0526 2.63827e-05C5.67249 0.0137093 10.292 0.0137093 14.9111 2.63827e-05C15.698 -0.00313122 16.0056 0.276846 15.9999 1.00309C15.9792 3.67478 15.9792 6.34681 15.9999 9.0192C16.0056 9.75597 15.6872 10.0112 14.9021 9.99963C12.6067 9.96489 10.3113 9.98594 8.01586 9.98594ZM1.88137 0.801003C1.95501 0.922045 1.97823 1.00257 2.03431 1.04678C3.8805 2.48928 5.73744 3.92072 7.57343 5.3748C7.94391 5.66846 8.18637 5.62003 8.53646 5.34427C10.2824 3.95914 12.0487 2.59768 13.8048 1.22307C13.9402 1.11782 14.0393 0.970989 14.1951 0.802057L1.88137 0.801003ZM1.38569 9.15287H14.6137L9.85524 5.44952C9.21001 5.90369 8.62767 6.63626 8.06118 6.62521C7.44767 6.61363 6.84889 5.90949 6.24332 5.50795C6.20569 5.48993 6.16645 5.47496 6.12605 5.46321L1.38569 9.15287ZM10.5407 4.87221L15.0969 8.42083V1.3236L10.5407 4.87221ZM0.881521 8.4403L5.4661 4.87221L0.881521 1.30939V8.4403Z" fill="white"/>
                </svg>
              </IconCircle>
              <ContactLink href="mailto:info@fgf-eg.com">
                info@fgf-eg.com
              </ContactLink>
            </ContactItem>
            {/* Instagram Icon */}
            <ContactItem>
              <IconCircle>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 1.44062C10.1375 1.44062 10.3906 1.45 11.2313 1.4875C12.0125 1.52187 12.4344 1.65313 12.7156 1.7625C13.0875 1.90625 13.3563 2.08125 13.6344 2.35937C13.9156 2.64062 14.0875 2.90625 14.2313 3.27813C14.3406 3.55937 14.4719 3.98437 14.5063 4.76562C14.5438 5.60625 14.5531 5.85937 14.5531 7.99687C14.5531 10.1344 14.5438 10.3875 14.5063 11.2281C14.4719 12.0094 14.3406 12.4313 14.2313 12.7125C14.0875 13.0844 13.9125 13.3531 13.6344 13.6313C13.3531 13.9125 13.0875 14.0844 12.7156 14.2281C12.4344 14.3375 12.0094 14.4688 11.2313 14.5031C10.3906 14.5406 10.1375 14.55 8 14.55C5.8625 14.55 5.60938 14.5406 4.76875 14.5031C3.9875 14.4688 3.56563 14.3375 3.28438 14.2281C2.9125 14.0844 2.64375 13.9094 2.36563 13.6313C2.08438 13.35 1.9125 13.0844 1.76875 12.7125C1.65938 12.4313 1.52813 12.0063 1.49375 11.2281C1.45625 10.3875 1.44688 10.1344 1.44688 7.99687C1.44688 5.85937 1.45625 5.60625 1.49375 4.76562C1.52813 3.98437 1.65938 3.5625 1.76875 3.28125C1.9125 2.90937 2.0875 2.64062 2.36563 2.3625C2.64688 2.08125 2.9125 1.90937 3.28438 1.76562C3.56563 1.65625 3.99063 1.525 4.76875 1.49062C5.60938 1.45312 5.8625 1.44375 8 1.44062ZM8 0C5.82813 0 5.55625 0.009375 4.70313 0.046875C3.85313 0.084375 3.26875 0.221875 2.7625 0.41875C2.23438 0.625 1.7875 0.896875 1.34375 1.34375C0.896875 1.7875 0.625 2.23438 0.41875 2.75938C0.221875 3.26875 0.084375 3.85 0.046875 4.7C0.009375 5.55625 0 5.82812 0 8C0 10.1719 0.009375 10.4438 0.046875 11.2969C0.084375 12.1469 0.221875 12.7313 0.41875 13.2375C0.625 13.7656 0.896875 14.2125 1.34375 14.6562C1.7875 15.1 2.23438 15.375 2.75938 15.5781C3.26875 15.775 3.85 15.9125 4.7 15.95C5.55313 15.9875 5.825 15.9969 7.99688 15.9969C10.1688 15.9969 10.4406 15.9875 11.2938 15.95C12.1438 15.9125 12.7281 15.775 13.2344 15.5781C13.7594 15.375 14.2063 15.1 14.65 14.6562C15.0938 14.2125 15.3688 13.7656 15.5719 13.2406C15.7688 12.7313 15.9063 12.15 15.9438 11.3C15.9813 10.4469 15.9906 10.175 15.9906 8.00313C15.9906 5.83125 15.9813 5.55938 15.9438 4.70625C15.9063 3.85625 15.7688 3.27188 15.5719 2.76562C15.375 2.23438 15.1031 1.7875 14.6563 1.34375C14.2125 0.9 13.7656 0.625 13.2406 0.421875C12.7313 0.225 12.15 0.0875 11.3 0.05C10.4438 0.009375 10.1719 0 8 0Z" fill="white"/>
                  <path d="M8 3.89062C5.73125 3.89062 3.89062 5.73125 3.89062 8C3.89062 10.2688 5.73125 12.1094 8 12.1094C10.2688 12.1094 12.1094 10.2688 12.1094 8C12.1094 5.73125 10.2688 3.89062 8 3.89062ZM8 10.6656C6.52813 10.6656 5.33437 9.47187 5.33437 8C5.33437 6.52813 6.52813 5.33437 8 5.33437C9.47188 5.33437 10.6656 6.52813 10.6656 8C10.6656 9.47187 9.47188 10.6656 8 10.6656Z" fill="white"/>
                  <path d="M13.2313 3.72808C13.2313 4.25933 12.8 4.68745 12.2719 4.68745C11.7406 4.68745 11.3125 4.25621 11.3125 3.72808C11.3125 3.19683 11.7438 2.7687 12.2719 2.7687C12.8 2.7687 13.2313 3.19995 13.2313 3.72808Z" fill="white"/>
                </svg>
              </IconCircle>
              <ContactLink href="https://www.instagram.com/frozen_gate_factory" target="_blank" rel="noopener noreferrer">
                frozen_gate_factory
              </ContactLink>
            </ContactItem>
            {/* LinkedIn Icon */}
            <ContactItem>
              <IconCircle>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14.8156 0H1.18125C0.528125 0 0 0.515625 0 1.15313V14.8438C0 15.4813 0.528125 16 1.18125 16H14.8156C15.4688 16 16 15.4813 16 14.8469V1.15313C16 0.515625 15.4688 0 14.8156 0ZM4.74687 13.6344H2.37188V5.99687H4.74687V13.6344ZM3.55938 4.95625C2.79688 4.95625 2.18125 4.34062 2.18125 3.58125C2.18125 2.82188 2.79688 2.20625 3.55938 2.20625C4.31875 2.20625 4.93437 2.82188 4.93437 3.58125C4.93437 4.3375 4.31875 4.95625 3.55938 4.95625ZM13.6344 13.6344H11.2625V9.92188C11.2625 9.0375 11.2469 7.89687 10.0281 7.89687C8.79375 7.89687 8.60625 8.8625 8.60625 9.85938V13.6344H6.2375V5.99687H8.5125V7.04063H8.54375C8.85938 6.44063 9.63438 5.80625 10.7875 5.80625C13.1906 5.80625 13.6344 7.3875 13.6344 9.44375V13.6344Z" fill="white"/>
                </svg>
              </IconCircle>
              <ContactLink href="https://www.linkedin.com/company/frozen-gate-factory" target="_blank" rel="noopener noreferrer">
                Frozen Gate Factory
              </ContactLink>
            </ContactItem>
          </ContactList>
          
          {/* Additional Social Media Section if needed for future additions */}
          <SocialMediaSection>
            {/* You can add more social media icons here if needed */}
          </SocialMediaSection>
        </ContactSection>

        {/* Links Section */}
        <LinksSection>
          <SectionTitle>Links</SectionTitle>
          <LinksList>
            <LinkItem><NavLink href="#">Home</NavLink></LinkItem>
            <LinkItem><NavLink href="#">About us</NavLink></LinkItem>
            <LinkItem><NavLink href="#">Our products</NavLink></LinkItem>
            <LinkItem><NavLink href="#">Contact us</NavLink></LinkItem>
          </LinksList>
        </LinksSection>
      </FooterGrid>
    </FooterContainer>
  );
};

export default Footer;