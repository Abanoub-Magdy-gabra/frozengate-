"use client";
import React, { useState } from 'react';

const ExpandableSection = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="max-w-[930px] mx-auto p-5 grid grid-cols-2 gap-8 items-start">
      <div className="max-w-[800px] bg-gray-50 rounded-3xl shadow-sm overflow-hidden transition-all duration-300">
        <div 
          className="flex items-center justify-between p-1 bg-gray-50 hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <h1 className="font-['Montserrat'] text-xl leading-[24px]">
            1. Assessment and Planning
          </h1>
          <svg 
            className={`w-6 h-6 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M24 12C24.0001 10.4241 23.6898 8.86364 23.0867 7.40769C22.4837 5.95175 21.5998 4.62885 20.4855 3.51453C19.3712 2.40021 18.0482 1.5163 16.5923 0.913271C15.1364 0.310245 13.5759 -8.60537e-05 12 -5.06826e-07C5.37288 -7.96507e-07 1.67252e-06 5.37223 1.38281e-06 12C1.0931e-06 18.6278 5.37288 24 12 24C18.6271 24 24 18.6265 24 12ZM11.0046 16.3149L5.59387 10.9042C5.4691 10.7794 5.37013 10.6313 5.3026 10.4682C5.23507 10.3052 5.20032 10.1305 5.20032 9.95404C5.20032 9.77758 5.23507 9.60285 5.3026 9.43983C5.37013 9.27681 5.4691 9.12868 5.59387 9.00391C5.71865 8.87914 5.86677 8.78016 6.0298 8.71264C6.19282 8.64511 6.36755 8.61035 6.544 8.61035C6.72046 8.61035 6.89519 8.64511 7.05821 8.71264C7.22123 8.78016 7.36936 8.87914 7.49413 9.00391L11.9863 13.4954L16.4804 9.00587C16.6052 8.8811 16.7533 8.78212 16.9164 8.71459C17.0794 8.64707 17.2541 8.61231 17.4306 8.61231C17.607 8.61231 17.7818 8.64707 17.9448 8.71459C18.1078 8.78212 18.2559 8.8811 18.3807 9.00587C18.5055 9.13064 18.6045 9.27876 18.672 9.44179C18.7395 9.60481 18.7743 9.77954 18.7743 9.956C18.7743 10.1325 18.7395 10.3072 18.672 10.4702C18.6045 10.6332 18.5055 10.7813 18.3807 10.9061L12.97 16.3168C12.7045 16.5688 12.3524 16.7093 11.9863 16.7093C11.6202 16.7093 11.2681 16.5688 11.0026 16.3168L11.0046 16.3149Z" 
              fill="black"
            />
          </svg>
        </div>
        <div 
          className={`transition-all duration-300 ${
            isExpanded 
              ? 'px-6 pb-6 min-h-[500px] block' 
              : 'h-0 overflow-hidden'
          }`}
        >
          <p className="leading-relaxed">
            Our top priority is to meet our customer's needs, it is essential for us to manage our two-way communication system with both our customers and suppliers as well as the internal processes of production. The application of our quality management system and quality assurance program ensure the essence of company's quality and service.
          </p>
        </div>
      </div>
      <div className="right-column">
        <img 
          src="/api/placeholder/400/320" 
          alt="Right column image" 
          className="w-full rounded-xl shadow-md"
        />
      </div>
    </div>
  );
};

export default ExpandableSection;