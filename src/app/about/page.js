"use client";

import React from 'react';
import Navigation from '../components/Nav';
import Footer from '../components/Footer';
import AboutUs from '../components/about';
import Cursor from '../components/Cursor';
import ScrollProgressBar from '../components/ScrollProgressBar';
import ParallaxBackground from '../components/ParallaxBackground';

export default function AboutPage() {
  return (
    <>
      <Cursor />
      <ScrollProgressBar />
      
      <ParallaxBackground>
        <div className="min-h-screen overflow-x-hidden">
          <div className="flex flex-col min-h-screen">
            <Navigation />
            
            <main className="flex-grow pt-[10vh]">
              <AboutUs />
            </main>

            <Footer className="mt-auto" />
          </div>
        </div>
      </ParallaxBackground>
    </>
  );
} 