"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

// ═══════════════════════════════════════════════════════════
// TIMELINE ITEMS
// ═══════════════════════════════════════════════════════════

export async function createTimelineItem(data: {
  year: string;
  eventEn: string;
  eventHi: string;
}) {
  await requireAdmin();

  try {
    const maxOrder = await prisma.timelineItem.aggregate({
      _max: { sortOrder: true },
    });

    const newItem = await prisma.timelineItem.create({
      data: {
        year: data.year,
        eventEn: data.eventEn,
        eventHi: data.eventHi,
        sortOrder: (maxOrder._max.sortOrder ?? -1) + 1,
      },
    });

    revalidatePath("/about");
    return { success: true, data: newItem };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to create timeline item" };
  }
}

export async function updateTimelineItem(id: number, data: {
  year: string;
  eventEn: string;
  eventHi: string;
}) {
  await requireAdmin();

  try {
    const updated = await prisma.timelineItem.update({
      where: { id },
      data: {
        year: data.year,
        eventEn: data.eventEn,
        eventHi: data.eventHi,
      },
    });

    revalidatePath("/about");
    return { success: true, data: updated };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to update timeline item" };
  }
}

export async function deleteTimelineItem(id: number) {
  await requireAdmin();

  try {
    await prisma.timelineItem.delete({
      where: { id },
    });

    revalidatePath("/about");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to delete timeline item" };
  }
}

// ═══════════════════════════════════════════════════════════
// TEAM MEMBERS
// ═══════════════════════════════════════════════════════════

export async function createTeamMember(data: {
  name: string;
  designation: string;
  phone?: string;
}) {
  await requireAdmin();

  try {
    // Generate initials from name
    const initials = data.name
      .split(" ")
      .map(n => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

    const maxOrder = await prisma.teamMember.aggregate({
      _max: { sortOrder: true },
    });

    const newMember = await prisma.teamMember.create({
      data: {
        name: data.name,
        designation: data.designation,
        initials,
        phone: data.phone || null,
        sortOrder: (maxOrder._max.sortOrder ?? -1) + 1,
      },
    });

    revalidatePath("/about");
    return { success: true, data: newMember };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to create team member" };
  }
}

export async function updateTeamMember(id: number, data: {
  name: string;
  designation: string;
  phone?: string;
}) {
  await requireAdmin();

  try {
    // Regenerate initials
    const initials = data.name
      .split(" ")
      .map(n => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

    const updated = await prisma.teamMember.update({
      where: { id },
      data: {
        name: data.name,
        designation: data.designation,
        initials,
        phone: data.phone || null,
      },
    });

    revalidatePath("/about");
    return { success: true, data: updated };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to update team member" };
  }
}

export async function deleteTeamMember(id: number) {
  await requireAdmin();

  try {
    await prisma.teamMember.delete({
      where: { id },
    });

    revalidatePath("/about");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to delete team member" };
  }
}

// ═══════════════════════════════════════════════════════════
// LEGAL DOCUMENTS
// ═══════════════════════════════════════════════════════════

export async function createLegalDoc(data: {
  iconName: string;
  titleEn: string;
  titleHi: string;
  number: string;
  descEn: string;
  descHi: string;
}) {
  await requireAdmin();

  try {
    const maxOrder = await prisma.legalDoc.aggregate({
      _max: { sortOrder: true },
    });

    const newDoc = await prisma.legalDoc.create({
      data: {
        iconName: data.iconName,
        titleEn: data.titleEn,
        titleHi: data.titleHi,
        number: data.number,
        descEn: data.descEn,
        descHi: data.descHi,
        sortOrder: (maxOrder._max.sortOrder ?? -1) + 1,
      },
    });

    revalidatePath("/about");
    return { success: true, data: newDoc };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to create legal document" };
  }
}

export async function updateLegalDoc(id: number, data: {
  iconName: string;
  titleEn: string;
  titleHi: string;
  number: string;
  descEn: string;
  descHi: string;
}) {
  await requireAdmin();

  try {
    const updated = await prisma.legalDoc.update({
      where: { id },
      data: {
        iconName: data.iconName,
        titleEn: data.titleEn,
        titleHi: data.titleHi,
        number: data.number,
        descEn: data.descEn,
        descHi: data.descHi,
      },
    });

    revalidatePath("/about");
    return { success: true, data: updated };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to update legal document" };
  }
}

export async function deleteLegalDoc(id: number) {
  await requireAdmin();

  try {
    await prisma.legalDoc.delete({
      where: { id },
    });

    revalidatePath("/about");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to delete legal document" };
  }
}

// ═══════════════════════════════════════════════════════════
// JOURNEY CARDS (25 Years Story Section)
// ═══════════════════════════════════════════════════════════

export async function createJourneyCard(data: {
  number: string;
  titleEn: string;
  titleHi: string;
  descEn: string;
  descHi: string;
  image: string;
  stat: string;
  statLabelEn: string;
  statLabelHi: string;
}) {
  await requireAdmin();

  try {
    const maxOrder = await prisma.journeyCard.aggregate({
      _max: { sortOrder: true },
    });

    const newCard = await prisma.journeyCard.create({
      data: {
        number: data.number,
        titleEn: data.titleEn,
        titleHi: data.titleHi,
        descEn: data.descEn,
        descHi: data.descHi,
        image: data.image,
        stat: data.stat,
        statLabelEn: data.statLabelEn,
        statLabelHi: data.statLabelHi,
        sortOrder: (maxOrder._max.sortOrder ?? -1) + 1,
      },
    });

    revalidatePath("/about");
    return { success: true, data: newCard };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to create journey card" };
  }
}

export async function updateJourneyCard(id: number, data: {
  number: string;
  titleEn: string;
  titleHi: string;
  descEn: string;
  descHi: string;
  image: string;
  stat: string;
  statLabelEn: string;
  statLabelHi: string;
}) {
  await requireAdmin();

  try {
    const updated = await prisma.journeyCard.update({
      where: { id },
      data: {
        number: data.number,
        titleEn: data.titleEn,
        titleHi: data.titleHi,
        descEn: data.descEn,
        descHi: data.descHi,
        image: data.image,
        stat: data.stat,
        statLabelEn: data.statLabelEn,
        statLabelHi: data.statLabelHi,
      },
    });

    revalidatePath("/about");
    return { success: true, data: updated };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to update journey card" };
  }
}

export async function deleteJourneyCard(id: number) {
  await requireAdmin();

  try {
    await prisma.journeyCard.delete({
      where: { id },
    });

    revalidatePath("/about");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to delete journey card" };
  }
}

// ═══════════════════════════════════════════════════════════
// HERO STATS (Stats shown in hero section)
// ═══════════════════════════════════════════════════════════

export async function createHeroStat(data: {
  value: string;
  labelEn: string;
  labelHi: string;
  page?: string;
}) {
  await requireAdmin();

  try {
    const maxOrder = await prisma.heroStat.aggregate({
      _max: { sortOrder: true },
    });

    const newStat = await prisma.heroStat.create({
      data: {
        value: data.value,
        labelEn: data.labelEn,
        labelHi: data.labelHi,
        page: data.page || "about",
        sortOrder: (maxOrder._max.sortOrder ?? -1) + 1,
      },
    });

    revalidatePath("/about");
    return { success: true, data: newStat };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to create hero stat" };
  }
}

export async function updateHeroStat(id: number, data: {
  value: string;
  labelEn: string;
  labelHi: string;
  page?: string;
}) {
  await requireAdmin();

  try {
    const updated = await prisma.heroStat.update({
      where: { id },
      data: {
        value: data.value,
        labelEn: data.labelEn,
        labelHi: data.labelHi,
        page: data.page || "about",
      },
    });

    revalidatePath("/about");
    return { success: true, data: updated };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to update hero stat" };
  }
}

export async function deleteHeroStat(id: number) {
  await requireAdmin();

  try {
    await prisma.heroStat.delete({
      where: { id },
    });

    revalidatePath("/about");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to delete hero stat" };
  }
}
