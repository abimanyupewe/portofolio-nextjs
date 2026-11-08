import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getBlogBySlug, getPublishedBlogs } from "@/app/actions/blogs";
import { absoluteUrl, jsonLdScript, personJsonLd } from "@/lib/seo";

export const revalidate = 60;

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const blogs = await getPublishedBlogs();
  return (blogs ?? []).map((blog: { slug: string }) => ({ slug: blog.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const blog = await getBlogBySlug((await params).slug);
  if (!blog) return { title: "Note not found" };

  return {
    title: blog.title,
    description: blog.excerpt,
    alternates: { canonical: `/blog/${blog.slug}` },
    openGraph: {
      type: "article",
      url: `/blog/${blog.slug}`,
      title: blog.title,
      description: blog.excerpt,
      publishedTime: blog.created_at,
      images: blog.thumbnail_url ? [{ url: blog.thumbnail_url, alt: blog.title }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.excerpt,
      images: blog.thumbnail_url ? [blog.thumbnail_url] : undefined,
    },
  };
}

export default async function BlogDetailPage({ params }: Params) {
  const blog = await getBlogBySlug((await params).slug);
  if (!blog) notFound();

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: blog.title,
    description: blog.excerpt,
    image: blog.thumbnail_url ? absoluteUrl(blog.thumbnail_url) : undefined,
    datePublished: blog.created_at,
    author: personJsonLd,
    mainEntityOfPage: absoluteUrl(`/blog/${blog.slug}`),
  };

  return (
    <main className="container mx-auto max-w-3xl px-4 pb-24 pt-32 md:px-8">
      <script {...jsonLdScript(articleJsonLd)} />
      <Link href="/blog" className="mb-10 inline-block text-sm text-muted-foreground hover:text-foreground">← All notes</Link>
      <article>
        <header className="mb-10 space-y-5">
          <time dateTime={blog.created_at} className="text-xs uppercase tracking-[0.15em] text-muted-foreground">
            {new Date(blog.created_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
          </time>
          <h1 className="font-heading text-4xl font-semibold leading-tight md:text-6xl">{blog.title}</h1>
          <p className="text-xl leading-relaxed text-muted-foreground">{blog.excerpt}</p>
          {blog.thumbnail_url && (
            <div className="relative mt-8 aspect-[16/9] overflow-hidden">
              <Image src={blog.thumbnail_url} alt={blog.title} fill priority className="object-cover" />
            </div>
          )}
        </header>
        <div className="whitespace-pre-line text-lg leading-8 text-foreground/85">{blog.content}</div>
      </article>
    </main>
  );
}
