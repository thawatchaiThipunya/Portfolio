import { prisma } from "@/lib/db";
import { SoftSkill } from "@prisma/client";

export const softSkillBackendService = {
  async findAll(): Promise<SoftSkill[]> {
    return prisma.softSkill.findMany({
      where: { deletedAt: null },
      orderBy: { id: "asc" },
    });
  },

  async findById(id: number): Promise<SoftSkill | null> {
    return prisma.softSkill.findFirst({ where: { id, deletedAt: null } });
  },

  async create(name: string): Promise<SoftSkill> {
    return prisma.softSkill.create({ data: { name } });
  },

  async update(id: number, name: string): Promise<SoftSkill> {
    return prisma.softSkill.update({ where: { id }, data: { name } });
  },

  async softDelete(id: number): Promise<SoftSkill> {
    return prisma.softSkill.update({ where: { id }, data: { deletedAt: new Date() } });
  },
};
