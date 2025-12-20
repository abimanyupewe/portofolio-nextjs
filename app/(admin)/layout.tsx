import Link from 'next/link';
import { LayoutDashboard, FolderKanban, FileText, User, Settings, LogOut } from 'lucide-react';
import { ThemeProvider } from "@/app/components/theme-provider";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-black">
      <ThemeProvider
         attribute="class"
         defaultTheme="system"
         enableSystem
         disableTransitionOnChange
       >
        {/* Sidebar */}
        <aside className="w-64 bg-white dark:bg-black border-r border-gray-200 dark:border-gray-800 hidden md:flex flex-col">
            <div className="p-6">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
                Admin Panel
            </h1>
            </div>

            <nav className="flex-1 px-4 space-y-2">
            <NavItem href="/admin/dashboard" icon={<LayoutDashboard size={20} />} label="Overview" />
            <NavItem href="/admin/dashboard/projects" icon={<FolderKanban size={20} />} label="Projects" />
            <NavItem href="/admin/dashboard/profile" icon={<User size={20} />} label="Profile & Skills" />
            <NavItem href="/admin/dashboard/experiences" icon={<FileText size={20} />} label="Exp & Certs" />
            </nav>

            <div className="p-4 border-t border-gray-200 dark:border-gray-800 space-y-2">
            <div className="flex items-center gap-3 text-sm text-gray-500 px-4">
                <Settings size={18} />
                <span>Settings</span>
            </div>
            
            <a 
                href="/api/admin/logout" 
                className="flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-colors cursor-pointer"
            >
                <LogOut size={18} />
                <span>Logout</span>
            </a>
            </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 overflow-y-auto">
            {children}
        </main>
      </ThemeProvider>
    </div>
  );
}

function NavItem({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-900 rounded-lg transition-colors"
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}
