"use client";

import { StickyScroll } from "@/components/ui/ui/sticky-scroll-reveal";
import React from "react";
import Image from "next/image";

interface Certificate {
    id: string;
    title: string;
    issuer: string;
    date: string;
    credential_url: string;
    image_url: string;
}

interface SertificateSectionProps {
    certificates?: Certificate[];
}

const SertificateSection: React.FC<SertificateSectionProps> = ({ certificates = [] }) => {

    const defaultCertificates: Certificate[] = [
        {
            id: "1",
            title: "Certificate of Competence",
            issuer: "Default Issuer",
            date: new Date().toISOString(),
            credential_url: "",
            image_url: ""
        }
    ];

    const displayCertificates = certificates.length > 0 ? certificates : defaultCertificates;

    // Map Supabase data to StickyScroll format
    const content = displayCertificates.map((cert) => ({
        title: cert.title,
        description: (
            <span suppressHydrationWarning className="text-neutral-300 block text-base bg-white/5 p-3 rounded-lg border border-white/10 w-fit backdrop-blur-sm mt-4">
                {cert.issuer}
                <br />
                {new Date(cert.date).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric"
                })}
            </span>
        ),
        content: (
            <div className="h-full w-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white relative overflow-hidden rounded-md group cursor-pointer"
                onClick={() => cert.credential_url && window.open(cert.credential_url, '_blank')}
            >
                {cert.image_url ? (
                    <Image
                        src={cert.image_url}
                        alt={cert.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                ) : (
                    <div className="text-center p-4">
                        <p className="text-xl font-bold text-white">{cert.title}</p>
                        <p className="text-sm mt-2 text-emerald-100">{cert.issuer}</p>
                        {cert.credential_url && (
                            <span className="mt-4 inline-block text-xs bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full transition-colors">View Credential</span>
                        )}
                    </div>
                )}
            </div>
        ),
    }));

    return (
        <div className="w-full py-10 bg-white dark:bg-black transition-colors duration-300">
            <div className="flex flex-col items-center mb-16 px-4">
                <h2 className="text-3xl md:text-5xl font-bold dark:text-white text-black mb-6 text-center">
                    MY <span className="text-emerald-500">CERTIFICATES</span>
                </h2>
                <p className="text-neutral-600 dark:text-neutral-400 max-w-lg text-center text-sm md:text-base leading-relaxed">
                    Validations of my skills and achievements throughout my professional journey.
                </p>
            </div>
            <StickyScroll content={content} />
        </div>
    );
};

export default SertificateSection;
