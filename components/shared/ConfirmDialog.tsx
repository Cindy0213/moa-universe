"use client";

import { Button } from "./Button";

export function ConfirmDialog({ open, title, onCancel, onConfirm }: { open: boolean; title: string; onCancel: () => void; onConfirm: () => void }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[90] grid place-items-center bg-black/55 p-5 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-3xl border border-mint/20 bg-ink-900 p-6 shadow-glow">
        <p className="mb-6 text-lg font-semibold text-moon">{title}</p>
        <div className="flex justify-end gap-3">
          <Button variant="soft" onClick={onCancel}>Cancel</Button>
          <Button onClick={onConfirm}>OK</Button>
        </div>
      </div>
    </div>
  );
}
