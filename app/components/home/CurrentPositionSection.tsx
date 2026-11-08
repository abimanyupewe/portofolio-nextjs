"use client";

import React from "react";
import { motion } from "motion/react";

export interface CurrentPositionData {
  role?: string;
  company?: string;
  status_type?: string;
  location?: string;
  period?: string;
  description?: string;
  is_active?: boolean;
  logo_url?: string;
}

interface CurrentPositionSectionProps {
  position?: CurrentPositionData | null;
}

const defaultPosition: CurrentPositionData = {
  role: "Quality Assurance Intern",
  company: "Jagoan Hosting (PT Beon Intermedia)",
  status_type: "Internship",
  location: "Malang, Indonesia",
  period: "2026 - Present",
  description:
    "Fokus pada automated testing, manual regression testing, dan pengujian kualitas sistem infrastruktur cloud & hosting di Jagoan Hosting.",
  is_active: true,
};

const CurrentPositionSection: React.FC<CurrentPositionSectionProps> = ({
  position,
}) => {
  const current = { ...defaultPosition, ...position };

  if (current.is_active === false) return null;

  const details = [
    { label: "Type", value: current.status_type },
    { label: "Location", value: current.location },
    { label: "Period", value: current.period },
  ].filter((d) => d.value);

  return (
    <section
      id="current"
      className="w-full border-y border-border bg-background py-20 md:py-28"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-[1fr_3fr] md:gap-16 md:px-8"
      >
        {/* Label */}
        <div className="flex items-center gap-3 self-start md:pt-3">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-foreground opacity-50" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-foreground" />
          </span>
          <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Current status
          </span>
        </div>

        {/* Content */}
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="font-heading text-4xl font-light leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
              {current.role}
            </h2>
            <div className="flex items-center gap-3 text-lg text-muted-foreground">
              {current.logo_url && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={current.logo_url}
                  alt=""
                  width={32}
                  height={32}
                  className="h-8 w-8 rounded-full object-cover"
                />
              )}
              <span className="italic">{current.company}</span>
            </div>
          </div>

          {current.description && (
            <p className="max-w-2xl text-base leading-relaxed text-foreground/80 md:text-lg">
              {current.description}
            </p>
          )}

          <dl className="grid grid-cols-1 divide-y divide-border border-y border-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {details.map((d) => (
              <div key={d.label} className="space-y-1 py-4 sm:px-6 sm:first:pl-0 sm:last:pr-0">
                <dt className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  {d.label}
                </dt>
                <dd className="text-base">{d.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </motion.div>
    </section>
  );
};

export default CurrentPositionSection;
