import connectToDatabase from "@/lib/mongodb";
import ProjectModel from "@/models/Project";
import BlogModel from "@/models/Blog";
import CertificateModel from "@/models/Certificate";
import { FolderKanban, FileText, Award, ArrowUpRight, Plus } from "lucide-react";
import Link from "next/link";

export const revalidate = 0;

export default async function DashboardPage() {
  await connectToDatabase();

  const [projectCount, blogCount, certificateCount] = await Promise.all([
    ProjectModel.countDocuments(),
    BlogModel.countDocuments(),
    CertificateModel.countDocuments(),
  ]);

  const stats = [
    {
      label: "Total Projects",
      value: projectCount || 0,
      icon: <FolderKanban className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
      bg: "bg-blue-50 dark:bg-blue-900/10",
      border: "border-blue-100 dark:border-blue-900/20",
      link: "/admin/dashboard/projects"
    },
    {
      label: "Total Blogs",
      value: blogCount || 0,
      icon: <FileText className="w-6 h-6 text-purple-600 dark:text-purple-400" />,
      bg: "bg-purple-50 dark:bg-purple-900/10",
      border: "border-purple-100 dark:border-purple-900/20",
      link: "/admin/dashboard/blogs"
    },
    {
      label: "Certificates",
      value: certificateCount || 0,
      icon: <Award className="w-6 h-6 text-orange-600 dark:text-orange-400" />,
      bg: "bg-orange-50 dark:bg-orange-900/10",
      border: "border-orange-100 dark:border-orange-900/20",
      link: "/admin/dashboard/experiences"
    },
  ];

  return (
    <div className="space-y-8 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">
            Overview
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Welcome back! Here's what's happening today.
          </p>
        </div>

        <div className="flex gap-3">
          <Link
            href="/admin/dashboard/projects/create"
            className="flex items-center gap-2 px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg hover:opacity-90 transition-opacity font-medium text-sm"
          >
            <Plus size={16} /> New Project
          </Link>
          <Link
            href="/admin/dashboard/blogs/create"
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-zinc-800 text-gray-900 dark:text-white rounded-lg hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors font-medium text-sm"
          >
            <Plus size={16} /> New Post
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat, i) => (
          <Link
            key={i}
            href={stat.link}
            className={`p-6 rounded-2xl border ${stat.border} ${stat.bg} hover:shadow-lg transition-all duration-300 group`}
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-white dark:bg-black/20 rounded-xl shadow-sm">
                {stat.icon}
              </div>
              <ArrowUpRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-200 transition-colors" />
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                {stat.label}
              </h3>
              <p className="text-4xl font-bold mt-2 text-gray-900 dark:text-white">
                {stat.value}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Activity Section (Placeholder) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-zinc-900/50 border border-gray-100 dark:border-zinc-800 p-6 rounded-2xl">
          <h3 className="font-semibold text-lg mb-4 dark:text-white">Recent Activity</h3>
          <div className="flex flex-col items-center justify-center h-40 text-gray-400 text-sm border-2 border-dashed border-gray-100 dark:border-zinc-800 rounded-xl">
            No recent activity to show
          </div>
        </div>

        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-6 rounded-2xl text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 p-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
          <div className="relative z-10">
            <h3 className="font-bold text-xl mb-2">Portfolio Analytics</h3>
            <p className="text-white/80 mb-6 max-w-sm">
              Check your website performance, visitor count, and most viewed projects.
            </p>
            <button className="px-5 py-2.5 bg-white text-indigo-600 rounded-lg font-semibold text-sm hover:shadow-lg hover:scale-105 transition-all">
              View Analytics
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
