"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, UserRound } from "lucide-react";
import { useMemo, useState } from "react";
import { useApp } from "@/components/shared/AppProvider";
import { Button } from "@/components/shared/Button";
import { webImages } from "@/data/images";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { getLevelProgress, getTaskProgress } from "@/lib/progress";
import { cn } from "@/lib/utils";
import { members } from "@/data/members";

const routes = [
  ["/", "home"],
  ["/members", "members"],
  ["/archive", "archive"],
  ["/timeline", "timeline"],
  ["/calendar", "calendar"],
  ["/collection", "collection"],
  ["/achievements", "achievements"],
  ["/settings", "settings"],
] as const;

export function Navbar() {
  const pathname = usePathname();
  const { messages, settings, setSettings, profile, timeline, collection } = useApp();
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const today = new Date().toISOString().slice(0, 10);
  const [visitedMembers] = useLocalStorage<string[]>("moa-visited-members", []);
  const [dailyVisitedMembers] = useLocalStorage<string[]>(`moa-daily-visited-members-${today}`, []);
  const level = getLevelProgress(getTaskProgress({ profile, timeline, collection, visitedMembers, dailyVisitedMembers }));
  const pageResults = useMemo(() => routes.map(([href, key]) => ({
    href,
    label: messages.nav[key],
    group: messages.search.pages,
    text: `${messages.nav[key]} ${href}`,
  })), [messages]);
  const memberResults = useMemo(() => members.map((member) => ({
    href: `/members/${member.id}`,
    label: `${member.name} · ${member.koreanName}`,
    group: messages.search.members,
    text: `${member.name} ${member.koreanName} ${member.id}`,
  })), [messages]);
  const results = useMemo(() => {
    const keyword = query.trim().toLowerCase();
    if (!keyword) return [...pageResults, ...memberResults].slice(0, 8);
    return [...pageResults, ...memberResults]
      .filter((item) => item.text.toLowerCase().includes(keyword))
      .slice(0, 8);
  }, [memberResults, pageResults, query]);
  const closeSearch = () => {
    setSearchOpen(false);
    setQuery("");
  };

  return (
    <header className="fixed left-0 right-0 top-0 z-50 px-3 py-3">
      <nav className="mx-auto flex max-w-7xl items-center gap-3 rounded-full border border-mint/15 bg-ink-950/54 px-4 py-2 text-sm text-moon shadow-lg backdrop-blur-2xl">
        <Link href="/" className="mr-2 min-w-fit">
          <div className="font-black tracking-[.18em]">MOA <span className="text-mint">UNIVERSE</span></div>
          <div className="text-[10px] uppercase tracking-[.28em] text-silver">TXT Magic Archive</div>
        </Link>
        <div className="hidden flex-1 items-center justify-center gap-1 lg:flex">
          {routes.map(([href, key]) => (
            <Link key={href} href={href} className={cn("rounded-full px-3 py-2 text-xs text-silver transition hover:bg-white/10 hover:text-moon", (pathname === href || (href !== "/" && pathname.startsWith(href))) && "bg-mint/15 text-mint")}>
              {messages.nav[key]}
            </Link>
          ))}
        </div>
        <div className="relative hidden md:block">
          <Button variant="ghost" className="h-10 w-10 px-0" aria-label={messages.search.open} onClick={() => setSearchOpen((value) => !value)}><Search size={18} /></Button>
          {searchOpen && (
            <div className="absolute right-0 top-12 w-[min(420px,calc(100vw-32px))] rounded-[28px] border border-mint/20 bg-ink-950/95 p-3 shadow-glow backdrop-blur-2xl">
              <div className="flex items-center gap-2 rounded-full border border-mint/15 bg-white/10 px-4 py-2">
                <Search size={16} className="text-mint" />
                <input
                  autoFocus
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Escape") closeSearch();
                  }}
                  placeholder={messages.search.placeholder}
                  className="min-w-0 flex-1 bg-transparent text-sm text-moon outline-none placeholder:text-silver"
                />
              </div>
              <div className="mt-3 grid gap-2">
                {results.length ? results.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeSearch}
                    className="rounded-2xl border border-white/10 bg-white/[.04] px-4 py-3 transition hover:border-mint/40 hover:bg-mint/10"
                  >
                    <div className="text-[10px] uppercase tracking-[.24em] text-mint">{item.group}</div>
                    <div className="mt-1 font-bold text-moon">{item.label}</div>
                  </Link>
                )) : (
                  <div className="rounded-2xl border border-white/10 px-4 py-5 text-center text-sm text-silver">{messages.search.empty}</div>
                )}
              </div>
            </div>
          )}
        </div>
        <Button
          variant="soft"
          className="h-10 px-3"
          onClick={() => setSettings((s) => ({ ...s, language: s.language === "zh" ? "en" : "zh" }))}
        >
          {settings.language === "zh" ? "EN" : "中"}
        </Button>
        <div className="hidden rounded-full border border-mint/20 bg-mint/10 px-3 py-2 text-xs font-black text-mint md:block">
          LV.{level.level}
        </div>
        <div className="grid h-10 w-10 place-items-center overflow-hidden rounded-full border border-mint/25 bg-white/10">
          {profile.avatar || webImages.members.soobin ? <img src={profile.avatar || webImages.members.soobin} alt={profile.nickname} className="h-full w-full object-cover" onError={(event) => { event.currentTarget.src = webImages.members.soobin; }} /> : <UserRound size={18} />}
        </div>
      </nav>
    </header>
  );
}
