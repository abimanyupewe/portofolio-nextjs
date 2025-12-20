"use client";

import React from "react";
import Badge from "./ColorMapping";
import ProjectGallery from "./ProjectGallery";

// Interface matching normalized Supabase data
export interface ProjectType {
  id: string | number;
  title: string;
  description: string;
  category: string[];
  status: string[];
  language: string[];
  createdAt: string;
  previewLink?: string;
  thumbnail_url?: string;
  gallery_urls?: string[];
  // Legacy support for local data (temporary)
  image?: string | string[]; 
}

interface ProjectPopupProps {
  project: ProjectType;
  onClose: () => void;
}

const ProjectPopup: React.FC<ProjectPopupProps> = ({ project, onClose }) => {
  
  // Normalize images: Combine thumbnail and gallery, or use legacy image field
  const getImages = (): string[] => {
      if (project.thumbnail_url) {
          return [project.thumbnail_url, ...(project.gallery_urls || [])];
      }
      if (Array.isArray(project.image)) return project.image;
      if (typeof project.image === 'string') return [project.image];
      return [];
  };

  const images = getImages();

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center text-gray-600 hover:text-gray-900 transition-all duration-200 shadow-lg hover:shadow-xl"
        aria-label="Close popup"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      {/* Modal Content */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-100 dark:border-zinc-800">
        
        {/* Gallery Section */}
        <div className="mb-8">
            <ProjectGallery images={images} title={project.title} />
        </div>

        {/* Project Title */}
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
          {project.title}
        </h2>

        {/* Project Description */}
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
          {project.description}
        </p>

        {/* Project Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Category:</span>
            <div className="flex flex-wrap gap-1">
              {project.category?.map((cat, index) => (
                 <Badge key={index} type="categoryProject" value={cat} />
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Language:</span>
            <div className="flex flex-wrap gap-1">
               {project.language?.map((lang, index) => (
                  <Badge key={index} type="language" value={lang} />
               ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Status:</span>
            <div className="flex flex-wrap gap-1">
               {project.status?.map((stat, index) => (
                  <Badge key={index} type="status" value={stat} />
               ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Created:</span>
            <span className="text-sm text-gray-700 dark:text-gray-300">
                {new Date(project.createdAt).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
          </div>
        </div>

        {/* Preview Button */}
        {project.previewLink && project.previewLink !== "None" && (
          <a
            href={project.previewLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-medium rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
            View Live Preview
          </a>
        )}
      </div>
    </div>
  );
};

export default ProjectPopup;
