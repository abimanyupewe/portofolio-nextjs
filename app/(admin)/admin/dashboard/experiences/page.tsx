"use client";

import React, { useState, useEffect } from "react";
import { Plus, Trash2, Loader2, Calendar, Pencil, X } from "lucide-react";
import ImageUpload from "@/app/components/admin/ImageUpload";
import {
    getExperiences, createExperience, updateExperience, deleteExperience
} from "@/app/actions/experiences";
import {
    getCertificates, createCertificate, updateCertificate, deleteCertificate
} from "@/app/actions/certificates";

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
    const [editingExp, setEditingExp] = useState<Experience | null>(null);
    const [newExp, setNewExp] = useState<Experience>({
        company: "",
        position: "",
        duration: "",
        description: "",
        logo_url: "",
    });

    // Certificate State
    const [certificates, setCertificates] = useState<Certificate[]>([]);
    const [editingCert, setEditingCert] = useState<Certificate | null>(null);
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
        try {
            const expData = await getExperiences();
            const certData = await getCertificates();
            if (expData) setExperiences(expData);
            if (certData) setCertificates(certData);
        } catch (e) {
            console.error("Error fetching data", e);
        }
        setLoading(false);
    };

    // --- EXPERIENCE HANDLERS ---
    const handleSaveExp = async () => {
        if (!newExp.company || !newExp.position) return alert("Company & Position required");

        try {
            if (editingExp?.id) {
                // UPDATE
                await updateExperience(editingExp.id, newExp);
                alert("Experience updated!");
            } else {
                // INSERT
                await createExperience(newExp);
            }

            resetExpForm();
            fetchData();
        } catch (error: any) {
            alert("Error saving experience: " + error.message);
        }
    };

    const handleEditExp = (exp: Experience) => {
        setEditingExp(exp);
        setNewExp(exp);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const resetExpForm = () => {
        setEditingExp(null);
        setNewExp({ company: "", position: "", duration: "", description: "", logo_url: "" });
    };

    const handleDeleteExp = async (id: string) => {
        if (!confirm("Delete this experience?")) return;
        try {
            await deleteExperience(id);
            fetchData();
        } catch (error: any) {
            alert("Error deleting: " + error.message);
        }
    };

    // --- CERTIFICATE HANDLERS ---
    const handleSaveCert = async () => {
        if (!newCert.title || !newCert.issuer) return alert("Title & Issuer required");

        try {
            if (editingCert?.id) {
                // UPDATE
                await updateCertificate(editingCert.id, newCert);
                alert("Certificate updated!");
            } else {
                // INSERT
                await createCertificate(newCert);
            }

            resetCertForm();
            fetchData();
        } catch (error: any) {
            alert("Error saving certificate: " + error.message);
        }
    };

    const handleEditCert = (cert: Certificate) => {
        setEditingCert(cert);
        setNewCert(cert);
        // scroll to certificate section roughly
        window.scrollTo({ top: 400, behavior: "smooth" });
    };

    const resetCertForm = () => {
        setEditingCert(null);
        setNewCert({ title: "", issuer: "", date: "", credential_url: "", image_url: "" });
    };

    const handleDeleteCert = async (id: string) => {
        if (!confirm("Delete this certificate?")) return;
        try {
            await deleteCertificate(id);
            fetchData();
        } catch (error: any) {
            alert("Error deleting: " + error.message);
        }
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

                {/* Add/Edit Experience Form */}
                <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg ${editingExp ? 'bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800' : 'bg-gray-50 dark:bg-zinc-800/30'}`}>
                    <div className="space-y-2">
                        <input
                            type="text"
                            placeholder="Company Name"
                            value={newExp.company}
                            onChange={(e) => setNewExp({ ...newExp, company: e.target.value })}
                            className="w-full px-3 py-2 rounded border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900"
                        />
                        <input
                            type="text"
                            placeholder="Position/Role"
                            value={newExp.position}
                            onChange={(e) => setNewExp({ ...newExp, position: e.target.value })}
                            className="w-full px-3 py-2 rounded border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900"
                        />
                        <input
                            type="text"
                            placeholder="Duration (e.g. 2023 - Present)"
                            value={newExp.duration}
                            onChange={(e) => setNewExp({ ...newExp, duration: e.target.value })}
                            className="w-full px-3 py-2 rounded border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900"
                        />
                    </div>
                    <div className="space-y-2">
                        <textarea
                            placeholder="Description"
                            rows={3}
                            value={newExp.description}
                            onChange={(e) => setNewExp({ ...newExp, description: e.target.value })}
                            className="w-full px-3 py-2 rounded border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900"
                        />
                        <div className="flex gap-2 items-center">
                            <span className="text-xs text-gray-500">Logo:</span>
                            <ImageUpload
                                value={newExp.logo_url}
                                onChange={(url) => setNewExp({ ...newExp, logo_url: url as string })}
                                folder="experiences"
                            />
                        </div>

                        <div className="flex gap-2">
                            {editingExp && (
                                <button
                                    onClick={resetExpForm}
                                    className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 rounded flex items-center justify-center gap-2"
                                >
                                    <X size={16} /> Cancel
                                </button>
                            )}
                            <button
                                onClick={handleSaveExp}
                                className={`flex-1 ${editingExp ? 'bg-orange-600 hover:bg-orange-700' : 'bg-blue-600 hover:bg-blue-700'} text-white py-2 rounded flex items-center justify-center gap-2`}
                            >
                                {editingExp ? <Pencil size={16} /> : <Plus size={16} />}
                                {editingExp ? "Update Experience" : "Add Experience"}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Experience List */}
                <div className="space-y-4">
                    {experiences.map((exp) => (
                        <div key={exp.id} className="flex gap-4 p-4 border border-gray-200 dark:border-zinc-800 rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-800/30 transition-colors group">
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
                            <div className="flex items-start gap-1">
                                <button
                                    onClick={() => handleEditExp(exp)}
                                    className="p-2 text-gray-400 hover:text-orange-500"
                                    title="Edit"
                                >
                                    <Pencil size={18} />
                                </button>
                                <button
                                    onClick={() => handleDeleteExp(exp.id!)}
                                    className="p-2 text-gray-400 hover:text-red-500"
                                    title="Delete"
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

                {/* Add/Edit Certificate Form */}
                <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg ${editingCert ? 'bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800' : 'bg-gray-50 dark:bg-zinc-800/30'}`}>
                    <div className="space-y-2">
                        <input
                            type="text"
                            placeholder="Certificate Title"
                            value={newCert.title}
                            onChange={(e) => setNewCert({ ...newCert, title: e.target.value })}
                            className="w-full px-3 py-2 rounded border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900"
                        />
                        <input
                            type="text"
                            placeholder="Issuer (e.g. Coursera)"
                            value={newCert.issuer}
                            onChange={(e) => setNewCert({ ...newCert, issuer: e.target.value })}
                            className="w-full px-3 py-2 rounded border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900"
                        />
                        <input
                            type="date"
                            value={newCert.date}
                            onChange={(e) => setNewCert({ ...newCert, date: e.target.value })}
                            className="w-full px-3 py-2 rounded border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900"
                        />
                    </div>
                    <div className="space-y-2">
                        <input
                            type="url"
                            placeholder="Credential URL"
                            value={newCert.credential_url}
                            onChange={(e) => setNewCert({ ...newCert, credential_url: e.target.value })}
                            className="w-full px-3 py-2 rounded border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900"
                        />
                        <div className="flex gap-2 items-center">
                            <span className="text-xs text-gray-500">Image:</span>
                            <ImageUpload
                                value={newCert.image_url}
                                onChange={(url) => setNewCert({ ...newCert, image_url: url as string })}
                                folder="certificates"
                            />
                        </div>

                        <div className="flex gap-2">
                            {editingCert && (
                                <button
                                    onClick={resetCertForm}
                                    className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 rounded flex items-center justify-center gap-2"
                                >
                                    <X size={16} /> Cancel
                                </button>
                            )}
                            <button
                                onClick={handleSaveCert}
                                className={`flex-1 ${editingCert ? 'bg-orange-600 hover:bg-orange-700' : 'bg-blue-600 hover:bg-blue-700'} text-white py-2 rounded flex items-center justify-center gap-2`}
                            >
                                {editingCert ? <Pencil size={16} /> : <Plus size={16} />}
                                {editingCert ? "Update Certificate" : "Add Certificate"}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Certificates List */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {certificates.map((cert) => (
                        <div key={cert.id} className="flex gap-4 p-4 border border-gray-200 dark:border-zinc-800 rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-800/30 transition-colors group">
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
                            <div className="flex items-center gap-1">
                                <button
                                    onClick={() => handleEditCert(cert)}
                                    className="p-2 text-gray-400 hover:text-orange-500"
                                    title="Edit"
                                >
                                    <Pencil size={16} />
                                </button>
                                <button
                                    onClick={() => handleDeleteCert(cert.id!)}
                                    className="p-2 text-gray-400 hover:text-red-500"
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
