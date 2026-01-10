import React from "react";
import ProjectForm from "@/app/components/admin/ProjectForm";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getProject } from "@/app/actions/projects";

// ...

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProjectPage({ params }: PageProps) {
  const { id } = await params;

  const project = await getProject(id);

  if (!project) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/dashboard/projects"
          className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
        >
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-2xl font-bold dark:text-white">Edit Project</h1>
      </div>

      <ProjectForm initialData={project} />
    </div>
  );
}
