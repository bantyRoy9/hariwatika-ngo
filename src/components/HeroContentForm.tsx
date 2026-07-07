"use client";

import { useState } from "react";
import FormModal from "./FormModal";
import { LENITY } from "@/theme/lenity";

interface HeroContentData {
  tagEn: string;
  tagHi: string;
  titleEn: string;
  titleHi: string;
  subtitleEn: string;
  subtitleHi: string;
  image: string;
}

interface HeroContentFormProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: HeroContentData;
  page: string;
}

/**
 * Form for editing hero section content (title, subtitle, tag, image)
 * Updates SiteSetting table with header.{page}.* keys
 */
export function HeroContentForm({
  isOpen,
  onClose,
  initialData,
  page,
}: HeroContentFormProps) {
  const [formData, setFormData] = useState<HeroContentData>(
    initialData || {
      tagEn: "",
      tagHi: "",
      titleEn: "",
      titleHi: "",
      subtitleEn: "",
      subtitleHi: "",
      image: "",
    }
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/hero-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ page, ...formData }),
      });

      const result = await response.json();

      if (result.success) {
        onClose();
        window.location.reload();
      } else {
        setError(result.error || "Failed to save");
      }
    } catch (err: any) {
      setError(err.message || "Failed to save");
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormModal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Hero Section Content"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: LENITY.ink }}>
              Tag/Eyebrow (English) *
            </label>
            <input
              type="text"
              required
              value={formData.tagEn}
              onChange={(e) => setFormData({ ...formData, tagEn: e.target.value })}
              placeholder="e.g., Who We Are"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
              style={{ borderColor: LENITY.line, color: LENITY.ink }}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: LENITY.ink }}>
              Tag/Eyebrow (Hindi) *
            </label>
            <input
              type="text"
              required
              value={formData.tagHi}
              onChange={(e) => setFormData({ ...formData, tagHi: e.target.value })}
              placeholder="e.g., हम कौन हैं"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
              style={{ borderColor: LENITY.line, color: LENITY.ink }}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: LENITY.ink }}>
              Title (English) *
            </label>
            <input
              type="text"
              required
              value={formData.titleEn}
              onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
              placeholder="e.g., About Us"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
              style={{ borderColor: LENITY.line, color: LENITY.ink }}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: LENITY.ink }}>
              Title (Hindi) *
            </label>
            <input
              type="text"
              required
              value={formData.titleHi}
              onChange={(e) => setFormData({ ...formData, titleHi: e.target.value })}
              placeholder="e.g., हमारे बारे में"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
              style={{ borderColor: LENITY.line, color: LENITY.ink }}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: LENITY.ink }}>
              Subtitle (English) *
            </label>
            <textarea
              required
              value={formData.subtitleEn}
              onChange={(e) => setFormData({ ...formData, subtitleEn: e.target.value })}
              placeholder="Brief description in English"
              rows={2}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 resize-none"
              style={{ borderColor: LENITY.line, color: LENITY.ink }}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: LENITY.ink }}>
              Subtitle (Hindi) *
            </label>
            <textarea
              required
              value={formData.subtitleHi}
              onChange={(e) => setFormData({ ...formData, subtitleHi: e.target.value })}
              placeholder="हिंदी में संक्षिप्त विवरण"
              rows={2}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 resize-none"
              style={{ borderColor: LENITY.line, color: LENITY.ink }}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: LENITY.ink }}>
            Background Image URL
          </label>
          <input
            type="url"
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            placeholder="https://images.unsplash.com/photo-..."
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
            style={{ borderColor: LENITY.line, color: LENITY.ink }}
          />
          <p className="text-xs mt-1" style={{ color: LENITY.muted }}>
            Leave empty to use default image
          </p>
        </div>

        {error && (
          <div className="text-sm font-medium" style={{ color: "#ef4444" }}>
            {error}
          </div>
        )}

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 py-3 px-4 rounded-lg font-semibold text-sm transition-all hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
            style={{ background: LENITY.yellow, color: LENITY.ink }}
          >
            {loading ? "Saving..." : "Update Hero Content"}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-3 rounded-lg font-semibold text-sm border-2 transition-all hover:scale-105"
            style={{ borderColor: LENITY.line, color: LENITY.muted }}
          >
            Cancel
          </button>
        </div>
      </form>
    </FormModal>
  );
}
