"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { MemberProfile } from "@/types";
import { Button } from "@/components/shared/Button";
import { webImages } from "@/data/images";
import { useApp } from "@/components/shared/AppProvider";

export function MemberCard({ member, featured = false }: { member: MemberProfile; featured?: boolean }) {
  const { messages } = useApp();
  return (
    <motion.article
      whileHover={{ y: -8, rotate: featured ? -1 : 0 }}
      className={`group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[.055] p-3 backdrop-blur-xl ${featured ? "md:col-span-2 md:row-span-2" : ""}`}
      style={{ boxShadow: `0 24px 80px ${member.glow}` }}
    >
      {featured && <div className="absolute left-5 top-5 z-10 rounded-full bg-mint px-3 py-1 text-xs font-black text-ink-950">{messages.pages.members.bias}</div>}
      <div className={`placeholder-portrait relative overflow-hidden rounded-3xl ${featured ? "aspect-[4/5]" : "aspect-[3/4]"}`}>
        {member.image && <img src={member.image} alt={member.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" onError={(event) => { event.currentTarget.src = webImages.group; }} />}
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <div className="text-[11px] uppercase tracking-[.35em] text-silver">{member.birthday}</div>
          <h3 className="mt-1 text-3xl font-black tracking-tight text-moon">{member.name}</h3>
          <p className="text-sm text-silver">{member.koreanName}</p>
        </div>
      </div>
      <div className="flex items-center justify-between px-2 pt-3">
        <span className="h-2 w-20 rounded-full" style={{ background: `linear-gradient(90deg, ${member.color}, ${member.secondaryColor})` }} />
        <Link href={`/members/${member.id}`}>
          <Button variant="ghost" className="h-9 px-3">{messages.pages.members.explore} <ArrowUpRight size={16} /></Button>
        </Link>
      </div>
    </motion.article>
  );
}
