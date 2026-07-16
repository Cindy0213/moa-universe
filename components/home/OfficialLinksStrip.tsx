"use client";

import { ArrowUpRight } from "lucide-react";
import { officialLinks } from "@/data/officialLinks";
import { useApp } from "@/components/shared/AppProvider";

const links = [
  ["Website", officialLinks.website],
  ["X Official", officialLinks.xBighit],
  ["X Members", officialLinks.xMembers],
  ["X Japan", officialLinks.xJapan],
  ["Instagram", officialLinks.instagram],
  ["TikTok", officialLinks.tiktok],
  ["Weverse", officialLinks.weverse],
  ["Weibo", officialLinks.weibo],
  ["Bilibili", officialLinks.bilibili],
  ["Facebook", officialLinks.facebook],
] as const;

export function OfficialLinksStrip() {
  const { messages } = useApp();
  return (
    <section className="mt-10 rounded-[28px] border border-mint/15 bg-white/[.035] p-5 backdrop-blur-xl">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[.36em] text-mint">{messages.home.official.eyebrow}</p>
          <h2 className="mt-1 text-2xl font-black text-moon">{messages.home.official.title}</h2>
        </div>
        <p className="max-w-md text-sm text-silver">{messages.home.official.desc}</p>
      </div>
      <div className="flex flex-wrap gap-2">
        {links.map(([label, url]) => (
          <a
            key={label}
            href={url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-mint/20 bg-white/[.05] px-4 py-2 text-sm font-semibold text-moon transition hover:border-mint/50 hover:bg-mint/10"
          >
            {label}
            <ArrowUpRight size={14} className="text-mint" />
          </a>
        ))}
      </div>
    </section>
  );
}
