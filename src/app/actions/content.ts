"use server";

import { prisma } from "@/lib/db";
import { assertAdmin } from "@/lib/auth";
import { revalidatePath } from "next/cache";

// Generic CRUD for the content models. The admin UI sends a plain object of
// fields; we trust the admin (auth-gated) but coerce types and never accept
// arbitrary keys beyond what each model defines (Prisma rejects unknown keys).

// Map each editable model to the public path(s) to revalidate after a write.
const REVALIDATE: Record<string, string[]> = {
  blogPost: ["/blog", "/"],
  project: ["/projects"],
  futurePlan: ["/projects"],
  teamMember: ["/about"],
  timelineItem: ["/about"],
  legalDoc: ["/about"],
  financialReport: ["/transparency"],
  expenseCategory: ["/transparency"],
  reportDocument: ["/transparency"],
  internshipListing: ["/internship"],
  homeService: ["/"],
  homeStat: ["/"],
  homeCampaign: ["/"],
  homePillar: ["/"],
  navLink: ["/", "/about", "/blog", "/projects", "/contact"],
  socialLink: ["/"],
  volunteerBenefit: ["/volunteer"],
  optionItem: ["/donate", "/contact", "/volunteer", "/blog", "/projects"],
  mediaAsset: [],
};

// Whitelist of models the generic CRUD may touch (defense in depth).
const MODELS = new Set(Object.keys(REVALIDATE));

function client(model: string) {
  if (!MODELS.has(model)) throw new Error(`Unknown model: ${model}`);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (prisma as any)[model];
}

function revalidate(model: string) {
  for (const p of REVALIDATE[model] ?? []) revalidatePath(p);
}

export async function createRecord(model: string, data: Record<string, unknown>) {
  await assertAdmin();
  const rec = await client(model).create({ data });
  revalidate(model);
  return rec;
}

export async function updateRecord(model: string, id: number, data: Record<string, unknown>) {
  await assertAdmin();
  const rec = await client(model).update({ where: { id }, data });
  revalidate(model);
  return rec;
}

export async function deleteRecord(model: string, id: number) {
  await assertAdmin();
  await client(model).delete({ where: { id } });
  revalidate(model);
}

export async function reorderRecords(model: string, orderedIds: number[]) {
  await assertAdmin();
  await prisma.$transaction(
    orderedIds.map((id, i) => client(model).update({ where: { id }, data: { sortOrder: i } })),
  );
  revalidate(model);
}

// ── Key/value settings (SiteSetting + Translation) ──
type KV = { key: string; en?: string; hi?: string; img?: string | null };

export async function saveSettings(rows: KV[]) {
  await assertAdmin();
  await prisma.$transaction(
    rows.map((r) =>
      prisma.siteSetting.upsert({
        where: { key: r.key },
        update: { en: r.en ?? "", hi: r.hi ?? "", ...(r.img !== undefined ? { img: r.img } : {}) },
        create: { key: r.key, en: r.en ?? "", hi: r.hi ?? "", img: r.img ?? null, group: "home" },
      }),
    ),
  );
  // Settings touch everything — revalidate the whole tree.
  revalidatePath("/", "layout");
}

export async function saveTranslations(rows: { key: string; en: string; hi: string }[]) {
  await assertAdmin();
  await prisma.$transaction(
    rows.map((r) =>
      prisma.translation.update({ where: { key: r.key }, data: { en: r.en, hi: r.hi } }),
    ),
  );
  revalidatePath("/", "layout");
}

// Update a submission's status (contacts/donations).
export async function updateSubmissionStatus(model: "contactSubmission" | "donationSubmission", id: number, status: string) {
  await assertAdmin();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  await (prisma as any)[model].update({ where: { id }, data: { status } });
}

export async function deleteSubmission(
  model: "contactSubmission" | "donationSubmission" | "volunteerSubmission" | "internshipSubmission" | "marriageRegistration",
  id: number,
) {
  await assertAdmin();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  await (prisma as any)[model].delete({ where: { id } });
}
