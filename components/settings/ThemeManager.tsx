"use client";

import { useState } from "react";
import { EyeOff, Plus, Save, Trash2 } from "lucide-react";
import { Button } from "@/components/shared/Button";
import { useApp } from "@/components/shared/AppProvider";
import { defaultThemeId, themePresets, type ThemePreset } from "@/data/themePresets";

const makeThemeId = (name: string) => `custom-${name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || Date.now()}`;

function ColorField({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="grid gap-2 rounded-2xl border border-white/10 p-3 text-sm text-silver">
      <span>{label}</span>
      <span className="flex items-center gap-3">
        <input type="color" value={value} onChange={(event) => onChange(event.target.value)} className="h-10 w-14 cursor-pointer rounded border-0 bg-transparent p-0" />
        <input value={value} onChange={(event) => onChange(event.target.value)} className="min-w-0 flex-1 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-moon outline-none focus:border-mint" />
      </span>
    </label>
  );
}

export function ThemeManager() {
  const { messages, settings, setSettings, toast } = useApp();
  const customThemes = settings.customThemes ?? [];
  const hiddenThemeIds = settings.hiddenThemeIds ?? [];
  const visibleBuiltInThemes = themePresets.filter((theme) => !hiddenThemeIds.includes(theme.id));
  const allThemes = [...visibleBuiltInThemes, ...customThemes];
  const activeTheme = allThemes.find((theme) => theme.id === settings.theme) ?? themePresets[0];
  const [draft, setDraft] = useState<ThemePreset>({
    ...activeTheme,
    id: activeTheme.id.startsWith("custom-") ? activeTheme.id : makeThemeId(`${activeTheme.name} ${messages.settings.themes.copySuffix}`),
    name: activeTheme.id.startsWith("custom-") ? activeTheme.name : `${activeTheme.name} ${messages.settings.themes.copySuffix}`,
  });

  const updateDraft = (patch: Partial<ThemePreset>) => setDraft((current) => ({
    ...current,
    ...patch,
    colors: [
      patch.accent ?? current.accent,
      patch.background ?? current.background,
      patch.text ?? current.text,
    ],
  }));

  const saveCustomTheme = () => {
    const id = draft.id.startsWith("custom-") ? draft.id : makeThemeId(draft.name);
    const nextTheme = { ...draft, id, colors: [draft.accent, draft.background, draft.text] as [string, string, string] };
    setSettings((current) => {
      const existing = current.customThemes ?? [];
      return {
        ...current,
        theme: id,
        customThemes: existing.some((theme) => theme.id === id)
          ? existing.map((theme) => theme.id === id ? nextTheme : theme)
          : [...existing, nextTheme],
      };
    });
    toast(messages.settings.themes.saved);
  };

  const removeTheme = (theme: ThemePreset) => {
    if (theme.id.startsWith("custom-")) {
      setSettings((current) => ({
        ...current,
        theme: current.theme === theme.id ? defaultThemeId : current.theme,
        customThemes: (current.customThemes ?? []).filter((item) => item.id !== theme.id),
      }));
      return;
    }
    setSettings((current) => ({
      ...current,
      theme: current.theme === theme.id ? defaultThemeId : current.theme,
      hiddenThemeIds: [...new Set([...(current.hiddenThemeIds ?? []), theme.id])],
    }));
  };

  return (
    <section className="grid gap-5 lg:grid-cols-2">
      <div className="glass rounded-[30px] p-6">
        <h2 className="mb-5 text-2xl font-black text-moon">{messages.settings.themes.list}</h2>
        <div className="grid gap-3">
          {allThemes.map((theme) => (
            <div key={theme.id} className={`flex items-center gap-3 rounded-2xl border p-3 ${settings.theme === theme.id ? "border-mint bg-mint/15 text-moon" : "border-white/10 text-silver"}`}>
              <button type="button" onClick={() => setSettings((s) => ({ ...s, theme: theme.id }))} className="flex min-w-0 flex-1 items-center gap-4 text-left">
                <span className="flex shrink-0 overflow-hidden rounded-full border border-white/20">
                  {theme.colors.map((color) => <span key={color} className="h-9 w-9" style={{ backgroundColor: color }} />)}
                </span>
                <span className="min-w-0">
                  <span className="block font-black">{theme.name}</span>
                  <span className="mt-1 block text-xs leading-relaxed text-silver">{theme.description}</span>
                </span>
              </button>
              <button type="button" onClick={() => removeTheme(theme)} className="rounded-full border border-white/10 p-2 text-silver transition hover:border-mint hover:text-mint" aria-label={`${theme.id.startsWith("custom-") ? messages.settings.themes.delete : messages.settings.themes.hide} ${theme.name}`}>
                {theme.id.startsWith("custom-") ? <Trash2 size={16} /> : <EyeOff size={16} />}
              </button>
            </div>
          ))}
          {hiddenThemeIds.length > 0 && (
            <Button variant="ghost" onClick={() => setSettings((s) => ({ ...s, hiddenThemeIds: [] }))}>{messages.settings.themes.restorePresets}</Button>
          )}
        </div>
      </div>
      <div className="glass rounded-[30px] p-6">
        <h2 className="mb-5 text-2xl font-black text-moon">{messages.settings.themes.custom}</h2>
        <div className="grid gap-3">
          <label className="grid gap-2 text-sm text-silver">
            {messages.settings.themes.name}
            <input value={draft.name} onChange={(event) => updateDraft({ name: event.target.value })} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-moon outline-none focus:border-mint" />
          </label>
          <label className="grid gap-2 text-sm text-silver">
            {messages.settings.themes.description}
            <input value={draft.description} onChange={(event) => updateDraft({ description: event.target.value })} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-moon outline-none focus:border-mint" />
          </label>
          <div className="grid gap-3 sm:grid-cols-2">
            <ColorField label={messages.settings.themes.background} value={draft.background} onChange={(value) => updateDraft({ background: value })} />
            <ColorField label={messages.settings.themes.panel} value={draft.panel} onChange={(value) => updateDraft({ panel: value })} />
            <ColorField label={messages.settings.themes.text} value={draft.text} onChange={(value) => updateDraft({ text: value })} />
            <ColorField label={messages.settings.themes.accent} value={draft.accent} onChange={(value) => updateDraft({ accent: value })} />
            <ColorField label={messages.settings.themes.soft} value={draft.soft} onChange={(value) => updateDraft({ soft: value })} />
            <ColorField label={messages.settings.themes.muted} value={draft.muted} onChange={(value) => updateDraft({ muted: value })} />
          </div>
          <div className="flex flex-wrap gap-3">
            <Button onClick={saveCustomTheme}><Save size={16} />{messages.settings.themes.save}</Button>
            <Button variant="soft" onClick={() => setDraft({ ...activeTheme, id: makeThemeId(`${activeTheme.name} ${messages.settings.themes.copySuffix}`), name: `${activeTheme.name} ${messages.settings.themes.copySuffix}` })}><Plus size={16} />{messages.settings.themes.copyCurrent}</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
