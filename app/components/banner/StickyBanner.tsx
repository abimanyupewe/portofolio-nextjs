"use client";

import React, { useEffect, useRef, useState } from "react";
import { BannerView } from "./BannerView";
import type { BannerData } from "@/app/actions/banner";

const KEY = "dismissed-banner";

/**
 * Sticks to the top of the page. Publishes its height as --banner-h so the fixed
 * navbar can sit right below it (see Navbar).
 */
const StickyBanner = ({ banner }: { banner: BannerData }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [dismissed, setDismissed] = useState(false);

  // A saved edit changes `version`, so people who closed the old banner see the new one.
  useEffect(() => {
    try {
      if (banner.dismissible && localStorage.getItem(KEY) === banner.version) setDismissed(true);
    } catch {}
  }, [banner.version, banner.dismissible]);

  useEffect(() => {
    const root = document.documentElement;
    const el = ref.current;
    if (dismissed || !el) {
      root.style.setProperty("--banner-h", "0px");
      return;
    }
    const set = () => root.style.setProperty("--banner-h", `${el.offsetHeight}px`);
    set();
    const ro = new ResizeObserver(set);
    ro.observe(el);
    return () => {
      ro.disconnect();
      root.style.setProperty("--banner-h", "0px");
    };
  }, [dismissed, banner]);

  if (dismissed) return null;

  return (
    <div ref={ref} className="sticky top-0 z-[60]" role="region" aria-label="Announcement">
      <BannerView
        banner={banner}
        onDismiss={() => {
          try {
            localStorage.setItem(KEY, banner.version);
          } catch {}
          setDismissed(true);
        }}
      />
    </div>
  );
};

export default StickyBanner;
