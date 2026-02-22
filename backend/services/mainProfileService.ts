import { prisma } from "@/lib/db";
import { MainProfile } from "@/app/cms/lib/types";
import { Prisma } from "@prisma/client";

export const mainProfileBackendService = {
  async findFirst(): Promise<MainProfile | null> {
    const data = await prisma.mainProfile.findUnique({
      where: { id: 2 }
    });
    return data as unknown as MainProfile | null;
  },

  async update(payload: Partial<MainProfile>): Promise<MainProfile> {
    const dataToUpdate = {
      firstname: payload.firstname,
      lastname: payload.lastname,
      image_url: payload.image_url,
      role: payload.role,
      description: payload.description,
    };

    try {
      const updated = await prisma.mainProfile.update({
        where: { id: 2 },
        data: dataToUpdate as Prisma.Args<typeof prisma.mainProfile.update, "update">["data"],
      });
      return updated as unknown as MainProfile;
    } catch {
      return await prisma.mainProfile.create({
        data: {
          id: 2,
          ...dataToUpdate
        } as Prisma.Args<typeof prisma.mainProfile.create, "create">["data"],
      }) as unknown as MainProfile;
    }
  }
};