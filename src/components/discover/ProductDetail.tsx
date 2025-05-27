"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

interface Feature {
  icon: string;
  text: string;
}

interface Product {
  id: number;
  title: string;
  description: string;
  features: Feature[];
}

const products: Product[] = [
  {
    id: 1,
    title: "The Synthetic Minds",
    description:
      "An advanced AI agent specializing in creating thought-provoking podcast content from written materials. Perfect for educational content, research papers, and in-depth articles.",
    features: [
      {
        icon: "/icons/discover1.svg",
        text: "Web articles to podcast conversion",
      },
      {
        icon: "/icons/discover2.svg",
        text: "Multiple language support",
      },
    ],
  },
  {
    id: 2,
    title: "The AI Duo",
    description:
      "A dynamic pair of AI agents that transform video content into engaging podcast episodes. Ideal for YouTube content creators and video marketers.",
    features: [
      {
        icon: "/icons/discover3.svg",
        text: "YouTube to podcast conversion",
      },
      {
        icon: "/icons/discover4.svg",
        text: "Cross-language adaptation",
      },
    ],
  },
];

const ProductDetail = () => {
  const router = useRouter();

  return (
    <div className="max-w-[1440px] w-full xl:h-[calc(140vh-120px)] 2xl:h-[calc(110vh-120px)] relative mx-auto md:pt-[133px] pt-[100px] md:px-8 px-4 xl:px-[100px] overflow-visible md:overflow-hidden flex flex-col gap-10">
      {/* Background Image Container */}
      <div className="absolute top-0 inset-0">
        {/* Desktop Image */}
        <div className="hidden md:block relative w-full h-full xl:h-[130vh] 2xl:h-screen">
          {/* <div className="max-w-[733px] absolute -top-[50px] w-full h-full right-0 max-h-screen mix-blend-screen">
            <Image
              src="/Discover.gif"
              alt="Hero Space Background"
              fill
              className="object-cover"
              priority
            />
          </div> */}
          <video
            autoPlay
            loop
            muted
            playsInline
            style={{
              aspectRatio: "8.5/9",
            }}
            className="max-w-[733px] absolute  w-full h-full right-0 max-h-screen mix-blend-screen  min-w-full min-h-full 
      left-[350px]
        pointer-events-none z-[1] md:block hidden"
          >
            <source src="/Discover.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      <div className="relative">
        <motion.button
          onClick={() => router.back()}
          className="flex items-center gap-3 group relative z-20"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            src="/icons/BackIcon.svg"
            alt="Back"
            width={7}
            height={12}
            className="transform group-hover:translate-x-[-2px] transition-transform"
          />
          <span className="font-source-code-pro text-sm font-medium leading-[17.5px] text-[#638BEF]">
            Back
          </span>
        </motion.button>
      </div>

      <div className="flex flex-col md:pb-0 relative md:flex-col-reverse gap-10">
        {/* Mobile Image */}
        {/* <div className="block md:hidden absolute -top-[70px] w-full h-[363px] z-10 mix-blend-screen">
          <Image
            src="/DiscoverMweb.png"
            alt="Hero Space Background Mobile"
            fill
            className="object-contain"
            sizes="100vw"
            priority
            style={{
              objectPosition: "center center",
            }}
          />
        </div> */}

        <video
          autoPlay
          loop
          muted
          playsInline
          style={{
            aspectRatio: "8.5/9",
          }}
          className="block md:hidden absolute -top-[70px] w-full h-[363px] z-10 mix-blend-screen pointer-events-none"
        >
          <source src="/Discover.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Bottom Section - Moved to top for mobile */}
        <motion.div
          className="space-y-6 md:space-y-5 mt-[220px] md:mt-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h1 className="font-druk md:text-[177.8px] text-[177.8px] font-medium bg-blend-difference md:leading-[152px] leading-[132px] text-[#3246DC] uppercase">
            Omnia
          </h1>
          <p className="font-source-code-pro text-sm font-medium leading-[17.5px] text-[#638BEF] md:w-full w-[318px]">
            Introducing Omnia, the ultimate AI-powered podcast generator.
            Whether it&apos;s a blog, article, or news update, just upload your
            links, and let our advanced AI convert them into engaging,
            high-quality podcasts in minutes. Whether you&apos;re a content
            creator, marketer, or busy professional, Omnia lets you amplify your
            content&apos;s reach through the power of voice. Start your
            podcasting journey today with Omnia.
          </p>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          className="md:flex md:flex-row flex-col gap-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="md:w-[333px] w-full space-y-6 flex flex-col justify-between md:mb-0 mb-10"
            >
              <div className="flex flex-col gap-6">
                <h2 className="font-druk md:text-[60px] text-[36px] uppercase mix-blend-color-dodge font-medium md:leading-[60px] leading-[45px] text-[#3246DC]">
                  {product.title}
                </h2>
                <p className="font-source-code-pro text-sm font-medium leading-[17.5px] text-[#638BEF] md:w-[318px] w-full">
                  {product.description}
                </p>
              </div>
              <div className="space-y-1">
                {product.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-6 h-4 pr-2">
                      <Image src={feature.icon} alt="" width={16} height={16} />
                    </div>
                    <span className="font-source-code-pro text-sm font-medium leading-[17.5px] text-[#638BEF]">
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default ProductDetail;
