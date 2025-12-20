"use client";

import React, { useState, useMemo } from "react";
import TabBar from "./project/TabBar";
import ProjectCard from "./project/ProjectCard";
import ProjectPopup, { ProjectType } from "./project/ProjectPopup"; // Import shared type
import FilterCheckbox from "./project/FilterCheckbox";
import Title from "./props/Title";
import LanguageFilter from "./project/LanguageFilter";
import Image from "next/image";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface ProjectProps {
  initialProjects: ProjectType[];
}

const Project: React.FC<ProjectProps> = ({ initialProjects = [] }) => {
  const [activeTab, setActiveTab] = useState<string>("All Project");
  const [selectedProject, setSelectedProject] = useState<ProjectType | null>(
    null
  );
  const [filters, setFilters] = useState<string[]>([]);
  const [filtersLanguage, setFiltersLanguage] = useState<string[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  // Pagination states
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(6); // 6 projects per page

  // Enhanced filtering function
  const filteredProjects = useMemo(() => {
    // If no projects, return empty
    if (!initialProjects) return [];

    return initialProjects.filter((project) => {
      // Filter by category tab
      if (activeTab !== "All Project") {
        if (Array.isArray(project.category)) {
          if (!project.category.includes(activeTab)) return false;
        } else if (project.category !== activeTab) {
          return false;
        }
      }

      // Filter by status (supports array of statuses in project)
      if (filters.length > 0) {
        if (Array.isArray(project.status)) {
          if (!project.status.some((s) => filters.includes(s)))
            return false;
        } else if (!filters.includes(project.status as any)) {
          return false;
        }
      }

      // Filter by language (supports array or string languages in project)
      if (filtersLanguage.length > 0) {
        if (Array.isArray(project.language)) {
          if (
            !project.language.some((lang) =>
              filtersLanguage.includes(lang)
            )
          )
            return false;
        } else if (!filtersLanguage.includes(project.language as any)) {
          return false;
        }
      }

      return true;
    });
  }, [activeTab, filters, filtersLanguage, initialProjects]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProjects = filteredProjects.slice(startIndex, endIndex);

  // Reset to first page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, filters, filtersLanguage]);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Smooth scroll to top of projects section
    document.getElementById("project-grid")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest" // changed to nearest to avoid drastic jumps
    });
  };

  return (
    <section
      id="project"
      className="min-h-screen py-16 lg:py-24 mb-24 lg:mb-32 bg-white dark:bg-black transition-colors duration-300"
    >
      {/* Header Section */}
      <div className="flex justify-center flex-col items-center mb-12">
        <Title text1={"MY"} text2={"PROJECTS"} />

        {/* Projects Count */}
        <p className="text-gray-600 dark:text-gray-400 mt-4">
          Showing {filteredProjects.length} project
          {filteredProjects.length !== 1 ? "s" : ""}
          {filteredProjects.length > itemsPerPage && (
            <span>
              {" "}
              - Page ({currentPage} of {totalPages})
            </span>
          )}
        </p>

        {/* Mobile Filter Toggle */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="md:hidden bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-6 py-3 rounded-xl mt-6 flex items-center gap-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
            />
          </svg>
          {isSidebarOpen ? "Hide Filters" : "Show Filters"}
          <Image
            src="/icons/chevron_right.png"
            width={16}
            height={16}
            alt=""
            className={`w-4 h-4 transition-transform duration-300 ${
              isSidebarOpen ? "rotate-90" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
        />
      )}

      <div className="max-w-7xl mx-auto px-4">
        <div className="flex gap-2">
          {/* Sidebar - Filters */}
          <aside
            className={`fixed md:sticky top-0 left-0 w-64 h-screen md:h-auto bg-white/95 dark:bg-zinc-900/95 md:bg-white md:dark:bg-zinc-900 backdrop-blur-sm md:backdrop-blur-none p-4 space-y-6 overflow-y-auto transform ${
              isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            } md:translate-x-0 transition-all duration-300 ease-out z-50 md:z-auto  rounded-2xl border border-gray-100 dark:border-zinc-800 shadow-sm`}
          >
            {/* Close Button - Mobile Only */}
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="md:hidden absolute top-4 right-4 w-8 h-8 bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-300 transition-colors duration-200"
            >
              <svg
                className="w-5 h-5"
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

            <div className="space-y-6 mt-8 md:mt-0">
              <TabBar activeTab={activeTab} setActiveTab={setActiveTab} />
              <FilterCheckbox filters={filters} setFilters={setFilters} />
              <LanguageFilter
                filtersLanguage={filtersLanguage}
                setFiltersLanguage={setFiltersLanguage}
              />
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 min-h-[800px]">
            <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-100 dark:border-zinc-800 p-2 h-full flex flex-col">
              {filteredProjects.length > 0 ? (
                <>
                  {/* Projects Grid */}
                  <div id="project-grid" className="flex-1 overflow-y-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 p-4">
                      {currentProjects.map((project) => (
                        <ProjectCard
                          key={project.id}
                          project={project}
                          onClick={() => setSelectedProject(project)}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="border-t border-gray-100 dark:border-zinc-800 pt-6 pb-2">
                      <Pagination>
                        <PaginationContent>
                          <PaginationItem>
                            <PaginationPrevious
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                if (currentPage > 1) {
                                  handlePageChange(currentPage - 1);
                                }
                              }}
                              className={
                                currentPage === 1
                                  ? "pointer-events-none opacity-50"
                                  : "cursor-pointer"
                              }
                            />
                          </PaginationItem>

                          {/* Page Numbers */}
                          {Array.from(
                            { length: totalPages },
                            (_, i) => i + 1
                          ).map((page) => {
                             const showPage =
                               page === 1 ||
                               page === totalPages ||
                               (page >= currentPage - 1 &&
                                 page <= currentPage + 1);

                             if (!showPage) {
                               if (
                                 page === currentPage - 2 ||
                                 page === currentPage + 2
                               ) {
                                  return (
                                    <PaginationItem key={page}>
                                      <PaginationEllipsis />
                                    </PaginationItem>
                                  );
                               }
                               return null;
                             }

                            return (
                              <PaginationItem key={page}>
                                <PaginationLink
                                  href="#"
                                  isActive={currentPage === page}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    handlePageChange(page);
                                  }}
                                  className="cursor-pointer"
                                >
                                  {page}
                                </PaginationLink>
                              </PaginationItem>
                            );
                          })}

                          <PaginationItem>
                            <PaginationNext
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                if (currentPage < totalPages) {
                                  handlePageChange(currentPage + 1);
                                }
                              }}
                              className={
                                currentPage === totalPages
                                  ? "pointer-events-none opacity-50"
                                  : "cursor-pointer"
                              }
                            />
                          </PaginationItem>
                        </PaginationContent>
                      </Pagination>

                      {/* Pagination Info */}
                      <div className="text-center mt-4 text-sm text-gray-600 dark:text-gray-400">
                        Showing {startIndex + 1}-
                        {Math.min(endIndex, filteredProjects.length)} of{" "}
                        {filteredProjects.length} projects
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center">
                   {/* Empty State */}
                  <div className="w-24 h-24 bg-gray-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mb-6">
                    <svg
                      className="w-12 h-12 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.5-1.27-5.64-3.29M15 11.63v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    No projects found
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-4">
                    Try adjusting your filters to see more results
                  </p>
                  <button
                    onClick={() => {
                      setActiveTab("All Project");
                      setFilters([]);
                      setFiltersLanguage([]);
                    }}
                    className="px-6 py-2 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-lg transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
                  >
                    Clear All Filters
                  </button>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <ProjectPopup
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
};

export default Project;
