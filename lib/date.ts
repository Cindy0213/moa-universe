import type { Anniversary } from "@/types";

export function daysBetween(start?: string, end = new Date()) {
  if (!start) return 0;
  const startDate = new Date(`${start}T00:00:00`);
  const endDate = new Date(end.getFullYear(), end.getMonth(), end.getDate());
  return Math.max(0, Math.floor((endDate.getTime() - startDate.getTime()) / 86400000));
}

export function formatDate(date: string, lang: "zh" | "en") {
  return new Intl.DateTimeFormat(lang === "zh" ? "zh-CN" : "en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(`${date}T00:00:00`));
}

export function nextOccurrence(item: Anniversary, today = new Date()) {
  const base = new Date(`${item.date}T00:00:00`);
  if (!item.recurring) return base;
  let next = new Date(today.getFullYear(), base.getMonth(), base.getDate());
  if (next < new Date(today.getFullYear(), today.getMonth(), today.getDate())) {
    next = new Date(today.getFullYear() + 1, base.getMonth(), base.getDate());
  }
  return next;
}

export function nextAnniversary(items: Anniversary[]) {
  const today = new Date();
  return [...items]
    .map((item) => ({ item, date: nextOccurrence(item, today) }))
    .sort((a, b) => a.date.getTime() - b.date.getTime())[0];
}
