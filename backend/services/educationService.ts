import { prisma } from "@/lib/db";
import { Education } from "@prisma/client";

type EducationInput = {
  name?: string;
  faculty?: string | null;
  GPAX?: string | null;
  starttime?: string | Date;
  endtime?: string | Date | null;
  logo_url?: string | null;
};

export const educationBackendService = {
  async findAll(): Promise<Education[]> {
    return prisma.education.findMany({
      where: { deletedAt: null },
      orderBy: { starttime: "desc" },
    });
  },

  async findById(id: number): Promise<Education | null> {
    return prisma.education.findFirst({ where: { id, deletedAt: null } });
  },

  async create(payload: EducationInput): Promise<Education> {
    return prisma.education.create({
      data: {
        name: payload.name ?? "",
        faculty: payload.faculty,
        GPAX: payload.GPAX,
        logo_url: payload.logo_url,
        starttime: payload.starttime ? new Date(payload.starttime) : new Date(),
        endtime: payload.endtime ? new Date(payload.endtime) : null,
      },
    });
  },

  async update(id: number, payload: EducationInput): Promise<Education> {
    return prisma.education.update({
      where: { id },
      data: {
        name: payload.name,
        faculty: payload.faculty,
        GPAX: payload.GPAX,
        logo_url: payload.logo_url,
        starttime: payload.starttime ? new Date(payload.starttime) : undefined,
        endtime: payload.endtime ? new Date(payload.endtime) : null,
      },
    });
  },

  async softDelete(id: number): Promise<Education> {
    return prisma.education.update({ where: { id }, data: { deletedAt: new Date() } });
  },
};
