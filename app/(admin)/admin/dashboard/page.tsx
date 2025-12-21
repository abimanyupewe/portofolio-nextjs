import { supabase } from "@/lib/supabase";

export const revalidate = 0; // Ensure dynamic data

export default async function DashboardPage() {
  // Fetch Total Projects
  const { count: projectCount } = await supabase
    .from("projects")
    .select("*", { count: "exact", head: true });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">
        Dashboard Overview
      </h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Total Projects Card */}
        <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 shadow-xl shadow-gray-200/50 dark:shadow-black/50 transition-all duration-300 hover:scale-[1.02]">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Total Projects
          </h3>
          <p className="text-4xl font-bold mt-2 text-gray-900 dark:text-white">
            {projectCount || 0}
          </p>
        </div>
      </div>
    </div>
  );
}
