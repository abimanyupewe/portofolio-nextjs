"use client";
import {
  useMotionValueEvent,
  useScroll,
  useTransform,
  motion,
} from "motion/react";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({ data, title, description }: { data: TimelineEntry[], title?: string, description?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (!ref.current) return;
    // The track grows with its content (fonts, images), so follow its size instead of measuring once.
    const ro = new ResizeObserver(() => setHeight(ref.current?.getBoundingClientRect().height ?? 0));
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div className="w-full bg-background font-sans md:px-10" ref={containerRef}>
      <div className="mx-auto max-w-7xl space-y-4 px-4 py-20 md:px-8 lg:px-10">
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Experience</p>
        <h2 className="max-w-4xl font-heading text-4xl font-light leading-[1.05] tracking-tight md:text-6xl">
          {title || "Changelog from my journey"}
        </h2>
        <p className="max-w-md text-sm text-muted-foreground md:text-base">
          {description || "I've been working on these for the past 2 years. Here's a timeline of my journey."}
        </p>
      </div>

      <div ref={ref} className="relative mx-auto max-w-7xl pb-20">
        {data.map((item, index) => (
          <div key={index} className="flex justify-start pt-10 md:gap-10 md:pt-24">
            <div className="sticky top-32 z-40 flex max-w-xs items-center self-start md:w-full lg:max-w-sm">
              <div className="absolute left-4 flex h-8 w-8 items-center justify-center rounded-full border border-border bg-background">
                <div className="h-2.5 w-2.5 rounded-full bg-foreground" />
              </div>
              <h3 className="hidden font-heading text-xl text-muted-foreground md:block md:pl-20 md:text-2xl">
                {item.title}
              </h3>
            </div>

            <div className="relative w-full pl-20 pr-4 md:pl-4">
              <h3 className="mb-4 block text-left font-heading text-2xl text-muted-foreground md:hidden">
                {item.title}
              </h3>
              {item.content}
            </div>
          </div>
        ))}
        <div
          style={{ height: height + "px" }}
          className="absolute left-8 top-0 w-[2px] overflow-hidden bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-border to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          <motion.div
            style={{ height: heightTransform, opacity: opacityTransform }}
            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-foreground via-muted-foreground to-transparent from-[0%] via-[10%]"
          />
        </div>
      </div>
    </div>
  );
};
