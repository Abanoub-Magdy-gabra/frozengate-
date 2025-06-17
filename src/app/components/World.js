import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';

// Optimized keyframes for animations with improved performance
const moveRight = keyframes`
   from { top: 10%; left: 1%; }   
   to { top: 20%; left: 49%; } 
`;

const moveRightTR = keyframes`
   from { right: 10%; top: 30%; }   
   to { right: 45%; top: 10%; } 
`;

const moveRightT = keyframes`
   from { top: 40%; left: 30%; }   
   to { left: -7%; top: -7%; } 
`;

// Standardized styled components for consistent layout patterns
const GradientContainer = styled.div`
   width: 100%;
   min-height: ${props => props.$scrolled ? '85vh' : '60vh'};
   background: linear-gradient(101.08deg, #5FB446 0.09%, #B3CB35 99.91%);
   padding: ${props => props.$scrolled ? 'clamp(1.5rem, 5vw, 4rem)' : 'clamp(2rem, 6vw, 5rem)'};
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;
   position: relative;
   overflow: hidden;
   z-index: 3;
   box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
   transition: min-height 0.3s ease, padding 0.3s ease;
   
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
   
   @media (min-width: 1440px) {
     min-height: ${props => props.$scrolled ? '60vh' : '75vh'};
     padding: ${props => props.$scrolled ? 'clamp(2rem, 4vw, 4.5rem)' : 'clamp(2.5rem, 5vw, 5.5rem)'};
   }
   
   @media (min-width: 1921px) {
     min-height: ${props => props.$scrolled ? '55vh' : '70vh'};
     padding: ${props => props.$scrolled ? 'clamp(2.5rem, 3vw, 5rem)' : 'clamp(3rem, 4vw, 6rem)'};
     
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
     min-height: ${props => props.$scrolled ? '50vh' : '60vh'};
     padding: ${props => props.$scrolled ? 'clamp(1.2rem, 3vw, 2.5rem)' : 'clamp(1.5rem, 4vw, 3rem)'};
   }
   
   @media (max-width: 480px) {
     min-height: ${props => props.$scrolled ? '40vh' : '50vh'};
     padding: ${props => props.$scrolled ? 'clamp(0.8rem, 2vw, 1.5rem)' : 'clamp(1rem, 3vw, 2rem)'};
   }
`;

const Heading = styled.h2`
   color: white;
   text-align: center;
   font-size: ${props => props.$scrolled ? 'clamp(1.3rem, 4vw, 2.2rem)' : 'clamp(1.5rem, 5vw, 2.5rem)'};
   font-weight: bold;
   margin-bottom: ${props => props.$scrolled ? 'clamp(1.5rem, 6vw, 4rem)' : 'clamp(2.5rem, 8vw, 5rem)'};
   max-width: 900px;
   line-height: 1.2;
   position: relative;
   z-index: 21;
   font-family: 'Montserrat', sans-serif;
   transition: font-size 0.3s ease, margin-bottom 0.3s ease;
   
   @media (min-width: 1440px) {
     font-size: ${props => props.$scrolled ? 'clamp(1.6rem, 3vw, 2.5rem)' : 'clamp(1.8rem, 3.5vw, 2.8rem)'};
     max-width: 1100px;
     margin-bottom: ${props => props.$scrolled ? '3rem' : '3.5rem'};
   }
   
   @media (min-width: 1921px) {
     font-size: ${props => props.$scrolled ? 'clamp(1.8rem, 2.5vw, 2.7rem)' : 'clamp(2rem, 3vw, 3rem)'};
     max-width: 1200px;
     margin-bottom: ${props => props.$scrolled ? '3.5rem' : '4rem'};
   }
   
   @media (max-width: 768px) {
     margin-bottom: ${props => props.$scrolled ? '2rem' : '3rem'};
     font-size: ${props => props.$scrolled ? 'clamp(1.1rem, 3.5vw, 1.8rem)' : 'clamp(1.3rem, 4vw, 2rem)'};
   }
`;

const StatsContainer = styled.div`
   display: flex;
   justify-content: space-around;
   width: 100%;
   max-width: 1080px;
   position: relative;
   z-index: 21;
   flex-wrap: wrap;
   gap: ${props => props.$scrolled ? 'clamp(0.8rem, 3vw, 1.5rem)' : 'clamp(1rem, 4vw, 2rem)'};
   transition: gap 0.3s ease;
   
   @media (min-width: 1440px) {
     max-width: 1200px;
     gap: ${props => props.$scrolled ? 'clamp(1.2rem, 4vw, 2.5rem)' : 'clamp(1.5rem, 4.5vw, 3rem)'};
   }
   
   @media (min-width: 1921px) {
     max-width: 1400px;
     gap: ${props => props.$scrolled ? 'clamp(1.5rem, 4.5vw, 3.5rem)' : 'clamp(2rem, 5vw, 4rem)'};
   }
   
   @media (max-width: 768px) {
     justify-content: center;
   }
`;

const StatItem = styled.div`
   color: white;
   text-align: center;
   font-family: 'Montserrat', sans-serif;
   font-style: normal;
   font-weight: 600;
   transition: transform 0.3s ease;
   
   &:hover {
     transform: translateY(-5px);
   }
   
   @media (min-width: 1440px) {
     padding: 0 1rem;
   }
   
   @media (min-width: 1921px) {
     padding: 0 2rem;
   }
   
   @media (max-width: 480px) {
     margin-bottom: 1rem;
   }
`;

// Optimized animated elements for better performance
const AnimatedCircle = styled.div`
   position: absolute;
   top: 10%;
   left: 1%;
   animation: ${moveRight} 16s infinite alternate ease-in-out;
   will-change: transform;
   z-index: 1;
   opacity: ${props => props.$scrolled ? 0.6 : 1};
   transition: opacity 0.3s ease;
   transform: scale(${props => props.$scrolled ? 0.8 : 1});
`;

const AnimatedSquare = styled.div`
   position: absolute;
   right: 15%;
   top: 0%;
   animation: ${moveRightTR} 16s infinite alternate ease-in-out;
   will-change: transform;
   z-index: 1;
   opacity: ${props => props.$scrolled ? 0.6 : 1};
   transition: opacity 0.3s ease;
   transform: scale(${props => props.$scrolled ? 0.8 : 1});
`;

const AnimatedTriangle = styled.div`
   position: absolute;
   top: 40%;
   left: 30%;
   animation: ${moveRightT} 16s infinite alternate ease-in-out;
   will-change: transform;
   z-index: 1;
   opacity: ${props => props.$scrolled ? 0.6 : 1};
   transition: opacity 0.3s ease;
   transform: scale(${props => props.$scrolled ? 0.8 : 1});
`;

const StatValue = styled.div`
   font-size: ${props => props.$scrolled ? '5rem' : '5.80rem'};
   font-weight: bold;
   line-height: 1.1;
   color: white;
   transition: font-size 0.3s ease;
   
   @media (min-width: 1440px) {
     font-size: ${props => props.$scrolled ? '5.8rem' : '6.5rem'};
   }
   
   @media (min-width: 1921px) {
     font-size: ${props => props.$scrolled ? '6.3rem' : '7rem'};
   }
   
   @media (max-width: 768px) {
     font-size: ${props => props.$scrolled ? '4rem' : '4.5rem'};
   }
   
   @media (max-width: 480px) {
     font-size: ${props => props.$scrolled ? '3rem' : '3.5rem'};
   }
`;

const StatLabel = styled.div`
   font-size: ${props => props.$scrolled ? '0.8rem' : '0.875rem'};
   color: rgba(255, 255, 255, 0.9);
   font-weight: 500;
   margin-top: ${props => props.$scrolled ? '0.4rem' : '0.5rem'};
   transition: font-size 0.3s ease, margin-top 0.3s ease;
   
   @media (min-width: 1440px) {
     font-size: ${props => props.$scrolled ? '0.9rem' : '1rem'};
     margin-top: ${props => props.$scrolled ? '0.6rem' : '0.75rem'};
   }
   
   @media (min-width: 1921px) {
     font-size: ${props => props.$scrolled ? '1.1rem' : '1.2rem'};
     margin-top: ${props => props.$scrolled ? '0.8rem' : '1rem'};
   }
   
   @media (max-width: 480px) {
     font-size: ${props => props.$scrolled ? '0.7rem' : '0.75rem'};
   }
`;

// Create SVG shapes for animated elements
const Circle = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="40" cy="40" r="40" fill="rgba(255, 255, 255, 0.1)" />
  </svg>
);

const Square = () => (
  <svg width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="70" height="70" fill="rgba(255, 255, 255, 0.1)" />
  </svg>
);

const Triangle = () => (
  <svg width="80" height="70" viewBox="0 0 80 70" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M40 0L80 70H0L40 0Z" fill="rgba(255, 255, 255, 0.1)" />
  </svg>
);

const GradientStats = () => {
   const [growth, setGrowth] = useState(0);
   const [users, setUsers] = useState(0);
   const [daily, setDaily] = useState(0);
   const [isInView, setIsInView] = useState(false);
   const [scrolled, setScrolled] = useState(false);

   const stats = [
     { finalValue: 25, label: 'Growth', setState: setGrowth, value: growth, increment: 1, suffix: '%' },
     { finalValue: 7500, label: 'Employees', setState: setUsers, value: users, increment: 375 },
     { finalValue: 33, label: 'Years of Experience', setState: setDaily, value: daily, increment: 2 }
   ];

   const statsRef = useRef(null);

   // Add scroll listener effect
   useEffect(() => {
     const handleScroll = () => {
       const isScrolled = window.scrollY > 50; // Adjust this threshold as needed
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

   // Using IntersectionObserver to trigger when stats come into view
   useEffect(() => {
     if (typeof window === 'undefined' || !window.IntersectionObserver) return;
     
     const observer = new IntersectionObserver(
       (entries) => {
         if (entries[0].isIntersecting) {
           setIsInView(true);
         }
       },
       { threshold: 0.2, rootMargin: '0px 0px -100px 0px' } // More sensitive threshold
     );

     if (statsRef.current) {
       observer.observe(statsRef.current);
     }

     return () => {
       if (statsRef.current) {
         observer.unobserve(statsRef.current);
       }
     };
   }, []);

   // Optimized counter animation with reduced rerender frequency
   useEffect(() => {
     if (isInView) {
       const interval = setInterval(() => {
         let allComplete = true;
         
         stats.forEach(stat => {
           if (stat.value < stat.finalValue) {
             // Increment by the defined step size
             stat.setState(prev => Math.min(prev + stat.increment, stat.finalValue));
             allComplete = false;
           }
         });
         
         // Clear interval when all counters reach their final values
         if (allComplete) {
           clearInterval(interval);
         }
       }, 160); // Adjust the speed by changing the interval time

       return () => clearInterval(interval);
     }
   }, [isInView, growth, users, daily]);

   return (
     <div ref={statsRef}>
       <GradientContainer $scrolled={scrolled}>
         {/* Background animated shapes with better visual structure */}
         <AnimatedCircle aria-hidden="true" $scrolled={scrolled}>
           <Circle />
         </AnimatedCircle>
         
         <AnimatedSquare aria-hidden="true" $scrolled={scrolled}>
           <Square />
         </AnimatedSquare>
         
         <AnimatedTriangle aria-hidden="true" $scrolled={scrolled}>
           <Triangle />
         </AnimatedTriangle>

         {/* Content */}
         <Heading $scrolled={scrolled}>We provide the best experience for our clients!</Heading>

         {/* Stats container */}
         <StatsContainer $scrolled={scrolled}>
           {stats.map((stat, index) => (
             <StatItem key={index}>
               <StatValue $scrolled={scrolled}>{stat.value}{stat.suffix}</StatValue>
               <StatLabel $scrolled={scrolled}>{stat.label}</StatLabel>
             </StatItem>
           ))}
         </StatsContainer>
       </GradientContainer>
     </div>
   );
};

export default GradientStats;
