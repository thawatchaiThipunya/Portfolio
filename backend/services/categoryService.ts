import { prisma } from "@/lib/db";
import { Category } from "@prisma/client";

export const categoryBackendService = {
  async findAll(): Promise<Category[]> {
    return prisma.category.findMany({
      where: { deletedAt: null },
      orderBy: { id: "asc" },
    });
  },

  async findById(id: number): Promise<Category | null> {
    return prisma.category.findFirst({ where: { id, deletedAt: null } });
  },

  async create(name: string): Promise<Category> {
    return prisma.category.create({ data: { name } });
  },

  async update(id: number, name: string): Promise<Category> {
    return prisma.category.update({ where: { id }, data: { name } });
  },

  async softDelete(id: number): Promise<Category> {
    return prisma.category.update({ where: { id }, data: { deletedAt: new Date() } });
  },
};
