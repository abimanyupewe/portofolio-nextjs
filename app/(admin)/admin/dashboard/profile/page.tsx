"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import ImageUpload from "@/app/components/admin/ImageUpload";
import TagInput from "@/app/components/admin/TagInput"; // We might need a stricter Skill input, but TagInput is okay for basic strings
import { Loader2, Plus, Trash2, Pencil, X } from "lucide-react";

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
  icon_url?: string;
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
  
  // New/Edit Skill State
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [skillName, setSkillName] = useState("");
  const [skillCategory, setSkillCategory] = useState("Framework");
  const [skillImage, setSkillImage] = useState("");

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
       };
       if (profile?.id) {
           const { error } = await supabase.from("profile").update(updates).eq("id", profile.id);
           if (error) throw error;
       } else {
           const { error } = await supabase.from("profile").insert([updates]);
           if (error) throw error;
       }
       alert("Profile saved successfully!");
       fetchData(); 
    } catch (error: any) {
        alert("Error saving profile: " + error.message);
    } finally {
        setSaving(false);
    }
  };

  const handleSaveSkill = async () => {
      if (!skillName) return;

      try {
          const skillData = {
              name: skillName,
              category: skillCategory,
              icon_url: skillImage,
              percentage: 100 // Default value since we removed proper usage
          };

          if (editingSkill?.id) {
              // UPDATE
              const { error } = await supabase.from("skills").update(skillData).eq("id", editingSkill.id);
              if (error) throw error;
              alert("Tech updated!");
          } else {
              // CREATE
              const { error } = await supabase.from("skills").insert([skillData]);
              if (error) throw error;
          }
          
          resetSkillForm();
          fetchData(); 
      } catch (error: any) {
           alert("Error saving tech: " + error.message);
      }
  };

  const handleEditSkill = (skill: Skill) => {
      setEditingSkill(skill);
      setSkillName(skill.name);
      setSkillCategory(skill.category);
      setSkillImage(skill.icon_url || "");
  };

  const resetSkillForm = () => {
      setEditingSkill(null);
      setSkillName("");
      setSkillCategory("Framework");
      setSkillImage("");
  };

  const handleDeleteSkill = async (id: string) => {
      if (!confirm("Remove this tech?")) return;
      try {
          const { error } = await supabase.from("skills").delete().eq("id", id);
          if (error) throw error;
          setSkills(skills.filter(s => s.id !== id));
      } catch (error: any) {
           alert("Error deleting tech: " + error.message);
      }
  };

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="space-y-12 pb-20">
      <h1 className="text-3xl font-bold dark:text-white mb-8">Profile & Tech Stack</h1>

      {/* --- PROFILE SECTION --- */}
      <section className="bg-white dark:bg-zinc-900 p-6 rounded-xl border border-gray-200 dark:border-zinc-800 space-y-6">
        <h2 className="text-xl font-semibold dark:text-white border-b border-gray-100 dark:border-zinc-800 pb-4">
            Personal Info
        </h2>
        
        <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/3 flex flex-col items-center gap-4">
                <ImageUpload 
                    label="Profile Photo"
                    value={avatarUrl}
                    onChange={(url) => setAvatarUrl(url as string)}
                    folder="profile"
                />
            </div>
            
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
                    <label className="text-sm font-medium dark:text-gray-300">Taglines</label>
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

      {/* --- TECH STACK SECTION --- */}
      <section className="bg-white dark:bg-zinc-900 p-6 rounded-xl border border-gray-200 dark:border-zinc-800 space-y-6">
        <h2 className="text-xl font-semibold dark:text-white border-b border-gray-100 dark:border-zinc-800 pb-4">
            Tech Stack (Logos)
        </h2>
        
        {/* Add Skill Form */}
        <div className="flex flex-col md:flex-row items-center gap-6 p-6 bg-gray-50 dark:bg-zinc-800/30 rounded-lg border border-gray-100 dark:border-zinc-800">
             
             {/* Logo Upload */}
             <div className="w-full md:w-[150px] shrink-0">
                <ImageUpload 
                    label="Logo"
                    value={skillImage}
                    onChange={(url) => setSkillImage(url as string)}
                    folder="tech"
                />
             </div>

             <div className="flex-1 w-full space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div className="space-y-1">
                         <label className="text-xs font-medium text-gray-500">Tech Name</label>
                         <input 
                            type="text" 
                            placeholder="e.g. Next.js"
                            value={skillName}
                            onChange={(e) => setSkillName(e.target.value)}
                            className="w-full px-3 py-2 rounded-md border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900"
                         />
                     </div>
                     <div className="space-y-1">
                         <label className="text-xs font-medium text-gray-500">Category</label>
                         <select 
                            value={skillCategory}
                            onChange={(e) => setSkillCategory(e.target.value)}
                            className="w-full px-3 py-2 rounded-md border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900"
                         >
                             <option value="Framework">Framework / Tool</option>
                             <option value="Language">Programming Language</option>
                             <option value="Other">Other</option>
                         </select>
                     </div>
                </div>

                <div className="flex gap-2 justify-end">
                     {editingSkill && (
                        <button 
                            onClick={resetSkillForm}
                            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md flex items-center gap-2"
                        >
                            <X size={16} /> Cancel
                        </button>
                     )}
                     <button 
                        onClick={handleSaveSkill}
                        className={`${editingSkill ? 'bg-orange-500 hover:bg-orange-600' : 'bg-green-600 hover:bg-green-700'} text-white px-4 py-2 rounded-md flex items-center gap-2`}
                     >
                         {editingSkill ? <Pencil size={16} /> : <Plus size={16} />} 
                         {editingSkill ? "Update Tech" : "Add Tech"}
                     </button>
                </div>
             </div>
        </div>

        {/* Skills/Tech List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {skills.map((skill) => (
                <div key={skill.id} className="flex items-center gap-4 p-3 border border-gray-200 dark:border-zinc-800 rounded-lg bg-gray-50 dark:bg-zinc-800/30 hover:bg-white dark:hover:bg-zinc-800 transition-colors group">
                    <div className="w-12 h-12 shrink-0 bg-white rounded-md p-2 flex items-center justify-center border border-gray-100">
                        {skill.icon_url ? (
                            <img src={skill.icon_url} alt={skill.name} className="w-full h-full object-contain" />
                        ) : (
                            <span className="text-xs text-gray-400">No Img</span>
                        )}
                    </div>
                    <div className="flex-1">
                        <h4 className="font-semibold dark:text-white">{skill.name}</h4>
                        <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-full">
                            {skill.category}
                        </span>
                    </div>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                            onClick={() => handleEditSkill(skill)}
                            className="text-gray-400 hover:text-orange-500 p-2"
                            title="Edit"
                        >
                            <Pencil size={16} />
                        </button>
                        <button 
                            onClick={() => handleDeleteSkill(skill.id!)}
                            className="text-gray-400 hover:text-red-500 p-2"
                            title="Delete"
                        >
                            <Trash2 size={16} />
                        </button>
                    </div>
                </div>
            ))}
        </div>
      </section>
    </div>
  );
}
