'use client';

import Image from "next/image";
import Navbar from "./components/Navbar";
import HeroSection from "./components/home/HeroSection";
import SkilsSection from "./components/home/SkilsSection";
import { CounterSection } from "./components/home/props/CounterSection";
import Project from "./components/home/Project";
import Footer from "./components/Footer";
import ExperienceSection from "./components/home/ExperienceSection";
import SertificateSection from "./components/home/project/SertificateSection";

export default function Home() {
  const counters = [
    { end: 20, label: "Total Projects" },
    { end: 3, label: "Years Experience" },
  ];

  return (
    <div>
      <Navbar />
      <HeroSection />
      <CounterSection counters={counters} />
      <SkilsSection />
      <Project />
      <ExperienceSection />
      <SertificateSection />
      <Footer />
    </div>
  );
}
