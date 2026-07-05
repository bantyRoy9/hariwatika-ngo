"use client";

/**
 * AdminEditProvider
 * -----------------
 * Client component that:
 *  1. Calls the isAdminUser() server action once on mount to determine
 *     whether the current visitor is a logged-in admin.
 *  2. Mounts AdminEditContextProvider with the result.
 *  3. Renders InlineEditPopover (portal) so it is always in the tree.
 *  4. When the user IS an admin it also renders a small floating toolbar
 *     at the bottom-right of the screen that:
 *       • Shows "Admin Edit Mode" badge so the admin knows editing is active
 *       • Links to /admin for quick access to the full CMS
 *
 * Usage (server component wrapping the page):
 *   <AdminEditProvider initialValues={settingsMap}>
 *     {children}
 *   </AdminEditProvider>
 */

import { useEffect, useState } from "react";
import Link from "next/link";
import { Settings } from "lucide-react";
import { isAdminUser } from "@/app/actions/auth";
import { AdminEditContextProvider } from "@/context/AdminEditContext";
import InlineEditPopover from "@/components/InlineEditPopover";
import { LENITY, SERIF } from "@/theme/lenity";

type Props = {
  children: React.ReactNode;
  /** Pre-fetched SiteSettings map — passed through to liveValues initial state */
  initialValues?: Record<string, { en: string; hi: string }>;
};

export default function AdminEditProvider({ children, initialValues = {} }: Props) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    isAdminUser()
      .then((v) => setIsAdmin(v))
      .finally(() => setChecked(true));
  }, []);

  // Render children immediately (no flash) — isAdmin defaults to false so
  // non-admins never see edit UI even for the brief moment before the check.
  return (
    <AdminEditContextProvider isAdmin={isAdmin} initialValues={initialValues}>
      {children}

      {/* Global popover — rendered once here, displayed via context state */}
      {checked && <InlineEditPopover />}

      {/* Admin floating toolbar — only visible after confirmation */}
      {checked && isAdmin && <AdminToolbar />}
    </AdminEditContextProvider>
  );
}

function AdminToolbar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      style={{
        position: "fixed",
        bottom: 24,
        left: 24,
        zIndex: 99990,
        display: "flex",
        alignItems: "center",
        gap: 10,
        background: LENITY.ink,
        border: `2px solid ${LENITY.yellow}`,
        borderRadius: 50,
        padding: collapsed ? "8px 12px" : "8px 18px",
        boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
        cursor: "pointer",
        userSelect: "none",
        transition: "padding 0.2s",
      }}
      onClick={() => setCollapsed((c) => !c)}
      title={collapsed ? "Expand admin toolbar" : "Collapse admin toolbar"}
    >
      {/* Yellow dot pulse */}
      <span
        style={{
          width: 10,
          height: 10,
          borderRadius: "50%",
          background: LENITY.yellow,
          flexShrink: 0,
          animation: "hw-pulse 2s ease-in-out infinite",
        }}
      />

      {!collapsed && (
        <>
          <span
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: LENITY.yellow,
              fontFamily: SERIF,
              whiteSpace: "nowrap",
            }}
          >
            Admin Edit Mode
          </span>
          <span
            style={{
              width: 1,
              height: 16,
              background: "rgba(255,255,255,0.2)",
              flexShrink: 0,
            }}
          />
          <Link
            href="/admin"
            onClick={(e) => e.stopPropagation()}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 5,
              fontSize: 12,
              fontWeight: 600,
              color: "rgba(255,255,255,0.75)",
              textDecoration: "none",
            }}
          >
            <Settings size={13} />
            Dashboard
          </Link>
        </>
      )}

      <style>{`
        @keyframes hw-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  );
}
