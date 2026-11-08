"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Building2,
    ExternalLink,
    FileText,
    FolderKanban,
    Heart,
    HelpCircle,
    LayoutDashboard,
    LogOut,
    Megaphone,
    MessageSquare,
    User,
    Briefcase,
} from "lucide-react";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar";

const groups = [
    {
        label: "Content",
        items: [
            { href: "/admin/dashboard", label: "Overview", icon: LayoutDashboard, exact: true },
            { href: "/admin/dashboard/projects", label: "Projects", icon: FolderKanban },
            { href: "/admin/dashboard/blogs", label: "Blogs", icon: FileText },
            { href: "/admin/dashboard/experiences", label: "Exp & Certs", icon: Briefcase },
            { href: "/admin/dashboard/profile", label: "Profile & Skills", icon: User },
        ],
    },
    {
        label: "Community",
        items: [
            { href: "/admin/dashboard/impressions", label: "Impressions", icon: Heart },
            { href: "/admin/dashboard/notes", label: "Playground Notes", icon: MessageSquare },
        ],
    },
    {
        label: "Site",
        items: [
            { href: "/admin/dashboard/companies", label: "Companies", icon: Building2 },
            { href: "/admin/dashboard/faqs", label: "FAQ", icon: HelpCircle },
            { href: "/admin/dashboard/banner", label: "Banner", icon: Megaphone },
        ],
    },
];

export default function AdminSidebar() {
    const pathname = usePathname();

    return (
        <Sidebar collapsible="icon">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/admin/dashboard">
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary font-heading text-sm font-semibold text-sidebar-primary-foreground">
                                    A
                                </div>
                                <div className="grid flex-1 text-left leading-tight">
                                    <span className="truncate font-heading text-base font-semibold">Admin Panel</span>
                                    <span className="truncate text-xs text-muted-foreground">Portfolio</span>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                {groups.map((group) => (
                    <SidebarGroup key={group.label}>
                        <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {group.items.map((item) => {
                                    const active = item.exact ? pathname === item.href : pathname.startsWith(item.href);
                                    return (
                                        <SidebarMenuItem key={item.href}>
                                            <SidebarMenuButton asChild isActive={active} tooltip={item.label}>
                                                <Link href={item.href}>
                                                    <item.icon />
                                                    <span>{item.label}</span>
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    );
                                })}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))}
            </SidebarContent>

            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild tooltip="View site">
                            <a href="/" target="_blank" rel="noopener noreferrer">
                                <ExternalLink />
                                <span>View site</span>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        {/* plain anchor: the logout route clears the cookie and redirects, it is not a page */}
                        <SidebarMenuButton asChild tooltip="Logout" className="text-destructive hover:text-destructive">
                            <a href="/api/admin/logout">
                                <LogOut />
                                <span>Logout</span>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
