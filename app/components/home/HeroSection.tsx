"use client";

// import { BackgroundLines } from "@/components/ui/ui/background-lines";
import { FlipWords } from "@/components/ui/ui/flip-words";
import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface Profile {
  full_name: string;
  taglines: string[];
  bio: string;
}

interface HeroSectionProps {
  profile?: Profile;
}

const HeroSection: React.FC<HeroSectionProps> = ({ profile }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);

  const defaultWords = ["Web Development", "App Development", "UI/UX Design"];
  const words = profile?.taglines && profile.taglines.length > 0 ? profile.taglines : defaultWords;
  const name = profile?.full_name || "Abimanyu Priyo Widagdo";

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.from(nameRef.current, {
      y: 100,
      opacity: 0,
      duration: 1,
      ease: "power4.out",
    })
      .from(taglineRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      }, "-=0.5");

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="h-screen w-full dark:bg-black bg-white dark:bg-grid-small-white/[0.2] bg-grid-small-black/[0.2] relative flex items-center justify-center transition-colors duration-300">
      {/* Grid Pattern using pure CSS for safety if Tailwind plugins are missing */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #80808033 1px, transparent 1px), linear-gradient(to bottom, #80808033 1px, transparent 1px)`,
          backgroundSize: '100px 100px'
        }}
      />
      {/* Radial Mask */}
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

      <div className="z-10 relative w-full max-w-7xl flex flex-col items-center justify-center">
        {/* Text Content */}
        <div className="md:text-center space-y-6">
          <h1 ref={nameRef} className="text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter text-gray-900 dark:text-white leading-[0.9]">
            {name.split(" ").map((word, i) => (
              <span key={i} className="block">{word}</span>
            ))}
          </h1>

          <div ref={taglineRef} className="text-2xl md:text-3xl text-gray-600 dark:text-gray-400 font-medium pt-4">
            Passionate in {" "}
            <FlipWords className="flex-wrap font-bold text-emerald-500 dark:text-emerald-400" words={words} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
