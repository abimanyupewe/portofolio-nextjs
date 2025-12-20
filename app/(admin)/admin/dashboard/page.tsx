export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Dashboard Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard title="Total Projects" value="12" />
        <StatsCard title="Total Blogs" value="5" />
        <StatsCard title="Views" value="1.2k" />
      </div>
    </div>
  );
}

function StatsCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="p-6 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm">
      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</h3>
      <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">{value}</p>
    </div>
  );
}
