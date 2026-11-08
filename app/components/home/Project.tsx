"use client";

import React, { useState, useMemo, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TabBar from "./project/TabBar";
import ProjectCard from "./project/ProjectCard";
import ProjectPopup, { ProjectType } from "./project/ProjectPopup";
import FilterCheckbox from "./project/FilterCheckbox";
import Title from "./props/Title";
import LanguageFilter from "./project/LanguageFilter";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ChevronRight, Filter, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProjectProps {
  initialProjects: ProjectType[];
}

const Project: React.FC<ProjectProps> = ({ initialProjects = [] }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Initial check because filteredProjects changes and we want to animate new items
    const ctx = gsap.context(() => {
      gsap.from(".project-card", {
        scrollTrigger: {
          trigger: ".project-grid",
          start: "top 80%",
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, { scope: containerRef, dependencies: [] }); // We might need to re-run this when filteredProjects changes, but for simplicity let's target the grid container render

  const [activeTab, setActiveTab] = useState<string>("All Project");

  const [selectedProject, setSelectedProject] = useState<ProjectType | null>(null);
  const [filters, setFilters] = useState<string[]>([]);
  const [filtersLanguage, setFiltersLanguage] = useState<string[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  // Pagination states
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(6);

  // Enhanced filtering
  const filteredProjects = useMemo(() => {
    if (!initialProjects) return [];

    return initialProjects.filter((project) => {
      // Category Filter
      if (activeTab !== "All Project") {
        if (Array.isArray(project.category)) {
          if (!project.category.includes(activeTab)) return false;
        } else if (project.category !== activeTab) {
          return false;
        }
      }

      // Status Filter
      if (filters.length > 0) {
        if (Array.isArray(project.status)) {
          if (!project.status.some((s) => filters.includes(s))) return false;
        } else if (!filters.includes(project.status as any)) {
          return false;
        }
      }

      // Language Filter
      if (filtersLanguage.length > 0) {
        if (Array.isArray(project.language)) {
          if (!project.language.some((lang) => filtersLanguage.includes(lang))) return false;
        } else if (!filtersLanguage.includes(project.language as any)) {
          return false;
        }
      }

      return true;
    });
  }, [activeTab, filters, filtersLanguage, initialProjects]);

  // Plain-text summary of what is currently filtered
  const activeFilterText = [activeTab !== "All Project" ? activeTab : null, ...filters, ...filtersLanguage]
    .filter(Boolean)
    .join(" · ");

  // Pagination calculations
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProjects = filteredProjects.slice(startIndex, endIndex);

  // Reset page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, filters, filtersLanguage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    document.getElementById("project-grid")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  };

  return (
    <section
      id="project"
      className="min-h-screen py-20 bg-white dark:bg-black transition-colors duration-300"
    >
      <div className="container mx-auto px-4 md:px-8">

        {/* Header */}
        <div className="flex flex-col items-center mb-16 space-y-4">
          <Title text1={"MY"} text2={"PROJECTS"} />
          <p className="text-gray-500 dark:text-gray-400 text-center max-w-2xl text-lg">
            Explore my recent work and personal projects.
          </p>
        </div>

        {/* Mobile Filter Toggle */}
        <div className="md:hidden flex justify-between items-center mb-6">
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {filteredProjects.length} Projects found{activeFilterText && ` — ${activeFilterText}`}
          </span>
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-zinc-100 dark:bg-zinc-900 rounded-md text-sm font-medium hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
          >
            <Filter className="w-4 h-4" />
            Filters
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-8 relative">
          {/* Sidebar Backdrop (Mobile) */}
          {isSidebarOpen && (
            <div
              className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
              onClick={() => setIsSidebarOpen(false)}
            />
          )}

          {/* Sidebar Filters */}
          <aside
            className={cn(
              "fixed md:sticky top-0 md:top-24 left-0 h-screen md:h-fit w-72 md:w-64 bg-white dark:bg-black p-6 md:p-0 z-50 md:z-0 transition-transform duration-300 ease-in-out border-r md:border-none border-gray-100 dark:border-zinc-800 md:block",
              isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
            )}
          >
            <div className="flex justify-between items-center mb-6 md:hidden">
              <h3 className="font-bold text-lg">Filters</h3>
              <button onClick={() => setIsSidebarOpen(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-8">
              <TabBar activeTab={activeTab} setActiveTab={setActiveTab} />
              <div className="space-y-6 pt-6 border-t border-gray-100 dark:border-zinc-800/50 md:border-none md:pt-0">
                <FilterCheckbox filters={filters} setFilters={setFilters} />
                <LanguageFilter
                  filtersLanguage={filtersLanguage}
                  setFiltersLanguage={setFiltersLanguage}
                />
              </div>
            </div>
          </aside>

          {/* Main Grid */}
          <main className="flex-1 min-h-[600px]" id="project-grid" ref={containerRef}>

            {/* Desktop Count */}
            <div className="hidden md:flex justify-between items-center mb-6">
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Showing <span className="font-bold text-black dark:text-white">{filteredProjects.length}</span> projects
                {activeFilterText && <span> — {activeFilterText}</span>}
              </p>
            </div>

            {filteredProjects.length > 0 ? (
              <div className="space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-6 project-grid">
                  {currentProjects.map((project) => (
                    <div key={project.id} className="project-card">
                      <ProjectCard
                        project={project}
                        onClick={() => setSelectedProject(project)}
                      />
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center pt-8 border-t border-gray-100 dark:border-zinc-800">
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious
                            href="#"
                            onClick={(e) => { e.preventDefault(); if (currentPage > 1) handlePageChange(currentPage - 1); }}
                            className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                          />
                        </PaginationItem>

                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                          if (page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)) {
                            return (
                              <PaginationItem key={page}>
                                <PaginationLink
                                  href="#"
                                  isActive={currentPage === page}
                                  onClick={(e) => { e.preventDefault(); handlePageChange(page); }}
                                  className={cn(
                                    currentPage === page && "bg-black text-white dark:bg-white dark:text-black font-semibold border-none"
                                  )}
                                >
                                  {page}
                                </PaginationLink>
                              </PaginationItem>
                            );
                          }
                          if (page === currentPage - 2 || page === currentPage + 2) {
                            return <PaginationItem key={page}><PaginationEllipsis /></PaginationItem>;
                          }
                          return null;
                        })}

                        <PaginationItem>
                          <PaginationNext
                            href="#"
                            onClick={(e) => { e.preventDefault(); if (currentPage < totalPages) handlePageChange(currentPage + 1); }}
                            className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center bg-gray-50 dark:bg-zinc-900/30 rounded-lg border border-dashed border-gray-200 dark:border-zinc-800">
                <div className="w-16 h-16 bg-gray-100 dark:bg-zinc-800 rounded-md flex items-center justify-center mb-4 text-black dark:text-white">
                  <Filter className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-2">No projects found</h3>
                <p className="text-gray-500 max-w-xs mb-6">
                  Try adjusting your filters or search criteria to find what you're looking for.
                </p>
                <button
                  onClick={() => {
                    setActiveTab("All Project");
                    setFilters([]);
                    setFiltersLanguage([]);
                  }}
                  className="px-6 py-2 bg-black hover:bg-zinc-800 text-white dark:bg-white dark:hover:bg-gray-200 dark:text-black rounded-md font-semibold transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

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
