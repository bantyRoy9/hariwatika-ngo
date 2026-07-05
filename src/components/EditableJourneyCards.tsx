"use client";

import { useAdminEdit } from "@/context/AdminEditContext";
import { AddButton } from "./EditableCard";
import { Edit2, Trash2 } from "lucide-react";
import { LENITY } from "@/theme/lenity";

interface JourneyCardData {
  id: number;
  number: string;
  titleEn: string;
  titleHi: string;
  descEn: string;
  descHi: string;
  image: string;
  stat: string;
  statLabelEn: string;
  statLabelHi: string;
}

interface EditableJourneyCardsProps {
  cards: JourneyCardData[];
  onAdd: () => void;
  onEdit: (card: JourneyCardData) => void;
  onDelete: (id: number) => void;
  children: React.ReactNode;
}

/**
 * Wrapper that adds edit controls to PremiumStorySection cards
 * Preserves original design while adding admin editing capability
 */
export default function EditableJourneyCards({ 
  cards, 
  onAdd, 
  onEdit, 
  onDelete, 
  children 
}: EditableJourneyCardsProps) {
  const { isAdmin } = useAdminEdit();

  if (!isAdmin) {
    return <>{children}</>;
  }

  return (
    <div className="relative">
      {children}
      
      {/* Add button overlay - top right */}
      <div className="absolute top-20 right-4 z-30">
        <AddButton onClick={onAdd} label="Add Journey Card" />
      </div>
      
      {/* Edit/Delete overlays on each card */}
      <div className="absolute inset-0 pointer-events-none z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" style={{ paddingTop: '14rem' }}>
          {cards.map((card, idx) => (
            <div 
              key={`journey-edit-${card.id || idx}`} 
              className="relative pointer-events-auto"
              style={{ 
                height: idx < cards.length - 1 ? '600px' : '500px',
                marginBottom: idx < cards.length - 1 ? '3rem' : '0'
              }}
            >
              <div
                className="absolute top-4 right-4 flex gap-1 opacity-0 hover:opacity-100 transition-opacity"
                style={{
                  background: LENITY.ink,
                  borderRadius: 8,
                  padding: "4px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.2)"
                }}
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit(card);
                  }}
                  className="p-1.5 rounded hover:bg-opacity-80 transition-colors"
                  style={{ background: LENITY.yellow, color: LENITY.ink }}
                  title="Edit journey card"
                >
                  <Edit2 size={14} />
                </button>
                {card.id > 0 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (confirm("Are you sure you want to delete this journey card?")) {
                        onDelete(card.id);
                      }
                    }}
                    className="p-1.5 rounded hover:bg-opacity-80 transition-colors"
                    style={{ background: "#ef4444", color: "#fff" }}
                    title="Delete journey card"
                  >
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
