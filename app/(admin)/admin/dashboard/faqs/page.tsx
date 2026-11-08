"use client";

import AdminSkeleton from "@/app/components/admin/AdminSkeleton";
import { useEffect, useState } from "react";
import { ArrowDown, ArrowUp, Pencil, Trash2 } from "lucide-react";
import { getFaqs, createFaq, updateFaq, deleteFaq, reorderFaqs, type FaqItem } from "@/app/actions/faqs";

const input = "w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-800/50 dark:text-white";

export default function FaqsAdminPage() {
    const [items, setItems] = useState<FaqItem[]>([]);
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [editingId, setEditingId] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        getFaqs().then(setItems).finally(() => setLoading(false));
    }, []);

    const reset = () => {
        setQuestion("");
        setAnswer("");
        setEditingId(null);
    };

    const save = async () => {
        setSaving(true);
        try {
            if (editingId) {
                const updated = await updateFaq(editingId, { question, answer });
                if (updated) setItems((p) => p.map((f) => (f.id === editingId ? updated : f)));
            } else {
                const created = await createFaq({ question, answer });
                setItems((p) => [...p, created]);
            }
            reset();
        } catch (e: any) {
            alert("Error: " + e.message);
        } finally {
            setSaving(false);
        }
    };

    const edit = (f: FaqItem) => {
        setEditingId(f.id);
        setQuestion(f.question);
        setAnswer(f.answer);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const remove = async (id: string) => {
        if (!confirm("Delete this FAQ?")) return;
        await deleteFaq(id);
        setItems((p) => p.filter((f) => f.id !== id));
        if (editingId === id) reset();
    };

    const move = async (index: number, dir: -1 | 1) => {
        const next = [...items];
        const j = index + dir;
        if (j < 0 || j >= next.length) return;
        [next[index], next[j]] = [next[j], next[index]];
        setItems(next);
        try {
            await reorderFaqs(next.map((f) => f.id));
        } catch (e: any) {
            alert("Error: " + e.message);
            setItems(await getFaqs());
        }
    };

    if (loading) return <AdminSkeleton />;

    return (
        <div className="space-y-10 pb-20">
            <h1 className="text-3xl font-bold dark:text-white">FAQ ({items.length})</h1>

            <section className="space-y-4 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6">
                <h2 className="text-xl font-semibold dark:text-white">{editingId ? "Edit question" : "Add question"}</h2>
                <input className={input} placeholder="Question *" maxLength={200} value={question} onChange={(e) => setQuestion(e.target.value)} />
                <textarea className={input} rows={5} placeholder="Answer * (line breaks are kept)" maxLength={2000} value={answer} onChange={(e) => setAnswer(e.target.value)} />
                <div className="flex gap-3">
                    <button
                        onClick={save}
                        disabled={saving || !question.trim() || !answer.trim()}
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

            {items.length === 0 && <p className="text-gray-500">No questions yet. The FAQ section stays hidden until you add one.</p>}
            <ul className="space-y-3">
                {items.map((f, i) => (
                    <li key={f.id} className="flex items-start gap-4 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5">
                        <div className="flex shrink-0 flex-col">
                            <button onClick={() => move(i, -1)} disabled={i === 0} aria-label="Move up" className="rounded p-1 text-gray-400 hover:text-black disabled:opacity-20 dark:hover:text-white">
                                <ArrowUp size={16} />
                            </button>
                            <button onClick={() => move(i, 1)} disabled={i === items.length - 1} aria-label="Move down" className="rounded p-1 text-gray-400 hover:text-black disabled:opacity-20 dark:hover:text-white">
                                <ArrowDown size={16} />
                            </button>
                        </div>
                        <div className="min-w-0 flex-1 text-sm">
                            <p className="font-semibold dark:text-white">{f.question}</p>
                            <p className="mt-1 line-clamp-2 whitespace-pre-line text-gray-600 dark:text-gray-400">{f.answer}</p>
                        </div>
                        <div className="flex shrink-0 gap-1">
                            <button onClick={() => edit(f)} aria-label="Edit" className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-black dark:hover:bg-zinc-800 dark:hover:text-white">
                                <Pencil size={16} />
                            </button>
                            <button onClick={() => remove(f.id)} aria-label="Delete" className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-red-500 dark:hover:bg-zinc-800">
                                <Trash2 size={16} />
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
