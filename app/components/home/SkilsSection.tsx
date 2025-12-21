import React, { useMemo } from "react";
import Title from "./props/Title";
import MySkil from "./myskil/MySkil";

interface Skill {
  id: string;
  name: string;
  category: string;
  percentage: number;
}

interface SkilsSectionProps {
  skills?: Skill[];
}

const SkilsSection: React.FC<SkilsSectionProps> = ({ skills = [] }) => {
  
  const frameworks = useMemo(() => skills.filter(s => s.category?.toLowerCase() === 'framework' || s.category?.toLowerCase() === 'tool' || s.category?.toLowerCase() === 'frameworks & tools'), [skills]);
  const languages = useMemo(() => skills.filter(s => s.category?.toLowerCase() === 'language' || s.category?.toLowerCase() === 'programming language'), [skills]);

  // Fallback defaults if no data (optional, or just show empty)
  const defaultFrameworks = [
     { name: "Figma", percentage: 90 },
     { name: "Tailwind CSS", percentage: 85 },
     { name: "React", percentage: 80 },
     { name: "Next.js", percentage: 75 },
     {name: "Flutter", percentage: 60}
  ];
  
  const defaultLanguages = [
    { name: "JavaScript", percentage: 85 },
    { name: "TypeScript", percentage: 70 },
    { name: "HTML/CSS", percentage: 90 },
  ];

  const displayFrameworks = frameworks.length > 0 ? frameworks : (skills.length === 0 ? defaultFrameworks : []);
  const displayLanguages = languages.length > 0 ? languages : (skills.length === 0 ? defaultLanguages : []);

  return (
    <section id="sklis" className="py-20 lg:py-40 px-4 md:px-20 bg-white dark:bg-black transition-colors duration-300">
      <div className="flex justify-center items-center">
        <Title text1={"MY"} text2={"SKILLS"} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
        <MySkil title="Frameworks & Tools" skills={displayFrameworks} />
        <MySkil title="Programming Languages" skills={displayLanguages} />
      </div>
    </section>
  );
};

export default SkilsSection;
