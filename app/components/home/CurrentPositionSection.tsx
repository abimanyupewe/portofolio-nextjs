"use client";

import React from "react";
import { Briefcase, MapPin, Calendar, Building2, CheckCircle2 } from "lucide-react";

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

  return (
    <section className="w-full bg-white dark:bg-black py-16 md:py-24 border-y border-zinc-200 dark:border-zinc-900 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-6 md:px-8">
        {/* Header Label */}
        <div className="flex items-center gap-3 mb-6">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-zinc-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-black dark:bg-white"></span>
          </span>
          <span className="text-xs font-semibold tracking-[0.2em] text-zinc-500 dark:text-zinc-400 uppercase font-sans">
            CURRENT STATUS
          </span>
        </div>

        {/* Main Section Content Card */}
        <div className="relative group rounded-2xl border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-950/60 p-8 md:p-12 transition-all duration-300 hover:border-black dark:hover:border-white">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8">
            {/* Left Content */}
            <div className="space-y-6 flex-1">
              {/* Status Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 border border-zinc-300 dark:border-zinc-800">
                <CheckCircle2 className="w-3.5 h-3.5 text-zinc-700 dark:text-zinc-300" />
                <span>{current.status_type || "Internship"}</span>
              </div>

              {/* Position & Company */}
              <div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold uppercase text-black dark:text-white tracking-tight leading-tight">
                  {current.role}
                </h2>
                <div className="flex items-center gap-2 text-lg sm:text-xl text-zinc-700 dark:text-zinc-300 font-sans mt-2 font-medium">
                  <Building2 className="w-5 h-5 text-zinc-400 dark:text-zinc-500 shrink-0" />
                  <span>{current.company}</span>
                </div>
              </div>

              {/* Description */}
              {current.description && (
                <p className="text-base md:text-lg text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed max-w-3xl">
                  {current.description}
                </p>
              )}

              {/* Metadata Items */}
              <div className="flex flex-wrap items-center gap-4 text-xs md:text-sm text-zinc-500 dark:text-zinc-400 pt-2 border-t border-zinc-200 dark:border-zinc-800/80">
                <div className="flex items-center gap-1.5 font-sans">
                  <MapPin className="w-4 h-4 text-zinc-400 dark:text-zinc-500" />
                  <span>{current.location}</span>
                </div>
                <span className="text-zinc-300 dark:text-zinc-800">•</span>
                <div className="flex items-center gap-1.5 font-sans">
                  <Calendar className="w-4 h-4 text-zinc-400 dark:text-zinc-500" />
                  <span>{current.period}</span>
                </div>
                <span className="text-zinc-300 dark:text-zinc-800">•</span>
                <div className="flex items-center gap-1.5 font-sans">
                  <Briefcase className="w-4 h-4 text-zinc-400 dark:text-zinc-500" />
                  <span>Quality Assurance</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CurrentPositionSection;
