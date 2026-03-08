import { prisma } from "@/lib/db";
import { Contract, Prisma } from "@prisma/client";

export const contractBackendService = {
  async findAll(): Promise<Contract[]> {
    return prisma.contract.findMany({
      where: { deletedAt: null },
      orderBy: { id: "asc" },
    });
  },

  async findById(id: number): Promise<Contract | null> {
    return prisma.contract.findFirst({ where: { id, deletedAt: null } });
  },

  async create(payload: Prisma.ContractCreateInput): Promise<Contract> {
    return prisma.contract.create({ data: payload });
  },

  async update(id: number, payload: Prisma.ContractUpdateInput): Promise<Contract> {
    return prisma.contract.update({ where: { id }, data: payload });
  },

  async softDelete(id: number): Promise<Contract> {
    return prisma.contract.update({ where: { id }, data: { deletedAt: new Date() } });
  },
};
