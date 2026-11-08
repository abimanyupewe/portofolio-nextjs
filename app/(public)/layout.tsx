import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import Preloader from "@/app/components/ui/Preloader";
import StickyBanner from "@/app/components/banner/StickyBanner";
import { getBanner } from "@/app/actions/banner";
import { ThemeProvider } from "@/app/components/theme-provider";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // A failing DB must never take the whole site down just because of the banner.
  const banner = await getBanner().catch(() => null);

  return (
    <>
     <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <Preloader />
        {banner?.enabled && <StickyBanner banner={banner} />}
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </ThemeProvider>
    </>
  );
}
