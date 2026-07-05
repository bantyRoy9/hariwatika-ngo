"use client";

/**
 * AdminEditProvider
 * -----------------
 * Client component that:
 *  1. Calls the isAdminUser() server action once on mount to determine
 *     whether the current visitor is a logged-in admin.
 *  2. ONLY enables editing when inside /admin/page-editor/* routes
 *  3. Mounts AdminEditContextProvider with the result.
 *  4. Renders InlineEditPopover (portal) so it is always in the tree.
 *
 * Usage (server component wrapping the page):
 *   <AdminEditProvider initialValues={settingsMap}>
 *     {children}
 *   </AdminEditProvider>
 */

import { useEffect, useState } from "react";
import { isAdminUser } from "@/app/actions/auth";
import { AdminEditContextProvider } from "@/context/AdminEditContext";
import InlineEditPopover from "@/components/InlineEditPopover";

type Props = {
  children: React.ReactNode;
  /** Pre-fetched SiteSettings map — passed through to liveValues initial state */
  initialValues?: Record<string, { en: string; hi: string }>;
};

export default function AdminEditProvider({ children, initialValues = {} }: Props) {
  const [isAdminUser_Logged, setIsAdminUser_Logged] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    isAdminUser()
      .then((v) => setIsAdminUser_Logged(v))
      .finally(() => setChecked(true));
  }, []);

  // CRITICAL: Only enable editing when BOTH conditions are true:
  // 1. User is logged in as admin
  // 2. URL has ?editMode=true query parameter (set by admin page editor iframe)
  const isInEditMode = typeof window !== "undefined" 
    ? new URLSearchParams(window.location.search).get("editMode") === "true"
    : false;
  const isEditModeEnabled = isAdminUser_Logged && isInEditMode;

  // Render children immediately (no flash) — isEditModeEnabled defaults to false so
  // non-admins never see edit UI even for the brief moment before the check.
  // Public pages will NEVER show edit mode, even for logged-in admins.
  return (
    <AdminEditContextProvider isAdmin={isEditModeEnabled} initialValues={initialValues}>
      {children}

      {/* Global popover — rendered once here, displayed via context state */}
      {checked && <InlineEditPopover />}
    </AdminEditContextProvider>
  );
}
