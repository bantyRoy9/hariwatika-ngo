"use client";

/**
 * InlineEditPopover — dark-mode admin overlay.
 * Renders via React portal so it is never clipped by parent overflow.
 * All colours use the admin palette (light text on dark background).
 */

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X, Check, Pencil } from "lucide-react";
import { saveSettings } from "@/app/actions/content";
import { useAdminEdit } from "@/context/AdminEditContext";
import { LENITY, SERIF } from "@/theme/lenity";

// ── Colour tokens for the dark popover ──────────────────────────────────────
const C = {
  bg:      "#111630",          // card background
  input:   "#0d1229",          // input background (slightly darker)
  border:  "rgba(255,255,255,0.10)",
  text:    "#e2e8f0",          // LENITY.adminInk — bright on dark
  muted:   "#64748b",          // LENITY.adminMuted
  label:   "#94a3b8",          // field labels
  yellow:  LENITY.yellow,
  red:     "#f87171",
};

export default function InlineEditPopover() {
  const { editing, closeEdit, commitEdit } = useAdminEdit();

  const [en, setEn]       = useState("");
  const [hi, setHi]       = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError]   = useState("");

  const firstRef = useRef<HTMLTextAreaElement | HTMLInputElement | null>(null);

  useEffect(() => {
    if (!editing) return;
    setEn(editing.en);
    setHi(editing.hi);
    setError("");
    setSaving(false);
    setTimeout(() => firstRef.current?.focus(), 50);
  }, [editing]);

  useEffect(() => {
    if (!editing) return;
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") closeEdit(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [editing, closeEdit]);

  if (!editing) return null;

  const multiline = editing.multiline ?? (en.length > 80 || hi.length > 80);
  const label = editing.label ?? editing.settingKey.split(".").slice(-2).join(" › ");

  const handleSave = async () => {
    setSaving(true);
    setError("");
    try {
      await saveSettings([{ key: editing.settingKey, en, hi }]);
      commitEdit(editing.settingKey, en, hi);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Save failed");
      setSaving(false);
    }
  };

  // Shared input / textarea style — light text on dark bg
  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: C.input,
    border: `1px solid ${C.border}`,
    borderRadius: 8,
    padding: "10px 14px",
    fontSize: 14,
    color: C.text,           // ← bright text, visible on dark bg
    outline: "none",
    fontFamily: "inherit",
    lineHeight: 1.6,
    resize: multiline ? "vertical" : undefined,
    boxSizing: "border-box",
    // override browser autofill dark-text hack
    WebkitTextFillColor: C.text,
  };

  const fieldLabel: React.CSSProperties = {
    display: "block",
    fontSize: 11,
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.12em",
    color: C.label,
    marginBottom: 6,
  };

  const content = (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 99999,
        display: "flex", alignItems: "center", justifyContent: "center",
        background: "rgba(0,0,0,0.6)", backdropFilter: "blur(3px)",
      }}
      onMouseDown={(e) => { if (e.target === e.currentTarget) closeEdit(); }}
    >
      <div
        style={{
          background: C.bg,
          border: `1px solid ${C.border}`,
          borderRadius: 16,
          padding: "24px 28px",
          width: "min(580px, 94vw)",
          maxHeight: "90vh",
          overflowY: "auto",
          boxShadow: "0 24px 64px rgba(0,0,0,0.7)",
        }}
        onMouseDown={(e) => e.stopPropagation()}
      >
        {/* ── Header ── */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 22 }}>
          <span style={{
            width: 34, height: 34, borderRadius: 8,
            background: `${C.yellow}22`,
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          }}>
            <Pencil size={16} color={C.yellow} />
          </span>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{
              margin: 0, fontSize: 15, fontWeight: 700,
              fontFamily: SERIF, color: C.text,
              whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
            }}>
              Edit: {label}
            </p>
            <p style={{ margin: 0, fontSize: 11, color: C.muted }}>{editing.settingKey}</p>
          </div>
          <button
            onClick={closeEdit}
            aria-label="Close"
            style={{ background: "transparent", border: "none", cursor: "pointer", padding: 4, color: C.muted, display: "flex" }}
          >
            <X size={18} />
          </button>
        </div>

        {/* ── English ── */}
        <div style={{ marginBottom: 14 }}>
          <label style={fieldLabel}>English</label>
          {multiline ? (
            <textarea
              ref={firstRef as React.RefObject<HTMLTextAreaElement>}
              value={en} onChange={(e) => setEn(e.target.value)}
              rows={4} style={inputStyle}
            />
          ) : (
            <input
              ref={firstRef as React.RefObject<HTMLInputElement>}
              type="text" value={en} onChange={(e) => setEn(e.target.value)}
              style={inputStyle}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSave(); } }}
            />
          )}
        </div>

        {/* ── Hindi ── */}
        <div style={{ marginBottom: 22 }}>
          <label style={fieldLabel}>हिन्दी</label>
          {multiline ? (
            <textarea
              value={hi} onChange={(e) => setHi(e.target.value)}
              rows={4} style={inputStyle}
            />
          ) : (
            <input
              type="text" value={hi} onChange={(e) => setHi(e.target.value)}
              style={inputStyle}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSave(); } }}
            />
          )}
        </div>

        {/* ── Error ── */}
        {error && <p style={{ color: C.red, fontSize: 13, marginBottom: 12 }}>{error}</p>}

        {/* ── Actions ── */}
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <button
            onClick={handleSave} disabled={saving}
            style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              background: C.yellow, color: "#1a1a1a",
              border: "none", borderRadius: 50, padding: "10px 24px",
              fontWeight: 700, fontSize: 14,
              cursor: saving ? "not-allowed" : "pointer",
              opacity: saving ? 0.6 : 1, transition: "opacity 0.15s",
            }}
          >
            <Check size={15} />{saving ? "Saving…" : "Save"}
          </button>
          <button
            onClick={closeEdit} disabled={saving}
            style={{
              background: "transparent",
              border: `1px solid ${C.border}`,
              borderRadius: 50, padding: "10px 22px",
              fontWeight: 600, fontSize: 14,
              color: C.text, cursor: "pointer",
            }}
          >
            Cancel
          </button>
          <span style={{ marginLeft: "auto", fontSize: 11, color: C.muted }}>Esc to close</span>
        </div>
      </div>
    </div>
  );

  return typeof document !== "undefined" ? createPortal(content, document.body) : null;
}
