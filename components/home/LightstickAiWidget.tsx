"use client";

import { useState } from "react";
import { Copy, RefreshCw, Send, Trash2, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/shared/Button";
import { useApp } from "@/components/shared/AppProvider";
import { quickPrompts, quickPromptsEn } from "@/data/aiResponses";
import { aiProvider } from "@/services/ai";
import type { ChatMessage } from "@/types";
import { uid } from "@/lib/utils";

function LightstickIcon() {
  return (
    <div className="relative h-20 w-20" aria-hidden>
      <div className="absolute left-1/2 top-1 h-12 w-12 -translate-x-1/2 rounded-full border border-mint/50 bg-mint/15 shadow-glow backdrop-blur-xl">
        <div className="absolute inset-2 rounded-full bg-moon/90 shadow-[inset_0_0_16px_rgba(119,230,198,.55)]" />
        <div className="absolute left-1/2 top-1/2 h-2 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-mint" />
        <div className="absolute left-1/2 top-1/2 h-8 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-mint" />
      </div>
      <div className="absolute bottom-2 left-1/2 h-9 w-4 -translate-x-1/2 rounded-full border border-mint/40 bg-moon/90" />
      <div className="absolute bottom-0 left-1/2 h-4 w-7 -translate-x-1/2 rounded-b-full bg-mint" />
    </div>
  );
}

export function LightstickAiWidget() {
  const { settings, messages, toast } = useApp();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messagesList, setMessagesList] = useState<ChatMessage[]>([
    { id: "welcome-widget", role: "assistant", content: messages.common.demo, createdAt: new Date().toISOString() },
  ]);
  const prompts = (settings.language === "zh" ? quickPrompts : quickPromptsEn).slice(0, 4);

  const ask = async (text: string) => {
    if (!text.trim() || loading) return;
    const user: ChatMessage = { id: uid("chat"), role: "user", content: text, createdAt: new Date().toISOString() };
    setMessagesList((items) => [...items, user]);
    setInput("");
    setLoading(true);
    const answer = await aiProvider.ask(text, settings.language);
    setMessagesList((items) => [...items, { id: uid("chat"), role: "assistant", content: answer, createdAt: new Date().toISOString() }]);
    setLoading(false);
  };

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-24 right-5 z-40 grid place-items-center rounded-full border border-mint/25 bg-ink-950/60 p-2 shadow-glow backdrop-blur-2xl transition hover:border-mint md:bottom-8 md:right-8"
        aria-label={messages.pages.ai.open}
        animate={settings.animations ? { y: [0, -8, 0] } : undefined}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <LightstickIcon />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[75] flex items-end justify-end bg-black/35 p-4 backdrop-blur-sm md:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.section
              className="glass flex h-[78vh] w-full max-w-xl flex-col rounded-[32px] p-4"
              initial={{ opacity: 0, y: 30, scale: .96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: .98 }}
            >
              <div className="mb-3 flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[.35em] text-mint">{messages.pages.ai.eyebrow}</p>
                  <h2 className="text-2xl font-black text-moon">{messages.pages.ai.title}</h2>
                </div>
                <Button variant="ghost" className="h-10 w-10 px-0" onClick={() => setOpen(false)} aria-label={messages.pages.ai.close}><X size={18} /></Button>
              </div>
              <div className="mb-3 flex flex-wrap gap-2">
                {prompts.map((prompt) => (
                  <button key={prompt} onClick={() => ask(prompt)} className="rounded-full border border-mint/15 bg-white/[.05] px-3 py-2 text-xs text-silver transition hover:border-mint/40 hover:text-moon">
                    {prompt}
                  </button>
                ))}
              </div>
              <div className="flex-1 space-y-3 overflow-auto rounded-3xl border border-mint/10 bg-white/[.025] p-3">
                {messagesList.map((msg) => (
                  <div key={msg.id} className={`max-w-[88%] rounded-3xl p-3 ${msg.role === "user" ? "ml-auto bg-mint text-ink-950" : "bg-white/[.07] text-moon"}`}>
                    <p className="whitespace-pre-line text-sm leading-6">{msg.content}</p>
                    <button onClick={() => navigator.clipboard.writeText(msg.content).then(() => toast(messages.actions.copied))} className="mt-2 text-xs opacity-70"><Copy size={13} className="mr-1 inline" />{messages.actions.copy}</button>
                  </div>
                ))}
                {loading && <div className="w-fit rounded-3xl bg-white/[.07] p-3 text-sm text-mint">{messages.pages.ai.typing}</div>}
              </div>
              <div className="mt-3 flex gap-2">
                <Button variant="soft" className="h-11 w-11 px-0" onClick={() => setMessagesList([])}><Trash2 size={16} /></Button>
                <Button variant="soft" className="h-11 w-11 px-0" onClick={() => ask(messagesList.at(-2)?.content || messages.pages.ai.fallback)}><RefreshCw size={16} /></Button>
                <input value={input} onChange={(event) => setInput(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") ask(input); }} className="min-w-0 flex-1 rounded-full border border-mint/15 bg-white/10 px-4 text-moon outline-none focus:border-mint" placeholder={messages.pages.ai.placeholder} />
                <Button className="h-11 w-11 px-0" onClick={() => ask(input)} disabled={loading}><Send size={16} /></Button>
              </div>
            </motion.section>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
