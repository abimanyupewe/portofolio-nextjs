"use client";

import { FlipWords } from "@/components/ui/ui/flip-words";
import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Link from "next/link";

interface Profile {
  full_name: string;
  taglines: string[];
  bio: string;
}

interface HeroSectionProps {
  profile?: Profile;
}

/**
 * Hero Section — Centered Typographic Layout (Opsi A)
 *
 * Layout minimalis centered dengan hierarki:
 * Nama (2 baris, "ABIM" highlighted) → FlipWords Tagline → 2 CTA Buttons
 *
 * Background: clean solid (no grid pattern)
 * Animation: GSAP stagger timeline
 */
const HeroSection: React.FC<HeroSectionProps> = ({ profile }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const defaultWords = ["Web Development", "App Development", "UI/UX Design"];
  const words =
    profile?.taglines && profile.taglines.length > 0
      ? profile.taglines
      : defaultWords;

  // Split nama jadi 2 baris: Nama depan + sisa (full, tanpa singkatan)
  const fullName = profile?.full_name || "Abimanyu Priyo Widagdo";
  const nameParts = fullName.split(" ");
  const restName = nameParts.slice(1).join(" ");

  const underlineRef = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(nameRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
      })
        .from(
          taglineRef.current,
          {
            y: 30,
            opacity: 0,
            duration: 0.8,
          },
          "-=0.4"
        )
        .from(
          ctaRef.current,
          {
            y: 20,
            opacity: 0,
            duration: 0.7,
          },
          "-=0.3"
        );

      // Infinite loop animation untuk underline (Draw-in -> Hold -> Wipe-out -> Repeat)
      const underlineTl = gsap.timeline({ repeat: -1, repeatDelay: 0.5 });
      underlineTl
        .fromTo(
          underlineRef.current,
          { scaleX: 0, transformOrigin: "left center" },
          { scaleX: 1, duration: 1.2, ease: "power2.inOut" }
        )
        .to(underlineRef.current, {
          scaleX: 0,
          duration: 0.8,
          ease: "power2.inOut",
          transformOrigin: "right center",
          delay: 2,
        });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="h-screen w-full bg-white dark:bg-black flex items-center justify-center transition-colors duration-300"
    >
      <div className="w-full max-w-4xl mx-auto px-6 md:px-8">
        <div className="text-center space-y-8">
          {/* Name — 2 lines, "ABIM" highlighted with animated underline */}
          <h1
            ref={nameRef}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-black uppercase tracking-tighter text-black dark:text-white leading-[0.9]"
          >
            <span className="block">
              <span className="relative inline-block group cursor-default">
                <span>ABIM</span>
                {/* Animated Wavy/Sleek Underline */}
                <svg
                  ref={underlineRef}
                  className="absolute -bottom-2 left-0 w-full h-3 text-black dark:text-white overflow-visible"
                  viewBox="0 0 100 12"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M 0 6 Q 25 1, 50 6 T 100 6"
                    stroke="currentColor"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <span>ANYU</span>
            </span>
            <span className="block">{restName}</span>
          </h1>

          {/* FlipWords Tagline */}
          <div
            ref={taglineRef}
            className="text-lg md:text-xl lg:text-2xl text-gray-500 dark:text-gray-400 font-normal"
          >
            Passionate in{" "}
            <FlipWords
              className="font-bold text-black dark:text-white"
              words={words}
            />
          </div>

          {/* CTA Buttons */}
          <div
            ref={ctaRef}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-4"
          >
            <Link
              href="#project"
              className="inline-flex items-center justify-center px-8 py-3 text-sm font-semibold bg-black text-white dark:bg-white dark:text-black rounded-md transition-all duration-200 hover:opacity-80 active:scale-[0.98] w-full sm:w-auto"
            >
              View Projects
            </Link>
            <Link
              href="#about"
              className="inline-flex items-center justify-center px-8 py-3 text-sm font-semibold border border-gray-300 dark:border-zinc-700 text-black dark:text-white rounded-md transition-all duration-200 hover:bg-gray-50 dark:hover:bg-zinc-900 active:scale-[0.98] w-full sm:w-auto"
            >
              Contact Me
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
