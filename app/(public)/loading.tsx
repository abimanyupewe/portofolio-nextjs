import { Skeleton } from "@/components/ui/skeleton";

// Shown while the page's data is fetched: a hero-shaped block, then a section-shaped one.
export default function Loading() {
  return (
    <div role="status" aria-label="Loading" className="space-y-24">
      <section className="flex min-h-screen flex-col items-center justify-center gap-8 px-6">
        <Skeleton className="h-3 w-24" />
        <div className="flex w-full max-w-3xl flex-col items-center gap-4">
          <Skeleton className="h-16 w-4/5 md:h-24" />
          <Skeleton className="h-16 w-3/5 md:h-24" />
        </div>
        <Skeleton className="h-5 w-64" />
        <div className="flex gap-4">
          <Skeleton className="h-12 w-40 rounded-full" />
          <Skeleton className="size-12 rounded-full" />
        </div>
      </section>

      <section className="container mx-auto space-y-8 px-4 pb-24 md:px-8 lg:px-16">
        <Skeleton className="h-10 w-72" />
        <div className="grid gap-6 md:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-48 rounded-xl" />
          ))}
        </div>
      </section>
    </div>
  );
}
