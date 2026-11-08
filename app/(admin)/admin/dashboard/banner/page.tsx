"use client";

import AdminSkeleton from "@/app/components/admin/AdminSkeleton";
import { useEffect, useState } from "react";
import { BannerView, type BannerContent } from "@/app/components/banner/BannerView";
import { getBanner, updateBanner } from "@/app/actions/banner";

type Form = BannerContent & { enabled: boolean };

const defaults: Form = {
    enabled: false,
    template: "announcement",
    tone: "inverted",
    badge: "New",
    message: "I'm open for freelance projects this month.",
    cta_label: "Get in touch",
    cta_url: "#about",
    dismissible: true,
};

const templates: { id: Form["template"]; name: string; hint: string }[] = [
    { id: "announcement", name: "Announcement", hint: "Badge + message + link" },
    { id: "minimal", name: "Minimal", hint: "One quiet line" },
    { id: "marquee", name: "Marquee", hint: "Scrolling message" },
];

const input = "w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-800/50 dark:text-white";
const label = "text-sm font-medium dark:text-gray-300";

export default function BannerAdminPage() {
    const [form, setForm] = useState<Form>(defaults);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        getBanner()
            .then((b) => b && setForm({ ...defaults, ...b, badge: b.badge ?? "", cta_label: b.cta_label ?? "", cta_url: b.cta_url ?? "" }))
            .finally(() => setLoading(false));
    }, []);

    const set = <K extends keyof Form>(k: K, v: Form[K]) => setForm((f) => ({ ...f, [k]: v }));

    const save = async () => {
        setSaving(true);
        try {
            await updateBanner(form);
            alert("Banner saved!");
        } catch (e: any) {
            alert("Error: " + e.message);
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <AdminSkeleton />;

    return (
        <div className="space-y-10 pb-20">
            <h1 className="text-3xl font-bold dark:text-white">Sticky Banner</h1>

            {/* live preview of exactly what visitors get */}
            <section className="space-y-2">
                <p className={label}>Preview {form.enabled ? "(live)" : "(hidden on the site)"}</p>
                <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-zinc-800">
                    <BannerView banner={form} onDismiss={() => {}} />
                    <div className="h-16 bg-white dark:bg-zinc-950" />
                </div>
            </section>

            <section className="space-y-3">
                <p className={label}>Template</p>
                <div className="grid gap-4 md:grid-cols-3">
                    {templates.map((t) => (
                        <button
                            key={t.id}
                            onClick={() => set("template", t.id)}
                            aria-pressed={form.template === t.id}
                            className={`space-y-3 rounded-xl border p-3 text-left transition ${
                                form.template === t.id ? "border-black dark:border-white" : "border-gray-200 hover:border-gray-400 dark:border-zinc-800"
                            }`}
                        >
                            <div className="pointer-events-none overflow-hidden rounded-md">
                                <BannerView banner={{ ...form, template: t.id }} />
                            </div>
                            <div>
                                <p className="text-sm font-semibold dark:text-white">{t.name}</p>
                                <p className="text-xs text-gray-500">{t.hint}</p>
                            </div>
                        </button>
                    ))}
                </div>
            </section>

            <section className="space-y-5 rounded-xl border border-gray-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
                <div className="flex flex-wrap items-center gap-8">
                    <label className="flex items-center gap-3 text-sm dark:text-white">
                        <input type="checkbox" checked={form.enabled} onChange={(e) => set("enabled", e.target.checked)} className="size-4" />
                        Show banner on the site
                    </label>
                    <label className="flex items-center gap-3 text-sm dark:text-white">
                        <input type="checkbox" checked={form.dismissible} onChange={(e) => set("dismissible", e.target.checked)} className="size-4" />
                        Visitors can close it
                    </label>
                    <div className="flex items-center gap-3 text-sm dark:text-white">
                        Style
                        {(["inverted", "subtle"] as const).map((t) => (
                            <button
                                key={t}
                                onClick={() => set("tone", t)}
                                aria-pressed={form.tone === t}
                                className={`rounded-full px-3 py-1 text-xs capitalize ${
                                    form.tone === t ? "bg-black text-white dark:bg-white dark:text-black" : "text-gray-500 hover:text-black dark:hover:text-white"
                                }`}
                            >
                                {t}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="space-y-2">
                    <label className={label}>Message *</label>
                    <input className={input} maxLength={160} value={form.message} onChange={(e) => set("message", e.target.value)} />
                    <p className="text-right text-xs text-gray-500">{form.message.length}/160</p>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                        <label className={label}>Badge (Announcement only)</label>
                        <input className={input} maxLength={20} value={form.badge ?? ""} onChange={(e) => set("badge", e.target.value)} placeholder="New" />
                    </div>
                    <div className="space-y-2">
                        <label className={label}>Link label</label>
                        <input className={input} maxLength={30} value={form.cta_label ?? ""} onChange={(e) => set("cta_label", e.target.value)} placeholder="Learn more" />
                    </div>
                    <div className="space-y-2">
                        <label className={label}>Link URL</label>
                        <input className={input} maxLength={300} value={form.cta_url ?? ""} onChange={(e) => set("cta_url", e.target.value)} placeholder="https://… or #about" />
                    </div>
                </div>

                <button
                    onClick={save}
                    disabled={saving || !form.message.trim()}
                    className="rounded-lg bg-black px-6 py-2 text-sm font-semibold text-white disabled:opacity-40 dark:bg-white dark:text-black"
                >
                    {saving ? "Saving..." : "Save banner"}
                </button>
            </section>
        </div>
    );
}
