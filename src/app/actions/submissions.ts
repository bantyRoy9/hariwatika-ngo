"use server";

import { z } from "zod";
import { prisma } from "@/lib/db";

// Public form-capture actions. No auth (public forms) but ALWAYS server-validate.

type Result<T = Record<string, string>> =
  | { success: true; data: T }
  | { success: false; error: string };

function fail(err: z.ZodError): { success: false; error: string } {
  const first = err.issues[0];
  return { success: false, error: first ? first.message : "Invalid input" };
}

const pad = (n: number) => String(n).padStart(6, "0");

// ── Contact ──
const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  mobile: z.string().trim().min(7, "Valid mobile is required"),
  email: z.string().trim().email().optional().or(z.literal("")),
  subject: z.string().trim().min(1, "Subject is required"),
  message: z.string().trim().min(1, "Message is required"),
});

export async function submitContact(input: unknown): Promise<Result> {
  const parsed = contactSchema.safeParse(input);
  if (!parsed.success) return fail(parsed.error);
  await prisma.contactSubmission.create({ data: { ...parsed.data, email: parsed.data.email || null } });
  return { success: true, data: {} };
}

// ── Donation ──
const donationSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  mobile: z.string().trim().min(7, "Valid mobile is required"),
  email: z.string().trim().email().optional().or(z.literal("")),
  address: z.string().trim().min(1, "Address is required"),
  amount: z.number().int().positive("Amount must be positive"),
  purpose: z.string().trim().min(1, "Purpose is required"),
});

export async function submitDonation(input: unknown): Promise<Result<{ ref: string }>> {
  const parsed = donationSchema.safeParse(input);
  if (!parsed.success) return fail(parsed.error);
  const count = await prisma.donationSubmission.count();
  const ref = `HW-${pad(count + 1)}`;
  await prisma.donationSubmission.create({
    data: { ...parsed.data, email: parsed.data.email || null, ref },
  });
  return { success: true, data: { ref } };
}

// ── Volunteer ──
const volunteerSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  age: z.string().trim().min(1, "Age is required"),
  gender: z.string().trim().min(1, "Gender is required"),
  mobile: z.string().trim().min(7, "Valid mobile is required"),
  email: z.string().trim().email().optional().or(z.literal("")),
  address: z.string().trim().min(1, "Address is required"),
  skills: z.array(z.string()).min(1, "Select at least one skill"),
  availability: z.string().trim().min(1, "Availability is required"),
  motivation: z.string().trim().optional().or(z.literal("")),
});

export async function submitVolunteer(input: unknown): Promise<Result<{ volunteerId: string }>> {
  const parsed = volunteerSchema.safeParse(input);
  if (!parsed.success) return fail(parsed.error);
  const count = await prisma.volunteerSubmission.count();
  const volunteerId = `HW-VOL-${1000 + count + 1}`;
  await prisma.volunteerSubmission.create({
    data: {
      ...parsed.data,
      email: parsed.data.email || null,
      motivation: parsed.data.motivation || null,
      skills: JSON.stringify(parsed.data.skills),
      volunteerId,
    },
  });
  return { success: true, data: { volunteerId } };
}

// ── Internship ──
const internshipSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  age: z.string().trim().min(1, "Age is required"),
  qualification: z.string().trim().min(1, "Qualification is required"),
  institute: z.string().trim().min(1, "Institute is required"),
  mobile: z.string().trim().min(7, "Valid mobile is required"),
  email: z.string().trim().email("Valid email is required"),
  role: z.string().trim().min(1, "Role is required"),
  startDate: z.string().trim().min(1, "Start date is required"),
  duration: z.string().trim().min(1, "Duration is required"),
  motivation: z.string().trim().optional().or(z.literal("")),
});

export async function submitInternship(input: unknown): Promise<Result<{ certId: string }>> {
  const parsed = internshipSchema.safeParse(input);
  if (!parsed.success) return fail(parsed.error);
  await prisma.internshipSubmission.create({
    data: { ...parsed.data, motivation: parsed.data.motivation || null },
  });
  const count = await prisma.internshipSubmission.count();
  return { success: true, data: { certId: `HW-CERT-${pad(count)}` } };
}

// ── Marriage Registration ──
const registrationSchema = z.object({
  side: z.enum(["boy", "girl"]),
  fullName: z.string().trim().min(1, "Full name is required"),
  dob: z.string().trim().min(1, "Date of birth is required"),
  gotra: z.string().trim().min(1, "Gotra is required"),
  caste: z.string().trim().min(1, "Caste is required"),
  religion: z.string().trim().min(1),
  education: z.string().trim().min(1, "Education is required"),
  occupation: z.string().trim().min(1, "Occupation is required"),
  income: z.string().trim().optional().or(z.literal("")),
  height: z.string().trim().optional().or(z.literal("")),
  complexion: z.string().trim().optional().or(z.literal("")),
  fatherName: z.string().trim().min(1, "Father's name is required"),
  motherName: z.string().trim().min(1, "Mother's name is required"),
  siblings: z.string().trim().optional().or(z.literal("")),
  address: z.string().trim().min(1, "Address is required"),
  district: z.string().trim().min(1),
  state: z.string().trim().min(1),
  contactName: z.string().trim().min(1, "Contact name is required"),
  contactMobile: z.string().trim().min(7, "Valid contact mobile is required"),
  contactRelation: z.string().trim().optional().or(z.literal("")),
});

export async function submitRegistration(input: unknown): Promise<Result<{ regId: string }>> {
  const parsed = registrationSchema.safeParse(input);
  if (!parsed.success) return fail(parsed.error);
  const prefix = parsed.data.side === "boy" ? "HW-B-" : "HW-G-";
  const count = await prisma.marriageRegistration.count({ where: { side: parsed.data.side } });
  const regId = `${prefix}${1000 + count + 1}`;
  const d = parsed.data;
  await prisma.marriageRegistration.create({
    data: {
      ...d,
      income: d.income || null,
      height: d.height || null,
      complexion: d.complexion || null,
      siblings: d.siblings || null,
      contactRelation: d.contactRelation || null,
      regId,
    },
  });
  return { success: true, data: { regId } };
}
