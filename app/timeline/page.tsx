"use client";

import { useMemo, useState } from "react";
import { Plus, Pin, Trash2 } from "lucide-react";
import { AmbientBackground } from "@/components/layout/AmbientBackground";
import { Button } from "@/components/shared/Button";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import { useApp } from "@/components/shared/AppProvider";
import { uid } from "@/lib/utils";

export default function TimelinePage() {
  const { timeline, setTimeline, messages, toast } = useApp();
  const [query, setQuery] = useState("");
  const [view, setView] = useState<"vertical" | "stars">("vertical");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const filtered = useMemo(() => timeline.filter((e) => e.title.toLowerCase().includes(query.toLowerCase()) || e.type.includes(query)), [timeline, query]);
  const addEvent = () => setTimeline((items) => [{ id: uid("event"), title: messages.pages.timeline.newTitle, date: new Date().toISOString().slice(0, 10), time: "20:00", type: messages.pages.timeline.newType, members: ["soobin"], description: messages.pages.timeline.newDesc, tags: ["new"], pinned: false, important: false }, ...items]);
  return (
    <>
      <AmbientBackground />
      <main className="page-shell">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div><p className="text-xs uppercase tracking-[.45em] text-mint">{messages.pages.timeline.eyebrow}</p><h1 className="mt-3 text-5xl font-black text-moon">{messages.pages.timeline.title}</h1></div>
          <div className="flex gap-2"><Button variant="soft" onClick={() => setView(view === "vertical" ? "stars" : "vertical")}>{view === "vertical" ? messages.pages.timeline.starView : messages.pages.timeline.verticalView}</Button><Button onClick={addEvent}><Plus size={16} />{messages.pages.timeline.add}</Button></div>
        </div>
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={messages.common.search} className="mt-8 w-full rounded-full border border-mint/15 bg-white/10 px-5 py-3 text-moon outline-none focus:border-mint" />
        {view === "stars" ? (
          <section className="glass relative mt-8 min-h-[520px] overflow-hidden rounded-[34px] p-8">
            <div className="absolute left-8 right-8 top-1/2 h-px bg-mint/25" />
            {filtered.map((event, index) => <button key={event.id} onClick={() => toast(`${event.date} · ${event.title}`)} className="absolute rounded-full bg-mint shadow-glow focus:outline-none focus:ring-2 focus:ring-mint" style={{ left: `${10 + (index * 77) % 82}%`, top: `${24 + (index * 31) % 52}%`, width: event.important ? 22 : 13, height: event.important ? 22 : 13 }} aria-label={event.title} />)}
          </section>
        ) : (
          <section className="mt-8 space-y-5">
            {filtered.map((event, index) => (
              <article key={event.id} className={`glass rounded-[30px] p-5 md:w-[78%] ${index % 2 ? "md:ml-auto" : ""}`}>
                <div className="flex items-start justify-between gap-4">
                  <div><p className="text-xs uppercase tracking-[.25em] text-mint">{event.date} {event.time} · {event.type}</p><input value={event.title} onChange={(e) => setTimeline((items) => items.map((it) => it.id === event.id ? { ...it, title: e.target.value } : it))} className="mt-2 w-full bg-transparent text-2xl font-black text-moon outline-none" /></div>
                  <div className="flex gap-2"><Button variant="ghost" className="h-9 w-9 px-0" onClick={() => setTimeline((items) => items.map((it) => it.id === event.id ? { ...it, pinned: !it.pinned } : it))}><Pin size={16} /></Button><Button variant="ghost" className="h-9 w-9 px-0" onClick={() => setDeleteId(event.id)}><Trash2 size={16} /></Button></div>
                </div>
                <textarea value={event.description || ""} onChange={(e) => setTimeline((items) => items.map((it) => it.id === event.id ? { ...it, description: e.target.value } : it))} className="mt-3 min-h-20 w-full rounded-2xl border border-mint/10 bg-white/[.04] p-3 text-silver outline-none" />
              </article>
            ))}
          </section>
        )}
        <ConfirmDialog open={!!deleteId} title={messages.common.confirmDelete} onCancel={() => setDeleteId(null)} onConfirm={() => { setTimeline((items) => items.filter((it) => it.id !== deleteId)); setDeleteId(null); toast(messages.common.deleted); }} />
      </main>
    </>
  );
}
