"use client";

import Link from "next/link";
import { ArrowUpRight, CheckCircle2, Clock3, Infinity, Sparkles } from "lucide-react";
import { AmbientBackground } from "@/components/layout/AmbientBackground";
import { useApp } from "@/components/shared/AppProvider";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { getLevelProgress, getTaskProgress, type TaskProgress } from "@/lib/progress";

function TaskRow({ task, labels, goLabel }: { task: TaskProgress; labels: [string, string]; goLabel: string }) {
  const progress = Math.min(100, (task.current / task.target) * 100);
  return (
    <Link href={task.href} className="group grid gap-4 rounded-3xl border border-mint/15 bg-white/[.04] p-4 transition hover:-translate-y-1 hover:border-mint/40 md:grid-cols-[1fr_160px_92px] md:items-center">
      <div className="flex gap-4">
        <div className={`grid h-11 w-11 shrink-0 place-items-center rounded-2xl ${task.completed ? "bg-mint text-ink-950" : "bg-white/10 text-mint"}`}>
          {task.completed ? <CheckCircle2 size={20} /> : <Sparkles size={20} />}
        </div>
        <div>
          <h2 className="text-lg font-black text-moon">{labels[0]}</h2>
          <p className="mt-1 text-sm text-silver">{labels[1]}</p>
        </div>
      </div>
      <div>
        <div className="mb-2 flex justify-between text-xs text-silver"><span>{task.current}/{task.target}</span><span>+{task.exp} EXP</span></div>
        <div className="h-2 rounded-full bg-white/10"><div className="h-full rounded-full bg-mint" style={{ width: `${progress}%` }} /></div>
      </div>
      <span className="inline-flex items-center justify-end gap-1 text-sm font-semibold text-mint transition group-hover:text-mint-light">
        {goLabel} <ArrowUpRight size={15} />
      </span>
    </Link>
  );
}

export default function AchievementsPage() {
  const { messages, profile, timeline, collection } = useApp();
  const today = new Date().toISOString().slice(0, 10);
  const [visitedMembers] = useLocalStorage<string[]>("moa-visited-members", []);
  const [dailyVisitedMembers] = useLocalStorage<string[]>(`moa-daily-visited-members-${today}`, []);
  const tasks = getTaskProgress({ profile, timeline, collection, visitedMembers, dailyVisitedMembers });
  const level = getLevelProgress(tasks);
  const dailyTasks = tasks.filter((task) => task.period === "daily");
  const longTasks = tasks.filter((task) => task.period === "long");
  return (
    <>
      <AmbientBackground />
      <main className="page-shell">
        <p className="text-xs uppercase tracking-[.45em] text-mint">{messages.pages.achievements.eyebrow}</p>
        <h1 className="mt-3 text-5xl font-black text-moon">{messages.pages.achievements.title}</h1>

        <section className="glass mt-8 rounded-[32px] p-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[.28em] text-silver">{messages.pages.achievements.accountLevel}</p>
              <div className="mt-2 text-5xl font-black text-mint">LV.{level.level}</div>
            </div>
            <div className="text-right text-sm text-silver">{level.totalExp} EXP</div>
          </div>
          <div className="mt-5 h-3 rounded-full bg-white/10">
            <div className="h-full rounded-full bg-mint shadow-glow" style={{ width: `${level.progress}%` }} />
          </div>
          <p className="mt-2 text-sm text-silver">{level.level >= 10 ? messages.pages.achievements.maxLevel : `${level.currentLevelExp}/${level.nextLevelExp} EXP ${messages.pages.achievements.nextLevel}`}</p>
        </section>

        <section className="mt-8">
          <div className="mb-4 flex items-center gap-2">
            <Clock3 className="text-mint" size={20} />
            <h2 className="text-2xl font-black text-moon">{messages.pages.achievements.daily}</h2>
            <span className="rounded-full border border-mint/20 px-3 py-1 text-xs text-silver">{messages.pages.achievements.dailyRefresh}</span>
          </div>
          <div className="space-y-3">{dailyTasks.map((task) => <TaskRow key={task.id} task={task} labels={messages.pages.achievements.tasks[task.id as keyof typeof messages.pages.achievements.tasks]} goLabel={messages.pages.achievements.go} />)}</div>
        </section>

        <section className="mt-10">
          <div className="mb-4 flex items-center gap-2">
            <Infinity className="text-mint" size={20} />
            <h2 className="text-2xl font-black text-moon">{messages.pages.achievements.long}</h2>
            <span className="rounded-full border border-mint/20 px-3 py-1 text-xs text-silver">{messages.pages.achievements.longTerm}</span>
          </div>
          <div className="space-y-3">{longTasks.map((task) => <TaskRow key={task.id} task={task} labels={messages.pages.achievements.tasks[task.id as keyof typeof messages.pages.achievements.tasks]} goLabel={messages.pages.achievements.go} />)}</div>
        </section>
      </main>
    </>
  );
}
