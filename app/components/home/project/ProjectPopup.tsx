"use client";

import React from "react";
import Badge from "./ColorMapping";
import ProjectGallery from "./ProjectGallery";
import { Github, ExternalLink } from "lucide-react";

// Interface matching normalized Supabase data
export interface ProjectType {
  id: string | number;
  title: string;
  description: string;
  category: string[];
  status: string[];
  language: string[];
  createdAt: string;
  created_at?: string; // Supabase field
  preview_link?: string;
  repo_link?: string;
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
        className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 hover:bg-white rounded-md flex items-center justify-center text-gray-600 hover:text-gray-900 transition-all duration-200 shadow-md"
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
      <div className="bg-white dark:bg-zinc-900 rounded-lg p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-xl border border-gray-100 dark:border-zinc-800">

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
              {(() => {
                const dateString = project.created_at || project.createdAt;
                const date = dateString ? new Date(dateString) : new Date();
                return isNaN(date.getTime()) ? "Just now" : date.toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric"
                });
              })()}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          {project.preview_link && project.preview_link !== "None" && (
            <a
              href={project.preview_link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-md transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
            >
              <ExternalLink className="w-5 h-5 mr-2" />
              View Live Preview
            </a>
          )}

          {project.repo_link && project.repo_link !== "None" && (
            <a
              href={project.repo_link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 hover:bg-gray-50 dark:hover:bg-zinc-700 text-gray-900 dark:text-white font-medium rounded-md transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
            >
              <Github className="w-5 h-5 mr-2" />
              View Repository
            </a>
          )}
        </div>

      </div>
    </div>
  );
};

export default ProjectPopup;
