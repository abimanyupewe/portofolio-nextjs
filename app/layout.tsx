import type { Metadata } from "next";
import { Fraunces, DM_Sans, Pixelify_Sans } from "next/font/google";
import "./globals.css";

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
  title: "Abimanyu — Fullstack Developer & QA Engineer",
  description: "Portfolio of Abimanyu, a fullstack developer and QA engineer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${fraunces.variable} ${dmSans.variable} ${pixelify.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}

