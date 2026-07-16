"use client";

import { AmbientBackground } from "@/components/layout/AmbientBackground";
import { MemberCard } from "@/components/members/MemberCard";
import { useApp } from "@/components/shared/AppProvider";
import { members } from "@/data/members";

export default function MembersPage() {
  const { messages, profile } = useApp();
  return (
    <>
      <AmbientBackground />
      <main className="page-shell">
        <p className="text-xs uppercase tracking-[.45em] text-mint">{messages.pages.members.eyebrow}</p>
        <h1 className="mt-3 text-5xl font-black text-moon">{messages.pages.members.title}</h1>
        <section className="mt-10 grid gap-5 md:grid-cols-3">
          {members.map((member) => <MemberCard key={member.id} member={member} featured={member.id === profile.bias} />)}
        </section>
      </main>
    </>
  );
}
