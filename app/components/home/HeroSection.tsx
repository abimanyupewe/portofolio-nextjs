import { BackgroundLines } from "@/components/ui/ui/background-lines";
import { FlipWords } from "@/components/ui/ui/flip-words";
import React from "react";

interface Profile {
  full_name: string;
  taglines: string[];
  bio: string;
}

interface HeroSectionProps {
  profile?: Profile;
}

const HeroSection: React.FC<HeroSectionProps> = ({ profile }) => {
  const defaultWords = ["Web Development", "App Development", "UI/UX Design"];
  const words = profile?.taglines && profile.taglines.length > 0 ? profile.taglines : defaultWords;
  const name = profile?.full_name || "Abimanyu Priyo Widagdo";

  return (
    <BackgroundLines className="flex min-h-screen items-center justify-center w-full flex-col px-4 bg-white dark:bg-black transition-colors duration-300">
      <div className="text-center">
        {/* Nama dan Tagline */}
        <div className="flex gap-2 items-center justify-center">
          <p className="text-xl lg:text-4xl text-gray-900 dark:text-white">Hi! I'm </p>
          <div className="bg-gradient-to-r from-blue-100 to-violet-100 dark:from-blue-900/30 dark:to-violet-900/30 rounded-lg hover:from-blue-200 hover:to-violet-200 dark:hover:from-blue-800/40 dark:hover:to-violet-800/40 transition-all duration-500">
            <p className="text-xl lg:text-4xl border-l-4 border-blue-400 p-2 font-bold bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text font-ubuntu">
              {name}
            </p>
          </div>
        </div>
        <div className="mt-4 text-xl text-gray-600 dark:text-gray-400 max-w-[580px]">
          {profile?.bio ? (
             <>
               {profile.bio}
             </>
          ) : (
            <>
            a passionate developer and designer specializing in{" "}
            <FlipWords className="font-semibold text-purple-500" words={words} />. nice to meet you, let's explore my portfolio.
            </>
          )}
        </div>
      </div>
    </BackgroundLines>
  );
};

export default HeroSection;
