"use client";

import { notFound, useParams } from "next/navigation";
import { Calendar, Instagram, Save } from "lucide-react";
import { AmbientBackground } from "@/components/layout/AmbientBackground";
import { Button } from "@/components/shared/Button";
import { ImageUploader } from "@/components/shared/ImageUploader";
import { memberById } from "@/data/members";
import { daysBetween } from "@/lib/date";
import { useApp } from "@/components/shared/AppProvider";
import { webImages } from "@/data/images";
import { useEffect, useState } from "react";

export default function MemberDetailPage() {
  const { memberId } = useParams<{ memberId: string }>();
  const member = memberById[memberId];
  const { timeline, collection, toast, messages } = useApp();
  const [draft, setDraft] = useState(member);
  const [image, setImage] = useState(member?.image);
  useEffect(() => {
    if (!member) return;
    try {
      const stored = window.localStorage.getItem("moa-visited-members");
      const visited = new Set<string>(stored ? JSON.parse(stored) : []);
      visited.add(member.id);
      window.localStorage.setItem("moa-visited-members", JSON.stringify([...visited]));
      const today = new Date().toISOString().slice(0, 10);
      const dailyKey = `moa-daily-visited-members-${today}`;
      const dailyStored = window.localStorage.getItem(dailyKey);
      const dailyVisited = new Set<string>(dailyStored ? JSON.parse(dailyStored) : []);
      dailyVisited.add(member.id);
      window.localStorage.setItem(dailyKey, JSON.stringify([...dailyVisited]));
    } catch {
      // Ignore visit tracking failures; the profile page remains usable.
    }
  }, [member]);
  if (!member) notFound();
  const relatedEvents = timeline.filter((event) => event.members?.includes(member.id));
  const relatedCollections = collection.filter((item) => item.members?.includes(member.id));
  return (
    <>
      <AmbientBackground />
      <main className="page-shell">
        <section className="grid gap-8 lg:grid-cols-[.9fr_1.1fr]">
          <div className="glass overflow-hidden rounded-[34px] p-4">
            <div className="placeholder-portrait aspect-[4/5] overflow-hidden rounded-[28px]">
              {image && <img src={image} alt={member.name} className="h-full w-full object-cover" onError={(event) => { event.currentTarget.src = webImages.group; }} />}
            </div>
          </div>
          <div className="space-y-6">
            <div>
              <p className="text-xs uppercase tracking-[.45em]" style={{ color: member.secondaryColor }}>{member.symbol} · {member.koreanName}</p>
              <h1 className="mt-3 text-6xl font-black text-moon md:text-8xl">{member.name}</h1>
              <p className="mt-4 text-silver">{draft.favoriteReason || messages.memberDetail.defaultReason}</p>
              {member.instagramUrl && (
                <a
                  href={member.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex items-center gap-2 rounded-full border border-mint/20 bg-white/[.06] px-4 py-2 text-sm font-semibold text-mint transition hover:border-mint/50 hover:bg-white/[.1]"
                >
                  <Instagram size={17} />
                  Instagram
                </a>
              )}
            </div>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {[
                [messages.memberDetail.birthday, member.birthday || "-"],
                [messages.memberDetail.days, daysBetween(draft.fandomStartDate || "2021-05-31")],
                [messages.memberDetail.collections, relatedCollections.length],
                [messages.memberDetail.records, relatedEvents.length],
              ].map(([label, value]) => (
                <div key={label} className="glass rounded-3xl p-4">
                  <div className="text-2xl font-black text-mint">{value}</div>
                  <div className="text-xs uppercase tracking-[.2em] text-silver">{label}</div>
                </div>
              ))}
            </div>
            <div className="glass rounded-3xl p-5">
              <div className="grid gap-4 md:grid-cols-2">
                <label className="space-y-2 text-sm text-silver">{messages.memberDetail.nickname}<input className="w-full rounded-2xl border border-mint/15 bg-white/10 p-3 text-moon" value={draft.userNickname || ""} onChange={(e) => setDraft({ ...draft, userNickname: e.target.value })} /></label>
                <label className="space-y-2 text-sm text-silver">{messages.memberDetail.fandomStartDate}<input type="date" className="w-full rounded-2xl border border-mint/15 bg-white/10 p-3 text-moon" value={draft.fandomStartDate || ""} onChange={(e) => setDraft({ ...draft, fandomStartDate: e.target.value })} /></label>
                <label className="space-y-2 text-sm text-silver md:col-span-2">{messages.memberDetail.favoriteReason}<textarea className="min-h-24 w-full rounded-2xl border border-mint/15 bg-white/10 p-3 text-moon" value={draft.favoriteReason || ""} onChange={(e) => setDraft({ ...draft, favoriteReason: e.target.value })} /></label>
                <label className="space-y-2 text-sm text-silver">{messages.memberDetail.favoriteStage}<input className="w-full rounded-2xl border border-mint/15 bg-white/10 p-3 text-moon" value={draft.favoriteStage || ""} onChange={(e) => setDraft({ ...draft, favoriteStage: e.target.value })} /></label>
                <label className="space-y-2 text-sm text-silver">{messages.memberDetail.favoriteQuote}<input className="w-full rounded-2xl border border-mint/15 bg-white/10 p-3 text-moon" value={draft.favoriteQuote || ""} onChange={(e) => setDraft({ ...draft, favoriteQuote: e.target.value })} /></label>
              </div>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <ImageUploader value={image} onChange={setImage} label={messages.common.upload} />
                <div className="rounded-3xl border border-mint/15 bg-white/[.04] p-5">
                  <h2 className="mb-3 font-bold text-moon">{messages.memberDetail.relatedEvents}</h2>
                  {relatedEvents.length ? relatedEvents.map((event) => <p key={event.id} className="border-t border-white/10 py-2 text-sm text-silver"><Calendar size={14} className="mr-2 inline text-mint" />{event.date} · {event.title}</p>) : <p className="text-sm text-silver">{messages.memberDetail.noRelatedEvents}</p>}
                </div>
              </div>
              <Button className="mt-5" onClick={() => toast(messages.common.saved)}><Save size={16} />{messages.common.save}</Button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
