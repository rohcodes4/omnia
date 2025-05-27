/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useRef } from "react";
import { motion } from "framer-motion";

type Bot = {
  id: number;
  title: string;
  description: string;
  link: string;
};

const bots: Bot[] = [
  {
    id: 1,
    title: "PODCAST",
    description:
      "An AI agent creates engaging podcasts from written materials. Ideal for education, research, and articles.",
    link: "/space",
  },
  {
    id: 2,
    title: "BOT",
    description:
      "A conversational AI designed to engage in meaningful dialogues, offering insightful responses and maintaining context throughout discussions.",
    link: "/",
  },
  {
    id: 3,
    title: "CRYPTO",
    description:
      "A conversational AI designed to engage in meaningful dialogues, offering insightful responses and maintaining context throughout discussions.",
    link: "/",
  },
];

const BotList = ({ scaleY }: any) => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const scrollRef = useRef(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  return (
    <motion.div
      className="relative w-full flex gap-10 xl:gap-[86px]"
      ref={scrollRef}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Bot List */}
      <div className="w-full mx-auto">
        {bots.map((bot) => (
          <motion.div
            key={bot.id}
            variants={itemVariants}
            onMouseEnter={() => setHoveredId(bot.id)}
            onMouseLeave={() => setHoveredId(null)}
            className={`w-full pb-6 border-b pt-10 md:pt-[80px] border-[#3246DC] transition-all duration-300 
              ${hoveredId && hoveredId !== bot.id ? "md:blur-[2px]" : ""}`}
            style={{
              filter: hoveredId && hoveredId !== bot.id ? "blur(2px)" : "none",
            }}
          >
            <div className="flex md:flex-row flex-col md:justify-between md:items-start items-start gap-4">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className={`font-druk max-w-[500px] w-full md:text-[177.8px] text-[60px] font-medium md:leading-[132px] leading-[54px]
                ${hoveredId === bot.id ? "text-[#3246DC]" : "text-transparent"}
                `}
                style={
                  hoveredId === bot.id
                    ? {}
                    : { WebkitTextStroke: "2px #3246DC" }
                }
              >
                {bot.title}
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="font-source-code-pro md:text-base text-xs font-medium md:leading-6 leading-[15px] text-[#638BEF] md:max-w-[469px] w-full max-w-[258px]"
              >
                {bot.description}
              </motion.p>

              {bot.id === 1 ? (
                <motion.a
                  href={bot.link}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-4 py-2 border rounded-[4px] transition-colors duration-300 self-start
      ${
        hoveredId === bot.id
          ? "border-[#3246DC] bg-[#3246DC]"
          : "border-[#638BEF] bg-transparent"
      }`}
                >
                  <span
                    className={`font-source-code-pro text-base font-medium leading-6 tracking-[0.02em] 
      ${hoveredId === bot.id ? "text-[#111111]" : "text-[#638BEF]"}`}
                  >
                    Start
                  </span>
                </motion.a>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="self-start"
                >
                  <span className="font-source-code-pro cursor-default whitespace-nowrap text-base font-medium leading-6 tracking-[0.02em] text-[#638BEF]">
                    Coming Soon...
                  </span>
                </motion.div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Desktop Progress Bar */}
      <motion.div
        className="py-7 hidden md:block"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="h-[calc(100%-3.5rem)] flex flex-col gap-2 w-[2px] z-10">
          <div className="w-[2px] h-[2px] bg-[#3246DC]" />
          <div className="h-full relative">
            <div className="w-[2px] h-full bg-[#3246DC] opacity-10" />
            <motion.div
              className="w-[2px] bg-[#3246DC] absolute top-0"
              style={{
                height: scaleY,
              }}
            />
          </div>
          <div className="w-[2px] h-[2px] bg-[#3246DC]" />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default BotList;
