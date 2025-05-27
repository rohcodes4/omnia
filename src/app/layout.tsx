import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Source_Code_Pro } from "next/font/google";
import { NavigationProvider } from "@/context/NavigationContext";
import Header from "@/components/Header";
import NextTopLoader from "nextjs-toploader";
import Background from "@/components/Background";
import { PrivyProvider } from "@/providers/PrivyProvider";

const Druk = localFont({
  src: "./fonts/Druk-Medium-Trial.otf",
  variable: "--font-druk",
  weight: "500",
  display: "swap",
});

const source_Code_Pro = Source_Code_Pro({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-source-code-pro",
  weight: ["400", "500", "700"],
  fallback: ["system-ui", "arial"], // Add fallback fonts
});

export const metadata: Metadata = {
  title: "OMNIA",
  description: "Access The AI OF THE Future",
  icons: {
    icon: [
      {
        url: "/favicon.ico",
      },
      {
        url: "/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        url: "/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
    ],
    apple: {
      url: "/apple-touch-icon.png",
    },
    other: [
      {
        rel: "manifest",
        url: "/site.webmanifest",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${Druk.variable} ${source_Code_Pro.variable} antialiased`}
      >
        <PrivyProvider>
          <NavigationProvider>
            <NextTopLoader />
            <Background />
            <div className="min-h-screen">
              <Header />
              {children}
            </div>
          </NavigationProvider>
        </PrivyProvider>
      </body>
    </html>
  );
}
