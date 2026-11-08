import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getPublishedBlogs } from "@/app/actions/blogs";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Blog",
  description: "Notes on software development, testing, and building digital products.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog | Abimanyu",
    description: "Notes on software development, testing, and building digital products.",
    url: "/blog",
    type: "website",
  },
};

export default async function BlogPage() {
  const blogs = await getPublishedBlogs();

  return (
    <main className="container mx-auto max-w-5xl px-4 pb-24 pt-32 md:px-8">
      <header className="mb-12 max-w-2xl">
        <p className="mb-4 text-sm uppercase tracking-[0.2em] text-muted-foreground">Writing</p>
        <h1 className="font-heading text-4xl font-semibold md:text-6xl">Notes on building better software</h1>
        <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
          Practical notes about development, quality assurance, and the lessons behind each project.
        </p>
      </header>

      {blogs?.length ? (
        <div className="grid gap-8 md:grid-cols-2">
          {blogs.map((blog: { slug: string; title: string; excerpt: string; thumbnail_url?: string; created_at: string }) => (
            <article key={blog.slug} className="overflow-hidden border border-border">
              {blog.thumbnail_url && (
                <div className="relative aspect-[16/9]">
                  <Image src={blog.thumbnail_url} alt={blog.title} fill className="object-cover" />
                </div>
              )}
              <div className="space-y-3 p-6">
                <time dateTime={blog.created_at} className="text-xs uppercase tracking-[0.15em] text-muted-foreground">
                  {new Date(blog.created_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                </time>
                <h2 className="font-heading text-2xl font-semibold">
                  <Link href={`/blog/${blog.slug}`} className="transition-opacity hover:opacity-70">{blog.title}</Link>
                </h2>
                <p className="leading-relaxed text-muted-foreground">{blog.excerpt}</p>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <p className="border-y border-border py-8 text-muted-foreground">No published notes yet.</p>
      )}
    </main>
  );
}
