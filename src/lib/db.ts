import { PrismaClient } from "@prisma/client";

// Singleton — avoid exhausting connections during Next.js hot reload.
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
    // Add error handling for database connection
    errorFormat: "minimal",
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// Helper to check if database is available
export async function isDatabaseAvailable(): Promise<boolean> {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return true;
  } catch (error) {
    console.error("Database connection failed:", error);
    return false;
  }
}
