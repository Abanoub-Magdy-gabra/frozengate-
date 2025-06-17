import React, { useState } from 'react';
import styled from 'styled-components';

// Styled Components
const Container = styled.div`
  max-width: 64rem;
  margin: 0 auto;
  padding: 1.5rem;
  font-family: 'Montserrat', sans-serif;
`;

const PageTitle = styled.h1`
  font-size: 32px;
  color: black;
  font-weight: 700;
  margin-bottom: 1rem;
`;

const SectionContainer = styled.div`
  margin-bottom: 5rem;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 2.5rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`;

const SectionDescription = styled.p`
  font-size: 0.875rem;
  color: #4b5563;
  margin: 0 auto;
  max-width: 32rem;
`;

const GridLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const StepsContainer = styled.div`
  background-color: #f9fafb;
  border-radius: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const StepHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem;
  cursor: pointer;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #f3f4f6;
  }
`;

const StepTitle = styled.span`
  font-size: 1rem;
`;

const IconContainer = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 9999px;
  background-color: black;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// Fixed: Create two separate styled components instead of using props
const StepIconBase = styled.svg`
  width: 1.5rem;
  height: 1.5rem;
  color: white;
  transition: transform 0.3s;
`;

const StepIconExpanded = styled(StepIconBase)`
  transform: rotate(180deg);
`;

const StepIconCollapsed = styled(StepIconBase)`
  transform: rotate(0);
`;

const StepDescription = styled.div`
  padding: 0 1.5rem 1rem 1.5rem;
  font-size: 0.875rem;
  color: #4b5563;
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const ImageWrapper = styled.div`
  width: 100%;
  overflow: hidden;
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
`;

const Image = styled.img`
  width: 100%;
  height: 19rem;
  object-fit: cover;
  Background-position:center center;

`;

// Process Section Component
const ProcessSection = ({ title, description, steps, activeStep, setActiveStep, imageAlt, imageSrc }) => {
  // Function to render the appropriate icon based on active state
  const renderStepIcon = (isActive) => {
    const IconComponent = isActive ? StepIconExpanded : StepIconCollapsed;
    
    return (
      <IconComponent
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12 15.5L6 9.5L7.4 8.1L12 12.7L16.6 8.1L18 9.5L12 15.5Z" fill="currentColor"/>
      </IconComponent>
    );
  };
  
  return (
    <SectionContainer>
      <SectionHeader>
        <SectionTitle>{title}</SectionTitle>
        <SectionDescription>{description}</SectionDescription>
      </SectionHeader>
      
      <GridLayout>
        {/* Left Column - Process Steps */}
        <div>
          <StepsContainer>
            {steps.map((step) => (
              <div key={step.id}>
                <StepHeader onClick={() => setActiveStep(step.id)}>
                  <StepTitle>{step.id}. {step.title}</StepTitle>
                  <IconContainer>
                    {renderStepIcon(activeStep === step.id)}
                  </IconContainer>
                </StepHeader>
                
                {/* Description that shows only when step is active */}
                {activeStep === step.id && step.description && (
                  <StepDescription>{step.description}</StepDescription>
                )}
              </div>
            ))}
          </StepsContainer>
        </div>
        
        {/* Right Column - Image */}
        <ImageContainer>
          <ImageWrapper>
            <Image src={imageSrc} alt={imageAlt} />
          </ImageWrapper>
        </ImageContainer>
      </GridLayout>
    </SectionContainer>
  );
};

const AgricultureMethods = () => {
  // States for active process steps
  const [activeMethodStep, setActiveMethodStep] = useState(3);
  const [activeSelectingStep, setActiveSelectingStep] = useState(3);
  const [activeWashingStep, setActiveWashingStep] = useState(null);
  const [activeFreezingStep, setActiveFreezingStep] = useState(null);
  const [activePackagingStep, setActivePackagingStep] = useState(null);
  
  // Data for all process steps
  const processData = [
    {
      id: "agricultural",
      title: "Our agricultural methods",
      description: "We blend tradition with innovation to create sustainable, high-yield farming practices that work in today's world.",
      steps: [
        { id: 1, title: "Assessment and Planning", description: "Our top priority is to meet our customer's needs, it is essential for us to manage our two-way communication system with both our customers and suppliers as well as the internal processes of production. The application of our quality management system and quality assurance program ensure the essence of company's quality and service." },
        { id: 2, title: "Crop Selection", description: "To guarantee the finest quality, we carefully select our fruits and vegetables based on strict criteria, including taste, texture, and nutritional value. We work closely with our trusted farmers and suppliers to ensure that only the best raw materials consistency and compliance with food safety standards." },
        { id: 3, title: "Harvesting", description: "Harvest is conducted when crops reach optimal maturity. Our experience and precision maximizes the nutrients and flavor of each harvest. We harvest at the ideal time to ensure the integrity of our produce, guaranteeing that what reaches your table will be presented with satisfaction in mind." }
      ],
      activeStep: activeMethodStep,
      setActiveStep: setActiveMethodStep,
      imageAlt: "Aerial view of agricultural fields with crop rows",
      imageSrc: "/images/one.jpg"
    },
    {
      id: "selecting",
      title: "Receiving & Selecting",
      description: "We blend tradition with innovation to create sustainable, high-yield farming practices that work in today's world.",
      steps: [
        { id: 1, title: "Quality Inspection", description: "Upon arrival at our facility, all raw materials undergo a strict quality inspection. Our expert team assesses each batch for size, ripeness, color, and overall condition, ensuring that only high-quality produce moves forward in the process. This step is essential for maintaining our commitment to excellence." },
        { id: 2, title: "Sorting by Category", description: "To ensure efficiency and product consistency, we implement a thorough sorting process. Fruits and vegetables are categorized based on quality specifications, with any damaged or unsuitable items removed. This guarantees that only the finest ingredients continue through the production line." },
        { id: 3, title: "Preliminary Cleaning", description: "Before entering the certified areas, all produce undergoes a strict cleaning process to eliminate potential contaminants. We carefully wash and inspect the fruits and vegetables for further processing." }
      ],
      activeStep: activeSelectingStep,
      setActiveStep: setActiveSelectingStep,
      imageAlt: "Fresh produce being sorted and selected",
      imageSrc: "/images/two.jpg"
    },
    {
      id: "washing",
      title: "Washing & Sorting",
      description: "We blend tradition with innovation to create sustainable, high-yield farming practices that work in today's world.",
      steps: [
        { id: 1, title: "Multi-Stage Washing", description: "Carefully we wash each fruit and vegetable through our multi-stage cleaning system to ensure that all dirt and potential contaminants are removed, while preserving the natural quality of our produce." },
        { id: 2, title: "Foreign Object Detection", description: "Hygiene and food safety are our top priorities. Our advanced multi-stage washing system ensures that all produce is thoroughly cleaned using filtered water and food-safe disinfectants. This process effectively removes any remaining impurities while maintaining the natural freshness of the products." },
        { id: 3, title: "Size & Weight Sorting", description: "We utilize state-of-the-art detection technology to identify and remove any unwanted materials, such as stems, stones, or foreign particles. This step ensures the highest level of purity and safety before freezing." }
      ],
      activeStep: activeWashingStep,
      setActiveStep: setActiveWashingStep,
      imageAlt: "Strawberries in water being washed",
      imageSrc: "/images/three.jpg"
    },
    {
      id: "freezing",
      title: "IQF Freezing",
      description: "We blend tradition with innovation to create sustainable, high-yield farming practices that work in today's world.",
      steps: [
        { id: 1, title: "Pre-Freezing Preparation", description: "To preserve quality and enhance shelf life, some products undergo pre-freezing treatments such as blanching. this step helps maintain the natural color, texture, and nutrients of fruits and vegetables, ensuring they retain their original characteristics even after freezing." },
        { id: 2, title: "Individual Quick Freezing", description: "Our IQF technology rapidly freezes each piece individually, preventing them from sticking together. This method preserves the fresh taste, texture, and nutritional value of our products while ensuring convenience for consumers and food manufactures." },
        { id: 3, title: "Temperature Control", description: "Throughout the freezing process, our expert technicians monitor temperature levels to ensure quality. Our precise freezing methods lock in nutrients and flavor, while preventing ice crystal formation that can damage the cellular structure of the foods." }
      ],
      activeStep: activeFreezingStep,
      setActiveStep: setActiveFreezingStep,
      imageAlt: "Frozen strawberries",
      imageSrc: "/images/four.jpg"
    },
    {
      id: "packaging",
      title: "Packaging & Shipping",
      description: "We blend tradition with innovation to create sustainable, high-yield farming practices that work in today's world.",
      steps: [
        { id: 1, title: "Grading for Freshness", description: "Our packaging process is designed to protect and preserve. We use high-quality, airtight materials that lock in freshness, prevent contamination, and extend the shelf life of our products. This ensures that our customers receive premium-quality frozen fruits and vegetables every time." },
        { id: 2, title: "Cold Chain Management", description: "Maintaining the integrity of our frozen products is crucial. We adhere to a strict cold chain management system, ensuring that all items remain at optimal temperatures from production to delivery. This guarantees that our products reach customers in perfect condition." },
        { id: 3, title: "Logistics & Distribution", description: "Our expert logistics team carefully plans each shipment to ensure timely and efficient deliveries. We work with reliable transportation partners to optimize routes, minimize delays, and maintain product quality." }
      ],
      activeStep: activePackagingStep,
      setActiveStep: setActivePackagingStep,
      imageAlt: "Cargo ship with shipping containers",
      imageSrc: "/images/five.jpg"
    }
  ];

  return (
    <Container>
      {/* Page Title */}
      <PageTitle>Our Process</PageTitle>
      
      {/* Render each process section */}
      {processData.map(section => (
        <ProcessSection 
          key={section.id}
          title={section.title}
          description={section.description}
          steps={section.steps}
          activeStep={section.activeStep}
          setActiveStep={section.setActiveStep}
          imageAlt={section.imageAlt}
          imageSrc={section.imageSrc}
        />
      ))}
    </Container>
  );
};

export default AgricultureMethods;