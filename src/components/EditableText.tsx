"use client";

/**
 * EditableText
 * ------------
 * Drop-in replacement for any inline text node that should be editable by an
 * admin. When isAdmin is true it:
 *   • Shows a subtle dashed-yellow outline on hover (edit hint)
 *   • Shows a small pencil badge so admins know the element is editable
 *   • Opens InlineEditPopover on double-click
 *
 * When isAdmin is false it renders as a plain <span> (zero overhead).
 *
 * Usage:
 *   <EditableText settingKey="home.hero.eyebrow" en={s.en} hi={s.hi} />
 *
 * The component reads from AdminEditContext's liveValues so it immediately
 * reflects any save without a full page reload.
 */

import { useCallback, useState } from "react";
import { Pencil } from "lucide-react";
import { useAdminEdit } from "@/context/AdminEditContext";
import { useLang } from "@/context/LanguageContext";
import { LENITY } from "@/theme/lenity";

type Props = {
  /** The SiteSetting key this text is bound to, e.g. "home.hero.eyebrow" */
  settingKey: string;
  /** English fallback (used when no liveValue exists yet) */
  en: string;
  /** Hindi fallback */
  hi: string;
  /** Human-readable label shown in the edit popover header */
  label?: string;
  /** Force multiline textarea in popover */
  multiline?: boolean;
  /** Rendered tag — defaults to span */
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  style?: React.CSSProperties;
};

export default function EditableText({
  settingKey,
  en,
  hi,
  label,
  multiline,
  as: Tag = "span",
  className,
  style,
}: Props) {
  const { isAdmin, startEdit, liveValues } = useAdminEdit();
  const { lang } = useLang();
  const [hovered, setHovered] = useState(false);

  // Prefer live (optimistically updated) values over props
  const live = liveValues[settingKey];
  const displayEn = live?.en ?? en;
  const displayHi = live?.hi ?? hi;
  const display = lang === "hi" ? displayHi : displayEn;

  const handleDoubleClick = useCallback(
    (e: React.MouseEvent) => {
      if (!isAdmin) return;
      e.preventDefault();
      e.stopPropagation();
      startEdit({
        settingKey,
        en: displayEn,
        hi: displayHi,
        label,
        multiline: multiline ?? (displayEn.length > 80),
      });
    },
    [isAdmin, startEdit, settingKey, displayEn, displayHi, label, multiline],
  );

  if (!isAdmin) {
    return (
      <Tag className={className} style={style}>
        {display}
      </Tag>
    );
  }

  return (
    <Tag
      className={className}
      style={{
        ...style,
        position: "relative",
        cursor: "pointer",
        outline: hovered
          ? `2px dashed ${LENITY.yellow}`
          : "2px dashed transparent",
        outlineOffset: 3,
        borderRadius: 4,
        transition: "outline-color 0.15s",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onDoubleClick={handleDoubleClick}
      title="Double-click to edit"
    >
      {display}
      {/* Pencil badge — only visible on hover */}
      {hovered && (
        <span
          style={{
            position: "absolute",
            top: -10,
            right: -10,
            width: 20,
            height: 20,
            borderRadius: "50%",
            background: LENITY.yellow,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
            zIndex: 10,
            flexShrink: 0,
          }}
        >
          <Pencil size={10} color={LENITY.ink} />
        </span>
      )}
    </Tag>
  );
}
