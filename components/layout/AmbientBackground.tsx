"use client";

import { motion } from "framer-motion";
import { useApp } from "@/components/shared/AppProvider";

export function AmbientBackground() {
  const { settings } = useApp();
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[-1] overflow-hidden">
      <motion.div
        className="absolute left-[-10%] top-24 h-40 w-[70vw] rounded-full bg-mint/15 blur-3xl"
        animate={settings.animations ? { x: [0, 80, 0], opacity: [.45, .8, .45] } : undefined}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-[-10%] top-1/3 h-56 w-56 rounded-full bg-[#7EA6FF]/20 blur-3xl"
        animate={settings.animations ? { y: [0, -40, 0] } : undefined}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      {settings.particles && (
        <div className="absolute inset-0 opacity-50 [background-image:radial-gradient(circle,rgba(200,255,239,.8)_1px,transparent_1.5px)] [background-size:42px_42px]" />
      )}
    </div>
  );
}
