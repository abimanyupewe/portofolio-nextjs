"use client";

import React, { useState } from "react";
import AboutPhoto from "@/app/components/home/AboutPhoto";
import { motion } from "motion/react";
import { Copy, Check, ArrowUpRight } from "lucide-react";

interface Profile {
    full_name: string | null;
    bio: string | null;
    avatar_url: string | null;
    avatar_manga_url?: string | null;
    taglines: string[] | null;
}

interface AboutSectionProps {
    profile: Profile | null;
}

const contacts = [
    { key: "email", label: "Email", value: "abimanyupw369@gmail.com", href: "mailto:abimanyupw369@gmail.com" },
    { key: "phone", label: "Phone", value: "+62 857-9145-7210", href: "tel:+6285791457210" },
    { key: "whatsapp", label: "WhatsApp", value: "+62 819-9671-9560", href: "https://wa.me/6281996719560" },
];

const reveal = {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
};

const AboutSection: React.FC<AboutSectionProps> = ({ profile }) => {
    const [copied, setCopied] = useState<string | null>(null);

    const copy = async (key: string, value: string) => {
        try {
            await navigator.clipboard.writeText(value);
            setCopied(key);
            setTimeout(() => setCopied((c) => (c === key ? null : c)), 2000);
        } catch {
            // clipboard blocked (e.g. insecure context): the value is still a selectable link
        }
    };

    const fullName = profile?.full_name || "Abimanyu Priyo Widagdo";
    const [first, ...rest] = fullName.split(" ");

    return (
        <section id="about" className="relative overflow-hidden bg-background py-24 md:py-32">
            <div className="container mx-auto px-4 md:px-8 lg:px-16">
                <div className="grid items-center gap-14 md:grid-cols-[5fr_7fr] lg:gap-24">
                    {/* Photo */}
                    <motion.div {...reveal} className="flex justify-center">
                        <AboutPhoto
                            name={fullName}
                            tagline={profile?.taglines?.[0]}
                            avatarUrl={profile?.avatar_url}
                            mangaUrl={profile?.avatar_manga_url}
                        />
                    </motion.div>

                    {/* Text */}
                    <div className="space-y-10 text-center md:text-left">
                        <motion.div {...reveal} className="space-y-5">
                            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">About me</p>
                            <h2 className="font-heading text-4xl font-light leading-[1.05] tracking-tight md:text-6xl">
                                {first}
                                {rest.length > 0 && <span className="italic text-muted-foreground"> {rest.join(" ")}</span>}
                            </h2>
                            <p className="mx-auto max-w-prose text-base leading-relaxed text-foreground/80 md:mx-0 md:text-lg">
                                {profile?.bio ||
                                    "I am a passionate software engineer dedicated to building high-quality digital experiences. My journey involves constant learning and applying modern technologies to solve real-world problems."}
                            </p>
                        </motion.div>

                        {/* Contact: plain rows separated by hairlines */}
                        <motion.div {...reveal} transition={{ ...reveal.transition, delay: 0.1 }}>
                            <p className="mb-4 text-xs uppercase tracking-[0.3em] text-muted-foreground">Get in touch</p>
                            <ul className="divide-y divide-border border-y border-border text-left">
                                {contacts.map((c) => (
                                    <li key={c.key} className="group flex items-center justify-between gap-4 py-4">
                                        <div className="flex min-w-0 flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-6">
                                            <span className="w-20 shrink-0 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                                                {c.label}
                                            </span>
                                            <a
                                                href={c.href}
                                                {...(c.key === "whatsapp" ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                                                className="inline-flex min-w-0 items-center gap-1 truncate text-base transition-colors hover:text-muted-foreground"
                                            >
                                                <span className="truncate">{c.value}</span>
                                                <ArrowUpRight
                                                    size={14}
                                                    className="shrink-0 opacity-0 transition-opacity group-hover:opacity-60"
                                                />
                                            </a>
                                        </div>
                                        <button
                                            onClick={() => copy(c.key, c.value)}
                                            aria-label={`Copy ${c.label}`}
                                            className="flex shrink-0 items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
                                        >
                                            {copied === c.key ? (
                                                <>
                                                    <Check size={14} /> Copied
                                                </>
                                            ) : (
                                                <>
                                                    <Copy size={14} /> Copy
                                                </>
                                            )}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
