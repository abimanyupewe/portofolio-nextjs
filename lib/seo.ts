export const siteUrl = new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000");

export const absoluteUrl = (path: string) => new URL(path, siteUrl).toString();

export const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Abimanyu",
  jobTitle: "Fullstack Developer and QA Engineer",
  url: siteUrl.toString(),
  sameAs: [
    "https://github.com/abimanyupewe",
    "https://www.linkedin.com/in/abimanyu-priyo-widagdo-101a46279/",
    "https://www.instagram.com/hoohbim_",
  ],
};

export const jsonLdScript = (data: object) => ({
  type: "application/ld+json",
  dangerouslySetInnerHTML: {
    __html: JSON.stringify(data).replace(/</g, "\\u003c"),
  },
});
