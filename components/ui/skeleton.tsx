import { cn } from "@/lib/utils";

/** Pulsing placeholder block; size and shape come from className. */
export const Skeleton = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div aria-hidden className={cn("animate-pulse rounded-md bg-foreground/10", className)} {...props} />
);
