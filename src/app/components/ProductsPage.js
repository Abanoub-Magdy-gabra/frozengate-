import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

// Font Styles
const FontStyles = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap');
  font-family: 'Montserrat', sans-serif;
`;

// Section Container Styles
const SectionContainer = styled.section`
  max-width: 64rem;
  margin: 0 auto;
  padding: 1.5rem;
  font-family: 'Montserrat', sans-serif;

  @media (max-width: 1024px) {
    padding: 1.5rem;
  }

  @media (max-width: 768px) {
    padding: 1rem;
    background-color:#F0F0F0;
  }
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  color: black;
  font-weight: 700;
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    font-size: 1.75rem;
    margin-bottom: 1rem;
  }
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  
  @media (max-width: 768px) {
    gap: 1.5rem;
  }
  
  @media (max-width: 480px) {
    gap: 1rem;
  }
`;

// Product Card Styles
const ProductCard = styled.div`
  display: flex;
  align-items: center;
  background-image: url(${(props) => props.image});
  background-size: ${props => props.$ishovering ? '110%' : '100%'};
  background-position: right center;
  background-repeat: no-repeat;
  border-radius: 20px;
  padding: clamp(15px, 4vw, 30px);
  width: 100%;
  height: clamp(260px, 30vw, 340px);
  position: relative;
  overflow: hidden;
  transition: transform 0.4s ease, background-size 0.8s ease-in-out, box-shadow 0.4s ease;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  will-change: transform, background-size;

  &:hover {
    transform: translateY(-8px);
    background-size: 110%;
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 1024px) {
    background-position: center right 20%;
  }

  @media (max-width: 768px) {
    background-position: center right 10%;
  }

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: flex-start;
    height: auto;
    min-height: 260px;
    background-position: center;
    background-size: cover !important;
  }
`;

const GradientOverlay = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 70%;
  height: 100%;
  border-radius: 20px 0 0 20px;
  background: linear-gradient(to right, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.8) 40%, rgba(255, 255, 255, 0) 100%);
  
  @media (max-width: 640px) {
    width: 100%;
    border-radius: 20px;
    background: linear-gradient(to top, rgba(255, 255, 255, 0.9) 60%, rgba(255, 255, 255, 0) 100%);
  }
`;

const ProductInfo = styled.div`
  flex: 1;
  z-index: 2;
  position: relative;
  max-width: 60%;
  
  @media (max-width: 768px) {
    max-width: 70%;
  }
  
  @media (max-width: 640px) {
    max-width: 100%;
    width: 100%;
    padding-top: 50%;
  }
`;

const ProductName = styled.h3`
  font-size: 1.75rem;
  font-weight: 700;
  color: #222;
  margin-bottom: 15px;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 40px;
    height: 3px;
    background-color: #5FB446;
    transition: width 0.3s ease;
  }
  
  ${ProductCard}:hover &:after {
    width: 60px;
  }
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
    margin-bottom: 12px;
  }
`;

const InfoText = styled.p`
  font-size: 0.95rem;
  color: #555;
  margin: 8px 0;
  line-height: 1.5;
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const OrderButton = styled.button`
  background-color: #5FB446;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 50px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 18px;
  transition: all 0.3s ease;
  font-size: 0.85rem;
  box-shadow: 0 4px 8px rgba(95, 180, 70, 0.3);
  
  &:hover {
    background-color: #4a9037;
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 6px 12px rgba(95, 180, 70, 0.4);
  }
  
  &:active {
    transform: translateY(-1px);
    box-shadow: 0 3px 6px rgba(95, 180, 70, 0.3);
  }
  
  @media (max-width: 640px) {
    margin-top: 12px;
    padding: 8px 16px;
  }
`;

// Product data
const PRODUCTS_DATA = [
  {
    name: "Strawberry",
    type: "Individual Uncalibrated, Calibrated 15-35mm, Slices 10x10mm",
    packing: "1x10 Kg / 4x2.5 Kg / 20x400gm",
    season: "December till June",
    image: "/images/Strawberry.png",
  },
  {
    name: "Mango",
    type: "Individual Quick Frozen, Calibrated 15-25mm, Slices 10x10mm",
    packing: "1x10 Kg / 4x2.5 Kg / 20x400gm",
    season: "March till August",
    image: "/images/mango.jpg",
  },
  {
    name: "Broccoli",
    type: "Florets, Chunks",
    packing: "1x10 Kg / 4x2.5 Kg",
    season: "Year-round availability",
    image: "/images/broccoli.svg",
  },
  {
    name: "Artichoke",
    type: "IQF Hearts, Quarters",
    packing: "1x10 Kg / 4x2.5 Kg",
    season: "February till May",
    image: "/images/art.jpg",
  },
  {
    name: "Peas with carrots",
    type: "Individual Quick Frozen, Calibrated 8-10mm, Diced carrots 6x6mm",
    packing: "1x10 Kg / 4x2.5 Kg / 10x1Kg",
    season: "June till September",
    image: "/images/w.jpg",
  },
  {
    name: "Corn",
    type: "Individual Uncalibrated, Individual Calibrated size 15-35 mm, Individual on the Cob size 15-35 mm, Slices 10x10mm",
    packing: "1x10 Kg / 4x2.5 Kg / 20x400gm",
    season: "November till June",
    image: "/images/corn.jpg",
  },
  {
    name: "California mix",
    type: "Individual Uncalibrated, Individual Calibrated size 15-35 mm, Individual Florets size 15-35 mm, Mixed Diced 10x10mm",
    packing: "1x10 Kg / 4x2.5 Kg / 20x400gm",
    season: "November till June",
    image: "/images/mix.jpg",
  },
  {
    name: "Sweet Potatoes",
    type: "Individual Uncalibrated, Individual Calibrated size 15-35 mm, Individual Florets size 15-35 mm, Mixed Diced 10x10mm",
    packing: "1x10 Kg / 4x2.5 Kg / 20x400gm",
    season: "November till June", 
    image: "/images/sweet-potatoes.jpg",
  },
  {
    name: "Broad Beans",
    type: "Individual Uncalibrated, Individual Calibrated size 15-35 mm, Individual Calibrated size 25-35 mm, Slices 10x10mm",
    packing: "1x10 Kg / 4x2.5 Kg / 20x400gm",
    season: "December till June",
    image: "/images/beans.jpg",
  },
  {
    name: "Potatoes",
    type: "Individual Uncalibrated, Individual Calibrated size 15-35 mm, Individual Calibrated size 25-35 mm, Slices 10x10mm",
    packing: "1x10 Kg / 4x2.5 Kg / 20x400gm",
    season: "December till June",
    image: "/images/potatoes.jpg",
  },
  {
    name: "Okra",
    type: "Extra Size 0 - 2.5 cm, Zero Size 2.5 - 3.5 cm, Medium Size 3.5 - 4.5 cm, Okra Pieces 5 - 20 mm",
    packing: "1x10 Kg / 4x2.5 Kg / 20x400gm",
    season: "June till September",
    image: "/images/okra.jpg",
  },
  {
    name: "Beans",
    type: "Cut / Whole",
    packing: "1x10 Kg / 4x2.5 Kg / 20x400gm",
    season: "October till December",
    image: "/images/h.jpg",
  },
];

// Product Card Component with a different approach to handle hover state
const ProductItem = ({ product }) => {
  const [ishovering, setIsHovering] = useState(false);
  
  // Animation variants
  const cardVariants = {
    initial: { 
      y: 20,
      opacity: 0.8,
      boxShadow: "0 8px 20px rgba(0, 0, 0, 0.08)"
    },
    animate: { 
      y: 0,
      opacity: 1,
      boxShadow: "0 8px 20px rgba(0, 0, 0, 0.08)",
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    },
    hover: { 
      y: -8,
      boxShadow: "0 12px 30px rgba(0, 0, 0, 0.15)"
    }
  };
  
  const buttonVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.05, 
      y: -3,
      boxShadow: "0 6px 12px rgba(95, 180, 70, 0.4)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: { 
      scale: 0.98,
      y: -1,
      boxShadow: "0 3px 6px rgba(95, 180, 70, 0.3)" 
    }
  };
  
  // Create a modified style for the hover effect
  const cardStyle = {
    backgroundSize: ishovering ? '110%' : '100%',
    backgroundImage: `url(${product.image})`,
  };
  
  return (
    <motion.div 
      style={{
        display: 'flex',
        alignItems: 'center',
        backgroundPosition: 'right center',
        backgroundRepeat: 'no-repeat',
        borderRadius: '20px',
        padding: '30px',
        width: '100%',
        height: '340px',
        position: 'relative',
        overflow: 'hidden',
        transition: 'background-size 1s ease-in-out',
        ...cardStyle
      }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className="product-card"
      variants={cardVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      whileTap={{ scale: 0.98 }}
      viewport={{ once: true, margin: "0px 0px -100px 0px" }}
    >
      <GradientOverlay as={motion.div} 
        initial={{ opacity: 0.8 }}
        animate={{ opacity: 0.9 }}
        transition={{ duration: 0.5 }}
      />
      <ProductInfo as={motion.div}
        initial={{ x: -10, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
        <ProductName>{product.name}</ProductName>
        <InfoText as={motion.p}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <strong>Type:</strong>
          <br />
          {product.type.split(", ").map((line, index) => (
            <motion.span 
              key={index}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + (index * 0.1), duration: 0.3 }}
            >
              {line}
              <br />
            </motion.span>
          ))}
        </InfoText>
        <InfoText as={motion.p}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <strong>Packing:</strong> {product.packing}
        </InfoText>
        <InfoText as={motion.p}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <strong>Season:</strong> {product.season}
        </InfoText>
        <motion.button
          className="order-button"
          variants={buttonVariants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
          style={{
            backgroundColor: '#5FB446',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '50px',
            fontWeight: 600,
            cursor: 'pointer',
            marginTop: '18px',
            fontSize: '0.85rem',
            boxShadow: '0 4px 8px rgba(95, 180, 70, 0.3)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <span style={{ position: 'relative', zIndex: 2 }}>Order now</span>
          <motion.span 
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(45deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.2) 100%)'
            }}
            initial={{ x: '-100%' }}
            whileHover={{ x: '100%' }}
            transition={{ duration: 0.8 }}
          />
        </motion.button>
      </ProductInfo>
    </motion.div>
  );
};

// Add CSS for the product card
const ProductStylesheet = () => {
  return (
    <style jsx global>{`
      .product-card {
        backface-visibility: hidden;
        -webkit-font-smoothing: subpixel-antialiased;
        will-change: transform;
      }
      
      .product-card:active {
        transform: scale(0.98) !important;
      }
      
      @media (max-width: 1024px) {
        .product-card {
          height: 300px !important;
          padding: 25px !important;
        }
      }
      
      @media (max-width: 768px) {
        .product-card {
          height: 280px !important;
          background-position: center right !important;
          padding: 20px !important;
        }
      }
      
      @media (max-width: 640px) {
        .product-card {
          flex-direction: column !important;
          align-items: flex-start !important;
          height: auto !important;
          min-height: 260px !important;
          background-position: center !important;
        }
        
        .order-button {
          width: 100%;
          margin-top: 12px !important;
          padding: 8px 16px !important;
        }
      }
      
      /* Add reduced motion support */
      @media (prefers-reduced-motion: reduce) {
        .product-card {
          transition: none !important;
        }
        
        .product-card * {
          animation: none !important;
          transition: none !important;
        }
      }
    `}</style>
  );
};

// Main Products List Component
const ProductsList = () => {
  return (
    <FontStyles>
      <ProductStylesheet />
      <SectionContainer>
        <SectionTitle>Our Products</SectionTitle>
        <ProductsGrid>
          {PRODUCTS_DATA.map((product, index) => (
            <ProductItem key={index} product={product} />
          ))}
        </ProductsGrid>
      </SectionContainer>
    </FontStyles>
  );
};

export default ProductsList;