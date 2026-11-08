import React from "react";
import { ArrowRight, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { BannerData } from "@/app/actions/banner";

export type BannerContent = Omit<BannerData, "version" | "enabled">;

const tones = {
  inverted: { bar: "bg-foreground text-background", chip: "bg-background/15 text-background", muted: "text-background/70" },
  subtle: { bar: "border-b border-border bg-muted text-foreground", chip: "border border-border text-foreground", muted: "text-muted-foreground" },
};

/** Presentational banner shared by the live site and the admin preview. */
export const BannerView = ({
  banner,
  onDismiss,
  className,
}: {
  banner: BannerContent;
  onDismiss?: () => void;
  className?: string;
}) => {
  const t = tones[banner.tone] ?? tones.inverted;
  const external = banner.cta_url && /^https?:\/\//i.test(banner.cta_url);

  const cta =
    banner.cta_url ? (
      <a
        href={banner.cta_url}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className="group inline-flex shrink-0 items-center gap-1 whitespace-nowrap font-medium underline-offset-4 hover:underline"
      >
        {banner.cta_label || "Learn more"}
        <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
      </a>
    ) : null;

  return (
    <div className={cn("relative w-full text-sm", t.bar, className)}>
      {banner.template === "marquee" ? (
        // two identical halves + gap-4 match the global `scroll` keyframe
        <div className="overflow-hidden py-2.5 pr-12 [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
          <ul className="flex w-max animate-scroll gap-4 motion-reduce:animate-none" style={{ "--animation-duration": "30s" } as React.CSSProperties}>
            {Array.from({ length: 8 }).map((_, i) => (
              <li key={i} aria-hidden={i > 0 ? true : undefined} className="flex items-center gap-4">
                <span className="whitespace-nowrap">{banner.message}</span>
                {cta}
                <span className={t.muted}>•</span>
              </li>
            ))}
          </ul>
        </div>
      ) : banner.template === "minimal" ? (
        <p className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 px-12 py-2 text-center text-xs sm:text-sm">
          <span>{banner.message}</span>
          {cta}
        </p>
      ) : (
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 px-12 py-3 text-center">
          {banner.badge && (
            <span className={cn("rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-[0.15em]", t.chip)}>
              {banner.badge}
            </span>
          )}
          <span>{banner.message}</span>
          {cta}
        </div>
      )}

      {onDismiss && banner.dismissible && (
        <button
          onClick={onDismiss}
          aria-label="Dismiss banner"
          className={cn("absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1.5 transition-opacity hover:opacity-100 opacity-70")}
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
};
