import axiosInstance from "@/lib/axios";
import { SoftSkill } from "@/app/cms/lib/types";

export const softSkillService = {
  getAll: async () => {
    const { data } = await axiosInstance.get<SoftSkill[]>("/softskills");
    return data;
  },
  getById: async (id: number) => {
    const { data } = await axiosInstance.get<SoftSkill>(`/softskills/${id}`);
    return data;
  },
  create: async (name: string) => {
    const { data } = await axiosInstance.post("/softskills", { name });
    return data;
  },
  update: async (id: number, name: string) => {
    const { data } = await axiosInstance.patch(`/softskills/${id}`, { name });
    return data;
  },
  delete: async (id: number) => {
    const { data } = await axiosInstance.delete(`/softskills/${id}`);
    return data;
  }
};