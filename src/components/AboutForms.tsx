"use client";

import { useState } from "react";
import FormModal from "./FormModal";
import { LENITY } from "@/theme/lenity";
import {
  createTimelineItem,
  updateTimelineItem,
  createTeamMember,
  updateTeamMember,
  createLegalDoc,
  updateLegalDoc,
} from "@/app/actions/aboutContent";

// ═══════════════════════════════════════════════════════════
// TIMELINE ITEM FORM
// ═══════════════════════════════════════════════════════════

interface TimelineFormData {
  year: string;
  eventEn: string;
  eventHi: string;
}

export function TimelineForm({
  isOpen,
  onClose,
  initialData,
  itemId,
}: {
  isOpen: boolean;
  onClose: () => void;
  initialData?: TimelineFormData;
  itemId?: number;
}) {
  const [formData, setFormData] = useState<TimelineFormData>(
    initialData || { year: "", eventEn: "", eventHi: "" }
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = itemId
      ? await updateTimelineItem(itemId, formData)
      : await createTimelineItem(formData);

    setLoading(false);

    if (result.success) {
      onClose();
      // Reload page to show new data
      window.location.reload();
    } else {
      setError(result.error || "Failed to save");
    }
  };

  return (
    <FormModal
      isOpen={isOpen}
      onClose={onClose}
      title={itemId ? "Edit Timeline Event" : "Add Timeline Event"}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: LENITY.ink }}>
            Year *
          </label>
          <input
            type="text"
            required
            value={formData.year}
            onChange={(e) => setFormData({ ...formData, year: e.target.value })}
            placeholder="e.g., 2020"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
            style={{ borderColor: LENITY.line, color: LENITY.ink }}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: LENITY.ink }}>
            Event (English) *
          </label>
          <textarea
            required
            value={formData.eventEn}
            onChange={(e) => setFormData({ ...formData, eventEn: e.target.value })}
            placeholder="Describe the event in English"
            rows={2}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 resize-none"
            style={{ borderColor: LENITY.line, color: LENITY.ink }}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: LENITY.ink }}>
            Event (Hindi) *
          </label>
          <textarea
            required
            value={formData.eventHi}
            onChange={(e) => setFormData({ ...formData, eventHi: e.target.value })}
            placeholder="घटना का हिंदी में वर्णन करें"
            rows={2}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 resize-none"
            style={{ borderColor: LENITY.line, color: LENITY.ink }}
          />
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
            {loading ? "Saving..." : itemId ? "Update Event" : "Add Event"}
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

// ═══════════════════════════════════════════════════════════
// TEAM MEMBER FORM
// ═══════════════════════════════════════════════════════════

interface TeamMemberFormData {
  name: string;
  designation: string;
  phone: string;
}

export function TeamMemberForm({
  isOpen,
  onClose,
  initialData,
  itemId,
}: {
  isOpen: boolean;
  onClose: () => void;
  initialData?: TeamMemberFormData;
  itemId?: number;
}) {
  const [formData, setFormData] = useState<TeamMemberFormData>(
    initialData || { name: "", designation: "", phone: "" }
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = itemId
      ? await updateTeamMember(itemId, formData)
      : await createTeamMember(formData);

    setLoading(false);

    if (result.success) {
      onClose();
      window.location.reload();
    } else {
      setError(result.error || "Failed to save");
    }
  };

  return (
    <FormModal
      isOpen={isOpen}
      onClose={onClose}
      title={itemId ? "Edit Team Member" : "Add Team Member"}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: LENITY.ink }}>
            Name *
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Full name"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
            style={{ borderColor: LENITY.line, color: LENITY.ink }}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: LENITY.ink }}>
            Designation / Role *
          </label>
          <input
            type="text"
            required
            value={formData.designation}
            onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
            placeholder="e.g., Director, Secretary, Member"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
            style={{ borderColor: LENITY.line, color: LENITY.ink }}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: LENITY.ink }}>
            Phone (Optional)
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="10-digit mobile number"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
            style={{ borderColor: LENITY.line, color: LENITY.ink }}
          />
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
            {loading ? "Saving..." : itemId ? "Update Member" : "Add Member"}
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

// ═══════════════════════════════════════════════════════════
// LEGAL DOCUMENT FORM
// ═══════════════════════════════════════════════════════════

interface LegalDocFormData {
  iconName: string;
  titleEn: string;
  titleHi: string;
  number: string;
  descEn: string;
  descHi: string;
}

export function LegalDocForm({
  isOpen,
  onClose,
  initialData,
  itemId,
}: {
  isOpen: boolean;
  onClose: () => void;
  initialData?: LegalDocFormData;
  itemId?: number;
}) {
  const [formData, setFormData] = useState<LegalDocFormData>(
    initialData || { iconName: "FileText", titleEn: "", titleHi: "", number: "", descEn: "", descHi: "" }
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = itemId
      ? await updateLegalDoc(itemId, formData)
      : await createLegalDoc(formData);

    setLoading(false);

    if (result.success) {
      onClose();
      window.location.reload();
    } else {
      setError(result.error || "Failed to save");
    }
  };

  return (
    <FormModal
      isOpen={isOpen}
      onClose={onClose}
      title={itemId ? "Edit Legal Document" : "Add Legal Document"}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: LENITY.ink }}>
            Icon
          </label>
          <select
            value={formData.iconName}
            onChange={(e) => setFormData({ ...formData, iconName: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
            style={{ borderColor: LENITY.line, color: LENITY.ink }}
          >
            <option value="FileText">Document (FileText)</option>
            <option value="ShieldCheck">Shield Check (ShieldCheck)</option>
            <option value="Award">Award (Award)</option>
          </select>
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
              placeholder="e.g., Trust Registration"
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
              placeholder="e.g., ट्रस्ट पंजीकरण"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
              style={{ borderColor: LENITY.line, color: LENITY.ink }}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: LENITY.ink }}>
            Document Number *
          </label>
          <input
            type="text"
            required
            value={formData.number}
            onChange={(e) => setFormData({ ...formData, number: e.target.value })}
            placeholder="e.g., Reg. No. XXXXX/2000"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
            style={{ borderColor: LENITY.line, color: LENITY.ink }}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: LENITY.ink }}>
            Description (English) *
          </label>
          <textarea
            required
            value={formData.descEn}
            onChange={(e) => setFormData({ ...formData, descEn: e.target.value })}
            placeholder="Brief description in English"
            rows={2}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 resize-none"
            style={{ borderColor: LENITY.line, color: LENITY.ink }}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: LENITY.ink }}>
            Description (Hindi) *
          </label>
          <textarea
            required
            value={formData.descHi}
            onChange={(e) => setFormData({ ...formData, descHi: e.target.value })}
            placeholder="हिंदी में संक्षिप्त विवरण"
            rows={2}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 resize-none"
            style={{ borderColor: LENITY.line, color: LENITY.ink }}
          />
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
            {loading ? "Saving..." : itemId ? "Update Document" : "Add Document"}
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

// ═══════════════════════════════════════════════════════════
// JOURNEY CARD FORM (25 Years Story Section)
// ═══════════════════════════════════════════════════════════

interface JourneyCardFormData {
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

export function JourneyCardForm({
  isOpen,
  onClose,
  initialData,
  itemId,
}: {
  isOpen: boolean;
  onClose: () => void;
  initialData?: JourneyCardFormData;
  itemId?: number;
}) {
  const [formData, setFormData] = useState<JourneyCardFormData>(
    initialData || { number: "", titleEn: "", titleHi: "", descEn: "", descHi: "", image: "", stat: "", statLabelEn: "", statLabelHi: "" }
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Import dynamically to avoid circular dependencies
    const { createJourneyCard, updateJourneyCard } = await import("@/app/actions/aboutContent");

    const result = itemId
      ? await updateJourneyCard(itemId, formData)
      : await createJourneyCard(formData);

    setLoading(false);

    if (result.success) {
      onClose();
      window.location.reload();
    } else {
      setError(result.error || "Failed to save");
    }
  };

  return (
    <FormModal
      isOpen={isOpen}
      onClose={onClose}
      title={itemId ? "Edit Journey Card" : "Add Journey Card"}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: LENITY.ink }}>
            Number *
          </label>
          <input
            type="text"
            required
            value={formData.number}
            onChange={(e) => setFormData({ ...formData, number: e.target.value })}
            placeholder="e.g., 01, 02, 03"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
            style={{ borderColor: LENITY.line, color: LENITY.ink }}
          />
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
              placeholder="e.g., Foundation & Early Years"
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
              placeholder="e.g., स्थापना और प्रारंभिक वर्ष"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
              style={{ borderColor: LENITY.line, color: LENITY.ink }}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: LENITY.ink }}>
            Description (English) *
          </label>
          <textarea
            required
            value={formData.descEn}
            onChange={(e) => setFormData({ ...formData, descEn: e.target.value })}
            placeholder="Describe the milestone in English"
            rows={3}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 resize-none"
            style={{ borderColor: LENITY.line, color: LENITY.ink }}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: LENITY.ink }}>
            Description (Hindi) *
          </label>
          <textarea
            required
            value={formData.descHi}
            onChange={(e) => setFormData({ ...formData, descHi: e.target.value })}
            placeholder="हिंदी में मील के पत्थर का वर्णन करें"
            rows={3}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 resize-none"
            style={{ borderColor: LENITY.line, color: LENITY.ink }}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: LENITY.ink }}>
            Image URL *
          </label>
          <input
            type="url"
            required
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            placeholder="https://images.unsplash.com/photo-..."
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
            style={{ borderColor: LENITY.line, color: LENITY.ink }}
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: LENITY.ink }}>
              Stat *
            </label>
            <input
              type="text"
              required
              value={formData.stat}
              onChange={(e) => setFormData({ ...formData, stat: e.target.value })}
              placeholder="e.g., 2000, 5K+"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
              style={{ borderColor: LENITY.line, color: LENITY.ink }}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: LENITY.ink }}>
              Stat Label (EN) *
            </label>
            <input
              type="text"
              required
              value={formData.statLabelEn}
              onChange={(e) => setFormData({ ...formData, statLabelEn: e.target.value })}
              placeholder="e.g., Year Founded"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
              style={{ borderColor: LENITY.line, color: LENITY.ink }}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: LENITY.ink }}>
              Stat Label (HI) *
            </label>
            <input
              type="text"
              required
              value={formData.statLabelHi}
              onChange={(e) => setFormData({ ...formData, statLabelHi: e.target.value })}
              placeholder="e.g., स्थापना वर्ष"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
              style={{ borderColor: LENITY.line, color: LENITY.ink }}
            />
          </div>
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
            {loading ? "Saving..." : itemId ? "Update Card" : "Add Card"}
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

// ═══════════════════════════════════════════════════════════
// HERO STAT FORM
// ═══════════════════════════════════════════════════════════

interface HeroStatFormData {
  value: string;
  labelEn: string;
  labelHi: string;
}

export function HeroStatForm({
  isOpen,
  onClose,
  initialData,
  itemId,
}: {
  isOpen: boolean;
  onClose: () => void;
  initialData?: HeroStatFormData;
  itemId?: number;
}) {
  const [formData, setFormData] = useState<HeroStatFormData>(
    initialData || { value: "", labelEn: "", labelHi: "" }
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Import dynamically to avoid circular dependencies
    const { createHeroStat, updateHeroStat } = await import("@/app/actions/aboutContent");

    const result = itemId
      ? await updateHeroStat(itemId, { ...formData, page: "about" })
      : await createHeroStat({ ...formData, page: "about" });

    setLoading(false);

    if (result.success) {
      onClose();
      window.location.reload();
    } else {
      setError(result.error || "Failed to save");
    }
  };

  return (
    <FormModal
      isOpen={isOpen}
      onClose={onClose}
      title={itemId ? "Edit Hero Stat" : "Add Hero Stat"}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: LENITY.ink }}>
            Value *
          </label>
          <input
            type="text"
            required
            value={formData.value}
            onChange={(e) => setFormData({ ...formData, value: e.target.value })}
            placeholder="e.g., 25+, 5000+, 100+"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
            style={{ borderColor: LENITY.line, color: LENITY.ink }}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: LENITY.ink }}>
              Label (English) *
            </label>
            <input
              type="text"
              required
              value={formData.labelEn}
              onChange={(e) => setFormData({ ...formData, labelEn: e.target.value })}
              placeholder="e.g., Years of Service"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
              style={{ borderColor: LENITY.line, color: LENITY.ink }}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: LENITY.ink }}>
              Label (Hindi) *
            </label>
            <input
              type="text"
              required
              value={formData.labelHi}
              onChange={(e) => setFormData({ ...formData, labelHi: e.target.value })}
              placeholder="e.g., वर्षों की सेवा"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
              style={{ borderColor: LENITY.line, color: LENITY.ink }}
            />
          </div>
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
            {loading ? "Saving..." : itemId ? "Update Stat" : "Add Stat"}
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
