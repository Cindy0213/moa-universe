"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { AmbientBackground } from "@/components/layout/AmbientBackground";
import { Button } from "@/components/shared/Button";
import { useApp } from "@/components/shared/AppProvider";
import { formatDate, nextAnniversary } from "@/lib/date";
import { uid } from "@/lib/utils";

export default function CalendarPage() {
  const { anniversaries, setAnniversaries, settings, toast, messages } = useApp();
  const [title, setTitle] = useState("");
  const next = nextAnniversary(anniversaries);
  const days = next ? Math.ceil((next.date.getTime() - new Date().setHours(0, 0, 0, 0)) / 86400000) : 0;
  return (
    <>
      <AmbientBackground />
      <main className="page-shell">
        <p className="text-xs uppercase tracking-[.45em] text-mint">{messages.pages.calendar.eyebrow}</p>
        <h1 className="mt-3 text-5xl font-black text-moon">{messages.pages.calendar.title}</h1>
        <section className="mt-8 grid gap-5 lg:grid-cols-[.85fr_1.15fr]">
          <div className="glass rounded-[34px] p-8">
            <p className="text-silver">{messages.pages.calendar.next}</p>
            <div className="my-8 grid aspect-square max-w-xs place-items-center rounded-full border border-mint/25 bg-mint/10 shadow-glow">
              <div className="text-center"><div className="text-7xl font-black text-mint">{days}</div><div className="text-silver">{messages.pages.calendar.days}</div></div>
            </div>
            <h2 className="text-2xl font-black text-moon">{next?.item.title}</h2>
            <p className="mt-2 text-silver">{next && formatDate(next.date.toISOString().slice(0, 10), settings.language)}</p>
          </div>
          <div className="glass rounded-[34px] p-6">
            <div className="grid gap-3 md:grid-cols-[1fr_180px_auto]">
              <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder={messages.pages.calendar.placeholder} className="rounded-2xl border border-mint/15 bg-white/10 p-3 text-moon" />
              <input id="new-date" type="date" className="rounded-2xl border border-mint/15 bg-white/10 p-3 text-moon" />
              <Button onClick={() => {
                const date = (document.getElementById("new-date") as HTMLInputElement | null)?.value;
                if (!title || !date) return toast(messages.pages.calendar.missing);
                setAnniversaries((items) => [{ id: uid("ann"), title, date, recurring: true, type: "custom" }, ...items]);
                setTitle("");
              }}><Plus size={16} />{messages.common.add}</Button>
            </div>
            <div className="mt-6 grid grid-cols-7 gap-2 text-center text-xs text-silver">
              {Array.from({ length: 35 }).map((_, i) => <div key={i} className={`aspect-square rounded-2xl border border-white/10 p-2 ${i === new Date().getDate() - 1 ? "bg-mint text-ink-950" : "bg-white/[.035]"}`}>{i + 1 <= 31 ? i + 1 : ""}</div>)}
            </div>
            <div className="mt-6 space-y-2">
              {anniversaries.map((item) => <div key={item.id} className="flex items-center justify-between rounded-2xl border border-mint/10 bg-white/[.04] p-3"><span className="text-moon">{item.title}<span className="ml-3 text-sm text-silver">{formatDate(item.date, settings.language)}</span></span><Button variant="ghost" className="h-9 w-9 px-0" onClick={() => setAnniversaries((items) => items.filter((it) => it.id !== item.id))}><Trash2 size={16} /></Button></div>)}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
