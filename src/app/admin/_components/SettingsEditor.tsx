"use client";

import { useState } from "react";
import { LENITY } from "@/theme/lenity";
import { saveSettings, saveTranslations } from "@/app/actions/content";
import { BilingualField, Label, SaveBar } from "./ui";
import ImageField from "./ImageField";

export type SettingRow = { key: string; en: string; hi: string; img?: string | null; group?: string };

/**
 * Editor for keyed bilingual rows — works for SiteSetting (kind="setting", may have img)
 * and Translation (kind="translation", no img). Rows are grouped by their `group` field.
 */
export default function SettingsEditor({
  rows,
  kind,
  media = [],
  labelFor,
}: {
  rows: SettingRow[];
  kind: "setting" | "translation";
  media?: { id: number; url: string; alt: string }[];
  labelFor?: (key: string) => string;
}) {
  const [data, setData] = useState<SettingRow[]>(rows);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  const set = (key: string, patch: Partial<SettingRow>) =>
    setData((d) => d.map((r) => (r.key === key ? { ...r, ...patch } : r)));

  const save = async () => {
    setSaving(true);
    setSaved(false);
    setError("");
    try {
      if (kind === "setting") {
        await saveSettings(data.map((r) => ({ key: r.key, en: r.en, hi: r.hi, img: r.img ?? null })));
      } else {
        await saveTranslations(data.map((r) => ({ key: r.key, en: r.en, hi: r.hi })));
      }
      setSaved(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  // group rows
  const groups = new Map<string, SettingRow[]>();
  for (const r of data) {
    const g = r.group ?? "general";
    if (!groups.has(g)) groups.set(g, []);
    groups.get(g)!.push(r);
  }

  const niceLabel = (key: string) =>
    labelFor ? labelFor(key) : key.split(".").slice(-2).join(" · ");

  const isImageKey = (r: SettingRow) => kind === "setting" && (r.img != null || r.key.toLowerCase().includes("img") || r.key.toLowerCase().includes("image") || r.key.startsWith("IMG"));

  return (
    <div>
      {[...groups.entries()].map(([group, gRows]) => (
        <div key={group} className="mb-8">
          <h2 className="text-sm font-bold uppercase tracking-wide mb-3" style={{ color: LENITY.muted }}>{group}</h2>
          <div className="flex flex-col gap-4">
            {gRows.map((r) =>
              isImageKey(r) ? (
                <div key={r.key}>
                  <Label>{niceLabel(r.key)}</Label>
                  <ImageField value={r.img ?? r.en ?? ""} media={media} onChange={(url) => set(r.key, { img: url, en: url })} />
                </div>
              ) : (
                <BilingualField
                  key={r.key}
                  label={niceLabel(r.key)}
                  en={r.en}
                  hi={r.hi}
                  onEn={(v) => set(r.key, { en: v })}
                  onHi={(v) => set(r.key, { hi: v })}
                  textarea={r.en.length > 60 || r.key.includes("desc") || r.key.includes("sub") || r.key.includes("bio") || r.key.includes("message")}
                />
              ),
            )}
          </div>
        </div>
      ))}
      <SaveBar saving={saving} saved={saved} onSave={save} error={error} />
    </div>
  );
}
