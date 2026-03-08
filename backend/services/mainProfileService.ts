import { prisma } from "@/lib/db";
import { MainProfile } from "@prisma/client";

type MainProfileInput = {
  firstname?: string;
  lastname?: string;
  image_url?: string | null;
  role?: string;
  description?: string;
};

export const mainProfileBackendService = {
  async findFirst(): Promise<MainProfile | null> {
    return prisma.mainProfile.findUnique({ where: { id: 2 } });
  },

  async update(payload: MainProfileInput): Promise<MainProfile> {
    const data = {
      firstname: payload.firstname,
      lastname: payload.lastname,
      image_url: payload.image_url,
      role: payload.role,
      description: payload.description,
    };

    try {
      return await prisma.mainProfile.update({ where: { id: 2 }, data });
    } catch {
      return prisma.mainProfile.create({ data: { id: 2, ...data } as Parameters<typeof prisma.mainProfile.create>[0]["data"] });
    }
  },
};
