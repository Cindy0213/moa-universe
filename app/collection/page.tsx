"use client";

import { useMemo, useState } from "react";
import { Heart, Plus, Trash2 } from "lucide-react";
import { AmbientBackground } from "@/components/layout/AmbientBackground";
import { Button } from "@/components/shared/Button";
import { ImageUploader } from "@/components/shared/ImageUploader";
import { useApp } from "@/components/shared/AppProvider";
import { webImages } from "@/data/images";
import { uid } from "@/lib/utils";

export default function CollectionPage() {
  const { collection, setCollection, messages } = useApp();
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => collection.filter((item) => item.title.toLowerCase().includes(query.toLowerCase()) || item.type.includes(query)), [collection, query]);
  return (
    <>
      <AmbientBackground />
      <main className="page-shell">
        <div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-xs uppercase tracking-[.45em] text-mint">{messages.pages.collection.eyebrow}</p><h1 className="mt-3 text-5xl font-black text-moon">{messages.pages.collection.title}</h1></div><Button onClick={() => setCollection((items) => [{ id: uid("col"), title: messages.pages.collection.newTitle, type: messages.pages.collection.photo, pinned: false, favorite: false, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }, ...items])}><Plus size={16} />{messages.common.add}</Button></div>
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={messages.common.search} className="mt-8 w-full rounded-full border border-mint/15 bg-white/10 px-5 py-3 text-moon" />
        <section className="mt-8 columns-1 gap-5 md:columns-2 lg:columns-3">
          {filtered.map((item, index) => <article key={item.id} className="glass mb-5 break-inside-avoid overflow-hidden rounded-[28px] p-4">
            <ImageUploader value={item.image || webImages.collection[index % webImages.collection.length]} label={messages.common.upload} onChange={(image) => setCollection((items) => items.map((it) => it.id === item.id ? { ...it, image, updatedAt: new Date().toISOString() } : it))} />
            <input value={item.title} onChange={(e) => setCollection((items) => items.map((it) => it.id === item.id ? { ...it, title: e.target.value } : it))} className="mt-4 w-full bg-transparent text-xl font-black text-moon outline-none" />
            <p className="text-sm text-silver">{item.type} · {item.date || messages.pages.collection.noDate}</p>
            <textarea value={item.note || ""} onChange={(e) => setCollection((items) => items.map((it) => it.id === item.id ? { ...it, note: e.target.value } : it))} className="mt-3 min-h-20 w-full rounded-2xl border border-mint/10 bg-white/[.04] p-3 text-silver" />
            <div className="mt-3 flex gap-2"><Button variant={item.favorite ? "primary" : "soft"} onClick={() => setCollection((items) => items.map((it) => it.id === item.id ? { ...it, favorite: !it.favorite } : it))}><Heart size={16} /></Button><Button variant="ghost" onClick={() => setCollection((items) => items.filter((it) => it.id !== item.id))}><Trash2 size={16} /></Button></div>
          </article>)}
        </section>
      </main>
    </>
  );
}
