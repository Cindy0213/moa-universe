"use client";

import { ArrowUpRight, ExternalLink, Facebook, Globe2, Instagram, Music2, Search, Sparkles, Video } from "lucide-react";
import { AmbientBackground } from "@/components/layout/AmbientBackground";
import { officialLinks } from "@/data/officialLinks";
import { useApp } from "@/components/shared/AppProvider";

const officialAccounts = [
  {
    title: "Official Website",
    subtitle: "TXT Official Site",
    url: officialLinks.website,
    icon: Globe2,
    accent: "#77E6C6",
  },
  {
    title: "TXT_bighit",
    subtitle: "Official X",
    url: officialLinks.xBighit,
    icon: ExternalLink,
    accent: "#A8F3DE",
  },
  {
    title: "TXT_members",
    subtitle: "Members X",
    url: officialLinks.xMembers,
    icon: Sparkles,
    accent: "#7EA6FF",
  },
  {
    title: "TXT_bighit_jp",
    subtitle: "Japan Official X",
    url: officialLinks.xJapan,
    icon: ExternalLink,
    accent: "#79D8F2",
  },
  {
    title: "Facebook",
    subtitle: "TXT.bighit",
    url: officialLinks.facebook,
    icon: Facebook,
    accent: "#4169E1",
  },
  {
    title: "Instagram",
    subtitle: "txt_bighit",
    url: officialLinks.instagram,
    icon: Instagram,
    accent: "#E84855",
  },
  {
    title: "TikTok",
    subtitle: "@txt.bighitent",
    url: officialLinks.tiktok,
    icon: Music2,
    accent: "#B794FF",
  },
  {
    title: "Weverse",
    subtitle: "TXT Community",
    url: officialLinks.weverse,
    icon: Sparkles,
    accent: "#48B978",
  },
  {
    title: "Weibo",
    subtitle: "TXTbighit",
    url: officialLinks.weibo,
    icon: Search,
    accent: "#FF7A85",
  },
  {
    title: "Bilibili",
    subtitle: "Official Space",
    url: officialLinks.bilibili,
    icon: Video,
    accent: "#79D8F2",
  },
];

export default function DiscographyPage() {
  const { messages } = useApp();
  return (
    <>
      <AmbientBackground />
      <main className="page-shell">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[.45em] text-mint">{messages.discography.eyebrow}</p>
            <h1 className="mt-3 text-5xl font-black text-moon">{messages.discography.title}</h1>
            <p className="mt-4 max-w-2xl text-silver">{messages.discography.desc}</p>
          </div>
          <div className="rounded-full border border-mint/20 bg-white/[.05] px-4 py-2 text-xs uppercase tracking-[.24em] text-mint">
            {messages.discography.badge}
          </div>
        </div>

        <section className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {officialAccounts.map((account, index) => {
            const Icon = account.icon;
            return (
              <a
                key={account.url}
                href={account.url}
                target="_blank"
                rel="noreferrer"
                className="glass group relative min-h-56 overflow-hidden rounded-[30px] p-6 transition duration-300 hover:-translate-y-1 hover:border-mint/40"
              >
                <div className="absolute inset-0 opacity-0 transition group-hover:opacity-100" style={{ background: `radial-gradient(circle at 20% 15%, ${account.accent}33, transparent 38%)` }} />
                <div className="relative z-10 flex h-full flex-col">
                  <div className="mb-8 flex items-start justify-between gap-4">
                    <div className="grid h-14 w-14 place-items-center rounded-2xl border border-white/10 bg-white/[.07]" style={{ color: account.accent }}>
                      <Icon size={24} />
                    </div>
                    <span className="text-xs uppercase tracking-[.28em] text-silver">{messages.discography.source} {String(index + 1).padStart(2, "0")}</span>
                  </div>
                  <div className="mt-auto">
                    <p className="text-sm font-semibold uppercase tracking-[.24em]" style={{ color: account.accent }}>{account.subtitle}</p>
                    <h2 className="mt-2 text-3xl font-black text-moon">{account.title}</h2>
                    <p className="mt-3 text-sm leading-6 text-silver">{messages.discography.descriptions[index]}</p>
                    <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-mint">
                      {messages.discography.enter} <ArrowUpRight size={16} />
                    </div>
                  </div>
                </div>
              </a>
            );
          })}
        </section>
      </main>
    </>
  );
}
