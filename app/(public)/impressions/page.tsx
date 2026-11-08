import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getImpressions } from "@/app/actions/impressions";
import ImpressionsExplorer from "@/app/components/home/impressions/ImpressionsExplorer";

export const revalidate = 60;

export const metadata = { title: "Impressions | Abimanyu" };

export default async function ImpressionsPage() {
  const items = await getImpressions();

  return (
    <div className="container mx-auto px-4 pb-20 pt-32 md:px-8 lg:px-16">
      <Link
        href="/#impressions"
        className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft size={16} /> Back
      </Link>
      <h1 className="mb-2 font-heading text-4xl font-semibold md:text-5xl">Working with me</h1>
      <p className="mb-12 max-w-xl text-muted-foreground">All impressions from people I&apos;ve worked with.</p>
      <ImpressionsExplorer items={items} />
    </div>
  );
}
