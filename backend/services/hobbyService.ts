import { prisma } from "@/lib/db";
import { Hobby, HobbyStatus } from "@prisma/client";

type HobbyInput = {
  name?: string;
  image_url?: string | null;
  description?: string | null;
  status?: HobbyStatus;
};

export const hobbyBackendService = {
  async findAll(): Promise<Hobby[]> {
    return prisma.hobby.findMany({
      where: { deletedAt: null },
      orderBy: { id: "desc" },
    });
  },

  async findById(id: number): Promise<Hobby | null> {
    return prisma.hobby.findFirst({ where: { id, deletedAt: null } });
  },

  async create(payload: HobbyInput): Promise<Hobby> {
    return prisma.hobby.create({
      data: {
        name: payload.name ?? "",
        image_url: payload.image_url,
        description: payload.description,
        status: payload.status,
      },
    });
  },

  async update(id: number, payload: HobbyInput): Promise<Hobby> {
    return prisma.hobby.update({
      where: { id },
      data: {
        name: payload.name,
        image_url: payload.image_url,
        description: payload.description,
        status: payload.status,
      },
    });
  },

  async softDelete(id: number): Promise<Hobby> {
    return prisma.hobby.update({ where: { id }, data: { deletedAt: new Date() } });
  },
};
