"use client";

import { useState } from "react";
import { Edit2, Trash2, Plus } from "lucide-react";
import { useAdminEdit } from "@/context/AdminEditContext";
import { LENITY } from "@/theme/lenity";

interface EditableCardProps {
  children: React.ReactNode;
  onEdit?: () => void;
  onDelete?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * EditableCard - Wrapper that shows edit/delete buttons when in admin edit mode
 * Used for timeline items, team members, legal docs, etc.
 */
export default function EditableCard({ 
  children, 
  onEdit, 
  onDelete, 
  className = "",
  style = {}
}: EditableCardProps) {
  const { isAdmin } = useAdminEdit();
  const [showActions, setShowActions] = useState(false);

  if (!isAdmin) {
    // Public view - no buttons
    return <div className={className} style={style}>{children}</div>;
  }

  return (
    <div 
      className={`relative ${className}`}
      style={style}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      {children}
      
      {/* Edit/Delete buttons - only show in edit mode */}
      {showActions && (onEdit || onDelete) && (
        <div 
          className="absolute top-2 right-2 flex gap-1 z-10"
          style={{
            background: LENITY.ink,
            borderRadius: 8,
            padding: "4px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.2)"
          }}
        >
          {onEdit && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit();
              }}
              className="p-1.5 rounded hover:bg-opacity-80 transition-colors"
              style={{ background: LENITY.yellow, color: LENITY.ink }}
              title="Edit"
            >
              <Edit2 size={14} />
            </button>
          )}
          {onDelete && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (confirm("Are you sure you want to delete this item?")) {
                  onDelete();
                }
              }}
              className="p-1.5 rounded hover:bg-opacity-80 transition-colors"
              style={{ background: "#ef4444", color: "#fff" }}
              title="Delete"
            >
              <Trash2 size={14} />
            </button>
          )}
        </div>
      )}
    </div>
  );
}

/**
 * AddButton - Shows "Add New" button when in admin edit mode
 */
export function AddButton({
  onClick,
  label = "Add New",
  className = ""
}: {
  onClick: () => void;
  label?: string;
  className?: string;
}) {
  const { isAdmin } = useAdminEdit();

  if (!isAdmin) return null;

  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-sm transition-all hover:scale-105 ${className}`}
      style={{
        background: LENITY.yellow,
        color: LENITY.ink,
        border: `2px dashed ${LENITY.ink}`,
      }}
    >
      <Plus size={16} />
      {label}
    </button>
  );
}
