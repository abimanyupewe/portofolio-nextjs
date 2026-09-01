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
      <div>
        <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">{exp.company}</h3>
        <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-4">{exp.position}</p>
        <p className="mb-8 text-xs font-normal text-neutral-800 md:text-base dark:text-neutral-200">
          {exp.description}
        </p>
        {exp.logo_url && (
          <div className="grid grid-cols-2 gap-4">
            <Image
              src={exp.logo_url}
              alt={exp.company}
              width={500}
              height={500}
              className="h-20 w-fit rounded-lg object-contain shadow-md"
            />
          </div>
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
          <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">Welcome!</h3>
          <p className="mb-8 text-neutral-800 dark:text-neutral-200">
            This is where my journey begins. I'm ready to learn and grow.
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className="relative w-full overflow-clip bg-white dark:bg-black transition-colors duration-300">
      <Timeline
        data={data.length > 0 ? data : defaultData}
        title="MY EXPERIENCE"
        description="A timeline of my professional journey, highlighting key milestones and career growth."
      />
    </div>
  )
}

export default ExperienceSection