import { BackgroundLines } from "@/components/ui/ui/background-lines";
import { FlipWords } from "@/components/ui/ui/flip-words";
import React from "react";

const HeroSection = () => {
  const words = ["Web Development", "App Development", "UI/UX Design"];

  return (
    <BackgroundLines className="flex min-h-screen items-center justify-center w-full flex-col px-4">
      <div className="text-center">
        {/* Nama dan Tagline */}
        <div className="flex gap-2 items-center justify-center">
          <p className="text-xl lg:text-4xl">Hi! I'm </p>
          <div className="bg-gradient-to-r from-blue-100 to-violet-100 rounded-lg hover:from-blue-200 hover:to-violet-200 transition-all duration-500">
            <p className="text-xl lg:text-4xl border-l-4 border-blue-400 p-2 font-bold bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text font-ubuntu">
              Abimanyu Priyo Widagdo
            </p>
          </div>
        </div>
        <p className="mt-4 text-xl text-gray-600 max-w-[580px]">
          a passionate developer and designer specializing in{" "}
          <FlipWords className="font-semibold text-purple-500" words={words} />. nice to meet you, let's explore my portfolio.
        </p>
      </div>
    </BackgroundLines>
  );
};

export default HeroSection;
