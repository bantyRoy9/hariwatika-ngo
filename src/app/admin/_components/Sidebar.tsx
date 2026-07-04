"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LENITY, SERIF } from "@/theme/lenity";
import { logoutAction } from "@/app/actions/auth";
import { Menu, X, LogOut } from "lucide-react";

type Item = { label: string; href: string };
type Group = { heading: string; items: Item[] };

const NAV: Group[] = [
  { heading: "Dashboard", items: [{ label: "Overview", href: "/admin" }] },
  {
    heading: "Analytics",
    items: [
      { label: "Donations Report", href: "/admin/donations" },
      { label: "Volunteers", href: "/admin/volunteers" },
      { label: "Notifications", href: "/admin/notifications/volunteers" },
      { label: "Projects Board", href: "/admin/projects" },
      { label: "All Submissions", href: "/admin/submissions/all" },
    ],
  },
  {
    heading: "Submissions",
    items: [
      { label: "Contact Messages", href: "/admin/submissions/contacts" },
      { label: "Donations", href: "/admin/submissions/donations" },
      { label: "Volunteers", href: "/admin/submissions/volunteers" },
      { label: "Internship Applications", href: "/admin/submissions/internships" },
      { label: "Marriage Registrations", href: "/admin/submissions/marriages" },
    ],
  },
  {
    heading: "Site Content",
    items: [
      { label: "Home Page", href: "/admin/content/home" },
      { label: "Page Headers", href: "/admin/content/headers" },
      { label: "Blog Posts", href: "/admin/content/blog" },
      { label: "Projects & Plans", href: "/admin/content/projects" },
      { label: "About", href: "/admin/content/about" },
      { label: "Transparency", href: "/admin/content/transparency" },
      { label: "Internship Listings", href: "/admin/content/internships" },
      { label: "Volunteer Benefits", href: "/admin/content/volunteer" },
      { label: "Labels & Text", href: "/admin/content/labels" },
    ],
  },
  { heading: "Media", items: [{ label: "Media Library", href: "/admin/media" }] },
  { heading: "Navigation & Footer", items: [{ label: "Nav / Footer Links", href: "/admin/nav" }] },
  {
    heading: "Settings",
    items: [
      { label: "Site Settings", href: "/admin/settings" },
      { label: "Option Lists", href: "/admin/settings/options" },
      { label: "Change Password", href: "/admin/settings/password" },
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
          <div className="flex flex-col gap-0.5">
            {group.items.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2 text-sm transition-colors"
                  style={{
                    background: active ? LENITY.accent : "transparent",
                    color: active ? "#ffffff" : LENITY.adminInk,
                    fontWeight: active ? 700 : 400,
                  }}
                >
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
