import { prisma } from "@/lib/db";
import { Education } from "@/app/cms/lib/types";
import { Prisma } from "@prisma/client";

export const educationBackendService = {
  async findAll(): Promise<Education[]> {
    const data = await prisma.education.findMany({
      where: { deletedAt: null },
      orderBy: { starttime: "desc" }
    });
    return data as unknown as Education[];
  },

  async findById(id: number): Promise<Education | null> {
    const data = await prisma.education.findFirst({
      where: { id, deletedAt: null }
    });
    return data as unknown as Education | null;
  },

  async create(payload: Partial<Education>): Promise<Education> {
    const data = await prisma.education.create({
      data: {
        ...payload,
        starttime: payload.starttime ? new Date(payload.starttime) : new Date(),
        endtime: payload.endtime ? new Date(payload.endtime) : null,
      } as Prisma.Args<typeof prisma.education.create, "create">["data"]
    });
    return data as unknown as Education;
  },

  async update(id: number, payload: Partial<Education>): Promise<Education> {
    const data = await prisma.education.update({
      where: { id },
      data: {
        ...payload,
        starttime: payload.starttime ? new Date(payload.starttime) : undefined,
        endtime: payload.endtime ? new Date(payload.endtime) : null,
      } as Prisma.Args<typeof prisma.education.update, "update">["data"]
    });
    return data as unknown as Education;
  },

  async softDelete(id: number): Promise<Education> {
    const data = await prisma.education.update({
      where: { id },
      data: { deletedAt: new Date() }
    });
    return data as unknown as Education;
  }
};