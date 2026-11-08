"use client";

import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import { getAllNotes, deleteNote } from "@/app/actions/notes";

type Note = { id: string; word: string; created_at: string };

export default function NotesPage() {
    const [notes, setNotes] = useState<Note[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getAllNotes().then(setNotes).finally(() => setLoading(false));
    }, []);

    const remove = async (id: string) => {
        if (!confirm("Delete this word?")) return;
        await deleteNote(id);
        setNotes((prev) => prev.filter((n) => n.id !== id));
    };

    if (loading) return <div className="p-8">Loading...</div>;

    return (
        <div className="space-y-6 pb-20">
            <h1 className="text-3xl font-bold dark:text-white">Playground Notes ({notes.length})</h1>
            {notes.length === 0 && <p className="text-gray-500">No words yet.</p>}
            <ul className="flex flex-wrap gap-3">
                {notes.map((n) => (
                    <li
                        key={n.id}
                        title={new Date(n.created_at).toLocaleString()}
                        className="flex items-center gap-2 rounded-full border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 py-2 pl-4 pr-2 text-sm dark:text-white"
                    >
                        {n.word}
                        <button
                            onClick={() => remove(n.id)}
                            aria-label={`Delete ${n.word}`}
                            className="rounded-full p-1.5 text-gray-400 hover:bg-gray-100 hover:text-red-500 dark:hover:bg-zinc-800"
                        >
                            <Trash2 size={14} />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
