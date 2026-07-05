"use client";

import { useAdminEdit } from "@/context/AdminEditContext";
import { AddButton } from "./EditableCard";
import { Edit2, Trash2, Settings } from "lucide-react";
import { LENITY } from "@/theme/lenity";

interface HeroStatData {
  id: number;
  value: string;
  labelEn: string;
  labelHi: string;
}

interface HeroContentData {
  tagEn: string;
  tagHi: string;
  titleEn: string;
  titleHi: string;
  subtitleEn: string;
  subtitleHi: string;
  image: string;
}

interface EditableHeroStatsProps {
  stats: HeroStatData[];
  heroContent?: HeroContentData;
  onAdd: () => void;
  onEdit: (stat: HeroStatData) => void;
  onDelete: (id: number) => void;
  onEditHeroContent?: () => void;
  children: React.ReactNode;
}

/**
 * Wrapper that adds edit controls to PremiumHero stats section
 * Preserves original design while adding admin editing capability
 */
export default function EditableHeroStats({ 
  stats, 
  heroContent,
  onAdd, 
  onEdit, 
  onDelete,
  onEditHeroContent,
  children 
}: EditableHeroStatsProps) {
  const { isAdmin } = useAdminEdit();

  if (!isAdmin) {
    return <>{children}</>;
  }

  return (
    <div className="relative">
      {children}
      
      {/* Edit Hero Content button - top left */}
      {onEditHeroContent && (
        <div className="absolute top-4 left-4 z-30">
          <button
            onClick={onEditHeroContent}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-sm transition-all hover:scale-105"
            style={{
              background: LENITY.ink,
              color: LENITY.yellow,
              border: `2px solid ${LENITY.yellow}`,
            }}
          >
            <Settings size={16} />
            Edit Hero Content
          </button>
        </div>
      )}
      
      {/* Add Stats button - top right */}
      <div className="absolute top-4 right-4 z-30">
        <AddButton onClick={onAdd} label="Add Hero Stat" />
      </div>
      
      {/* Edit/Delete overlays on each stat - bottom section */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{ height: '140px' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 h-full">
            {stats.map((stat, idx) => (
              <div key={`stat-edit-${stat.id || idx}`} className="relative pointer-events-auto">
                <div
                  className="absolute top-2 right-2 flex gap-1 opacity-0 hover:opacity-100 transition-opacity"
                  style={{
                    background: LENITY.ink,
                    borderRadius: 8,
                    padding: "4px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.2)"
                  }}
                  onMouseEnter={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit(stat);
                    }}
                    className="p-1.5 rounded hover:bg-opacity-80 transition-colors"
                    style={{ background: LENITY.yellow, color: LENITY.ink }}
                    title="Edit stat"
                  >
                    <Edit2 size={14} />
                  </button>
                  {stat.id > 0 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (confirm("Are you sure you want to delete this stat?")) {
                          onDelete(stat.id);
                        }
                      }}
                      className="p-1.5 rounded hover:bg-opacity-80 transition-colors"
                      style={{ background: "#ef4444", color: "#fff" }}
                      title="Delete stat"
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
    </div>
  );
}
