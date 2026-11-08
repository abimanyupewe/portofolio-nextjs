"use client";

import AdminSkeleton from "@/app/components/admin/AdminSkeleton";
import { useEffect, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import ImageUpload from "@/app/components/admin/ImageUpload";
import { getCompanies, createCompany, updateCompany, deleteCompany, type CompanyItem } from "@/app/actions/companies";

const empty = { name: "", industry: "", description: "", period: "", website: "", logo_url: "" };
const input = "w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-800/50 dark:text-white";

export default function CompaniesAdminPage() {
    const [items, setItems] = useState<CompanyItem[]>([]);
    const [form, setForm] = useState(empty);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        getCompanies().then(setItems).finally(() => setLoading(false));
    }, []);

    const set = (k: keyof typeof empty) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        setForm((f) => ({ ...f, [k]: e.target.value }));

    const reset = () => {
        setForm(empty);
        setEditingId(null);
    };

    const save = async () => {
        setSaving(true);
        try {
            if (editingId) {
                const updated = await updateCompany(editingId, form);
                if (updated) setItems((p) => p.map((c) => (c.id === editingId ? updated : c)));
            } else {
                const created = await createCompany(form);
                setItems((p) => [created, ...p]);
            }
            reset();
        } catch (e: any) {
            alert("Error: " + e.message);
        } finally {
            setSaving(false);
        }
    };

    const edit = (c: CompanyItem) => {
        setEditingId(c.id);
        setForm({
            name: c.name,
            industry: c.industry,
            description: c.description ?? "",
            period: c.period ?? "",
            website: c.website ?? "",
            logo_url: c.logo_url ?? "",
        });
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const remove = async (id: string) => {
        if (!confirm("Delete this company?")) return;
        await deleteCompany(id);
        setItems((p) => p.filter((c) => c.id !== id));
        if (editingId === id) reset();
    };

    if (loading) return <AdminSkeleton />;

    return (
        <div className="space-y-10 pb-20">
            <h1 className="text-3xl font-bold dark:text-white">Companies ({items.length})</h1>

            <section className="space-y-4 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6">
                <h2 className="text-xl font-semibold dark:text-white">{editingId ? "Edit company" : "Add company"}</h2>
                <div className="flex flex-col gap-6 md:flex-row">
                    <div className="w-full md:w-1/4">
                        <ImageUpload label="Logo" value={form.logo_url} onChange={(u) => setForm((f) => ({ ...f, logo_url: u as string }))} folder="companies" />
                    </div>
                    <div className="grid w-full gap-4 md:w-3/4 md:grid-cols-2">
                        <input className={input} placeholder="Company name *" value={form.name} onChange={set("name")} />
                        <input className={input} placeholder="Industry * (e.g. Hosting, Fintech)" value={form.industry} onChange={set("industry")} />
                        <input className={input} placeholder="Period (e.g. 2026 - Present)" value={form.period} onChange={set("period")} />
                        <input className={input} placeholder="Website (https://…)" value={form.website} onChange={set("website")} />
                        <textarea className={`${input} md:col-span-2`} rows={4} placeholder="What did you do together?" value={form.description} onChange={set("description")} />
                    </div>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={save}
                        disabled={saving || !form.name.trim() || !form.industry.trim()}
                        className="rounded-lg bg-black px-6 py-2 text-sm font-semibold text-white disabled:opacity-40 dark:bg-white dark:text-black"
                    >
                        {saving ? "Saving..." : editingId ? "Update" : "Add"}
                    </button>
                    {editingId && (
                        <button onClick={reset} className="rounded-lg px-6 py-2 text-sm text-gray-500 hover:text-black dark:hover:text-white">
                            Cancel
                        </button>
                    )}
                </div>
            </section>

            <ul className="grid gap-4 lg:grid-cols-2">
                {items.map((c) => (
                    <li key={c.id} className="flex items-start justify-between gap-4 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5">
                        <div className="min-w-0 text-sm">
                            <p className="font-semibold dark:text-white">{c.name}</p>
                            <p className="text-xs text-gray-500">{[c.industry, c.period].filter(Boolean).join(" · ")}</p>
                            {c.description && <p className="mt-2 line-clamp-2 text-gray-600 dark:text-gray-400">{c.description}</p>}
                        </div>
                        <div className="flex shrink-0 gap-1">
                            <button onClick={() => edit(c)} aria-label={`Edit ${c.name}`} className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-black dark:hover:bg-zinc-800 dark:hover:text-white">
                                <Pencil size={16} />
                            </button>
                            <button onClick={() => remove(c.id)} aria-label={`Delete ${c.name}`} className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-red-500 dark:hover:bg-zinc-800">
                                <Trash2 size={16} />
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
