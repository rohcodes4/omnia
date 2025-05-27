"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Navigation from "./Navigation";
import { useNavigation } from "@/context/NavigationContext";
import Link from "next/link";
import CustomWalletButton from "./CustomWalletButton";
import { usePrivy, useSolanaWallets } from '@privy-io/react-auth';
import { useRouter, usePathname } from "next/navigation";

const Header = () => {
  const { shouldOpenNav, isNavOpen, setIsNavOpen, handleNavClose } =
    useNavigation();
  const [currentDateTime, setCurrentDateTime] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const { authenticated } = usePrivy();
  const { wallets } = useSolanaWallets();
  const activeWallet = wallets?.[0];
  const router = useRouter();
  const pathname = usePathname();
  const [showDropdown, setShowDropdown] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle forced open state from scroll
  useEffect(() => {
    if (shouldOpenNav) {
      setIsNavOpen(true);
    }
  }, [shouldOpenNav, setIsNavOpen]);

  const handleToggle = () => {
    const newState = !isNavOpen;
    setIsNavOpen(newState);
    if (!newState) {
      handleNavClose();
    }
  };

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        weekday: "long",
        day: "numeric",
        month: "long",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      const formattedDate = now
        .toLocaleDateString("en-US", options)
        .replace(",", "")
        .toUpperCase();
      setCurrentDateTime(formattedDate);
    };

    updateDateTime();
    const timer = setInterval(updateDateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Lock body scroll when navigation is open
  useEffect(() => {
    if (isNavOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isNavOpen]);
console.log({authenticated})
  return (
    <>
      <div
        className={`fixed top-0 left-0 right-0 w-full flex justify-center z-[1000] ${
          isScrolled ? "bg-[#111111E5] backdrop-blur-[10px]" : ""
        }`}
      >
        <div
          className={`w-full max-w-[1440px] md:h-[126px] px-4 md:px-8 py-6 flex justify-between items-center transition-all duration-300 `}
        >
          <motion.div
            className="flex items-center gap-2.5"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href={"/"}>
              <Image
                src="/logo.svg"
                alt="Logo"
                width={288}
                height={46}
                className="w-auto h-auto"
              />
            </Link>
          </motion.div>

          <motion.div
            className="hidden md:block"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="font-source-code-pro text-base font-light leading-6 tracking-[0.02em] text-center decoration-from-font no-ink-skip text-[#3246DC] px-2">
              {currentDateTime}
            </p>
          </motion.div>

          <motion.div
            className="flex items-center gap-3 md:gap-6 relative"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {authenticated && <button
            onClick={() => {
              router.push(`/space/podcast/${activeWallet?.address}`);
              setShowDropdown(false);
            }}
            className={`hidden xl:block absolute top-0 right-[110%] w-max px-4 py-[10px] border-[#3246DC] border-2 rounded-md text-center text-sm ${
              pathname?.includes('/space/podcast') 
                ? 'bg-[#3246DC] text-[#111111]' 
                : 'text-[#3246DC] hover:bg-gray-100 dark:text-[#3246DC] dark:hover:bg-[#3246dc28]'
            } font-source-code-pro font-bold`}
          >
            My Podcasts
          </button>}
            <CustomWalletButton />
            <div className="relative w-[28px] h-[24px]">
              <button
                onClick={handleToggle}
                className="w-full h-full flex flex-col justify-between cursor-pointer"
                type="button"
                aria-label="Menu"
              >
                <motion.span
                  className="block h-[2px] w-full bg-[#3246DC] origin-center"
                  animate={
                    isNavOpen
                      ? {
                          rotate: 45,
                          y: 11,
                          width: "100%",
                        }
                      : {
                          rotate: 0,
                          y: 0,
                          width: "100%",
                        }
                  }
                  transition={{ duration: 0.3 }}
                />
                <motion.span
                  className="block h-[2px] w-full bg-[#3246DC]"
                  animate={
                    isNavOpen
                      ? {
                          opacity: 0,
                          x: -20,
                        }
                      : {
                          opacity: 1,
                          x: 0,
                        }
                  }
                  transition={{ duration: 0.3 }}
                />
                <motion.span
                  className="block h-[2px] w-full bg-[#3246DC] origin-center"
                  animate={
                    isNavOpen
                      ? {
                          rotate: -45,
                          y: -11,
                          width: "100%",
                        }
                      : {
                          rotate: 0,
                          y: 0,
                          width: "100%",
                        }
                  }
                  transition={{ duration: 0.3 }}
                />
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {isNavOpen && <Navigation isOpen={isNavOpen} />}
    </>
  );
};

export default Header;
