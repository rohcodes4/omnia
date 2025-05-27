"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [text, setText] = useState("");
  const fullText = "WELCOME TO OMNIA";
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setTimeout(() => {
          onComplete();
        }, 1000);
      }
    }, 100);

    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);

    return () => {
      clearInterval(typingInterval);
      clearInterval(cursorInterval);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex items-center justify-center bg-[#161938] z-[2000]"
    >
      {/* Gradient Layer */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(17,17,17,0.2)_0%,rgba(17,17,17,1)_100%)] bg-cover pointer-events-none z-[3]" />

      {/* Mathematics Layer */}
      <div
        className="absolute top-0 left-0 w-[200%] h-[200%] bg-[url('/images/Mathematics.png')] bg-repeat bg-left-top 
        opacity-100 pointer-events-none z-[2] origin-top-left scale-50 mix-blend-color-dodge"
      />

      {/* Dust Layer */}
      <div
        className="absolute top-0 left-0 w-[160%] h-[160%] bg-[url('/images/Dust.png')] bg-repeat bg-left-top 
        opacity-50 pointer-events-none z-[1] origin-top-left scale-[0.6246]"
      />

      {/* Welcome Text */}
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative z-[5] font-source-code-pro text-base font-medium leading-6 tracking-[0.2em] text-center w-[500px] text-[#3246DC]"
      >
        {text}
        <span
          className={`${
            showCursor ? "opacity-100" : "opacity-0"
          } transition-opacity`}
        >
          █
        </span>
      </motion.h1>
    </motion.div>
  );
};

export default SplashScreen;
