"use client";
import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Background from "./Background";
import BotList from "./BotList";

export default function Navigation({ isOpen }: { isOpen: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressBarContainerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(40);

  useEffect(() => {
    const container = containerRef.current;
    const progressContainer = progressBarContainerRef.current;
    if (!container || !progressContainer) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const progressBarHeight = progressContainer.clientHeight;

      // Calculate scroll percentage (0 to 1)
      const scrollPercentage = scrollTop / (scrollHeight - clientHeight);

      // Calculate height based on scroll percentage and actual container height
      const minHeight = 40;
      const maxHeight = progressBarHeight - 20; // Use actual progress bar container height

      // Ensure we reach maximum height when fully scrolled
      const newHeight =
        scrollPercentage === 1
          ? maxHeight
          : minHeight + (maxHeight - minHeight) * scrollPercentage;

      setScrollProgress(Math.min(maxHeight, newHeight));
    };

    // Handle window resize
    const handleResize = () => {
      handleScroll();
    };

    container.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    // Initial calculation
    handleScroll();

    return () => {
      container.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: "100%" }}
      animate={{
        opacity: isOpen ? 1 : 0,
        y: isOpen ? 0 : "100%",
      }}
      transition={{
        type: "spring",
        stiffness: 100, // Reduced from 300
        damping: 25, // Reduced from 30
        mass: 1.2, // Added mass for slower movement
      }}
      className="fixed inset-0 z-[150]"
    >
      {/* Background for Navigation */}
      <div className="absolute inset-0">
        <Background />
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full h-full">
        {/* Fixed Progress Bar for Mobile */}
        <div className="md:hidden fixed right-[32px] top-[180px] z-20 h-[calc(100vh-260px)]">
          <div
            ref={progressBarContainerRef}
            className="flex flex-col h-full gap-2 w-[2px]"
          >
            <div className="w-[2px] h-[2px] bg-[#3246DC]" />
            <div className="flex-1 relative">
              <div className="w-[2px] h-full bg-[#3246DC] opacity-10" />
              <motion.div
                className="w-[2px] bg-[#3246DC] absolute top-0"
                animate={{ height: scrollProgress }}
                transition={{ type: "spring", stiffness: 30, damping: 15 }}
              />
            </div>
            <div className="w-[2px] h-[2px] bg-[#3246DC]" />
          </div>
        </div>

        {/* Scrollable Container */}
        <div
          ref={containerRef}
          className="h-[calc(100vh-126px)] xl:h-[calc(130vh-126px)] 2xl:h-[calc(100vh-126px)] mt-[126px] overflow-y-auto scrollbar-hide"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <div className="max-w-[1440px] mx-auto pl-[32px] pr-[48px] px-10 xl:px-[90px] mb-[140px] md:mb-8">
            <BotList scaleY={scrollProgress} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
