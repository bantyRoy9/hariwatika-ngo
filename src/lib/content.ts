import "server-only";
import { prisma } from "@/lib/db";

/** Bilingual string pair used throughout the public pages. */
export type Bi = { en: string; hi: string };

export async function getSettings(groups?: string[]): Promise<Record<string, { en: string; hi: string; img: string | null }>> {
  const rows = await prisma.siteSetting.findMany(groups ? { where: { group: { in: groups } } } : undefined);
  const map: Record<string, { en: string; hi: string; img: string | null }> = {};
  for (const r of rows) map[r.key] = { en: r.en, hi: r.hi, img: r.img };
  return map;
}

/** Translation map for the LanguageProvider (form labels etc.). */
export async function getTranslations(): Promise<Record<string, { en: string; hi: string }>> {
  const rows = await prisma.translation.findMany();
  const map: Record<string, { en: string; hi: string }> = {};
  for (const r of rows) map[r.key] = { en: r.en, hi: r.hi };
  return map;
}

export async function getOptions(group: string) {
  return prisma.optionItem.findMany({ where: { group }, orderBy: { sortOrder: "asc" } });
}

export async function getNavLinks(location: string) {
  return prisma.navLink.findMany({ where: { location }, orderBy: { sortOrder: "asc" } });
}

export async function getSocialLinks() {
  return prisma.socialLink.findMany({ orderBy: { sortOrder: "asc" } });
}

/** Header (hero tag/title/subtitle/img) for a given page slug, e.g. "about". */
export async function getHeader(page: string): Promise<{ tag: Bi; title: Bi; subtitle: Bi; img: string | null }> {
  const rows = await prisma.siteSetting.findMany({ where: { key: { startsWith: `header.${page}.` } } });
  const find = (suffix: string) => rows.find((r) => r.key === `header.${page}.${suffix}`);
  const tag = find("tag");
  const title = find("title");
  const subtitle = find("subtitle");
  return {
    tag: { en: tag?.en ?? "", hi: tag?.hi ?? "" },
    title: { en: title?.en ?? "", hi: title?.hi ?? "" },
    subtitle: { en: subtitle?.en ?? "", hi: subtitle?.hi ?? "" },
    img: title?.img ?? tag?.img ?? null,
  };
}
