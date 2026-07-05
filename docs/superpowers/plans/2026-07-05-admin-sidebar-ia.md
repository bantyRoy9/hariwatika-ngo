# Admin Sidebar IA Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restructure the admin sidebar's groups, labels, and icons so a non-technical user can map "I want to edit page X" to a single obvious click.

**Architecture:** `Sidebar.tsx` is a client component driven entirely by one static `NAV` array of `{heading, items}`. This plan changes only that array's contents (new groups, renamed items, added icons, one group-level hint) and the JSX that renders it (icon + hint rendering). No new files, no new routes, no new Prisma queries, no href changes beyond what's listed below.

**Tech Stack:** Next.js 16 App Router, React 19 client component, lucide-react icons.

## Global Constraints

- Relabeling/regrouping only — do not build new admin screens, do not add Gallery/Contact/Donate/Programs/Registration to the "Pages" group (per spec: they have no dedicated content editor and would send the user to a page that doesn't change their content).
- All 25 icon names below have been verified to exist in the installed `lucide-react` package (checked against `node_modules/lucide-react/dist/esm/icons/`).
- Hrefs must not change except: none actually change — every renamed item keeps its existing href. Verify this in the self-review step.

---

## Task 1: Rewrite Sidebar.tsx's NAV structure with new groups, labels, icons, and a group hint

**Files:**
- Modify: `src/app/admin/_components/Sidebar.tsx` (full rewrite)

**Interfaces:**
- Consumes: nothing new — same `usePathname()`, `logoutAction` from `@/app/actions/auth`, `LENITY`/`SERIF` from `@/theme/lenity` as before.
- Produces: nothing consumed elsewhere — `Sidebar` is a leaf component rendered from `src/app/admin/(dash)/layout.tsx` with no props, unchanged.

- [ ] **Step 1: Replace the entire file**

```tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LENITY, SERIF } from "@/theme/lenity";
import { logoutAction } from "@/app/actions/auth";
import {
  Menu, X, LogOut, type LucideIcon,
  LayoutDashboard, Home, Info, FolderKanban, Newspaper, HeartHandshake,
  PieChart, GraduationCap, Image, Share2, Landmark, Type, Images,
  IndianRupee, Users, ClipboardList, Bell, Inbox, Mail, Receipt,
  UserPlus, ClipboardCheck, Heart, KeyRound, ListFilter,
} from "lucide-react";

type Item = { label: string; href: string; icon: LucideIcon };
type Group = { heading: string; hint?: string; items: Item[] };

const NAV: Group[] = [
  {
    heading: "Dashboard",
    items: [{ label: "Overview", href: "/admin", icon: LayoutDashboard }],
  },
  {
    heading: "Pages",
    hint: "Click a page to edit what's shown on it.",
    items: [
      { label: "Home Page", href: "/admin/content/home", icon: Home },
      { label: "About Us", href: "/admin/content/about", icon: Info },
      { label: "Our Projects", href: "/admin/content/projects", icon: FolderKanban },
      { label: "Blog / News", href: "/admin/content/blog", icon: Newspaper },
      { label: "Volunteer Page", href: "/admin/content/volunteer", icon: HeartHandshake },
      { label: "Transparency Reports", href: "/admin/content/transparency", icon: PieChart },
      { label: "Internship Listings", href: "/admin/content/internships", icon: GraduationCap },
    ],
  },
  {
    heading: "Site-wide",
    items: [
      { label: "Page Banners", href: "/admin/content/headers", icon: Image },
      { label: "Menu & Social Links", href: "/admin/nav", icon: Share2 },
      { label: "Contact Info & Bank Details", href: "/admin/settings", icon: Landmark },
      { label: "Text Labels", href: "/admin/content/labels", icon: Type },
      { label: "Media Library", href: "/admin/media", icon: Images },
    ],
  },
  {
    heading: "Reports",
    items: [
      { label: "Donations Report", href: "/admin/donations", icon: IndianRupee },
      { label: "Volunteers Report", href: "/admin/volunteers", icon: Users },
      { label: "Projects Board", href: "/admin/projects", icon: ClipboardList },
      { label: "Notifications", href: "/admin/notifications/volunteers", icon: Bell },
      { label: "All Submissions", href: "/admin/submissions/all", icon: Inbox },
    ],
  },
  {
    heading: "Messages & Applications",
    items: [
      { label: "Contact Messages", href: "/admin/submissions/contacts", icon: Mail },
      { label: "Donation Records", href: "/admin/submissions/donations", icon: Receipt },
      { label: "Volunteer Applications", href: "/admin/submissions/volunteers", icon: UserPlus },
      { label: "Internship Applications", href: "/admin/submissions/internships", icon: ClipboardCheck },
      { label: "Marriage Registrations", href: "/admin/submissions/marriages", icon: Heart },
    ],
  },
  {
    heading: "Settings",
    items: [
      { label: "Change Password", href: "/admin/settings/password", icon: KeyRound },
      { label: "Dropdown Choices", href: "/admin/settings/options", icon: ListFilter },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  const nav = (
    <nav className="flex flex-col gap-6 p-4">
      <div>
        <Link href="/admin" className="block text-xl font-bold" style={{ fontFamily: SERIF, color: LENITY.adminInk }}>
          Hariwatika
        </Link>
        <p className="text-[11px] uppercase tracking-wider" style={{ color: LENITY.adminMuted }}>
          CRM Admin
        </p>
      </div>

      {NAV.map((group) => (
        <div key={group.heading}>
          <p className="text-[10px] font-semibold uppercase tracking-wider mb-2" style={{ color: LENITY.adminMuted }}>
            {group.heading}
          </p>
          {group.hint && (
            <p className="text-[11px] mb-2 leading-snug" style={{ color: LENITY.adminMuted }}>
              {group.hint}
            </p>
          )}
          <div className="flex flex-col gap-0.5">
            {group.items.map((item) => {
              const active = isActive(item.href);
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors"
                  style={{
                    background: active ? LENITY.accent : "transparent",
                    color: active ? "#ffffff" : LENITY.adminInk,
                    fontWeight: active ? 700 : 400,
                  }}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      ))}

      <form action={logoutAction} className="mt-2">
        <button
          type="submit"
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium w-full"
          style={{ color: "#f87171" }}
        >
          <LogOut className="w-4 h-4" /> Logout
        </button>
      </form>
    </nav>
  );

  return (
    <>
      {/* Mobile top bar */}
      <div
        className="lg:hidden fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 h-14 border-b"
        style={{ background: LENITY.adminSoft, borderColor: LENITY.adminLine }}
      >
        <span className="font-bold" style={{ fontFamily: SERIF, color: LENITY.adminInk }}>
          Hariwatika CRM
        </span>
        <button onClick={() => setOpen(!open)} aria-label="Toggle menu" style={{ color: LENITY.adminInk }}>
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Desktop fixed sidebar */}
      <aside
        className="hidden lg:block fixed top-0 left-0 bottom-0 w-64 border-r overflow-y-auto z-30"
        style={{ background: LENITY.adminSoft, borderColor: LENITY.adminLine }}
      >
        {nav}
      </aside>

      {/* Mobile drawer */}
      {open && (
        <>
          <div className="lg:hidden fixed inset-0 bg-black/60 z-40" onClick={() => setOpen(false)} />
          <aside
            className="lg:hidden fixed top-0 left-0 bottom-0 w-72 border-r overflow-y-auto z-50"
            style={{ background: LENITY.adminSoft, borderColor: LENITY.adminLine }}
          >
            {nav}
          </aside>
        </>
      )}

      {/* Spacer so mobile content clears the top bar */}
      <div className="lg:hidden h-14" />
    </>
  );
}
```

Note: `Image` and `Type` are imported here as React components from `lucide-react` — this shadows the browser's global `Image` constructor and TypeScript's `type` keyword is unaffected since `Type` (capitalized) is just an identifier, not the `type` keyword. Neither shadowing causes a problem in this file since neither the global `Image` constructor nor the `type` keyword is used here.

- [ ] **Step 2: Type-check**

```bash
npx tsc --noEmit
```
Expected: no errors. If an icon name errors as "has no exported member," re-check the exact PascalCase spelling against `node_modules/lucide-react/dist/esm/icons/` (kebab-case filenames — e.g. `PieChart` → `pie-chart.mjs`).

- [ ] **Step 3: Verify every href is unchanged from before this edit**

```bash
git diff src/app/admin/_components/Sidebar.tsx | grep '^[+-].*href='
```
Expected: for every removed line (`-`) there is a matching added line (`+`) with the identical `href="..."` value — only `label`/`icon`/grouping should differ. If any href value differs between a `-` and its corresponding `+` line, that's a bug — fix it before proceeding (the spec requires zero behavior change beyond labels/grouping/icons).

- [ ] **Step 4: Manual verification in the browser**

1. Start the dev server if not already running: `npm run dev -- -p 3002`.
2. Log into `/admin/login` with the admin password.
3. On `/admin`, confirm the sidebar shows exactly 6 groups in this order: Dashboard, Pages, Site-wide, Reports, Messages & Applications, Settings.
4. Confirm the "Pages" group shows the hint text "Click a page to edit what's shown on it." under its heading.
5. Confirm every item has a small icon to its left.
6. Click through at least 3 renamed items (e.g. "Our Projects," "Volunteers Report," "Volunteer Applications") and confirm each lands on the same screen it did before this change (project content editor, the sortable volunteers report, the volunteer submissions list, respectively).
7. Resize to mobile width (or use browser dev tools device mode), confirm the mobile drawer still opens/closes via the top-bar toggle and closes when a link is clicked.

- [ ] **Step 5: Commit**

```bash
git add src/app/admin/_components/Sidebar.tsx
git commit -m "feat: reorganize admin sidebar into Pages/Site-wide/Reports/Messages groups

Non-technical client couldn't map \"edit page X\" to a sidebar item.
Replaces the old Dashboard/Analytics/Submissions/Site Content/Media/
Navigation & Footer/Settings grouping with a Pages-first structure,
disambiguates the duplicate \"Volunteers\" label (Volunteers Report vs
Volunteer Applications), and adds an icon per item as a scan aid."
```
