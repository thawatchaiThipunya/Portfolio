import { prisma } from "@/lib/db";
import { Project } from "@/app/cms/lib/types";
import { Prisma } from "@prisma/client";

export const projectBackendService = {
  async getAll(): Promise<Project[]> {
    const data = await prisma.project.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: "desc" },
    });
    return data as unknown as Project[];
  },

  async getById(id: number): Promise<Project | null> {
    const data = await prisma.project.findUnique({
      where: { id, deletedAt: null },
    });
    return data as unknown as Project | null;
  },

  async create(payload: Partial<Project>): Promise<Project> {
    const data = await prisma.project.create({
      data: payload as Prisma.Args<typeof prisma.project.create, "create">["data"],
    });
    return data as unknown as Project;
  },

  async update(id: number, payload: Partial<Project>): Promise<Project> {
    const data = await prisma.project.update({
      where: { id },
      data: payload as Prisma.Args<typeof prisma.project.update, "update">["data"],
    });
    return data as unknown as Project;
  },

  async delete(id: number): Promise<Project> {
    const data = await prisma.project.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
    return data as unknown as Project;
  },
};