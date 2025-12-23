"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Mail, Copy, Check, Phone } from "lucide-react";

// WhatsApp Icon Component
const WhatsappIcon = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
    >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
);

interface Profile {
    full_name: string | null;
    bio: string | null;
    avatar_url: string | null;
    taglines: string[] | null;
}

interface AboutSectionProps {
    profile: Profile | null;
}

const AboutSection: React.FC<AboutSectionProps> = ({ profile }) => {
    const [copiedEmail, setCopiedEmail] = useState(false);
    const [copiedPhone, setCopiedPhone] = useState(false);
    const [copiedWhatsapp, setCopiedWhatsapp] = useState(false);

    const handleCopyEmail = () => {
        navigator.clipboard.writeText("abimanyupw369@gmail.com");
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 2000);
    };

    const handleCopyPhone = () => {
        navigator.clipboard.writeText("+62 857-9145-7210");
        setCopiedPhone(true);
        setTimeout(() => setCopiedPhone(false), 2000);
    };

    const handleCopyWhatsapp = () => {
        navigator.clipboard.writeText("+62 819-9671-9560");
        setCopiedWhatsapp(true);
        setTimeout(() => setCopiedWhatsapp(false), 2000);
    };

    return (
        <section className="relative py-20 bg-white dark:bg-black transition-colors overflow-hidden" id="about">
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

            <div className="container relative z-10 mx-auto px-4 md:px-8 lg:px-16">
                <div className="flex flex-col md:flex-row items-center gap-12">
                    {/* Image Side */}
                    <div className="w-full md:w-1/3 flex justify-center">
                        <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden border-4 border-gray-100 dark:border-zinc-800 shadow-2xl">
                            {profile?.avatar_url ? (
                                <Image
                                    src={profile.avatar_url}
                                    alt={profile.full_name || "Profile"}
                                    fill
                                    className="object-cover"
                                />
                            ) : (
                                <div className="w-full h-full bg-gray-200 dark:bg-zinc-800 flex items-center justify-center">
                                    <span className="text-gray-400">No Avatar</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Text Side */}
                    <div className="w-full md:w-2/3 space-y-6 text-center md:text-left">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-emerald-500 dark:text-emerald-400 mb-2 font-ubuntu uppercase tracking-wide">
                                About Me
                            </h2>
                            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-2 font-ubuntu">
                                {profile?.full_name || "Abimanyu"}
                            </h1>
                        </div>

                        <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                            {profile?.bio ? (
                                <p>{profile.bio}</p>
                            ) : (
                                <p>
                                    I am a passionate software engineer dedicated to building high-quality digital experiences.
                                    My journey involves constant learning and applying modern technologies to solve real-world problems.
                                </p>
                            )}
                        </div>

                        {/* Copy Section */}
                        <div className="flex flex-col gap-2 pt-4 items-center md:items-start">
                            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Get in touch</p>
                            <div className="md:flex-wrap space-y-2 md:space-y-2 md:space-x-2 grid grid-cols-1 md:grid-cols-2">
                                {/* Email */}
                                <div className="flex items-center gap-3 bg-gray-50 dark:bg-zinc-900 w-fit p-2 pr-4 rounded-md border border-gray-100 dark:border-zinc-800">
                                    <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-md text-emerald-600 dark:text-emerald-400">
                                        <Mail size={18} />
                                    </div>
                                    <span className="text-gray-700 dark:text-gray-300 font-medium select-all">abimanyupw369@gmail.com</span>
                                    <button
                                        onClick={handleCopyEmail}
                                        className="ml-2 p-1.5 hover:bg-gray-200 dark:hover:bg-zinc-800 rounded-full transition-colors text-gray-500 dark:text-gray-400"
                                        title="Copy Email"
                                    >
                                        {copiedEmail ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} />}
                                    </button>
                                </div>

                                {/* Phone */}
                                <div className="flex items-center gap-3 bg-gray-50 dark:bg-zinc-900 w-fit p-2 pr-4 rounded-md border border-gray-100 dark:border-zinc-800">
                                    <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-md text-emerald-600 dark:text-emerald-400">
                                        <Phone size={18} />
                                    </div>
                                    <span className="text-gray-700 dark:text-gray-300 font-medium select-all">+62 857-9145-7210</span>
                                    <button
                                        onClick={handleCopyPhone}
                                        className="ml-2 p-1.5 hover:bg-gray-200 dark:hover:bg-zinc-800 rounded-full transition-colors text-gray-500 dark:text-gray-400"
                                        title="Copy Phone"
                                    >
                                        {copiedPhone ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} />}
                                    </button>
                                </div>

                                {/* Whatsapp */}
                                <div className="flex items-center gap-3 bg-gray-50 dark:bg-zinc-900 w-fit p-2 pr-4 rounded-md border border-gray-100 dark:border-zinc-800">
                                    <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-md text-emerald-600 dark:text-emerald-400">
                                        <WhatsappIcon size={18} />
                                    </div>
                                    <span className="text-gray-700 dark:text-gray-300 font-medium select-all">+62 819-9671-9560</span>
                                    <button
                                        onClick={handleCopyWhatsapp}
                                        className="ml-2 p-1.5 hover:bg-gray-200 dark:hover:bg-zinc-800 rounded-full transition-colors text-gray-500 dark:text-gray-400"
                                        title="Copy Whatsapp"
                                    >
                                        {copiedWhatsapp ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} />}
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
