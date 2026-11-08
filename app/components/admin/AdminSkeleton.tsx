import { Skeleton } from "@/components/ui/skeleton";

// Generic admin placeholder: a title, a form-ish block and a few rows.
const AdminSkeleton = () => (
  <div role="status" aria-label="Loading" className="space-y-8 pb-20">
    <Skeleton className="h-9 w-64" />
    <Skeleton className="h-40 w-full rounded-xl" />
    <div className="grid gap-4 lg:grid-cols-2">
      {Array.from({ length: 4 }).map((_, i) => (
        <Skeleton key={i} className="h-24 rounded-xl" />
      ))}
    </div>
  </div>
);

export default AdminSkeleton;
