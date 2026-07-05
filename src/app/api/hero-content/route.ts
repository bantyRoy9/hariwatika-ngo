import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    await requireAdmin();

    const body = await req.json();
    const { page, tagEn, tagHi, titleEn, titleHi, subtitleEn, subtitleHi, image } = body;

    if (!page) {
      return NextResponse.json({ success: false, error: "Page is required" }, { status: 400 });
    }

    // Update or create settings for tag, title, subtitle
    await prisma.siteSetting.upsert({
      where: { key: `header.${page}.tag` },
      update: { en: tagEn, hi: tagHi },
      create: { key: `header.${page}.tag`, en: tagEn, hi: tagHi, group: "headers" },
    });

    await prisma.siteSetting.upsert({
      where: { key: `header.${page}.title` },
      update: { en: titleEn, hi: titleHi, img: image || null },
      create: { key: `header.${page}.title`, en: titleEn, hi: titleHi, img: image || null, group: "headers" },
    });

    await prisma.siteSetting.upsert({
      where: { key: `header.${page}.subtitle` },
      update: { en: subtitleEn, hi: subtitleHi },
      create: { key: `header.${page}.subtitle`, en: subtitleEn, hi: subtitleHi, group: "headers" },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Failed to update hero content:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update hero content" },
      { status: 500 }
    );
  }
}
