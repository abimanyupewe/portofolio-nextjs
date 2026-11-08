"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    FolderKanban,
    FileText,
    User,
    Settings,
    LogOut,
    ChevronLeft,
    ChevronRight,
    Menu,
    MessageSquare,
} from "lucide-react";
import { cn } from "@/lib/utils";

const Sidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const pathname = usePathname();

    const toggleSidebar = () => setIsCollapsed(!isCollapsed);

    const menuItems = [
        {
            href: "/admin/dashboard",
            icon: <LayoutDashboard size={20} />,
            label: "Overview",
        },
        {
            href: "/admin/dashboard/projects",
            icon: <FolderKanban size={20} />,
            label: "Projects",
        },
        {
            href: "/admin/dashboard/profile",
            icon: <User size={20} />,
            label: "Profile & Skills",
        },
        {
            href: "/admin/dashboard/experiences",
            icon: <FileText size={20} />,
            label: "Exp & Certs",
        },
        {
            href: "/admin/dashboard/blogs",
            icon: <FileText size={20} />,
            label: "Blogs"
        },
        {
            href: "/admin/dashboard/notes",
            icon: <MessageSquare size={20} />,
            label: "Playground Notes"
        }
    ];

    return (
        <>
            {/* Mobile Sidebar Overlay would go here if we implemented mobile state efficiently, 
          but for now let's focus on Desktop polish */}

            <aside
                className={cn(
                    "bg-white dark:bg-black border-r border-gray-200 dark:border-zinc-800 hidden md:flex flex-col transition-all duration-300 relative",
                    isCollapsed ? "w-20" : "w-72"
                )}
            >
                {/* Toggle Button */}
                <button
                    onClick={toggleSidebar}
                    className="absolute -right-3 top-8 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-full p-1.5 hover:bg-gray-100 dark:hover:bg-zinc-700 transition-colors z-20 shadow-sm"
                >
                    {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
                </button>

                {/* Header */}
                <div className="p-6 flex items-center gap-3 overflow-hidden whitespace-nowrap">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shrink-0">
                        <span className="text-white font-bold text-lg">A</span>
                    </div>
                    <span
                        className={cn(
                            "font-bold text-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text transition-opacity duration-300",
                            isCollapsed ? "opacity-0 w-0" : "opacity-100"
                        )}
                    >
                        AdminPanel
                    </span>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-3 space-y-2 mt-4">
                    {menuItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group relative overflow-hidden",
                                    isActive
                                        ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                                        : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-zinc-900 hover:text-gray-900 dark:hover:text-gray-200"
                                )}
                                title={isCollapsed ? item.label : undefined}
                            >
                                <span className={cn("shrink-0", isActive && "text-blue-600 dark:text-blue-400")}>
                                    {item.icon}
                                </span>

                                <span
                                    className={cn(
                                        "font-medium transition-all duration-300 whitespace-nowrap",
                                        isCollapsed ? "opacity-0 w-0 translate-x-4" : "opacity-100 translate-x-0"
                                    )}
                                >
                                    {item.label}
                                </span>

                                {/* Active Indicator Bar */}
                                {isActive && (
                                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-blue-600 rounded-r-full" />
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* Footer */}
                <div className="p-4 border-t border-gray-100 dark:border-zinc-800 space-y-2">

                    {!isCollapsed && (
                        <p className="text-xs font-medium text-gray-400 px-3 py-2 uppercase tracking-wider">
                            Settings
                        </p>
                    )}

                    <Link
                        href="/admin/settings"
                        className="flex items-center gap-3 px-3 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                        title="Settings"
                    >
                        <Settings size={20} />
                        <span className={cn("transition-all duration-300 whitespace-nowrap", isCollapsed ? "hidden" : "block")}>
                            Settings
                        </span>
                    </Link>

                    <a
                        href="/api/auth/signout"
                        className="flex items-center gap-3 px-3 py-2 text-red-500 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                        title="Logout"
                    >
                        <LogOut size={20} />
                        <span className={cn("transition-all duration-300 whitespace-nowrap", isCollapsed ? "hidden" : "block")}>
                            Logout
                        </span>
                    </a>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
