import Link from "next/link";
import React from "react";

const pages = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#project" },
  { label: "Experience", href: "#experience" },
];

const socials = [
  { label: "GitHub", href: "https://github.com/abimanyupewe" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/abimanyu-priyo-widagdo-101a46279/" },
  { label: "Instagram", href: "https://www.instagram.com/hoohbim_" },
  { label: "Email", href: "mailto:abimanyupw369@gmail.com" },
];

const Footer = () => {
  return (
    <footer className="relative w-full overflow-hidden border-t border-border bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 md:pt-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="#home" className="inline-block font-heading text-2xl font-semibold">
              Abimanyu<span className="text-muted-foreground">.</span>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              Fullstack developer &amp; QA engineer. Open for freelance and collaborations.
            </p>
            <p className="text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} Abimanyu. All rights reserved.
            </p>
          </div>

          <FooterColumn title="Pages" links={pages} />
          <FooterColumn title="Socials" links={socials} external />

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-sm font-semibold">Contact</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <a href="mailto:abimanyupw369@gmail.com" className="break-all transition-colors hover:text-foreground">
                  abimanyupw369@gmail.com
                </a>
              </li>
              <li>Malang, Indonesia</li>
            </ul>
          </div>
        </div>

        {/* Big pixel tagline, faded at the bottom edge like the reference */}
        <div
          aria-hidden
          className="mt-16 select-none whitespace-nowrap text-center font-[family-name:var(--font-pixelify-sans)] text-[11.5vw] leading-[0.85] tracking-tight text-foreground/10 [mask-image:linear-gradient(to_bottom,black_40%,transparent)] md:text-[10.5vw] xl:text-[9.5rem]"
        >
          Code. Test. Ship.
        </div>
      </div>
    </footer>
  );
};

const FooterColumn = ({
  title,
  links,
  external,
}: {
  title: string;
  links: { label: string; href: string }[];
  external?: boolean;
}) => (
  <div>
    <h3 className="mb-4 text-sm font-semibold">{title}</h3>
    <ul className="space-y-3">
      {links.map((l) => (
        <li key={l.label}>
          <Link
            href={l.href}
            {...(external && !l.href.startsWith("mailto:") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            {l.label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export default Footer;
