"use client";

import React, { useState } from "react";
// import { supabase } from "@/lib/supabase";
import { createProject, updateProject } from "@/app/actions/projects";

import { useRouter } from "next/navigation";
import ImageUpload from "./ImageUpload";
import { Loader2 } from "lucide-react";

interface ProjectFormProps {
  initialData?: any; // Define strict type if needed, using any for flex for now
}

const ProjectForm: React.FC<ProjectFormProps> = ({ initialData }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    description: initialData?.description || "",
    content: initialData?.content || "", // Rich text later? using simple textarea for now
    thumbnail_url: initialData?.thumbnail_url || "",
    gallery_urls: initialData?.gallery_urls || [],
    category: initialData?.category || [],
    status: initialData?.status || [],
    language: initialData?.language || [],
    preview_link: initialData?.preview_link || "",
    repo_link: initialData?.repo_link || "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const dataToSave = {
        ...formData,
        // sanitize arrays if needed
      };

      if (initialData?.id) {
        // Update
        await updateProject(initialData.id, dataToSave);
      } else {
        // Create
        await createProject(dataToSave);
      }

      router.push("/admin/dashboard/projects");
      router.refresh();
    } catch (error: any) {
      alert("Error saving project: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-5xl mx-auto pb-20">

      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold dark:text-white">
          {initialData ? "Edit Project" : "Create New Project"}
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Main Info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-gray-200 dark:border-zinc-800 space-y-6">
            <h3 className="font-semibold text-lg border-b border-gray-100 dark:border-zinc-800 pb-4 dark:text-white">Basic Information</h3>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Project Title
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-800/50 focus:bg-white dark:focus:bg-black focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                placeholder="e.g. E-Commerce Platform"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Category <span className="text-gray-400 text-xs font-normal">(comma-separated)</span>
                </label>
                <input
                  type="text"
                  value={formData.category.join(", ")}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      category: e.target.value.split(",").map((s) => s.trim()),
                    })
                  }
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-800/50 focus:bg-white dark:focus:bg-black focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  placeholder="Web, Mobile, UI/UX"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Status <span className="text-gray-400 text-xs font-normal">(comma-separated)</span>
                </label>
                <input
                  type="text"
                  value={formData.status.join(", ")}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      status: e.target.value.split(",").map((s) => s.trim()),
                    })
                  }
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-800/50 focus:bg-white dark:focus:bg-black focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  placeholder="Completed, In Progress"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Live URL
                </label>
                  <input
                    type="url"
                    value={formData.preview_link}
                    onChange={(e) =>
                      setFormData({ ...formData, preview_link: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-800/50 focus:bg-white dark:focus:bg-black focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    placeholder="https://..."
                  />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Language/Tech <span className="text-gray-400 text-xs font-normal">(comma-separated)</span>
                </label>
                <input
                  type="text"
                  value={formData.language.join(", ")}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      language: e.target.value.split(",").map((s) => s.trim()),
                    })
                  }
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-800/50 focus:bg-white dark:focus:bg-black focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  placeholder="React, TypeScript, Node.js"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Description
              </label>
              <textarea
                required
                rows={4}
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-800/50 focus:bg-white dark:focus:bg-black focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                placeholder="Describe your project..."
              />
            </div>
          </div>

          {/* Detailed Content */}
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-gray-200 dark:border-zinc-800 space-y-6">
            <h3 className="font-semibold text-lg border-b border-gray-100 dark:border-zinc-800 pb-4 dark:text-white">Detailed Content</h3>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Full Content (Markdown supported)
              </label>
              <textarea
                rows={10}
                value={formData.content}
                onChange={(e) =>
                  setFormData({ ...formData, content: e.target.value })
                }
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-800/50 focus:bg-white dark:focus:bg-black focus:ring-2 focus:ring-blue-500 outline-none transition-all font-mono text-sm"
                placeholder="Full project details..."
              />
            </div>
          </div>

          {/* Gallery */}
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-gray-200 dark:border-zinc-800 space-y-6">
            <h3 className="font-semibold text-lg border-b border-gray-100 dark:border-zinc-800 pb-4 dark:text-white">Project Gallery</h3>
            <ImageUpload
              label="Upload Gallery Images"
              multiple
              value={formData.gallery_urls}
              onChange={(urls) =>
                setFormData({ ...formData, gallery_urls: urls as string[] })
              }
              folder="projects"
            />
          </div>
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-gray-200 dark:border-zinc-800">
            <h3 className="font-semibold text-lg border-b border-gray-100 dark:border-zinc-800 pb-4 mb-4 dark:text-white">Media</h3>
            <ImageUpload
              label="Thumbnail Image"
              value={formData.thumbnail_url}
              onChange={(url) =>
                setFormData({ ...formData, thumbnail_url: url as string })
              }
              folder="projects"
            />
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/10 p-6 rounded-2xl border border-blue-100 dark:border-blue-900/20">
            <h4 className="text-blue-700 dark:text-blue-300 font-medium mb-2">Publishing</h4>
            <p className="text-sm text-blue-600/70 dark:text-blue-400/70 mb-4">
              Make sure all details are correct before publishing.
            </p>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 font-semibold transition-transform hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" /> Saving...
                </>
              ) : (
                "Save Project"
              )}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ProjectForm;
