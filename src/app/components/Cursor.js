"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const Cursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);
  const [hidden, setHidden] = useState(false);
  const cursorRef = useRef(null);
  const cursorOuterRef = useRef(null);

  useEffect(() => {
    // Client-side only code
    if (typeof document === 'undefined') return;
    
    const mMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const mDown = () => {
      setClicked(true);
      setTimeout(() => setClicked(false), 300);
    };

    const mLeave = () => {
      setHidden(true);
    };

    const mEnter = () => {
      setHidden(false);
    };

    const handleLinkHoverStart = () => setLinkHovered(true);
    const handleLinkHoverEnd = () => setLinkHovered(false);

    document.addEventListener("mousemove", mMove);
    document.addEventListener("mousedown", mDown);
    document.addEventListener("mouseleave", mLeave);
    document.addEventListener("mouseenter", mEnter);

    const linkElements = document.querySelectorAll("a, button, input, textarea, [role='button']");
    linkElements.forEach((link) => {
      link.addEventListener("mouseenter", handleLinkHoverStart);
      link.addEventListener("mouseleave", handleLinkHoverEnd);
    });

    return () => {
      document.removeEventListener("mousemove", mMove);
      document.removeEventListener("mousedown", mDown);
      document.removeEventListener("mouseleave", mLeave);
      document.removeEventListener("mouseenter", mEnter);
      
      linkElements.forEach((link) => {
        link.removeEventListener("mouseenter", handleLinkHoverStart);
        link.removeEventListener("mouseleave", handleLinkHoverEnd);
      });
    };
  }, []);

  const variants = {
    default: {
      x: position.x - 6,
      y: position.y - 6,
      opacity: hidden ? 0 : 1
    },
    clicked: {
      height: 12,
      width: 12,
      backgroundColor: "var(--primary-dark)"
    },
    hovered: {
      height: 24,
      width: 24,
      x: position.x - 12,
      y: position.y - 12,
      backgroundColor: "rgba(34, 197, 94, 0.15)",
      mixBlendMode: "difference"
    }
  };

  const outerVariants = {
    default: {
      x: position.x - 24,
      y: position.y - 24,
      opacity: hidden ? 0 : 0.5
    },
    clicked: {
      height: 80,
      width: 80,
      x: position.x - 40,
      y: position.y - 40,
      opacity: 0.15
    },
    hovered: {
      height: 64,
      width: 64,
      x: position.x - 32,
      y: position.y - 32,
      opacity: 0.3,
      backgroundColor: "rgba(34, 197, 94, 0.1)",
      transition: { duration: 0.2 }
    }
  };

  return (
    <>
      <motion.div
        ref={cursorRef}
        className="cursor-dot z-[9999] fixed top-0 left-0 w-3 h-3 rounded-full bg-primary-500 pointer-events-none"
        variants={variants}
        animate={clicked ? "clicked" : linkHovered ? "hovered" : "default"}
        transition={{
          type: "spring",
          damping: 25,
          stiffness: 300,
          mass: 0.5
        }}
      />
      <motion.div
        ref={cursorOuterRef}
        className="cursor-outline z-[9998] fixed top-0 left-0 w-12 h-12 rounded-full border border-primary-400 bg-primary-50 bg-opacity-10 pointer-events-none"
        variants={outerVariants}
        animate={clicked ? "clicked" : linkHovered ? "hovered" : "default"}
        transition={{
          type: "spring",
          damping: 25,
          stiffness: 120,
          mass: 0.8
        }}
      />
    </>
  );
};

export default Cursor; 