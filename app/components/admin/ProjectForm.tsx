"use client";

import React, { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import ImageUpload from "./ImageUpload";
import TagInput from "./TagInput";
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
        const { error } = await supabase
          .from("projects")
          .update(dataToSave)
          .eq("id", initialData.id);
        if (error) throw error;
      } else {
        // Create
        const { error } = await supabase.from("projects").insert([dataToSave]);
        if (error) throw error;
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
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl mx-auto pb-20">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Main Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title */}
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
              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              placeholder="e.g. Portfolio Website"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Short Description
            </label>
            <textarea
              required
              rows={3}
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              placeholder="Brief overview of the project..."
            />
          </div>

          {/* Content */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Detailed Content (Markdown supported)
            </label>
            <textarea
              rows={10}
              value={formData.content}
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 focus:ring-2 focus:ring-blue-500 outline-none transition-all font-mono text-sm"
              placeholder="Full project details..."
            />
          </div>
          
           {/* Gallery */}
           <ImageUpload
            label="Project Gallery"
            multiple
            value={formData.gallery_urls}
            onChange={(urls) =>
              setFormData({ ...formData, gallery_urls: urls as string[] })
            }
          />
        </div>

        {/* Right Column - Metadata & Sidebar */}
        <div className="space-y-6">
          {/* Thumbnail */}
          <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl border border-gray-200 dark:border-zinc-800">
             <ImageUpload
                label="Thumbnail Image"
                value={formData.thumbnail_url}
                onChange={(url) => setFormData({ ...formData, thumbnail_url: url as string })}
              />
          </div>

          {/* Links */}
          <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl border border-gray-200 dark:border-zinc-800 space-y-4">
             <h3 className="font-semibold text-gray-900 dark:text-white">Links</h3>
             <div className="space-y-2">
                <label className="text-xs text-gray-500">Preview Link</label>
                <input
                    type="url"
                    value={formData.preview_link}
                    onChange={(e) => setFormData({...formData, preview_link: e.target.value})}
                    placeholder="https://..."
                    className="w-full px-3 py-2 rounded-md border border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-800/50 text-sm"
                />
             </div>
             <div className="space-y-2">
                <label className="text-xs text-gray-500">Repository Link</label>
                 <input
                    type="url"
                    value={formData.repo_link}
                    onChange={(e) => setFormData({...formData, repo_link: e.target.value})}
                    placeholder="https://github.com/..."
                    className="w-full px-3 py-2 rounded-md border border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-800/50 text-sm"
                />
             </div>
          </div>

          {/* Tags */}
          <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl border border-gray-200 dark:border-zinc-800 space-y-4">
            <h3 className="font-semibold text-gray-900 dark:text-white">Categorization</h3>
            <TagInput
              label="Categories"
              value={formData.category}
              onChange={(tags) => setFormData({ ...formData, category: tags })}
              placeholder="Add category (e.g. Web App)"
            />
            <TagInput
              label="Status"
              value={formData.status}
              onChange={(tags) => setFormData({ ...formData, status: tags })}
              placeholder="Add status (e.g. Completed)"
            />
            <TagInput
              label="Languages/Tech"
              value={formData.language}
              onChange={(tags) => setFormData({ ...formData, language: tags })}
              placeholder="Add tech (e.g. React)"
            />
          </div>
        </div>
      </div>

      {/* Floating Save Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full shadow-lg flex items-center gap-2 font-semibold transition-transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
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
    </form>
  );
};

export default ProjectForm;
