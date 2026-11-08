"use client";

import AdminSkeleton from "@/app/components/admin/AdminSkeleton";
import { useEffect, useState } from "react";
import { Heart, Trash2 } from "lucide-react";
import { getImpressions, deleteImpression, type ImpressionItem } from "@/app/actions/impressions";

export default function ImpressionsAdminPage() {
    const [items, setItems] = useState<ImpressionItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getImpressions().then(setItems).finally(() => setLoading(false));
    }, []);

    const remove = async (id: string) => {
        if (!confirm("Delete this impression?")) return;
        await deleteImpression(id);
        setItems((prev) => prev.filter((i) => i.id !== id));
    };

    if (loading) return <AdminSkeleton />;

    return (
        <div className="space-y-6 pb-20">
            <h1 className="text-3xl font-bold dark:text-white">Impressions ({items.length})</h1>
            {items.length === 0 && <p className="text-gray-500">No impressions yet.</p>}
            <div className="grid gap-4 lg:grid-cols-2">
                {items.map((i) => (
                    <article key={i.id} className="space-y-3 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5">
                        <p className="text-sm dark:text-white">&ldquo;{i.message}&rdquo;</p>
                        <div className="flex items-end justify-between gap-3">
                            <div className="min-w-0 text-sm">
                                <p className="truncate font-semibold dark:text-white">{i.name}</p>
                                <p className="truncate text-xs text-gray-500">
                                    {[i.company, i.division].filter(Boolean).join(" · ") || "—"} · {new Date(i.created_at).toLocaleDateString()}
                                </p>
                            </div>
                            <div className="flex items-center gap-3 text-xs text-gray-500">
                                <span className="flex items-center gap-1"><Heart size={14} /> {i.likes}</span>
                                <button
                                    onClick={() => remove(i.id)}
                                    aria-label={`Delete impression from ${i.name}`}
                                    className="rounded-full p-1.5 text-gray-400 hover:bg-gray-100 hover:text-red-500 dark:hover:bg-zinc-800"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
}
