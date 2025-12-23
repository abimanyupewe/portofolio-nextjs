import Image from "next/image";
import HeroSection from "@/app/components/home/HeroSection";
import TechStackSection from "@/app/components/home/TechStackSection"; // Replaced
import { CounterSection } from "@/app/components/home/props/CounterSection";
import Project from "@/app/components/home/Project";
import ExperienceSection from "@/app/components/home/ExperienceSection";
import AboutSection from "@/app/components/home/AboutSection";
import { supabase } from "@/lib/supabase";

export const revalidate = 0; // Force dynamic for debugging/real-time

export default async function Home() {
  // Fetch all data from Supabase in parallel
  const [
    { data: projects, error: projectsError },
    { data: profile, error: profileError },
    // { data: skills, error: skillsError }, // Skills fetched locally in TechStack now if needed, or we can fetch here. TechStack fetches itself.
    { data: experiences, error: expError },
    { data: certificates, error: certError }
  ] = await Promise.all([
    supabase.from('projects').select('*').order('created_at', { ascending: false }),
    supabase.from('profile').select('*').single(),
    // supabase.from('skills').select('*'),
    supabase.from('experiences').select('*').order('created_at', { ascending: false }),
    supabase.from('certificates').select('*').order('date', { ascending: false })
  ]);

  const counters = [
    { end: projects?.length || 0, label: "Total Projects" },
    { end: 3, label: "Years Experience" },
  ];

  if (expError) console.error("Experience Fetch Error:", expError);
  if (certError) console.error("Certificate Fetch Error:", certError);

  return (
    <div>
      <HeroSection profile={profile || undefined} />
      <CounterSection counters={counters} />
      <TechStackSection />
      <AboutSection profile={profile || null} />
      {/* Pass Supabase data to Project component */}
      <Project initialProjects={projects || []} />
      <ExperienceSection experiences={experiences || []} />
      {/* <SertificateSection certificates={certificates || []} /> */}
    </div>
  );
}
