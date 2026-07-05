import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";

const COOKIE = "hw_admin";
const MAX_AGE = 60 * 60 * 24 * 7; // 7 days

function secret(): string {
  const s = process.env.SESSION_SECRET;
  if (!s || s.length < 16) throw new Error("SESSION_SECRET not configured");
  return s;
}

// Signed token: <expiryMs>.<hmac>. No DB lookup needed to verify.
function sign(expiry: number): string {
  const mac = crypto.createHmac("sha256", secret()).update(String(expiry)).digest("hex");
  return `${expiry}.${mac}`;
}

function verify(token: string | undefined): boolean {
  if (!token) return false;
  const [expStr, mac] = token.split(".");
  if (!expStr || !mac) return false;
  const expected = crypto.createHmac("sha256", secret()).update(expStr).digest("hex");
  // timing-safe compare
  const a = Buffer.from(mac);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return false;
  return Number(expStr) > Date.now();
}

/** Verify a password against the configured admin. Falls back to ADMIN_PASSWORD_HASH env. */
export async function checkPassword(password: string): Promise<boolean> {
  const user = await prisma.adminUser.findFirst();
  const hash = user?.passwordHash ?? process.env.ADMIN_PASSWORD_HASH;
  if (!hash) return false;
  return bcrypt.compare(password, hash);
}

export async function login(password: string): Promise<boolean> {
  const ok = await checkPassword(password);
  if (!ok) return false;
  const expiry = Date.now() + MAX_AGE * 1000;
  const store = await cookies();
  store.set(COOKIE, sign(expiry), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE,
  });
  return true;
}

export async function logout(): Promise<void> {
  const store = await cookies();
  store.delete(COOKIE);
}

export async function isAuthenticated(): Promise<boolean> {
  const store = await cookies();
  return verify(store.get(COOKIE)?.value);
}

/** Use at the top of every admin page/layout and Server Action. Redirects if not logged in. */
export async function requireAdmin(): Promise<void> {
  if (!(await isAuthenticated())) {
    redirect("/admin/login");
  }
}

/** For Server Actions that should throw rather than redirect. */
export async function assertAdmin(): Promise<void> {
  if (!(await isAuthenticated())) throw new Error("Unauthorized");
}

/** Update the admin password (creates the AdminUser row if absent). */
export async function setPassword(newPassword: string): Promise<void> {
  const hash = await bcrypt.hash(newPassword, 10);
  const existing = await prisma.adminUser.findFirst();
  if (existing) {
    await prisma.adminUser.update({ where: { id: existing.id }, data: { passwordHash: hash } });
  } else {
    await prisma.adminUser.create({ data: { username: "admin", passwordHash: hash } });
  }
}
