import { prisma } from "@/lib/db";
import { Contract } from "@/app/cms/lib/types";
import { Prisma } from "@prisma/client";

export const contractBackendService = {
  async findAll(): Promise<Contract[]> {
    const data = await prisma.contract.findMany({
      where: { deletedAt: null },
      orderBy: { id: "asc" }
    });
    return data as unknown as Contract[];
  },

  async findById(id: number): Promise<Contract | null> {
    const data = await prisma.contract.findFirst({
      where: { id, deletedAt: null }
    });
    return data as unknown as Contract | null;
  },

  async create(payload: Partial<Contract>): Promise<Contract> {
    const data = await prisma.contract.create({
      data: payload as Prisma.Args<typeof prisma.contract.create, "create">["data"]
    });
    return data as unknown as Contract;
  },

  async update(id: number, payload: Partial<Contract>): Promise<Contract> {
    const data = await prisma.contract.update({
      where: { id },
      data: payload as Prisma.Args<typeof prisma.contract.update, "update">["data"]
    });
    return data as unknown as Contract;
  },

  async softDelete(id: number): Promise<Contract> {
    const data = await prisma.contract.update({
      where: { id },
      data: { deletedAt: new Date() }
    });
    return data as unknown as Contract;
  }
};