"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const S = styled.span`
  font-family: "Montserrat";
  font-weight: 500;
`;

// Logo dimensions for better performance
const LOGO_WIDTH = 220;
const LOGO_HEIGHT = 85;

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  // Set mounted state to true after component mounts to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    
    // Prevent scrolling when menu is open
    if (typeof document !== 'undefined') {
      document.body.style.overflow = !isOpen ? 'hidden' : '';
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  // Close menu when route changes and restore scrolling
  useEffect(() => {
    setIsOpen(false);
    if (typeof document !== 'undefined') {
      document.body.style.overflow = '';
    }
  }, [pathname]);

  // Animation variants for menu items
  const menuItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: i => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut" // Fixed the cubic-bezier issue
      }
    })
  };
  
  const mobileMenuVariants = {
    hidden: { 
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    visible: { 
      opacity: 1,
      height: scrolled ? "calc(100vh - 7vh)" : "calc(100vh - 10vh)",
      transition: {
        duration: 0.5,
        ease: "easeInOut",
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  // Only render dynamic content after mounting to prevent hydration mismatch
  if (!mounted) {
    return (
      <nav className="fixed top-0 left-0 w-full px-[5%] flex items-center justify-between z-[1000] bg-white/95 h-[10vh]">
        <div className="w-8 h-8"></div>
        <div className="h-[100px] flex items-center justify-center">
          <Link href="/" className="transition-all duration-300 transform hover:scale-105">
            <div className="relative w-[160px] h-[62px] lg:w-[220px] lg:h-[85px]">
              <Image 
                src="/images/Frozengate-01.svg"
                alt="Frozengate Logo" 
                fill
                priority
                sizes="(max-width: 768px) 160px, 220px"
                className="object-contain drop-shadow-sm"
                style={{ 
                  maxWidth: '100%'
                }}
              />
            </div>
          </Link>
        </div>
        <ul className="hidden lg:flex flex-row gap-8 ml-auto">
          {[
            { path: '/', label: 'Home' },
            { path: '/about', label: 'About' },
            { path: '/ProductsPage', label: 'Products' },
            { path: '/Agronomy', label: 'Agronomy' },
            { path: '/Quality', label: 'Quality' },
            { path: '/Process', label: 'Process' },
            { path: '/Contact', label: 'Contact us' }
          ].map((item, index) => (
            <li key={index} className="text-left">
              <Link 
                href={item.path} 
                className={`font-montserrat relative inline-block group transition-colors duration-300 px-3 py-2
                  ${pathname === item.path 
                    ? 'text-primary font-semibold' 
                    : 'text-black hover:text-primary'
                  }
                  text-base
                `}
              >
                <span className="relative z-10">{item.label}</span>
                <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-primary transform 
                  ${pathname === item.path ? 'scale-x-100' : 'scale-x-0'} 
                  transition-transform duration-500 ease-in-out`}>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    );
  }

  return (
    <nav className={`
      fixed top-0 left-0 w-full px-[5%] 
      flex items-center justify-between z-[1000]
      transition-all duration-300 ease-in-out
      ${scrolled ? 'glass-effect shadow-lg h-[7vh]' : 'bg-white/95 h-[10vh]'}
    `}>
      {/* Mobile Menu Toggle with animation */}
      <motion.button 
        className="flex flex-col gap-1.5 cursor-pointer lg:hidden z-50"
        onClick={toggleMenu}
        aria-label="Toggle menu"
        whileTap={{ scale: 0.9 }}
      >
        <motion.span 
          className={`block w-8 h-0.5 bg-primary transition-all duration-300 transform ${isOpen ? 'rotate-45 translate-y-2' : ''}`}
          initial={false}
        />
        <motion.span 
          className={`block w-8 h-0.5 bg-primary transition-opacity duration-300 ${isOpen ? 'opacity-0' : 'opacity-100'}`}
          initial={false}
        />
        <motion.span 
          className={`block w-8 h-0.5 bg-primary transition-all duration-300 transform ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}
          initial={false}
        />
      </motion.button>

      {/* Logo */}
      <div className={`
        transition-all duration-300 flex items-center justify-center 
        ${scrolled ? 'h-[70px]' : 'h-[110px]'}
        absolute left-1/2 transform -translate-x-1/2 lg:static lg:translate-x-0
      `}>
        <Link href="/" className="relative group">
          <motion.div
            className="absolute inset-0 bg-primary/5 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"
            initial={false}
            animate={{ scale: 0 }}
            whileHover={{ scale: 1.2 }}
          />
      <motion.div 
            className={`
              relative
              ${scrolled ? 'w-[130px] h-[50px] lg:w-[160px] lg:h-[62px]' : 'w-[160px] h-[62px] lg:w-[220px] lg:h-[85px]'}
              transition-all duration-300
            `}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
            whileHover={{ 
              scale: 1.05,
              filter: "drop-shadow(0px 4px 6px rgba(95, 180, 70, 0.25))"
            }}
      >
            <Image 
            src="/images/Frozengate-01.svg"
            alt="Frozengate Logo" 
              fill
              priority
              sizes="(max-width: 768px) 160px, 220px"
              className="object-contain drop-shadow-md relative z-10"
              quality={90}
          />
          </motion.div>
        </Link>
      </div>

      {/* Desktop Navigation */}
      <motion.ul 
        className="hidden lg:flex flex-row gap-8 ml-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, staggerChildren: 0.1 }}
      >
        {[
          { path: '/', label: 'Home' },
          { path: '/about', label: 'About' },
          { path: '/ProductsPage', label: 'Products' },
          { path: '/Agronomy', label: 'Agronomy' },
          { path: '/Quality', label: 'Quality' },
          { path: '/Process', label: 'Process' },
          { path: '/Contact', label: 'Contact us' }
        ].map((item, index) => (
          <motion.li 
            key={index} 
            className="text-left"
            custom={index}
            variants={menuItemVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link 
              href={item.path} 
              className={`font-montserrat relative inline-block group transition-colors duration-300 px-3 py-2
                ${pathname === item.path 
                  ? 'text-primary font-semibold' 
                  : 'text-black hover:text-primary'
                }
                ${scrolled ? 'text-sm' : 'text-base'}
              `}
            >
              <span className="relative z-10">{item.label}</span>
              <span 
                className={`
                  absolute bottom-0 left-0 w-full h-0.5 bg-primary transform 
                  ${pathname === item.path 
                    ? 'scale-x-100 opacity-100 nav-underline-active' 
                    : 'scale-x-0 opacity-0 origin-right group-hover:scale-x-100 group-hover:opacity-100 group-hover:origin-left'
                  } 
                  transition-all duration-500 ease-out
                  after:absolute after:inset-0 after:opacity-0 after:rounded-full
                  after:shadow-[0_0_8px_1px_rgba(95,180,70,0.8)] after:transition-opacity
                  after:duration-300 group-hover:after:opacity-100
                `}
                style={{
                  boxShadow: pathname === item.path ? '0 0 8px 1px rgba(95,180,70,0.5)' : 'none'
                }}
              >
              </span>
            </Link>
          </motion.li>
        ))}
      </motion.ul>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={`lg:hidden fixed inset-0 ${scrolled ? 'top-[7vh]' : 'top-[10vh]'} bg-white/95 backdrop-blur-md z-40 overflow-hidden`}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={mobileMenuVariants}
          >
            <motion.div
              className="absolute top-0 left-0 w-full h-16 flex justify-center items-center"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="relative w-[120px] h-[47px]">
                <Image 
                  src="/images/Frozengate-01.svg"
                  alt="Frozengate Logo" 
                  fill
                  className="object-contain opacity-10"
                />
              </div>
            </motion.div>
            <motion.ul 
              className="flex flex-col items-center justify-center h-full gap-6 p-6"
            >
              {[
                { path: '/', label: 'Home' },
                { path: '/about', label: 'About' },
                { path: '/ProductsPage', label: 'Products' },
                { path: '/Agronomy', label: 'Agronomy' },
                { path: '/Quality', label: 'Quality' },
                { path: '/Process', label: 'Process' },
                { path: '/Contact', label: 'Contact us' }
              ].map((item, index) => (
                <motion.li 
                  key={index} 
                  className="text-center w-full"
                  custom={index}
                  variants={menuItemVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link 
                    href={item.path} 
                    className={`font-montserrat relative inline-block group transition-colors duration-300 px-4 py-3 text-xl
                      ${pathname === item.path 
                        ? 'text-primary font-semibold' 
                        : 'text-black hover:text-primary'
                      }
                    `}
                    onClick={toggleMenu}
                  >
                    <span className="relative z-10">{item.label}</span>
                    <span 
                      className={`
                        absolute bottom-0 left-0 w-full h-0.5 bg-primary transform 
                        ${pathname === item.path 
                          ? 'scale-x-100 opacity-100 nav-underline-active' 
                          : 'scale-x-0 opacity-0 origin-right group-hover:scale-x-100 group-hover:opacity-100 group-hover:origin-left'
                        } 
                        transition-all duration-500 ease-out
                        after:absolute after:inset-0 after:opacity-0 after:rounded-full
                        after:shadow-[0_0_8px_1px_rgba(95,180,70,0.8)] after:transition-opacity
                        after:duration-300 group-hover:after:opacity-100
                      `}
                    >
                    </span>
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navigation;
