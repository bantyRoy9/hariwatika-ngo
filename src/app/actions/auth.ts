"use server";

import { z } from "zod";
import { login, logout, assertAdmin, setPassword } from "@/lib/auth";
import { redirect } from "next/navigation";

const loginSchema = z.object({ password: z.string().min(1, "Password is required") });

export async function loginAction(input: unknown): Promise<{ success: boolean; error?: string }> {
  const parsed = loginSchema.safeParse(input);
  if (!parsed.success) return { success: false, error: "Password is required" };
  const ok = await login(parsed.data.password);
  if (!ok) return { success: false, error: "Incorrect password" };
  return { success: true };
}

export async function logoutAction(): Promise<void> {
  await logout();
  redirect("/admin/login");
}

const passwordSchema = z.object({
  current: z.string().min(1, "Current password is required"),
  next: z.string().min(6, "New password must be at least 6 characters"),
});

export async function changePasswordAction(input: unknown): Promise<{ success: boolean; error?: string }> {
  await assertAdmin();
  const parsed = passwordSchema.safeParse(input);
  if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message ?? "Invalid input" };
  const { checkPassword } = await import("@/lib/auth");
  if (!(await checkPassword(parsed.data.current))) return { success: false, error: "Current password is incorrect" };
  await setPassword(parsed.data.next);
  return { success: true };
}
