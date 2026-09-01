import type { Metadata } from "next";
import { Syne, Space_Grotesk, Indie_Flower } from "next/font/google";
import "./globals.css";
import Preloader from "@/app/components/ui/Preloader";

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const indieFlower = Indie_Flower({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-indie-flower",
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
      <body className={`${syne.variable} ${spaceGrotesk.variable} ${indieFlower.variable} font-sans antialiased`}>
        <Preloader />
        {children}
      </body>
    </html>
  );
}

