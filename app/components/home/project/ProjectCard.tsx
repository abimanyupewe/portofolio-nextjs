import React from "react";
import Badge from "./ColorMapping";
import Image from "next/image";

interface Project {
  id: string;
  title: string;
  description: string;
  image: string[];
  category: string;
  language: string;
  status: string;
  createdAt: string;
}

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md hover:border-purple-100 transition-all duration-300 group"
    >
      <div className="overflow-hidden">
        <Image
          src={project.image[0]}
          alt={project.title}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-5">
        <h3 className="font-semibold text-lg text-gray-900 mb-2">
          {project.title}
        </h3>
        <p className="line-clamp-2 text-gray-600 text-sm mb-3">
          {project.description}
        </p>
        <div className="flex items-center gap-2 mb-3">
          {/* Badge untuk categoryProject */}
          <Badge type="categoryProject" value={project.category} />
          {/* Badge untuk language */}
          <Badge type="language" value={project.language} />
        </div>
        {/* Badge untuk status */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">Status:</span>
            <Badge type="status" value={project.status} />
          </div>
          <p className="text-xs text-gray-500">{project.createdAt}</p>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
