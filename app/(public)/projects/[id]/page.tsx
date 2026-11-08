import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, ArrowUpRight, Github } from "lucide-react";
import { getProject, getProjects } from "@/app/actions/projects";
import ProjectShowcase from "@/app/components/home/project/ProjectShowcase";
import { absoluteUrl, jsonLdScript, personJsonLd } from "@/lib/seo";

export const revalidate = 60;

type Params = { params: Promise<{ id: string }> };

// An invalid ObjectId makes findById throw; treat that like "not found".
const load = async (id: string) => {
  try {
    return await getProject(id);
  } catch {
    return null;
  }
};

const real = (url?: string) => (url && url !== "None" && /^https?:\/\//i.test(url) ? url : undefined);

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const project = await load((await params).id);
  if (!project) return { title: "Project not found | Abimanyu" };
  return {
    title: `${project.title} | Abimanyu`,
    description: project.description,
    alternates: { canonical: `/projects/${project.id}` },
    openGraph: {
      type: "article",
      url: `/projects/${project.id}`,
      title: project.title,
      description: project.description,
      images: project.thumbnail_url ? [{ url: project.thumbnail_url, alt: project.title }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.description,
      images: project.thumbnail_url ? [project.thumbnail_url] : undefined,
    },
  };
}

export default async function ProjectDetailPage({ params }: Params) {
  const { id } = await params;
  const project = await load(id);
  if (!project) notFound();

  const all: { id: string; title: string }[] = (await getProjects()) ?? [];
  const at = all.findIndex((p) => p.id === project.id);
  const prev = all.length > 1 ? all[(at - 1 + all.length) % all.length] : null;
  const next = all.length > 1 ? all[(at + 1) % all.length] : null;

  const images: string[] = [project.thumbnail_url, ...(project.gallery_urls ?? [])].filter(Boolean);
  const date = new Date(project.created_at);
  const dateText = isNaN(date.getTime())
    ? null
    : date.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
  const live = real(project.preview_link);
  const repo = real(project.repo_link);

  const projectJsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    image: project.thumbnail_url ? absoluteUrl(project.thumbnail_url) : undefined,
    url: absoluteUrl(`/projects/${project.id}`),
    author: personJsonLd,
  };

  const meta = [
    { label: "Status", value: project.status?.join(", ") },
    { label: "Language", value: project.language?.join(", ") },
    { label: "Date", value: dateText },
  ].filter((m) => m.value);

  return (
    <article className="container mx-auto max-w-5xl px-4 pb-24 pt-32 md:px-8">
      <script {...jsonLdScript(projectJsonLd)} />
      <Link
        href="/#project"
        className="mb-10 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft size={16} /> All projects
      </Link>

      <header className="mb-12 space-y-6">
        {project.category?.length > 0 && (
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">{project.category.join(" · ")}</p>
        )}
        <h1 className="font-heading text-4xl font-light leading-[1.05] tracking-tight md:text-6xl">{project.title}</h1>
        {project.description && (
          <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">{project.description}</p>
        )}

        {(live || repo) && (
          <div className="flex flex-wrap gap-3 pt-2">
            {live && (
              <a
                href={live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-background transition hover:opacity-85 active:scale-[0.98]"
              >
                Live preview <ArrowUpRight size={16} />
              </a>
            )}
            {repo && (
              <a
                href={repo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border px-7 py-3 text-xs font-semibold uppercase tracking-[0.2em] transition hover:bg-foreground hover:text-background active:scale-[0.98]"
              >
                <Github size={16} /> Repository
              </a>
            )}
          </div>
        )}
      </header>

      <ProjectShowcase images={images} title={project.title} />

      {meta.length > 0 && (
        <dl className="my-12 grid grid-cols-1 divide-y divide-border border-y border-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {meta.map((m) => (
            <div key={m.label} className="space-y-1 py-4 sm:px-6 sm:first:pl-0 sm:last:pr-0">
              <dt className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{m.label}</dt>
              <dd className="text-base">{m.value}</dd>
            </div>
          ))}
        </dl>
      )}

      {project.content && (
        <section className="mb-16 max-w-2xl space-y-4">
          <h2 className="text-xs uppercase tracking-[0.3em] text-muted-foreground">About this project</h2>
          <p className="whitespace-pre-line text-base leading-relaxed text-foreground/85 md:text-lg">{project.content}</p>
        </section>
      )}

      {prev && next && (
        <nav aria-label="More projects" className="grid gap-px border-y border-border sm:grid-cols-2 sm:divide-x sm:divide-border">
          <Link href={`/projects/${prev.id}`} className="group space-y-1 py-6 sm:pr-6">
            <span className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
              <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" /> Previous
            </span>
            <span className="block font-heading text-xl">{prev.title}</span>
          </Link>
          <Link href={`/projects/${next.id}`} className="group space-y-1 py-6 text-left sm:pl-6 sm:text-right">
            <span className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground sm:justify-end">
              Next <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </span>
            <span className="block font-heading text-xl">{next.title}</span>
          </Link>
        </nav>
      )}
    </article>
  );
}
