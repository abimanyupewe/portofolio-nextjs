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
  // Map Supabase data to StickyScroll format
  const content = certificates.map((cert) => ({
    title: cert.title,
    description: `Issuer: ${cert.issuer} | Date: ${new Date(cert.date).toLocaleDateString()}`,
    content: (
       <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white relative overflow-hidden rounded-md group cursor-pointer"
            onClick={() => cert.credential_url && window.open(cert.credential_url, '_blank')}
       >
         {cert.image_url ? (
            <Image 
                src={cert.image_url} 
                alt={cert.title} 
                fill 
                className="object-cover"
            />
         ) : (
            <div className="text-center p-4">
                <p className="text-xl font-bold">{cert.title}</p>
                <p className="text-sm mt-2">{cert.issuer}</p>
                {cert.credential_url && (
                    <span className="mt-4 inline-block text-xs bg-white/20 px-3 py-1 rounded-full">View Credential</span>
                )}
            </div>
         )}
       </div>
    ),
  }));

  // Default content fallback is managed by checking mapped length? 
  // StickyScroll might need at least 1 item or it might crash/be empty.
  // We'll trust that if empty array is passed, StickyScroll handles it or renders nothing.

  if (!certificates || certificates.length === 0) {
      return null; // Or return a default static section similar to original
  }

  return (
    <div className="w-full py-4 bg-white dark:bg-black transition-colors duration-300">
       <h2 className="text-3xl font-bold text-center mb-10 text-gray-900 dark:text-white">Certificates</h2>
      <StickyScroll content={content} />
    </div>
  );
};

export default SertificateSection;
