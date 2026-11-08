import type { Metadata } from "next";
import Script from "next/script";
import { Fraunces, DM_Sans, Pixelify_Sans } from "next/font/google";
import "./globals.css";
import { siteUrl } from "@/lib/seo";

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
  metadataBase: siteUrl,
  title: "Abimanyu Priyo Widagdo — Fullstack Developer & QA Engineer",
  description: "Fullstack developer and QA engineer based in Malang, Indonesia. I build web and mobile apps, design interfaces, and test software quality.",
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    title: "Abimanyu Priyo Widagdo — Fullstack Developer & QA Engineer",
    description: "Fullstack developer and QA engineer based in Malang, Indonesia. I build web and mobile apps, design interfaces, and test software quality.",
    siteName: "Abimanyu",
    images: [{ url: "/icon.png", alt: "Abimanyu manga portrait" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Abimanyu Priyo Widagdo — Fullstack Developer & QA Engineer",
    description: "Fullstack developer and QA engineer based in Malang, Indonesia. I build web and mobile apps, design interfaces, and test software quality.",
    images: ["/icon.png"],
  },
  verification: process.env.NEXT_PUBLIC_GSC_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION }
    : undefined,
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
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');`}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}

