"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import PodcastCarousel from "./PodcastCarousel";

const SpaceHero = () => {
  return (
    <div className="relative h-screen xl:h-[130vh] 2xl:h-screen max-w-[1440px] mx-auto w-full overflow-hidden">
      {/* Image Background */}
      <div className="absolute inset-0">
        {/* Desktop Image */}
        {/* <div className="hidden md:block relative w-full h-full">
          <Image
            src="/HeroSpace.png"
            alt="Hero Space Background"
            fill
            className="object-cover mix-blend-screen"
            priority
          />
        </div> */}

        <video
          autoPlay
          loop
          muted
          playsInline
          style={{
            aspectRatio: "11.5/9",
          }}
          className="absolute min-w-full min-h-full w-auto h-auto max-w-none 
        top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
        pointer-events-none z-[1] mix-blend-screen md:block hidden"
        >
          <source src="/HeroSpace.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute my-auto top-0 bottom-0
        pointer-events-none z-[1] mix-blend-screen block md:hidden"
        >
          <source src="/HeroSpace.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Mobile Image */}
        {/* <div className="block md:hidden relative w-full h-full">
          <Image
            src="/HeroSpaceMWeb.png"
            alt="Hero Space Background Mobile"
            fill
            className="object-contain mix-blend-screen my-auto"
            sizes="100vw"
            priority
            style={{
              objectPosition: "center center",
            }}
          />
        </div> */}
      </div>

      {/* Text Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="absolute xl:top-[425px] lg:top-[50%] xl:left-[100px] left-[32px] flex flex-col md:gap-[23.31px] gap-3 z-10 uppercase
        md:translate-y-0 top-1/2 -translate-y-1/2 mix-blend-difference"
      >
        {/* Desktop Text */}
        <h1 className="hidden md:block font-druk text-[177.8px] font-medium leading-[132px] text-left text-[#3246DC] uppercase">
          OMNIA.SPACE
        </h1>
        <h1 className="hidden md:block font-druk text-[177.8px] font-medium leading-[132px] text-left text-[#3246DC] uppercase">
          AI PODCAST
        </h1>

        {/* Mobile Text */}
        <h1 className="md:hidden block font-druk absolute top-[80px] text-[60px] font-medium leading-[54px] text-left text-[#3246DC] w-[295px] h-[99px] uppercase">
          OMNIA.SPACE
          <br />
          AI PODCAST
        </h1>
      </motion.div>
      <div className="absolute hidden sm:block top-[182px] xl:right-[152px] right-[20px] w-[318px] h-[310px] z-20">
        <PodcastCarousel />
      </div>

      {/* <div className="absolute md:top-[180px] md:right-[88px] md:h-[490px] hidden md:flex flex-col gap-2 w-[2px] z-10">
        <div className="w-[2px] h-[2px] bg-[#3246DC]" />
        <div>
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "40px" }}
            transition={{ duration: 1 }}
            className="w-[2px] bg-[#3246DC]"
          />
          <div className="w-[2px] h-[398px] bg-[#3246DC] opacity-10" />
        </div>
        <div className="w-[2px] h-[2px] bg-[#3246DC]" />
      </div>

      <div className="absolute top-[128px] right-[32px] md:hidden flex flex-col gap-2 w-[2px] z-10 h-[calc(100vh-260px)]">
        <div className="w-[2px] h-[2px] bg-[#3246DC]" />
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: "40px" }}
          transition={{ duration: 1 }}
          className="w-[2px] bg-[#3246DC]"
        />
        <div className="w-[2px] h-full bg-[#3246DC] opacity-10" />
        <div className="w-[2px] h-[2px] bg-[#3246DC]" />
      </div> */}
    </div>
  );
};

export default SpaceHero;
