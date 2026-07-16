import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Button({ className, variant = "primary", ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "ghost" | "soft" }) {
  return (
    <button
      className={cn(
        "inline-flex min-h-10 items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-mint/60 disabled:cursor-not-allowed disabled:opacity-50",
        variant === "primary" && "bg-mint text-ink-950 shadow-glow hover:bg-mint-light active:scale-[.98]",
        variant === "soft" && "border border-mint/20 bg-white/10 text-moon hover:bg-white/15",
        variant === "ghost" && "text-moon hover:bg-white/10",
        className,
      )}
      {...props}
    />
  );
}
