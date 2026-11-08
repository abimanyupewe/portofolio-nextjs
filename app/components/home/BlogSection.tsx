import Image from "next/image";
import Link from "next/link";
import Title from "@/app/components/home/props/Title";

type Blog = {
  slug: string;
  title: string;
  excerpt: string;
  thumbnail_url?: string;
  created_at: string;
};

export default function BlogSection({ blogs }: { blogs: Blog[] }) {
  return (
    <section id="blog" className="container mx-auto px-4 py-20 md:px-8 lg:px-16">
      <div className="mb-8 flex items-end justify-between gap-6">
        <div>
          <Title text1="LATEST" text2="NOTES" />
          <p className="mt-4 max-w-xl text-muted-foreground">
            Notes on software development, testing, and the lessons behind each project.
          </p>
        </div>
        <Link href="/blog" className="shrink-0 text-sm font-medium underline underline-offset-4 hover:opacity-70">
          View all
        </Link>
      </div>

      {blogs.length ? (
        <div className="grid gap-6 md:grid-cols-3">
          {blogs.slice(0, 3).map((blog) => (
            <article key={blog.slug} className="overflow-hidden border border-border bg-background">
              {blog.thumbnail_url && (
                <div className="relative aspect-[16/9]">
                  <Image src={blog.thumbnail_url} alt={blog.title} fill className="object-cover" />
                </div>
              )}
              <div className="space-y-3 p-5">
                <time dateTime={blog.created_at} className="text-xs uppercase tracking-[0.15em] text-muted-foreground">
                  {new Date(blog.created_at).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                </time>
                <h3 className="font-heading text-xl font-semibold leading-tight">
                  <Link href={`/blog/${blog.slug}`} className="hover:opacity-70">{blog.title}</Link>
                </h3>
                <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">{blog.excerpt}</p>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <p className="border-y border-border py-8 text-muted-foreground">No published notes yet.</p>
      )}
    </section>
  );
}
