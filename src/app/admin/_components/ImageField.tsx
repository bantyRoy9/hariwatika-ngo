"use client";

import { useState } from "react";
import { LENITY } from "@/theme/lenity";
import { Btn, TextInput } from "./ui";

type Media = { id: number; url: string; alt: string };

export default function ImageField({
  value,
  onChange,
  media,
  category = "content",
}: {
  value: string;
  onChange: (url: string) => void;
  media: Media[];
  category?: string;
}) {
  const [uploading, setUploading] = useState(false);
  const [picker, setPicker] = useState(false);
  const [error, setError] = useState("");

  const upload = async (file: File) => {
    setUploading(true);
    setError("");
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("category", category);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Upload failed");
      onChange(json.url);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {value && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={value} alt="" className="h-20 w-auto rounded-lg border object-cover" style={{ borderColor: LENITY.line }} />
      )}
      <div className="flex flex-wrap gap-2 items-center">
        <label className="rounded-full px-4 py-2 text-sm font-semibold cursor-pointer" style={{ background: LENITY.accent, color: LENITY.ink }}>
          {uploading ? "Uploading…" : "Upload new"}
          <input
            type="file"
            accept="image/*,application/pdf"
            className="hidden"
            disabled={uploading}
            onChange={(e) => e.target.files?.[0] && upload(e.target.files[0])}
          />
        </label>
        <Btn variant="ghost" type="button" onClick={() => setPicker((p) => !p)}>
          {picker ? "Hide library" : "Choose from library"}
        </Btn>
      </div>

      {/* Manual URL fallback */}
      <TextInput value={value} placeholder="or paste an image URL" onChange={(e) => onChange(e.target.value)} />

      {error && <p className="text-xs" style={{ color: LENITY.red }}>{error}</p>}

      {picker && (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-56 overflow-y-auto p-2 border rounded-lg" style={{ borderColor: LENITY.line }}>
          {media.length === 0 && <p className="text-xs col-span-full" style={{ color: LENITY.adminMuted }}>Library empty.</p>}
          {media.map((m) => (
            // eslint-disable-next-line @next/next/no-img-element
            <button key={m.id} type="button" onClick={() => { onChange(m.url); setPicker(false); }} className="block">
              <img src={m.url} alt={m.alt} className="h-16 w-full object-cover rounded border" style={{ borderColor: value === m.url ? LENITY.accent : LENITY.line }} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
