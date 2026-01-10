import React from "react";
import BlogForm from "@/app/components/admin/BlogForm";
import { ArrowLeft } from "lucide-react";

export const dynamic = "force-dynamic";

import Link from "next/link";
import { getBlog } from "@/app/actions/blogs";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditBlogPage({ params }: PageProps) {
  const { id } = await params;

  const blog = await getBlog(id);

  if (!blog) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/dashboard/blogs"
          className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
        >
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-2xl font-bold dark:text-white">Edit Post</h1>
      </div>

      <BlogForm initialData={blog} />
    </div>
  );
}
