"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";

export type EditTarget = {
  settingKey: string;
  en: string;
  hi: string;
  /** If true the popover renders a <textarea> instead of <input> */
  multiline?: boolean;
  /** Friendly label shown in the popover header */
  label?: string;
};

interface AdminEditContextType {
  /** Whether the current session is an admin — set by AdminEditProvider on mount */
  isAdmin: boolean;
  /** The setting currently being edited, or null when no popover is open */
  editing: EditTarget | null;
  /** Open the edit popover for a particular SiteSetting key */
  startEdit: (target: EditTarget) => void;
  /** Close without saving */
  closeEdit: () => void;
  /**
   * Called by InlineEditPopover after a successful save so that
   * EditableText nodes can re-render with the new value without a full
   * page reload.  Components subscribe by reading the `liveValues` map.
   */
  commitEdit: (key: string, en: string, hi: string) => void;
  /** Latest saved values keyed by SiteSetting key */
  liveValues: Record<string, { en: string; hi: string }>;
}

const AdminEditContext = createContext<AdminEditContextType>({
  isAdmin: false,
  editing: null,
  startEdit: () => {},
  closeEdit: () => {},
  commitEdit: () => {},
  liveValues: {},
});

export function AdminEditContextProvider({
  children,
  isAdmin,
  initialValues = {},
}: {
  children: ReactNode;
  isAdmin: boolean;
  initialValues?: Record<string, { en: string; hi: string }>;
}) {
  const [editing, setEditing] = useState<EditTarget | null>(null);
  const [liveValues, setLiveValues] = useState<
    Record<string, { en: string; hi: string }>
  >(initialValues);

  const startEdit = useCallback((target: EditTarget) => {
    setEditing(target);
  }, []);

  const closeEdit = useCallback(() => {
    setEditing(null);
  }, []);

  const commitEdit = useCallback((key: string, en: string, hi: string) => {
    setLiveValues((prev) => ({ ...prev, [key]: { en, hi } }));
    setEditing(null);
  }, []);

  return (
    <AdminEditContext.Provider
      value={{ isAdmin, editing, startEdit, closeEdit, commitEdit, liveValues }}
    >
      {children}
    </AdminEditContext.Provider>
  );
}

export function useAdminEdit() {
  return useContext(AdminEditContext);
}
