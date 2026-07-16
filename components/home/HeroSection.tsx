"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, BadgeCheck, CalendarDays, Heart, Sparkles } from "lucide-react";
import { daysBetween, nextAnniversary } from "@/lib/date";
import { useApp } from "@/components/shared/AppProvider";
import { Button } from "@/components/shared/Button";
import { MemberCardDeck } from "@/components/home/MemberCardDeck";
import { OfficialLinksStrip } from "@/components/home/OfficialLinksStrip";

export function HeroSection() {
  const { messages, profile, timeline, collection, anniversaries } = useApp();
  const next = nextAnniversary(anniversaries);
  const stats = [
    [messages.home.companied, daysBetween(profile.fandomStartDate), messages.home.days, BadgeCheck],
    [messages.home.records, timeline.length, messages.home.events, Sparkles],
    [messages.home.collections, collection.length, messages.home.items, Heart],
    [messages.home.next, next ? Math.ceil((next.date.getTime() - new Date().setHours(0,0,0,0)) / 86400000) : 0, messages.home.days, CalendarDays],
  ] as const;
  return (
    <main className="page-shell">
      <section className="grid min-h-[78vh] items-center gap-10 lg:grid-cols-2">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8 }} className="space-y-8">
          <div>
            <p className="mb-3 text-xs uppercase tracking-[.45em] text-mint">TXT Magic Archive · {new Date().toISOString().slice(0, 10)}</p>
            <h1 className="hero-art-title hero-title-stack mx-auto max-w-xl text-5xl font-black leading-[.88] md:text-7xl" aria-label={messages.home.headline}>
              <span className="block text-left">TOMORROW</span>
              <span className="block text-center">X</span>
              <span className="block text-right">TOGETHER</span>
            </h1>
            <p className="mt-5 text-xl text-silver">{messages.home.sub}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/members"><Button>{messages.home.enter}<ArrowRight size={18} /></Button></Link>
            <Link href="/archive"><Button variant="soft">{messages.home.archive}</Button></Link>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {stats.map(([label, value, unit, Icon]) => (
              <div key={label} className="glass rounded-3xl p-4">
                <Icon className="mb-4 text-mint" size={18} />
                <div className="text-3xl font-black text-mint">{value}</div>
                <div className="text-xs uppercase tracking-[.2em] text-silver">{label} · {unit}</div>
              </div>
            ))}
          </div>
        </motion.div>
        <MemberCardDeck />
      </section>
      <section className="mt-16 grid gap-4 md:grid-cols-4">
        {["/members", "/archive", "/timeline", "/calendar"].map((href, index) => (
          <Link key={href} href={href} className="glass rounded-3xl p-6 transition hover:-translate-y-1 hover:border-mint/40">
            <div className="mb-6 h-px w-20 bg-mint" />
            <h2 className="text-xl font-bold text-moon">{messages.home.cards[index].title}</h2>
            <p className="mt-2 text-sm text-silver">{messages.home.cards[index].desc}</p>
          </Link>
        ))}
      </section>
      <OfficialLinksStrip />
    </main>
  );
}
