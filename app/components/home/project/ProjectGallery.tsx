"use client";

import React, { useState } from "react";
import Image from "next/image";

interface ProjectGalleryProps {
  images: string[];
  title: string;
}

const ProjectGallery: React.FC<ProjectGalleryProps> = ({ images, title }) => {
  const [mainImage, setMainImage] = useState<string>(images[0] || "");
  const hasMultipleImages = images.length > 1;

  if (!hasMultipleImages) {
    return (
      <div className="relative overflow-hidden rounded-lg group">
        <div className="relative w-full h-64 md:h-96">
             <Image
            src={mainImage}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row gap-4">
      {/* Main Image */}
      <div className="flex-1">
        <div className="relative overflow-hidden rounded-lg group w-full h-64 md:h-96">
          <Image
            src={mainImage}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </div>

      {/* Thumbnails - Mobile: Bottom, Desktop: Right */}
      <div className="md:w-28 flex md:flex-col shrink-0">
        <h4 className="hidden md:block text-xs font-medium text-gray-500 mb-3">
          Gallery
        </h4>

        {/* Mobile Layout: Horizontal Scroll */}
        <div className="md:hidden w-full">
          <h4 className="text-xs font-medium text-gray-500 mb-2">Gallery</h4>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setMainImage(image)}
                className={`relative w-20 h-14 cursor-pointer rounded-md overflow-hidden bg-gray-100 border-2 transition-all duration-200 hover:shadow-md flex-shrink-0 ${
                  mainImage === image
                    ? "border-emerald-500 ring-2 ring-emerald-500/20 shadow-xs"
                    : "border-gray-200 hover:border-gray-300 dark:border-zinc-800"
                }`}
              >
                <Image
                  src={image}
                  alt={`${title} - Thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Desktop Layout: Vertical Stack */}
        <div className="hidden md:flex md:flex-col gap-2 max-h-96 overflow-y-auto pr-1 customize-scrollbar">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setMainImage(image)}
              className={`relative w-full h-16 cursor-pointer rounded-md overflow-hidden bg-gray-100 border-2 transition-all duration-200 hover:shadow-md flex-shrink-0 ${
                mainImage === image
                  ? "border-emerald-500 ring-2 ring-emerald-500/20 shadow-xs"
                  : "border-gray-200 hover:border-gray-300 dark:border-zinc-800"
              }`}
            >
              <Image
                src={image}
                alt={`${title} - Thumbnail ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>

        {/* Image Counter */}
        <div className="mt-2 text-xs text-gray-400 text-center md:text-center">
          {images.indexOf(mainImage) + 1} / {images.length}
        </div>
      </div>
    </div>
  );
};

export default ProjectGallery;
