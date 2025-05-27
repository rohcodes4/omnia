"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

type SocialIcon = {
  id: number;
  iconSrc: string;
  href: string;
  label: string;
};

const socialIcons: SocialIcon[] = [
  {
    id: 1,
    iconSrc: "/icons/twitter.svg",
    href: "https://x.com/CastAI_",
    label: "Twitter",
  },
  {
    id: 2,
    iconSrc: "/icons/spotify.svg",
    href: "https://instagram.com",
    label: "Instagram",
  },
  {
    id: 3,
    iconSrc: "/icons/telegram.svg",
    href: "https://t.me/CastAI_Portal",
    label: "Github",
  },
  {
    id: 4,
    iconSrc: "/icons/dexscrener.svg",
    href: "https://linkedin.com",
    label: "LinkedIn",
  },
];

const FooterBottom = () => {
  return (
    <div className="w-full flex justify-center z-10 mt-10">
      <div className="w-full max-w-[1440px] md:h-[96px] h-full md:px-8 md:py-6 px-8 pb-8 flex md:flex-row flex-col-reverse md:justify-between justify-center items-start xl:items-center 2xl:items-start md:gap-0 gap-6">
        <motion.div
          className="flex md:flex-row flex-col items-center md:items-start md:gap-6 gap-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="font-source-code-pro md:text-[12.8px] text-[10px] font-medium md:leading-[17.92px] leading-[14px] tracking-[0.04em] text-left decoration-from-font no-ink-skip text-[#3246DC] hidden md:block">
            © Copyright 2025
          </p>
          <p className="font-source-code-pro md:text-[12.8px] text-[10px] font-medium md:leading-[17.92px] leading-[14px] tracking-[0.04em] text-left decoration-from-font no-ink-skip text-[#3246DC] max-w-[282px] md:max-w-none">
            ca: MJJ240EC2EHNCATISSEBUTHORYLEUUENAFVAPUMP
          </p>
        </motion.div>

        <motion.div
          className="flex items-center gap-8 w-max md:w-auto justify-between xl: md:justify-start"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {socialIcons.map(({ id, iconSrc, href, label }) => (
            <motion.a
              key={id}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-[18px] h-[18px] xl:w-[23px] xl:h-[23px] 2xl:w-[23px] 2xl:h-[23px] hover:text-[#3246DC] transition-colors duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label={label}
            >
              <Image
                src={iconSrc}
                alt={label}
                width={18}
                height={18}
                className="w-full h-full xl:w-[23px] xl:h-[23px] 2xl:w-[23px] 2xl:h-[23px] object-contain"
              />
            </motion.a>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default FooterBottom;
