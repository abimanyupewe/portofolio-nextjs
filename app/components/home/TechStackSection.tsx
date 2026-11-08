"use client";

import React from "react";
import Image from "next/image";
import { motion } from "motion/react";

interface Skill {
    id: string;
    name: string;
    icon_url: string;
}

interface TechStackSectionProps {
    skills?: Skill[];
}

// One marquee row. Two identical halves + gap-4 match the global `scroll` keyframe (-50% - 0.5rem).
const Row = ({ skills, reverse, duration }: { skills: Skill[]; reverse?: boolean; duration: number }) => {
    // enough copies per half that the row always overflows wide screens
    const half = Array.from({ length: Math.max(1, Math.ceil(10 / skills.length)) }, () => skills).flat();
    const items = [...half, ...half];

    return (
        <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
            <ul
                className="flex w-max animate-scroll gap-4 hover:[animation-play-state:paused] motion-reduce:animate-none"
                style={
                    {
                        "--animation-duration": `${duration}s`,
                        "--animation-direction": reverse ? "reverse" : "forwards",
                    } as React.CSSProperties
                }
            >
                {items.map((s, i) => (
                    <li
                        key={`${s.id}-${i}`}
                        aria-hidden={i >= half.length ? true : undefined}
                        className="group flex shrink-0 items-center gap-3 px-6 py-3"
                    >
                        <Image
                            src={s.icon_url}
                            alt={i < half.length ? s.name : ""}
                            width={36}
                            height={36}
                            className="h-9 w-9 object-contain opacity-60 grayscale transition duration-300 group-hover:opacity-100 group-hover:grayscale-0"
                        />
                        <span className="whitespace-nowrap text-sm uppercase tracking-[0.2em] text-muted-foreground transition-colors group-hover:text-foreground">
                            {s.name}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

const TechStackSection = ({ skills = [] }: TechStackSectionProps) => {
    if (!skills || skills.length === 0) return null;

    // second row runs the other way, in a different order so the rows never mirror each other
    const second = [...skills].reverse();

    return (
        <section id="skills" className="relative overflow-hidden bg-background py-20 md:py-28">
            <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="mx-auto mb-14 max-w-6xl space-y-4 px-6 md:px-8"
            >
                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Tech stack</p>
                <h2 className="font-heading text-4xl font-light leading-[1.05] tracking-tight md:text-6xl">
                    Tools I <span className="italic text-muted-foreground">work with</span>
                </h2>
            </motion.div>

            <div className="space-y-2 border-y border-border py-4">
                <Row skills={skills} duration={60} />
                {skills.length > 4 && <Row skills={second} reverse duration={75} />}
            </div>
        </section>
    );
};

export default TechStackSection;
