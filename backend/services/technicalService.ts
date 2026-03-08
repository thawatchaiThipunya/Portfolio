import { prisma } from "@/lib/db";
import { Technical, Prisma } from "@prisma/client";

// Type สำหรับ Technical ที่ include Category (ใช้ใน findAll/findById)
export type TechnicalWithCategory = Prisma.TechnicalGetPayload<{
  include: { category: true };
}>;

type TechnicalInput = {
  name?: string;
  logo?: string;
  categoryId?: number;
};

export const technicalBackendService = {
  async findAll(): Promise<TechnicalWithCategory[]> {
    return prisma.technical.findMany({
      where: { deletedAt: null },
      include: { category: true },
      orderBy: [{ categoryId: "asc" }, { sortOrder: "asc" }],
    });
  },

  async reorder(items: { id: number; sortOrder: number }[]): Promise<void> {
    await prisma.$transaction(
      items.map(({ id, sortOrder }) =>
        prisma.technical.update({ where: { id }, data: { sortOrder } })
      )
    );
  },

  async findById(id: number): Promise<TechnicalWithCategory | null> {
    return prisma.technical.findFirst({
      where: { id, deletedAt: null },
      include: { category: true },
    });
  },

  async create(payload: TechnicalInput): Promise<Technical> {
    return prisma.technical.create({
      data: {
        name: payload.name ?? "",
        logo: payload.logo ?? "",
        categoryId: payload.categoryId ?? 0,
      },
    });
  },

  async update(id: number, payload: TechnicalInput): Promise<Technical> {
    return prisma.technical.update({
      where: { id },
      data: {
        name: payload.name,
        logo: payload.logo,
        categoryId: payload.categoryId,
      },
    });
  },

  async softDelete(id: number): Promise<Technical> {
    return prisma.technical.update({ where: { id }, data: { deletedAt: new Date() } });
  },
};
