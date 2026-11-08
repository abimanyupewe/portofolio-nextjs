import { Timeline } from '@/components/ui/ui/timeline';
import React from 'react'
import Image from 'next/image';

interface Experience {
  id: string;
  company: string;
  position: string;
  duration: string;
  description: string;
  logo_url?: string;
}

interface ExperienceSectionProps {
  experiences?: Experience[];
}

const ExperienceSection: React.FC<ExperienceSectionProps> = ({ experiences = [] }) => {
  // Map Supabase data to Timeline format
  const data = experiences.map((exp) => ({
    title: exp.duration, // Using duration as the timeline "year/period"
    content: (
      <div className="space-y-4">
        <div>
          <h3 className="font-heading text-2xl font-medium leading-tight md:text-3xl">{exp.company}</h3>
          <p className="mt-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">{exp.position}</p>
        </div>
        <p className="max-w-2xl text-base leading-relaxed text-foreground/80">{exp.description}</p>
        {exp.logo_url && (
          <Image
            src={exp.logo_url}
            alt={exp.company}
            width={200}
            height={200}
            className="h-14 w-fit rounded-lg object-contain"
          />
        )}
      </div>
    ),
  }));

  // Default data (fallback)
  const defaultData = [
    {
      title: "2024",
      content: (
        <div>
          <h3 className="mb-2 font-heading text-2xl font-medium">Welcome!</h3>
          <p className="text-base text-foreground/80">
            This is where my journey begins. I'm ready to learn and grow.
          </p>
        </div>
      ),
    },
  ];

  return (
    <div id="experience" className="relative w-full overflow-clip bg-background">
      <Timeline
        data={data.length > 0 ? data : defaultData}
        title="Where I've worked & learned"
        description="A timeline of my professional journey, highlighting key milestones and career growth."
      />
    </div>
  )
}

export default ExperienceSection