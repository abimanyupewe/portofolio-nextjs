"use client";

import React, { useState } from "react";
import Badge from "./ColorMapping";
import Image from "next/image";

interface Project {
  image: string | string[];
  title: string;
  description: string;
  category: string | string[];
  language: string | string[];
  status: string | string[];
  createdAt: string;
  previewLink: string;
}

interface ProjectPopupProps {
  project: Project;
  onClose: () => void;
}

const ProjectPopup: React.FC<ProjectPopupProps> = ({ project, onClose }) => {
  const [mainImage, setMainImage] = useState<string>(() => {
    // Initialize with first image
    if (Array.isArray(project.image)) {
      return project.image[0] || "";
    }
    return project.image || "";
  });

  const images = Array.isArray(project.image) ? project.image : [project.image];
  const hasMultipleImages = images.length > 1;
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
      <div className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Project Images Section */}
        <div className="mb-6">
          {hasMultipleImages ? (
            /* Multiple Images Layout - Responsive */
            <div className="flex flex-col md:flex-row gap-4">
              {/* Main Image */}
              <div className="flex-1">
                <div className="relative overflow-hidden rounded-xl group">
                  <Image
                    src={mainImage}
                    alt={project.title}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                    width={800}
                    height={400}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>

              {/* Thumbnails - Mobile: Bottom, Desktop: Right */}
              <div className="md:w-28 flex md:flex-col">
                <h4 className="hidden md:block text-xs font-medium text-gray-500 mb-3">
                  Gallery
                </h4>

                {/* Mobile Layout: Horizontal Scroll */}
                <div className="md:hidden">
                  <h4 className="text-xs font-medium text-gray-500 mb-2">
                    Gallery
                  </h4>
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {images.map((image: string, index: number) => (
                      <div
                        key={index}
                        onClick={() => setMainImage(image)}
                        className={`cursor-pointer rounded-lg overflow-hidden bg-gray-100 border-2 transition-all duration-200 hover:shadow-md flex-shrink-0 ${
                          mainImage === image
                            ? "border-purple-500 ring-2 ring-purple-200 shadow-md"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <Image
                          src={image}
                          alt={`${project.title} - Image ${index + 1}`}
                          className="w-20 h-14 object-cover"
                          width={80}
                          height={56}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Desktop Layout: Vertical Stack */}
                <div className="hidden md:flex md:flex-col gap-2 max-h-64 overflow-y-auto pr-1">
                  {images.map((image: string, index: number) => (
                    <div
                      key={index}
                      onClick={() => setMainImage(image)}
                      className={`cursor-pointer rounded-lg overflow-hidden bg-gray-100 border-2 transition-all duration-200 hover:shadow-md flex-shrink-0 ${
                        mainImage === image
                          ? "border-purple-500 ring-2 ring-purple-200 shadow-md"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`${project.title} - Image ${index + 1}`}
                        className="w-full h-16 object-cover"
                        width={112}
                        height={64}
                      />
                    </div>
                  ))}
                </div>

                {/* Image Counter */}
                <div className="mt-2 text-xs text-gray-400 text-center md:text-center">
                  {images.indexOf(mainImage) + 1} / {images.length}
                </div>
              </div>
            </div>
          ) : (
            /* Single Image Layout */
            <div className="relative overflow-hidden rounded-xl group">
              <Image
                src={mainImage}
                alt={project.title}
                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                width={800}
                height={400}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          )}
        </div>

        {/* Project Title */}
        <h2 className="text-3xl font-bold text-gray-900 mb-3">
          {project.title}
        </h2>

        {/* Project Description */}
        <p className="text-gray-700 leading-relaxed mb-6">
          {project.description}
        </p>

        {/* Project Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-500">Category:</span>
            <div className="flex flex-wrap gap-1">
              {Array.isArray(project.category) ? (
                project.category.map((cat, index) => (
                  <Badge key={index} type="categoryProject" value={cat} />
                ))
              ) : (
                <Badge type="categoryProject" value={project.category} />
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-500">Language:</span>
            <div className="flex flex-wrap gap-1">
              {Array.isArray(project.language) ? (
                project.language.map((lang, index) => (
                  <Badge key={index} type="language" value={lang} />
                ))
              ) : (
                <Badge type="language" value={project.language} />
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-500">Status:</span>
            <div className="flex flex-wrap gap-1">
              {Array.isArray(project.status) ? (
                project.status.map((stat, index) => (
                  <Badge key={index} type="status" value={stat} />
                ))
              ) : (
                <Badge type="status" value={project.status} />
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-500">Created:</span>
            <span className="text-sm text-gray-700">{project.createdAt}</span>
          </div>
        </div>

        {/* Preview Button */}
        {project.previewLink !== "None" && (
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
