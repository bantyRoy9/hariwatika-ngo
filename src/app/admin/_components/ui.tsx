"use client";

import { useState } from "react";
import { LENITY, SERIF } from "@/theme/lenity";
import { translateToHindi, UNREACHABLE_MESSAGE } from "@/app/actions/translate";

export function PageTitle({ title, subtitle, action }: { title: string; subtitle?: string; action?: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4 mb-6">
      <div>
        <h1 className="text-2xl font-bold" style={{ fontFamily: SERIF, color: LENITY.adminInk }}>{title}</h1>
        {subtitle && <p className="text-sm mt-1" style={{ color: LENITY.adminMuted }}>{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

export const inputClass = "w-full border rounded-lg px-3 py-2 text-sm focus:outline-none";
export const inputStyle: React.CSSProperties = { borderColor: LENITY.line, color: LENITY.adminInk, background: "#111630" };

export function Label({ children }: { children: React.ReactNode }) {
  return <label className="block text-xs font-semibold mb-1" style={{ color: LENITY.adminInk }}>{children}</label>;
}

export function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={inputClass} style={{ ...inputStyle, ...(props.style ?? {}) }} />;
}

export function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={`${inputClass} resize-y`} style={{ ...inputStyle, ...(props.style ?? {}) }} />;
}

/** Bilingual EN + HI side-by-side input pair. Auto-translates EN -> HI on blur. */
export function BilingualField({
  label,
  en,
  hi,
  onEn,
  onHi,
  textarea,
}: {
  label: string;
  en: string;
  hi: string;
  onEn: (v: string) => void;
  onHi: (v: string) => void;
  textarea?: boolean;
}) {
  const C = textarea ? TextArea : TextInput;
  const [translating, setTranslating] = useState(false);
  const [translateError, setTranslateError] = useState<string | null>(null);

  const handleEnBlur = async () => {
    if (!en.trim()) return;
    setTranslating(true);
    setTranslateError(null);
    try {
      const hiText = await translateToHindi(en);
      onHi(hiText);
    } catch (e) {
      setTranslateError(e instanceof Error ? e.message : UNREACHABLE_MESSAGE);
    } finally {
      setTranslating(false);
    }
  };

  return (
    <div>
      <Label>{label}</Label>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <C
          value={en}
          placeholder="English"
          onChange={(e: React.ChangeEvent<HTMLInputElement & HTMLTextAreaElement>) => onEn(e.target.value)}
          onBlur={handleEnBlur}
        />
        <C
          value={hi}
          placeholder="हिन्दी"
          disabled={translating}
          onChange={(e: React.ChangeEvent<HTMLInputElement & HTMLTextAreaElement>) => onHi(e.target.value)}
        />
      </div>
      {translating && (
        <p className="text-xs mt-1" style={{ color: LENITY.adminMuted }}>Translating…</p>
      )}
      {translateError && (
        <p className="text-xs mt-1" style={{ color: LENITY.red }}>{translateError}</p>
      )}
    </div>
  );
}

export function Btn({
  children,
  variant = "primary",
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "ghost" | "danger" }) {
  const styles: Record<string, React.CSSProperties> = {
    primary: { background: LENITY.accent, color: LENITY.ink },
    ghost: { background: "transparent", color: LENITY.adminInk, border: `1px solid ${LENITY.line}` },
    danger: { background: "transparent", color: LENITY.red, border: `1px solid ${LENITY.line}` },
  };
  return (
    <button
      {...rest}
      className={`rounded-full px-4 py-2 text-sm font-semibold transition-all hover:scale-[1.02] disabled:opacity-50 ${rest.className ?? ""}`}
      style={{ ...styles[variant], ...(rest.style ?? {}) }}
    >
      {children}
    </button>
  );
}

export function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-xl border bg-[#0d1229] p-4 ${className ?? ""}`} style={{ borderColor: LENITY.line }}>
      {children}
    </div>
  );
}

/** Sticky bottom save bar. */
export function SaveBar({ saving, saved, onSave, error }: { saving: boolean; saved: boolean; onSave: () => void; error?: string }) {
  return (
    <div
      className="sticky bottom-0 mt-6 -mx-4 px-4 py-3 border-t bg-[#0d1229] flex items-center gap-3"
      style={{ borderColor: LENITY.line }}
    >
      <Btn onClick={onSave} disabled={saving}>
        {saving ? "Saving…" : "Save changes"}
      </Btn>
      {saved && <span className="text-sm" style={{ color: "green" }}>Saved ✓</span>}
      {error && <span className="text-sm" style={{ color: LENITY.red }}>{error}</span>}
    </div>
  );
}

export function ConfirmDelete({ onConfirm, label = "Delete" }: { onConfirm: () => void; label?: string }) {
  return (
    <Btn
      variant="danger"
      onClick={() => {
        if (window.confirm("Delete this item? This cannot be undone.")) onConfirm();
      }}
    >
      {label}
    </Btn>
  );
}
