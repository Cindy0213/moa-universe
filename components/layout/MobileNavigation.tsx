"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Sparkles, UserRound, Clock3, MoreHorizontal } from "lucide-react";
import { useApp } from "@/components/shared/AppProvider";
import { cn } from "@/lib/utils";

const items = [
  ["/", "home", Home],
  ["/members", "members", Sparkles],
  ["/archive", "archive", UserRound],
  ["/timeline", "timeline", Clock3],
  ["/settings", "settings", MoreHorizontal],
] as const;

export function MobileNavigation() {
  const pathname = usePathname();
  const { messages } = useApp();
  return (
    <nav className="fixed bottom-3 left-3 right-3 z-50 grid grid-cols-5 rounded-3xl border border-mint/15 bg-ink-950/80 p-2 backdrop-blur-2xl lg:hidden">
      {items.map(([href, key, Icon]) => (
        <Link key={href} href={href} className={cn("flex flex-col items-center gap-1 rounded-2xl px-2 py-2 text-[10px] text-silver", (pathname === href || (href !== "/" && pathname.startsWith(href))) && "bg-mint/15 text-mint")}>
          <Icon size={18} />
          <span>{messages.nav[key]}</span>
        </Link>
      ))}
    </nav>
  );
}
