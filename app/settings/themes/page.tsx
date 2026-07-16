"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { AmbientBackground } from "@/components/layout/AmbientBackground";
import { Button } from "@/components/shared/Button";
import { ThemeManager } from "@/components/settings/ThemeManager";
import { useApp } from "@/components/shared/AppProvider";

export default function ThemeSettingsPage() {
  const { messages } = useApp();
  return (
    <>
      <AmbientBackground />
      <main className="page-shell">
        <Link href="/settings"><Button variant="ghost"><ArrowLeft size={16} />{messages.settings.themes.back}</Button></Link>
        <p className="mt-8 text-xs uppercase tracking-[.45em] text-mint">{messages.settings.themes.eyebrow}</p>
        <h1 className="mt-3 text-5xl font-black text-moon">{messages.settings.themes.title}</h1>
        <div className="mt-8">
          <ThemeManager />
        </div>
      </main>
    </>
  );
}
