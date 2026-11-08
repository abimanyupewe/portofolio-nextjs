"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { motion, MotionConfig } from "motion/react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

// Heavy (three.js / icons): fetched only when their tab is opened.
const Lanyard = dynamic(() => import("@/components/Lanyard"), { ssr: false });
const ProfileCard = dynamic(() => import("@/components/ProfileCard"), { ssr: false });

interface AboutPhotoProps {
  name: string;
  tagline?: string;
  avatarUrl?: string | null;
  mangaUrl?: string | null;
}

const tabs = ["Portrait", "Profile Card", "Lanyard"] as const;
type Tab = (typeof tabs)[number];

const AboutPhoto: React.FC<AboutPhotoProps> = ({ name, tagline, avatarUrl, mangaUrl }) => {
  const [tab, setTab] = useState<Tab>("Portrait");
  const { resolvedTheme } = useTheme();
  const manga = mangaUrl || "/avatar-manga.png";

  return (
    <div className="flex w-full flex-col items-center gap-6">
      <div className="flex h-[440px] w-full max-w-sm items-center justify-center md:h-[480px]">
        {tab === "Portrait" && (
          // Manga by default; real photo reveals on hover/focus. Only opacity+transform animate.
          <MotionConfig reducedMotion="user" transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
            <motion.div
              tabIndex={0}
              initial="rest"
              animate="rest"
              whileHover="hover"
              whileFocus="hover"
              className="relative aspect-[3/4] w-64 overflow-hidden rounded-lg border-4 border-gray-100 shadow-xl outline-none dark:border-zinc-800 md:w-80"
            >
              <motion.div
                className="absolute inset-0 will-change-transform"
                variants={{ rest: { opacity: 1, scale: 1 }, hover: { opacity: 0, scale: 1.06 } }}
              >
                <Image src={manga} alt={name} fill sizes="(min-width: 768px) 320px, 256px" className="object-cover object-top" />
              </motion.div>
              {avatarUrl && (
                <motion.div
                  className="absolute inset-0 will-change-transform"
                  variants={{ rest: { opacity: 0, scale: 1.1 }, hover: { opacity: 1, scale: 1 } }}
                >
                  <Image src={avatarUrl} alt={`${name} (photo)`} fill sizes="(min-width: 768px) 320px, 256px" className="object-cover object-top" />
                </motion.div>
              )}
            </motion.div>
          </MotionConfig>
        )}

        {tab === "Profile Card" && (
          <ProfileCard
            avatarUrl={manga}
            name={name}
            title={tagline || "Software Engineer"}
            handle="abimanyupewe"
            status="Open to work"
            statusColor="#8F8C86"
            contactText="Contact"
            onContactClick={() => (window.location.href = "mailto:abimanyupw369@gmail.com")}
            theme={resolvedTheme === "light" ? "light" : "dark"}
          />
        )}

        {tab === "Lanyard" && (
          <Lanyard
            frontImage={manga}
            backImage={avatarUrl || undefined}
            cardColor="#E8E3D9"
            strapColor="#8F8C86"
            orientation="portrait"
          />
        )}
      </div>

      <div role="tablist" aria-label="Photo style" className="flex gap-6">
        {tabs.map((t) => (
          <button
            key={t}
            role="tab"
            aria-selected={tab === t}
            onClick={() => setTab(t)}
            className={cn(
              "relative text-xs uppercase tracking-[0.2em] transition-colors duration-200 hover:text-foreground",
              "after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:bg-foreground after:transition-transform after:duration-200",
              tab === t ? "text-foreground after:scale-x-100" : "text-muted-foreground after:scale-x-0"
            )}
          >
            {t}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AboutPhoto;
