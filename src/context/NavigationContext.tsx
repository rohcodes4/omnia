"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { usePathname } from "next/navigation";

interface NavigationContextType {
  shouldOpenNav: boolean;
  isNavOpen: boolean;
  setShouldOpenNav: (value: boolean) => void;
  setIsNavOpen: (value: boolean) => void;
  handleNavClose: () => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(
  undefined
);

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [shouldOpenNav, setShouldOpenNav] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const pathname = usePathname();

  const handleNavClose = () => {
    setIsNavOpen(false);
    setShouldOpenNav(false);
  };

  useEffect(() => {
    if (shouldOpenNav) {
      setIsNavOpen(true);
    }
  }, [shouldOpenNav]);

  useEffect(() => {
    // Only add scroll/touch listeners if we're on the home page and nav is not open
    if (!isNavOpen && pathname === "/") {
      let touchStart = 0;
      let isSwiping = false;

      const handleWheel = (e: WheelEvent) => {
        if (e.deltaY > 0 && !isSwiping) {
          setShouldOpenNav(true);
          isSwiping = true;
        }
      };

      const handleTouchStart = (e: TouchEvent) => {
        touchStart = e.touches[0].clientY;
      };

      const handleTouchMove = (e: TouchEvent) => {
        if (!isSwiping && touchStart > e.touches[0].clientY + 50) {
          setShouldOpenNav(true);
          isSwiping = true;
        }
      };

      const handleTouchEnd = () => {
        setTimeout(() => {
          isSwiping = false;
        }, 100);
      };

      window.addEventListener("wheel", handleWheel, { passive: true });
      window.addEventListener("touchstart", handleTouchStart, {
        passive: true,
      });
      window.addEventListener("touchmove", handleTouchMove, { passive: true });
      window.addEventListener("touchend", handleTouchEnd);

      return () => {
        window.removeEventListener("wheel", handleWheel);
        window.removeEventListener("touchstart", handleTouchStart);
        window.removeEventListener("touchmove", handleTouchMove);
        window.removeEventListener("touchend", handleTouchEnd);
      };
    }
  }, [isNavOpen, pathname]); // Added pathname to dependencies

  return (
    <NavigationContext.Provider
      value={{
        shouldOpenNav,
        isNavOpen,
        setShouldOpenNav,
        setIsNavOpen,
        handleNavClose,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error("useNavigation must be used within a NavigationProvider");
  }
  return context;
}
