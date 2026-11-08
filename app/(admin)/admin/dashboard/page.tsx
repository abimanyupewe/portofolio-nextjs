import Link from "next/link";
import {
  ArrowUpRight,
  Award,
  Briefcase,
  Building2,
  FileText,
  FolderKanban,
  Heart,
  HelpCircle,
  MessageSquare,
  Plus,
} from "lucide-react";
import connectToDatabase from "@/lib/mongodb";
import ProjectModel from "@/models/Project";
import BlogModel from "@/models/Blog";
import CertificateModel from "@/models/Certificate";
import ExperienceModel from "@/models/Experience";
import ImpressionModel from "@/models/Impression";
import NoteModel from "@/models/PlaygroundNote";
import CompanyModel from "@/models/Company";
import FaqModel from "@/models/Faq";
import BannerModel from "@/models/Banner";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export const revalidate = 0;

const fmt = (d: Date) => new Date(d).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });

export default async function DashboardPage() {
  await connectToDatabase();

  const [projects, blogs, certificates, experiences, impressions, notes, companies, faqs, banner, recentImpressions, recentNotes] =
    await Promise.all([
      ProjectModel.countDocuments(),
      BlogModel.countDocuments(),
      CertificateModel.countDocuments(),
      ExperienceModel.countDocuments(),
      ImpressionModel.countDocuments(),
      NoteModel.countDocuments(),
      CompanyModel.countDocuments(),
      FaqModel.countDocuments(),
      BannerModel.findOne({}, "enabled message").lean() as Promise<{ enabled?: boolean; message?: string } | null>,
      // never select ip_hash / liked_by: they are visitor identifiers
      ImpressionModel.find({}, "name company message created_at").sort({ created_at: -1 }).limit(5).lean(),
      NoteModel.find({}, "word").sort({ created_at: -1 }).limit(16).lean(),
    ]);

  const stats = [
    { label: "Projects", value: projects, icon: FolderKanban, href: "/admin/dashboard/projects" },
    { label: "Blogs", value: blogs, icon: FileText, href: "/admin/dashboard/blogs" },
    { label: "Certificates", value: certificates, icon: Award, href: "/admin/dashboard/experiences" },
    { label: "Experiences", value: experiences, icon: Briefcase, href: "/admin/dashboard/experiences" },
    { label: "Impressions", value: impressions, icon: Heart, href: "/admin/dashboard/impressions" },
    { label: "Playground notes", value: notes, icon: MessageSquare, href: "/admin/dashboard/notes" },
    { label: "Companies", value: companies, icon: Building2, href: "/admin/dashboard/companies" },
    { label: "FAQ", value: faqs, icon: HelpCircle, href: "/admin/dashboard/faqs" },
  ];

  return (
    <div className="mx-auto max-w-6xl space-y-8 pb-12">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <h1 className="font-heading text-3xl font-semibold tracking-tight">Overview</h1>
          <p className="mt-1 text-muted-foreground">What&apos;s on your site right now.</p>
        </div>
        <div className="flex gap-2">
          <Link href="/admin/dashboard/projects/create" className={cn(buttonVariants({ size: "sm" }))}>
            <Plus /> New project
          </Link>
          <Link href="/admin/dashboard/blogs/create" className={cn(buttonVariants({ variant: "outline", size: "sm" }))}>
            <Plus /> New post
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s) => (
          <Link key={s.label} href={s.href} className="group">
            <Card className="h-full gap-3 py-5 transition-colors group-hover:border-foreground/40">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 px-5">
                <CardDescription>{s.label}</CardDescription>
                <s.icon className="size-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="flex items-end justify-between px-5">
                <span className="font-heading text-4xl font-semibold tabular-nums">{s.value}</span>
                <ArrowUpRight className="size-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Recent impressions</CardTitle>
            <CardDescription>Latest words about working with you.</CardDescription>
          </CardHeader>
          <CardContent>
            {recentImpressions.length ? (
              <ul className="divide-y divide-border">
                {recentImpressions.map((i: any) => (
                  <li key={String(i._id)} className="space-y-1 py-3 first:pt-0 last:pb-0">
                    <div className="flex items-baseline justify-between gap-3">
                      <p className="truncate text-sm font-medium">
                        {i.name}
                        {i.company && <span className="font-normal text-muted-foreground"> · {i.company}</span>}
                      </p>
                      <span className="shrink-0 text-xs text-muted-foreground">{fmt(i.created_at)}</span>
                    </div>
                    <p className="line-clamp-2 text-sm text-muted-foreground">{i.message}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="py-8 text-center text-sm text-muted-foreground">No impressions yet.</p>
            )}
            {impressions > 0 && (
              <Link href="/admin/dashboard/impressions" className="mt-4 inline-block text-sm underline-offset-4 hover:underline">
                Manage all {impressions}
              </Link>
            )}
          </CardContent>
        </Card>

        <div className="space-y-4 lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Sticky banner</CardTitle>
              <CardDescription>
                <Badge variant={banner?.enabled ? "default" : "outline"}>{banner?.enabled ? "Live" : "Off"}</Badge>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="line-clamp-2 text-sm text-muted-foreground">
                {banner?.message || "No banner set up yet."}
              </p>
              <Link href="/admin/dashboard/banner" className="text-sm underline-offset-4 hover:underline">
                Edit banner
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Latest playground words</CardTitle>
            </CardHeader>
            <CardContent>
              {recentNotes.length ? (
                <div className="flex flex-wrap gap-2">
                  {recentNotes.map((n: any) => (
                    <Badge key={String(n._id)} variant="outline">
                      {n.word}
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No words yet.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
