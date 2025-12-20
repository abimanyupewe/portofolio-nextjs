"use client";

import React from "react";
import BlogForm from "@/app/components/admin/BlogForm";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function CreateBlogPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/dashboard/blogs"
          className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
        >
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-2xl font-bold dark:text-white">Create New Post</h1>
      </div>
      
      <BlogForm />
    </div>
  );
}
