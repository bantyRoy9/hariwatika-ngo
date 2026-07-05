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

type Item = { label: string; href: string; icon?: LucideIcon };
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
    heading: "Page Editor",
    items: [
      { label: "🏠 Home", href: "/admin/page-editor/home" },
      { label: "ℹ️ About", href: "/admin/page-editor/about" },
      { label: "📰 Blog", href: "/admin/page-editor/blog" },
      { label: "📁 Projects", href: "/admin/page-editor/projects" },
      { label: "💛 Donate", href: "/admin/page-editor/donate" },
      { label: "🤝 Volunteer", href: "/admin/page-editor/volunteer" },
      { label: "📞 Contact", href: "/admin/page-editor/contact" },
      { label: "📊 Transparency", href: "/admin/page-editor/transparency" },
      { label: "🎓 Internship", href: "/admin/page-editor/internship" },
      { label: "💍 Registration", href: "/admin/page-editor/registration" },
    ],
  },
  {
    heading: "Site Content",
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
                  {Icon ? <Icon className="w-4 h-4 shrink-0" /> : <span className="w-4 h-4 shrink-0 text-xs leading-none">{item.label.slice(0,2)}</span>}
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
