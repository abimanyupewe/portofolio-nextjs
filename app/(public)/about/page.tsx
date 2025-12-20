import React from "react";
import { supabase } from "@/lib/supabase";
import Image from "next/image";


// Revalidate data every 60 seconds
export const revalidate = 60;

export default async function AboutPage() {
  // 1. Fetch Data
  const { data: profile } = await supabase.from("profile").select("*").single();

  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors duration-300 pt-24 pb-16">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        
        {/* --- HERO SECTION --- */}
        <section className="flex flex-col md:flex-row items-center gap-12 mt-10">
            {/* Image Side */}
            <div className="w-full md:w-1/3 flex justify-center">
                <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-gray-100 dark:border-zinc-800 shadow-2xl">
                     {profile?.avatar_url ? (
                        <Image 
                            src={profile.avatar_url} 
                            alt={profile.full_name || "Profile"} 
                            fill 
                            className="object-cover"
                            priority
                        />
                     ) : (
                         <div className="w-full h-full bg-gray-200 dark:bg-zinc-800 flex items-center justify-center">
                             <span className="text-gray-400">No Avatar</span>
                         </div>
                     )}
                </div>
            </div>

            {/* Text Side */}
            <div className="w-full md:w-2/3 space-y-6 text-center md:text-left">
                <div>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-2 font-ubuntu">
                        {profile?.full_name || "Abimanyu"}
                    </h1>
                    <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                        {profile?.taglines?.map((tag: string, index: number) => (
                            <span key={index} className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 rounded-full text-sm font-medium">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
                
                <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                    {profile?.bio ? (
                        <p>{profile.bio}</p>
                    ) : (
                        <p>
                            I am a passionate software engineer dedicated to building high-quality digital experiences. 
                            My journey involves constant learning and applying modern technologies to solve real-world problems.
                        </p>
                    )}
                </div>
            </div>
        </section>

      </div>
    </div>
  );
}
