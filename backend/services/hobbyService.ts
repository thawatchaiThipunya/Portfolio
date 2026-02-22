import { prisma } from "@/lib/db";
import { Hobby } from "@/app/cms/lib/types";
import { Prisma } from "@prisma/client";

export const hobbyBackendService = {
  async findAll(): Promise<Hobby[]> {
    const data = await prisma.hobby.findMany({
      where: { deletedAt: null },
      orderBy: { id: "desc" }
    });
    return data as unknown as Hobby[];
  },

  async findById(id: number): Promise<Hobby | null> {
    const data = await prisma.hobby.findFirst({
      where: { id, deletedAt: null }
    });
    return data as unknown as Hobby | null;
  },

  async create(payload: Partial<Hobby>): Promise<Hobby> {
    const data = await prisma.hobby.create({
      data: {
        name: payload.name,
        image_url: payload.image_url,
        description: payload.description,
        status: payload.status,
      } as Prisma.Args<typeof prisma.hobby.create, "create">["data"]
    });
    return data as unknown as Hobby;
  },

  async update(id: number, payload: Partial<Hobby>): Promise<Hobby> {
    const data = await prisma.hobby.update({
      where: { id },
      data: {
        name: payload.name,
        image_url: payload.image_url,
        description: payload.description,
        status: payload.status,
      } as Prisma.Args<typeof prisma.hobby.update, "update">["data"]
    });
    return data as unknown as Hobby;
  },

  async softDelete(id: number): Promise<Hobby> {
    const data = await prisma.hobby.update({
      where: { id },
      data: { deletedAt: new Date() }
    });
    return data as unknown as Hobby;
  }
};