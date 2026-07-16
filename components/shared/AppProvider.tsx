"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import zh from "@/messages/zh.json";
import en from "@/messages/en.json";
import { defaultAnniversaries } from "@/data/anniversaries";
import { defaultProfile, defaultSettings } from "@/data/mockProfile";
import { defaultWorks } from "@/data/works";
import { webImages } from "@/data/images";
import { defaultThemeId, themePresets } from "@/data/themePresets";
import type { Anniversary, CollectionItem, TimelineEvent, UserProfile, UserSettings, WorkItem } from "@/types";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { uid } from "@/lib/utils";

type Messages = typeof zh;
type AppContextValue = {
  messages: Messages;
  settings: UserSettings;
  setSettings: React.Dispatch<React.SetStateAction<UserSettings>>;
  profile: UserProfile;
  setProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
  timeline: TimelineEvent[];
  setTimeline: React.Dispatch<React.SetStateAction<TimelineEvent[]>>;
  anniversaries: Anniversary[];
  setAnniversaries: React.Dispatch<React.SetStateAction<Anniversary[]>>;
  works: WorkItem[];
  setWorks: React.Dispatch<React.SetStateAction<WorkItem[]>>;
  collection: CollectionItem[];
  setCollection: React.Dispatch<React.SetStateAction<CollectionItem[]>>;
  toast: (message: string) => void;
  exportData: () => string;
  importData: (json: string) => boolean;
  resetData: () => void;
};

const AppContext = createContext<AppContextValue | null>(null);

const defaultTimeline: TimelineEvent[] = [
  { id: "t-1", title: "第一次建立MOA数字档案", date: "2024-06-01", time: "21:00", type: "入坑", members: ["soobin"], description: "Demo memory record. 可以编辑或删除。", location: "Home", tags: ["demo"], pinned: true, important: true },
  { id: "t-2", title: "整理补档清单", date: "2024-08-15", type: "自定义事件", members: ["yeonjun", "beomgyu"], description: "把想看的内容放进作品补档宇宙。", tags: ["archive"], pinned: false, important: false },
];

const defaultCollection: CollectionItem[] = [
  { id: "c-1", title: "Demo ticket memory", image: webImages.collection[0], date: "2024-05-10", type: "演唱会票根", members: ["soobin"], note: "上传你的票根照片后，这里会变成真正的回忆墙。", pinned: true, favorite: true, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: "c-2", title: "Soft focus screenshot", image: webImages.collection[1], date: "2024-05-20", type: "截图", members: ["taehyun"], note: "网页图片示例收藏。", pinned: false, favorite: false, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
];

const legacyThemeIds: Record<string, string> = {
  "Mint Dream": "mint-dream",
  "Blue Hour": "blue-hour",
  "Soft Focus": "ppulbatu-home",
  "Star Seeker": "blue-hour",
  Tomorrow: "peach-pop",
  "Minimal Dark": "mono-star",
};

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useLocalStorage("moa-settings", defaultSettings);
  const [profile, setProfile] = useLocalStorage("moa-profile", defaultProfile);
  const [timeline, setTimeline] = useLocalStorage("moa-timeline", defaultTimeline);
  const [anniversaries, setAnniversaries] = useLocalStorage("moa-anniversaries", defaultAnniversaries);
  const [works, setWorks] = useLocalStorage("moa-works", defaultWorks);
  const [collection, setCollection] = useLocalStorage("moa-collection", defaultCollection);
  const [toasts, setToasts] = useState<{ id: string; message: string }[]>([]);
  const messages = settings.language === "zh" ? zh : en;

  useEffect(() => {
    if (works.some((work) => work.id.startsWith("demo-"))) {
      setWorks(defaultWorks);
    }
  }, [works, setWorks]);

  useEffect(() => {
    const normalizedTheme = legacyThemeIds[settings.theme] ?? settings.theme;
    const activeTheme = [...themePresets, ...(settings.customThemes ?? [])].find((theme) => theme.id === normalizedTheme);
    const themeId = activeTheme
      ? normalizedTheme
      : defaultThemeId;
    document.body.dataset.theme = themeId;
    if (activeTheme) {
      document.body.style.setProperty("--custom-theme-bg", activeTheme.background);
      document.body.style.setProperty("--custom-theme-panel", activeTheme.panel);
      document.body.style.setProperty("--custom-theme-text", activeTheme.text);
      document.body.style.setProperty("--custom-theme-accent", activeTheme.accent);
      document.body.style.setProperty("--custom-theme-soft", activeTheme.soft);
      document.body.style.setProperty("--custom-theme-muted", activeTheme.muted);
    }
    if (themeId !== settings.theme) {
      setSettings((current) => ({ ...current, theme: themeId }));
    }
  }, [settings.theme, settings.customThemes, setSettings]);

  useEffect(() => {
    document.body.classList.toggle("light", settings.appearance === "light");
  }, [settings.appearance]);

  const toast = (message: string) => {
    const id = uid("toast");
    setToasts((items) => [...items, { id, message }]);
    window.setTimeout(() => setToasts((items) => items.filter((item) => item.id !== id)), 2600);
  };

  const value = useMemo<AppContextValue>(() => ({
    messages,
    settings,
    setSettings,
    profile,
    setProfile,
    timeline,
    setTimeline,
    anniversaries,
    setAnniversaries,
    works,
    setWorks,
    collection,
    setCollection,
    toast,
    exportData: () => JSON.stringify({ settings, profile, timeline, anniversaries, works, collection }, null, 2),
    importData: (json: string) => {
      try {
        const data = JSON.parse(json);
        if (data.settings) setSettings(data.settings);
        if (data.profile) setProfile(data.profile);
        if (data.timeline) setTimeline(data.timeline);
        if (data.anniversaries) setAnniversaries(data.anniversaries);
        if (data.works) setWorks(data.works);
        if (data.collection) setCollection(data.collection);
        toast(messages.common.saved);
        return true;
      } catch {
        toast("Import failed");
        return false;
      }
    },
    resetData: () => {
      setSettings(defaultSettings);
      setProfile(defaultProfile);
      setTimeline(defaultTimeline);
      setAnniversaries(defaultAnniversaries);
      setWorks(defaultWorks);
      setCollection(defaultCollection);
      toast(messages.common.saved);
    },
  }), [settings, profile, timeline, anniversaries, works, collection, messages]);

  return (
    <AppContext.Provider value={value}>
      {children}
      <div className="fixed right-4 top-20 z-[80] flex flex-col gap-2">
        {toasts.map((item) => (
          <div key={item.id} className="rounded-full border border-mint/30 bg-ink-900/85 px-4 py-2 text-sm text-moon shadow-glow backdrop-blur-xl">
            {item.message}
          </div>
        ))}
      </div>
    </AppContext.Provider>
  );
}

export function useApp() {
  const value = useContext(AppContext);
  if (!value) throw new Error("useApp must be used inside AppProvider");
  return value;
}
