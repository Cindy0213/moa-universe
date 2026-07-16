import type { Achievement } from "@/types";

export const defaultAchievements: Achievement[] = [
  { id: "first-login", name: "初次登陆宇宙", englishName: "First Login", icon: "Sparkles", description: "打开 MOA UNIVERSE。", current: 1, target: 1, unlocked: true, unlockedAt: new Date().toISOString(), rarity: "common", href: "/" },
  { id: "profile", name: "完成个人档案", englishName: "Archive Complete", icon: "IdCard", description: "保存一次个人追星档案。", current: 0, target: 1, unlocked: false, rarity: "rare", href: "/archive" },
  { id: "soobin", name: "探索SOOBIN主页", englishName: "Explore SOOBIN", icon: "Moon", description: "进入 SOOBIN 成员主页。", current: 0, target: 1, unlocked: false, rarity: "common", href: "/members/soobin" },
  { id: "all-members", name: "查看全部成员主页", englishName: "All Members", icon: "Users", description: "浏览五位成员主页。", current: 1, target: 5, unlocked: false, rarity: "epic", href: "/members" },
  { id: "first-memory", name: "写下第一条追星回忆", englishName: "First Memory", icon: "PenLine", description: "在时间轴新增一条记录。", current: 0, target: 1, unlocked: false, rarity: "common", href: "/timeline" },
  { id: "days-100", name: "陪伴100天", englishName: "100 Days", icon: "Calendar", description: "陪伴达到100天。", current: 100, target: 100, unlocked: true, unlockedAt: "2021-09-08", rarity: "rare", href: "/calendar" },
  { id: "collection-10", name: "收藏10个舞台", englishName: "10 Favorites", icon: "Heart", description: "收藏数量达到10。", current: 2, target: 10, unlocked: false, rarity: "epic", href: "/collection" },
];
