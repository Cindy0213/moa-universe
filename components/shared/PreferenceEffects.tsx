"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useApp } from "@/components/shared/AppProvider";

function playSoftClick() {
  const AudioContextClass = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AudioContextClass) return;
  const audio = new AudioContextClass();
  const oscillator = audio.createOscillator();
  const gain = audio.createGain();
  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(660, audio.currentTime);
  gain.gain.setValueAtTime(0.0001, audio.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.025, audio.currentTime + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, audio.currentTime + 0.16);
  oscillator.connect(gain);
  gain.connect(audio.destination);
  oscillator.start();
  oscillator.stop(audio.currentTime + 0.17);
  window.setTimeout(() => audio.close(), 260);
}

export function PreferenceEffects() {
  const { settings } = useApp();
  const pathname = usePathname();

  useEffect(() => {
    document.body.classList.toggle("reduce-motion", settings.reducedMotion);
    document.body.classList.toggle("privacy-mode", settings.privacyMode);
  }, [settings.reducedMotion, settings.privacyMode]);

  useEffect(() => {
    if (!settings.soundEffects) return;
    playSoftClick();
  }, [pathname, settings.soundEffects]);

  useEffect(() => {
    if (!settings.soundEffects) return;
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target?.closest("button,a,input,select,textarea")) return;
      playSoftClick();
    };
    window.addEventListener("pointerdown", onPointerDown);
    return () => window.removeEventListener("pointerdown", onPointerDown);
  }, [settings.soundEffects]);

  return null;
}
