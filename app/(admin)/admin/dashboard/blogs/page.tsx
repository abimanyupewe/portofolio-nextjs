"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Pencil, Trash2 } from "lucide-react";
import Image from "next/image";
import { getBlogs, deleteBlog } from "@/app/actions/blogs";

interface Blog {
  id: string;
  title: string;
  slug: string;
  published: boolean;
  thumbnail_url?: string;
  created_at: string;
}

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const data = await getBlogs();
      setBlogs(data || []);
    } catch (error) {
      console.error("Error fetching blogs", error);
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return;
    try {
      await deleteBlog(id);
      fetchBlogs();
    } catch (error) {
      alert("Error deleting blog");
    }
  };

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold dark:text-white">Blogs</h1>
        <Link
          href="/admin/dashboard/blogs/create"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <Plus size={20} />
          Add Post
        </Link>
      </div>

      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 dark:bg-zinc-800/50 text-gray-600 dark:text-gray-400">
            <tr>
              <th className="p-4">Thumbnail</th>
              <th className="p-4">Title</th>
              <th className="p-4 hidden md:table-cell">Status</th>
              <th className="p-4 hidden md:table-cell">Date</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-zinc-800/50">
            {blogs.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-gray-500">
                  No blog posts found.
                </td>
              </tr>
            ) : (
              blogs.map((blog) => (
                <tr key={blog.id} className="hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors">
                  <td className="p-4">
                    <div className="relative w-16 h-12 bg-gray-100 dark:bg-zinc-800 rounded-md overflow-hidden">
                      {blog.thumbnail_url ? (
                        <Image
                          src={blog.thumbnail_url}
                          alt={blog.title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full text-xs text-gray-400">
                          No img
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="p-4 font-medium dark:text-white">
                    <div>{blog.title}</div>
                    <div className="text-xs text-gray-500 font-mono mt-1">/{blog.slug}</div>
                  </td>
                  <td className="p-4 hidden md:table-cell">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${blog.published
                        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                        : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300"
                        }`}
                    >
                      {blog.published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="p-4 hidden md:table-cell text-sm text-gray-500">
                    {new Date(blog.created_at).toLocaleDateString()}
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/dashboard/blogs/${blog.id}`}
                        className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                      >
                        <Pencil size={18} />
                      </Link>
                      <button
                        onClick={() => handleDelete(blog.id)}
                        className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
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
  );
}
