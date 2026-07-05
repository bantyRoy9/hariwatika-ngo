"use client";

/**
 * PageEditorFrame
 * ───────────────
 * Renders the public page inside an iframe so the admin can see the real
 * design with full CSS/components intact.
 *
 * How editing works end-to-end:
 *  1. The iframe loads the public page (e.g. /).
 *  2. AdminEditProvider is already in the public page tree — on load it
 *     calls isAdminUser() and, because the admin cookie is shared, returns
 *     true, making every <EditableText> show a yellow dashed outline and
 *     a pencil badge on hover.
 *  3. Admin double-clicks a text → InlineEditPopover appears (inside the
 *     iframe) → admin types → clicks Save → saveSettings server action
 *     persists to DB → commitEdit() updates liveValues optimistically.
 *  4. The iframe is reloaded via the "Refresh Preview" button to confirm
 *     the server-rendered content now matches.
 *
 * The outer shell (this component) provides:
 *  • A top toolbar: page label, breadcrumb, device switcher, refresh, open-in-tab
 *  • A sticky footer save-hint bar (the actual save happens inside the iframe)
 *  • Responsive device preview widths (desktop / tablet / mobile)
 */

import { useRef, useState, useCallback } from "react";
import Link from "next/link";
import {
  Monitor, Tablet, Smartphone, RefreshCw,
  ExternalLink, ChevronLeft, Eye,
} from "lucide-react";
import { LENITY, SERIF } from "@/theme/lenity";

type Device = "desktop" | "tablet" | "mobile";

const DEVICE_WIDTHS: Record<Device, string> = {
  desktop: "100%",
  tablet:  "768px",
  mobile:  "390px",
};

const DEVICE_HEIGHTS: Record<Device, string> = {
  desktop: "100%",
  tablet:  "1024px",
  mobile:  "844px",
};

type Props = {
  publicPath: string;
  label: string;
  slug: string;
};

export default function PageEditorFrame({ publicPath, label, slug }: Props) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [device, setDevice] = useState<Device>("desktop");
  const [loading, setLoading] = useState(true);
  const [key, setKey] = useState(0); // increment to force iframe reload

  const refresh = useCallback(() => {
    setLoading(true);
    setKey((k) => k + 1);
  }, []);

  const DeviceBtn = ({
    d,
    icon: Icon,
    title,
  }: {
    d: Device;
    icon: typeof Monitor;
    title: string;
  }) => (
    <button
      onClick={() => setDevice(d)}
      title={title}
      style={{
        background: device === d ? LENITY.yellow : "transparent",
        color: device === d ? LENITY.ink : LENITY.adminInk,
        border: "none",
        borderRadius: 8,
        padding: "6px 8px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        transition: "background 0.15s",
      }}
    >
      <Icon size={16} />
    </button>
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "calc(100vh - 64px)", // fill admin main area
        margin: "-24px -24px 0",      // bleed to edges of the admin padding
        overflow: "hidden",
      }}
    >
      {/* ── Top toolbar ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "10px 20px",
          borderBottom: `1px solid ${LENITY.adminLine}`,
          background: LENITY.adminSoft,
          flexShrink: 0,
          flexWrap: "wrap",
        }}
      >
        {/* Back */}
        <Link
          href="/admin"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            fontSize: 13,
            color: LENITY.adminMuted,
            textDecoration: "none",
          }}
        >
          <ChevronLeft size={15} />
          Dashboard
        </Link>

        <span style={{ color: LENITY.adminLine, fontSize: 18 }}>›</span>

        {/* Label */}
        <span
          style={{
            fontFamily: SERIF,
            fontWeight: 700,
            fontSize: 15,
            color: LENITY.adminInk,
          }}
        >
          {label} Page
        </span>

        {/* Spacer */}
        <span style={{ flex: 1 }} />

        {/* Device switcher */}
        <div
          style={{
            display: "flex",
            gap: 2,
            background: LENITY.adminBg,
            borderRadius: 10,
            padding: 3,
            border: `1px solid ${LENITY.adminLine}`,
          }}
        >
          <DeviceBtn d="desktop" icon={Monitor}    title="Desktop" />
          <DeviceBtn d="tablet"  icon={Tablet}     title="Tablet" />
          <DeviceBtn d="mobile"  icon={Smartphone} title="Mobile" />
        </div>

        {/* Refresh */}
        <button
          onClick={refresh}
          title="Refresh preview"
          style={{
            background: "transparent",
            border: `1px solid ${LENITY.adminLine}`,
            borderRadius: 8,
            padding: "6px 10px",
            color: LENITY.adminInk,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 5,
            fontSize: 13,
          }}
        >
          <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
          Refresh
        </button>

        {/* Open in new tab */}
        <a
          href={publicPath}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            background: "transparent",
            border: `1px solid ${LENITY.adminLine}`,
            borderRadius: 8,
            padding: "6px 10px",
            color: LENITY.adminInk,
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: 5,
            fontSize: 13,
          }}
        >
          <ExternalLink size={14} />
          Open
        </a>
      </div>

      {/* ── Edit hint banner ── */}
      <div
        style={{
          background: `linear-gradient(90deg, ${LENITY.yellow}22, ${LENITY.yellow}11)`,
          borderBottom: `1px solid ${LENITY.yellow}44`,
          padding: "8px 20px",
          display: "flex",
          alignItems: "center",
          gap: 10,
          flexShrink: 0,
        }}
      >
        <Eye size={14} color={LENITY.yellow} />
        <span style={{ fontSize: 12, color: LENITY.adminInk }}>
          <strong style={{ color: LENITY.yellow }}>Admin Edit Mode:</strong>
          {" "}Double-click any text on the page below to edit it inline. Changes save directly to the database.
        </span>
      </div>

      {/* ── iframe area ── */}
      <div
        style={{
          flex: 1,
          overflow: "auto",
          background: "#e5e7eb",
          display: "flex",
          justifyContent: "center",
          padding: device === "desktop" ? 0 : "16px",
        }}
      >
        <div
          style={{
            width: DEVICE_WIDTHS[device],
            maxWidth: "100%",
            height: device === "desktop" ? "100%" : DEVICE_HEIGHTS[device],
            background: "#fff",
            boxShadow: device !== "desktop" ? "0 4px 24px rgba(0,0,0,0.18)" : "none",
            borderRadius: device !== "desktop" ? 12 : 0,
            overflow: "hidden",
            transition: "width 0.25s, height 0.25s",
            position: "relative",
          }}
        >
          {/* Loading overlay */}
          {loading && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 10,
              }}
            >
              <div style={{ textAlign: "center" }}>
                <RefreshCw
                  size={28}
                  color={LENITY.yellow}
                  style={{ animation: "spin 1s linear infinite" }}
                />
                <p style={{ marginTop: 12, fontSize: 13, color: LENITY.adminMuted }}>
                  Loading {label} page…
                </p>
              </div>
            </div>
          )}

          <iframe
            key={key}
            ref={iframeRef}
            src={publicPath}
            title={`${label} page editor`}
            onLoad={() => setLoading(false)}
            style={{
              width: "100%",
              height: "100%",
              border: "none",
              display: "block",
            }}
          />
        </div>
      </div>

      {/* ── Sticky footer ── */}
      <div
        style={{
          borderTop: `1px solid ${LENITY.adminLine}`,
          background: LENITY.adminSoft,
          padding: "12px 20px",
          display: "flex",
          alignItems: "center",
          gap: 14,
          flexShrink: 0,
        }}
      >
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: LENITY.green,
            flexShrink: 0,
            boxShadow: `0 0 6px ${LENITY.green}`,
          }}
        />
        <span style={{ fontSize: 13, color: LENITY.adminMuted, flex: 1 }}>
          Edits save automatically when you click <strong style={{ color: LENITY.adminInk }}>Save</strong> inside the popover.
          Click <strong style={{ color: LENITY.adminInk }}>Refresh</strong> above to see the persisted result.
        </span>

        <button
          onClick={refresh}
          style={{
            background: LENITY.yellow,
            color: LENITY.ink,
            border: "none",
            borderRadius: 50,
            padding: "8px 22px",
            fontWeight: 700,
            fontSize: 13,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <RefreshCw size={13} />
          Refresh Preview
        </button>

        <a
          href={publicPath}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            background: "transparent",
            border: `1px solid ${LENITY.adminLine}`,
            color: LENITY.adminInk,
            borderRadius: 50,
            padding: "8px 20px",
            fontWeight: 600,
            fontSize: 13,
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <ExternalLink size={13} />
          View Live
        </a>
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
