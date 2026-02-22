import { prisma } from "@/lib/db";
import { Technical } from "@/app/cms/lib/types";

export const technicalBackendService = {
  async findAll(): Promise<Technical[]> {
    return await prisma.technical.findMany({
      where: { deletedAt: null },
      include: { category: true },
      orderBy: { id: "desc" }
    }) as unknown as Technical[];
  },

  async findById(id: number): Promise<Technical | null> {
    return await prisma.technical.findFirst({
      where: { id, deletedAt: null },
      include: { category: true }
    }) as unknown as Technical | null;
  },

  async create(payload: Partial<Technical>): Promise<Technical> {
    return await prisma.technical.create({
      data: {
        name: payload.name!,
        logo: payload.logo!,
        categoryId: payload.categoryId!,
      }
    }) as unknown as Technical;
  },

  async update(id: number, payload: Partial<Technical>): Promise<Technical> {
    return await prisma.technical.update({
      where: { id },
      data: {
        name: payload.name,
        logo: payload.logo,
        categoryId: payload.categoryId,
      }
    }) as unknown as Technical;
  },

  async softDelete(id: number): Promise<Technical> {
    return await prisma.technical.update({
      where: { id },
      data: { deletedAt: new Date() }
    }) as unknown as Technical;
  }
};