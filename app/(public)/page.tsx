import Image from "next/image";
import HeroSection from "@/app/components/home/HeroSection";
import SkilsSection from "@/app/components/home/SkilsSection";
import { CounterSection } from "@/app/components/home/props/CounterSection";
import Project from "@/app/components/home/Project";
import ExperienceSection from "@/app/components/home/ExperienceSection";
import SertificateSection from "@/app/components/home/project/SertificateSection";
import { supabase } from "@/lib/supabase";

export const revalidate = 60; // Revalidate every 60 seconds

export default async function Home() {
  const counters = [
    { end: 20, label: "Total Projects" },
    { end: 3, label: "Years Experience" },
  ];

  // Fetch all data from Supabase in parallel
  const [
    { data: projects },
    { data: profile },
    { data: skills },
    { data: experiences },
    { data: certificates }
  ] = await Promise.all([
    supabase.from('projects').select('*').order('created_at', { ascending: false }),
    supabase.from('profile').select('*').single(),
    supabase.from('skills').select('*'),
    supabase.from('experiences').select('*').order('created_at', { ascending: false }),
    supabase.from('certificates').select('*').order('date', { ascending: false })
  ]);

  return (
    <div>
      <HeroSection profile={profile || undefined} />
      <CounterSection counters={counters} />
      <SkilsSection skills={skills || []} />
      {/* Pass Supabase data to Project component */}
      <Project initialProjects={projects || []} />
      <ExperienceSection experiences={experiences || []} />
      <SertificateSection certificates={certificates || []} />
    </div>
  );
}
