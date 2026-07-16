"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Shuffle } from "lucide-react";
import { Button } from "@/components/shared/Button";
import { members } from "@/data/members";
import { webImages } from "@/data/images";
import { useApp } from "@/components/shared/AppProvider";

export function MemberCardDeck() {
  const { messages, profile } = useApp();
  const [active, setActive] = useState(0);
  const member = members[active];

  useEffect(() => {
    const biasIndex = members.findIndex((item) => item.id === profile.bias);
    if (biasIndex >= 0) setActive(biasIndex);
  }, [profile.bias]);
  const deck = useMemo(() => {
    return [0, 1, 2, 3].map((offset) => members[(active + offset) % members.length]);
  }, [active]);

  const drawNext = () => {
    setActive((index) => {
      const choices = members.map((_, memberIndex) => memberIndex).filter((memberIndex) => memberIndex !== index);
      return choices[Math.floor(Math.random() * choices.length)];
    });
  };

  return (
    <section className="relative mx-auto min-h-[610px] w-full max-w-[560px] overflow-hidden rounded-[36px] border border-mint/15 bg-white/[.035] p-5 shadow-glow backdrop-blur-xl">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_22%_16%,rgba(119,230,198,.22),transparent_26%),radial-gradient(circle_at_86%_72%,rgba(126,166,255,.18),transparent_30%)]" />
      <div className="relative z-10 flex items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[.4em] text-mint">{messages.home.deck.eyebrow}</p>
          <h2 className="mt-1 text-2xl font-black text-moon">{messages.home.deck.title}</h2>
        </div>
        <Button onClick={drawNext} className="shrink-0">
          <Shuffle size={16} />
          {messages.home.deck.draw}
        </Button>
      </div>

      <div className="relative z-10 mt-6 h-[455px] sm:h-[492px]">
        {deck.slice(1).reverse().map((card, stackIndex) => (
          <motion.div
            key={card.id}
            className="absolute inset-x-0 top-8 mx-auto h-[340px] w-[46%] rounded-[32px] border border-white/10 bg-ink-900/60 shadow-2xl sm:h-[382px]"
            animate={{
              x: 70 + (stackIndex - 1) * 18,
              y: stackIndex * 18,
              rotate: (stackIndex - 1) * 4,
              scale: 0.88 + stackIndex * 0.035,
              opacity: 0.45 + stackIndex * 0.18,
            }}
            transition={{ type: "spring", stiffness: 180, damping: 24 }}
          >
            <div className="h-full overflow-hidden rounded-[30px] opacity-65">
              <img src={card.image || webImages.group} alt="" className="h-full w-full object-cover" onError={(event) => { event.currentTarget.src = webImages.group; }} />
            </div>
          </motion.div>
        ))}

        <AnimatePresence mode="popLayout">
          <motion.article
            key={member.id}
            className="absolute inset-x-0 top-0 mx-auto w-[62%] sm:w-[66%]"
            initial={{ x: 220, y: 24, rotate: 10, opacity: 0, scale: .92 }}
            animate={{ x: 0, y: 0, rotate: member.id === profile.bias ? -1 : 0, opacity: 1, scale: 1 }}
            exit={{ x: -260, y: 24, rotate: -10, opacity: 0, scale: .9 }}
            transition={{ type: "spring", stiffness: 170, damping: 22 }}
          >
            <div className="group relative overflow-hidden rounded-[34px] border bg-ink-950/65 p-3 shadow-2xl backdrop-blur-2xl" style={{ borderColor: `${member.secondaryColor}80`, boxShadow: `0 30px 90px ${member.glow}` }}>
              {member.id === profile.bias && <div className="absolute left-6 top-6 z-20 rounded-full bg-mint px-3 py-1 text-xs font-black text-ink-950">{messages.home.deck.bias}</div>}
              <div className="relative aspect-[4/5] overflow-hidden rounded-[28px]">
                <img src={member.image || webImages.group} alt={member.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" onError={(event) => { event.currentTarget.src = webImages.group; }} />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/88 via-ink-950/10 to-white/5" />
                <div className="absolute left-5 top-5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] uppercase tracking-[.24em] text-moon backdrop-blur-xl">No. {String(active + 1).padStart(2, "0")}</div>
                <div className="absolute bottom-5 left-5 right-5">
                  <p className="text-xs uppercase tracking-[.35em] text-silver">{member.birthday}</p>
                  <h3 className="mt-1 text-4xl font-black tracking-tight text-moon sm:text-5xl">{member.name}</h3>
                  <p className="mt-1 text-base text-silver sm:text-lg">{member.koreanName}</p>
                </div>
              </div>
              <div className="flex items-center justify-between px-2 pt-3">
                <span className="h-2 w-24 rounded-full" style={{ background: `linear-gradient(90deg, ${member.color}, ${member.secondaryColor})` }} />
                <Link href={`/members/${member.id}`}>
                  <Button variant="ghost" className="h-9 px-3 text-sm">{messages.home.deck.explore} <ArrowUpRight size={16} /></Button>
                </Link>
              </div>
            </div>
          </motion.article>
        </AnimatePresence>
      </div>

      <div className="relative z-10 mt-6 flex flex-wrap justify-center gap-2">
        {members.map((item, index) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setActive(index)}
            className={`rounded-full border px-3 py-2 text-xs font-semibold transition ${active === index ? "border-mint bg-mint text-ink-950" : "border-mint/20 bg-white/[.04] text-silver hover:text-moon"}`}
          >
            {item.name}
          </button>
        ))}
      </div>
    </section>
  );
}
