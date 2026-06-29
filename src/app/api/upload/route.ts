import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { isAuthenticated } from "@/lib/auth";
import { prisma } from "@/lib/db";

const ALLOWED = new Set(["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml", "application/pdf"]);
const MAX_BYTES = 8 * 1024 * 1024; // 8MB

function extFor(type: string): string {
  const map: Record<string, string> = {
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/webp": "webp",
    "image/gif": "gif",
    "image/svg+xml": "svg",
    "application/pdf": "pdf",
  };
  return map[type] ?? "bin";
}

export async function POST(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const form = await req.formData();
  const file = form.get("file");
  const category = (form.get("category") as string) || "general";

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }
  if (!ALLOWED.has(file.type)) {
    return NextResponse.json({ error: `Unsupported file type: ${file.type}` }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "File too large (max 8MB)" }, { status: 400 });
  }

  const safeCat = category.replace(/[^a-z0-9-]/gi, "").toLowerCase() || "general";
  const dir = path.join(process.cwd(), "public", "uploads", safeCat);
  await mkdir(dir, { recursive: true });

  // Avoid Date.now in restricted contexts? This is a normal route handler, fine.
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${extFor(file.type)}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(dir, filename), buffer);

  const url = `/uploads/${safeCat}/${filename}`;
  const asset = await prisma.mediaAsset.create({
    data: { url, alt: file.name, category: safeCat },
  });

  return NextResponse.json({ url, id: asset.id });
}
