import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div role="status" aria-label="Loading" className="container mx-auto px-4 pb-20 pt-32 md:px-8 lg:px-16">
      <Skeleton className="mb-8 h-4 w-16" />
      <Skeleton className="mb-3 h-12 w-80 max-w-full" />
      <Skeleton className="mb-12 h-5 w-96 max-w-full" />
      <Skeleton className="mb-10 h-10 w-full" />
      <div className="grid gap-5 md:grid-cols-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="space-y-6 rounded-xl border border-border p-6">
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-11/12" />
              <Skeleton className="h-4 w-2/3" />
            </div>
            <div className="flex items-end justify-between">
              <div className="space-y-2">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-3 w-24" />
              </div>
              <Skeleton className="size-9 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
