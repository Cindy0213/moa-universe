"use client";

import Link from "next/link";
import { Download, Palette, RotateCcw, Upload } from "lucide-react";
import { AmbientBackground } from "@/components/layout/AmbientBackground";
import { Button } from "@/components/shared/Button";
import { useApp } from "@/components/shared/AppProvider";

export default function SettingsPage() {
  const { messages, settings, setSettings, exportData, importData, resetData, toast } = useApp();
  const toggle = (key: keyof typeof settings) => setSettings((s) => {
    const enabled = !s[key];
    toast(`${messages.settings.options[key as keyof typeof messages.settings.options]}: ${enabled ? messages.settings.enabled : messages.settings.disabled}`);
    if (key === "reducedMotion" && enabled) {
      return { ...s, reducedMotion: true, animations: false, particles: false };
    }
    if (key === "animations" && enabled) {
      return { ...s, animations: true, reducedMotion: false };
    }
    if (key === "particles" && enabled) {
      return { ...s, particles: true, reducedMotion: false };
    }
    return { ...s, [key]: enabled };
  });
  const optionKeys = ["animations", "particles", "soundEffects", "reducedMotion", "privacyMode"] as const;
  return (
    <>
      <AmbientBackground />
      <main className="page-shell">
        <p className="text-xs uppercase tracking-[.45em] text-mint">{messages.settings.eyebrow}</p>
        <h1 className="mt-3 text-5xl font-black text-moon">{messages.settings.title}</h1>
        <section className="mt-8 grid gap-5 lg:grid-cols-2">
          <div className="glass rounded-[30px] p-6">
            <h2 className="mb-5 text-2xl font-black text-moon">{messages.settings.languageTheme}</h2>
            <div className="grid gap-3">
              <Button variant="soft" onClick={() => setSettings((s) => ({ ...s, language: s.language === "zh" ? "en" : "zh" }))}>
                {messages.settings.language}: {settings.language === "zh" ? messages.settings.chinese : messages.settings.english}
              </Button>
              <Button variant="soft" onClick={() => setSettings((s) => ({ ...s, appearance: s.appearance === "dark" ? "light" : "dark" }))}>
                {messages.settings.appearance}: {settings.appearance === "dark" ? messages.settings.dark : messages.settings.light}
              </Button>
              <Link href="/settings/themes"><Button variant="soft"><Palette size={16} />{messages.settings.manageThemes}</Button></Link>
            </div>
          </div>
          <div className="glass rounded-[30px] p-6">
            <h2 className="mb-5 text-2xl font-black text-moon">{messages.settings.interaction}</h2>
            <div className="grid gap-3">
              {optionKeys.map((key) => <label key={key} className="flex items-center justify-between rounded-2xl border border-white/10 p-3 text-silver"><span>{messages.settings.options[key]}</span><input type="checkbox" checked={Boolean(settings[key])} onChange={() => toggle(key)} /></label>)}
            </div>
          </div>
          <div className="glass rounded-[30px] p-6 lg:col-span-2">
            <h2 className="mb-5 text-2xl font-black text-moon">{messages.settings.data}</h2>
            <div className="flex flex-wrap gap-3">
              <Button onClick={() => { navigator.clipboard.writeText(exportData()); toast(messages.settings.exportCopied); }}><Download size={16} />{messages.settings.export}</Button>
              <Button variant="soft" onClick={() => { const json = window.prompt(messages.settings.pasteJson); if (json) importData(json); }}><Upload size={16} />{messages.settings.import}</Button>
              <Button variant="soft" onClick={resetData}><RotateCcw size={16} />{messages.settings.restore}</Button>
              <Button variant="ghost" onClick={() => { localStorage.clear(); resetData(); }}>{messages.settings.clear}</Button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
