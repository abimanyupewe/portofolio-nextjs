"use client";

import { FlipWords } from "@/components/ui/ui/flip-words";
import { Spotlight } from "@/components/ui/spotlight";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface Profile {
  full_name: string;
  taglines: string[];
  bio: string;
}

interface HeroSectionProps {
  profile?: Profile;
}

/**
 * Hero Section — Centered editorial (charcoal + cream)
 * Spotlight (Aceternity) → serif name (TextGenerateEffect) → FlipWords tagline → CTA
 */
const HeroSection: React.FC<HeroSectionProps> = ({ profile }) => {
  const containerRef = useRef<HTMLElement>(null);

  const defaultWords = ["Web Development", "App Development", "UI/UX Design"];
  const words =
    profile?.taglines && profile.taglines.length > 0
      ? profile.taglines
      : defaultWords;

  const fullName = profile?.full_name || "Abimanyu Priyo Widagdo";

  useGSAP(
    () => {
      gsap.from(".hero-fade", {
        y: 24,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.15,
        delay: 0.6,
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-background flex items-center justify-center transition-colors duration-300"
    >
      {/* fill=currentColor: charcoal glow in light mode, cream glow in dark mode */}
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20 text-black dark:text-white"
        fill="currentColor"
      />

      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 md:px-8 text-center space-y-8">
        <p className="hero-fade font-sans text-xs uppercase tracking-[0.3em] text-muted-foreground">
          Portfolio
        </p>

        {/* TextGenerateEffect renders divs/spans per word; keep a real h1 for SEO & screen readers */}
        <h1 className="sr-only">{fullName}</h1>
        <div aria-hidden>
          <TextGenerateEffect
            words={fullName}
            className="font-heading font-light text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[1.05] text-balance"
          />
        </div>

        <div className="hero-fade font-sans text-lg md:text-xl text-muted-foreground">
          Passionate in{" "}
          <FlipWords
            className="font-heading italic text-foreground"
            words={words}
          />
        </div>

        <div className="hero-fade flex items-center justify-center gap-4 pt-2">
          <Link
            href="#project"
            className="inline-flex items-center justify-center rounded-full bg-foreground px-8 py-3.5 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-background transition hover:opacity-85 active:scale-[0.98]"
          >
            View Projects
          </Link>
          <Link
            href="#about"
            aria-label="Contact me"
            className="inline-flex size-12 items-center justify-center rounded-full border border-border text-foreground transition hover:bg-foreground hover:text-background active:scale-[0.98]"
          >
            <ArrowRight className="size-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
