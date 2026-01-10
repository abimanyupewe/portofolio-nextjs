import Sidebar from "@/app/components/admin/Sidebar";
import { ThemeProvider } from "@/app/components/theme-provider";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-50/50 dark:bg-black font-sans">
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto h-screen scrollbar-hide">
          {children}
        </main>
      </ThemeProvider>
    </div>
  );
}
