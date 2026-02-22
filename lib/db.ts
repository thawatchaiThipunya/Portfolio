import { PrismaClient } from "@prisma/client";

// ป้องกันการสร้าง Prisma Client ใหม่หลายตัวตอนที่เราเซฟงาน (Hot Reload) ในช่วง Development
const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["query"], // ใส่ไว้เพื่อให้เห็น SQL Query ที่รันใน Terminal (ช่วยให้หายงงว่ามันรันอะไร)
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;