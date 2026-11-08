import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { MatrixTrail } from "@/components/ui/matrix-trail";

const MatrixTrailSection = () => (
  <MatrixTrail className="border-y border-border text-foreground">
    <div className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center gap-8 px-6 py-24 text-center">
      <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Get in touch</p>
      <h2 className="font-heading text-4xl font-light leading-tight tracking-tight md:text-6xl">
        Let&apos;s build something <span className="italic">together.</span>
      </h2>
      <p className="max-w-md text-muted-foreground">Move your cursor around, then say hello.</p>
      <Link
        href="mailto:abimanyupw369@gmail.com"
        className="group inline-flex items-center gap-3 rounded-full bg-foreground px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-background transition hover:opacity-85 active:scale-[0.98]"
      >
        Say hello
        <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
      </Link>
    </div>
  </MatrixTrail>
);

export default MatrixTrailSection;
