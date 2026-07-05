"use client";

/**
 * EditableImage
 * -------------
 * Drop-in wrapper for any <img> that an admin should be able to swap + crop.
 *
 * When isAdmin is true:
 *   • A pencil button appears at top-right on hover.
 *   • Clicking opens a modal with:
 *       – Paste URL tab: type/paste any image URL
 *       – Upload tab: pick a local file (previewed as a data-URL)
 *       – Live preview showing the image inside the same dimensions as the
 *         real slot, with X / Y position sliders (maps to CSS object-position)
 *   • "Save" writes the URL (and position) to SiteSetting via saveSettings.
 *     Position is stored as a second key: `<settingKey>.pos` → "50% 30%".
 *
 * Props:
 *   settingKey  – SiteSetting key for the image URL, e.g. "home.portrait1"
 *   src         – current image URL (DB value or fallback)
 *   alt         – alt text
 *   className   – forwarded to the <img>
 *   style       – forwarded to the <img>
 *   aspectRatio – preview aspect ratio string, e.g. "3/4" (default "16/9")
 */

import { useRef, useState, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import { Pencil, X, Check, Upload, Link2, ZoomIn } from "lucide-react";
import { saveSettings } from "@/app/actions/content";
import { useAdminEdit } from "@/context/AdminEditContext";
import { LENITY, SERIF } from "@/theme/lenity";

type Props = {
  settingKey: string;
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  /** e.g. "3/4" | "16/9" | "1/1" — used only in the editor preview */
  aspectRatio?: string;
};

export default function EditableImage({
  settingKey,
  src,
  alt,
  className,
  style,
  aspectRatio = "16/9",
}: Props) {
  const { isAdmin, liveValues } = useAdminEdit();
  const [hovered, setHovered] = useState(false);
  const [open, setOpen] = useState(false);

  // Live URL — after a save, commitEdit stores URL in en field of liveValues
  const liveEntry = liveValues[settingKey];
  const liveUrl = liveEntry?.en || src;

  if (!isAdmin) {
    return (
      <img src={liveUrl} alt={alt} className={className} style={style} loading="lazy" />
    );
  }

  return (
    <>
      <div
        style={{ position: "relative", display: "inline-block", width: "100%", height: "100%" }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <img src={liveUrl} alt={alt} className={className} style={style} loading="lazy" />

        {/* Pencil button — top-right corner */}
        {hovered && (
          <button
            onClick={() => setOpen(true)}
            title="Edit image"
            style={{
              position: "absolute",
              top: 8,
              right: 8,
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: LENITY.yellow,
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 20,
              boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
              transition: "transform 0.15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.15)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <Pencil size={14} color={LENITY.ink} />
          </button>
        )}
      </div>

      {open && (
        <ImageEditorModal
          settingKey={settingKey}
          currentSrc={liveUrl}
          alt={alt}
          aspectRatio={aspectRatio}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}

/* ─── ImageEditorModal ─────────────────────────────────────── */

type ModalProps = {
  settingKey: string;
  currentSrc: string;
  alt: string;
  aspectRatio: string;
  onClose: () => void;
};

function ImageEditorModal({ settingKey, currentSrc, alt, aspectRatio, onClose }: ModalProps) {
  const { commitEdit } = useAdminEdit();
  const fileRef = useRef<HTMLInputElement>(null);

  const [tab, setTab] = useState<"url" | "upload">("url");
  const [urlInput, setUrlInput] = useState(currentSrc);
  const [previewSrc, setPreviewSrc] = useState(currentSrc);
  const [posX, setPosX] = useState(50); // percent
  const [posY, setPosY] = useState(50); // percent
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Close on Escape
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target?.result as string;
      setPreviewSrc(dataUrl);
    };
    reader.readAsDataURL(file);
  };

  const handleUrlApply = () => {
    if (urlInput.trim()) setPreviewSrc(urlInput.trim());
  };

  const handleSave = async () => {
    setSaving(true);
    setError("");
    try {
      const finalUrl = previewSrc;
      const posValue = `${posX}% ${posY}%`;
      await saveSettings([
        { key: settingKey,        en: finalUrl, hi: finalUrl, img: finalUrl },
        { key: `${settingKey}.pos`, en: posValue, hi: posValue },
      ]);
      // commitEdit expects {en,hi} — store URL in en so liveValues picks it up
      commitEdit(settingKey, finalUrl, finalUrl);
      onClose();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Save failed");
      setSaving(false);
    }
  };

  const overlay: React.CSSProperties = {
    position: "fixed", inset: 0, zIndex: 99999,
    display: "flex", alignItems: "center", justifyContent: "center",
    background: "rgba(0,0,0,0.65)", backdropFilter: "blur(3px)",
  };

  const card: React.CSSProperties = {
    background: "#111630",
    border: `1px solid ${LENITY.adminLine}`,
    borderRadius: 16,
    width: "min(680px, 95vw)",
    maxHeight: "92vh",
    overflowY: "auto",
    boxShadow: "0 24px 60px rgba(0,0,0,0.7)",
    display: "flex",
    flexDirection: "column",
  };

  const tabBtn = (t: "url" | "upload"): React.CSSProperties => ({
    flex: 1,
    padding: "8px 0",
    fontWeight: 700,
    fontSize: 13,
    border: "none",
    cursor: "pointer",
    borderBottom: tab === t ? `2px solid ${LENITY.yellow}` : "2px solid transparent",
    background: "transparent",
    color: tab === t ? LENITY.yellow : LENITY.adminMuted,
    transition: "color 0.15s",
  });

  const sliderStyle: React.CSSProperties = {
    width: "100%",
    accentColor: LENITY.yellow,
    cursor: "pointer",
  };

  const modal = (
    <div style={overlay} onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div style={card} onMouseDown={(e) => e.stopPropagation()}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "18px 22px 14px", borderBottom: `1px solid ${LENITY.adminLine}` }}>
          <span style={{ width: 30, height: 30, borderRadius: 8, background: LENITY.yellowSoft, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <ZoomIn size={15} color={LENITY.yellow} />
          </span>
          <div style={{ flex: 1 }}>
            <p style={{ margin: 0, fontSize: 15, fontWeight: 700, fontFamily: SERIF, color: LENITY.adminInk }}>Edit Image</p>
            <p style={{ margin: 0, fontSize: 11, color: LENITY.adminMuted }}>{settingKey}</p>
          </div>
          <button onClick={onClose} style={{ background: "transparent", border: "none", cursor: "pointer", color: LENITY.adminMuted, display: "flex" }}>
            <X size={18} />
          </button>
        </div>

        <div style={{ padding: "18px 22px", display: "flex", flexDirection: "column", gap: 18 }}>

          {/* Tabs */}
          <div style={{ display: "flex", borderBottom: `1px solid ${LENITY.adminLine}` }}>
            <button style={tabBtn("url")}    onClick={() => setTab("url")}>
              <Link2 size={13} style={{ marginRight: 5, verticalAlign: "middle" }} />URL
            </button>
            <button style={tabBtn("upload")} onClick={() => setTab("upload")}>
              <Upload size={13} style={{ marginRight: 5, verticalAlign: "middle" }} />Upload File
            </button>
          </div>

          {/* URL tab */}
          {tab === "url" && (
            <div style={{ display: "flex", gap: 8 }}>
              <input
                type="text"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="https://example.com/image.jpg"
                style={{ flex: 1, background: LENITY.adminBg, border: `1px solid ${LENITY.adminLine}`, borderRadius: 8, padding: "8px 12px", color: LENITY.adminInk, fontSize: 13, outline: "none" }}
                onKeyDown={(e) => { if (e.key === "Enter") handleUrlApply(); }}
              />
              <button
                onClick={handleUrlApply}
                style={{ background: LENITY.yellow, color: LENITY.ink, border: "none", borderRadius: 8, padding: "8px 16px", fontWeight: 700, fontSize: 13, cursor: "pointer" }}
              >
                Apply
              </button>
            </div>
          )}

          {/* Upload tab */}
          {tab === "upload" && (
            <div>
              <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleFileChange} />
              <button
                onClick={() => fileRef.current?.click()}
                style={{ width: "100%", border: `2px dashed ${LENITY.adminLine}`, borderRadius: 10, padding: "20px", background: "transparent", color: LENITY.adminMuted, cursor: "pointer", fontSize: 13, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}
              >
                <Upload size={24} color={LENITY.yellow} />
                <span>Click to choose a file — JPG, PNG, WebP, GIF</span>
                <span style={{ fontSize: 11 }}>File is previewed locally; the data-URL is saved to the database.</span>
              </button>
            </div>
          )}

          {/* Live preview */}
          <div>
            <p style={{ margin: "0 0 8px", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: LENITY.adminMuted }}>Preview</p>
            <div style={{ width: "100%", aspectRatio, overflow: "hidden", borderRadius: 10, border: `1px solid ${LENITY.adminLine}`, background: "#0d1229", position: "relative" }}>
              {previewSrc ? (
                <img
                  src={previewSrc}
                  alt={alt}
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: `${posX}% ${posY}%`, display: "block" }}
                />
              ) : (
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", color: LENITY.adminMuted, fontSize: 13 }}>
                  No image selected
                </div>
              )}
              {/* Crosshair overlay */}
              <div style={{ position: "absolute", inset: 0, pointerEvents: "none", display: "grid", placeItems: "center", opacity: 0.25 }}>
                <div style={{ width: 1, height: "100%", background: LENITY.yellow, position: "absolute" }} />
                <div style={{ width: "100%", height: 1, background: LENITY.yellow, position: "absolute" }} />
              </div>
            </div>
          </div>

          {/* Position sliders */}
          <div>
            <p style={{ margin: "0 0 10px", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: LENITY.adminMuted }}>
              Focal Point / Crop Position
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <label style={{ fontSize: 12, color: LENITY.adminInk }}>Horizontal (X)</label>
                  <span style={{ fontSize: 12, color: LENITY.yellow, fontWeight: 700 }}>{posX}%</span>
                </div>
                <input type="range" min={0} max={100} value={posX} onChange={(e) => setPosX(Number(e.target.value))} style={sliderStyle} />
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: LENITY.adminMuted, marginTop: 2 }}>
                  <span>← Left</span><span>Center</span><span>Right →</span>
                </div>
              </div>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <label style={{ fontSize: 12, color: LENITY.adminInk }}>Vertical (Y)</label>
                  <span style={{ fontSize: 12, color: LENITY.yellow, fontWeight: 700 }}>{posY}%</span>
                </div>
                <input type="range" min={0} max={100} value={posY} onChange={(e) => setPosY(Number(e.target.value))} style={sliderStyle} />
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: LENITY.adminMuted, marginTop: 2 }}>
                  <span>↑ Top</span><span>Center</span><span>Bottom ↓</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick presets */}
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {[["Top-Left","0","0"],["Top","50","0"],["Top-Right","100","0"],["Left","0","50"],["Center","50","50"],["Right","100","50"],["Bottom-Left","0","100"],["Bottom","50","100"],["Bottom-Right","100","100"]].map(([label, x, y]) => (
              <button
                key={label}
                onClick={() => { setPosX(Number(x)); setPosY(Number(y)); }}
                style={{ fontSize: 11, padding: "4px 10px", borderRadius: 20, border: `1px solid ${LENITY.adminLine}`, background: posX === Number(x) && posY === Number(y) ? LENITY.yellow : "transparent", color: posX === Number(x) && posY === Number(y) ? LENITY.ink : LENITY.adminInk, cursor: "pointer", fontWeight: 600 }}
              >
                {label}
              </button>
            ))}
          </div>

          {error && <p style={{ color: LENITY.red, fontSize: 13, margin: 0 }}>{error}</p>}

          {/* Actions */}
          <div style={{ display: "flex", gap: 10, paddingTop: 4 }}>
            <button
              onClick={handleSave}
              disabled={saving || !previewSrc}
              style={{ display: "flex", alignItems: "center", gap: 6, background: LENITY.yellow, color: LENITY.ink, border: "none", borderRadius: 50, padding: "10px 24px", fontWeight: 700, fontSize: 14, cursor: saving ? "not-allowed" : "pointer", opacity: saving || !previewSrc ? 0.6 : 1 }}
            >
              <Check size={15} />{saving ? "Saving…" : "Save Image"}
            </button>
            <button
              onClick={onClose}
              style={{ background: "transparent", border: `1px solid ${LENITY.adminLine}`, borderRadius: 50, padding: "10px 22px", fontWeight: 600, fontSize: 14, color: LENITY.adminInk, cursor: "pointer" }}
            >
              Cancel
            </button>
          </div>

        </div>
      </div>
    </div>
  );

  return typeof document !== "undefined" ? createPortal(modal, document.body) : null;
}
