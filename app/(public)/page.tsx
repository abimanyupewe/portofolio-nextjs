import Image from "next/image";
import HeroSection from "@/app/components/home/HeroSection";
import CurrentPositionSection from "@/app/components/home/CurrentPositionSection";
import TechStackSection from "@/app/components/home/TechStackSection";
import { CounterSection } from "@/app/components/home/props/CounterSection";
import Project from "@/app/components/home/Project";
import ExperienceSection from "@/app/components/home/ExperienceSection";
import AboutSection from "@/app/components/home/AboutSection";
import connectToDatabase from "@/lib/mongodb";
import ProjectModel from "@/models/Project";
import ProfileModel from "@/models/Profile";
import ExperienceModel from "@/models/Experience";
import CertificateModel from "@/models/Certificate";
import SkillModel from "@/models/Skill";

export const revalidate = 0; // Force dynamic for debugging/real-time

// Helper to serialize Mongoose documents for Client Components
const serialize = (doc: any) => {
  if (!doc) return null;
  const obj = JSON.parse(JSON.stringify(doc));
  if (obj._id) {
    obj.id = obj._id;
    delete obj._id;
  }
  if (Array.isArray(obj)) {
    return obj.map((item: any) => {
      if (item._id) {
        item.id = item._id;
        delete item._id;
      }
      return item;
    });
  }
  return obj;
};

export default async function Home() {
  await connectToDatabase();

  // Fetch all data from MongoDB in parallel
  const [projectsRaw, profileRaw, experiencesRaw, certificatesRaw, skillsRaw] = await Promise.all([
    ProjectModel.find({}).sort({ created_at: -1 }).lean(),
    ProfileModel.findOne().lean(),
    ExperienceModel.find({}).sort({ created_at: -1 }).lean(),
    CertificateModel.find({}).sort({ date: -1 }).lean(),
    SkillModel.find({ icon_url: { $ne: null } }).lean()
  ]);

  const projects = serialize(projectsRaw);
  const profile = serialize(profileRaw);
  const experiences = serialize(experiencesRaw);
  const certificates = serialize(certificatesRaw);
  const skills = serialize(skillsRaw);

  const counters = [
    { end: projects?.length || 0, label: "Total Projects" },
    { end: 1, label: "Years Experience" },
  ];

  return (
    <div>
      <HeroSection profile={profile || undefined} />
      <CounterSection counters={counters} />
      <CurrentPositionSection position={profile?.current_position} />
      <TechStackSection skills={skills || []} />
      <AboutSection profile={profile || null} />
      {/* Pass data to Project component */}
      <Project initialProjects={projects || []} />
      <ExperienceSection experiences={experiences || []} />
      {/* <SertificateSection certificates={certificates || []} /> */}
    </div>
  );
}
