"use client";

import { FlipWords } from "@/components/ui/ui/flip-words";
import LetterGlitch from "@/components/LetterGlitch";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
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
 * LetterGlitch (React Bits) background → serif name (TextGenerateEffect) → FlipWords tagline → CTA
 */
const HeroSection: React.FC<HeroSectionProps> = ({ profile }) => {
  const containerRef = useRef<HTMLElement>(null);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const dark = resolvedTheme !== "light";

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
      className="relative min-h-screen w-full overflow-hidden bg-background flex items-center justify-center py-28 transition-colors duration-300"
    >
      {/* key remounts the canvas when the theme flips; render after mount to avoid SSR/theme mismatch */}
      {mounted && (
        <div
          key={dark ? "dark" : "light"}
          aria-hidden
          className="pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black_65%,transparent)]"
        >
          <LetterGlitch
            lightMode={!dark}
            glitchColors={dark ? ["#efe8da", "#8a8478"] : ["#1c1c1c", "#6f6a60"]}
            baseColor={dark ? "#efe8da" : "#1c1c1c"}
            baseOpacity={0.1}
            centerFade={0.6}
            edgeFade={0.3}
          />
        </div>
      )}

      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 md:px-8 text-center space-y-8">
        {/* TextGenerateEffect renders divs/spans per word; keep a real h1 for SEO & screen readers */}
        <h1 className="sr-only">{fullName}</h1>
        <div aria-hidden>
          <TextGenerateEffect
            words={fullName}
            className="font-heading font-light text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[1.05] text-balance"
          />
        </div>

        <div className="hero-fade font-sans text-base md:text-lg text-muted-foreground">
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
            className="group inline-flex items-center gap-2 px-4 py-3.5 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground transition hover:text-foreground"
          >
            About me
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
