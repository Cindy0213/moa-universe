import type { CollectionItem, TimelineEvent, UserProfile } from "@/types";
import { daysBetween } from "@/lib/date";

export type TaskPeriod = "daily" | "long";

export interface TaskProgress {
  id: string;
  name: string;
  description: string;
  href: string;
  period: TaskPeriod;
  exp: number;
  current: number;
  target: number;
  completed: boolean;
}

export interface LevelProgress {
  level: number;
  totalExp: number;
  currentLevelExp: number;
  nextLevelExp: number;
  progress: number;
}

const levelThresholds = [0, 80, 180, 320, 500, 740, 1040, 1400, 1820, 2300];

function todayString() {
  return new Date().toISOString().slice(0, 10);
}

function isToday(value?: string) {
  if (!value) return false;
  return value.slice(0, 10) === todayString();
}

export function getTaskProgress(input: {
  profile: UserProfile;
  timeline: TimelineEvent[];
  collection: CollectionItem[];
  visitedMembers: string[];
  dailyVisitedMembers: string[];
}) {
  const { profile, timeline, collection, visitedMembers, dailyVisitedMembers } = input;
  const uniqueVisited = new Set(visitedMembers);
  const profileFields = [profile.nickname, profile.fandomStartDate, profile.firstSong, profile.firstMV, profile.favoriteEra, profile.bias];
  const profileComplete = profileFields.filter(Boolean).length;
  const todayTimelineCount = timeline.filter((event) => isToday(event.date)).length;
  const todayCollectionCount = collection.filter((item) => isToday(item.createdAt)).length;

  const tasks: TaskProgress[] = [
    {
      id: "daily-login",
      name: "今日登陆宇宙",
      description: "每天打开一次 MOA UNIVERSE。",
      href: "/",
      period: "daily",
      exp: 20,
      current: 1,
      target: 1,
      completed: true,
    },
    {
      id: "daily-member",
      name: "今日访问成员主页",
      description: "进入任意一位成员主页。",
      href: "/members",
      period: "daily",
      exp: 30,
      current: Math.min(1, new Set(dailyVisitedMembers).size),
      target: 1,
      completed: dailyVisitedMembers.length > 0,
    },
    {
      id: "daily-memory",
      name: "今日写一条追星回忆",
      description: "在时间轴新增今天的记录。",
      href: "/timeline",
      period: "daily",
      exp: 35,
      current: Math.min(1, todayTimelineCount),
      target: 1,
      completed: todayTimelineCount > 0,
    },
    {
      id: "daily-collection",
      name: "今日收藏一件回忆",
      description: "在收藏馆新增今天的收藏。",
      href: "/collection",
      period: "daily",
      exp: 35,
      current: Math.min(1, todayCollectionCount),
      target: 1,
      completed: todayCollectionCount > 0,
    },
    {
      id: "profile",
      name: "完成个人档案",
      description: "补全昵称、入坑日期、第一首歌、第一支MV、喜欢时期和本命。",
      href: "/archive",
      period: "long",
      exp: 120,
      current: profileComplete,
      target: profileFields.length,
      completed: profileComplete >= profileFields.length,
    },
    {
      id: "soobin",
      name: "探索SOOBIN主页",
      description: "进入 SOOBIN 成员主页。",
      href: "/members/soobin",
      period: "long",
      exp: 50,
      current: uniqueVisited.has("soobin") ? 1 : 0,
      target: 1,
      completed: uniqueVisited.has("soobin"),
    },
    {
      id: "all-members",
      name: "查看全部成员主页",
      description: "浏览五位成员主页。",
      href: "/members",
      period: "long",
      exp: 180,
      current: Math.min(5, uniqueVisited.size),
      target: 5,
      completed: uniqueVisited.size >= 5,
    },
    {
      id: "first-memory",
      name: "写下第一条追星回忆",
      description: "在时间轴新增一条记录。",
      href: "/timeline",
      period: "long",
      exp: 80,
      current: Math.min(1, timeline.length),
      target: 1,
      completed: timeline.length > 0,
    },
    {
      id: "days-100",
      name: "陪伴100天",
      description: "根据入坑日期自动计算陪伴天数。",
      href: "/calendar",
      period: "long",
      exp: 160,
      current: Math.min(100, daysBetween(profile.fandomStartDate)),
      target: 100,
      completed: daysBetween(profile.fandomStartDate) >= 100,
    },
    {
      id: "collection-10",
      name: "收藏达到10件",
      description: "在收藏馆累计保存10件内容。",
      href: "/collection",
      period: "long",
      exp: 150,
      current: Math.min(10, collection.length),
      target: 10,
      completed: collection.length >= 10,
    },
  ];

  return tasks;
}

export function getLevelProgress(tasks: TaskProgress[]): LevelProgress {
  const totalExp = tasks.reduce((sum, task) => sum + (task.completed ? task.exp : 0), 0);
  let level = 1;
  for (let index = 0; index < levelThresholds.length; index += 1) {
    if (totalExp >= levelThresholds[index]) level = index + 1;
  }
  const currentThreshold = levelThresholds[level - 1] ?? 0;
  const nextThreshold = levelThresholds[level] ?? levelThresholds[levelThresholds.length - 1];
  const currentLevelExp = Math.max(0, totalExp - currentThreshold);
  const nextLevelExp = Math.max(1, nextThreshold - currentThreshold);
  return {
    level: Math.min(10, level),
    totalExp,
    currentLevelExp: level >= 10 ? nextLevelExp : currentLevelExp,
    nextLevelExp,
    progress: level >= 10 ? 100 : Math.min(100, (currentLevelExp / nextLevelExp) * 100),
  };
}
