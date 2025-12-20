"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import ImageUpload from "@/app/components/admin/ImageUpload";
import TagInput from "@/app/components/admin/TagInput"; // We might need a stricter Skill input, but TagInput is okay for basic strings
import { Loader2, Plus, Trash2 } from "lucide-react";

// Types
interface Profile {
  id: string;
  full_name: string;
  bio: string;
  avatar_url: string;
  taglines: string[];
  social_links: any; // We can make this structured later
}

interface Skill {
  id?: string;
  name: string;
  category: string;
  percentage: number;
}

export default function ProfileSkillsPage() {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [saving, setSaving] = useState(false);

  // Profile Form States
  const [fullName, setFullName] = useState("");
  const [bio, setBio] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [taglines, setTaglines] = useState<string[]>([]);
  
  // New Skill State
  const [newSkillName, setNewSkillName] = useState("");
  const [newSkillCategory, setNewSkillCategory] = useState("Framework");
  const [newSkillPercentage, setNewSkillPercentage] = useState(50);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    // Fetch Profile
    const { data: profileData } = await supabase.from("profile").select("*").single();
    
    // Fetch Skills
    const { data: skillsData } = await supabase.from("skills").select("*").order("category");

    if (profileData) {
      setProfile(profileData);
      setFullName(profileData.full_name || "");
      setBio(profileData.bio || "");
      setAvatarUrl(profileData.avatar_url || "");
      setTaglines(profileData.taglines || []);
    } else {
        // Init dummy profile if none exists (though typically one row should exist)
    }

    if (skillsData) {
      setSkills(skillsData);
    }
    setLoading(false);
  };

  const handleSaveProfile = async () => {
    setSaving(true);
    try {
       const updates = {
           full_name: fullName,
           bio,
           avatar_url: avatarUrl,
           taglines,
           updated_at: new Date().toISOString(),
       };
       
       if (profile?.id) {
           const { error } = await supabase.from("profile").update(updates).eq("id", profile.id);
           if (error) throw error;
       } else {
           // Insert (rare case if one row doesn't exist)
           const { error } = await supabase.from("profile").insert([updates]);
           if (error) throw error;
       }
       alert("Profile saved successfully!");
       fetchData(); // refresh
    } catch (error: any) {
        alert("Error saving profile: " + error.message);
    } finally {
        setSaving(false);
    }
  };

  const handleAddSkill = async () => {
      if (!newSkillName) return;
      try {
          const { error } = await supabase.from("skills").insert([{
              name: newSkillName,
              category: newSkillCategory,
              percentage: newSkillPercentage
          }]);
          if (error) throw error;
          
          setNewSkillName("");
          setNewSkillPercentage(50);
          fetchData(); // refresh list
      } catch (error: any) {
           alert("Error adding skill: " + error.message);
      }
  };

  const handleDeleteSkill = async (id: string) => {
      if (!confirm("Remove this skill?")) return;
      try {
          const { error } = await supabase.from("skills").delete().eq("id", id);
          if (error) throw error;
          setSkills(skills.filter(s => s.id !== id));
      } catch (error: any) {
           alert("Error deleting skill: " + error.message);
      }
  };

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="space-y-12 pb-20">
      <h1 className="text-3xl font-bold dark:text-white mb-8">Profile & Skills</h1>

      {/* --- PROFILE SECTION --- */}
      <section className="bg-white dark:bg-zinc-900 p-6 rounded-xl border border-gray-200 dark:border-zinc-800 space-y-6">
        <h2 className="text-xl font-semibold dark:text-white border-b border-gray-100 dark:border-zinc-800 pb-4">
            Personal Info
        </h2>
        
        <div className="flex flex-col md:flex-row gap-8">
            {/* Avatar */}
            <div className="w-full md:w-1/3 flex flex-col items-center gap-4">
                <ImageUpload 
                    label="Profile Photo"
                    value={avatarUrl}
                    onChange={(url) => setAvatarUrl(url as string)}
                    folder="profile"
                />
            </div>
            
            {/* Fields */}
            <div className="w-full md:w-2/3 space-y-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium dark:text-gray-300">Full Name</label>
                    <input 
                        type="text" 
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-800/50"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium dark:text-gray-300">Bio</label>
                    <textarea 
                        rows={4}
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-800/50"
                    />
                </div>
                 <div className="space-y-2">
                    <label className="text-sm font-medium dark:text-gray-300">Taglines (Animated Text in Hero)</label>
                    <TagInput 
                        value={taglines}
                        onChange={setTaglines}
                        placeholder="Add tagline..."
                    />
                </div>
                
                <button 
                    onClick={handleSaveProfile}
                    disabled={saving}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
                >
                    {saving ? "Saving..." : "Save Profile Changes"}
                </button>
            </div>
        </div>
      </section>

      {/* --- SKILLS SECTION --- */}
      <section className="bg-white dark:bg-zinc-900 p-6 rounded-xl border border-gray-200 dark:border-zinc-800 space-y-6">
        <h2 className="text-xl font-semibold dark:text-white border-b border-gray-100 dark:border-zinc-800 pb-4">
            Skills
        </h2>
        
        {/* Add Skill Form */}
        <div className="flex flex-wrap items-end gap-4 p-4 bg-gray-50 dark:bg-zinc-800/30 rounded-lg">
             <div className="flex-1 min-w-[200px] space-y-1">
                 <label className="text-xs font-medium text-gray-500">Skill Name</label>
                 <input 
                    type="text" 
                    placeholder="e.g. Next.js"
                    value={newSkillName}
                    onChange={(e) => setNewSkillName(e.target.value)}
                    className="w-full px-3 py-2 rounded-md border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900"
                 />
             </div>
             <div className="w-[180px] space-y-1">
                 <label className="text-xs font-medium text-gray-500">Category</label>
                 <select 
                    value={newSkillCategory}
                    onChange={(e) => setNewSkillCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-md border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900"
                 >
                     <option value="Framework">Framework / Tool</option>
                     <option value="Language">Programming Language</option>
                     <option value="Other">Other</option>
                 </select>
             </div>
              <div className="w-[100px] space-y-1">
                 <label className="text-xs font-medium text-gray-500">Percent %</label>
                 <input 
                    type="number" 
                    min="1" max="100"
                    value={newSkillPercentage}
                    onChange={(e) => setNewSkillPercentage(parseInt(e.target.value))}
                    className="w-full px-3 py-2 rounded-md border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900"
                 />
             </div>
             <button 
                onClick={handleAddSkill}
                className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-md h-[42px] w-[42px] flex items-center justify-center transition-colors"
                title="Add Skill"
             >
                 <Plus size={20} />
             </button>
        </div>

        {/* Skills List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {skills.map((skill) => (
                <div key={skill.id} className="flex items-center justify-between p-3 border border-gray-200 dark:border-zinc-800 rounded-lg bg-gray-50 dark:bg-zinc-800/30 hover:bg-white dark:hover:bg-zinc-800 transition-colors group">
                    <div>
                        <h4 className="font-semibold dark:text-white">{skill.name}</h4>
                        <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                            <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-full">{skill.category}</span>
                            <span>{skill.percentage}%</span>
                        </div>
                    </div>
                    <button 
                        onClick={() => handleDeleteSkill(skill.id!)}
                        className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity p-2"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            ))}
        </div>
      </section>
    </div>
  );
}
