"use client";

import { Fragment } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ModeToggle } from "@/app/components/mode-toggle";

const names: Record<string, string> = {
    projects: "Projects",
    blogs: "Blogs",
    experiences: "Exp & Certs",
    profile: "Profile & Skills",
    impressions: "Impressions",
    notes: "Playground Notes",
    companies: "Companies",
    faqs: "FAQ",
    banner: "Banner",
};

export default function AdminHeader() {
    const pathname = usePathname();
    const [section, sub] = pathname.replace("/admin/dashboard", "").split("/").filter(Boolean);

    const crumbs: { label: string; href?: string }[] = [{ label: "Dashboard", href: "/admin/dashboard" }];
    if (section) crumbs.push({ label: names[section] ?? section, href: sub ? `/admin/dashboard/${section}` : undefined });
    if (sub) crumbs.push({ label: sub === "create" ? "New" : "Edit" });

    return (
        <header className="sticky top-0 z-20 flex h-14 shrink-0 items-center gap-2 border-b border-border bg-background/80 px-4 backdrop-blur">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
            <Breadcrumb>
                <BreadcrumbList>
                    {crumbs.map((c, i) => (
                        <Fragment key={c.label}>
                            {i > 0 && <BreadcrumbSeparator />}
                            <BreadcrumbItem>
                                {c.href && i < crumbs.length - 1 ? (
                                    <BreadcrumbLink asChild>
                                        <Link href={c.href}>{c.label}</Link>
                                    </BreadcrumbLink>
                                ) : (
                                    <BreadcrumbPage>{c.label}</BreadcrumbPage>
                                )}
                            </BreadcrumbItem>
                        </Fragment>
                    ))}
                </BreadcrumbList>
            </Breadcrumb>
            <div className="ml-auto">
                <ModeToggle />
            </div>
        </header>
    );
}
