import axiosInstance from "@/lib/axios";
import { Contract } from "@/app/cms/lib/types";

export const contractService = {
  getAll: async () => {
    const { data } = await axiosInstance.get<Contract[]>("/contract");
    return data;
  },
  getById: async (id: number) => {
    const { data } = await axiosInstance.get<Contract>(`/contract/${id}`);
    return data;
  },
  create: async (payload: Partial<Contract>) => {
    const { data } = await axiosInstance.post("/contract", payload);
    return data;
  },
  update: async (id: number, payload: Partial<Contract>) => {
    const { data } = await axiosInstance.patch(`/contract/${id}`, payload);
    return data;
  },
  delete: async (id: number) => {
    const { data } = await axiosInstance.delete(`/contract/${id}`);
    return data;
  }
};