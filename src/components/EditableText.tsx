"use client";

/**
 * EditableText
 * ------------
 * Drop-in replacement for any inline text node that should be editable by an
 * admin. When isAdmin is true it shows a dashed-yellow outline on hover and
 * opens InlineEditPopover on double-click.
 * When isAdmin is false it renders as a plain element (zero overhead).
 */

import React, { useCallback, useState } from "react";
import { Pencil } from "lucide-react";
import { useAdminEdit } from "@/context/AdminEditContext";
import { useLang } from "@/context/LanguageContext";
import { LENITY } from "@/theme/lenity";

type Props = {
  settingKey: string;
  en: string;
  hi: string;
  label?: string;
  multiline?: boolean;
  /** Rendered HTML tag — defaults to "span" */
  as?: string;
  className?: string;
  style?: React.CSSProperties;
};

export default function EditableText({
  settingKey,
  en,
  hi,
  label,
  multiline,
  as: tagName = "span",
  className,
  style,
}: Props) {
  const { isAdmin, startEdit, liveValues } = useAdminEdit();
  const { lang } = useLang();
  const [hovered, setHovered] = useState(false);

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
        multiline: multiline ?? displayEn.length > 80,
      });
    },
    [isAdmin, startEdit, settingKey, displayEn, displayHi, label, multiline],
  );

  if (!isAdmin) {
    return React.createElement(tagName, { className, style }, display);
  }

  return React.createElement(
    tagName,
    {
      className,
      style: {
        ...style,
        position: "relative",
        cursor: "pointer",
        outline: hovered ? `2px dashed ${LENITY.yellow}` : "2px dashed transparent",
        outlineOffset: 3,
        borderRadius: 4,
        transition: "outline-color 0.15s",
      },
      onMouseEnter: () => setHovered(true),
      onMouseLeave: () => setHovered(false),
      onDoubleClick: handleDoubleClick,
      title: "Double-click to edit",
    },
    display,
    hovered &&
      React.createElement(
        "span",
        {
          key: "pencil",
          style: {
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
          },
        },
        React.createElement(Pencil, { size: 10, color: LENITY.ink }),
      ),
  );
}
