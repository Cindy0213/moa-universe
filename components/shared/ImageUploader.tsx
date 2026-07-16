"use client";

import { ImagePlus } from "lucide-react";
import { useRef } from "react";
import { webImages } from "@/data/images";

async function fileToPreview(file: File) {
  const objectUrl = URL.createObjectURL(file);
  try {
    const image = await new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = objectUrl;
    });
    const maxSize = 1400;
    const ratio = Math.min(1, maxSize / Math.max(image.width, image.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(image.width * ratio));
    canvas.height = Math.max(1, Math.round(image.height * ratio));
    const context = canvas.getContext("2d");
    if (!context) throw new Error("Canvas is not available");
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL("image/jpeg", 0.86);
  } catch {
    return await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}

export function ImageUploader({ value, onChange, label }: { value?: string; onChange: (value: string) => void; label: string }) {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <div className="space-y-2">
      <label className="text-xs uppercase tracking-[.22em] text-silver">{label}</label>
      <button type="button" onClick={() => ref.current?.click()} className="group flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-2xl border border-dashed border-mint/35 bg-white/[.04] text-moon transition hover:border-mint">
        {value ? <img src={value} alt={label} className="h-full w-full object-cover" onError={(event) => { event.currentTarget.src = webImages.group; }} /> : <span className="flex items-center gap-2 text-sm"><ImagePlus size={18} /> {label}</span>}
      </button>
      <input
        ref={ref}
        type="file"
        accept="image/*"
        className="sr-only"
        onChange={async (event) => {
          const file = event.target.files?.[0];
          if (!file) return;
          event.currentTarget.value = "";
          const preview = await fileToPreview(file);
          onChange(preview);
        }}
      />
    </div>
  );
}
