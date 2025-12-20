"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Plus, Trash2, Loader2, Calendar } from "lucide-react";
import ImageUpload from "@/app/components/admin/ImageUpload";

interface Experience {
  id?: string;
  company: string;
  position: string;
  duration: string;
  description: string;
  logo_url?: string;
}

interface Certificate {
  id?: string;
  title: string;
  issuer: string;
  date: string;
  credential_url: string;
  image_url: string;
}

export default function ExperiencesPage() {
  const [loading, setLoading] = useState(true);
    // Experience State
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [newExp, setNewExp] = useState<Experience>({
    company: "",
    position: "",
    duration: "",
    description: "",
    logo_url: "",
  });
  
  // Certificate State
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [newCert, setNewCert] = useState<Certificate>({
    title: "",
    issuer: "",
    date: "",
    credential_url: "",
    image_url: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    
    // Fetch Experiences
    const { data: expData } = await supabase.from("experiences").select("*").order("created_at", { ascending: false });
    if (expData) setExperiences(expData);

    // Fetch Certificates
    const { data: certData } = await supabase.from("certificates").select("*").order("date", { ascending: false });
    if (certData) setCertificates(certData);

    setLoading(false);
  };

  // --- EXPERIENCE HANDLERS ---
  const handleAddExp = async () => {
      if(!newExp.company || !newExp.position) return alert("Company & Position required");
      
      const { error } = await supabase.from("experiences").insert([newExp]);
      if (error) alert("Error adding experience: " + error.message);
      else {
          setNewExp({ company: "", position: "", duration: "", description: "", logo_url: "" });
          fetchData();
      }
  };

  const handleDeleteExp = async (id: string) => {
      if (!confirm("Delete this experience?")) return;
      const { error } = await supabase.from("experiences").delete().eq("id", id);
      if(!error) fetchData();
  };

  // --- CERTIFICATE HANDLERS ---
  const handleAddCert = async () => {
      if(!newCert.title || !newCert.issuer) return alert("Title & Issuer required");

      const { error } = await supabase.from("certificates").insert([newCert]);
      if (error) alert("Error adding certificate: " + error.message);
      else {
          setNewCert({ title: "", issuer: "", date: "", credential_url: "", image_url: "" });
          fetchData();
      }
  };

  const handleDeleteCert = async (id: string) => {
      if (!confirm("Delete this certificate?")) return;
      const { error } = await supabase.from("certificates").delete().eq("id", id);
      if(!error) fetchData();
  };

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="space-y-12 pb-20">
      <h1 className="text-3xl font-bold dark:text-white mb-8">Experience & Certificates</h1>

      {/* --- EXPERIENCE SECTION --- */}
      <section className="bg-white dark:bg-zinc-900 p-6 rounded-xl border border-gray-200 dark:border-zinc-800 space-y-6">
        <h2 className="text-xl font-semibold dark:text-white border-b border-gray-100 dark:border-zinc-800 pb-4">
            Professional Experience
        </h2>
        
        {/* Add Experience Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 dark:bg-zinc-800/30 p-4 rounded-lg">
             <div className="space-y-2">
                 <input 
                    type="text" 
                    placeholder="Company Name" 
                    value={newExp.company}
                    onChange={(e) => setNewExp({...newExp, company: e.target.value})}
                    className="w-full px-3 py-2 rounded border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900"
                 />
                 <input 
                    type="text" 
                    placeholder="Position/Role" 
                    value={newExp.position}
                    onChange={(e) => setNewExp({...newExp, position: e.target.value})}
                    className="w-full px-3 py-2 rounded border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900"
                 />
                 <input 
                    type="text" 
                    placeholder="Duration (e.g. 2023 - Present)" 
                    value={newExp.duration}
                    onChange={(e) => setNewExp({...newExp, duration: e.target.value})}
                    className="w-full px-3 py-2 rounded border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900"
                 />
             </div>
             <div className="space-y-2">
                 <textarea 
                    placeholder="Description" 
                    rows={3}
                    value={newExp.description}
                    onChange={(e) => setNewExp({...newExp, description: e.target.value})}
                    className="w-full px-3 py-2 rounded border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900"
                 />
                 <div className="flex gap-2 items-center">
                    <span className="text-xs text-gray-500">Logo:</span>
                     <ImageUpload 
                        value={newExp.logo_url}
                        onChange={(url) => setNewExp({...newExp, logo_url: url as string})}
                        folder="experiences"
                     />
                 </div>
                 <button 
                    onClick={handleAddExp}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded flex items-center justify-center gap-2"
                 >
                     <Plus size={16} /> Add Experience
                 </button>
             </div>
        </div>

        {/* Experience List */}
        <div className="space-y-4">
            {experiences.map((exp) => (
                <div key={exp.id} className="flex gap-4 p-4 border border-gray-200 dark:border-zinc-800 rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-800/30 transition-colors">
                    {exp.logo_url && (
                        <div className="w-12 h-12 relative flex-shrink-0">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={exp.logo_url} alt="" className="w-full h-full object-contain rounded" />
                        </div>
                    )}
                    <div className="flex-1">
                        <h3 className="font-bold dark:text-white">{exp.company}</h3>
                        <p className="text-sm text-blue-600 dark:text-blue-400">{exp.position}</p>
                        <p className="text-xs text-gray-500 mb-2">{exp.duration}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{exp.description}</p>
                    </div>
                    <div>
                        <button 
                            onClick={() => handleDeleteExp(exp.id!)}
                            className="p-2 text-gray-400 hover:text-red-500"
                        >
                            <Trash2 size={18} />
                        </button>
                    </div>
                </div>
            ))}
        </div>
      </section>

      {/* --- CERTIFICATES SECTION --- */}
      <section className="bg-white dark:bg-zinc-900 p-6 rounded-xl border border-gray-200 dark:border-zinc-800 space-y-6">
        <h2 className="text-xl font-semibold dark:text-white border-b border-gray-100 dark:border-zinc-800 pb-4">
            Certificates
        </h2>
        
        {/* Add Certificate Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 dark:bg-zinc-800/30 p-4 rounded-lg">
             <div className="space-y-2">
                 <input 
                    type="text" 
                    placeholder="Certificate Title" 
                    value={newCert.title}
                    onChange={(e) => setNewCert({...newCert, title: e.target.value})}
                    className="w-full px-3 py-2 rounded border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900"
                 />
                 <input 
                    type="text" 
                    placeholder="Issuer (e.g. Coursera)" 
                    value={newCert.issuer}
                    onChange={(e) => setNewCert({...newCert, issuer: e.target.value})}
                    className="w-full px-3 py-2 rounded border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900"
                 />
                 <input 
                    type="date"
                    value={newCert.date}
                    onChange={(e) => setNewCert({...newCert, date: e.target.value})}
                    className="w-full px-3 py-2 rounded border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900"
                 />
             </div>
             <div className="space-y-2">
                 <input 
                    type="url" 
                    placeholder="Credential URL" 
                    value={newCert.credential_url}
                    onChange={(e) => setNewCert({...newCert, credential_url: e.target.value})}
                    className="w-full px-3 py-2 rounded border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900"
                 />
                  <div className="flex gap-2 items-center">
                    <span className="text-xs text-gray-500">Image:</span>
                     <ImageUpload 
                        value={newCert.image_url}
                        onChange={(url) => setNewCert({...newCert, image_url: url as string})}
                        folder="certificates"
                     />
                 </div>
                 <button 
                    onClick={handleAddCert}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded flex items-center justify-center gap-2"
                 >
                     <Plus size={16} /> Add Certificate
                 </button>
             </div>
        </div>

         {/* Certificates List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {certificates.map((cert) => (
                <div key={cert.id} className="flex gap-4 p-4 border border-gray-200 dark:border-zinc-800 rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-800/30 transition-colors">
                     {cert.image_url ? (
                        <div className="w-16 h-12 relative flex-shrink-0 bg-gray-100 rounded overflow-hidden">
                             {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={cert.image_url} alt="" className="w-full h-full object-cover" />
                        </div>
                     ) : (
                         <div className="w-16 h-12 flex items-center justify-center bg-gray-100 dark:bg-zinc-800 rounded text-xs text-gray-400">
                             No Img
                         </div>
                     )}
                    <div className="flex-1">
                        <h3 className="font-bold text-sm dark:text-white line-clamp-1">{cert.title}</h3>
                        <p className="text-xs text-gray-600 dark:text-gray-400">{cert.issuer}</p>
                        <p className="text-xs text-gray-500">{new Date(cert.date).toLocaleDateString()}</p>
                    </div>
                     <div>
                        <button 
                            onClick={() => handleDeleteCert(cert.id!)}
                            className="p-2 text-gray-400 hover:text-red-500"
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
