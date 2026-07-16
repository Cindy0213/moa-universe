"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Camera, IdCard, Save } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { z } from "zod";
import { AmbientBackground } from "@/components/layout/AmbientBackground";
import { Button } from "@/components/shared/Button";
import { useApp } from "@/components/shared/AppProvider";
import { profileSchema } from "@/lib/validation";
import { daysBetween } from "@/lib/date";
import { webImages } from "@/data/images";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { getLevelProgress, getTaskProgress } from "@/lib/progress";
import { memberById, members } from "@/data/members";
import type { UserProfile } from "@/types";

type ProfileFormValues = z.infer<typeof profileSchema>;

async function fileToAvatar(file: File) {
  const objectUrl = URL.createObjectURL(file);
  try {
    const image = await new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = objectUrl;
    });
    const size = 720;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const context = canvas.getContext("2d");
    if (!context) throw new Error("Canvas is not available");
    const crop = Math.min(image.width, image.height);
    const sx = (image.width - crop) / 2;
    const sy = (image.height - crop) / 2;
    context.drawImage(image, sx, sy, crop, crop, 0, 0, size, size);
    return canvas.toDataURL("image/jpeg", 0.88);
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}

export default function ArchivePage() {
  const { profile, setProfile, timeline, collection, toast, messages } = useApp();
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<ProfileFormValues>({ resolver: zodResolver(profileSchema), defaultValues: profile });
  const [avatarPreview, setAvatarPreview] = useState(profile.avatar);
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const today = new Date().toISOString().slice(0, 10);
  const [visitedMembers] = useLocalStorage<string[]>("moa-visited-members", []);
  const [dailyVisitedMembers] = useLocalStorage<string[]>(`moa-daily-visited-members-${today}`, []);

  useEffect(() => {
    setAvatarPreview(profile.avatar);
  }, [profile.avatar]);

  const avatar = avatarPreview;
  const biasMember = memberById[watch("bias") || profile.bias];
  const level = getLevelProgress(getTaskProgress({ profile, timeline, collection, visitedMembers, dailyVisitedMembers }));
  const updateAvatar = (value: string) => {
    setAvatarPreview(value);
    setProfile((current) => ({ ...current, avatar: value }));
    toast(messages.pages.archive.avatarUpdated);
  };
  return (
    <>
      <AmbientBackground />
      <main className="page-shell">
        <p className="text-xs uppercase tracking-[.45em] text-mint">{messages.pages.archive.eyebrow}</p>
        <h1 className="mt-3 text-5xl font-black text-moon">{messages.pages.archive.title}</h1>
        <section className="mt-10 grid gap-8 lg:grid-cols-[.8fr_1.2fr]">
          <div className="glass rounded-[32px] p-6">
            <div className="mb-8 flex items-center gap-4">
              <button
                type="button"
                onClick={() => avatarInputRef.current?.click()}
                className="group relative grid h-24 w-24 shrink-0 place-items-center overflow-hidden rounded-full border border-mint/30 bg-white/10 focus:outline-none focus:ring-2 focus:ring-mint/60"
                aria-label={messages.pages.archive.changeAvatar}
              >
                {avatar || webImages.members.soobin ? <img src={avatar || webImages.members.soobin} alt="avatar" className="h-full w-full object-cover" onError={(event) => { event.currentTarget.src = webImages.members.soobin; }} /> : <IdCard className="text-mint" />}
                <span className="absolute inset-0 grid place-items-center bg-ink-950/45 text-moon opacity-0 transition group-hover:opacity-100">
                  <Camera size={22} />
                </span>
              </button>
              <input
                ref={avatarInputRef}
                type="file"
                accept="image/*"
                className="sr-only"
                onChange={async (event) => {
                  const file = event.target.files?.[0];
                  event.currentTarget.value = "";
                  if (!file) return;
                  updateAvatar(await fileToAvatar(file));
                }}
              />
              <div>
                <div className="text-3xl font-black text-moon">{watch("nickname")}</div>
                <div className="text-silver">{biasMember?.name || "SOOBIN"} {messages.pages.archive.biasLabel}</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[[messages.pages.archive.stats[0], daysBetween(watch("fandomStartDate"))], [messages.pages.archive.stats[1], collection.length], [messages.pages.archive.stats[2], 1], [messages.pages.archive.stats[3], timeline.length], [messages.pages.archive.stats[4], 2]].map(([k, v]) => (
                <div key={k} className="rounded-2xl border border-mint/15 bg-white/[.04] p-4"><div className="text-3xl font-black text-mint">{v}</div><div className="text-xs text-silver">{k}</div></div>
              ))}
            </div>
            <div className="mt-5 rounded-2xl border border-mint/15 bg-white/[.04] p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-xs uppercase tracking-[.24em] text-silver">{messages.pages.archive.accountLevel}</div>
                  <div className="mt-1 text-3xl font-black text-mint">LV.{level.level}</div>
                </div>
                <div className="text-right text-xs text-silver">{level.totalExp} EXP</div>
              </div>
              <div className="mt-3 h-2 rounded-full bg-white/10">
                <div className="h-full rounded-full bg-mint" style={{ width: `${level.progress}%` }} />
              </div>
              <div className="mt-2 text-xs text-silver">{level.level >= 10 ? messages.pages.archive.maxLevel : `${level.currentLevelExp}/${level.nextLevelExp} ${messages.pages.archive.nextLevel}`}</div>
            </div>
            <div className="mt-5 rounded-2xl border border-white/10 p-4 text-sm text-silver">{messages.pages.archive.autoTags}</div>
          </div>
          <form onSubmit={handleSubmit((data) => { setProfile({ ...profile, ...data }); toast(messages.common.saved); })} className="glass rounded-[32px] p-6">
            <div className="grid gap-4 md:grid-cols-2">
              <label className="space-y-2 text-sm text-silver md:col-span-2">
                {messages.pages.archive.bias}
                <select
                  className="w-full rounded-2xl border border-mint/15 bg-white/10 p-3 text-moon"
                  {...register("bias")}
                  onChange={(event) => {
                    const bias = event.target.value as ProfileFormValues["bias"];
                    setValue("bias", bias, { shouldDirty: true, shouldValidate: true });
                    setProfile((current) => ({ ...current, bias }));
                    toast(messages.pages.archive.biasUpdated);
                  }}
                >
                  {members.map((member) => (
                    <option key={member.id} value={member.id}>{member.name} · {member.koreanName}</option>
                  ))}
                </select>
              </label>
              <label className="space-y-2 text-sm text-silver">{messages.pages.archive.nickname}<input className="w-full rounded-2xl border border-mint/15 bg-white/10 p-3 text-moon" {...register("nickname")} />{errors.nickname && <span className="text-xs text-red-300">{errors.nickname.message}</span>}</label>
              <label className="space-y-2 text-sm text-silver">{messages.pages.archive.fandomStartDate}<input type="date" className="w-full rounded-2xl border border-mint/15 bg-white/10 p-3 text-moon" {...register("fandomStartDate")} /></label>
              <label className="space-y-2 text-sm text-silver">{messages.pages.archive.firstSong}<input className="w-full rounded-2xl border border-mint/15 bg-white/10 p-3 text-moon" {...register("firstSong")} /></label>
              <label className="space-y-2 text-sm text-silver">{messages.pages.archive.firstMV}<input className="w-full rounded-2xl border border-mint/15 bg-white/10 p-3 text-moon" {...register("firstMV")} /></label>
              <label className="space-y-2 text-sm text-silver">{messages.pages.archive.firstConcert}<input className="w-full rounded-2xl border border-mint/15 bg-white/10 p-3 text-moon" {...register("firstConcert")} /></label>
              <label className="space-y-2 text-sm text-silver">{messages.pages.archive.favoriteEra}<input className="w-full rounded-2xl border border-mint/15 bg-white/10 p-3 text-moon" {...register("favoriteEra")} /></label>
            </div>
            <Button className="mt-6" type="submit"><Save size={16} />{messages.common.save}</Button>
          </form>
        </section>
      </main>
    </>
  );
}
