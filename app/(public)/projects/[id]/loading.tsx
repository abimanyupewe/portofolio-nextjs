import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div role="status" aria-label="Loading" className="container mx-auto max-w-5xl px-4 pb-24 pt-32 md:px-8">
      <Skeleton className="mb-10 h-4 w-28" />
      <div className="mb-12 space-y-6">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-12 w-3/4 md:h-16" />
        <div className="max-w-2xl space-y-2">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-11/12" />
          <Skeleton className="h-5 w-2/3" />
        </div>
        <Skeleton className="h-12 w-44 rounded-full" />
      </div>
      <Skeleton className="aspect-[16/10] w-full rounded-xl" />
      <div className="mt-4 flex gap-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-16 w-24" />
        ))}
      </div>
      <div className="my-12 grid grid-cols-1 gap-6 border-y border-border py-6 sm:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-5 w-32" />
          </div>
        ))}
      </div>
    </div>
  );
}
