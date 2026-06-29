"use client";

import { useState } from "react";
import SubmissionTable from "../../../_components/SubmissionTable";
import { LENITY } from "@/theme/lenity";

const CONTACT_COLS = [
  { key: "name",      label: "Name" },
  { key: "email",     label: "Email" },
  { key: "mobile",    label: "Mobile" },
  { key: "subject",   label: "Subject" },
  { key: "status",    label: "Status" },
  { key: "createdAt", label: "Date" },
];

const DONATION_COLS = [
  { key: "ref",       label: "Ref" },
  { key: "name",      label: "Name" },
  { key: "mobile",    label: "Mobile" },
  { key: "amount",    label: "Amount (₹)" },
  { key: "purpose",   label: "Purpose" },
  { key: "status",    label: "Status" },
  { key: "createdAt", label: "Date" },
];

const VOLUNTEER_COLS = [
  { key: "volunteerId",  label: "ID" },
  { key: "name",         label: "Name" },
  { key: "age",          label: "Age" },
  { key: "gender",       label: "Gender" },
  { key: "mobile",       label: "Mobile" },
  { key: "availability", label: "Availability" },
  { key: "createdAt",    label: "Registered" },
];

const INTERNSHIP_COLS = [
  { key: "name",        label: "Name" },
  { key: "email",       label: "Email" },
  { key: "mobile",      label: "Mobile" },
  { key: "college",     label: "College" },
  { key: "department",  label: "Department" },
  { key: "createdAt",   label: "Date" },
];

const MARRIAGE_COLS = [
  { key: "fullName",       label: "Name" },
  { key: "contactMobile",  label: "Mobile" },
  { key: "groomName",      label: "Groom" },
  { key: "brideName",      label: "Bride" },
  { key: "marriageDate",   label: "Marriage Date" },
  { key: "createdAt",      label: "Registered" },
];

type TabKey = "contacts" | "donations" | "volunteers" | "internships" | "marriages";

const TABS: { key: TabKey; label: string; color: string }[] = [
  { key: "contacts",    label: "Contacts",    color: "#3b82f6" },
  { key: "donations",   label: "Donations",   color: "#22c55e" },
  { key: "volunteers",  label: "Volunteers",  color: "#8b5cf6" },
  { key: "internships", label: "Internships", color: "#f59e0b" },
  { key: "marriages",   label: "Marriages",   color: "#ec4899" },
];

interface Props {
  contacts:    Record<string, unknown>[];
  donations:   Record<string, unknown>[];
  volunteers:  Record<string, unknown>[];
  internships: Record<string, unknown>[];
  marriages:   Record<string, unknown>[];
}

export default function AllSubmissionsTabs({ contacts, donations, volunteers, internships, marriages }: Props) {
  const [active, setActive] = useState<TabKey>("contacts");

  const counts: Record<TabKey, number> = { contacts: contacts.length, donations: donations.length, volunteers: volunteers.length, internships: internships.length, marriages: marriages.length };

  const table = {
    contacts:    <SubmissionTable model="contactSubmission"    columns={CONTACT_COLS}    rows={contacts}    exportName="Contacts"    statusOptions={["new","replied"]} />,
    donations:   <SubmissionTable model="donationSubmission"   columns={DONATION_COLS}   rows={donations}   exportName="Donations"   statusOptions={["pending","confirmed"]} />,
    volunteers:  <SubmissionTable model="volunteerSubmission"  columns={VOLUNTEER_COLS}  rows={volunteers}  exportName="Volunteers" />,
    internships: <SubmissionTable model="internshipSubmission" columns={INTERNSHIP_COLS} rows={internships} exportName="Internships" />,
    marriages:   <SubmissionTable model="marriageRegistration" columns={MARRIAGE_COLS}   rows={marriages}   exportName="Marriages" />,
  };

  return (
    <>
      {/* Tab bar */}
      <div className="flex flex-wrap gap-1 mb-6 p-1 rounded-xl" style={{ background: LENITY.adminSoft, border: `1px solid ${LENITY.adminLine}` }}>
        {TABS.map(tab => {
          const isActive = active === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActive(tab.key)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all"
              style={{
                background: isActive ? "rgba(255,255,255,0.07)" : "transparent",
                color: isActive ? tab.color : LENITY.adminMuted,
                border: isActive ? `1px solid ${tab.color}30` : "1px solid transparent",
              }}
            >
              {tab.label}
              <span className="rounded-full px-1.5 py-0.5 text-[10px] font-bold"
                style={{ background: isActive ? `${tab.color}20` : "rgba(255,255,255,0.05)", color: isActive ? tab.color : LENITY.adminMuted }}>
                {counts[tab.key]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active table */}
      {table[active]}
    </>
  );
}
