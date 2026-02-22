import { prisma } from "@/lib/db";
import { SoftSkill } from "@/app/cms/lib/types";

export const softSkillBackendService = {
  async findAll(): Promise<SoftSkill[]> {
    return await prisma.softSkill.findMany({
      where: { deletedAt: null },
      orderBy: { id: "asc" }
    }) as unknown as SoftSkill[];
  },

  async findById(id: number): Promise<SoftSkill | null> {
    return await prisma.softSkill.findFirst({
      where: { id, deletedAt: null }
    }) as unknown as SoftSkill | null;
  },

  async create(name: string): Promise<SoftSkill> {
    return await prisma.softSkill.create({
      data: { name }
    }) as unknown as SoftSkill;
  },

  async update(id: number, name: string): Promise<SoftSkill> {
    return await prisma.softSkill.update({
      where: { id },
      data: { name }
    }) as unknown as SoftSkill;
  },

  async softDelete(id: number): Promise<SoftSkill> {
    return await prisma.softSkill.update({
      where: { id },
      data: { deletedAt: new Date() }
    }) as unknown as SoftSkill;
  }
};