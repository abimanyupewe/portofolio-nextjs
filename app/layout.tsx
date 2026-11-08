import type { Metadata } from "next";
import { Fraunces, DM_Sans, Pixelify_Sans } from "next/font/google";
import "./globals.css";
import Preloader from "@/app/components/ui/Preloader";

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

const pixelify = Pixelify_Sans({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-pixelify-sans",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Portofolio Abimanyu",
  description: "Created by Abim",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${fraunces.variable} ${dmSans.variable} ${pixelify.variable} font-sans antialiased`}>
        <Preloader />
        {children}
      </body>
    </html>
  );
}

