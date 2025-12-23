"use client";

import React, { useEffect, useState } from "react";
import { InfiniteMovingCards } from "@/components/ui/ui/infinite-moving-cards";
import { supabase } from "@/lib/supabase";

interface Skill {
    id: string;
    name: string;
    icon_url: string;
}

const TechStackSection = () => {
    const [skills, setSkills] = useState<Skill[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSkills = async () => {
            const { data } = await supabase
                .from("skills")
                .select("id, name, icon_url")
                .not("icon_url", "is", null); // Only fetching skills with images
            
            if (data) {
                setSkills(data);
            }
            setLoading(false);
        };

        fetchSkills();
    }, []);

    if (loading) return null;
    if (skills.length === 0) return null;

    return (
        <section id="skills" className="py-20 bg-white dark:bg-black overflow-hidden relative">
             <div className="container mx-auto px-4 mb-10 text-center relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold dark:text-white mb-4">
                    Tech Stack
                </h2>
                <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                    Technologies and tools I work with
                </p>
            </div>
            
            <div className="relative flex flex-col items-center justify-center overflow-hidden antialiased z-10">
                <InfiniteMovingCards items={skills} direction="right" speed="slow" />
            </div>
        </section>
    );
};

export default TechStackSection;
