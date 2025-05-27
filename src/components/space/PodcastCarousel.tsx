/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

type PodcastSlide = {
  id: number;
  title: string;
  description: string;
  features: {
    icon: string;
    text: string;
  }[];
};

const podcastSlides: PodcastSlide[] = [
  {
    id: 1,
    title: "The Synthetic Minds",
    description:
      "An advanced AI agent specializing in creating thought-provoking podcast content from written materials. Perfect for educational content, research papers, and in-depth articles.",
    features: [
      {
        icon: "/icons/feature1.svg",
        text: "Web articles to podcast conversion",
      },
      {
        icon: "/icons/feature2.svg",
        text: "Multiple language support",
      },
    ],
  },
  {
    id: 1,
    title: "The AI Duo",
    description:
      "A dynamic pair of AI agents that transform video content into engaging podcast episodes. Ideal for YouTube content creators and video marketers.",
    features: [
      {
        icon: "/icons/feature3.svg",
        text: "YouTube to podcast conversion",
      },
      {
        icon: "/icons/feature4.svg",
        text: "Cross-language adaptation",
      },
    ],
  },
];

const PodcastCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const router = useRouter();

  // Updated variants for smoother transitions
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 500 : -500,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 500 : -500,
      opacity: 0,
      scale: 0.9,
    }),
  };

  // Updated transition configuration
  const slideTransition = {
    x: {
      type: "spring",
      stiffness: 200, // Reduced for smoother movement
      damping: 25, // Adjusted for better bounce
      mass: 0.5, // Added mass for more natural feel
    },
    opacity: {
      duration: 0.1, // Increased duration
    },
    scale: {
      duration: 0.1, // Match opacity duration
    },
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) return podcastSlides.length - 1;
      if (nextIndex >= podcastSlides.length) return 0;
      return nextIndex;
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="h-full relative"
    >
      {/* Navigation Arrows */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="flex items-center mb-6 gap-6"
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => paginate(-1)}
          className="w-4 h-4 flex items-center justify-center"
        >
          <Image
            src="/icons/ArrowLeft.svg"
            alt="Previous"
            width={16}
            height={16}
            className="transition-opacity"
          />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => paginate(1)}
          className="w-4 h-4 flex items-center justify-center"
        >
          <Image
            src="/icons/ArrowRight.svg"
            alt="Next"
            width={16}
            height={16}
            className="transition-opacity"
          />
        </motion.button>
      </motion.div>

      {/* Carousel Content */}
      <div className="h-[310px] relative">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={slideTransition}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.7}
            onDragEnd={(e: any, { offset, velocity }: any) => {
              const swipe = swipePower(offset.x, velocity.x);
              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
            className="absolute inset-0 w-full"
          >
            <motion.h2 className="font-druk text-[36px] uppercase font-medium mix-blend-color-dodge leading-[45px] text-[#3246DC] mb-6">
              {podcastSlides[currentIndex].title}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-source-code-pro text-sm font-medium leading-[17.5px] text-[#638BEF] mb-6"
            >
              {podcastSlides[currentIndex].description}
            </motion.p>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-1 mb-6"
            >
              {podcastSlides[currentIndex].features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Image src={feature.icon} alt="" width={16} height={16} />
                  <span className="font-source-code-pro text-sm font-medium leading-[17.5px] text-[#638BEF]">
                    {feature.text}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dot Indicators */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="absolute bottom-0 left-[10px] -translate-x-1/2 flex gap-2"
        role="group"
        aria-label="Podcast slides navigation"
      >
        {podcastSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
            aria-label={`Go to slide ${index + 1}${
              index === currentIndex ? " (current slide)" : ""
            }`}
            aria-current={index === currentIndex ? "true" : undefined}
            className={`w-[5px] h-[5px] rounded-full ${
              index === currentIndex
                ? "bg-[#638BEF]"
                : "bg-[#638BEF] opacity-20"
            }`}
          />
        ))}
      </motion.div>

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        onClick={() => router.push("/space/discover")}
        className="font-source-code-pro z-[100] absolute -bottom-12 text-base font-medium leading-6 tracking-[0.02em] text-[#638BEF] border-b-2 border-[#638BEF] pb-2 hover:opacity-80 transition-opacity"
      >
        Discover More
      </motion.button>
    </motion.div>
  );
};

export default PodcastCarousel;
