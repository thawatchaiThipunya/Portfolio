import { prisma } from "@/lib/db";
import { Project, Prisma } from "@prisma/client";

export const projectBackendService = {
  async getAll(): Promise<Project[]> {
    return prisma.project.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: "desc" },
    });
  },

  async getById(id: number): Promise<Project | null> {
    return prisma.project.findUnique({ where: { id, deletedAt: null } });
  },

  async create(payload: Prisma.ProjectCreateInput): Promise<Project> {
    return prisma.project.create({ data: payload });
  },

  async update(id: number, payload: Prisma.ProjectUpdateInput): Promise<Project> {
    return prisma.project.update({ where: { id }, data: payload });
  },

  async delete(id: number): Promise<Project> {
    return prisma.project.update({ where: { id }, data: { deletedAt: new Date() } });
  },
};
