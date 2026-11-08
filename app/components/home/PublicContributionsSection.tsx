import Link from "next/link";
import { ExternalLink, Github } from "lucide-react";
import Title from "@/app/components/home/props/Title";
import type { ProjectType } from "@/app/components/home/project/ProjectPopup";

const publicUrl = (value?: string) => (value && /^https?:\/\//i.test(value) ? value : undefined);

export default function PublicContributionsSection({ projects }: { projects: ProjectType[] }) {
  const publicProjects = projects.filter(
    (project) => project.show_in_public_contributions && (publicUrl(project.preview_link) || publicUrl(project.repo_link))
  );

  return (
    <section id="public-contributions" className="container mx-auto px-4 py-20 md:px-8 lg:px-16">
      <div className="mb-8">
        <Title text1="PUBLIC" text2="CONTRIBUTIONS" />
        <p className="mt-4 max-w-xl text-muted-foreground">
          Products and projects available to explore in public.
        </p>
      </div>

      {publicProjects.length ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {publicProjects.map((project) => {
            const liveUrl = publicUrl(project.preview_link);
            const repoUrl = publicUrl(project.repo_link);

            return (
              <div
                key={project.id}
                className="flex min-h-32 flex-col justify-between gap-6 border border-border p-5 transition-colors hover:border-foreground/50"
              >
                <h3 className="font-heading text-xl font-semibold">{project.title}</h3>
                <div className="flex flex-wrap items-center gap-4 text-sm">
                  {liveUrl && (
                    <Link href={liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:opacity-60">
                      Live <ExternalLink size={14} />
                    </Link>
                  )}
                  {repoUrl && (
                    <Link href={repoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground">
                      Code <Github size={14} />
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="border-y border-border py-8 text-muted-foreground">
          No public contributions yet.
        </p>
      )}
    </section>
  );
}
