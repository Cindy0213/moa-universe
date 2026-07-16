import { Sparkles } from "lucide-react";

export function EmptyState({ title }: { title: string }) {
  return (
    <div className="rounded-3xl border border-mint/15 bg-white/[.04] p-10 text-center text-silver">
      <Sparkles className="mx-auto mb-3 text-mint" />
      {title}
    </div>
  );
}
