import Title from "@/app/components/home/props/Title";
import { FluidNotch, type NotchItem } from "@/components/ui/fluid-notch";

const CompaniesSection = ({ companies }: { companies: NotchItem[] }) => {
  if (!companies.length) return null;
  return (
    <section id="companies" className="py-20">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        <Title text1="Trusted" text2="By" />
        <p className="mb-10 max-w-xl text-sm text-muted-foreground">
          Industries and companies I&apos;ve collaborated with. Tap one for details.
        </p>
        <FluidNotch items={companies} />
      </div>
    </section>
  );
};

export default CompaniesSection;
