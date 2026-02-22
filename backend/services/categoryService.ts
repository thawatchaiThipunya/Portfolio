import { prisma } from "@/lib/db";
import { Category } from "@/app/cms/lib/types";

export const categoryBackendService = {
  async findAll(): Promise<Category[]> {
    return await prisma.category.findMany({
      where: { deletedAt: null },
      orderBy: { id: "asc" }
    }) as unknown as Category[];
  },

  async findById(id: number): Promise<Category | null> {
    return await prisma.category.findFirst({
      where: { id, deletedAt: null }
    }) as unknown as Category | null;
  },

  async create(name: string): Promise<Category> {
    return await prisma.category.create({
      data: { name }
    }) as unknown as Category;
  },

  async update(id: number, name: string): Promise<Category> {
    return await prisma.category.update({
      where: { id },
      data: { name }
    }) as unknown as Category;
  },

  async softDelete(id: number): Promise<Category> {
    return await prisma.category.update({
      where: { id },
      data: { deletedAt: new Date() }
    }) as unknown as Category;
  }
};