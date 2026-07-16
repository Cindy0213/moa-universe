"use client";

import { useState } from "react";
import { Copy, RefreshCw, Send, Trash2 } from "lucide-react";
import { AmbientBackground } from "@/components/layout/AmbientBackground";
import { Button } from "@/components/shared/Button";
import { useApp } from "@/components/shared/AppProvider";
import { quickPrompts, quickPromptsEn } from "@/data/aiResponses";
import { aiProvider } from "@/services/ai";
import type { ChatMessage } from "@/types";
import { uid } from "@/lib/utils";

export default function AiGuidePage() {
  const { settings, messages, toast } = useApp();
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messagesList, setMessagesList] = useState<ChatMessage[]>([{ id: "welcome", role: "assistant", content: messages.common.demo, createdAt: new Date().toISOString() }]);
  const prompts = settings.language === "zh" ? quickPrompts : quickPromptsEn;
  const ask = async (text: string) => {
    if (!text.trim()) return;
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
      <AmbientBackground />
      <main className="page-shell">
        <p className="text-xs uppercase tracking-[.45em] text-mint">{messages.pages.ai.eyebrow}</p>
        <h1 className="mt-3 text-5xl font-black text-moon">{messages.pages.ai.title}</h1>
        <section className="mt-8 grid gap-5 lg:grid-cols-[330px_1fr]">
          <aside className="glass rounded-[30px] p-5">
            <div className="grid gap-2">{prompts.map((prompt) => <button key={prompt} onClick={() => ask(prompt)} className="rounded-2xl border border-mint/10 bg-white/[.04] p-3 text-left text-sm text-silver transition hover:border-mint/35 hover:text-moon">{prompt}</button>)}</div>
          </aside>
          <div className="glass flex min-h-[620px] flex-col rounded-[30px] p-5">
            <div className="flex-1 space-y-4 overflow-auto pr-1">
              {messagesList.map((msg) => <div key={msg.id} className={`max-w-[86%] rounded-3xl p-4 ${msg.role === "user" ? "ml-auto bg-mint text-ink-950" : "bg-white/[.06] text-moon"}`}><p className="whitespace-pre-line text-sm leading-6">{msg.content}</p><button onClick={() => navigator.clipboard.writeText(msg.content).then(() => toast(messages.actions.copied))} className="mt-2 text-xs opacity-70"><Copy size={13} className="mr-1 inline" />{messages.actions.copy}</button></div>)}
              {loading && <div className="w-fit rounded-3xl bg-white/[.06] p-4 text-mint">{messages.pages.ai.typing}</div>}
            </div>
            <div className="mt-4 flex gap-2">
              <Button variant="soft" className="h-12 w-12 px-0" onClick={() => setMessagesList([])}><Trash2 size={16} /></Button>
              <Button variant="soft" className="h-12 w-12 px-0" onClick={() => ask(messagesList.at(-2)?.content || messages.pages.ai.fallback)}><RefreshCw size={16} /></Button>
              <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") ask(input); }} className="flex-1 rounded-full border border-mint/15 bg-white/10 px-5 text-moon outline-none focus:border-mint" placeholder={messages.pages.ai.placeholder} />
              <Button className="h-12 w-12 px-0" onClick={() => ask(input)} disabled={loading}><Send size={16} /></Button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
