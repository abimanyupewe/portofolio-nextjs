import React from "react";
import Badge from "./ColorMapping";
import Image from "next/image";
import { ProjectType } from "./ProjectPopup"; // Import shared type if possible, or redefine

interface ProjectCardProps {
  project: ProjectType;
  onClick: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
  // Determine display image
  const displayImage = project.thumbnail_url
    ? project.thumbnail_url
    : (Array.isArray(project.image) ? project.image[0] : project.image);

  return (
    <div
      onClick={onClick}
      className="cursor-pointer bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-gray-100 dark:border-zinc-800 overflow-hidden hover:shadow-md hover:border-emerald-100 dark:hover:border-emerald-800 transition-all duration-300 group"
    >
      <div className="relative h-48 overflow-hidden">
        {displayImage ? (
          <Image
            src={displayImage}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 dark:bg-zinc-800 flex items-center justify-center">
            <span className="text-gray-400">No Image</span>
          </div>
        )}
      </div>
      <div className="p-5">
        <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">
          {project.title}
        </h3>
        <p className="line-clamp-2 text-gray-600 dark:text-gray-400 text-sm mb-3">
          {project.description}
        </p>
        <div className="flex items-center gap-2 mb-3">
          {/* Badge untuk categoryProject */}
          <div className="flex flex-wrap gap-1">
            {project.category?.slice(0, 2).map((cat, i) => (
              <Badge key={i} type="categoryProject" value={cat} />
            ))}
            {project.category.length > 2 && <span className="text-xs text-gray-400">+{project.category.length - 2}</span>}
          </div>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2">
            <div className="flex flex-wrap gap-1">
              {project.status?.slice(0, 1).map((stat, i) => (
                <Badge key={i} type="status" value={stat} />
              ))}
            </div>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400" suppressHydrationWarning>
            {(() => {
              const dateString = project.created_at || project.createdAt;
              const date = dateString ? new Date(dateString) : new Date();
              return isNaN(date.getTime()) ? "Just now" : date.toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric"
              });
            })()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
