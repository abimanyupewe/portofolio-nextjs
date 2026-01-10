"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Pencil, Trash2, Search, Filter, FolderKanban } from "lucide-react";
import Image from "next/image";
import { getProjects, deleteProject } from "@/app/actions/projects";

// Reusing ProjectType or defining a subset
interface Project {
  id: string;
  title: string;
  category: string[];
  status: string[];
  thumbnail_url?: string;
  created_at?: string;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const data = await getProjects();
      setProjects(data || []);
    } catch (error) {
      console.error("Error fetching projects", error);
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      await deleteProject(id);
      fetchProjects();
    } catch (error) {
      alert("Error deleting project");
      console.error(error);
    }
  };

  const filteredProjects = projects.filter(p =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return (
    <div className="flex items-center justify-center min-h-[500px]">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    </div>
  );

  return (
    <div className="space-y-8 pb-20">

      {/* Header & Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold dark:text-white">Projects</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Manage and organize your portfolio projects.</p>
        </div>

        <Link
          href="/admin/dashboard/projects/create"
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium transition-all hover:shadow-lg hover:shadow-blue-500/20 active:scale-95"
        >
          <Plus size={18} />
          Add New Project
        </Link>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search projects by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-3 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors">
          <Filter size={18} />
          <span>Filter</span>
        </button>
      </div>

      {/* Table Card */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-200 dark:border-zinc-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50/50 dark:bg-zinc-800/50 border-b border-gray-100 dark:border-zinc-800">
              <tr>
                <th className="p-6 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Thumbnail</th>
                <th className="p-6 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Title</th>
                <th className="p-6 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 hidden md:table-cell">Category</th>
                <th className="p-6 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 hidden md:table-cell">Status</th>
                <th className="p-6 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-zinc-800">
              {filteredProjects.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-12 text-center">
                    <div className="flex flex-col items-center justify-center text-gray-500">
                      <FolderKanban className="w-12 h-12 text-gray-300 dark:text-zinc-700 mb-3" />
                      <p className="text-lg font-medium text-gray-900 dark:text-white">No projects found</p>
                      <p className="text-sm">Try adjusting your search or add a new project.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredProjects.map((project) => (
                  <tr key={project.id} className="hover:bg-gray-50/80 dark:hover:bg-zinc-800/50 transition-colors group">
                    <td className="p-6 w-24">
                      <div className="relative w-20 h-14 bg-gray-100 dark:bg-zinc-800 rounded-lg overflow-hidden border border-gray-200 dark:border-zinc-700">
                        {project.thumbnail_url ? (
                          <Image
                            src={project.thumbnail_url}
                            alt={project.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full text-xs text-gray-400">
                            No Img
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="p-6">
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-xs text-gray-500 truncate max-w-[200px]">
                        ID: {project.id.substring(0, 8)}...
                      </p>
                    </td>
                    <td className="p-6 hidden md:table-cell">
                      <div className="flex flex-wrap gap-1.5">
                        {project.category?.slice(0, 3).map((cat, i) => (
                          <span key={i} className="px-2.5 py-1 text-xs font-medium rounded-full bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300 border border-blue-100 dark:border-blue-900/30">
                            {cat}
                          </span>
                        ))}
                        {(project.category?.length || 0) > 3 && (
                          <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-600 dark:bg-zinc-800 dark:text-gray-400">
                            +{(project.category?.length || 0) - 3}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="p-6 hidden md:table-cell">
                      <div className="flex flex-wrap gap-1.5">
                        {project.status?.map((stat, i) => {
                          const isCompleted = stat.toLowerCase() === 'completed';
                          const isProgress = stat.toLowerCase() === 'in progress';

                          let colors = "bg-gray-100 text-gray-700 dark:bg-zinc-800 dark:text-gray-300";
                          if (isCompleted) colors = "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300 border border-green-100 dark:border-green-900/30";
                          if (isProgress) colors = "bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-300 border border-amber-100 dark:border-amber-900/30";

                          return (
                            <span key={i} className={`px-2.5 py-1 text-xs font-medium rounded-full ${colors}`}>
                              {stat}
                            </span>
                          );
                        })}
                      </div>
                    </td>
                    <td className="p-6 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all duration-200">
                        <Link
                          href={`/admin/dashboard/projects/${project.id}`}
                          className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Pencil size={18} />
                        </Link>
                        <button
                          onClick={() => handleDelete(project.id)}
                          className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
