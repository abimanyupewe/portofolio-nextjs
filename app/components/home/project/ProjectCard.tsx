import React from "react";
import Badge from "./ColorMapping";
import Image from "next/image";

const ProjectCard = ({ project, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer bg-gray-100 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
    >
      <div className="overflow-hidden group">
        <Image src={project.image[0]} alt={project.title} className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105" />
      </div>
      <div className="p-4">
        <h3 className="font-medium text-lg">{project.title}</h3>
        <p className="line-clamp-2 text-gray-500">{project.description}</p>
        <div className="flex items-center gap-1">
          {/* Badge untuk categoryProject */}
          <Badge type="categoryProject" value={project.category} />
          {/* Badge untuk language */}
          <Badge type="language" value={project.language} />
        </div>
        {/* Badge untuk status */}
        <div className="flex items-center justify-between mt-1">
          <p className="text-sm text-gray-600">Status <Badge type="status" value={project.status} /></p>
          <p className="text-sm text-gray-600">{project.createdAt}</p>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;