"use client";
import React from "react";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <div className="relative h-screen xl:h-[130vh] 2xl:h-screen max-w-[1440px] mx-auto w-full overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          aspectRatio: "8.5/9",
        }}
        className="absolute min-w-full min-h-full w-auto h-auto max-w-none 
        top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
        pointer-events-none z-[1] mix-blend-screen lg:block hidden"
      >
        <source src="/Hero.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute my-auto top-0 bottom-0
        pointer-events-none z-[1] mix-blend-screen block lg:hidden"
      >
        <source src="/HeroMWeb.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Text Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="absolute xl:top-[50%] lg:top-1/3 md:top-[30%]
        xl:left-[100px] md:left-[20px] left-[32px] 
        flex flex-col md:gap-[23.31px] gap-3 z-10 uppercase
        md:-translate-y-1/2 top-1/2 -translate-y-1/2 mix-blend-difference"
      >
        {/* Desktop Text */}
        <h1 className="hidden lg:block font-druk text-[177.8px] font-medium leading-[132px] text-left text-[#3246DC] w-[348px] uppercase">
          ACCESS
        </h1>
        <h1 className="hidden lg:block font-druk text-[177.8px] font-medium leading-[132px] text-left text-[#3246DC] w-[959px] uppercase">
          THE AI OF THE FUTURE
        </h1>

        {/* Tablet Text */}
        <h1 className="hidden md:block lg:hidden font-druk text-[120px] font-medium leading-[100px] text-left text-[#3246DC] w-full uppercase">
          ACCESS
          <br />
          THE AI OF
          <br />
          THE FUTURE
        </h1>

        {/* Mobile Text */}
        <h1 className="md:hidden block font-druk text-[60px] font-medium leading-[54px] text-left text-[#3246DC] w-[295px] h-[99px] uppercase">
          Access The
          <br />
          AI OF THE Future
        </h1>
      </motion.div>
    </div>
  );
};

export default Hero;
