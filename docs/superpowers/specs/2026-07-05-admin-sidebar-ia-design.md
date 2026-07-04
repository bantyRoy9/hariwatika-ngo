# Admin Sidebar Information Architecture — Design

## Context

The client (non-technical) manages content through the admin panel and
reported the sidebar is too technical: given a public page they want to
change, it isn't obvious which sidebar item to click. Two concrete causes
found during investigation:

1. The current "Site Content" group mixes plain page names ("Home Page",
   "About") with cross-cutting concerns ("Page Headers", "Labels & Text")
   that don't correspond to one page.
2. "Volunteers" appears twice with different meanings — once under
   "Analytics" (`/admin/volunteers`, a sortable/exportable report) and once
   under "Submissions" (`/admin/submissions/volunteers`, the raw application
   list) — with no way to tell them apart from the label alone.

Investigation also found that five public pages — Gallery, Contact, Donate,
Programs, Registration — have **no database-backed content at all** (no
Prisma queries in their page files); they're fully hardcoded. Contact and
Donate have partial overlap with existing settings screens (contact info and
bank/UPI details live in "Site Settings"; form labels live in "Labels &
Text"), but there is no dedicated editor for any of the five, and no code
change in this spec adds one.

## Scope

**Relabeling and regrouping only.** No new admin screens, no new data
wiring, no changes to what's editable — only `Sidebar.tsx`'s structure,
labels, and icons change. This is a deliberate choice over the alternative
(consolidating each page's header banner and body content into one combined
editor screen) to keep this fast and low-risk; that consolidation is a
larger, separate piece of work if wanted later.

## Design

### New structure

Six groups, in this order:

1. **Overview** — unchanged, single item, `/admin`.
2. **Pages** *(new)* — one item per public page that has a real content
   editor today. A one-line hint renders under the group heading: "Click a
   page to edit what's shown on it."
   - Home Page → `/admin/content/home`
   - About Us → `/admin/content/about`
   - Our Projects → `/admin/content/projects`
   - Blog / News → `/admin/content/blog`
   - Volunteer Page → `/admin/content/volunteer`
   - Transparency Reports → `/admin/content/transparency`
   - Internship Listings → `/admin/content/internships`

   Gallery, Contact, Donate, Programs, and Registration are intentionally
   **not** listed here — there is nothing page-specific to edit for them,
   and listing them would send the user to a screen that doesn't change
   that page's content.
3. **Site-wide** *(renamed from "Navigation & Footer" + merged with
   relevant "Site Content" items)* — things that affect more than one page:
   - Page Banners → `/admin/content/headers` (was "Page Headers"; subtitle
     clarifies "Title & subtitle shown at the top of each page")
   - Menu & Social Links → `/admin/nav` (was "Nav / Footer Links")
   - Contact Info & Bank Details → `/admin/settings` (was "Site Settings")
   - Text Labels → `/admin/content/labels` (was "Labels & Text"; subtitle
     unchanged: "form fields, buttons, messages")
   - Media Library → `/admin/media` (unchanged)
4. **Reports** *(renamed from "Analytics" — plainer word)*:
   - Donations Report → `/admin/donations` (unchanged)
   - Volunteers Report → `/admin/volunteers` (was "Volunteers" — renamed to
     disambiguate from the Messages & Applications group)
   - Projects Board → `/admin/projects` (unchanged)
   - Notifications → `/admin/notifications/volunteers` (unchanged)
   - All Submissions → `/admin/submissions/all` (unchanged)
5. **Messages & Applications** *(renamed from "Submissions" — more human)*:
   - Contact Messages → `/admin/submissions/contacts` (unchanged)
   - Donation Records → `/admin/submissions/donations` (was "Donations" —
     renamed to disambiguate from "Donations Report")
   - Volunteer Applications → `/admin/submissions/volunteers` (was
     "Volunteers" — renamed to disambiguate from "Volunteers Report")
   - Internship Applications → `/admin/submissions/internships` (unchanged)
   - Marriage Registrations → `/admin/submissions/marriages` (unchanged)
6. **Settings** *(unchanged group name)*:
   - Change Password → `/admin/settings/password` (unchanged)
   - Dropdown Choices → `/admin/settings/options` (was "Option Lists")

### Icons

Add one Lucide icon per nav item as a quick visual scan aid — the Sidebar
currently has zero icons on nav items (only the mobile menu toggle and
logout use icons), while the rest of the admin panel (KPI cards, page
titles) already uses icons throughout. Icons are chosen per item, not per
group, since items within a group aren't visually similar enough to share
one icon meaningfully:

| Item | Icon |
|---|---|
| Overview | `LayoutDashboard` |
| Home Page | `Home` |
| About Us | `Info` |
| Our Projects | `FolderKanban` |
| Blog / News | `Newspaper` |
| Volunteer Page | `HeartHandshake` |
| Transparency Reports | `PieChart` |
| Internship Listings | `GraduationCap` |
| Page Banners | `Image` |
| Menu & Social Links | `Share2` |
| Contact Info & Bank Details | `Landmark` |
| Text Labels | `Type` |
| Media Library | `Images` |
| Donations Report | `IndianRupee` |
| Volunteers Report | `Users` |
| Projects Board | `ClipboardList` |
| Notifications | `Bell` |
| All Submissions | `Inbox` |
| Contact Messages | `Mail` |
| Donation Records | `Receipt` |
| Volunteer Applications | `UserPlus` |
| Internship Applications | `ClipboardCheck` |
| Marriage Registrations | `Heart` |
| Change Password | `KeyRound` |
| Dropdown Choices | `ListFilter` |

`Our Projects` (content editor) and `Projects Board` (status report) use
different icons deliberately, as do `Internship Listings` (content editor)
and `Internship Applications` (submissions) — same disambiguation principle
as the label renames above.

### Data flow / components

No change. `Sidebar.tsx` is a static `NAV` array of `{heading, items}` — the
only change is the array's contents (grouping, labels, hrefs unchanged
except where noted above) plus an `icon` field added to the `Item` type and
rendered next to each label. No new files, no new routes, no new Prisma
queries.

### Testing / verification

No test framework covers this file (client component, no logic beyond
rendering a static array — matches the rest of the admin panel's UI code).
Verification is manual: log into `/admin`, confirm all 6 groups render with
the new labels/order, click through every renamed link to confirm the href
still resolves to the correct existing page (no link should 404 — hrefs are
unchanged, only labels/grouping/icons change), and check on mobile width
that the drawer still opens/closes correctly.

### Out of scope

- Building a dedicated content editor for Gallery, Contact, Donate,
  Programs, or Registration.
- Consolidating a page's header banner and body content into one screen.
- Any change to the underlying admin route files, Prisma models, or the
  `(dash)` layout — only `Sidebar.tsx` changes.
