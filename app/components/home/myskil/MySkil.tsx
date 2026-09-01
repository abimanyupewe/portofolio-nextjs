import React from "react";
import SkilBar from "../props/SkilBar";

interface Skill {
  name: string;
  percentage: number;
}

interface MySkilProps {
  title: string;
  skills: Skill[];
}

const MySkil: React.FC<MySkilProps> = ({ title, skills }) => {
  return (
    <div>
      <h3 className="text-xl font-heading font-semibold mb-4 text-gray-700 dark:text-gray-300">{title}</h3>
      {skills.map((skill, index) => (
        <SkilBar key={index} name={skill.name} percentage={skill.percentage} />
      ))}
    </div>
  );
};

export default MySkil;
