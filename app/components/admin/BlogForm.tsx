"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ImageUpload from "./ImageUpload";
import TagInput from "./TagInput";
import { Loader2 } from "lucide-react";
import { createBlog, updateBlog } from "@/app/actions/blogs";

interface BlogFormProps {
  initialData?: any;
}

const BlogForm: React.FC<BlogFormProps> = ({ initialData }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    slug: initialData?.slug || "",
    excerpt: initialData?.excerpt || "",
    content: initialData?.content || "",
    thumbnail_url: initialData?.thumbnail_url || "",
    tags: initialData?.tags || [],
    published: initialData?.published || false,
  });

  // Auto-generate slug from title if slug is empty
  useEffect(() => {
    if (!initialData && formData.title && !formData.slug) {
      const slug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
      setFormData((prev) => ({ ...prev, slug }));
    }
  }, [formData.title, initialData, formData.slug]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (initialData?.id) {
        // Update
        await updateBlog(initialData.id, formData);
      } else {
        // Create
        await createBlog(formData);
      }

      router.push("/admin/dashboard/blogs");
      router.refresh();
    } catch (error: any) {
      alert("Error saving blog: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl mx-auto pb-20">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Main Info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Blog Title
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              placeholder="Post title..."
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Slug (URL friendly)
            </label>
            <input
              type="text"
              required
              value={formData.slug}
              onChange={(e) =>
                setFormData({ ...formData, slug: e.target.value })
              }
              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-800/50 focus:ring-2 focus:ring-blue-500 outline-none transition-all font-mono text-sm"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Excerpt
            </label>
            <textarea
              required
              rows={3}
              value={formData.excerpt}
              onChange={(e) =>
                setFormData({ ...formData, excerpt: e.target.value })
              }
              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              placeholder="Short summary for preview..."
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Content (Markdown)
            </label>
            <textarea
              required
              rows={15}
              value={formData.content}
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 focus:ring-2 focus:ring-blue-500 outline-none transition-all font-mono text-sm"
              placeholder="Write your blog post here..."
            />
          </div>
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl border border-gray-200 dark:border-zinc-800">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.published}
                onChange={(e) =>
                  setFormData({ ...formData, published: e.target.checked })
                }
                className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="font-medium text-gray-900 dark:text-white">
                Published
              </span>
            </label>
          </div>

          <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl border border-gray-200 dark:border-zinc-800">
            <ImageUpload
              label="Thumbnail Image"
              value={formData.thumbnail_url}
              onChange={(url) =>
                setFormData({ ...formData, thumbnail_url: url as string })
              }
              folder="blogs"
            />
          </div>

          <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl border border-gray-200 dark:border-zinc-800">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
              Tags
            </h3>
            <TagInput
              value={formData.tags}
              onChange={(tags) => setFormData({ ...formData, tags })}
              placeholder="Add tag..."
            />
          </div>
        </div>
      </div>

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
            "Save Post"
          )}
        </button>
      </div>
    </form>
  );
};

export default BlogForm;
